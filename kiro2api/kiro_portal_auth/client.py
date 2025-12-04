"""
Kiro Portal Auth Client

实现 Kiro Web Portal 的认证流程，使用 CBOR 编码与 KiroWebPortalService 通信。
"""

import logging
from typing import Optional
from dataclasses import dataclass

import httpx
import cbor2

from .types import (
    KiroStage,
    InitiateLoginResponse,
    STAGE_TO_BFF_ENDPOINT,
    STAGE_TO_AUTH_ENDPOINT,
    PROVIDER_TO_IDP,
)
from .pkce import generate_code_verifier, generate_code_challenge, generate_state

logger = logging.getLogger(__name__)


# CBOR RPC 协议头
CBOR_HEADERS = {
    "content-type": "application/cbor",
    "smithy-protocol": "rpc-v2-cbor",
    "accept": "application/cbor",
}


@dataclass
class ExchangeTokenResponse:
    """ExchangeToken API 响应"""
    csrf_token: str
    access_token: str
    state: Optional[str] = None


class KiroPortalAuthClient:
    """
    Kiro Web Portal 认证客户端
    
    使用 CBOR 编码与 KiroWebPortalService 通信，支持：
    - InitiateLogin: 发起登录，获取重定向 URL
    - ExchangeToken: 用授权码换取 Token
    """
    
    def __init__(
        self,
        stage: KiroStage = KiroStage.PROD,
        use_bff_endpoint: bool = True,
        proxy: Optional[str] = None,
        timeout: float = 30.0,
    ):
        """
        初始化客户端
        
        Args:
            stage: Kiro 环境阶段
            use_bff_endpoint: 是否使用 BFF 端点（推荐），否则使用 Auth 端点
            proxy: 代理服务器地址
            timeout: 请求超时时间（秒）
        """
        self.stage = stage
        self.use_bff_endpoint = use_bff_endpoint
        self.proxy = proxy
        self.timeout = timeout
        
        if use_bff_endpoint:
            self.base_url = STAGE_TO_BFF_ENDPOINT[stage]
        else:
            self.base_url = STAGE_TO_AUTH_ENDPOINT[stage]
    
    def _get_service_url(self, operation: str) -> str:
        """获取服务 API URL"""
        return f"{self.base_url}/service/KiroWebPortalService/operation/{operation}"
    
    async def _send_cbor_request(
        self,
        operation: str,
        payload: dict,
        headers: Optional[dict] = None,
    ) -> dict:
        """
        发送 CBOR 编码的 RPC 请求
        
        Args:
            operation: API 操作名称
            payload: 请求负载
            headers: 额外的请求头
        
        Returns:
            解码后的响应数据
        """
        url = self._get_service_url(operation)
        
        # 编码请求体
        body = cbor2.dumps(payload)
        
        # 合并请求头
        request_headers = {**CBOR_HEADERS}
        if headers:
            request_headers.update(headers)
        
        async with httpx.AsyncClient(proxy=self.proxy, timeout=self.timeout) as client:
            response = await client.post(
                url,
                content=body,
                headers=request_headers,
            )
            
            if response.status_code != 200:
                error_text = response.text
                logger.error(f"Kiro API 请求失败: {operation} {response.status_code} {error_text}")
                response.raise_for_status()
            
            # 解码响应
            return cbor2.loads(response.content)
    
    async def initiate_login(
        self,
        provider: str = "BuilderId",
        redirect_uri: str = "https://app.kiro.dev/signin/oauth",
        redirect_from: Optional[str] = None,
        region: Optional[str] = None,
        start_url: Optional[str] = None,
    ) -> InitiateLoginResponse:
        """
        发起登录请求
        
        Args:
            provider: 认证提供者 (Google, GitHub, BuilderId, Internal, Enterprise)
            redirect_uri: 登录成功后的重定向 URI
            redirect_from: 重定向来源（如 "KiroCLI"）
            region: IdC 区域（Enterprise 模式需要）
            start_url: AWS IAM Identity Center 起始 URL（Enterprise 模式需要）
        
        Returns:
            InitiateLoginResponse: 包含 redirect_url, code_verifier, state
        """
        # 生成 PKCE 参数
        code_verifier = generate_code_verifier()
        code_challenge = generate_code_challenge(code_verifier)
        state = generate_state()
        
        # 映射 provider 到 idp
        idp = PROVIDER_TO_IDP.get(provider, provider)
        
        # 构建请求负载
        payload = {
            "idp": idp,
            "redirectUri": redirect_uri,
            "codeChallenge": code_challenge,
            "codeChallengeMethod": "S256",
            "state": state,
        }
        
        # 可选参数
        if redirect_from:
            payload["redirectFrom"] = redirect_from
        if region:
            payload["idcRegion"] = region
        if start_url:
            payload["startUrl"] = start_url
        
        logger.debug(f"InitiateLogin 请求: provider={provider}, redirect_uri={redirect_uri}")
        
        # 发送请求
        response = await self._send_cbor_request("InitiateLogin", payload)
        
        redirect_url = response.get("redirectUrl", "")
        logger.info(f"InitiateLogin 成功: redirect_url={redirect_url[:80]}...")
        
        return InitiateLoginResponse(
            redirect_url=redirect_url,
            code_verifier=code_verifier,
            state=state,
        )
    
    async def exchange_token(
        self,
        code: str,
        code_verifier: str,
        redirect_uri: str,
        provider: str = "BuilderId",
        invitation_code: Optional[str] = None,
        state: Optional[str] = None,
    ) -> ExchangeTokenResponse:
        """
        用授权码换取 Token
        
        Args:
            code: 授权码（从回调 URL 获取）
            code_verifier: PKCE code_verifier
            redirect_uri: 与 initiate_login 相同的 redirect_uri
            provider: 认证提供者
            invitation_code: 邀请码（可选）
            state: state 参数（BuilderId 需要）
        
        Returns:
            ExchangeTokenResponse: 包含 csrf_token, access_token
        """
        # 映射 provider 到 idp
        idp = PROVIDER_TO_IDP.get(provider, provider)
        
        # 构建请求负载
        payload = {
            "idp": idp,
            "code": code,
            "codeVerifier": code_verifier,
            "redirectUri": redirect_uri,
        }
        
        if invitation_code:
            payload["invitationCode"] = invitation_code
        if state:
            payload["state"] = state
        
        logger.debug(f"ExchangeToken 请求: provider={provider}")
        
        # 发送请求
        response = await self._send_cbor_request("ExchangeToken", payload)
        
        logger.info("ExchangeToken 成功")
        
        return ExchangeTokenResponse(
            csrf_token=response.get("csrfToken", ""),
            access_token=response.get("accessToken", ""),
            state=response.get("state"),
        )
    
    async def refresh_token(self, csrf_token: str) -> ExchangeTokenResponse:
        """
        刷新 Token
        
        Args:
            csrf_token: CSRF Token
        
        Returns:
            ExchangeTokenResponse: 包含新的 csrf_token, access_token
        """
        payload = {
            "csrfToken": csrf_token,
        }
        
        logger.debug("RefreshToken 请求")
        
        response = await self._send_cbor_request("RefreshToken", payload)
        
        logger.info("RefreshToken 成功")
        
        return ExchangeTokenResponse(
            csrf_token=response.get("csrfToken", ""),
            access_token=response.get("accessToken", ""),
        )
    
    async def logout(self, csrf_token: Optional[str] = None) -> None:
        """
        登出
        
        Args:
            csrf_token: CSRF Token（可选）
        """
        payload = {}
        if csrf_token:
            payload["csrfToken"] = csrf_token
        
        logger.debug("Logout 请求")
        
        await self._send_cbor_request("Logout", payload)
        
        logger.info("Logout 成功")

