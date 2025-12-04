"""
Kiro Portal Auth 类型定义
"""

from enum import Enum
from dataclasses import dataclass
from typing import Optional


class KiroStage(str, Enum):
    """Kiro 环境阶段"""
    BETA = "Beta"
    GAMMA = "Gamma"
    PROD = "Prod"


# Stage 到 BFF 端点的映射
STAGE_TO_BFF_ENDPOINT = {
    KiroStage.BETA: "https://beta.app.kiro.dev",
    KiroStage.GAMMA: "https://gamma.app.kiro.dev",
    KiroStage.PROD: "https://app.kiro.dev",
}

# Stage 到 Auth 端点的映射
STAGE_TO_AUTH_ENDPOINT = {
    KiroStage.BETA: "https://beta.us-east-1.auth.desktop.kiro.dev",
    KiroStage.GAMMA: "https://gamma.us-east-1.auth.desktop.kiro.dev",
    KiroStage.PROD: "https://prod.us-east-1.auth.desktop.kiro.dev",
}


@dataclass
class InitiateLoginResponse:
    """InitiateLogin API 响应"""
    redirect_url: str
    code_verifier: str
    state: str


class AuthProvider(str, Enum):
    """认证提供者"""
    GOOGLE = "Google"
    GITHUB = "GitHub"  
    BUILDER_ID = "BuilderId"
    INTERNAL = "Internal"
    ENTERPRISE = "AWSIdC"


# Provider 到 IDP 的映射
PROVIDER_TO_IDP = {
    AuthProvider.GOOGLE: "Google",
    AuthProvider.GITHUB: "Github",  # 注意大小写
    AuthProvider.BUILDER_ID: "BuilderId",
    AuthProvider.INTERNAL: "Internal",
    AuthProvider.ENTERPRISE: "AWSIdC",
    # 字符串版本
    "Google": "Google",
    "GitHub": "Github",
    "BuilderId": "BuilderId",
    "Internal": "Internal",
    "Enterprise": "AWSIdC",
}

