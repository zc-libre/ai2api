import {r as p, j as f, R as L} from "./vendor.js";
import {O as E, I as j, E as D, L as O, R, G as N} from "./client-kiro-internal.js";
const G = "modulepreload"
  , V = function(o) {
    return "/" + o
}
  , T = {}
  , k = function(e, t, r) {
    let s = Promise.resolve();
    if (t && t.length > 0) {
        let l = function(u) {
            return Promise.all(u.map(g => Promise.resolve(g).then(n => ({
                status: "fulfilled",
                value: n
            }), n => ({
                status: "rejected",
                reason: n
            }))))
        };
        document.getElementsByTagName("link");
        const a = document.querySelector("meta[property=csp-nonce]")
          , d = a?.nonce || a?.getAttribute("nonce");
        s = l(t.map(u => {
            if (u = V(u),
            u in T)
                return;
            T[u] = !0;
            const g = u.endsWith(".css")
              , n = g ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${u}"]${n}`))
                return;
            const c = document.createElement("link");
            if (c.rel = g ? "stylesheet" : G,
            g || (c.as = "script"),
            c.crossOrigin = "",
            c.href = u,
            d && c.setAttribute("nonce", d),
            document.head.appendChild(c),
            g)
                return new Promise( (h, w) => {
                    c.addEventListener("load", h),
                    c.addEventListener("error", () => w(new Error(`Unable to preload CSS for ${u}`)))
                }
                )
        }
        ))
    }
    function i(a) {
        const d = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (d.payload = a,
        window.dispatchEvent(d),
        !d.defaultPrevented)
            throw a
    }
    return s.then(a => {
        for (const d of a || [])
            d.status === "rejected" && i(d.reason);
        return e().catch(i)
    }
    )
};
class C extends Error {
    constructor(e, t, r) {
        super(t),
        this.authErrorType = e,
        this.userFacingErrorMessage = r,
        this.name = e
    }
}
class _ extends C {
    constructor(e, t) {
        super("MISSING_TOKEN", e, t)
    }
}
class U extends C {
    constructor(e, t) {
        super("INVALID_AUTH", e, t)
    }
}
class M extends C {
    constructor(e, t) {
        super("NETWORK_ERROR", e, t)
    }
}
class m extends C {
    constructor(e, t) {
        super("UNEXPECTED_ISSUE", e, t)
    }
}
class $ extends C {
    constructor(e) {
        super("SIGN_IN_BLOCKED", e)
    }
}
class b extends U {
    constructor() {
        super("Invalid invitation code entered", "Invalid access code.")
    }
}
class B extends C {
    constructor(e) {
        super("INVALID_AUTH", e, "There was an error signing in. Please contact Support (https://support.aws.amazon.com/#/contacts/kiro) for assistance."),
        this.name = "AccountSuspendedException"
    }
}
const H = {
    Google: "google",
    GitHub: "github",
    BuilderId: "builderid",
    Internal: "internal",
    Enterprise: "awsidc"
};
function v(o) {
    return H[o]
}
class K {
    client;
    constructor(e) {
        this.client = e
    }
    async initiateLogin({provider: e, redirectUri: t, codeChallenge: r, state: s, redirectFrom: i, region: a, startUrl: d}) {
        try {
            const l = {
                idp: e === "GitHub" ? "Github" : e === "Enterprise" ? "AWSIdC" : e,
                redirectUri: t,
                codeChallenge: r,
                codeChallengeMethod: "S256",
                state: s,
                ...i && {
                    redirectFrom: i
                },
                ...a && {
                    idcRegion: a
                },
                ...d && {
                    startUrl: d
                }
            };
            return (await this.client.send(new j(l))).redirectUrl ?? ""
        } catch (l) {
            throw this.translateError(l)
        }
    }
    async exchangeToken({code: e, codeVerifier: t, redirectUri: r, provider: s, invitationCode: i, state: a}) {
        try {
            const d = {
                idp: this.mapProviderToIdp(s),
                code: e,
                codeVerifier: t,
                redirectUri: r,
                ...i && {
                    invitationCode: i
                },
                ...a && {
                    state: a
                }
            }
              , l = await this.client.send(new D(d));
            return {
                csrfToken: l.csrfToken ?? "",
                state: l.state,
                accessToken: l.accessToken ?? ""
            }
        } catch (d) {
            throw this.translateError(d, {
                withInvitationCode: !!i
            })
        }
    }
    async logout() {
        try {
            await this.client.send(new O({}))
        } catch (e) {
            throw this.translateError(e)
        }
    }
    async deleteAccount() {}
    async refreshToken(e) {
        try {
            const t = await this.client.send(new R({
                csrfToken: e
            }));
            return {
                csrfToken: t.csrfToken ?? "",
                accessToken: t.accessToken ?? ""
            }
        } catch (t) {
            throw this.translateError(t)
        }
    }
    async getUserInfo(e) {
        try {
            return await this.client.send(new N(e))
        } catch (t) {
            throw this.translateError(t)
        }
    }
    mapProviderToIdp(e) {
        return e === "GitHub" ? "Github" : e
    }
    isErrorWithName(e) {
        return e !== null && typeof e == "object" && "name"in e
    }
    translateError(e, t={}) {
        if (this.isErrorWithName(e)) {
            const r = e.name
              , s = e.message ?? "";
            if (r === "SignUpPausedError")
                return t.withInvitationCode ? new b : new $("Sign-in temporarily not allowed");
            if (r === "InvalidInvitationCodeError")
                return new b;
            if (r === "UnauthorizedError" || r === "InvalidTokenError")
                return new U(s);
            if (r === "NetworkError" || r === "TimeoutError")
                return new M(s);
            if (r === "AccountSuspendedException")
                return new B(s)
        }
        return new m("Authentication service error")
    }
}
const z = o => typeof o == "object";
class W {
    authServiceClient;
    pendingAuthState;
    storage;
    getUserInfo;
    getAccessToken;
    getCsrfToken;
    authCallbacks;
    constructor({storage: e, client: t, getUserInfo: r, getAccessToken: s, getCsrfToken: i, authCallbacks: a}) {
        this.authServiceClient = new K(t),
        this.storage = e,
        this.getUserInfo = r,
        this.getAccessToken = s,
        this.getCsrfToken = i,
        this.authCallbacks = a
    }
    async refreshAuth() {
        const e = this.getCsrfToken()
          , {csrfToken: t, accessToken: r} = await this.authServiceClient.refreshToken(e);
        this.authCallbacks.updateCsrfToken(t),
        this.authCallbacks.updateAccessToken(r);
        const s = await this.authServiceClient.getUserInfo({
            origin: E.KIRO_IDE
        });
        this.authCallbacks.updateUserInfo({
            userId: s.userId,
            userStatus: s.status === "Active" ? "active" : "stale",
            email: s.email,
            featureFlags: s.featureFlags,
            idp: s.idp
        }),
        window.location.hostname === "localhost.app.kiro.dev" && k(async () => {
            const {storeLocalDevCookies: i} = await Promise.resolve().then( () => S);
            return {
                storeLocalDevCookies: i
            }
        }
        , void 0).then( ({storeLocalDevCookies: i}) => i()).catch( () => {}
        )
    }
    async authenticate(e) {
        const {cliParams: t, invitationCode: r, journeyId: s, journeySource: i, journeyStartTime: a, provider: d} = e
          , l = z(t)
          , u = new URLSearchParams(window.location.search)
          , g = u.get("redemption_code") ?? void 0
          , n = u.get("redirect_to_after_auth") ?? void 0;
        if ((d === "BuilderId" || d === "Internal") && l)
            return this.handleIdCCLIFlow(e);
        if (d === "Enterprise") {
            if (!l)
                throw new m("Enterprise authentication is only supported with CLI integration");
            return this.handleEnterpriseCLIFlow(e)
        }
        const c = l ? t.state : crypto.randomUUID()
          , h = this.generateCodeVerifier()
          , w = l ? t.codeChallenge : await this.generateCodeChallenge(h)
          , I = v(e.provider)
          , y = l ? `${t.redirectUri}/oauth/callback?login_option=${I}` : `${window.location.origin}/signin/oauth`;
        if (this.pendingAuthState = {
            codeVerifier: h,
            state: c,
            redirectUri: y,
            provider: d,
            invitationCode: r,
            cliParams: t,
            journeyId: s,
            journeySource: i,
            journeyStartTime: a,
            redemptionCode: g,
            redirectToAfterAuth: n
        },
        d !== "Google" && d !== "GitHub" && d !== "BuilderId")
            throw new m("Invalid provider for social authentication flow");
        const x = await this.authServiceClient.initiateLogin({
            provider: d,
            redirectUri: y,
            codeChallenge: w,
            state: c
        });
        if (this.storage && !l) {
            const {cliParams: te, ...F} = this.pendingAuthState;
            this.storage.writePendingAuth(F)
        }
        return window.location.href = x,
        new Promise( () => {}
        )
    }
    async handleIdCCLIFlow(e) {
        if (!e.cliParams)
            throw new m("CLI parameters are required for BuilderId/Internal authentication");
        const t = e.cliParams.state
          , r = e.cliParams.codeChallenge
          , s = v(e.provider)
          , i = `${e.cliParams.redirectUri}/signin/callback?login_option=${s}`
          , a = await this.authServiceClient.initiateLogin({
            provider: e.provider,
            redirectUri: i,
            codeChallenge: r,
            state: t,
            redirectFrom: "KiroCLI"
        });
        return window.location.href = a,
        new Promise( () => {}
        )
    }
    async handleEnterpriseCLIFlow(e) {
        if (!e.cliParams)
            throw new m("CLI parameters are required for Enterprise authentication");
        const t = e.cliParams.state
          , r = e.cliParams.codeChallenge
          , s = v(e.provider)
          , i = `${e.cliParams.redirectUri}/signin/callback?login_option=${s}`
          , a = await this.authServiceClient.initiateLogin({
            provider: e.provider,
            redirectUri: i,
            codeChallenge: r,
            state: t,
            redirectFrom: "KiroCLI",
            region: e.region,
            startUrl: e.startUrl
        });
        return window.location.href = a,
        new Promise( () => {}
        )
    }
    async completeAuthentication(e, t) {
        const r = this.storage?.readPendingAuth();
        if (!r)
            throw new m("No pending authentication state found");
        const s = r.provider;
        if (r.state !== t && s !== "BuilderId")
            throw new m("State mismatch");
        if (s !== "Google" && s !== "GitHub" && s !== "BuilderId")
            throw new m("Invalid provider for token exchange");
        const {csrfToken: i, state: a, accessToken: d} = await this.authServiceClient.exchangeToken({
            code: e,
            codeVerifier: r.codeVerifier,
            redirectUri: r.redirectUri,
            provider: s,
            invitationCode: r.invitationCode,
            ...s === "BuilderId" && {
                state: t
            }
        });
        if (s === "BuilderId" && a && a !== r.state)
            throw new m("State mismatch in token exchange response");
        this.authCallbacks.updateCsrfToken(i),
        this.authCallbacks.updateAccessToken(d);
        const l = await this.authServiceClient.getUserInfo({
            origin: E.KIRO_IDE
        });
        return this.authCallbacks.updateUserInfo({
            userId: l.userId,
            userStatus: l.status === "Active" ? "active" : "stale",
            email: l.email,
            featureFlags: l.featureFlags,
            idp: l.idp
        }),
        {
            provider: r.provider,
            redemptionCode: r.redemptionCode,
            redirectToAfterAuth: r.redirectToAfterAuth
        }
    }
    async logout() {
        return this.authServiceClient.logout()
    }
    async deleteAccount() {
        return this.authServiceClient.deleteAccount()
    }
    generateCodeVerifier() {
        const e = new Uint8Array(32);
        return crypto.getRandomValues(e),
        this.base64UrlEncode(e)
    }
    async generateCodeChallenge(e) {
        const t = new TextEncoder().encode(e)
          , r = await crypto.subtle.digest("SHA-256", t);
        return this.base64UrlEncode(new Uint8Array(r))
    }
    base64UrlEncode(e) {
        return btoa(String.fromCharCode(...e)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    }
}
const A = "kiro-auth-pending";
class q {
    readPendingAuth() {
        try {
            const e = sessionStorage.getItem(A);
            return e ? JSON.parse(e) : null
        } catch {
            return null
        }
    }
    writePendingAuth(e) {
        sessionStorage.setItem(A, JSON.stringify(e))
    }
    clearPendingAuth() {
        sessionStorage.removeItem(A)
    }
}
class J {
    storage;
    provider;
    listeners = new Set;
    cachedAuthState = null;
    getUserInfo;
    getAccessToken;
    getCsrfToken;
    constructor(e) {
        this.storage = new q,
        this.getUserInfo = e.getUserInfo,
        this.getAccessToken = e.getAccessToken,
        this.getCsrfToken = e.getCsrfToken,
        this.provider = new W({
            storage: this.storage,
            client: e.client,
            getUserInfo: e.getUserInfo,
            getAccessToken: e.getAccessToken,
            getCsrfToken: e.getCsrfToken,
            authCallbacks: e.authCallbacks
        });
        const t = e.getUserInfo();
        t.userId && (this.cachedAuthState = {
            isLoggedIn: !0,
            userId: t.userId
        })
    }
    notifyListeners(e) {
        this.listeners.forEach(t => {
            t(e)
        }
        )
    }
    subscribe(e) {
        return this.listeners.add(e),
        () => this.listeners.delete(e)
    }
    async verifyAuthState() {
        const e = this.getUserInfo()
          , t = this.getAccessToken();
        if (e.userId) {
            if (!t || e.userStatus === "stale")
                try {
                    await this.provider.refreshAuth();
                    const i = this.getUserInfo()
                      , a = {
                        isLoggedIn: !!i.userId,
                        userId: i.userId
                    };
                    return this.cachedAuthState = a,
                    a
                } catch {
                    const i = {
                        isLoggedIn: !1
                    };
                    return this.cachedAuthState = i,
                    i
                }
            const s = {
                isLoggedIn: !0,
                userId: e.userId
            };
            return this.cachedAuthState = s,
            s
        }
        const r = {
            isLoggedIn: !1
        };
        return this.cachedAuthState = r,
        r
    }
    loadCachedAuthState() {
        return this.cachedAuthState ??= {
            isLoggedIn: !1
        }
    }
    isLoggedIn() {
        return this.cachedAuthState?.isLoggedIn ?? !1
    }
    async logout() {
        if (this.cachedAuthState?.isLoggedIn)
            try {
                await this.provider.logout()
            } catch {}
        this.cachedAuthState = {
            isLoggedIn: !1
        },
        this.notifyListeners(this.cachedAuthState),
        window.location.hostname === "localhost.app.kiro.dev" && k(async () => {
            const {deleteLocalDevCookies: e} = await Promise.resolve().then( () => S);
            return {
                deleteLocalDevCookies: e
            }
        }
        , void 0).then( ({deleteLocalDevCookies: e}) => e()).catch( () => {}
        )
    }
    async deleteAccount() {
        if (!this.isLoggedIn())
            throw new _("Not logged in");
        await this.provider.deleteAccount(),
        this.cachedAuthState = {
            isLoggedIn: !1
        },
        this.notifyListeners(this.cachedAuthState)
    }
    async authenticate(e) {
        const t = (e.journeySource ?? "web") === "web";
        this.isLoggedIn() && t && await this.logout();
        try {
            const r = await this.provider.authenticate(e)
              , s = this.getUserInfo();
            this.cachedAuthState = {
                provider: r,
                isLoggedIn: !0,
                userId: s.userId
            },
            this.notifyListeners(this.cachedAuthState)
        } catch (r) {
            throw t && await this.logout(),
            r
        }
    }
    async completeAuthenticationFromCallback(e) {
        const t = e.get("code")
          , r = e.get("state")
          , s = e.get("error");
        if (s)
            throw new Error(`Authentication error: ${s}`);
        if (!t || !r)
            throw new _("Missing code or state from callback");
        const {provider: i, redemptionCode: a, redirectToAfterAuth: d} = await this.provider.completeAuthentication(t, r);
        this.storage.clearPendingAuth();
        const l = this.getUserInfo();
        return this.cachedAuthState = {
            provider: i,
            isLoggedIn: !0,
            userId: l.userId
        },
        this.notifyListeners(this.cachedAuthState),
        window.location.hostname === "localhost.app.kiro.dev" && k(async () => {
            const {storeLocalDevCookies: u} = await Promise.resolve().then( () => S);
            return {
                storeLocalDevCookies: u
            }
        }
        , void 0).then( ({storeLocalDevCookies: u}) => u()).catch( () => {}
        ),
        {
            redemptionCode: a,
            redirectToAfterAuth: d
        }
    }
}
const X = o => {
    const e = L.useMemo( () => new J({
        client: o.oauthClient,
        getUserInfo: o.getUserInfo,
        getAccessToken: o.getAccessToken,
        getCsrfToken: o.getCsrfToken,
        authCallbacks: o.authCallbacks
    }), [o.oauthClient, o.getUserInfo, o.getAccessToken, o.getCsrfToken, o.authCallbacks])
      , [t,r] = p.useState({
        isAuthLoading: !0,
        isLoggedIn: !1,
        status: "idle"
    })
      , s = n => typeof n == "string" && (n === "GitHub" || n === "Google")
      , i = p.useCallback(n => {
        if (n.isLoggedIn) {
            const c = n.provider && s(n.provider) ? n.provider : void 0;
            r({
                isAuthLoading: !1,
                isLoggedIn: !0,
                userId: n.userId,
                provider: c,
                status: "authenticated"
            })
        } else
            r({
                isAuthLoading: !1,
                isLoggedIn: !1,
                userId: n.userId,
                status: "idle"
            })
    }
    , [])
      , a = p.useCallback(async () => {
        try {
            const n = await e.verifyAuthState();
            i(n)
        } catch (n) {
            const c = n;
            o.notifications?.show({
                title: "Authentication Verification Failed",
                message: c.message,
                color: "red",
                autoClose: 5e3
            }),
            r({
                isAuthLoading: !1,
                isLoggedIn: !1,
                status: "error",
                error: c
            })
        }
    }
    , [e, i, o]);
    p.useEffect( () => {
        const n = e.loadCachedAuthState();
        return n.isLoggedIn && s(n.provider) && r({
            isAuthLoading: !0,
            isLoggedIn: n.isLoggedIn,
            userId: n.userId,
            provider: n.provider,
            status: "authenticated"
        }),
        a(),
        e.subscribe(c => {
            i(c)
        }
        )
    }
    , [e, i, a]);
    const d = p.useCallback(async n => {
        r(c => ({
            ...c,
            isAuthLoading: !0,
            status: "loading"
        }));
        try {
            await e.authenticate(n),
            a()
        } catch (c) {
            const h = c instanceof Error ? c : new Error("Sign in failed");
            o.onError?.(h),
            o.notifications?.show({
                title: "Sign In Failed",
                message: h.message,
                color: "red",
                autoClose: 5e3
            }),
            r(w => ({
                ...w,
                isAuthLoading: !1,
                status: "error",
                error: h
            }))
        }
    }
    , [e, a, o])
      , l = p.useCallback(async () => {
        r(n => ({
            ...n,
            isAuthLoading: !0
        }));
        try {
            await e.logout(),
            o.authCallbacks.updateUserInfo({
                userId: "",
                userStatus: "anonymous"
            }),
            o.authCallbacks.updateCsrfToken(""),
            o.authCallbacks.updateAccessToken(""),
            r({
                isAuthLoading: !1,
                isLoggedIn: !1,
                status: "idle"
            })
        } catch (n) {
            const c = n;
            throw o.notifications?.show({
                title: "Sign Out Failed",
                message: c.message,
                color: "red",
                autoClose: 5e3
            }),
            r(h => ({
                ...h,
                isAuthLoading: !1,
                error: c
            })),
            n
        }
    }
    , [e, o])
      , u = p.useCallback(async () => {
        r(n => ({
            ...n,
            isAuthLoading: !0
        }));
        try {
            await e.deleteAccount(),
            a()
        } catch (n) {
            const c = n;
            throw o.notifications?.show({
                title: "Delete Account Failed",
                message: c.message,
                color: "red",
                autoClose: 5e3
            }),
            r(h => ({
                ...h,
                isAuthLoading: !1,
                error: c
            })),
            n
        }
    }
    , [e, a, o])
      , g = p.useCallback(async n => {
        r(c => ({
            ...c,
            isAuthLoading: !0,
            status: "loading"
        }));
        try {
            return await e.completeAuthenticationFromCallback(n)
        } catch (c) {
            const h = c instanceof Error ? c : new Error("Authentication failed");
            throw o.onError?.(h),
            o.notifications?.show({
                title: "Authentication Failed",
                message: h.message,
                color: "red",
                autoClose: 5e3
            }),
            r(w => ({
                ...w,
                isAuthLoading: !1,
                status: "error",
                error: h
            })),
            c
        }
    }
    , [e, o]);
    return L.useMemo( () => ({
        ...t,
        signIn: d,
        signOut: l,
        deleteAccount: u,
        completeAuthFromCallback: g
    }), [t, d, l, u, g])
}
  , P = p.createContext(void 0)
  , se = ({children: o, config: e}) => {
    const t = X(e);
    return f.jsx(P.Provider, {
        value: t,
        children: o
    })
}
  , Y = () => {
    const o = p.useContext(P);
    if (o === void 0)
        throw new Error("useAuth must be used within a OAuthProvider");
    return o
}
  , ne = ({loadingComponent: o, successComponent: e, errorComponent: t, onSuccess: r, onError: s}) => {
    const [i,a] = p.useState("loading")
      , [d,l] = p.useState()
      , {completeAuthFromCallback: u} = Y()
      , g = p.useRef(!1);
    return p.useEffect( () => {
        g.current || (async () => {
            g.current = !0;
            const n = new URLSearchParams(window.location.search);
            if (window.opener) {
                const c = n.get("code")
                  , h = n.get("state")
                  , w = n.get("error")
                  , I = window.opener;
                I.postMessage && I.postMessage({
                    type: "oauth-callback",
                    code: c,
                    state: h,
                    error: w
                }, window.location.origin),
                a("success"),
                r && r()
            } else
                try {
                    const c = await u(n);
                    a("success"),
                    r?.(c)
                } catch (c) {
                    const h = c instanceof Error ? c : new Error(String(c));
                    l(h),
                    a("error"),
                    s?.(h)
                }
        }
        )()
    }
    , [u, r, s]),
    i === "loading" ? o ? f.jsx(f.Fragment, {
        children: o
    }) : f.jsx("div", {
        children: "Completing authentication..."
    }) : i === "error" ? (console.log("error?.message", typeof d?.message),
    t ? f.jsx(f.Fragment, {
        children: t
    }) : f.jsxs("div", {
        children: [f.jsx("h2", {
            children: "Authentication Error"
        }), f.jsx("p", {
            children: d?.message.length ? d.message : "An error occurred during authentication"
        })]
    })) : e ? f.jsx(f.Fragment, {
        children: e
    }) : f.jsxs("div", {
        children: [f.jsx("h2", {
            children: "Authentication Complete"
        }), f.jsx("p", {
            children: window.opener ? "You can close this window" : "Redirecting..."
        })]
    })
}
  , Q = o => o.replace(/<[^>]*>/g, "").slice(0, 500)
  , ie = o => {
    const e = o.get("auth_status");
    if (!e || e !== "success" && e !== "error")
        return;
    const t = e === "success"
      , r = o.get("error_message")
      , s = o.get("redirect_from") === "kirocli";
    let i = t ? "Authorization success" : "Authorization failed";
    s && (i = `Kiro CLI ${i}`);
    let a;
    return !t && r && (a = Q(r)),
    {
        title: i,
        errorMessage: a
    }
}
  , ae = o => {
    const e = o.get("state")
      , t = o.get("code_challenge")
      , r = o.get("code_challenge_method")
      , s = o.get("redirect_uri")
      , i = o.get("redirect_from");
    if (!(!e || !t || !r || !s || !i))
        return {
            state: e,
            codeChallenge: t,
            codeChallengeMethod: r,
            redirectUri: s,
            redirectFrom: i,
            fromAmazonInternal: o.get("from_amazon_internal") === "true"
        }
}
;
async function Z() {
    try {
        await fetch("/__vite_dev_store_cookies", {
            method: "POST",
            credentials: "include"
        })
    } catch (o) {
        console.error("Failed to store local dev cookies:", o)
    }
}
async function ee() {
    try {
        await fetch("/__vite_dev_delete_cookies", {
            method: "POST",
            credentials: "include"
        })
    } catch (o) {
        console.error("Failed to delete local dev cookies:", o)
    }
}
const S = Object.freeze(Object.defineProperty({
    __proto__: null,
    deleteLocalDevCookies: ee,
    storeLocalDevCookies: Z
}, Symbol.toStringTag, {
    value: "Module"
}));
export {k as _, se as c, ie as d, Y as e, ae as h, ne as u};
