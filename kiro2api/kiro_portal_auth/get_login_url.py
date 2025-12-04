"""
获取 Kiro/AWS Builder ID 登录/注册链接

运行: python -m kiro_portal_auth.get_login_url

输出的 view.awsapps.com 链接在浏览器中打开会自动跳转到 signin.aws 注册页面
"""

import asyncio
import httpx
from .client import KiroPortalAuthClient
from .types import KiroStage


async def main():
    client = KiroPortalAuthClient(
        stage=KiroStage.PROD,
        use_bff_endpoint=True,
    )
    
    redirect_uri = "https://app.kiro.dev/signin/oauth"
    
    print("🔄 正在获取登录/注册链接...")
    print()
    
    # Step 1: 调用 InitiateLogin API
    login = await client.initiate_login(
        provider="BuilderId",
        redirect_uri=redirect_uri,
    )
    
    oidc_url = login.redirect_url
    
    # Step 2: 获取重定向 URL
    async with httpx.AsyncClient(follow_redirects=False, timeout=30.0) as http_client:
        response = await http_client.get(oidc_url)
        
        if response.status_code in (301, 302, 303, 307, 308):
            final_url = response.headers.get("location", "")
            
            print("=" * 70)
            print("✅ AWS Builder ID 登录/注册链接")
            print("=" * 70)
            print()
            print(final_url)
            print()
            print("-" * 70)
            print("📌 说明：在浏览器中打开此链接，会自动跳转到 AWS 登录/注册页面")
            print("   最终页面: https://us-east-1.signin.aws/platform/d-xxx/login?...")
            print("-" * 70)
            print()
            print("=" * 70)
            print("📝 PKCE 参数（后续换 Token 需要保存）")
            print("=" * 70)
            print(f"code_verifier : {login.code_verifier}")
            print(f"state         : {login.state}")
            print(f"redirect_uri  : {redirect_uri}")
            print("=" * 70)
        else:
            print(f"❌ 获取失败，状态码: {response.status_code}")


if __name__ == "__main__":
    asyncio.run(main())

