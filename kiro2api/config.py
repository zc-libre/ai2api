import os
from dataclasses import dataclass
from typing import Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Key for authentication
API_KEY = os.getenv("API_KEY", "ki2api-key-2024")

# Legacy single account config (向后兼容)
# 新版本使用 KIRO_AUTH_CONFIG，见 auth/config.py
KIRO_ACCESS_TOKEN = os.getenv("KIRO_ACCESS_TOKEN")
KIRO_REFRESH_TOKEN = os.getenv("KIRO_REFRESH_TOKEN")

# Kiro/CodeWhisperer API endpoints
KIRO_BASE_URL = "https://codewhisperer.us-east-1.amazonaws.com/generateAssistantResponse"
PROFILE_ARN = "arn:aws:codewhisperer:us-east-1:699475941385:profile/EHGA3GRVQMUK"

# Model mapping
MODEL_MAP = {
    "claude-sonnet-4-5-20250929": "claude-sonnet-4.5",
    "claude-sonnet-4":  "claude-sonnet-4",
    "claude-opus-4-5-20251101":"claude-opus-4.5",
    "claude-haiku-4-5-20251001":"claude-haiku-4.5"
}
DEFAULT_MODEL = "claude-sonnet-4-5-20250929"

# ==============================================================================
# OIDC 配置 (AWS OIDC 设备授权)
# ==============================================================================
OIDC_BASE = "https://oidc.us-east-1.amazonaws.com"
OIDC_REGISTER_URL = f"{OIDC_BASE}/client/register"
OIDC_DEVICE_AUTH_URL = f"{OIDC_BASE}/device_authorization"
OIDC_TOKEN_URL = f"{OIDC_BASE}/token"
OIDC_START_URL = "https://view.awsapps.com/start"

# Token 刷新用的 User-Agent（与 amazonq2api 保持一致）
USER_AGENT = "aws-sdk-rust/1.3.10 os/macos lang/rust/1.88.0"
X_AMZ_USER_AGENT = "aws-sdk-rust/1.3.10 ua/2.1 api/ssooidc/1.88.0 os/macos lang/rust/1.88.0 m/E app/AmazonQ-For-CLI"
AMZ_SDK_REQUEST = "attempt=1; max=3"


# ==============================================================================
# GPTMail 配置 (临时邮箱服务)
# ==============================================================================
@dataclass
class GPTMailConfig:
    """GPTMail 临时邮箱配置"""
    base_url: str
    api_key: str
    email_prefix: Optional[str] = None
    email_domain: Optional[str] = None
    poll_interval_ms: int = 3000
    timeout_ms: int = 120000


def get_gptmail_config() -> Optional[GPTMailConfig]:
    """从环境变量获取 GPTMail 配置"""
    api_key = os.getenv("GPTMAIL_API_KEY") or os.getenv("GPTMAIL_KEY")
    if not api_key:
        return None
    
    return GPTMailConfig(
        base_url=os.getenv("GPTMAIL_BASE_URL", "https://mail.chatgpt.org.uk"),
        api_key=api_key,
        email_prefix=os.getenv("GPTMAIL_EMAIL_PREFIX"),
        email_domain=os.getenv("GPTMAIL_EMAIL_DOMAIN"),
        poll_interval_ms=int(os.getenv("GPTMAIL_POLL_INTERVAL_MS", "3000")),
        timeout_ms=int(os.getenv("GPTMAIL_TIMEOUT_MS", "120000")),
    )


# ==============================================================================
# 注册服务配置
# ==============================================================================
@dataclass
class RegisterConfig:
    """注册服务配置"""
    headless: bool = False
    proxy: Optional[str] = None
    gptmail: Optional[GPTMailConfig] = None
    max_retries: int = 3
    camoufox_timeout_ms: int = 600000  # 10 分钟


def get_register_config() -> RegisterConfig:
    """从环境变量获取注册服务配置"""
    headless_str = os.getenv("HEADLESS", "false").lower()
    headless = headless_str in ("true", "1", "yes")
    
    proxy = os.getenv("HTTP_PROXY") or os.getenv("HTTPS_PROXY")
    
    return RegisterConfig(
        headless=headless,
        proxy=proxy,
        gptmail=get_gptmail_config(),
        max_retries=int(os.getenv("REGISTER_MAX_RETRIES", "3")),
        camoufox_timeout_ms=int(os.getenv("CAMOUFOX_TIMEOUT_MS", "600000")),
    )
