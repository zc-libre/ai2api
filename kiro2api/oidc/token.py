"""
OIDC Token 轮询

负责轮询设备授权 Token，直到获得或超时。
移植自 amazonq2api/src/oidc/token.ts
"""

import asyncio
import logging
import time
from typing import Optional
from dataclasses import dataclass

import httpx

from config import OIDC_TOKEN_URL
from .client import make_oidc_headers

logger = logging.getLogger(__name__)


@dataclass
class TokenResponse:
    """Token 响应"""
    access_token: str
    refresh_token: str
    expires_in: int
    token_type: str = "Bearer"


async def poll_for_tokens(
    client_id: str,
    client_secret: str,
    device_code: str,
    interval: int,
    expires_in: int,
    proxy: Optional[str] = None,
    max_timeout_sec: int = 300,
) -> TokenResponse:
    """
    轮询设备授权 Token，直到获得或超时
    
    Args:
        client_id: OIDC 客户端 ID
        client_secret: OIDC 客户端密钥
        device_code: 设备授权码
        interval: 轮询间隔（秒）
        expires_in: 设备授权有效期（秒）
        proxy: 代理服务器地址
        max_timeout_sec: 最大轮询时间（秒）
    
    Returns:
        TokenResponse: 包含 access_token 和 refresh_token
    
    Raises:
        TimeoutError: 如果超时
        httpx.HTTPStatusError: 如果请求失败
    """
    payload = {
        "clientId": client_id,
        "clientSecret": client_secret,
        "deviceCode": device_code,
        "grantType": "urn:ietf:params:oauth:grant-type:device_code",
    }
    
    # 计算截止时间
    deadline = min(
        time.time() + expires_in,
        time.time() + max_timeout_sec
    )
    poll_interval = max(1, interval)
    
    async with httpx.AsyncClient(proxy=proxy, timeout=30.0) as client:
        while time.time() < deadline:
            response = await client.post(
                OIDC_TOKEN_URL,
                headers=make_oidc_headers(),
                json=payload,
            )
            
            if response.status_code == 200:
                data = response.json()
                logger.info("获取到访问 Token")
                return TokenResponse(
                    access_token=data["accessToken"],
                    refresh_token=data["refreshToken"],
                    expires_in=data["expiresIn"],
                    token_type=data.get("tokenType", "Bearer"),
                )
            
            if response.status_code == 400:
                try:
                    error_body = response.json()
                    if error_body.get("error") == "authorization_pending":
                        logger.debug("授权尚未完成，继续轮询")
                        await asyncio.sleep(poll_interval)
                        continue
                    
                    error_msg = f"Token 请求失败: {error_body.get('error', 'unknown')}"
                    logger.error(error_msg)
                    raise Exception(error_msg)
                except (ValueError, KeyError):
                    pass
            
            error_text = response.text
            error_msg = f"Token 请求异常: {response.status_code} {error_text}"
            logger.error(error_msg)
            raise Exception(error_msg)
    
    raise TimeoutError("授权超时，未在截止时间内获取 Token")

