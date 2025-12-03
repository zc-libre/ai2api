"""
OIDC 客户端注册

负责向 AWS OIDC 服务注册客户端，获取 clientId 和 clientSecret。
移植自 amazonq2api/src/oidc/client.ts
"""

import uuid
import logging
from typing import Optional
from dataclasses import dataclass

import httpx

from config import (
    OIDC_REGISTER_URL,
    USER_AGENT,
    X_AMZ_USER_AGENT,
    AMZ_SDK_REQUEST,
)

logger = logging.getLogger(__name__)


@dataclass
class OIDCClientCredentials:
    """OIDC 客户端凭证"""
    client_id: str
    client_secret: str


def make_oidc_headers() -> dict[str, str]:
    """
    生成与 amazonq2api 一致的 OIDC 请求头
    """
    return {
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
        "x-amz-user-agent": X_AMZ_USER_AGENT,
        "amz-sdk-request": AMZ_SDK_REQUEST,
        "amz-sdk-invocation-id": str(uuid.uuid4()),
    }


async def register_client(
    proxy: Optional[str] = None,
    timeout: float = 30.0,
) -> OIDCClientCredentials:
    """
    调用 OIDC 客户端注册接口
    
    Args:
        proxy: 代理服务器地址
        timeout: 请求超时时间（秒）
    
    Returns:
        OIDCClientCredentials: 包含 client_id 和 client_secret
    
    Raises:
        httpx.HTTPStatusError: 如果注册失败
    """
    payload = {
        "clientName": "Amazon Q Developer for command line",
        "clientType": "public",
        "scopes": [
            "codewhisperer:completions",
            "codewhisperer:analysis",
            "codewhisperer:conversations"
        ]
    }
    
    async with httpx.AsyncClient(proxy=proxy, timeout=timeout) as client:
        response = await client.post(
            OIDC_REGISTER_URL,
            headers=make_oidc_headers(),
            json=payload,
        )
        
        if response.status_code != 200:
            error_text = response.text
            logger.error(f"OIDC 客户端注册失败: {response.status_code} {error_text}")
            response.raise_for_status()
        
        data = response.json()
        logger.info(f"OIDC 客户端注册成功: clientId={data['clientId'][:20]}...")
        
        return OIDCClientCredentials(
            client_id=data["clientId"],
            client_secret=data["clientSecret"],
        )

