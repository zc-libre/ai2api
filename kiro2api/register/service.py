"""
自动注册服务

核心注册逻辑：
1. 注册 OIDC 客户端并获取设备授权码
2. 使用 Camoufox 打开设备验证链接
3. 使用临时邮箱自动完成注册+授权
4. 轮询获取 Token 并保存账号

移植自 amazonq2api/src/index.ts
"""

import asyncio
import logging
from datetime import datetime
from typing import Optional, Callable, Dict, Any
from dataclasses import dataclass

from config import get_register_config, GPTMailConfig
from oidc import register_client, start_device_authorization, poll_for_tokens
from browser import (
    register_with_camoufox,
    ensure_camoufox_installed,
    CamoufoxRegistrationOptions,
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


async def auto_register(options: AutoRegisterOptions = None) -> Dict[str, Any]:
    """
    全自动注册 Amazon Q 账号，返回存储后的账号记录
    
    流程说明：
    1. 先注册 OIDC 客户端并获取设备授权码
    2. 使用 Camoufox 打开设备验证链接
    3. 使用临时邮箱自动完成注册+授权
    4. 轮询获取 Token 并保存账号
    
    Args:
        options: 注册选项
    
    Returns:
        dict: 包含 aws_email, saved_at 等信息
    
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
    label = options.label or f"Auto-{int(datetime.utcnow().timestamp() * 1000)}"
    
    # 进度回调
    on_progress = options.on_progress or (lambda step, percent, msg=None: None)
    
    async def execute() -> Dict[str, Any]:
        """执行注册流程"""
        
        # 第一步：注册 OIDC 客户端
        on_progress("注册 OIDC 客户端", 5, "正在注册 OIDC 客户端...")
        credentials = await register_client(proxy=proxy)
        
        # 第二步：获取设备授权
        on_progress("获取设备授权", 10, "正在获取设备授权码...")
        device_auth = await start_device_authorization(
            credentials.client_id,
            credentials.client_secret,
            proxy=proxy,
        )
        logger.info(f"设备授权已获取: {device_auth.verification_uri_complete[:50]}...")
        on_progress("设备授权成功", 15, f"获取验证链接: {device_auth.verification_uri_complete[:50]}...")
        
        # 注意：Python 版本直接调用浏览器函数，不需要提前轮询 Token
        # 等浏览器完成授权后再获取 Token，避免大量无用的 authorization_pending 请求
        
        # 确保 Camoufox 已安装
        on_progress("检查浏览器环境", 20, "正在检查 Camoufox 浏览器环境...")
        await ensure_camoufox_installed()
        on_progress("浏览器环境就绪", 25, "Camoufox 浏览器已就绪")
        
        # 使用 Camoufox 注册
        on_progress("启动浏览器注册", 30, "正在启动浏览器进行自动注册...")
        
        # 浏览器注册步骤到进度的映射
        browser_steps = {
            "init": 35,
            "navigate": 40,
            "create_email": 45,
            "fill_email": 50,
            "submit_email": 55,
            "verify_email": 60,
            "fill_profile": 65,
            "fill_password": 70,
            "submit_register": 75,
            "authorize": 80,
            "done": 85,
        }
        
        def browser_progress(step: str, message: str):
            percent = browser_steps.get(step, 50)
            on_progress(step, percent, message)
        
        camoufox_options = CamoufoxRegistrationOptions(
            gptmail=gptmail,
            password=options.password,
            full_name=options.full_name,
            headless=headless,
            proxy=proxy,
            timeout_ms=config.camoufox_timeout_ms,
            on_progress=browser_progress,
        )
        
        result = await register_with_camoufox(
            device_auth.verification_uri_complete,
            camoufox_options,
        )
        
        if not result.success:
            raise Exception(f"Camoufox 注册失败: {result.message} ({result.error_code})")
        
        final_email = result.email
        final_password = result.password
        
        logger.info(f"Camoufox 注册成功: {final_email}")
        on_progress("浏览器注册完成", 85, f"注册邮箱: {final_email}")
        
        # 浏览器授权完成后，获取 Token（此时应该很快就能拿到）
        on_progress("获取访问令牌", 90, "正在获取访问令牌...")
        tokens = await poll_for_tokens(
            credentials.client_id,
            credentials.client_secret,
            device_auth.device_code,
            device_auth.interval,
            device_auth.expires_in,
            proxy=proxy,
            max_timeout_sec=60,  # 浏览器已完成授权，1 分钟足够
        )
        
        if not tokens:
            raise Exception("无法获取 Token，授权可能未完成")
        
        on_progress("令牌获取成功", 95, "成功获取访问令牌")
        
        # 保存到数据库
        on_progress("保存账号信息", 98, "正在保存账号信息到数据库...")
        
        async for session in get_db():
            store = AccountStore(session)
            saved_account = await store.create_amazonq_account(
                client_id=credentials.client_id,
                client_secret=credentials.client_secret,
                access_token=tokens.access_token,
                refresh_token=tokens.refresh_token,
                expires_in=tokens.expires_in,
                aws_email=final_email,
                aws_password=final_password,
                label=label,
            )
            
            logger.info(f"自动注册完成: {saved_account.id}")
            on_progress("完成", 100, "自动注册流程完成")
            
            return {
                "id": saved_account.id,
                "aws_email": saved_account.awsEmail,
                "aws_password": saved_account.awsPassword,
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

