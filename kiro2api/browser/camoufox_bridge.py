"""
Camoufox 浏览器自动化模块

直接调用 camoufox/login_handler.py 的函数，无需子进程。
使用 asyncio.to_thread() 将同步浏览器操作转为异步。

移植自 amazonq2api/src/browser/camoufox-bridge.ts
"""

import sys
import asyncio
import logging
from pathlib import Path
from typing import Optional, Callable
from dataclasses import dataclass

from config import GPTMailConfig

# 将 camoufox 目录添加到 Python 路径
CAMOUFOX_DIR = Path(__file__).parent.parent / "camoufox"
if str(CAMOUFOX_DIR) not in sys.path:
    sys.path.insert(0, str(CAMOUFOX_DIR))

# 直接导入 login_handler 的函数和类
from login_handler import (
    register_with_camoufox as _register_sync,
    login_with_camoufox as _login_sync,
    RegistrationOptions,
    Credentials,
    LoginResult,
    check_for_captcha,
)

logger = logging.getLogger(__name__)


@dataclass
class CamoufoxRegistrationOptions:
    """Camoufox 注册选项"""
    gptmail: GPTMailConfig
    password: Optional[str] = None
    full_name: Optional[str] = None
    headless: bool = False
    proxy: Optional[str] = None
    timeout_ms: int = 600000  # 10 分钟
    on_progress: Optional[Callable[[str, str], None]] = None


@dataclass
class CamoufoxResult:
    """Camoufox 执行结果"""
    success: bool
    message: str
    error_code: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None


async def register_with_camoufox(
    verification_url: str,
    options: CamoufoxRegistrationOptions,
) -> CamoufoxResult:
    """
    使用 Camoufox 完成设备授权注册
    
    Args:
        verification_url: 设备验证链接
        options: 注册选项
    
    Returns:
        CamoufoxResult: 注册结果
    """
    logger.info(f"启动 Camoufox 注册: {verification_url[:50]}...")
    
    # 构建 login_handler 需要的参数
    reg_options = RegistrationOptions(
        gptmail_base_url=options.gptmail.base_url,
        gptmail_api_key=options.gptmail.api_key,
        password=options.password,
        email_prefix=options.gptmail.email_prefix,
        email_domain=options.gptmail.email_domain,
        full_name=options.full_name,
    )
    
    try:
        # 使用 asyncio.to_thread 在线程池中运行同步代码
        # 这样不会阻塞事件循环
        result: LoginResult = await asyncio.to_thread(
            _register_sync,
            verification_url,
            reg_options,
            options.headless,
            options.proxy,
            options.timeout_ms,
        )
        
        logger.info(f"Camoufox 注册完成: success={result.success}")
        
        return CamoufoxResult(
            success=result.success,
            message=result.message,
            error_code=result.error_code,
            email=result.email,
            password=result.password,
        )
    
    except Exception as e:
        logger.exception("Camoufox 执行异常")
        return CamoufoxResult(
            success=False,
            message=str(e),
            error_code="EXCEPTION",
        )


async def login_with_camoufox(
    verification_url: str,
    email: str,
    password: str,
    mfa_secret: Optional[str] = None,
    headless: bool = False,
    proxy: Optional[str] = None,
    timeout_ms: int = 60000,
) -> CamoufoxResult:
    """
    使用 Camoufox 完成设备授权登录
    
    Args:
        verification_url: 设备验证链接
        email: AWS 邮箱
        password: AWS 密码
        mfa_secret: MFA 密钥（可选）
        headless: 是否无头模式
        proxy: 代理服务器
        timeout_ms: 超时时间（毫秒）
    
    Returns:
        CamoufoxResult: 登录结果
    """
    logger.info(f"启动 Camoufox 登录: {verification_url[:50]}...")
    
    credentials = Credentials(
        email=email,
        password=password,
        mfa_secret=mfa_secret,
    )
    
    try:
        result: LoginResult = await asyncio.to_thread(
            _login_sync,
            verification_url,
            credentials,
            headless,
            proxy,
            timeout_ms,
        )
        
        logger.info(f"Camoufox 登录完成: success={result.success}")
        
        return CamoufoxResult(
            success=result.success,
            message=result.message,
            error_code=result.error_code,
            email=result.email,
            password=result.password,
        )
    
    except Exception as e:
        logger.exception("Camoufox 登录异常")
        return CamoufoxResult(
            success=False,
            message=str(e),
            error_code="EXCEPTION",
        )


async def check_camoufox_installed() -> bool:
    """
    检查 Camoufox 环境是否已安装
    
    Returns:
        bool: 是否已安装
    """
    try:
        # 尝试导入 camoufox
        from camoufox.sync_api import Camoufox
        
        # 尝试启动浏览器验证安装完整性
        def verify():
            try:
                with Camoufox(headless=True) as browser:
                    page = browser.new_page()
                    page.goto('about:blank')
                return True
            except Exception:
                return False
        
        return await asyncio.wait_for(
            asyncio.to_thread(verify),
            timeout=30.0
        )
    
    except ImportError:
        return False
    except asyncio.TimeoutError:
        return False
    except Exception:
        return False


async def install_camoufox() -> None:
    """
    自动安装 Camoufox 环境
    
    Raises:
        Exception: 如果安装失败
    """
    setup_script = CAMOUFOX_DIR / "setup.sh"
    
    logger.info("开始自动安装 Camoufox...")
    
    process = await asyncio.create_subprocess_exec(
        "bash", str(setup_script),
        cwd=str(CAMOUFOX_DIR),
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    
    stdout, stderr = await process.communicate()
    
    if process.returncode != 0:
        error_msg = stderr.decode() if stderr else stdout.decode()
        raise Exception(f"Camoufox 安装失败: {error_msg}")
    
    logger.info("Camoufox 安装完成")


async def ensure_camoufox_installed() -> None:
    """
    确保 Camoufox 已安装，如果未安装则自动安装
    
    Raises:
        Exception: 如果安装或验证失败
    """
    installed = await check_camoufox_installed()
    if not installed:
        logger.info("检测到 Camoufox 未安装，开始自动安装...")
        await install_camoufox()
        
        # 安装后再次验证
        verify_installed = await check_camoufox_installed()
        if not verify_installed:
            raise Exception(
                f"Camoufox 自动安装后验证失败，请手动运行: cd {CAMOUFOX_DIR} && bash setup.sh"
            )
