import {a6 as c, a7 as m, a8 as d, a9 as U, aa as v, ab as b, ac as A, ad as E, ae as T, af as L, ag as h, ah as P, ai as I, aj as B, ak as D, al as R, am as W, an as _} from "./vendor.js";
import {K as z, C as q, D as k, E as M, a as G, b as O, c as x, G as H, d as j, e as Q, I as J, L as N, R as V, U as S} from "./client-kiro-internal.js";
let g, C, y, w, $;
function qe({credentialsRefreshFunction: u, tokenRefreshFunction: e, customSdkEventTracker: s, endpointConfig: n, clientOptions: t}) {
    g = u,
    C = e,
    y = s,
    w = n,
    $ = t
}
function K() {
    if (g === void 0)
        throw new Error("Credentials refresh function not initialized");
    if (C === void 0)
        throw new Error("Token refresh function not initialized");
    if (y === void 0)
        throw new Error("Custom SDK event tracker not initialized");
    if (w === void 0)
        throw new Error("Endpoint config not initialized");
    return {
        credentials: g,
        token: C,
        customSdkEventTracker: y,
        endpointConfig: w,
        clientOptions: $ || {}
    }
}
const X = {};
function Y({region: u, endpoint: e, customSdkEventTracker: s, clientOptions: n}) {
    const {plugins: t, requestHandler: o, ...l} = n || {}
      , i = {
        region: u,
        endpoint: e,
        maxAttempts: 1,
        ...l
    };
    o && (i.requestHandler = o);
    const r = new z(i);
    return t && Array.isArray(t) && t.forEach(a => {
        a.applyToStack && a.applyToStack(r.middlewareStack)
    }
    ),
    s(r),
    r
}
function f(u="us-east-1") {
    const e = u
      , s = X;
    if (!s[e]) {
        const {customSdkEventTracker: n, endpointConfig: t, clientOptions: o} = K();
        s[e] = Y({
            region: u,
            customSdkEventTracker: n,
            endpoint: t.kirowebportalservice,
            clientOptions: o
        })
    }
    return s[e]
}
function Z(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => f(s).send(new q(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
function ee(u) {
    const e = c.c(9)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== n ? (o = ["CreateUserBonusCommand", n],
    e[0] = n,
    e[1] = o) : o = e[1];
    let l;
    e[2] !== n || e[3] !== s ? (l = () => f(s).send(new q(n)),
    e[2] = n,
    e[3] = s,
    e[4] = l) : l = e[4];
    let i;
    return e[5] !== t || e[6] !== o || e[7] !== l ? (i = {
        mutationKey: o,
        mutationFn: l,
        ...t
    },
    e[5] = t,
    e[6] = o,
    e[7] = l,
    e[8] = i) : i = e[8],
    m(i)
}
function ne(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => f(s).send(new k(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
function te(u) {
    const e = c.c(9)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== n ? (o = ["DeleteAccountCommand", n],
    e[0] = n,
    e[1] = o) : o = e[1];
    let l;
    e[2] !== n || e[3] !== s ? (l = () => f(s).send(new k(n)),
    e[2] = n,
    e[3] = s,
    e[4] = l) : l = e[4];
    let i;
    return e[5] !== t || e[6] !== o || e[7] !== l ? (i = {
        mutationKey: o,
        mutationFn: l,
        ...t
    },
    e[5] = t,
    e[6] = o,
    e[7] = l,
    e[8] = i) : i = e[8],
    m(i)
}
function oe(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["ExchangeTokenCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => f(s).send(new M(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function ie(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => f(s).send(new G(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
function se(u) {
    const e = c.c(9)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== n ? (o = ["GenerateSubscriptionManagementUrlCommand", n],
    e[0] = n,
    e[1] = o) : o = e[1];
    let l;
    e[2] !== n || e[3] !== s ? (l = () => f(s).send(new G(n)),
    e[2] = n,
    e[3] = s,
    e[4] = l) : l = e[4];
    let i;
    return e[5] !== t || e[6] !== o || e[7] !== l ? (i = {
        mutationKey: o,
        mutationFn: l,
        ...t
    },
    e[5] = t,
    e[6] = o,
    e[7] = l,
    e[8] = i) : i = e[8],
    m(i)
}
function re(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetAvailableSubscriptionPlansCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => f(s).send(new O(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function le(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetRootPageCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => f(s).send(new x(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function ae(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetUserInfoCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => f(s).send(new H(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function ue(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetUserUsageAndLimitsCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => f(s).send(new j(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function ce(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetWebPageCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => f(s).send(new Q(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function fe(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["InitiateLoginCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => f(s).send(new J(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function de(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["LogoutCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => f(s).send(new N(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function me(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["RefreshTokenCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => f(s).send(new V(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function pe(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => f(s).send(new S(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
function ge(u) {
    const e = c.c(9)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== n ? (o = ["UpdateBillingPreferencesCommand", n],
    e[0] = n,
    e[1] = o) : o = e[1];
    let l;
    e[2] !== n || e[3] !== s ? (l = () => f(s).send(new S(n)),
    e[2] = n,
    e[3] = s,
    e[4] = l) : l = e[4];
    let i;
    return e[5] !== t || e[6] !== o || e[7] !== l ? (i = {
        mutationKey: o,
        mutationFn: l,
        ...t
    },
    e[5] = t,
    e[6] = o,
    e[7] = l,
    e[8] = i) : i = e[8],
    m(i)
}
const ke = Object.freeze(Object.defineProperty({
    __proto__: null,
    KiroWebPortalServiceClient: f,
    getKiroWebPortalServiceClient: f,
    useCreateUserBonus: ee,
    useCreateUserBonusFn: Z,
    useDeleteAccount: te,
    useDeleteAccountFn: ne,
    useExchangeToken: oe,
    useGenerateSubscriptionManagementUrl: se,
    useGenerateSubscriptionManagementUrlFn: ie,
    useGetAvailableSubscriptionPlans: re,
    useGetRootPage: le,
    useGetUserInfo: ae,
    useGetUserUsageAndLimits: ue,
    useGetWebPage: ce,
    useInitiateLogin: fe,
    useLogout: de,
    useRefreshToken: me,
    useUpdateBillingPreferences: ge,
    useUpdateBillingPreferencesFn: pe
}, Symbol.toStringTag, {
    value: "Module"
}))
  , Ce = {};
function ye({region: u, token: e, endpoint: s, customSdkEventTracker: n, clientOptions: t}) {
    const {plugins: o, requestHandler: l, ...i} = t || {}
      , r = {
        region: u,
        token: e,
        endpoint: s,
        maxAttempts: 1,
        ...i
    }
      , a = new U(r);
    return o && Array.isArray(o) && o.forEach(F => {
        F.applyToStack && F.applyToStack(a.middlewareStack)
    }
    ),
    n(a),
    a
}
function p(u="us-east-1") {
    const e = u
      , s = Ce;
    if (!s[e]) {
        const {token: n, customSdkEventTracker: t, endpointConfig: o, clientOptions: l} = K();
        s[e] = ye({
            token: n,
            region: u,
            customSdkEventTracker: t,
            endpoint: o.bigweaverclient,
            clientOptions: l
        })
    }
    return s[e]
}
function Ge(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => p(s).send(new v(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
function Se(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => p(s).send(new b(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
function $e(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => p(s).send(new A(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
function Ke(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => p(s).send(new E(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
function Ue(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => p(s).send(new T(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
function ve(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetAgentTaskCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => p(s).send(new L(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function be(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetAgentTaskDetailsCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => p(s).send(new h(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function Ae(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetAgentUsageCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => p(s).send(new P(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function Ee(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetEnvironmentConfigurationCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => p(s).send(new I(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function Te(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["GetSessionCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => p(s).send(new B(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function Le(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["ListConnectionsCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => p(s).send(new D(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function he(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["ListInstancesCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => p(s).send(new R(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function Pe(u) {
    const e = c.c(11)
      , {region: s, input: n, options: t} = u;
    let o;
    e[0] !== t ? (o = t === void 0 ? {} : t,
    e[0] = t,
    e[1] = o) : o = e[1];
    const l = o;
    let i;
    e[2] !== n ? (i = ["ListSessionHistoryCommand", n],
    e[2] = n,
    e[3] = i) : i = e[3];
    let r;
    e[4] !== n || e[5] !== s ? (r = () => p(s).send(new W(n)),
    e[4] = n,
    e[5] = s,
    e[6] = r) : r = e[6];
    let a;
    return e[7] !== l || e[8] !== i || e[9] !== r ? (a = {
        queryKey: i,
        queryFn: r,
        ...l
    },
    e[7] = l,
    e[8] = i,
    e[9] = r,
    e[10] = a) : a = e[10],
    d(a)
}
function Ie(u) {
    const e = c.c(5)
      , {region: s, options: n} = u;
    let t;
    e[0] !== s ? (t = l => p(s).send(new _(l)),
    e[0] = s,
    e[1] = t) : t = e[1];
    let o;
    return e[2] !== n || e[3] !== t ? (o = {
        mutationFn: t,
        ...n
    },
    e[2] = n,
    e[3] = t,
    e[4] = o) : o = e[4],
    m(o)
}
export {$e as a, he as b, Ae as c, Le as d, Ke as e, Pe as f, p as g, be as h, qe as i, Te as j, ve as k, Ge as l, Ue as m, Ee as n, Se as o, Ie as p, ae as q, f as r, ie as s, re as t, ue as u, ne as v, ke as w};
