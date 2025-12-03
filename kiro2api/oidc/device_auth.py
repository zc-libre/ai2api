"""
OIDC 设备授权

负责发起设备授权请求，获取设备授权码和验证链接。
移植自 amazonq2api/src/oidc/device-auth.ts
"""

import logging
from typing import Optional
from dataclasses import dataclass

import httpx

from config import OIDC_DEVICE_AUTH_URL, OIDC_START_URL
from .client import make_oidc_headers

logger = logging.getLogger(__name__)


@dataclass
class DeviceAuthorization:
    """设备授权响应"""
    device_code: str
    user_code: str
    verification_uri: str
    verification_uri_complete: str
    expires_in: int
    interval: int


async def start_device_authorization(
    client_id: str,
    client_secret: str,
    proxy: Optional[str] = None,
    start_url: str = OIDC_START_URL,
    timeout: float = 30.0,
) -> DeviceAuthorization:
    """
    发起设备授权，返回授权码及验证链接
    
    Args:
        client_id: OIDC 客户端 ID
        client_secret: OIDC 客户端密钥
        proxy: 代理服务器地址
        start_url: AWS 起始 URL
        timeout: 请求超时时间（秒）
    
    Returns:
        DeviceAuthorization: 包含设备码、验证链接等信息
    
    Raises:
        httpx.HTTPStatusError: 如果授权失败
    """
    payload = {
        "clientId": client_id,
        "clientSecret": client_secret,
        "startUrl": start_url,
    }
    
    async with httpx.AsyncClient(proxy=proxy, timeout=timeout) as client:
        response = await client.post(
            OIDC_DEVICE_AUTH_URL,
            headers=make_oidc_headers(),
            json=payload,
        )
        
        if response.status_code != 200:
            error_text = response.text
            logger.error(f"设备授权失败: {response.status_code} {error_text}")
            response.raise_for_status()
        
        data = response.json()
        logger.info(f"设备授权已创建: verification={data['verificationUriComplete'][:50]}...")
        
        return DeviceAuthorization(
            device_code=data["deviceCode"],
            user_code=data["userCode"],
            verification_uri=data["verificationUri"],
            verification_uri_complete=data["verificationUriComplete"],
            expires_in=data["expiresIn"],
            interval=data["interval"],
        )

