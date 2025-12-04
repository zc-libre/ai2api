"""
PKCE (Proof Key for Code Exchange) 工具

实现 OAuth 2.0 PKCE 流程所需的 code_verifier 和 code_challenge 生成。
"""

import os
import base64
import hashlib


def generate_code_verifier(length: int = 32) -> str:
    """
    生成 PKCE code_verifier
    
    Args:
        length: 随机字节数，默认 32 字节
    
    Returns:
        Base64 URL 编码的 code_verifier
    """
    random_bytes = os.urandom(length)
    return base64_url_encode(random_bytes)


def generate_code_challenge(code_verifier: str) -> str:
    """
    根据 code_verifier 生成 code_challenge (S256 方法)
    
    Args:
        code_verifier: PKCE code_verifier
    
    Returns:
        Base64 URL 编码的 code_challenge
    """
    verifier_bytes = code_verifier.encode('utf-8')
    sha256_hash = hashlib.sha256(verifier_bytes).digest()
    return base64_url_encode(sha256_hash)


def base64_url_encode(data: bytes) -> str:
    """
    Base64 URL 安全编码（无填充）
    
    与 JavaScript 的实现保持一致：
    btoa(String.fromCharCode(...e)).replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=/g, "")
    """
    encoded = base64.urlsafe_b64encode(data).decode('utf-8')
    # 移除填充的 =
    return encoded.rstrip('=')


def generate_state() -> str:
    """
    生成随机 state 参数（UUID 格式）
    """
    import uuid
    return str(uuid.uuid4())

