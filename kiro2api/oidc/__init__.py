"""
OIDC 模块 - AWS OIDC 设备授权流程

提供 Amazon Q 账号注册所需的 OIDC 客户端注册、设备授权和 Token 轮询功能。
移植自 amazonq2api/src/oidc/
"""

from .client import register_client, make_oidc_headers
from .device_auth import start_device_authorization
from .token import poll_for_tokens

__all__ = [
    "register_client",
    "make_oidc_headers",
    "start_device_authorization",
    "poll_for_tokens",
]

