"""
Kiro 注册浏览器自动化模块

使用 Camoufox 完成 Kiro 账号注册流程：
1. 打开 AWS Builder ID 注册链接
2. 使用临时邮箱完成注册
3. 捕获回调 URL 中的授权码

基于 camoufox/login_handler.py 修改
"""

import sys
import asyncio
import logging
from pathlib import Path
from typing import Optional, Callable
from dataclasses import dataclass
from urllib.parse import urlparse, parse_qs

from config import GPTMailConfig

# 将 camoufox 目录添加到 Python 路径
CAMOUFOX_DIR = Path(__file__).parent.parent / "camoufox"
if str(CAMOUFOX_DIR) not in sys.path:
    sys.path.insert(0, str(CAMOUFOX_DIR))

# 直接导入 login_handler 的函数和类
from login_handler import (
    RegistrationOptions,
    LoginResult,
    GPTMailClient,
    generate_display_name,
    generate_secure_password,
    validate_password,
    random_delay,
    wait_for_page_ready,
    handle_cookie_consent,
    simulate_human_behavior,
    find_and_fill_email,
    detect_registration_page,
    fill_registration_form,
    fill_verification_code,
    detect_password_page,
    fill_password_step,
    print_page_structure,
    check_for_errors,
    check_for_captcha,
)

logger = logging.getLogger(__name__)


@dataclass
class KiroRegistrationOptions:
    """Kiro 注册选项"""
    gptmail: GPTMailConfig
    redirect_uri: str  # Kiro 回调 URI
    password: Optional[str] = None
    full_name: Optional[str] = None
    headless: bool = False
    proxy: Optional[str] = None
    timeout_ms: int = 600000  # 10 分钟
    on_progress: Optional[Callable[[str, str], None]] = None


@dataclass
class KiroRegistrationResult:
    """Kiro 注册结果"""
    success: bool
    message: str
    error_code: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    auth_code: Optional[str] = None  # 从回调 URL 获取的授权码


