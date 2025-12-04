"""
自动注册服务

核心注册逻辑：
1. 使用 Kiro Portal Auth 获取登录链接
2. 跟随重定向获取 AWS Builder ID 注册链接
3. 使用 Camoufox 打开注册链接完成自动注册
4. 从回调 URL 获取授权码并换取 Token
5. 保存 Kiro 账号

基于 kiro_portal_auth 模块实现
"""

import asyncio
import logging
from datetime import datetime
from typing import Optional, Callable, Dict, Any
from dataclasses import dataclass
from urllib.parse import urlparse, parse_qs

import httpx

from config import get_register_config, GPTMailConfig
from kiro_portal_auth import KiroPortalAuthClient, KiroStage
from browser import (
    register_with_kiro_camoufox,
    ensure_camoufox_installed,
    KiroRegistrationOptions,
)
from storage import AccountStore
from storage.database import get_db

logger = logging.getLogger(__name__)


@dataclass
class AutoRegisterOptions:
    """自动注册选项"""
    password: Optional[str] = None
    full_name: Optional[str] = None
    headless: Optional[bool] = None
    label: Optional[str] = None
    max_retries: int = 3
    gptmail: Optional[GPTMailConfig] = None
    proxy: Optional[str] = None
    on_progress: Optional[Callable[[str, int, Optional[str]], None]] = None
    stage: KiroStage = KiroStage.PROD  # Kiro 环境


async def auto_register(options: AutoRegisterOptions = None) -> Dict[str, Any]:
    """
    全自动注册 Kiro 账号，返回存储后的账号记录

    流程说明：
    1. 使用 Kiro Portal Auth 获取登录链接
    2. 跟随重定向获取 AWS Builder ID 注册链接
    3. 使用 Camoufox 打开注册链接完成自动注册
    4. 从回调 URL 获取授权码并换取 Token
    5. 保存 Kiro 账号

    Args:
        options: 注册选项

    Returns:
        dict: 包含 email, saved_at 等信息

    Raises:
        Exception: 注册失败
    """
    if options is None:
        options = AutoRegisterOptions()

    # 加载配置
    config = get_register_config()

    # 确定 GPTMail 配置
    gptmail = options.gptmail or config.gptmail
    if not gptmail:
        raise Exception("未配置 GPTMail API，无法使用临时邮箱注册模式")

    # 确定其他配置
    headless = options.headless if options.headless is not None else config.headless
    proxy = options.proxy or config.proxy
    max_retries = options.max_retries or config.max_retries
    label = options.label or f"Kiro-{int(datetime.utcnow().timestamp() * 1000)}"
    
    # 进度回调
    on_progress = options.on_progress or (lambda step, percent, msg=None: None)

    # Kiro 回调 URI
    redirect_uri = "https://app.kiro.dev/signin/oauth"

    async def execute() -> Dict[str, Any]:
        """执行注册流程"""

        # 第一步：使用 Kiro Portal Auth 获取登录链接
        on_progress("初始化 Kiro 认证", 5, "正在初始化 Kiro Portal Auth...")
        kiro_client = KiroPortalAuthClient(
            stage=options.stage,
            use_bff_endpoint=True,
            proxy=proxy,
        )

        on_progress("获取登录链接", 10, "正在获取 Kiro 登录链接...")
        login_response = await kiro_client.initiate_login(
            provider="BuilderId",
            redirect_uri=redirect_uri,
        )
        logger.info(f"Kiro 登录链接已获取: {login_response.redirect_url[:60]}...")

        # 第二步：跟随重定向获取 AWS Builder ID 注册链接
        on_progress("获取注册链接", 15, "正在获取 AWS Builder ID 注册链接...")
        async with httpx.AsyncClient(follow_redirects=False, timeout=30.0, proxy=proxy) as http_client:
            response = await http_client.get(login_response.redirect_url)
            if response.status_code in (301, 302, 303, 307, 308):
                registration_url = response.headers.get("location", "")
            else:
                registration_url = login_response.redirect_url

        logger.info(f"AWS 注册链接: {registration_url[:60]}...")
        on_progress("注册链接就绪", 20, f"获取注册链接: {registration_url[:50]}...")

        # 确保 Camoufox 已安装
        on_progress("检查浏览器环境", 25, "正在检查 Camoufox 浏览器环境...")
        await ensure_camoufox_installed()
        on_progress("浏览器环境就绪", 30, "Camoufox 浏览器已就绪")

        # 使用 Camoufox 注册
        on_progress("启动浏览器注册", 35, "正在启动浏览器进行自动注册...")

        # 浏览器注册步骤到进度的映射
        browser_steps = {
            "init": 40,
            "navigate": 45,
            "create_email": 50,
            "fill_email": 55,
            "submit_email": 60,
            "verify_email": 65,
            "fill_profile": 70,
            "fill_password": 75,
            "submit_register": 80,
            "authorize": 85,
            "done": 88,
        }

        def browser_progress(step: str, message: str):
            percent = browser_steps.get(step, 50)
            on_progress(step, percent, message)

        kiro_options = KiroRegistrationOptions(
            gptmail=gptmail,
            password=options.password,
            full_name=options.full_name,
            headless=headless,
            proxy=proxy,
            timeout_ms=config.camoufox_timeout_ms,
            redirect_uri=redirect_uri,
            on_progress=browser_progress,
        )

        result = await register_with_kiro_camoufox(
            registration_url,
            kiro_options,
        )

        if not result.success:
            raise Exception(f"Camoufox 注册失败: {result.message} ({result.error_code})")

        final_email = result.email
        final_password = result.password
        auth_code = result.auth_code

        logger.info(f"Camoufox 注册成功: {final_email}")
        on_progress("浏览器注册完成", 88, f"注册邮箱: {final_email}")

        if not auth_code:
            raise Exception("未获取到授权码，注册流程可能未完成")

        # 第三步：用授权码换取 Token
        on_progress("获取访问令牌", 92, "正在用授权码换取 Token...")
        token_response = await kiro_client.exchange_token(
            code=auth_code,
            code_verifier=login_response.code_verifier,
            redirect_uri=redirect_uri,
            provider="BuilderId",
            state=login_response.state,
        )

        logger.info("Token 换取成功")
        on_progress("令牌获取成功", 95, "成功获取访问令牌")

        # 保存到数据库
        on_progress("保存账号信息", 98, "正在保存账号信息到数据库...")

        async for session in get_db():
            store = AccountStore(session)
            saved_account = await store.create_kiro_account(
                access_token=token_response.access_token,
                csrf_token=token_response.csrf_token,
                email=final_email,
                password=final_password,
                label=label,
            )

            logger.info(f"自动注册完成: {saved_account.id}")
            on_progress("完成", 100, "自动注册流程完成")

            return {
                "id": saved_account.id,
                "email": saved_account.awsEmail,
                "password": saved_account.awsPassword,
                "saved_at": saved_account.savedAt.isoformat() if saved_account.savedAt else None,
                "label": saved_account.label,
            }
    
    # 带重试执行
    last_error: Optional[Exception] = None
    for attempt in range(max_retries):
        try:
            return await execute()
        except Exception as e:
            last_error = e
            logger.warning(f"注册尝试 {attempt + 1}/{max_retries} 失败: {e}")
            if attempt < max_retries - 1:
                await asyncio.sleep(2 ** attempt)  # 指数退避
    
    raise last_error or Exception("注册失败")

