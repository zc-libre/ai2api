import {g as B, t as K, f as D, p as O, N as F, a as $, b as H, c as q, d as M, s as N, S as V, D as Q, F as X, e as Y, h as J, i as Z, l as j, k as ee, m as te, n as ne, o as se, C as re, q as oe, u as ae, v as ie, w as ce, x as de, y as le, z as me, A as ue, B as he, E as ge, G as pe, H as fe, I as Ce, J as ve, K as o, L as m, _ as a, M as u, O as h, P as v, Q as be, T as Se, U as Pe, V as l, W as P, X as b, Y as y, Z as x, $ as d, a0 as i, a1 as ye, a2 as I, a3 as z, a4 as g, a5 as p} from "./vendor.js";
const xe = async (e, n, s) => ({
    operation: B(n).operation
});
function Ue(e) {
    return {
        schemeId: "smithy.api#noAuth"
    }
}
const Ae = e => {
    const n = [];
    switch (e.operation) {
    default:
        n.push(Ue())
    }
    return n
}
  , Ee = e => ({
    ...e
})
  , _e = "1.0.0"
  , Re = {
    version: _e
}
  , Le = e => ({
    apiVersion: "2022-07-26",
    base64Decoder: e?.base64Decoder ?? q,
    base64Encoder: e?.base64Encoder ?? H,
    disableHostPrefix: e?.disableHostPrefix ?? !1,
    extensions: e?.extensions ?? [],
    httpAuthSchemeProvider: e?.httpAuthSchemeProvider ?? Ae,
    httpAuthSchemes: e?.httpAuthSchemes ?? [{
        schemeId: "smithy.api#noAuth",
        identityProvider: n => n.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        signer: new $
    }],
    logger: e?.logger ?? new F,
    urlParser: e?.urlParser ?? O,
    utf8Decoder: e?.utf8Decoder ?? D,
    utf8Encoder: e?.utf8Encoder ?? K
})
  , ke = e => {
    const n = M(e)
      , s = () => n().then(j);
    return {
        ...Le(e),
        ...e,
        runtime: "browser",
        defaultsMode: n,
        bodyLengthChecker: e?.bodyLengthChecker ?? Z,
        defaultUserAgentProvider: e?.defaultUserAgentProvider ?? J({
            clientVersion: Re.version
        }),
        maxAttempts: e?.maxAttempts ?? Y,
        requestHandler: X.create(e?.requestHandler ?? s),
        retryMode: e?.retryMode ?? (async () => (await s()).retryMode || Q),
        sha256: e?.sha256 ?? V,
        streamCollector: e?.streamCollector ?? N
    }
}
  , Te = e => {
    let n = e.httpAuthSchemes
      , s = e.httpAuthSchemeProvider;
    return {
        setHttpAuthScheme(t) {
            const r = n.findIndex(U => U.schemeId === t.schemeId);
            r === -1 ? n.push(t) : n.splice(r, 1, t)
        },
        httpAuthSchemes() {
            return n
        },
        setHttpAuthSchemeProvider(t) {
            s = t
        },
        httpAuthSchemeProvider() {
            return s
        }
    }
}
  , Ie = e => ({
    httpAuthSchemes: e.httpAuthSchemes(),
    httpAuthSchemeProvider: e.httpAuthSchemeProvider()
})
  , A = e => e
  , ze = (e, n) => {
    const s = {
        ...A(te(e)),
        ...A(ee(e)),
        ...A(Te(e))
    };
    return n.forEach(t => t.configure(s)),
    {
        ...e,
        ...se(s),
        ...ne(s),
        ...Ie(s)
    }
}
;
class Qt extends re {
    config;
    constructor(...[n]) {
        let s = ke(n || {})
          , t = oe(s)
          , r = ae(t)
          , U = ie(r)
          , w = fe(U)
          , G = Ee(w)
          , T = ze(G, n?.extensions || []);
        super(T),
        this.config = T,
        this.middlewareStack.use(ce(this.config)),
        this.middlewareStack.use(de(this.config)),
        this.middlewareStack.use(le(this.config)),
        this.middlewareStack.use(me(this.config)),
        this.middlewareStack.use(ue(this.config)),
        this.middlewareStack.use(he(this.config)),
        this.middlewareStack.use(ge(this.config, {
            httpAuthSchemeParametersProvider: xe,
            identityProviderConfigProvider: async Nt => new Ce({})
        })),
        this.middlewareStack.use(pe(this.config))
    }
    destroy() {
        super.destroy()
    }
}
class S extends ve {
    constructor(n) {
        super(n),
        Object.setPrototypeOf(this, S.prototype)
    }
}
class E extends S {
    name = "AccountSuspendedException";
    $fault = "client";
    constructor(n) {
        super({
            name: "AccountSuspendedException",
            $fault: "client",
            ...n
        }),
        Object.setPrototypeOf(this, E.prototype)
    }
}
class _ extends S {
    name = "BadRequestException";
    $fault = "client";
    constructor(n) {
        super({
            name: "BadRequestException",
            $fault: "client",
            ...n
        }),
        Object.setPrototypeOf(this, _.prototype)
    }
}
class R extends S {
    name = "InternalFailureException";
    $fault = "server";
    constructor(n) {
        super({
            name: "InternalFailureException",
            $fault: "server",
            ...n
        }),
        Object.setPrototypeOf(this, R.prototype)
    }
}
class L extends S {
    name = "ThrottlingException";
    $fault = "client";
    constructor(n) {
        super({
            name: "ThrottlingException",
            $fault: "client",
            ...n
        }),
        Object.setPrototypeOf(this, L.prototype)
    }
}
class k extends S {
    name = "UnauthorizedException";
    $fault = "client";
    constructor(n) {
        super({
            name: "UnauthorizedException",
            $fault: "client",
            ...n
        }),
        Object.setPrototypeOf(this, k.prototype)
    }
}
const We = e => ({
    ...e,
    ...e.csrfToken && {
        csrfToken: o
    }
})
  , Xt = {
    AWSIdC: "AWSIdC",
    BuilderId: "BuilderId",
    Github: "Github",
    Google: "Google",
    Internal: "Internal"
}
  , we = e => ({
    ...e,
    ...e.code && {
        code: o
    },
    ...e.codeVerifier && {
        codeVerifier: o
    },
    ...e.state && {
        state: o
    }
})
  , Ge = e => ({
    ...e,
    ...e.csrfToken && {
        csrfToken: o
    },
    ...e.state && {
        state: o
    },
    ...e.accessToken && {
        accessToken: o
    }
})
  , Yt = {
    Q_DEVELOPER_STANDALONE_FREE: "Q_DEVELOPER_STANDALONE_FREE"
}
  , Be = e => ({
    ...e,
    ...e.csrfToken && {
        csrfToken: o
    }
})
  , Ke = e => ({
    ...e,
    ...e.csrfToken && {
        csrfToken: o
    }
})
  , De = e => ({
    ...e,
    ...e.content && {
        content: o
    },
    ...e.redirectUrl && {
        redirectUrl: o
    },
    ...e.cookie && {
        cookie: o
    },
    ...e.headers && {
        headers: o
    }
})
  , Jt = {
    KIRO_IDE: "KIRO_IDE"
}
  , Oe = e => ({
    ...e,
    ...e.email && {
        email: o
    }
})
  , Zt = {
    CREDIT: "CREDIT"
}
  , Fe = e => ({
    ...e,
    ...e.csrfToken && {
        csrfToken: o
    }
})
  , $e = e => ({
    ...e,
    ...e.email && {
        email: o
    }
})
  , He = e => ({
    ...e,
    ...e.userInfo && {
        userInfo: $e(e.userInfo)
    }
})
  , qe = e => ({
    ...e,
    ...e.content && {
        content: o
    },
    ...e.redirectUrl && {
        redirectUrl: o
    },
    ...e.cookie && {
        cookie: o
    },
    ...e.headers && {
        headers: o
    }
})
  , Me = e => ({
    ...e,
    ...e.state && {
        state: o
    },
    ...e.codeChallenge && {
        codeChallenge: o
    }
})
  , Ne = e => ({
    ...e,
    ...e.redirectUrl && {
        redirectUrl: o
    },
    ...e.clientSecret && {
        clientSecret: o
    }
})
  , Ve = e => ({
    ...e,
    ...e.csrfToken && {
        csrfToken: o
    }
})
  , Qe = e => ({
    ...e,
    ...e.csrfToken && {
        csrfToken: o
    }
})
  , Xe = e => ({
    ...e,
    ...e.csrfToken && {
        csrfToken: o
    },
    ...e.accessToken && {
        accessToken: o
    }
})
  , Ye = e => ({
    ...e,
    ...e.csrfToken && {
        csrfToken: o
    }
})
  , Je = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/CreateUserBonus", void 0, t)
}
  , Ze = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/DeleteAccount", void 0, t)
}
  , je = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/ExchangeToken", void 0, t)
}
  , et = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/GenerateSubscriptionManagementUrl", void 0, t)
}
  , tt = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/GetAvailableSubscriptionPlans", void 0, t)
}
  , nt = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/GetRootPage", void 0, t)
}
  , st = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/GetUserInfo", void 0, t)
}
  , rt = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/GetUserUsageAndLimits", void 0, t)
}
  , ot = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/GetWebPage", void 0, t)
}
  , at = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/InitiateLogin", void 0, t)
}
  , it = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/Logout", void 0, t)
}
  , ct = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(a(e)),
    u(n, s, "/service/KiroWebPortalService/operation/RefreshToken", void 0, t)
}
  , dt = async (e, n) => {
    const s = C;
    let t;
    return t = m.serialize(Lt(e)),
    u(n, s, "/service/KiroWebPortalService/operation/UpdateBillingPreferences", void 0, t)
}
  , lt = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = It(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , mt = async (e, n) => (h(e),
e.statusCode >= 300 ? f(e, n) : (await z(e.body, n),
{
    $metadata: c(e)
}))
  , ut = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = a(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , ht = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = a(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , gt = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = Wt(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , pt = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = wt(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , ft = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = a(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , Ct = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = Gt(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , vt = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = Bt(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , bt = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = a(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , St = async (e, n) => (h(e),
e.statusCode >= 300 ? f(e, n) : (await z(e.body, n),
{
    $metadata: c(e)
}))
  , Pt = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = a(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , yt = async (e, n) => {
    if (h(e),
    e.statusCode >= 300)
        return f(e, n);
    const s = await v(e.body, n);
    let t = {};
    return t = a(s),
    {
        $metadata: c(e),
        ...t
    }
}
  , f = async (e, n) => {
    const s = {
        ...e,
        body: await be(e.body, n)
    }
      , t = Se(e, s.body);
    switch (t) {
    case "AccountSuspendedException":
    case "com.amazon.kirowebportalservice#AccountSuspendedException":
        throw await xt(s);
    case "BadRequestException":
    case "com.amazon.kirowebportalservice#BadRequestException":
        throw await Ut(s);
    case "InternalFailureException":
    case "com.amazon.kirowebportalservice#InternalFailureException":
        throw await At(s);
    case "ThrottlingException":
    case "com.amazon.kirowebportalservice#ThrottlingException":
        throw await Et(s);
    case "UnauthorizedException":
    case "com.amazon.kirowebportalservice#UnauthorizedException":
        throw await _t(s);
    default:
        const r = s.body;
        return Mt({
            output: e,
            parsedBody: r,
            errorCode: t
        })
    }
}
  , xt = async (e, n) => {
    const s = e.body
      , t = a(s)
      , r = new E({
        $metadata: c(e),
        ...t
    });
    return x(r, s)
}
  , Ut = async (e, n) => {
    const s = e.body
      , t = a(s)
      , r = new _({
        $metadata: c(e),
        ...t
    });
    return x(r, s)
}
  , At = async (e, n) => {
    const s = e.body
      , t = a(s)
      , r = new R({
        $metadata: c(e),
        ...t
    });
    return x(r, s)
}
  , Et = async (e, n) => {
    const s = e.body
      , t = a(s)
      , r = new L({
        $metadata: c(e),
        ...t
    });
    return x(r, s)
}
  , _t = async (e, n) => {
    const s = e.body
      , t = a(s)
      , r = new k({
        $metadata: c(e),
        ...t
    });
    return x(r, s)
}
  , Rt = (e, n) => l(e, {
    maxOverageAmount: [],
    overageEnabled: []
})
  , Lt = (e, n) => l(e, {
    csrfToken: [],
    overageConfiguration: s => Rt(s),
    profileArn: []
})
  , kt = (e, n) => l(e, {
    bonusCode: i,
    currentUsage: d,
    description: i,
    displayName: i,
    expiresAt: s => P(y(s)),
    redeemedAt: s => P(y(s)),
    status: i,
    usageLimit: d
})
  , Tt = (e, n) => (e || []).filter(t => t != null).map(t => kt(t))
  , It = (e, n) => l(e, {
    amount: d,
    bonusCode: i,
    expirationDate: s => P(y(s))
})
  , zt = (e, n) => l(e, {
    currentUsage: b,
    currentUsageWithPrecision: d,
    freeTrialExpiry: s => P(y(s)),
    freeTrialStatus: i,
    usageLimit: b,
    usageLimitWithPrecision: d
})
  , Wt = (e, n) => l(e, {
    disclaimer: a,
    subscriptionPlans: s => Ft(s)
})
  , wt = (e, n) => l(e, {
    content: [],
    contentSecurityPolicy: i,
    contentType: i,
    cookie: i,
    headers: a,
    httpResponseCode: b,
    redirectUrl: i
})
  , Gt = (e, n) => l(e, {
    daysUntilReset: b,
    limits: s => qt(s),
    nextDateReset: s => P(y(s)),
    overageConfiguration: s => Kt(s),
    subscriptionInfo: a,
    usageBreakdown: s => W(s),
    usageBreakdownList: s => $t(s),
    userInfo: a
})
  , Bt = (e, n) => l(e, {
    content: [],
    contentSecurityPolicy: i,
    contentType: i,
    cookie: i,
    headers: a,
    httpResponseCode: b,
    redirectUrl: i
})
  , Kt = (e, n) => l(e, {
    maxOverageAmount: d,
    overageEnabled: ye
})
  , Dt = (e, n) => l(e, {
    amount: d,
    currency: i
})
  , Ot = (e, n) => l(e, {
    description: a,
    name: i,
    pricing: s => Dt(s),
    qSubscriptionType: i
})
  , Ft = (e, n) => (e || []).filter(t => t != null).map(t => Ot(t))
  , W = (e, n) => l(e, {
    bonuses: s => Tt(s),
    currency: i,
    currentOverages: b,
    currentOveragesWithPrecision: d,
    currentUsage: b,
    currentUsageWithPrecision: d,
    displayName: i,
    displayNamePlural: i,
    freeTrialInfo: s => zt(s),
    nextDateReset: s => P(y(s)),
    overageCap: b,
    overageCapWithPrecision: d,
    overageCharges: d,
    overageRate: d,
    resourceType: i,
    unit: i,
    usageLimit: b,
    usageLimitWithPrecision: d
})
  , $t = (e, n) => (e || []).filter(t => t != null).map(t => W(t))
  , Ht = (e, n) => l(e, {
    currentUsage: I,
    percentUsed: d,
    totalUsageLimit: I,
    type: i
})
  , qt = (e, n) => (e || []).filter(t => t != null).map(t => Ht(t))
  , c = e => ({
    httpStatusCode: e.statusCode,
    requestId: e.headers["x-amzn-requestid"] ?? e.headers["x-amzn-request-id"] ?? e.headers["x-amz-request-id"],
    extendedRequestId: e.headers["x-amz-id-2"],
    cfId: e.headers["x-amz-cf-id"]
})
  , Mt = Pe(S)
  , C = {
    "content-type": "application/cbor",
    "smithy-protocol": "rpc-v2-cbor",
    accept: "application/cbor"
};
class jt extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "CreateUserBonus", {}).n("KiroWebPortalServiceClient", "CreateUserBonusCommand").f(void 0, void 0).ser(Je).de(lt).build() {
}
class en extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "DeleteAccount", {}).n("KiroWebPortalServiceClient", "DeleteAccountCommand").f(We, void 0).ser(Ze).de(mt).build() {
}
class tn extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "ExchangeToken", {}).n("KiroWebPortalServiceClient", "ExchangeTokenCommand").f(we, Ge).ser(je).de(ut).build() {
}
class nn extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "GenerateSubscriptionManagementUrl", {}).n("KiroWebPortalServiceClient", "GenerateSubscriptionManagementUrlCommand").f(Be, void 0).ser(et).de(ht).build() {
}
class sn extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "GetAvailableSubscriptionPlans", {}).n("KiroWebPortalServiceClient", "GetAvailableSubscriptionPlansCommand").f(Ke, void 0).ser(tt).de(gt).build() {
}
class rn extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "GetRootPage", {}).n("KiroWebPortalServiceClient", "GetRootPageCommand").f(void 0, De).ser(nt).de(pt).build() {
}
class on extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "GetUserInfo", {}).n("KiroWebPortalServiceClient", "GetUserInfoCommand").f(void 0, Oe).ser(st).de(ft).build() {
}
class an extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "GetUserUsageAndLimits", {}).n("KiroWebPortalServiceClient", "GetUserUsageAndLimitsCommand").f(Fe, He).ser(rt).de(Ct).build() {
}
class cn extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "GetWebPage", {}).n("KiroWebPortalServiceClient", "GetWebPageCommand").f(void 0, qe).ser(ot).de(vt).build() {
}
class dn extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "InitiateLogin", {}).n("KiroWebPortalServiceClient", "InitiateLoginCommand").f(Me, Ne).ser(at).de(bt).build() {
}
class ln extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "Logout", {}).n("KiroWebPortalServiceClient", "LogoutCommand").f(Ve, void 0).ser(it).de(St).build() {
}
class mn extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "RefreshToken", {}).n("KiroWebPortalServiceClient", "RefreshTokenCommand").f(Qe, Xe).ser(ct).de(Pt).build() {
}
class un extends g.classBuilder().m(function(n, s, t, r) {
    return [p(t, this.serialize, this.deserialize)]
}).s("KiroWebPortalService", "UpdateBillingPreferences", {}).n("KiroWebPortalServiceClient", "UpdateBillingPreferencesCommand").f(Ye, void 0).ser(dt).de(yt).build() {
}
export {jt as C, en as D, tn as E, on as G, dn as I, Qt as K, ln as L, Jt as O, mn as R, Yt as S, un as U, nn as a, sn as b, rn as c, an as d, cn as e, Xt as f, Zt as g};