def _register_with_kiro_sync(
    registration_url: str,
    options: KiroRegistrationOptions,
) -> KiroRegistrationResult:
    """
    同步版本的 Kiro 注册流程

    与原 register_with_camoufox 类似，但：
    1. 不需要点击 Allow access 授权页面
    2. 需要捕获回调 URL 中的授权码
    """
    from camoufox.sync_api import Camoufox
    from playwright.sync_api import TimeoutError as PlaywrightTimeout

    logger.info(f"[PROGRESS] init: 正在初始化浏览器...")
    logger.info(f"启动 Camoufox 浏览器（Kiro 注册模式）...")
    logger.info(f"注册链接: {registration_url[:80]}...")

    # 初始化邮箱客户端
    mail_client = GPTMailClient(
        base_url=options.gptmail.base_url,
        api_key=options.gptmail.api_key,
        proxy=options.proxy
    )

    # 生成邮箱
    logger.info(f"[PROGRESS] create_email: 正在生成临时邮箱...")
    email = mail_client.generate_email(
        prefix=options.gptmail.email_prefix,
        domain=options.gptmail.email_domain
    )
    logger.info(f"生成临时邮箱: {email}")

    # 处理密码
    password = options.password
    if password:
        is_valid, error_msg = validate_password(password)
        if not is_valid:
            logger.warning(f"密码格式不符合要求: {error_msg}")
            password = generate_secure_password(12)
            logger.info(f"自动生成密码: {password}")
    else:
        password = generate_secure_password(12)
        logger.info(f"自动生成密码: {password}")

    display_name = options.full_name or generate_display_name()

    # 浏览器配置
    config = {
        "headless": options.headless,
        "geoip": True,
        "humanize": True,
        "window": (1280, 800),
        "locale": "en-US",
    }
    if options.proxy:
        config["proxy"] = {"server": options.proxy}

    # 用于捕获授权码的变量
    captured_auth_code: Optional[str] = None

    try:
        with Camoufox(**config) as browser:
            page = browser.new_page()
            page.set_default_timeout(options.timeout_ms)

            # 设置路由拦截，捕获回调 URL 并阻止浏览器加载 Kiro 前端
            # 这样授权码就不会被浏览器的前端代码使用
            def handle_route(route):
                nonlocal captured_auth_code
                url = route.request.url
                # 检查是否是 Kiro 回调 URL
                if url.startswith(options.redirect_uri):
                    parsed = urlparse(url)
                    params = parse_qs(parsed.query)
                    if "code" in params:
                        captured_auth_code = params["code"][0]
                        logger.info(f"捕获到授权码: {captured_auth_code[:20]}...")
                        # 返回空响应，阻止浏览器加载 Kiro 前端（否则前端会自动使用授权码）
                        route.fulfill(
                            status=200,
                            content_type="text/html",
                            body="<html><body><h1>Authorization captured</h1></body></html>"
                        )
                        return
                # 其他请求正常处理
                route.continue_()

            # 拦截所有到 Kiro 回调 URL 的请求
            page.route(f"{options.redirect_uri}*", handle_route)

            logger.info("[PROGRESS] navigate: 正在打开注册链接...")
            page.goto(registration_url, wait_until="domcontentloaded")

            # 等待页面加载
            wait_for_page_ready(page, 30000)
            random_delay(3000, 5000)

            # 处理 Cookie 弹窗
            handle_cookie_consent(page)
            random_delay(500, 1000)

            # 检查 CAPTCHA
            if check_for_captcha(page):
                logger.warning("检测到 CAPTCHA，尝试等待...")
                random_delay(5000, 8000)

            error = check_for_errors(page, strict=False)
            if error:
                return KiroRegistrationResult(
                    success=False,
                    message=f"页面加载后检测到错误: {error}",
                    error_code="BLOCKED"
                )

            # 模拟人类行为
            simulate_human_behavior(page)
            random_delay(1000, 2000)

            # 1. 输入邮箱
            logger.info("[PROGRESS] fill_email: 正在查找邮箱输入框...")
            email_found = False
            for attempt in range(3):
                if find_and_fill_email(page, email):
                    email_found = True
                    break
                logger.warning(f"第 {attempt + 1} 次尝试未找到邮箱输入框，等待后重试...")
                random_delay(3000, 5000)
                wait_for_page_ready(page, 10000)

            if not email_found:
                try:
                    page.screenshot(path="debug_kiro_email_not_found.png")
                except:
                    pass
                return KiroRegistrationResult(
                    success=False,
                    message="未找到邮箱输入框",
                    error_code="EMAIL_INPUT_NOT_FOUND"
                )

            random_delay(2000, 4000)
            wait_for_page_ready(page, 15000)
            random_delay(3000, 5000)

            error = check_for_errors(page, strict=False)
            if error:
                return KiroRegistrationResult(
                    success=False,
                    message=f"输入邮箱后检测到错误: {error}",
                    error_code="BLOCKED"
                )

            # 2. 检测注册页面
            logger.info("[PROGRESS] submit_email: 检测是否进入注册流程...")
            is_registration = False
            for attempt in range(3):
                if detect_registration_page(page):
                    is_registration = True
                    break
                logger.warning(f"第 {attempt + 1} 次检测未发现注册页面，等待...")
                random_delay(2000, 3000)

            if not is_registration:
                try:
                    page.screenshot(path="debug_kiro_not_registration.png")
                except:
                    pass
                return KiroRegistrationResult(
                    success=False,
                    message="未进入注册页面，邮箱可能已被注册",
                    error_code="ALREADY_REGISTERED"
                )

            logger.info("检测到注册页面")

            # 3. 填写注册表单（姓名）
            logger.info("[PROGRESS] fill_profile: 正在填写个人信息...")
            if not fill_registration_form(page, display_name, password):
                try:
                    page.screenshot(path="debug_kiro_form_failed.png")
                except:
                    pass
                return KiroRegistrationResult(
                    success=False,
                    message="填写注册表单失败",
                    error_code="FORM_FILL_FAILED"
                )

            wait_for_page_ready(page, 15000)
            random_delay(3000, 5000)

            # 4. 等待验证码
            logger.info("[PROGRESS] verify_email: 正在等待验证码邮件...")
            try:
                code = mail_client.wait_for_verification_code(
                    email=email,
                    timeout_ms=120000,
                    poll_interval_ms=3000
                )
            except TimeoutError as e:
                return KiroRegistrationResult(
                    success=False,
                    message=str(e),
                    error_code="VERIFICATION_TIMEOUT"
                )

            # 5. 填写验证码
            logger.info("[PROGRESS] verify_email: 正在填写验证码...")
            if not fill_verification_code(page, code):
                try:
                    page.screenshot(path="debug_kiro_code_failed.png")
                except:
                    pass
                return KiroRegistrationResult(
                    success=False,
                    message="填写验证码失败",
                    error_code="CODE_FILL_FAILED"
                )

            wait_for_page_ready(page, 15000)
            random_delay(3000, 5000)

            # 6. 检查并填写密码
            handle_cookie_consent(page)
            random_delay(500, 1000)

            password_found = False
            for pwd_attempt in range(5):
                logger.info(f"检测密码页面 ({pwd_attempt + 1}/5)...")

                if detect_password_page(page):
                    password_found = True
                    break

                if pwd_attempt < 4:
                    random_delay(3000, 5000)
                    wait_for_page_ready(page, 10000)

            if password_found:
                logger.info("[PROGRESS] fill_password: 正在设置密码...")
                if not fill_password_step(page, password):
                    try:
                        page.screenshot(path="debug_kiro_password_failed.png")
                    except:
                        pass
                    return KiroRegistrationResult(
                        success=False,
                        message="填写密码失败",
                        error_code="PASSWORD_FILL_FAILED"
                    )

                wait_for_page_ready(page, 15000)
                random_delay(3000, 5000)

            # 7. 等待回调并捕获授权码
            # Kiro 注册完成后会自动跳转到回调 URL
            logger.info("[PROGRESS] authorize: 等待授权回调...")

            # 等待授权码被捕获（最多等待 60 秒）
            max_wait = 60
            for i in range(max_wait):
                if captured_auth_code:
                    logger.info(f"[PROGRESS] done: 注册成功，已获取授权码")
                    return KiroRegistrationResult(
                        success=True,
                        message="Kiro 注册成功",
                        email=email,
                        password=password,
                        auth_code=captured_auth_code,
                    )

                # 检查当前 URL 是否已经是回调 URL
                current_url = page.url
                if current_url.startswith(options.redirect_uri):
                    parsed = urlparse(current_url)
                    params = parse_qs(parsed.query)
                    if "code" in params:
                        captured_auth_code = params["code"][0]
                        logger.info(f"从 URL 获取授权码: {captured_auth_code[:20]}...")
                        return KiroRegistrationResult(
                            success=True,
                            message="Kiro 注册成功",
                            email=email,
                            password=password,
                            auth_code=captured_auth_code,
                        )

                random_delay(1000, 1000)

            # 超时未获取到授权码
            final_url = page.url
            return KiroRegistrationResult(
                success=False,
                message=f"等待授权码超时，当前 URL: {final_url}",
                error_code="AUTH_CODE_TIMEOUT",
                email=email,
                password=password,
            )

    except Exception as e:
        logger.exception("Kiro 注册异常")
        return KiroRegistrationResult(
            success=False,
            message=str(e),
            error_code="EXCEPTION",
        )


async def register_with_kiro_camoufox(
    registration_url: str,
    options: KiroRegistrationOptions,
) -> KiroRegistrationResult:
    """
    使用 Camoufox 完成 Kiro 账号注册

    Args:
        registration_url: AWS Builder ID 注册链接
        options: 注册选项

    Returns:
        KiroRegistrationResult: 注册结果，包含授权码
    """
    logger.info(f"启动 Kiro 注册: {registration_url[:60]}...")

    try:
        # 使用 asyncio.to_thread 在线程池中运行同步代码
        result = await asyncio.to_thread(
            _register_with_kiro_sync,
            registration_url,
            options,
        )

        logger.info(f"Kiro 注册完成: success={result.success}")
        return result

    except Exception as e:
        logger.exception("Kiro 注册执行异常")
        return KiroRegistrationResult(
            success=False,
            message=str(e),
            error_code="EXCEPTION",
        )
