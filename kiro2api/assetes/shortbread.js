/*! For license information please see shortbread.js.LICENSE.txt */
!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var n = t();
        for (var a in n)
            ("object" == typeof exports ? exports : e)[a] = n[a]
    }
}(window, (function() {
    return function(e) {
        var t = {};
        function n(a) {
            if (t[a])
                return t[a].exports;
            var o = t[a] = {
                i: a,
                l: !1,
                exports: {}
            };
            return e[a].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, a) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: a
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var a = Object.create(null);
            if (n.r(a),
            Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var o in e)
                    n.d(a, o, function(t) {
                        return e[t]
                    }
                    .bind(null, o));
            return a
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 23)
    }([function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.act = function(e, t) {
            for (var n = [], o = 2; o < arguments.length; o++)
                n[o - 2] = arguments[o];
            if ("string" == typeof e)
                return {
                    type: e,
                    props: t,
                    children: n
                };
            if ("function" == typeof e)
                return e(a(a({}, t), {
                    children: n
                }), n);
            if (e.type)
                return {
                    type: e.type,
                    props: a(a({}, e.props), t),
                    children: n
                };
            throw Error("Unsupported tag type ".concat(e))
        }
        ,
        t.render = function e(t, n, a, s) {
            void 0 === a && (a = document);
            for (var c = Array.isArray(n) ? n : [n], l = null, u = function(n) {
                var c = n.type
                  , u = n.props
                  , d = n.children
                  , p = function(e, t, n, a) {
                    var s;
                    if ("svg" === n || r(t))
                        s = e.createElementNS("http://www.w3.org/2000/svg", n);
                    else {
                        if ("string" != typeof n)
                            throw Error("Unrecognized type ".concat(n, " (").concat(typeof n, ")"));
                        s = e.createElement(n)
                    }
                    return function(e, t) {
                        if (null === t)
                            return;
                        Object.keys(t).forEach((function(n) {
                            if (void 0 !== o[n.toLowerCase()])
                                e.addEventListener(o[n.toLowerCase()], t[n]);
                            else if ("style" === n)
                                (Object.keys(t.style) || []).forEach((function(n) {
                                    e.style[n] = t.style[n]
                                }
                                ));
                            else if ("events" === n) {
                                var a = t.events;
                                Object.keys(a).forEach((function(t) {
                                    e.addEventListener(o[t.toLowerCase()], a[t])
                                }
                                ))
                            } else {
                                var r = t[n];
                                void 0 !== r && e.setAttribute(i[n] || n, r)
                            }
                        }
                        ))
                    }(s, a),
                    s
                }(a, t, c, u);
                d && d.length > 0 && d.flat(1 / 0).forEach((function(t) {
                    if (null != t)
                        if ("string" == typeof t)
                            p.appendChild(a.createTextNode(t));
                        else if ("number" == typeof t)
                            p.appendChild(a.createTextNode(d.toString()));
                        else {
                            if (null === t)
                                throw Error("Unsupported child type ".concat(t));
                            e(p, t, a, !0)
                        }
                }
                ));
                var f = s ? t.appendChild(p) : t.insertBefore(p, t.firstChild);
                l || (l = f)
            }, d = 0, p = c; d < p.length; d++) {
                u(p[d])
            }
            return l
        }
        ;
        var o = {
            onclick: "click",
            onblur: "blur",
            onfocus: "focus",
            onchange: "change",
            onkeydown: "keydown",
            onkeyup: "keyup",
            onkeypress: "keypress"
        }
          , i = {
            className: "class",
            tabIndex: "tabindex",
            htmlFor: "for"
        };
        function r(e) {
            return !!e && ("svg" === e.tagName || r(e.parentNode))
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.CURRENT_MODAL_DATA_ATTR = t.MODAL_OPEN_BODY_CLASS = t.ERROR_MESSAGE_MODAL_TABTRAP_ID = t.TABTRAP_ID = t.ERROR_MESSAGE_MODAL_DISMISS_BTN_ID = t.CUSTOMIZE_SAVE_BTN_ID = t.CUSTOMIZE_CANCEL_BTN_ID = t.ERROR_MESSAGE_MODAL_ID = t.CUSTOMIZE_ID = t.BANNER_ACCEPT_BTN_ID = t.BANNER_DECLINE_BTN_ID = t.BANNER_CUSTOMIZE_BTN_ID = t.BANNER_ID = t.APP_ID = t.CONTAINER_ID = void 0,
        t.CONTAINER_ID = "awsccc-sb-ux-c",
        t.APP_ID = "awsccc-sb-a",
        t.BANNER_ID = "awsccc-cb",
        t.BANNER_CUSTOMIZE_BTN_ID = "awsccc-cb-btn-customize",
        t.BANNER_DECLINE_BTN_ID = "awsccc-cb-btn-decline",
        t.BANNER_ACCEPT_BTN_ID = "awsccc-cb-btn-accept",
        t.CUSTOMIZE_ID = "awsccc-cs",
        t.ERROR_MESSAGE_MODAL_ID = "awsccc-em-modal",
        t.CUSTOMIZE_CANCEL_BTN_ID = "awsccc-cs-btn-cancel",
        t.CUSTOMIZE_SAVE_BTN_ID = "awsccc-cs-btn-save",
        t.ERROR_MESSAGE_MODAL_DISMISS_BTN_ID = "awsccc-em-btn-dismiss",
        t.TABTRAP_ID = "awsccc-cs-tabtrap",
        t.ERROR_MESSAGE_MODAL_TABTRAP_ID = "awsccc-em-tabtrap",
        t.MODAL_OPEN_BODY_CLASS = "awsccc-modal-open",
        t.CURRENT_MODAL_DATA_ATTR = "data-awsccc-modal"
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ESC_REGIONS = t.CONSENT_COOKIE_CHANGED_EVENT = t.DEFAULT_DOMAIN_ESC = t.DEFAULT_TANGERINEBOX_DEV_DOMAIN = t.DEFAULT_NEW_AWS_DOMAIN = t.DEFAULT_DOMAIN = t.DEFAULT_LANGUAGE = t.ALL_ALLOWED = t.DEFAULT_COOKIE = t.DEFAULT_COOKIE_AGE = t.COOKIE_VERSION = void 0,
        t.COOKIE_VERSION = "1",
        t.DEFAULT_COOKIE_AGE = 31536e3,
        t.DEFAULT_COOKIE = {
            essential: !0,
            functional: !1,
            performance: !1,
            advertising: !1
        },
        t.ALL_ALLOWED = {
            essential: !0,
            functional: !0,
            performance: !0,
            advertising: !0
        },
        t.DEFAULT_LANGUAGE = "en-us",
        t.DEFAULT_DOMAIN = ".aws.amazon.com",
        t.DEFAULT_NEW_AWS_DOMAIN = ".aws.com",
        t.DEFAULT_TANGERINEBOX_DEV_DOMAIN = ".aws-dev.amazon.com",
        t.DEFAULT_DOMAIN_ESC = ".amazonaws-eusc.eu",
        t.CONSENT_COOKIE_CHANGED_EVENT = "cookie-consent-changed",
        t.ESC_REGIONS = ["eusc-de-east-1"]
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isConsoleSession = t.isESCPartition = t.isHostnameInGivenDomain = t.isProdConsole = void 0,
        t.update = function(e, t) {
            return Object.keys(t).forEach((function(n) {
                e[n] = t[n]
            }
            )),
            e
        }
        ,
        t.convertToArray = function(e) {
            return Array.prototype.slice.call(e)
        }
        ;
        var a = n(2)
          , o = {
            NONPROD: /alpha|beta|gamma|integ|preprod|pre-prod|aws-dev|local/i,
            PROD: /aws.amazon.com|amazonaws.cn|amazonaws-us-gov.com|aws.com|amazonaws.eu/i
        };
        t.isProdConsole = function() {
            var e = window.location.hostname;
            return o.PROD.test(e) && !o.NONPROD.test(e)
        }
        ;
        t.isHostnameInGivenDomain = function(e) {
            return window.location.hostname.endsWith(e)
        }
        ;
        t.isESCPartition = function() {
            return (0,
            t.isHostnameInGivenDomain)(a.DEFAULT_DOMAIN_ESC)
        }
        ;
        t.isConsoleSession = function() {
            var e = window;
            return !!(e.ConsoleNavService && e.ConsoleNavService.Model && e.ConsoleNavService.Model.currentService) && !!e.ConsoleNavService.Model.currentService.id
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.UNIT = t.TELEMETRY_TOKEN = t.METRICS = void 0,
        t.METRICS = {
            BANNER_CHECK: "checkForCookieConsent",
            BANNER_SHOW: "bannerShown",
            UI_MOUNTED: "uiMounted",
            CLICK_ACCEPT_ON_BANNER: "acceptAll",
            CLICK_DECLINE_ON_BANNER: "decline",
            SAVE_CUSTOMISED_COOKIE: "customize",
            CANCEL_CUSTOMISED_COOKIE: "cancel",
            MANNUAL_OPEN_PREFERENCE_MODAL: "customizeCookies",
            CHECK_GEOLOCATION_SUCCESS: "geolocationLatency",
            SAVED_COOKIE: "SaveConsentClicked"
        },
        t.TELEMETRY_TOKEN = {
            AWS: {
                PROD: "v1/9f5686a423270882693358982d9633c38dce8ce8a428936aa03c6ae420d332ce",
                GAMMA: "v1/e79f94465ef88edeff2eca4a76f97feaceb56490c3b06e8b0eacca1598958fab",
                BETA: "v1/f98974f7e8c3e20c9a3d2869bfb3414cf1a377d5f970cb6b4488ccc353dc9ecc"
            },
            ESC: {
                PROD: "v1/6faf86d25ce66c45fe623b16fd3667452a74cc9672bc0187d5fdf4e21179c5e7",
                GAMMA: "v1/d0bcac4b35cdea524008a1d4feb0028df4642ae069c38660cc52cdf7c1ef47e9",
                BETA: "v1/55f340570ba892f208aabda2c6e37c2877bc897c0d169f2b71cb880849b39135"
            }
        },
        t.UNIT = {
            COUNT: "count",
            MILLISECONDS: "milliseconds"
        }
    }
    , function(e, t, n) {
        "use strict";
        var a, o = this && this.__extends || (a = function(e, t) {
            return a = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            ,
            a(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            a(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        );
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.RefreshCredentialError = t.InvalidCredentialsError = t.MetaTagParsingError = t.TelemetryBrokerNotAvailableError = t.FailureRequestError = t.TerminalRequestError = t.TangerineBoxError = void 0;
        var i = function(e) {
            function t(t, n) {
                var a = e.call(this, t) || this;
                return a.message = t,
                a.originalError = n,
                a.name = a.constructor.name,
                n && (a.stack += "\nCaused by: " + n.stack),
                a
            }
            return o(t, e),
            t
        }(Error);
        t.TangerineBoxError = i;
        var r = function(e) {
            function t(t, n) {
                var a = e.call(this, t) || this;
                return a.message = t,
                a.metadata = n,
                a
            }
            return o(t, e),
            t
        }(i);
        t.TerminalRequestError = r;
        var s = function(e) {
            function t(t, n) {
                var a = e.call(this, t) || this;
                return a.message = t,
                a.metadata = n,
                a
            }
            return o(t, e),
            t
        }(i);
        t.FailureRequestError = s;
        var c = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return o(t, e),
            t
        }(i);
        t.TelemetryBrokerNotAvailableError = c;
        var l = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return o(t, e),
            t
        }(i);
        t.MetaTagParsingError = l;
        var u = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return o(t, e),
            t
        }(i);
        t.InvalidCredentialsError = u;
        var d = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return o(t, e),
            t
        }(i);
        t.RefreshCredentialError = d
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__awaiter || function(e, t, n, a) {
            return new (n || (n = Promise))((function(o, i) {
                function r(e) {
                    try {
                        c(a.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        c(a.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(r, s)
                }
                c((a = a.apply(e, t || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(e, t) {
            var n, a, o, i, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; r; )
                            try {
                                if (n = 1,
                                a && (o = 2 & i[0] ? a.return : i[0] ? a.throw || ((o = a.return) && o.call(a),
                                0) : a.next) && !(o = o.call(a, i[1])).done)
                                    return o;
                                switch (a = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    a = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        r.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(i);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                i = t.call(e, r)
                            } catch (e) {
                                i = [6, e],
                                a = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.DataParser = void 0;
        var i = n(5)
          , r = n(17)
          , s = function() {
            function e(e) {
                this.windowWithTelemetryBroker = this.findWindowWithTelemetryBroker(),
                this.metaTagContentCache = e,
                this.sessionDataCache = this.parseSessionDataMetaTag(this.windowWithTelemetryBroker)
            }
            return e.getInstance = function(t) {
                return this.metaDataProviderInstance || (this.metaDataProviderInstance = new e(t)),
                this.metaDataProviderInstance
            }
            ,
            e.prototype.getTelemetryBrokerWindow = function() {
                return this.windowWithTelemetryBroker
            }
            ,
            e.prototype.getMetaTagContent = function() {
                return this.metaTagContentCache || (this.metaTagContentCache = this.parseTangerineBoxMetaTag()),
                this.metaTagContentCache
            }
            ,
            e.prototype.getTelemetryMetaTagContent = function() {
                return this.telemetryMetaTagContentCache || (this.telemetryMetaTagContentCache = this.parseTangerineBoxTelemetryMetaTag()),
                this.telemetryMetaTagContentCache
            }
            ,
            e.prototype.getCredentialsConfig = function() {
                return {
                    browserCredsFullPath: this.getMetaTagContent().browserCredsFullPath,
                    csrfToken: this.getMetaTagContent().csrfToken
                }
            }
            ,
            e.prototype.parseTangerineBoxMetaTag = function() {
                var e = this.parseMetaTag("tb-data");
                if (!e)
                    throw new i.MetaTagParsingError("TangerineBox meta tag not found");
                try {
                    return JSON.parse(e)
                } catch (e) {
                    throw new i.MetaTagParsingError("Unable to parse TangerineBox meta tag contents",e instanceof Error ? e : new Error(String(e)))
                }
            }
            ,
            e.prototype.parseTangerineBoxTelemetryMetaTag = function() {
                var e = this.parseMetaTag("tbt-data");
                if (!e)
                    throw new i.MetaTagParsingError("TangerineBox Telemetry meta tag not found");
                try {
                    return JSON.parse(e)
                } catch (e) {
                    throw new i.MetaTagParsingError("Unable to parse TangerineBox Telemetry meta tag contents",e instanceof Error ? e : new Error(String(e)))
                }
            }
            ,
            e.prototype.parseMetaTag = function(e, t) {
                var n = (t ? t.document : document).querySelector("meta[name='".concat(e, "']"));
                if (n)
                    return n.content
            }
            ,
            e.prototype.parseCookie = function(e, t) {
                void 0 === t && (t = document.cookie);
                var n = t.match("".concat(e, "=([^;]*)"));
                if (n && n[1])
                    return n[1]
            }
            ,
            e.prototype.triggerLoggedOutDialog = function() {
                var e, t = void 0 !== this.parseMetaTag("awsc-widget-nav") || void 0 !== this.parseMetaTag("awsc-widget-next"), n = null !== (e = this.windowWithTelemetryBroker) && void 0 !== e ? e : window;
                void 0 !== n && (t ? n.dispatchEvent(this.createCustomEvent("auth-change-detected")) : n.AWSC && "function" == typeof this.windowWithTelemetryBroker.AWSC.jQuery && n.AWSC.jQuery(n.AWSC).trigger("auth-change-detected"))
            }
            ,
            e.prototype.createCustomEvent = function(e) {
                if ("undefined" != typeof window && "function" == typeof window.CustomEvent)
                    return new CustomEvent(e);
                var t = {
                    bubbles: !1,
                    cancelable: !1,
                    detail: null
                }
                  , n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
                n
            }
            ,
            e.prototype.parseSessionDataMetaTag = function(e) {
                var t = this.parseMetaTag("awsc-session-data", e);
                if (!t)
                    throw new i.MetaTagParsingError("Session data meta tag not found");
                try {
                    return JSON.parse(t)
                } catch (e) {
                    throw new i.MetaTagParsingError("Unable to parse session data meta tag content",e instanceof Error ? e : new Error(String(e)))
                }
            }
            ,
            e.prototype.getSessionDataValue = function(e) {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(t) {
                        return [2, this.sessionDataCache[e]]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getLogoutDetectionCookieName = function() {
                if (this.isPrismModeEnabled()) {
                    if (!this.sessionDataCache.sessionDifferentiator)
                        throw new i.MetaTagParsingError("sessionDifferentiator is not found in prism mode");
                    return e = this.sessionDataCache.sessionDifferentiator,
                    "".concat("__Secure-aws-session-id", "-").concat(e)
                }
                var e;
                return "aws-userInfo"
            }
            ,
            e.prototype.isPrismModeEnabled = function() {
                var e = this.getMetaTagContent().prismModeEnabled;
                return "boolean" == typeof e ? e : !!this.sessionDataCache.prismModeEnabled
            }
            ,
            e.prototype.findWindowWithTelemetryBroker = function() {
                for (var e = window; ; ) {
                    if (e[r.TELEMETRY_BROKER_PROPERTY_NAME])
                        return e;
                    if (e === e.parent)
                        return;
                    e = e.parent
                }
            }
            ,
            e
        }();
        t.DataParser = s
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.validateConfiguration = s,
        t.getConsentCookie = function(e, t) {
            void 0 === e && (e = function() {
                return document.cookie
            }
            );
            var n = c(e(), t);
            if (n)
                return {
                    essential: n.essential,
                    performance: n.performance,
                    functional: n.functional,
                    advertising: n.advertising
                };
            return
        }
        ,
        t.getId = l,
        t.setConsentCookie = function(e, t, n, c, d, p, f, h, m) {
            void 0 === n && (n = i.DEFAULT_COOKIE_AGE);
            void 0 === c && (c = o.default);
            void 0 === d && (d = u);
            void 0 === p && (p = s);
            void 0 === t && (t = (0,
            r.isESCPartition)() ? i.DEFAULT_DOMAIN_ESC : i.DEFAULT_DOMAIN);
            p({
                domain: t,
                log: f
            }, "customize");
            var b = l() || c(f, h, m)
              , k = a(a({}, e), {
                id: b,
                version: i.COOKIE_VERSION
            })
              , v = (g = k,
            {
                e: g.essential ? 1 : 0,
                p: g.performance ? 1 : 0,
                f: g.functional ? 1 : 0,
                a: g.advertising ? 1 : 0,
                i: g.id,
                v: g.version
            });
            var g;
            return d("awsccc=".concat(btoa(JSON.stringify(v)), "; domain=").concat(t, "; path=/; max-age=").concat(n, "; secure=true; SameSite=Lax")),
            k
        }
        ;
        var o = n(10)
          , i = n(2)
          , r = n(3);
        function s(e, t) {
            var n = e.domain
              , a = void 0 === n ? i.DEFAULT_DOMAIN : n
              , o = e.log
              , r = function(e) {
                return "." === e.charAt(0) && (e = e.slice(1)),
                e
            }(a)
              , s = window.location.hostname;
            return !!s.endsWith(r) || ((o ? o("error") : function() {}
            )("domainMismatch", {
                detail: "Domain mismatch",
                source: t,
                configuredDomain: a,
                actualDomain: s
            }),
            console.error("Shortbread failed to set user's cookie preference because the domain name that was passed in does not match the hostname of the application. \n        Configured domain: ".concat(a, ".\n        Actual domain: ").concat(s, ".\n        As a fallback, Shortbread is only allowing 'essential' cookies to be used.")),
            !1)
        }
        function c(e, t) {
            var n, a, o = e.match("(^|;)\\s*awsccc\\s*=\\s*([^;]+)"), i = t ? t("error") : function() {}
            ;
            if (o && o.length > 0)
                try {
                    var r = JSON.parse(atob(o[o.length - 1]));
                    return 1 === (a = r).e && "number" == typeof a.p && "number" == typeof a.f && "number" == typeof a.a && "string" == typeof a.i && "string" == typeof a.v ? {
                        essential: 1 === (n = r).e,
                        performance: 1 === n.p,
                        functional: 1 === n.f,
                        advertising: 1 === n.a,
                        id: n.i,
                        version: n.v
                    } : void i("getCookie", {
                        detail: "Cookie format is not valid",
                        cookie: r
                    })
                } catch (e) {
                    return void i("getCookie", {
                        detail: "Error parsing cookie",
                        cookie: o[o.length - 1]
                    })
                }
        }
        function l(e) {
            void 0 === e && (e = function() {
                return document.cookie
            }
            );
            var t = c(e());
            if (t && t.id)
                return t.id
        }
        function u(e) {
            document.cookie = e
        }
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
          , o = this && this.__rest || function(e, t) {
            var n = {};
            for (var a in e)
                Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (a = Object.getOwnPropertySymbols(e); o < a.length; o++)
                    t.indexOf(a[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[o]) && (n[a[o]] = e[a[o]])
            }
            return n
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n(42);
        var i = n(0);
        t.default = function(e) {
            var t = e.children
              , n = e.dataId
              , r = e.variant
              , s = void 0 === r ? "secondary" : r
              , c = e.text
              , l = e.events
              , u = void 0 === l ? {} : l
              , d = e.props
              , p = void 0 === d ? {} : d
              , f = o(e, ["children", "dataId", "variant", "text", "events", "props"]);
            return (0,
            i.act)("button", a({
                tabindex: "0",
                type: "submit",
                "data-id": n
            }, f, p, {
                onClick: u.onclick || f.onClick,
                class: "awsccc-u-btn awsccc-u-btn-".concat(s)
            }), (0,
            i.act)("span", null, c || t))
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.localizationDictionary = t.localizationRtl = void 0;
        var a = n(0)
          , o = n(26)
          , i = "https://aws.amazon.com/legal/cookies/";
        t.localizationRtl = ["ar-sa", "he-il"],
        t.localizationDictionary = {
            "ar-sa": {
                consentBanner: {
                    title: "تحديد تفضيلات ملفات تعريف الارتباط",
                    paragraph: (0,
                    a.act)("span", null, "نحن نستخدم ملفات تعريف الارتباط الضرورية والأدوات المماثلة اللازمة لنقدم إليكم موقعنا ونوفر خدماتنا. كما نستخدم ملفات تعريف الارتباط الخاصة بالأداء لجمع الإحصائيات مجهولة المصدر حتى نتمكن من فهم كيفية استخدام العملاء لموقعنا، وإجراء التحسينات عليه. لا يمكن إلغاء تنشيط ملفات تعريف الارتباط الضرورية، ولكن يمكنك النقر فوق «تخصيص» أو «رفض» لرفض ملفات تعريف الارتباط الخاصة بالأداء. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "في حال موافقتك، ستقوم أيضًا AWS والجهات الخارجية المعتمدة باستخدام ملفات تعريف الارتباط لتوفير مزايا مفيدة في الموقع الإلكتروني، وحفظ تفضيلاتك، وعرض المحتوى ذي الصلة، بما في ذلك الإعلانات ذات الصلة. لقبول جميع ملفات تعريف الارتباط غير الضرورية أو رفضها، انقر فوق «قبول» أو «رفض». لإجراء اختيارات أكثر تفصيلًا، انقر فوق «تخصيص»."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "إننا نستخدم ملفات تعريف الارتباط الأساسية والأدوات المماثلة الضرورية لتوفير موقعنا وخدماتنا. إننا نستخدم ملفات تعريف الارتباط الخاصة بالأداء لجمع إحصاءات مجهولة الهوية حتى نتمكن من فهم كيفية استخدام العملاء لموقعنا وإجراء تحسينات. لا يمكن إلغاء تنشيط ملفات تعريف الارتباط الأساسية، ولكن يمكنك النقر فوق Customize cookies (تخصيص ملفات تعريف الارتباط) لرفض ملفات تعريف الارتباط الخاصة بالأداء. <br /> إذا وافقت، فستستخدم AWS والجهات الخارجية المعتمدة أيضًا ملفات تعريف الارتباط لتوفير ميزات مفيدة للموقع وتذكر تفضيلاتك وعرض المحتوى ذي الصلة، بما في ذلك الإعلانات ذات الصلة. للمتابعة بدون قبول ملفات تعريف الارتباط هذه، انقر فوق Continue without accepting (متابعة بدون قبول). لإجراء خيارات أكثر تفصيلاً أو لمعرفة المزيد، انقر فوق Customize cookies (تخصيص ملفات تعريف الارتباط). لا يقدم تطبيق AWS Console للأجهزة المحمولة ملفات تعريف الارتباط الخاصة بالجهات الخارجية أو ملفات تعريف الارتباط المستخدمة في الإعلان."),
                    "button-customize": "تخصيص",
                    "button-accept": "قبول",
                    "button-decline": "رفض",
                    "button-decline-aria-label": "متابعة بدون قبول",
                    "button-customize-aria-label": "تخصيص تفضيلات ملفات تعريف الارتباط",
                    "button-accept-aria-label": "قبول جميع ملفات تعريف الارتباط"
                },
                consentSelector: {
                    header: "تخصيص تفضيلات ملفات تعريف الارتباط",
                    intro: "إننا نستخدم ملفات تعريف الارتباط والأدوات المشابهة (يطلق عليها مجتمعة «ملفات تعريف الارتباط») للأغراض التالية.",
                    "checkbox-label": "مسموح بها",
                    "button-cancel": "إلغاء",
                    "button-save": "حفظ التفضيلات",
                    "button-cancel-aria-label": "إلغاء تخصيص تفضيلات ملفات تعريف الارتباط",
                    "button-save-aria-label": "حفظ تفضيلات ملفات تعريف الارتباط المخصصة",
                    footer: (0,
                    a.act)("span", null, "قد يؤثر حظر بعض أنواع ملفات تعريف الارتباط على تجربتك في مواقعنا. يمكنك تغيير تفضيلات ملفات تعريف الارتباط الخاصة بك في أي وقت من خلال النقر فوق تفضيلات ملفات تعريف الارتباط في تذييل هذا الموقع. لمعرفة المزيد حول طريقتنا والأطراف الثالثة في استخدام ملفات تعريف الارتباط في مواقعنا، يرجى قراءة ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "إشعار ملفات تعريف الارتباط لخدمة AWS‏", (0,
                    a.act)(o.default, {
                        ariaLabel: "الفتح في نافذة جديدة",
                        size: "10px"
                    }))), " الخاصة بنا"),
                    "footer-mobile": (0,
                    a.act)("span", null, "قد يؤثر حظر بعض أنواع ملفات تعريف الارتباط على تجربتك لمواقعنا. يمكنك مراجعة اختياراتك وتغييرها في أي وقت بالنقر فوق تفضيلات ملفات تعريف الارتباط في تذييل هذا الموقع. نستخدم نحن وجهات خارجية مختارة ملفات تعريف الارتباط، أو التقنيات المشابهة كما هو محدد في ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "فتح في نافذة جديدة", (0,
                    a.act)(o.default, {
                        ariaLabel: "الفتح في نافذة جديدة",
                        size: "10px"
                    }))), ". لا يقدم تطبيق الهاتف المحمول لوحدة تحكم AWS ملفات تعريف الارتباط الخاصة بالجهة الخارجية، أو ملفات تعريف الارتباط المستخدمة للإعلان."),
                    "section-essential": {
                        title: "أساسي",
                        paragraph: "ملفات تعريف الارتباط الأساسية هذه ضرورية من أجل إتاحة موقعنا وخدماتنا ولا يمكن إلغاء تنشيطها. ويتم تعيينها عادةً فقط استجابة لإجراءاتك على الموقع، مثل تعيين تفضيلات خصوصيتك، أو تسجيل الدخول، أو ملء النماذج. ",
                        "checkbox-description": "السماح بالفئة الأساسية"
                    },
                    "section-performance": {
                        title: "الأداء",
                        paragraph: "توفر ملفات تعريف الارتباط الخاصة بالأداء إحصائيات مجهولة حول طريقة تنقل العملاء في موقعنا، وذلك ليتسنى لنا تحسين تجربة الموقع وأدائه. وقد تقوم أطراف ثالثة معتمدة بإجراء تحليل نيابة عنا، لكن لا يمكنها استخدام البيانات لأغراضها الخاصة.",
                        "checkbox-description": "السماح بفئة الأداء"
                    },
                    "section-functional": {
                        title: "الوظيفية",
                        paragraph: "تساعدنا ملفات تعريف الارتباط الوظيفية على تقديم ميزات موقع مفيدة، وتذكر تفضيلاتك، وعرض محتوى ذي صلة. قد تقوم أطراف ثالثة معتمدة بتعيين ملفات تعريف الارتباط هذه لتقديم ميزات معينة للموقع. إذا لم تسمح بملفات تعريف الارتباط هذه، فقد لا تعمل بعض أو كل من هذه الخدمات على نحو صحيح.",
                        "checkbox-description": "السماح بالفئة الوظيفية"
                    },
                    "section-advertising": {
                        title: "الإعلان",
                        paragraph: "قد نقوم نحن أو شركاؤنا في مجال الإعلانات بتعيين ملفات تعريف الارتباط الإعلانية خلال موقعنا وهي تساعدنا على تقديم محتوى تسويقي ذي صلة. فإذا لم تسمح بوجود ملفات تعريف الارتباط هذه، فستشاهد إعلانات أقل صلة.",
                        "checkbox-description": "السماح بالفئة الإعلانية"
                    }
                },
                errorMessage: {
                    header: "تعذر حفظ تفضيلات ملفات تعريف الارتباط",
                    paragraph: (0,
                    a.act)("span", null, "إننا سنقوم بتخزين ملفات تعريف الارتباط الأساسية في هذه المرة فقط، لأنه تعذر علينا حفظ تفضيلات ملفات تعريف الارتباط الخاصة بك.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "إذا كنت تريد تغيير تفضيلات ملفات تعريف الارتباط الخاصة بك، فحاول مرةً أخرى لاحقًا باستخدام الرابط الموجود في تذييل وحدة تحكم AWS، أو اتصل بالدعم إن استمرت المشكلة."),
                    "button-dismiss": "تجاهل",
                    "button-dismiss-aria-label": "تجاهل رسالة الخطأ"
                }
            },
            "en-us": {
                consentBanner: {
                    title: "Select your cookie preferences",
                    paragraph: (0,
                    a.act)("span", null, "We use essential cookies and similar tools that are necessary to provide our site and services. We use performance cookies to collect anonymous statistics, so we can understand how customers use our site and make improvements. Essential cookies cannot be deactivated, but you can choose “Customize” or “Decline” to decline performance cookies. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " If you agree, AWS and approved third parties will also use cookies to provide useful site features, remember your preferences, and display relevant content, including relevant advertising. To accept or decline all non-essential cookies, choose “Accept” or “Decline.” To make more detailed choices, choose “Customize.”"),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "We use essential cookies and similar tools that are necessary to provide our site and services. We use performance cookies to collect anonymous statistics so we can understand how customers use our site and make improvements. Essential cookies cannot be deactivated, but you can choose “Customize cookies” to decline performance cookies. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " If you agree, AWS and approved third parties will also use cookies to provide useful site features, remember your preferences, and display relevant content, including relevant advertising. To continue without accepting these cookies, choose “Continue without accepting.” To make more detailed choices or learn more, choose “Customize cookies.”. The AWS Console Mobile App does not deliver third party cookies or cookies used for advertising."),
                    "button-customize": "Customize",
                    "button-accept": "Accept",
                    "button-decline": "Decline",
                    "button-decline-aria-label": "Continue without accepting",
                    "button-customize-aria-label": "Customize cookie preferences",
                    "button-accept-aria-label": "Accept all cookies"
                },
                consentSelector: {
                    header: "Customize cookie preferences",
                    intro: 'We use cookies and similar tools (collectively, "cookies") for the following purposes.',
                    "checkbox-label": "Allowed",
                    "button-cancel": "Cancel",
                    "button-save": "Save preferences",
                    "button-cancel-aria-label": "Cancel customizing cookie preferences",
                    "button-save-aria-label": "Save customized cookie preferences",
                    footer: (0,
                    a.act)("span", null, "Blocking some types of cookies may impact your experience of our sites. You may review and change your choices at any time by selecting Cookie preferences in the footer of this site. We and selected third-parties use cookies or similar technologies as specified in the ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Cookie Notice", (0,
                    a.act)(o.default, {
                        ariaLabel: "Opens in a new Window",
                        size: "10px"
                    }))), "."),
                    "footer-mobile": (0,
                    a.act)("span", null, "Blocking some types of cookies may impact your experience of our sites. You may review and change your choices at any time by selecting Cookie preferences in the footer of this site. We and selected third-parties use cookies or similar technologies as specified in the ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Cookie Notice", (0,
                    a.act)(o.default, {
                        ariaLabel: "Opens in a new Window",
                        size: "10px"
                    }))), ". The AWS Console Mobile App does not deliver third party cookies or cookies used for advertising."),
                    "section-essential": {
                        title: "Essential",
                        paragraph: "Essential cookies are necessary to provide our site and services and cannot be deactivated. They are usually set in response to your actions on the site, such as setting your privacy preferences, signing in, or filling in forms. ",
                        "checkbox-description": "Allow essential category"
                    },
                    "section-performance": {
                        title: "Performance",
                        paragraph: "Performance cookies provide anonymous statistics about how customers navigate our site so we can improve site experience and performance. Approved third parties may perform analytics on our behalf, but they cannot use the data for their own purposes.",
                        "checkbox-description": "Allow performance category"
                    },
                    "section-functional": {
                        title: "Functional",
                        paragraph: "Functional cookies help us provide useful site features, remember your preferences, and display relevant content. Approved third parties may set these cookies to provide certain site features. If you do not allow these cookies, then some or all of these services may not function properly.",
                        "checkbox-description": "Allow functional category"
                    },
                    "section-advertising": {
                        title: "Advertising",
                        paragraph: "Advertising cookies may be set through our site by us or our advertising partners and help us deliver relevant marketing content. If you do not allow these cookies, you will experience less relevant advertising.",
                        "checkbox-description": "Allow advertising category"
                    }
                },
                errorMessage: {
                    header: "Unable to save cookie preferences",
                    paragraph: (0,
                    a.act)("span", null, "We will only store essential cookies at this time, because we were unable to save your cookie preferences.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "If you want to change your cookie preferences, try again later using the link in the AWS console footer, or contact support if the problem persists."),
                    "button-dismiss": "Dismiss",
                    "button-dismiss-aria-label": "Dismiss error message modal"
                }
            },
            "de-de": {
                consentBanner: {
                    title: "Wählen Sie Ihre Cookie-Einstellungen aus",
                    paragraph: (0,
                    a.act)("span", null, "Wir verwenden essentielle Cookies und ähnliche Tools, die für die Bereitstellung unserer Website und Services erforderlich sind. Wir verwenden Performance-Cookies, um anonyme Statistiken zu sammeln, damit wir verstehen können, wie Kunden unsere Website nutzen, und Verbesserungen vornehmen können. Essentielle Cookies können nicht deaktiviert werden, aber Sie können auf „Anpassen“ oder „Ablehnen“ klicken, um Performance-Cookies abzulehnen. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Wenn Sie damit einverstanden sind, verwenden AWS und zugelassene Drittanbieter auch Cookies, um nützliche Features der Website bereitzustellen, Ihre Präferenzen zu speichern und relevante Inhalte, einschließlich relevanter Werbung, anzuzeigen. Um alle nicht notwendigen Cookies zu akzeptieren oder abzulehnen, klicken Sie auf „Akzeptieren“ oder „Ablehnen“. Um detailliertere Entscheidungen zu treffen, klicken Sie auf „Anpassen“."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "Wir verwenden wichtige Cookies und ähnliche Tools, die für die Bereitstellung unserer Website und Dienste erforderlich sind. Wir verwenden Performance-Cookies, um anonyme Statistiken zu sammeln, damit wir verstehen, wie Kunden unsere Website nutzen, und Verbesserungen vornehmen können. Essentielle Cookies können nicht deaktiviert werden, aber Sie können auf „Cookies anpassen“ klicken, um Performance-Cookies abzulehnen. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Wenn Sie zustimmen, verwenden AWS und zugelassene Dritte ebenfalls Cookies, um nützliche Website-Funktionen bereitzustellen, Ihre Präferenzen zu speichern und relevante Inhalte, einschließlich relevanter Werbung, anzuzeigen. Um fortzufahren, ohne diese Cookies zu akzeptieren, klicken Sie auf „Weiter ohne zu akzeptieren“. Um detailliertere Entscheidungen zu treffen oder mehr zu erfahren, klicken Sie auf „Cookies anpassen“. Die AWS Console Mobile App liefert keine Cookies oder Cookies von Drittanbietern, die für Werbung verwendet werden."),
                    "button-customize": "Anpassen",
                    "button-accept": "Akzeptieren",
                    "button-decline": "Ablehnen",
                    "button-decline-aria-label": "Ohne Akzeptieren fortfahren",
                    "button-customize-aria-label": "Cookie-Einstellungen anpassen",
                    "button-accept-aria-label": "Alle Cookies akzeptieren"
                },
                consentSelector: {
                    header: "Cookie-Einstellungen anpassen",
                    intro: 'Wir verwenden Cookies und ähnliche Tools (zusammen "Cookies") für folgende Zwecke.',
                    "checkbox-label": "Erlaubt",
                    "button-cancel": "Abbrechen",
                    "button-save": "Einstellungen speichern",
                    "button-cancel-aria-label": "Anpassen der Cookie-Einstellungen abbrechen",
                    "button-save-aria-label": "Benutzerdefinierte Cookie-Einstellungen speichern",
                    footer: (0,
                    a.act)("span", null, "Das Blockieren einiger Arten von Cookies kann sich auf Ihre Erfahrung auf unseren Websites auswirken. Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie in der Fußzeile dieser Website auf Cookie-Einstellungen klicken. Um mehr darüber zu erfahren, wie wir und zugelassene Dritte Cookies auf unseren Websites verwenden, lesen Sie bitte unseren ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS-Cookie-Hinweis.", (0,
                    a.act)(o.default, {
                        ariaLabel: "Wird in einem neuen Fenster geöffnet",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "Das Blockieren einiger Arten von Cookies kann sich auf Ihre Erfahrung mit unseren Websites auswirken. Sie können Ihre Auswahl jederzeit überprüfen und ändern, indem Sie in der Fußzeile dieser Website auf Cookie-Präferenzen klicken. Wir und ausgewählte Drittanbieter verwenden Cookies oder ähnliche Technologien, wie im Abschnitt ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, " der ", (0,
                    a.act)("span", null, "AWS-Cookie-Benachrichtigung", (0,
                    a.act)(o.default, {
                        ariaLabel: "Wird in einem neuen Fenster geöffnet",
                        size: "10px"
                    }))), " angegeben. Die mobile App AWS-Konsole beinhaltet keine Cookies von Drittanbietern oder Cookies, die für die Werbung verwendet werden."),
                    "section-essential": {
                        title: "Essenziell",
                        paragraph: "Diese Cookies sind erforderlich, um unsere Website und Services bereitzustellen und können nicht deaktiviert werden. Sie werden in der Regel als Reaktion auf Ihre Aktionen auf der Website festgelegt, z. B. die Festlegung Ihrer Datenschutzeinstellungen, die Anmeldung oder das Ausfüllen von Formularen. ",
                        "checkbox-description": "Essenziell Cookies zulassen"
                    },
                    "section-performance": {
                        title: "Leistung",
                        paragraph: "Leistungs-Cookies stellen anonyme Statistiken darüber bereit, wie Kunden auf unserer Website navigieren, damit wir die Website-Erfahrung und -Leistung verbessern können. Zugelassene Dritte können Analysen in unserem Namen durchführen, die Daten aber nicht für ihre eigenen Zwecke verwenden.",
                        "checkbox-description": "Lesitungs-Cookies zulassen"
                    },
                    "section-functional": {
                        title: "Funktional",
                        paragraph: "Funktionale Cookies helfen uns dabei, nützliche Website-Funktionen bereitzustellen, Ihre Präferenzen zu speichern und relevante Inhalte anzuzeigen. Zugelassene Dritte können diese Cookies so einrichten, dass bestimmte Website-Funktionen bereitgestellt werden. Wenn Sie diese Cookies nicht zulassen, funktionieren einige oder alle dieser Services möglicherweise nicht ordnungsgemäß.",
                        "checkbox-description": "Funktionale Cookies zulassen"
                    },
                    "section-advertising": {
                        title: "Werbung",
                        paragraph: "Diese Cookies können von uns oder unseren Werbepartnern über unsere Website gesetzt werden und uns helfen, relevante Marketinginhalte bereitzustellen. Wenn Sie diese Cookies nicht zulassen, werden Sie weniger relevante Werbung erleben.",
                        "checkbox-description": "Werbe-Cookies zulassen"
                    }
                },
                errorMessage: {
                    header: "Cookie-Einstellungen konnten nicht gespeichert werden",
                    paragraph: (0,
                    a.act)("span", null, "Wir speichern derzeit nur wichtige Cookies, da wir Ihre Cookie-Einstellungen nicht speichern konnten.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Wenn Sie Ihre Cookie-Einstellungen ändern möchten, versuchen Sie es später erneut über den Link in der Fußzeile der AWS-Konsole oder wenden Sie sich an den Support, wenn das Problem weiterhin besteht."),
                    "button-dismiss": "Verwerfen",
                    "button-dismiss-aria-label": "Fehlermeldung verwerfen"
                }
            },
            "es-es": {
                consentBanner: {
                    title: "Seleccione sus preferencias de cookies",
                    paragraph: (0,
                    a.act)("span", null, "Usamos cookies esenciales y herramientas similares que son necesarias para proporcionar nuestro sitio y nuestros servicios. Usamos cookies de rendimiento para recopilar estadísticas anónimas para que podamos entender cómo los clientes usan nuestro sitio y hacer mejoras. Las cookies esenciales no se pueden desactivar, pero puede hacer clic en “Personalizar” o “Rechazar” para rechazar las cookies de rendimiento. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Si está de acuerdo, AWS y los terceros aprobados también utilizarán cookies para proporcionar características útiles del sitio, recordar sus preferencias y mostrar contenido relevante, incluida publicidad relevante. Para aceptar o rechazar todas las cookies no esenciales, haga clic en “Aceptar” o “Rechazar”. Para elegir opciones más detalladas, haga clic en “Personalizar”."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "Utilizamos cookies esenciales y herramientas similares que son necesarias para suministrar tanto nuestro sitio como nuestros servicios. Utilizamos cookies de rendimiento a fin de recopilar estadísticas anónimas y así comprender la forma en que los clientes utilizan nuestro sitio con el objetivo de realizar mejoras. Las cookies esenciales no se pueden desactivar, pero puede hacer clic en “Personalizar cookies” para rechazar las cookies de rendimiento. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Si está de acuerdo, AWS y terceros autorizados también utilizarán cookies para suministrar características útiles del sitio, recordar las preferencias y mostrar contenido relevante, incluida publicidad pertinente. Para continuar sin aceptar estas cookies, haga clic en “Continuar sin aceptar”. Para elegir de forma más detallada u obtener más información, haga clic en “Personalizar cookies”. La aplicación móvil de la Consola de AWS no utiliza cookies de terceros ni cookies utilizadas para la publicidad."),
                    "button-customize": "Personalizar",
                    "button-accept": "Aceptar",
                    "button-decline": "Rechazar",
                    "button-decline-aria-label": "Continuar sin aceptar",
                    "button-customize-aria-label": "Personalizar preferencias de cookies",
                    "button-accept-aria-label": "Aceptar todas las cookies"
                },
                consentSelector: {
                    header: "Personalizar preferencias de cookies",
                    intro: "Utilizamos cookies y herramientas similares (de forma conjunta, “cookies”) para los siguientes fines.",
                    "checkbox-label": "Permitidas",
                    "button-cancel": "Cancelar",
                    "button-save": "Guardar preferencias",
                    "button-cancel-aria-label": "Cancelar la personalización de las preferencias de cookies",
                    "button-save-aria-label": "Guardar preferencias personalizadas de cookies",
                    footer: (0,
                    a.act)("span", null, "El bloqueo de algunos tipos de cookies puede afectar a su experiencia al navegar por nuestros sitios. Puede cambiar las preferencias de cookies en cualquier momento haciendo clic en Preferencias de cookies en el pie de página de este sitio. Para obtener más información sobre la forma en que nosotros y algunos terceros aprobados usamos las cookies en nuestros sitios, lea el ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        title: "Se abre en una ventana nueva"
                    }, (0,
                    a.act)("span", null, "Aviso de AWS sobre cookies.", (0,
                    a.act)(o.default, {
                        ariaLabel: "Se abre en una nueva ventana",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "El bloqueo de algunos tipos de cookies puede afectar a su experiencia de nuestros sitios. Puede revisar y cambiar sus opciones en cualquier momento haciendo clic en Preferencias de cookies en el pie de página de este sitio. Nosotros y terceros seleccionados usamos cookies o tecnologías similares tal y como se especifica en el ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, ", el aviso sobre cookies de AWS", (0,
                    a.act)(o.default, {
                        ariaLabel: "Se abre en una nueva ventana",
                        size: "10px"
                    }))), ". La aplicación móvil de la consola de AWS no entrega cookies de terceros ni cookies utilizadas para publicidad."),
                    "section-essential": {
                        title: "Esenciales",
                        paragraph: "Estas cookies son necesarias para poder ofrecer nuestro sitio y nuestros servicios, y no se pueden desactivar. Por lo general, solo se emplean en respuesta a las acciones que lleve a cabo en el sitio, por ejemplo, al configurar sus preferencias de privacidad, al iniciar sesión o al completar formularios. ",
                        "checkbox-description": "Permitir categoría esencial"
                    },
                    "section-performance": {
                        title: "De rendimiento",
                        paragraph: "Las cookies de rendimiento proporcionan estadísticas anónimas sobre la forma en que los clientes navegan por nuestro sitio para que podamos mejorar la experiencia y el rendimiento del sitio. Los terceros aprobados pueden realizar análisis en nuestro nombre, pero no pueden utilizar los datos para sus propios fines.",
                        "checkbox-description": "Permitir categoría de rendimiento"
                    },
                    "section-functional": {
                        title: "Funcionales",
                        paragraph: "Las cookies funcionales nos ayudan a proporcionar características útiles del sitio, recordar sus preferencias y mostrar contenido relevante. Es posible que algunos terceros aprobados empleen estas cookies para proporcionar determinadas características del sitio. Si no permite estas cookies, es posible que algunos de estos servicios (o todos ellos) no funcionen correctamente.",
                        "checkbox-description": "Permitir categoría funcional"
                    },
                    "section-advertising": {
                        title: "De publicidad",
                        paragraph: "AWS o nuestros socios publicitarios podemos emplear cookies de publicidad en el sitio para ayudarnos a ofrecer contenido de marketing personalizado. Si no habilita estas cookies, verá publicidad menos relevante.",
                        "checkbox-description": "Permitir categoría de publicidad"
                    }
                },
                errorMessage: {
                    header: "No se pueden guardar las preferencias de cookies",
                    paragraph: (0,
                    a.act)("span", null, "En este momento, solo almacenaremos las cookies esenciales, ya que no hemos podido guardar sus preferencias de cookies.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Si desea cambiar sus preferencias de cookies, inténtelo de nuevo más tarde a través del enlace del pie de página de la Consola de AWS o póngase en contacto con el servicio de asistencia si el problema persiste."),
                    "button-dismiss": "Descartar",
                    "button-dismiss-aria-label": "Descartar el mensaje de error"
                }
            },
            "fr-fr": {
                consentBanner: {
                    title: "Sélectionner vos préférences de cookies",
                    paragraph: (0,
                    a.act)("span", null, "Nous utilisons des cookies essentiels et des outils similaires qui sont nécessaires au fonctionnement de notre site et à la fourniture de nos services. Nous utilisons des cookies de performance pour collecter des statistiques anonymes afin de comprendre comment les clients utilisent notre site et d’apporter des améliorations. Les cookies essentiels ne peuvent pas être désactivés, mais vous pouvez cliquer sur « Personnaliser » ou « Refuser » pour refuser les cookies de performance. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Si vous êtes d’accord, AWS et les tiers approuvés utiliseront également des cookies pour fournir des fonctionnalités utiles au site, mémoriser vos préférences et afficher du contenu pertinent, y compris des publicités pertinentes. Pour accepter ou refuser tous les cookies non essentiels, cliquez sur « Accepter » ou « Refuser ». Pour effectuer des choix plus détaillés, cliquez sur « Personnaliser »."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "Nous utilisons des cookies essentiels et des outils similaires qui sont nécessaires pour mettre notre site et nos services à votre disposition. Nous utilisons des cookies de performance pour collecter des statistiques anonymes afin de comprendre comment les clients utilisent notre site et y apporter des améliorations. Les cookies essentiels ne peuvent pas être désactivés, mais vous pouvez cliquer sur « Personnaliser les cookies » pour refuser les cookies de performance. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Si vous êtes d'accord, AWS et les tiers approuvés utiliseront également des cookies pour fournir des fonctionnalités utiles au site, mémoriser vos préférences et proposer du contenu pertinent, y compris des publicités pertinentes. Pour continuer sans accepter ces cookies, cliquez sur « Continuer sans accepter ». Pour faire des choix plus détaillés ou en savoir plus, cliquez sur « Personnaliser les cookies ». L'application mobile de la console AWS n'utilise pas de cookies tiers ni de cookies utilisés à des fins publicitaires."),
                    "button-customize": "Personnaliser",
                    "button-accept": "Accepter",
                    "button-decline": "Refuser",
                    "button-decline-aria-label": "Continuer sans accepter",
                    "button-customize-aria-label": "Personnaliser les préférences de cookies",
                    "button-accept-aria-label": "Accepter tous les cookies"
                },
                consentSelector: {
                    header: "Personnaliser les préférences de cookies",
                    intro: "Nous utilisons des cookies et des outils similaires (collectivement, « cookies ») pour les raisons suivantes.",
                    "checkbox-label": "Autorisé",
                    "button-cancel": "Annuler",
                    "button-save": "Enregistrer les préférences",
                    "button-cancel-aria-label": "Annuler la personnalisation des préférences de cookies",
                    "button-save-aria-label": "Enregistrer les préférences de cookies personnalisées",
                    footer: (0,
                    a.act)("span", null, "Le blocage de certains types de cookies peut affecter votre expérience sur nos sites. Vous pouvez modifier vos préférences de cookies à tout moment en cliquant sur Préférences de cookies en bas de la page de ce site. Pour en savoir plus sur la façon dont nous-mêmes et des tiers approuvés utilisons les cookies sur nos sites, veuillez lire la", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "S’ouvre dans une nouvelle fenêtre.", (0,
                    a.act)(o.default, {
                        ariaLabel: "Ouvre dans une nouvelle fenêtre",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "Le blocage de certains types de cookies peut affecter votre expérience sur nos sites. Vous pouvez modifier vos préférences de cookies à tout moment en cliquant sur Préférences de cookies en bas de la page de ce site. Pour en savoir plus sur la façon dont nous-mêmes et des tiers approuvés utilisons les cookies sur nos sites, veuillez lire la", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "S’ouvre dans une nouvelle fenêtre.", (0,
                    a.act)(o.default, {
                        ariaLabel: "Ouvre dans une nouvelle fenêtre",
                        size: "10px"
                    }))), ". L'application mobile de la console AWS ne fournit pas de cookies tiers ou de cookies utilisés pour la publicité."),
                    "section-essential": {
                        title: "Essentiels",
                        paragraph: "Les cookies essentiels sont nécessaires pour vous proposer notre site et nos services et ne peuvent pas être désactivés. Ils sont généralement définis en réponse à vos actions sur le site, telles que la définition de vos préférences de confidentialité, la connexion ou le remplissage de formulaires. ",
                        "checkbox-description": "Autoriser la catégorie Essentiels"
                    },
                    "section-performance": {
                        title: "Performances",
                        paragraph: "Les cookies performances fournissent des statistiques anonymes sur la façon dont les clients naviguent sur notre site afin que nous puissions améliorer l'expérience et les performances du site. Les tiers autorisés peuvent effectuer des analyses en notre nom, mais ils ne peuvent pas utiliser les données à leurs propres fins.",
                        "checkbox-description": "Autoriser la catégorie Performances"
                    },
                    "section-functional": {
                        title: "Fonctionnels",
                        paragraph: "Les cookies fonctionnels nous aident à fournir des fonctionnalités utiles du site, à mémoriser vos préférences et à afficher du contenu pertinent. Des tiers approuvés peuvent configurer ces cookies pour fournir certaines fonctionnalités du site. Si vous n'autorisez pas ces cookies, certains ou tous ces services peuvent ne pas fonctionner correctement.",
                        "checkbox-description": "Autoriser la catégorie Fonctionnels"
                    },
                    "section-advertising": {
                        title: "Publicitaires",
                        paragraph: "Les cookies publicitaires peuvent être installés sur notre site par nous ou nos partenaires publicitaires et nous aide à diffuser du contenu marketing pertinent. Si vous n’autorisez pas ces cookies, la publicité que vous verrez s’afficher sera moins pertinente.",
                        "checkbox-description": "Autoriser la catégorie Publicitaires"
                    }
                },
                errorMessage: {
                    header: "Impossible d'enregistrer les préférences concernant les cookies",
                    paragraph: (0,
                    a.act)("span", null, "Nous stockerons uniquement les cookies essentiels pour le moment, car nous n'avons pas pu enregistrer vos préférences concernant les cookies.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Si vous souhaitez modifier vos préférences concernant les cookies, réessayez ultérieurement en utilisant le lien situé dans le pied de page de la console AWS ou contactez l'équipe de support si le problème persiste."),
                    "button-dismiss": "Ignorer",
                    "button-dismiss-aria-label": "Ignorer le message d'erreur"
                }
            },
            "he-il": {
                consentBanner: {
                    title: "יש לבחור את העדפות קובצי ה-Cookie שלך",
                    paragraph: (0,
                    a.act)("span", null, "אנו משתמשים בקובצי Essential Cookie ובכלים דומים שנדרשים כדי לספק את השירותים באתר שלנו. אנו משתמשים גם בקובצי Performance Cookie כדי לאסוף נתונים סטטיסטיים אנונימיים כדי שנוכל להבין כיצד לקוחות משתמשים באתר שלנו ולשפר אותו. לא ניתן לבטל קובצי Essential Cookie, אך אפשר ללחוץ על 'התאמה אישית' או 'דחייה' כדי לדחות קובצי Performance Cookie. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " אם נקבל את הסכמתך, AWS וצדדים שלישיים מאושרים ישתמשו גם בקובצי ה-Cookie כדי לספק תכונות שימושיות באתר, לזכור את ההעדפות שלך ולהציג לך תוכן רלוונטי, כולל פרסומות. כדי לאשר או לדחות את כל קובצי ה-Cookie מסוג Non-Essential, יש ללחוץ על 'אישור' או על 'דחייה'. כדי לבצע בחירות מפורטות יותר, יש ללחוץ על 'התאמה אישית'."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "אנו משתמשים בקובצי Essential Cookie ובכלים דומים שנדרשים כדי לספק את השירותים באתר שלנו. אנו משתמשים גם בקובצי Performance Cookie כדי לאסוף נתונים סטטיסטיים אנונימיים כדי שנוכל להבין כיצד לקוחות משתמשים באתר שלנו ולשפר אותו. לא ניתן לבטל קובצי Essential Cookie, אך אפשר ללחוץ על 'התאמה אישית' או 'דחייה' כדי לדחות קובצי Performance Cookie. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " אם נקבל את הסכמתך, AWS וצדדים שלישיים מאושרים ישתמשו גם בקובצי ה-Cookie כדי לספק תכונות שימושיות באתר, לזכור את ההעדפות שלך ולהציג לך תוכן רלוונטי, כולל פרסומות. כדי לאשר או לדחות את כל קובצי ה-Cookie מסוג Non-Essential, יש ללחוץ על 'אישור' או על 'דחייה'. כדי לבצע בחירות מפורטות יותר, יש ללחוץ על 'התאמה אישית'."),
                    "button-customize": "התאמה אישית",
                    "button-accept": "אישור",
                    "button-decline": "דחייה",
                    "button-decline-aria-label": "להמשיך בלי לאשר",
                    "button-customize-aria-label": "התאמה אישית של העדפות קובצי ה-Cookie",
                    "button-accept-aria-label": "אישור כל קובצי ה-Cookie"
                },
                consentSelector: {
                    header: "התאמה אישית של העדפות קובצי ה-Cookie",
                    intro: 'אנו משתמשים בקובצי ה-Cookie ובכלים דומים (ביחד, "קובצי ה-Cookie") למטרות הבאות.',
                    "checkbox-label": "מותר",
                    "button-cancel": "לבטל",
                    "button-save": "לשמור העדפות",
                    "button-cancel-aria-label": "ביטול התאמה אישית של העדפות קובצי ה-Cookie",
                    "button-save-aria-label": "לשמור העדפות מותאמות אישית של קובצי ה-Cookie",
                    footer: (0,
                    a.act)("span", null, "חסימת סוגים נבחרים של קובצי Cookie עשויה להשפיע על חווית השימוש שלך באתרים שלנו. אפשר לבדוק ולשנות את הבחירות שלך בכל עת על ידי לחיצה על העדפות קובצי ה-Cookie בכותרת התחתונה של אתר זה. אנו וצדדים שלישיים נבחרים משתמשים בקובצי ה-Cookie או בטכנולוגיות דומות כמפורט בהודעת ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "ה-Cookies", (0,
                    a.act)(o.default, {
                        ariaLabel: "Opens in a new Window",
                        size: "10px"
                    }))), "."),
                    "footer-mobile": (0,
                    a.act)("span", null, "חסימת סוגים נבחרים של קובצי ה-Cookie עשויה להשפיע על חווית השימוש שלך באתרים שלנו. אפשר לבדוק ולשנות את הבחירות שלך בכל עת על ידי לחיצה על העדפות קובצי Cookie בכותרת התחתונה של אתר זה. אנו וצדדים שלישיים נבחרים משתמשים בקובצי ה-Cookie או בטכנולוגיות דומות כמפורט בהודעת ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "ה-Cookies", (0,
                    a.act)(o.default, {
                        ariaLabel: "Opens in a new Window",
                        size: "10px"
                    }))), ". אפליקציית AWS Console לנייד אינה עושה שימוש בקובצי ה-Cookie של צדדים שלישיים או קובצי Cookie אחרים שמשמשים לצורכי פרסום."),
                    "section-essential": {
                        title: "קובצי Essential",
                        paragraph: "קובצי Essential Cookie נדרשים כדי לספק את השירותים באתר שלנו ואי אפשר לבטל אותם. בדרך כלל, הם מוגדרים בתגובה לפעולות שלך באתר, כגון הגדרת העדפות הפרטיות שלך, כניסה או מילוי טפסים. ",
                        "checkbox-description": "לאפשר קטגוריית Essential"
                    },
                    "section-performance": {
                        title: "קובצי Performance",
                        paragraph: "קובצי Performance Cookie מספקים נתונים סטטיסטיים אנונימיים לגבי האופן שבו לקוחות מנווטים באתר שלנו כדי שנוכל לשפר את חוויית שימוש האתר וביצועיו. צדדים שלישיים מאושרים עשויים לבצע ניתוחים בשמנו, אך הם אינם יכולים להשתמש בנתונים למטרותיהם.",
                        "checkbox-description": "לאפשר קטגוריית Performance"
                    },
                    "section-functional": {
                        title: "קובצי Functional",
                        paragraph: "קובצי Functional Cookie עוזרים לנו לספק תכונות שימושיות באתר, לזכור את ההעדפות שלך ולהציג לך תוכן רלוונטי. צדדים שלישיים מאושרים עשויים להגדיר קובצי ה-Cookie אלה כדי לספק תכונות מסוימות באתר. אם קובצי ה-Cookie אלה אינם מופעלים, ייתכן שחלק מהשירותים הללו או כולם לא יפעלו כראוי.",
                        "checkbox-description": "לאפשר קטגוריית Functional"
                    },
                    "section-advertising": {
                        title: "קובצי Advertising",
                        paragraph: "קובצי ה-Advertising Cookie עשויים להיות מוגדרים דרך האתר שלנו על ידינו או על ידי שותפי הפרסום שלנו ולעזור לנו לספק תוכן שיווקי רלוונטי. אם קובצי ה-Cookie אלה אינם מופעלים, יוצגו לך פרסומות פחות רלוונטיות.",
                        "checkbox-description": "לאפשר קטגוריית Advertising"
                    }
                },
                errorMessage: {
                    header: "לא ניתן לשמור את העדפות קובצי ה-Cookie",
                    paragraph: (0,
                    a.act)("span", null, "אנו נשמור קובצי Essential Cookie בלבד בשלב זה, מכיוון שלא הצלחנו לשמור את העדפות קובצי ה-Cookie שלך.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "אם ברצונך לשנות את העדפות קובצי ה-Cookie שלך, עליך לנסות שוב מאוחר יותר באמצעות הקישור בכותרת התחתונה של AWS Console, או לפנות לתמיכה אם הבעיה נמשכת."),
                    "button-dismiss": "לדחות",
                    "button-dismiss-aria-label": "ביטול הדגם של הודעת השגיאה"
                }
            },
            "id-id": {
                consentBanner: {
                    title: "Pilih preferensi cookie Anda",
                    paragraph: (0,
                    a.act)("span", null, "Kami menggunakan cookie penting serta alat serupa yang diperlukan untuk menyediakan situs dan layanan. Kami menggunakan cookie performa untuk mengumpulkan statistik anonim sehingga kami dapat memahami cara pelanggan menggunakan situs dan melakukan perbaikan. Cookie penting tidak dapat dinonaktifkan, tetapi Anda dapat mengklik “Kustom” atau “Tolak” untuk menolak cookie performa. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Jika Anda setuju, AWS dan pihak ketiga yang disetujui juga akan menggunakan cookie untuk menyediakan fitur situs yang berguna, mengingat preferensi Anda, dan menampilkan konten yang relevan, termasuk iklan yang relevan. Untuk menerima atau menolak semua cookie yang tidak penting, klik “Terima” atau “Tolak”. Untuk membuat pilihan yang lebih detail, klik “Kustomisasi”."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "Kami menggunakan cookie penting dan alat serupa yang diperlukan untuk menyediakan situs dan layanan. Kami menggunakan cookie performa untuk mengumpulkan statistik anonim agar kami dapat memahami bagaimana pelanggan menggunakan situs serta melakukan peningkatan. Cookie penting tidak dapat dinonaktifkan, tetapi Anda dapat mengeklik “Sesuaikan cookie” untuk menolak cookie performa. ", (0,
                    a.act)("br", null), " ", (0,
                    a.act)("br", null), " Jika Anda setuju, AWS dan pihak ketiga yang disetujui juga akan menggunakan cookie untuk menyediakan fitur situs yang bermanfaat, mengingat preferensi Anda, dan menampilkan konten yang relevan, termasuk iklan yang relevan. Untuk melanjutkan tanpa menerima cookie ini, klik “Lanjutkan tanpa menerima.” Untuk membuat pilihan yang lebih detail atau mempelajari lebih lanjut, klik “Sesuaikan cookie.”. Aplikasi Seluler Konsol AWS tidak mengirimkan cookie pihak ketiga atau cookie yang digunakan untuk iklan."),
                    "button-customize": "Kustomisasi",
                    "button-accept": "Terima",
                    "button-decline": "Tolak",
                    "button-decline-aria-label": "Lanjutkan tanpa menerima",
                    "button-customize-aria-label": "Sesuaikan preferensi cookie",
                    "button-accept-aria-label": "Terima semua cookie"
                },
                consentSelector: {
                    header: "Sesuaikan preferensi cookie",
                    intro: "Kami menggunakan cookie dan alat yang serupa (secara kolektif, “cookie”) untuk tujuan berikut.",
                    "checkbox-label": "Diizinkan",
                    "button-cancel": "Batalkan",
                    "button-save": "Simpan preferensi",
                    "button-cancel-aria-label": "Batalkan penyesuaian preferensi cookie",
                    "button-save-aria-label": "Simpan preferensi cookie yang disesuaikan",
                    footer: (0,
                    a.act)("span", null, "Memblokir beberapa jenis cookie dapat memengaruhi pengalaman Anda di situs kami. Anda dapat mengubah preferensi cookie kapan saja dengan mengklik Preferensi cookie di footer situs ini. Untuk mempelajari lebih lanjut tentang bagaimana kami dan pihak ketiga yang disetujui menggunakan cookie di situs kami, silakan baca ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, " di jendela baru.", (0,
                    a.act)(o.default, {
                        ariaLabel: "Buka di Jendela Baru",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "Pemblokiran beberapa jenis cookie dapat memengaruhi pengalaman Anda di situs kami. Anda dapat meninjau dan mengubah pilihan Anda kapan pun dengan mengklik preferensi Cookie di footer situs ini. Kami dan pihak ketiga terpilih menggunakan cookie atau teknologi serupa seperti yang ditentukan dalam ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "Pemberitahuan Cookie AWS", (0,
                    a.act)(o.default, {
                        ariaLabel: "Buka di Jendela Baru",
                        size: "10px"
                    }))), ". Aplikasi Seluler Konsol AWS tidak mengirimkan cookie pihak ketiga atau cookie yang digunakan untuk iklan."),
                    "section-essential": {
                        title: "Penting",
                        paragraph: "Cookie ini diperlukan untuk menjalankan situs dan layanan kami dan tidak dapat dinonaktifkan. Cookie biasanya tersusun hanya sebagai tanggapan atas tindakan Anda di situs, seperti mengatur preferensi privasi, masuk, atau mengisi formulir. ",
                        "checkbox-description": "Izinkan kategori penting"
                    },
                    "section-performance": {
                        title: "Kinerja",
                        paragraph: "Cookie kinerja menyediakan statistik anonim tentang cara pelanggan menavigasi situs kami sehingga kami dapat menyempurnakan pengalaman dan kinerja situs. Pihak ketiga yang disetujui dapat melakukan analisis atas nama kami, tetapi tidak dapat menggunakan data untuk tujuannya sendiri.",
                        "checkbox-description": "Izinkan kategori kinerja"
                    },
                    "section-functional": {
                        title: "Fungsional",
                        paragraph: "Cookie fungsional membantu kami menyediakan berbagai fitur bermanfaat, mengingat preferensi Anda, dan menampilkan konten yang relevan pada situs. Pihak ketiga yang disetujui dapat mengatur cookie ini untuk menyediakan fitur tertentu pada situs. Jika Anda tidak mengizinkan cookie ini, maka beberapa atau semua layanan ini mungkin tidak berjalan dengan baik.",
                        "checkbox-description": "Izinkan kategori fungsional"
                    },
                    "section-advertising": {
                        title: "Iklan",
                        paragraph: "Cookie ini dapat diatur melalui situs kami oleh mitra iklan dan membantu kami mempersonalisasi konten pemasaran. Jika Anda tidak mengizinkan cookie, Anda akan mendapatkan iklan yang kurang relevan.",
                        "checkbox-description": "Izinkan kategori iklan"
                    }
                },
                errorMessage: {
                    header: "Tidak dapat menyimpan preferensi cookie",
                    paragraph: (0,
                    a.act)("span", null, "Kami hanya akan menyimpan cookie penting saat ini, karena kami tidak dapat menyimpan preferensi cookie Anda.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Jika Anda ingin mengubah preferensi cookie, coba lagi nanti menggunakan tautan di footer konsol AWS, atau hubungi dukungan jika masalah berlanjut."),
                    "button-dismiss": "Hentikan",
                    "button-dismiss-aria-label": "Hentikan pesan kesalahan"
                }
            },
            "it-it": {
                consentBanner: {
                    title: "Seleziona le tue preferenze relative ai cookie",
                    paragraph: (0,
                    a.act)("span", null, 'Utilizziamo cookie essenziali e strumenti simili necessari per fornire il nostro sito e i nostri servizi. Utilizziamo i cookie prestazionali per raccogliere statistiche anonime in modo da poter capire come i clienti utilizzano il nostro sito e apportare miglioramenti. I cookie essenziali non possono essere disattivati, ma puoi fare clic su \\"Personalizza\\" o \\"Rifiuta\\" per rifiutare i cookie prestazionali. ', (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), ' Se sei d\'accordo, AWS e le terze parti approvate utilizzeranno i cookie anche per fornire utili funzionalità del sito, ricordare le tue preferenze e visualizzare contenuti pertinenti, inclusa la pubblicità pertinente. Per continuare senza accettare questi cookie, fai clic su \\"Continua\\" o \\"Rifiuta\\". Per effettuare scelte più dettagliate o saperne di più, fai clic su \\"Personalizza\\".'),
                    "paragraph-mobile": (0,
                    a.act)("span", null, 'Utilizziamo i cookie essenziali e strumenti simili che sono necessari per fornire il nostro sito e i nostri servizi. Utilizziamo i cookie di prestazioni per raccogliere statistiche anonime per poter capire come i clienti utilizzano il nostro sito e apportare miglioramenti. I cookie essenziali non possono essere disattivati, ma è possibile fare clic su "Personalizza cookie" per rifiutare i cookie di prestazioni. ', (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), ' Se accetti, AWS e le terze parti autorizzate utilizzeranno i cookie anche per fornire utili funzionalità del sito, ricordare le tue preferenze e visualizzare contenuti pertinenti, inclusa la pubblicità. Per continuare senza accettare questi cookie, fai clic su "Continua senza accettare". Per fare scelte più dettagliate o saperne di più, fai clic su "Personalizza i cookie".L\'app mobile della console AWS non fornisce cookie di terze parti o cookie utilizzati per la pubblicità.'),
                    "button-customize": "Personalizza",
                    "button-accept": "Accetta",
                    "button-decline": "Declino",
                    "button-decline-aria-label": "Continua senza accettare",
                    "button-customize-aria-label": "Personalizza le tue preferenze relative ai cookie",
                    "button-accept-aria-label": "Accetta tutti i cookie"
                },
                consentSelector: {
                    header: "Personalizza le tue preferenze relative ai cookie",
                    intro: 'Utilizziamo cookie e strumenti simili (collettivamente, "cookie") per le seguenti finalità.',
                    "checkbox-label": "Consentiti",
                    "button-cancel": "Annulla",
                    "button-save": "Salva preferenze",
                    "button-cancel-aria-label": "Annulla la personalizzazione delle preferenze relative ai cookie",
                    "button-save-aria-label": "Salva le preferenze personalizzate relative ai cookie",
                    footer: (0,
                    a.act)("span", null, "Il blocco di alcuni tipi di cookie può influire sulla tua esperienza dei nostri siti. Puoi modificare le tue preferenze relative ai cookie in qualsiasi momento facendo clic su Preferenze cookie, nel piè di pagina di questo sito. Per ulteriori informazioni su come noi e le terze parti approvate utilizziamo i cookie sui nostri siti, leggi la nostra ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "Informativa sui cookie di AWS.", (0,
                    a.act)(o.default, {
                        ariaLabel: "Apertura in una nuova finestra",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "Il blocco di alcuni tipi di cookie può influire sulla tua esperienza con i nostri siti. Puoi rivedere e modificare le tue scelte in qualsiasi momento facendo clic su Cookie preferences (Preferenze cookie) nel piè di pagina di questo sito. Noi e le terze parti selezionate utilizziamo cookie o tecnologie simili come specificato nella sezione ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Cookie Notice", (0,
                    a.act)(o.default, {
                        ariaLabel: "Apertura in una nuova finestra",
                        size: "10px"
                    }))), " (Informativa sui cookie AWS). L'app per dispositivi mobili di AWS Console non fornisce cookie di terze parti o cookie utilizzati per la pubblicità."),
                    "section-essential": {
                        title: "Essenziali",
                        paragraph: "I cookie essenziali sono necessari per fornire il nostro sito e i nostri servizi e non possono essere disattivati. In genere vengono impostati in risposta alle tue azioni sul sito, come l'impostazione delle tue preferenze sulla privacy, l'accesso o la compilazione di moduli. ",
                        "checkbox-description": "Consenti i cookie essenziali"
                    },
                    "section-performance": {
                        title: "Prestazione",
                        paragraph: "I cookie di prestazione forniscono statistiche anonime sul modo in cui i clienti navigano nel nostro sito in modo da migliorare l'esperienza e le prestazioni del sito. Le terze parti approvate possono eseguire analisi per conto nostro, ma non possono utilizzare i dati per le proprie finalità.",
                        "checkbox-description": "Consenti i cookie di prestazione"
                    },
                    "section-functional": {
                        title: "Funzionali",
                        paragraph: "I cookie funzionali ci aiutano a fornire funzionalità utili del sito, a ricordare le tue preferenze e a mostrare contenuti pertinenti. Le terze parti approvate possono impostare questi cookie per fornire determinate funzionalità del sito. Se non permetti l'installazione di questi cookie, alcuni o tutti questi servizi potrebbero non funzionare correttamente.",
                        "checkbox-description": "Consenti i cookie funzionali"
                    },
                    "section-advertising": {
                        title: "Pubblicitari",
                        paragraph: "I cookie pubblicitari possono essere impostati tramite il nostro sito da noi o dai nostri partner pubblicitari e ci aiutano a distribuire contenuti di marketing personalizzati. Se non permetti l'installazione di questi cookie, visualizzerai pubblicità meno pertinenti.",
                        "checkbox-description": "Consenti i cookie pubblicitari"
                    }
                },
                errorMessage: {
                    header: "Impossibile salvare le preferenze dei cookie",
                    paragraph: (0,
                    a.act)("span", null, "Al momento archivieremo solo i cookie essenziali, perché non siamo stati in grado di salvare le tue preferenze relative ai cookie.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Se desideri modificare le preferenze dei cookie, riprova più tardi utilizzando il link nel piè di pagina della Console AWS oppure contatta il supporto se il problema persiste."),
                    "button-dismiss": "Ignora",
                    "button-dismiss-aria-label": "Messaggio di errore di mancato recapito"
                }
            },
            "ja-jp": {
                consentBanner: {
                    title: "Cookie の設定を選択する",
                    paragraph: (0,
                    a.act)("span", null, "当社は、当社のサイトおよびサービスを提供するために必要な必須 Cookie および類似のツールを使用しています。当社は、パフォーマンス Cookie を使用して匿名の統計情報を収集することで、お客様が当社のサイトをどのように利用しているかを把握し、改善に役立てています。必須 Cookie は無効化できませんが、[カスタマイズ] または [拒否] をクリックしてパフォーマンス Cookie を拒否することはできます。", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " お客様が同意した場合、AWS および承認された第三者は、Cookie を使用して便利なサイト機能を提供したり、お客様の選択を記憶したり、関連する広告を含む関連コンテンツを表示したりします。すべての必須ではない Cookie を受け入れるか拒否するには、[受け入れる] または [拒否] をクリックしてください。より詳細な選択を行うには、[カスタマイズ] をクリックしてください。"),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "当社は、当社のサイトおよびサービスを提供するために必要なエッセンシャルクッキーおよび類似のツールを使用します。当社は、お客様が当社サイトをどのように使用しているかを理解し、改善を行えるように、匿名の統計情報を収集するためにパフォーマンスクッキーを使用します。エッセンシャルクッキーを無効にすることはできませんが、「クッキーをカスタマイズ」をクリックしてパフォーマンスクッキーを拒否することができます。", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " お客様が同意した場合、AWS および承認された第三者も Cookie を使用して、便利なサイト機能を提供し、お客様の好みを記憶し、関連する広告を含む関連コンテンツを表示します。これらの Cookie を受け入れずに続行するには、[承諾せずに続行] をクリックします。より詳細な選択を行うか、詳細を確認するには、[Cookieのカスタマイズ] をクリックします。AWS コンソールモバイルアプリでは、サードパーティ Cookie や広告に使用される Cookie は配信されません。"),
                    "button-customize": "カスタマイズ",
                    "button-accept": "受け入れる",
                    "button-decline": "拒否",
                    "button-decline-aria-label": "承諾せずに続行する",
                    "button-customize-aria-label": "Cookie の設定をカスタマイズする",
                    "button-accept-aria-label": "すべての Cookie を受け入れる"
                },
                consentSelector: {
                    header: "Cookie の設定をカスタマイズする",
                    intro: "当社は、以下の目的で Cookie および同様のツール (以下総称して「Cookie」) を使用いたします。",
                    "checkbox-label": "許可",
                    "button-cancel": "キャンセル",
                    "button-save": "設定を保存",
                    "button-cancel-aria-label": "Cookie 設定のカスタマイズをキャンセルする",
                    "button-save-aria-label": "カスタマイズした Cookie 設定を保存する",
                    footer: (0,
                    a.act)("span", null, "一部の種類の Cookie をブロックすると、サイトの操作に影響する可能性があります。Cookie の設定は、このサイトのフッターにある [Cookie preferences] をクリックすることで、いつでも変更できます。当社および承認された第三者が Cookie をどのように使用しているかについては、「", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Cookie Notice」をお読みください。", (0,
                    a.act)(o.default, {
                        ariaLabel: "新しいウィンドウで開きます",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "一部の種類の cookie をブロックすると、サイトの操作に影響する可能性があります。お客様は、本サイトのフッターにある [cookie の詳細設定] をクリックすることで、いつでも選択内容を確認および変更できます。当社および選定されたサードパーティーは、", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS の Cookie に関する通知", (0,
                    a.act)(o.default, {
                        ariaLabel: "新しいウィンドウで開きます",
                        size: "10px"
                    }))), "に記載されている cookie または類似の技術を利用します。AWS コンソールモバイルアプリケーションは、サードパーティー cookie や広告のために使用される cookie を配信しません。"),
                    "section-essential": {
                        title: "Essential",
                        paragraph: "Essential Cookie は、当社のサイトおよびサービスを提供するために必要であり、無効にすることはできません。通常、プライバシー設定の選択、サインイン、フォームへの入力など、サイトでのアクションに応じてのみ設定されます。",
                        "checkbox-description": "Essential カテゴリを許可する"
                    },
                    "section-performance": {
                        title: "Performance",
                        paragraph: "Performance Cookie は、お客様によるサイトの操作方法に関する匿名の統計を提供するため、サイトのエクスペリエンスとパフォーマンスを向上させることができます。承認された第三者は、当社に代わって分析を行う場合がありますが、データを独自の目的で使用することはできません。",
                        "checkbox-description": "Performance カテゴリを許可する"
                    },
                    "section-functional": {
                        title: "Functional",
                        paragraph: "Functional Cookie は、有用なサイト機能の提供、ユーザーの嗜好の記憶、関連コンテンツの表示に役立ちます。承認された第三者は、特定のサイト機能を提供するためにこれらのクッキーを設定する場合があります。これらのクッキーを許可しない場合、サービスの一部またはすべてが適切に機能しない可能性があります。",
                        "checkbox-description": "Functional カテゴリを許可する"
                    },
                    "section-advertising": {
                        title: "Advertising",
                        paragraph: "Advertising Cookie は、当社の広告パートナーによって当社のサイトを通じて設定され、関連するマーケティングコンテンツの配信に役立ちます。これらの Cookie を許可しないと、広告の関連性が低くなります。",
                        "checkbox-description": "Advertising カテゴリを許可する"
                    }
                },
                errorMessage: {
                    header: "Cookie の設定を保存できません",
                    paragraph: (0,
                    a.act)("span", null, "Cookie の設定を保存できなかったため、現時点では不可欠な Cookie のみを保存します。", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Cookie の設定を変更する場合は、AWS コンソールのフッターにあるリンクを使用して後でもう一度お試しください。問題が解決しない場合は、サポートにお問い合わせください。"),
                    "button-dismiss": "閉じる",
                    "button-dismiss-aria-label": "エラーメッセージを閉じる"
                }
            },
            "ko-kr": {
                consentBanner: {
                    title: "쿠키 기본 설정 선택",
                    paragraph: (0,
                    a.act)("span", null, "당사는 사이트와 서비스를 제공하는 데 필요한 필수 쿠키 및 유사한 도구를 사용합니다. 고객이 사이트를 어떻게 사용하는지 파악하고 개선할 수 있도록 성능 쿠키를 사용해 익명의 통계를 수집합니다. 필수 쿠키는 비활성화할 수 없지만 '사용자 지정' 또는 ‘거부’를 클릭하여 성능 쿠키를 거부할 수 있습니다. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " 사용자가 동의하는 경우 AWS와 승인된 제3자도 쿠키를 사용하여 유용한 사이트 기능을 제공하고, 사용자의 기본 설정을 기억하고, 관련 광고를 비롯한 관련 콘텐츠를 표시합니다. 필수가 아닌 모든 쿠키를 수락하거나 거부하려면 ‘수락’ 또는 ‘거부’를 클릭하세요. 더 자세한 내용을 선택하려면 ‘사용자 정의’를 클릭하세요."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "AWS는 사이트 및 서비스를 제공하는 데 필요한 필수 쿠키 및 그와 유사한 도구를 사용합니다. 성능 쿠키는 익명 통계를 수집하여 고객이 사이트를 어떻게 이용하는지 파악하고 개선할 수 있게 해줍니다. 필수 쿠키는 비활성화할 수 없지만 성능 쿠키는 ‘쿠키 사용자 지정’을 클릭하여 거부할 수 있습니다. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " 귀하가 동의하는 경우, AWS와 승인을 받은 서드 파티가 유용한 사이트 기능을 제공하고, 기본 설정을 저장하고, 관련 광고를 비롯한 관련 콘텐츠를 표시하는 데 쿠키를 사용하게 됩니다. 이러한 쿠키를 허용하지 않고 계속하려면 ‘수락하지 않고 계속하기’를 클릭하세요. 세부 옵션을 선택을 하거나 자세히 알아보려면 ‘쿠키 사용자 지정’을 클릭하세요. AWS Console 모바일 앱은 서드 파티 쿠키 또는 광고에 사용되는 AWS 쿠키를 전송하지 않습니다."),
                    "button-customize": "사용자 지정",
                    "button-accept": "수락",
                    "button-decline": "거부",
                    "button-decline-aria-label": "수락하지 않고 계속하기",
                    "button-customize-aria-label": "쿠키 기본 설정 사용자 지정",
                    "button-accept-aria-label": "모든 쿠키 수락"
                },
                consentSelector: {
                    header: "쿠키 기본 설정 사용자 지정",
                    intro: 'AWS는 다음과 같은 목적으로 쿠키 및 유사한 도구(총칭하여 "쿠키")를 사용합니다.',
                    "checkbox-label": "허용됨",
                    "button-cancel": "취소",
                    "button-save": "기본 설정 저장",
                    "button-cancel-aria-label": "쿠키 기본 설정 사용자 지정 취소",
                    "button-save-aria-label": "사용자 지정된 쿠키 기본 설정 저장",
                    footer: (0,
                    a.act)("span", null, "일부 유형의 쿠키를 차단하면 AWS 사이트 경험이 영향을 받을 수 있습니다. 언제든지 이 사이트의 바닥글에서 [쿠키 기본 설정]을 클릭하여 해당하는 쿠키 기본 설정을 변경할 수 있습니다. AWS 사이트에서 AWS 및 승인된 제 3자가 쿠키를 사용하는 방법에 대한 자세한 내용은 ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS 쿠키 공지 사항", (0,
                    a.act)(o.default, {
                        ariaLabel: "새 창에서 열기",
                        size: "10px"
                    }))), "을 참조하십시오."),
                    "footer-mobile": (0,
                    a.act)("span", null, "일부 쿠키 유형을 차단하면 사이트 환경에 영향을 미칠 수 있습니다. 사용자는 언제든지 이 사이트의 하단에 표시되는 쿠키 기본 설정을 클릭하여 선택 사항을 검토하고 변경할 수 있습니다. AWS와 엄선된 서드 파티는 ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS 쿠키 고지", (0,
                    a.act)(o.default, {
                        ariaLabel: "새 창에서 열기",
                        size: "10px"
                    }))), "에 명시된 쿠키 또는 유사한 기술을 사용합니다. AWS 콘솔 모바일 앱은 서드 파티 쿠키 또는 광고 목적의 쿠키를 제공하지 않습니다."),
                    "section-essential": {
                        title: "필수",
                        paragraph: "필수 쿠키는 AWS 사이트 및 서비스를 제공하는 데 필요하며, 비활성화할 수 없습니다. 일반적으로 개인 정보 보호 기본 설정, 로그인 또는 양식 작성 등 사이트 내에서 사용자가 수행한 작업에 상응하는 쿠키가 설정됩니다. ",
                        "checkbox-description": "필수 범주 허용"
                    },
                    "section-performance": {
                        title: "성능",
                        paragraph: "성능 쿠키는 AWS에서 사이트 경험 및 성능을 개선할 수 있도록 고객이 AWS 사이트를 탐색하는 방법에 대한 익명의 통계를 제공합니다. 승인된 제3자가 AWS를 대신하여 분석을 수행할 수 있지만, 해당 데이터를 다른 특정 목적으로 사용할 수는 없습니다.",
                        "checkbox-description": "성능 범주 허용"
                    },
                    "section-functional": {
                        title: "기능",
                        paragraph: "기능 쿠키는 유용한 사이트 기능을 제공하고, 사용자의 기본 설정을 기억하며, 관련 콘텐츠를 표시하는 데 도움을 줍니다. 승인된 제3자가 이러한 쿠키를 설정하여 특정 사이트 기능을 제공할 수 있습니다. 이러한 쿠키를 허용하지 않으면 이러한 서비스 중 일부 또는 전체가 제대로 작동하지 않을 수 있습니다.",
                        "checkbox-description": "기능 범주 허용"
                    },
                    "section-advertising": {
                        title: "광고",
                        paragraph: "광고 쿠키는 AWS의 광고 파트너가 AWS 사이트를 통해 설정할 수 있으며, 관련 마케팅 콘텐츠를 제공하는 데 도움을 줍니다. 이러한 쿠키를 허용하지 않으면 관련성이 낮은 광고가 표시됩니다.",
                        "checkbox-description": "광고 범주 허용"
                    }
                },
                errorMessage: {
                    header: "쿠키 기본 설정을 저장할 수 없음",
                    paragraph: (0,
                    a.act)("span", null, "쿠키 기본 설정을 저장할 수 없어 지금은 필수 쿠키만 저장합니다.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "쿠키 기본 설정을 변경하려면 나중에 AWS Console 바닥글의 링크를 사용하여 다시 시도하세요. 문제가 지속될 경우 지원 센터에 문의하세요."),
                    "button-dismiss": "무시",
                    "button-dismiss-aria-label": "오류 메시지 무시"
                }
            },
            "pt-br": {
                consentBanner: {
                    title: "Selecione suas preferências de cookies",
                    paragraph: (0,
                    a.act)("span", null, "Usamos cookies essenciais e ferramentas semelhantes que são necessárias para fornecer nosso site e serviços. Usamos cookies de desempenho para coletar estatísticas anônimas, para que possamos entender como os clientes usam nosso site e fazer as devidas melhorias. Cookies essenciais não podem ser desativados, mas você pode clicar em “Personalizar” ou “Recusar” para recusar cookies de desempenho. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Se você concordar, a AWS e terceiros aprovados também usarão cookies para fornecer recursos úteis do site, lembrar suas preferências e exibir conteúdo relevante, incluindo publicidade relevante. Para aceitar ou recusar todos os cookies não essenciais, clique em “Aceitar” ou “Recusar”. Para fazer escolhas mais detalhadas, clique em “Personalizar”."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "Usamos cookies essenciais e ferramentas semelhantes que são necessárias para a oferta de nosso site e de nossos serviços. Usamos cookies de desempenho para coletar estatísticas anônimas que nos permitam entender como os clientes usam nosso site e fazer melhorias. Não é possível desativar os cookies essenciais, mas você pode clicar em “Personalizar cookies” para recusar os cookies de desempenho. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Se você concordar, a AWS e terceiros aprovados também usarão cookies para fornecer recursos úteis do site, lembrar suas preferências e exibir conteúdo relevante, incluindo publicidade relevante. Para continuar sem aceitar esses cookies, clique em “Continuar sem aceitar”. Para fazer escolhas mais detalhadas ou saber mais, clique em “Personalizar cookies”. O aplicativo móvel do Console da AWS não fornece cookies de terceiros ou cookies usados para publicidade."),
                    "button-customize": "Personalizar",
                    "button-accept": "Aceitar",
                    "button-decline": "Recusar",
                    "button-decline-aria-label": "Continuar sem aceitar",
                    "button-customize-aria-label": "Personalizar preferências de cookies",
                    "button-accept-aria-label": "Aceitar todos os cookies"
                },
                consentSelector: {
                    header: "Personalizar preferências de cookies",
                    intro: 'Usamos cookies e ferramentas semelhantes (coletivamente, "cookies") para as seguintes finalidades.',
                    "checkbox-label": "Permitido",
                    "button-cancel": "Cancelar",
                    "button-save": "Salvar preferências",
                    "button-cancel-aria-label": "Cancelar personalização de preferências de cookies",
                    "button-save-aria-label": "Salvar preferências de cookies personalizadas",
                    footer: (0,
                    a.act)("span", null, "Bloquear alguns tipos de cookies pode afetar sua experiência em nossos sites. Você pode alterar suas preferências de cookies a qualquer momento, clicando em Preferências de cookies no rodapé deste site. Para saber mais sobre como nós e terceiros aprovados usamos cookies em nossos sites, leia nosso ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "Aviso sobre cookies da AWS.", (0,
                    a.act)(o.default, {
                        ariaLabel: "Abre em nova janela",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "O bloqueio de alguns tipos de cookies pode afetar sua experiência em nossos sites. É possível conferir e alterar as opções a qualquer momento clicando em Preferências de cookies no rodapé do site. Nós e terceiros selecionados usamos cookies ou tecnologias semelhantes, conforme especificado no ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "Aviso sobre cookies da AWS", (0,
                    a.act)(o.default, {
                        ariaLabel: "Abre em nova janela",
                        size: "10px"
                    }))), ". A aplicação móvel da Console AWS não utiliza cookies de terceiros nem cookies usados para publicidade."),
                    "section-essential": {
                        title: "Essenciais",
                        paragraph: "Cookies essenciais são necessários para fornecer nosso site e serviços e não podem ser desativados. Geralmente, eles são definidos em resposta às suas ações no site, como definir suas preferências de privacidade, fazer login ou preencher formulários. ",
                        "checkbox-description": "Permitir a categoria Essenciais"
                    },
                    "section-performance": {
                        title: "Desempenho",
                        paragraph: "Os cookies de desempenho fornecem estatísticas anônimas sobre como os clientes navegam em nosso site, para que possamos melhorar a experiência e o desempenho do site. Terceiros aprovados podem realizar análises em nosso nome, mas não podem usar os dados para seus próprios propósitos.",
                        "checkbox-description": "Permitir a categoria Desempenho"
                    },
                    "section-functional": {
                        title: "Funcionais",
                        paragraph: "Cookies funcionais nos ajudam a fornecer recursos úteis do site, lembrar suas preferências e exibir conteúdo relevante. Terceiros aprovados podem definir esses cookies para fornecer determinados recursos do site. Se você não permitir esses cookies, alguns ou todos esses serviços talvez não funcionem corretamente.",
                        "checkbox-description": "Permitir a categoria Funcionais"
                    },
                    "section-advertising": {
                        title: "Publicidade",
                        paragraph: "Cookies de publicidade podem ser configurados em nosso site por nós ou nossos parceiros de publicidade e nos ajudar a distribuir conteúdo de marketing relevante. Se você não permitir esses cookies, receberá publicidade menos relevante.",
                        "checkbox-description": "Permitir a categoria Publicidade"
                    }
                },
                errorMessage: {
                    header: "Não foi possível salvar as preferências de cookie",
                    paragraph: (0,
                    a.act)("span", null, "No momento, só armazenaremos cookies essenciais, pois não foi possível salvar suas preferências.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Se você quiser alterá-las, tente novamente mais tarde usando o link no rodapé do Console da AWS ou entre em contato com o suporte se o problema persistir."),
                    "button-dismiss": "Descartar",
                    "button-dismiss-aria-label": "Descartar mensagem de erro"
                }
            },
            "ru-ru": {
                consentBanner: {
                    title: "Выберите настройки файлов cookie",
                    paragraph: (0,
                    a.act)("span", null, "Мы используем основные файлы cookie и аналогичные инструменты, необходимые для работы нашего сайта и предоставления услуг, а также эксплуатационные файлы cookie для сбора анонимной статистики, чтобы вносить улучшения и понимать, как клиенты используют наш сайт. Основные файлы cookie нельзя деактивировать, но вы можете нажать «Настроить» или «Отклонить», чтобы отказаться от использования эксплуатационных файлов cookie. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Если вы согласны, AWS и уполномоченные третьи стороны также будут использовать файлы cookie для предоставления полезных функций сайта, запоминания ваших предпочтений и отображения соответствующих контента и рекламы. Чтобы принять или отклонить все второстепенные файлы cookie, нажмите «Принять» или «Отклонить». Чтобы настроить cookie более подробно, нажмите «Настроить»."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "Мы используем основные файлы cookie и аналогичные инструменты, необходимые для предоставления нашего сайта и услуг. Мы используем эксплуатационные файлы cookie для сбора анонимной статистики, чтобы понять, как клиенты используют наш сайт, и вносить улучшения. Основные файлы cookie нельзя деактивировать, но вы можете нажать «Настроить файлы cookie», чтобы отказаться от эксплуатационных файлов cookie. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Если вы согласитесь, AWS и одобренные третьи стороны также будут использовать файлы cookie для предоставления полезных функций сайта, запоминания ваших предпочтений и отображения релевантного контента, включая релевантную рекламу. Чтобы продолжить без принятия этих файлов cookie, нажмите «Продолжить, не принимая». Чтобы сделать более подробный выбор или узнать больше, нажмите «Настроить файлы cookie». Мобильное приложение консоли AWS не содержит файлов cookie третьих лиц или файлов cookie, используемых для рекламы."),
                    "button-customize": "Настроить",
                    "button-accept": "Принять",
                    "button-decline": "Отклонить",
                    "button-decline-aria-label": "Продолжить, не принимая",
                    "button-customize-aria-label": "Настроить параметры файлов cookie",
                    "button-accept-aria-label": "Принять все файлы cookie"
                },
                consentSelector: {
                    header: "Настроить параметры файлов cookie",
                    intro: "Мы используем файлы cookie и аналогичные инструменты (совместно именуемые «файлы cookie») для следующих целей.",
                    "checkbox-label": "Разрешенные",
                    "button-cancel": "Отмена",
                    "button-save": "Сохранить настройки",
                    "button-cancel-aria-label": "Отменить настройку параметров файлов cookie",
                    "button-save-aria-label": "Сохранить измененные параметры файлов cookie",
                    footer: (0,
                    a.act)("span", null, "Блокировка некоторых типов файлов cookie может повлиять на вашу работу с нашими сайтами. Вы можете в любое время изменить настройки файлов cookie, нажав «Параметры файлов cookie» в нижнем колонтитуле этого сайта. Чтобы узнать больше о том, как файлы cookie на наших сайтах используются нами и одобренными третьими сторонами, прочитайте ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "Уведомление AWS о файлах cookie.", (0,
                    a.act)(o.default, {
                        ariaLabel: "Откроется в новом окне",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "Блокировка некоторых типов файлов cookie может повлиять на работу с нашими сайтами. Вы можете просмотреть и изменить свой выбор в любое время, нажав «Настройки файлов cookie» в нижней части этого сайта. Мы и некоторые третьи стороны используем файлы cookie или аналогичные технологии, как указано в ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, " Уведомлении AWS о файлах cookie", (0,
                    a.act)(o.default, {
                        ariaLabel: "Откроется в новом окне",
                        size: "10px"
                    }))), ". Мобильное приложение «Консоль AWS» не предоставляет файлы cookie третьих сторон или используемые для рекламы."),
                    "section-essential": {
                        title: "Необходимые",
                        paragraph: "Необходимые файлы cookie требуется для работы нашего сайта и служб, и их нельзя отключить. Обычно они устанавливаются при выборе параметров конфиденциальности, входе в аккаунт, заполнении форм и других действиях на сайте. ",
                        "checkbox-description": "Разрешить категорию «Необходимые»"
                    },
                    "section-performance": {
                        title: "Связанные с производительностью",
                        paragraph: "Файлы cookie, связанные с производительностью, предоставляют анонимную статистику о том, как клиенты просматривают наш сайт, чтобы мы могли улучшить его работу и повысить производительность. Одобренные третьи стороны могут проводить анализ от нашего имени, но не имеют право использовать данные в своих целях.",
                        "checkbox-description": "Разрешить категорию «Связанные с производительностью»"
                    },
                    "section-functional": {
                        title: "Функциональные",
                        paragraph: "Функциональные файлы cookie помогают нам предоставлять полезные функции сайта, запоминать ваши предпочтения и отображать соответствующий контент. Одобренные третьи стороны могут устанавливать эти файлы cookie для предоставления определенных функций сайта. Если вы не разрешаете применять эти файлы cookie, некоторые (или все) эти сервисы могут работать неправильно.",
                        "checkbox-description": "Разрешить категорию «Функциональные»"
                    },
                    "section-advertising": {
                        title: "Рекламные",
                        paragraph: "Эти файлы cookie устанавливаются на наш сайт нами или нашими рекламными партнерами. Они помогают нам персонализировать рекламу. Если вы отключите эти файлы cookie, реклама станет менее релевантной.",
                        "checkbox-description": "Разрешить категорию «Рекламные»"
                    }
                },
                errorMessage: {
                    header: "Не удалось сохранить настройки файлов cookie",
                    paragraph: (0,
                    a.act)("span", null, "В настоящее время мы будем хранить только необходимые файлы cookie, потому что нам не удалось сохранить ваши предпочтения в отношении файлов cookie.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Если вы хотите изменить настройки файлов cookie, повторите попытку позже, перейдя по ссылке в нижнем колонтитуле консоли AWS, или обратитесь в службу поддержки, если проблема не исчезнет. "),
                    "button-dismiss": "Отклонить",
                    "button-dismiss-aria-label": "Отклонить сообщение об ошибке"
                }
            },
            "th-th": {
                consentBanner: {
                    title: "เลือกค่ากำหนดคุกกี้ของคุณ",
                    paragraph: (0,
                    a.act)("span", null, "เราใช้คุกกี้ที่จำเป็นและเครื่องมือที่คล้ายคลึงกันซึ่งจำเป็นในการให้บริการเว็บไซต์และบริการต่างๆ ของเรา เราใช้คุกกี้ประสิทธิภาพเพื่อรวบรวมสถิติที่ไม่ระบุชื่อ เพื่อให้เราเข้าใจว่าลูกค้าใช้เว็บไซต์ของเราอย่างไร และทำการปรับปรุง คุณไม่สามารถปิดใช้งานคุกกี้ที่จำเป็นได้ แต่คุณสามารถคลิก “ปรับแต่ง” หรือ “ปฏิเสธ” เพื่อปฏิเสธคุกกี้ประสิทธิภาพ ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " หากคุณยอมรับ AWS และบุคคลที่สามที่ได้รับการอนุมัติจะใช้คุกกี้เพื่อมอบคุณสมบัติของเว็บไซต์ที่มีประโยชน์ จดจำการตั้งค่าของคุณ และแสดงเนื้อหาที่เกี่ยวข้อง รวมถึงการโฆษณาที่เกี่ยวข้อง หากต้องการยอมรับหรือปฏิเสธคุ้กกี้ที่ไมจำเป็นทั้งหมด คลิก “ยอมรับ” หรือ “ปฏิเสธ” หากต้องการตัดสินใจโดยละเอียด โปรดคลิก “ปรับแต่ง”"),
                    "paragraph-mobile": (0,
                    a.act)("span", null, 'เราใช้คุกกี้และเครื่องมือที่คล้ายกันที่จำเป็นต่อการให้บริการเว็บไซต์และบริการต่าง ๆ ของเรา เราใช้คุกกี้ประสิทธิภาพเพื่อรวบรวมสถิตินิรนามซึ่งจะสามารถทำให้เราเข้าใจถึงวิธีที่ลูกค้าใช้เว็บไซต์ของเราและทำการปรับปรุงเว็บไซต์เหล่านั้นได้ คุณจะไม่สามารถเปิดใช้งานคุกกี้ที่จำเป็นได้แต่คุณสามารถคลิก "ปรับแต่งคุกกี้" เพื่อปฏิเสธคุกกี้ประสิทธิภาพได้ ', (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), ' หากคุณยินยอม AWS และบุคคลที่สามที่ได้รับอนุมัติจะใช้คุกกี้เพื่อให้บริการฟีเจอร์ที่มีประโยชน์ของเว็บไซต์ จดจำการตั้งค่าของคุณ และแสดงเนื้อหาที่เกี่ยวข้อง รวมถึงการโฆษณาที่เกี่ยวข้อง หากต้องการดำเนินการต่อโดยไม่ยอมรับคุกกี้เหล่านี้ ให้คลิก "ดำเนินการต่อโดยไม่ยอมรับ" หากต้องการเลือกรายละเอียดเพิ่มเติมหรือเรียนรู้เพิ่มเติม ให้คลิก "ปรับแต่งคุกกี้" แอปคอนโซล AWS บนมือถือจะไม่ส่งมอบคุกกี้ของบุคคลที่สามหรือคุกกี้ที่ใช้สำหรับการโฆษณา'),
                    "button-customize": "ปรับแต่ง",
                    "button-accept": "ยอมรับ",
                    "button-decline": "ปฏิเสธ",
                    "button-decline-aria-label": "ดำเนินการต่อโดยไม่ยอมรับ",
                    "button-customize-aria-label": "ปรับแต่งค่ากำหนดของคุกกี้",
                    "button-accept-aria-label": "ยอมรับคุกกี้ทั้งหมด"
                },
                consentSelector: {
                    header: "ปรับแต่งค่ากำหนดของคุกกี้",
                    intro: 'เราใช้คุกกี้และเครื่องมือที่คล้ายคลึงกัน (เรียกโดยรวมว่า "คุกกี้") เพื่อวัตถุประสงค์ต่อไปนี้',
                    "checkbox-label": "อนุญาตแล้ว",
                    "button-cancel": "ยกเลิก",
                    "button-save": "บันทึกค่ากำหนด",
                    "button-cancel-aria-label": "ยกเลิกการปรับแต่งค่ากำหนดของคุกกี้",
                    "button-save-aria-label": "บันทึกค่ากำหนดของคุกกี้ที่ปรับแต่ง",
                    footer: (0,
                    a.act)("span", null, "การบล็อกคุกกี้บางประเภทอาจส่งผลต่อประสบการณ์ในการใช้งานเว็บไซต์ของเรา คุณสามารถเปลี่ยนแปลงค่ากำหนดของคุกกี้ได้ทุกเมื่อ โดยคลิกที่ค่ากำหนดของคุกกี้ในส่วนล่างของเว็บไซต์นี้ หากต้องการเรียนรู้เพิ่มเติมเกี่ยวกับวิธีการที่เราและบุคคลภายนอกที่ได้รับอนุญาตใช้คุกกี้บนเว็บไซต์ของเรา โปรดอ่าน", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "ประกาศเกี่ยวกับคุกกี้ของ AWS", (0,
                    a.act)(o.default, {
                        ariaLabel: "เปิดในหน้าต่างบานใหม่",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "การบล็อกคุกกี้บางประเภทอาจส่งผลต่อประสบการณ์การใช้งานเว็บไซต์ของเรา คุณสามารถตรวจสอบและเปลี่ยนแปลงการตั้งค่าที่คุณเลือกได้ทุกเมื่อ โดยคลิกการตั้งค่าคุกกี้ในส่วนท้ายของเว็บไซต์นี้ เราและบุคคลที่สามที่เลือกจะใช้คุกกี้หรือเทคโนโลยีที่คล้ายกันตามที่ระบุไว้ใน", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, " ซึ่งจะเปิดในหน้าต่างใหม่", (0,
                    a.act)(o.default, {
                        ariaLabel: "เปิดในหน้าต่างบานใหม่",
                        size: "10px"
                    }))), " แอปคอนโซล AWS บนมือถือจะไม่ส่งคุกกี้หรือคุกกี้ที่ใช้สำหรับการโฆษณาให้บุคคลที่สาม"),
                    "section-essential": {
                        title: "คุกกี้ที่จำเป็น",
                        paragraph: "คุกกี้เหล่านี้จำเป็นต่อการให้บริการของเว็บไซต์และบริการของเรา และไม่สามารถปิดการใช้งานได้ โดยปกติแล้วจะมีการตั้งค่าให้ตอบสนองต่อการใช้งานของคุณบนเว็บไซต์ เช่น การตั้งค่ากำหนดความเป็นส่วนตัวของคุณ การลงชื่อเข้าใช้ หรือการกรอกแบบฟอร์มต่างๆ ",
                        "checkbox-description": "อนุญาตให้ใช้คุกกี้ที่จำเป็น"
                    },
                    "section-performance": {
                        title: "คุกกี้ด้านประสิทธิภาพ",
                        paragraph: "คุกกี้ด้านประสิทธิภาพจะให้ข้อมูลสถิติแบบไม่ระบุชื่อเกี่ยวกับลักษณะการเยี่ยมชมส่วนต่างๆ ของเว็บไซต์ของลูกค้า เพื่อที่เราจะได้นำไปปรับปรุงประสบการณ์และประสิทธิภาพของเว็บไซต์ บุคคลภายนอกที่ได้รับอนุญาตอาจทำการวิเคราะห์ข้อมูลในนามของเรา แต่จะไม่สามารถนำข้อมูลไปใช้เพื่อวัตถุประสงค์ของตัวเองได้",
                        "checkbox-description": "อนุญาตให้ใช้คุกกี้ด้านประสิทธิภาพ"
                    },
                    "section-functional": {
                        title: "คุกกี้เพื่อช่วยในการใช้งาน",
                        paragraph: "คุกกี้เพื่อช่วยในการใช้งานจะช่วยให้เรามอบคุณสมบัติที่มีประโยชน์ของเว็บไซต์ จดจำค่ากำหนดของคุณ และแสดงเนื้อหาที่เกี่ยวข้อง บุคคลภายนอกที่ได้รับอนุญาตอาจตั้งค่าคุกกี้เหล่านี้เพื่อมอบคุณสมบัติบางอย่างของเว็บไซต์ หากคุณไม่อนุญาตให้ใช้คุกกี้เหล่านี้ บริการบางอย่างหรือทั้งหมดเหล่านี้อาจทำงานไม่เหมาะสม",
                        "checkbox-description": "อนุญาตให้ใช้คุกกี้เพื่อช่วยในการใช้งาน"
                    },
                    "section-advertising": {
                        title: "คุกกี้เพื่อการโฆษณา",
                        paragraph: "คุกกี้เพื่อการโฆษณาอาจได้รับการตั้งค่าผ่านเว็บไซต์โดยเราหรือคู่ค้าด้านโฆษณาของเรา และช่วยเราในการส่งมอบเนื้อหาทางการตลาดที่เกี่ยวข้อง หากคุณไม่อนุญาตคุกกี้เหล่านี้ คุณจะพบโฆษณาที่เกี่ยวข้องน้อยลง",
                        "checkbox-description": "อนุญาตให้ใช้คุกกี้เพื่อการโฆษณา"
                    }
                },
                errorMessage: {
                    header: "ไม่สามารถบันทึกค่ากำหนดของคุกกี้ได้",
                    paragraph: (0,
                    a.act)("span", null, "เราจะจัดเก็บเฉพาะคุกกี้ที่จำเป็นในขณะนี้เท่านั้น เนื่องจากเราไม่สามารถบันทึกค่ากำหนดของคุกกี้ของคุณได้", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "หากคุณต้องการเปลี่ยนค่ากำหนดของคุกกี้ โปรดลองอีกครั้งโดยใช้ลิงก์ในส่วนท้ายของคอนโซล AWS หรือติดต่อฝ่ายสนับสนุนหากปัญหานี้ยังคงเกิดขึ้นอยู่"),
                    "button-dismiss": "ปิด",
                    "button-dismiss-aria-label": "ปิดข้อความแสดงข้อผิดพลาด"
                }
            },
            "tr-tr": {
                consentBanner: {
                    title: "Çerez tercihlerinizi seçme",
                    paragraph: (0,
                    a.act)("span", null, 'Sitemizi ve hizmetlerimizi sunmak için gerekli olan temel çerezleri ve benzer araçları kullanırız. Müşterilerin sitemizi nasıl kullandığını anlamamıza ve iyileştirmeler yapmamıza yardımcı olan anonim istatistikler toplamak üzere performans çerezlerini kullanırız. Temel çerezler devre dışı bırakılamaz ancak performans çerezlerini reddetmek için \\"Özelleştir\\" veya \\"Reddet\\" seçeneğine tıklayabilirsiniz. ', (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), ' Kabul ettiğiniz takdirde AWS ve onaylı üçüncü taraflar; yararlı site özellikleri sağlamak, tercihlerinizi hatırlamak ve alakalı reklamlar dahil olmak üzere alakalı içerikler göstermek amacıyla da çerez kullanacaktır. Temel olmayan tüm çerezleri kabul etmek veya reddetmek için \\"Kabul et\\" veya \\"Reddet\\" seçeneğine tıklayın. Daha ayrıntılı seçimler yapmak için \\"Özelleştir\\" seçeneğine tıklayın.'),
                    "paragraph-mobile": (0,
                    a.act)("span", null, 'Sitemizi ve hizmetlerimizi sağlamak için gerekli olan temel çerezleri ve benzer araçları kullanıyoruz. Müşterilerin sitemizi nasıl kullandığını anlayabilmemiz ve iyileştirmeler yapabilmemiz için anonim istatistikler toplamak üzere performans çerezleri kullanıyoruz. Temel çerezler devre dışı bırakılamaz ancak performans çerezlerini reddetmek için "Çerezleri özelleştir" seçeneğine tıklayabilirsiniz. ', (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), ' Kabul ettiğinizde, AWS ve onaylı üçüncü taraflar da yararlı site özellikleri sağlamak, tercihlerinizi hatırlamak ve alakalı reklamlar dahil olmak üzere alakalı içerikler göstermek için çerezleri kullanacaktır. Bu çerezleri kabul etmeden devam etmek için "Kabul etmeden devam et" seçeneğine tıklayın. Daha ayrıntılı seçimler yapmak veya daha fazla bilgi edinmek için "Çerezleri özelleştir" seçeneğine tıklayın. AWS Konsolu Mobil Uygulaması, üçüncü taraf çerezleri veya reklam amaçlı kullanılan çerezler teslim etmez.'),
                    "button-customize": "Özelleştir",
                    "button-accept": "Kabul et",
                    "button-decline": "Reddet",
                    "button-decline-aria-label": "Kabul etmeden devam et",
                    "button-customize-aria-label": "Çerez tercihlerini özelleştir",
                    "button-accept-aria-label": "Tüm çerezleri kabul et"
                },
                consentSelector: {
                    header: "Çerez tercihlerini özelleştir",
                    intro: 'Çerezleri ve benzer araçları (topluca "çerezler") aşağıdaki amaçlar için kullanırız.',
                    "checkbox-label": "İzin verildi",
                    "button-cancel": "İptal",
                    "button-save": "Tercihleri kaydet",
                    "button-cancel-aria-label": "Çerez tercihlerini özelleştirmeyi iptal et",
                    "button-save-aria-label": "Özelleştirilmiş çerez tercihlerini kaydet",
                    footer: (0,
                    a.act)("span", null, "Bazı çerez türlerini engellemek, sitelerimizle ilgili deneyiminizi etkileyebilir. Bu sitenin alt bilgisindeki Çerez tercihleri bağlantısına tıklayarak dilediğiniz zaman seçimlerinizi değiştirebilirsiniz. Bizim ve onaylı üçüncü tarafların, çerezleri sitelerimizde nasıl kullandığımız hakkında daha fazla bilgi edinmek için lütfen ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Çerez Bildirimimizi", (0,
                    a.act)(o.default, {
                        ariaLabel: "Yeni Bir Pencerede Açılır",
                        size: "10px"
                    }))), " okuyun."),
                    "footer-mobile": (0,
                    a.act)("span", null, "Bazı çerez türlerini engellemek, sitelerimizle ilgili deneyiminizi etkileyebilir. Bu sitenin alt bilgisindeki Çerez tercihleri bağlantısına tıklayarak dilediğiniz zaman seçimlerinizi değiştirebilirsiniz. Bizim ve onaylı üçüncü tarafların, çerezleri sitelerimizde nasıl kullandığımız hakkında daha fazla bilgi edinmek için lütfen ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Çerez Bildirimimizi", (0,
                    a.act)(o.default, {
                        ariaLabel: "Yeni Bir Pencerede Açılır",
                        size: "10px"
                    }))), " okuyun. AWS Console Mobil Uygulaması, üçüncü taraf çerezleri veya reklamcılık için kullanılan çerezleri sunmaz. "),
                    "section-essential": {
                        title: "Temel",
                        paragraph: "Temel çerezler, sitemizi ve hizmetlerimizi sunmak için gerekli olup devre dışı bırakılamaz. Bunlar genellikle sitede gizlilik tercihlerinizi ayarlama, oturum açma veya formları doldurma gibi eylemlerde bulunduğunuzda yerleştirilir. ",
                        "checkbox-description": "Temel kategoriye izin ver"
                    },
                    "section-performance": {
                        title: "Performans",
                        paragraph: "Performans çerezleri, site deneyimini ve performansını iyileştirebilmemiz için müşterilerin sitemizde nasıl gezindiği hakkında anonim istatistikler sağlar. Onaylı üçüncü taraflar bizim adımıza analiz yapabilir ancak verileri kendi amaçları için kullanamazlar.",
                        "checkbox-description": "Performans kategorisine izin ver"
                    },
                    "section-functional": {
                        title: "İşlevsellik",
                        paragraph: "İşlevsellik çerezleri yararlı site özellikleri sunmamıza, tercihlerinizi hatırlamamıza ve alakalı içerikler göstermemize yardımcı olur. Onaylı üçüncü taraflar bu çerezleri belirli site özelliklerini sağlamak için yerleştirebilir. Bu çerezlere izin vermezseniz, bu hizmetlerin bir kısmı veya tamamı düzgün çalışmayabilir.",
                        "checkbox-description": "İşlevsellik kategorisine izin ver"
                    },
                    "section-advertising": {
                        title: "Reklam",
                        paragraph: "Reklam çerezleri, sitemiz aracılığıyla bizim tarafımızdan ya da reklam çözüm ortaklarımız tarafından yerleştirilebilir ve alakalı pazarlama içerikleri yayınlamamıza yardımcı olur. Bu çerezlere izin vermezseniz, daha az alakalı reklamlarla karşılaşırsınız.",
                        "checkbox-description": "Reklam kategorisine izin ver"
                    }
                },
                errorMessage: {
                    header: "Çerez tercihleri kaydedilemiyor",
                    paragraph: (0,
                    a.act)("span", null, "Çerez tercihlerinizi kaydedemediğimizden şimdilik yalnızca temel çerezleri saklayacağız.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Çerez tercihlerinizi değiştirmek istiyorsanız AWS konsolu alt bilgisindeki bağlantıyı kullanarak daha sonra tekrar deneyin veya sorunun devam etmesi durumunda destek ekibiyle iletişime geçin."),
                    "button-dismiss": "Yok say",
                    "button-dismiss-aria-label": "Hata mesajını yok say"
                }
            },
            "vi-vn": {
                consentBanner: {
                    title: "Chọn tùy chọn cookie của bạn",
                    paragraph: (0,
                    a.act)("span", null, "Chúng tôi sử dụng các cookie thiết yếu và công cụ tương tự cần thiết để cung cấp trang web và dịch vụ của chúng tôi. Chúng tôi sử dụng cookie hiệu năng để thu thập số liệu thống kê ẩn danh, qua đó hiểu rõ cách khách hàng sử dụng trang web của chúng tôi và tiến hành cải tiến. Bạn không thể vô hiệu hóa cookie thiết yếu, nhưng có thể nhấp vào “Tùy chỉnh” hoặc “Từ chối” để từ chối cookie hiệu năng. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Nếu bạn đồng ý, AWS và các bên thứ ba được phê duyệt cũng sẽ sử dụng cookie để cung cấp các tính năng hữu ích của trang web, ghi nhớ tùy chọn của bạn và hiển thị nội dung liên quan, bao gồm cả quảng cáo liên quan. Để chấp nhận hoặc từ chối tất cả các cookie không thiết yếu, nhấp vào “Chấp nhận” hoặc “Từ chối”. Để lựa chọn chi tiết hơn, nhấp vào “Tùy chỉnh”."),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "Chúng tôi sử dụng các cookie thiết yếu và các công cụ tương tự cần thiết để cung cấp trang web và các dịch vụ của chúng tôi. Chúng tôi sử dụng cookie hiệu suất để thu thập số liệu thống kê dạng ẩn danh để có thể thấu hiểu cách thức khách hàng sử dụng trang web của chúng tôi và đưa ra các cải tiến. Không thể tắt các cookie thiết yếu, nhưng bạn có thể nhấp vào “Tùy chỉnh cookie” để từ chối cookie hiệu suất. ", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " Nếu bạn đồng ý, AWS và các bên thứ ba được phê duyệt cũng sẽ sử dụng cookie để cung cấp các tính năng hữu ích của trang web, ghi nhớ các tùy chọn của bạn và hiển thị nội dung liên quan, bao gồm cả quảng cáo liên quan. Để tiếp tục mà không chấp nhận các cookie này, hãy nhấp vào “Tiếp tục mà không chấp nhận”. Để thực hiện các lựa chọn chi tiết hơn hoặc tìm hiểu thêm, hãy nhấp vào “Tùy chỉnh cookie”. Ứng dụng di động của Bảng điều khiển AWS không phân phối cookie của bên thứ ba hoặc cookie được dùng cho quảng cáo."),
                    "button-customize": "Tùy chỉnh",
                    "button-accept": "Chấp nhận",
                    "button-decline": "Từ chối",
                    "button-decline-aria-label": "Tiếp tục mà không chấp nhận",
                    "button-customize-aria-label": "Tùy chỉnh tùy chọn cookie",
                    "button-accept-aria-label": "Chấp nhận tất cả cookie"
                },
                consentSelector: {
                    header: "Tùy chỉnh tùy chọn cookie",
                    intro: "Chúng tôi sử dụng cookie và các công cụ tương tự (gọi chung là “cookie”) để phục vụ các mục đích sau.",
                    "checkbox-label": "Đã cho phép",
                    "button-cancel": "Hủy",
                    "button-save": "Lưu tùy chọn",
                    "button-cancel-aria-label": "Hủy tùy chỉnh tùy chọn cookie",
                    "button-save-aria-label": "Lưu tùy chọn cookie đã tùy chỉnh",
                    footer: (0,
                    a.act)("span", null, "Việc chặn một số loại cookie có thể ảnh hưởng đến trải nghiệm của bạn trên trang của chúng tôi. Bạn có thể thay đổi tùy chọn cookie của mình bất cứ lúc nào bằng cách nhấp vào Tùy chọn cookie ở chân của trang này. Để tìm hiểu thêm về cách chúng tôi và các bên thứ ba được chấp thuận sử dụng cookie trên trang của chúng tôi, vui lòng đọc ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "Thông báo về cookie của AWS.", (0,
                    a.act)(o.default, {
                        ariaLabel: "Mở trong cửa sổ mới",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "Việc chặn một số loại cookie có thể ảnh hưởng đến trải nghiệm bạn duyệt các trang web của chúng tôi. Bạn có thể xem xét và thay đổi lựa chọn của mình bất cứ lúc nào bằng cách nhấp vào Tùy chọn cookie ở chân trang của trang web này. Chúng tôi và các bên thứ ba được chọn sử dụng cookie hoặc các công nghệ tương tự như được chỉ định trong phần ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "Thông báo về cookie của AWS", (0,
                    a.act)(o.default, {
                        ariaLabel: "Mở trong cửa sổ mới",
                        size: "10px"
                    }))), ". Console Mobile App của AWS không cung cấp cookie của bên thứ ba hoặc cookie dùng cho quảng cáo."),
                    "section-essential": {
                        title: "Thiết yếu",
                        paragraph: "Cookie thiết yếu đóng vai trò cần thiết trong việc cung cấp trang cũng như dịch vụ của chúng tôi và không thể bị vô hiệu hóa. Thông thường, cookie được thiết lập để phản hồi các hành động của bạn trên trang, chẳng hạn như thiết lập tùy chọn quyền riêng tư, đăng nhập hoặc điền vào biểu mẫu. ",
                        "checkbox-description": "Cho phép hạng mục thiết yếu"
                    },
                    "section-performance": {
                        title: "Hiệu suất",
                        paragraph: "Cookie hiệu suất cung cấp số liệu thống kê ẩn danh về cách khách hàng điều hướng trang của chúng tôi nhằm giúp chúng tôi cải thiện trải nghiệm và hiệu suất của trang. Các bên thứ ba được chấp thuận có thể thực hiện phân tích thay mặt chúng tôi nhưng không thể sử dụng dữ liệu cho mục đích riêng của mình.",
                        "checkbox-description": "Cho phép hạng mục hiệu suất"
                    },
                    "section-functional": {
                        title: "Chức năng",
                        paragraph: "Cookie chức năng giúp chúng tôi cung cấp các tính năng có ích trên trang, ghi nhớ tùy chọn của bạn và hiển thị nội dung phù hợp. Các bên thứ ba được chấp thuận có thể thiết lập các cookie này để cung cấp một số tính năng trên site. Nếu bạn không cho phép các cookie này thì một số hoặc toàn bộ các dịch vụ này có thể không hoạt động đúng cách.",
                        "checkbox-description": "Cho phép hạng mục chức năng"
                    },
                    "section-advertising": {
                        title: "Quảng cáo",
                        paragraph: "Chúng tôi hoặc các đối tác quảng cáo của chúng tôi có thể thiết lập cookie quảng cáo thông qua trang của chúng tôi. Các cookie này giúp chúng tôi phân phối nội dung tiếp thị phù hợp. Nếu bạn không cho phép các cookie này, bạn sẽ nhận được quảng cáo ít phù hợp hơn.",
                        "checkbox-description": "Cho phép hạng mục quảng cáo"
                    }
                },
                errorMessage: {
                    header: "Không thể lưu tùy chọn cookie",
                    paragraph: (0,
                    a.act)("span", null, "Chúng tôi sẽ chỉ lưu trữ các cookie thiết yếu tại thời điểm này, vì chúng tôi không thể lưu tùy chọn cookie của bạn.", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "Nếu bạn muốn thay đổi tùy chọn cookie của mình, hãy thử lại sau bằng cách sử dụng liên kết ở chân trang của bảng điều khiển AWS hoặc liên hệ với bộ phận hỗ trợ nếu vẫn xảy ra lỗi."),
                    "button-dismiss": "Đóng",
                    "button-dismiss-aria-label": "Đóng thông báo lỗi"
                }
            },
            "zh-cn": {
                consentBanner: {
                    title: "选择您的 Cookie 首选项",
                    paragraph: (0,
                    a.act)("span", null, "我们使用必要 Cookie 和类似工具提供我们的网站和服务。我们使用性能 Cookie 收集匿名统计数据，以便我们可以了解客户如何使用我们的网站并进行改进。必要 Cookie 无法停用，但您可以单击“自定义”或“拒绝”来拒绝性能 Cookie。", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " 如果您同意，AWS 和经批准的第三方还将使用 Cookie 提供有用的网站功能、记住您的首选项并显示相关内容，包括相关广告。要接受或拒绝所有非必要 Cookie，请单击“接受”或“拒绝”。要做出更详细的选择，请单击“自定义”。"),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "我们使用必要的基本 Cookie 和类似工具来提供网站和服务。我们使用性能 Cookie 来收集匿名统计信息，以便了解客户如何使用我们的网站并进行改进。您无法停用基本 Cookie，但可以单击“自定义 Cookie”以拒绝性能 Cookie。", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " 如果您同意，AWS 和经批准的第三方还将使用 Cookie 来提供有用的网站功能、记住您的偏好并显示相关内容，包括相关广告。要继续而不接受这些 Cookie，请单击“继续而不接受”。要做出更详细的选择或了解更多信息，请单击“自定义 Cookie”。AWS 控制台移动应用程序不提供第三方 Cookie 或用于广告的 Cookie。"),
                    "button-customize": "自定义",
                    "button-accept": "接受",
                    "button-decline": "拒绝",
                    "button-decline-aria-label": "继续而不接受",
                    "button-customize-aria-label": "自定义 Cookie 首选项",
                    "button-accept-aria-label": "接受所有 Cookie"
                },
                consentSelector: {
                    header: "自定义 Cookie 首选项",
                    intro: "Cookie 及类似工具(统称为“Cookie”)的用途包括以下几种。",
                    "checkbox-label": "允许",
                    "button-cancel": "取消",
                    "button-save": "保存首选项",
                    "button-cancel-aria-label": "取消自定义 Cookie 首选项",
                    "button-save-aria-label": "保存自定义的 Cookie 首选项",
                    footer: (0,
                    a.act)("span", null, "阻止某些类型的 Cookie 的话，可能会影响到您的网站体验。您可以随时单击此网站页脚中的 Cookie 首选项来对您的 Cookie 首选项进行更改。要了解有关我们及经批准的第三方如何在网站上使用 Cookie 的更多信息，请阅读 ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Cookie 声明。", (0,
                    a.act)(o.default, {
                        ariaLabel: "在新窗口中打开",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "封锁某些类型的 Cookie 可能会影响您对我们网站的体验。您可以随时单击此网站页脚中的“Cookie 首选项”来审核和更改您的选择。我们和选择的第三方使用 Cookie 或类似技术，如", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Cookie 声明", (0,
                    a.act)(o.default, {
                        ariaLabel: "在新窗口中打开",
                        size: "10px"
                    }))), "中指定。AWS 控制台移动应用程序不会提供第三方 Cookie 或用于广告的 Cookie。"),
                    "section-essential": {
                        title: "关键",
                        paragraph: "关键 Cookie 对我们提供网站和服务来说绝对必要，不可将其禁用。关键 Cookie 通常是根据您在网站上的操作(例如，设置您的隐私首选项，登录或填写表格)来设置的。",
                        "checkbox-description": "允许关键类别"
                    },
                    "section-performance": {
                        title: "性能",
                        paragraph: "性能 Cookie 可为我们提供有关客户使用网站情况的匿名统计信息，以便我们改善用户的网站体验及网站性能。经批准的第三方可为我们执行分析，但不可将数据用于其自身目的。",
                        "checkbox-description": "允许性能类别"
                    },
                    "section-functional": {
                        title: "功能",
                        paragraph: "功能 Cookie 有助于我们提供有用的网站功能，记住您的首选项及显示有针对性的内容。经批准的第三方可对功能 Cookie 进行设置以提供某些网站功能。如果您不允许功能 Cookie，则某些或所有这些服务可能无法正常提供。",
                        "checkbox-description": "允许功能类别"
                    },
                    "section-advertising": {
                        title: "广告",
                        paragraph: "广告 Cookie 可由我们或我们的广告合作伙伴通过我们的网站进行设置，有助于我们推送有针对性的营销内容。如果您不允许广告 Cookie，则您所接收到的广告的针对性将会有所降低。",
                        "checkbox-description": "允许广告类别"
                    }
                },
                errorMessage: {
                    header: "无法保存 Cookie 首选项",
                    paragraph: (0,
                    a.act)("span", null, "我们目前只会存储基本 Cookie，因为我们无法保存您的 Cookie 首选项。", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "如果您想要更改 Cookie 首选项，请稍后使用 AWS 控制台页脚中的链接重试，如果问题仍然存在，请联系技术支持。"),
                    "button-dismiss": "关闭",
                    "button-dismiss-aria-label": "关闭错误消息"
                }
            },
            "zh-tw": {
                consentBanner: {
                    title: "選取您的 Cookie 偏好設定",
                    paragraph: (0,
                    a.act)("span", null, "我們使用提供自身網站和服務所需的基本 Cookie 和類似工具。我們使用效能 Cookie 收集匿名統計資料，以便了解客戶如何使用我們的網站並進行改進。基本 Cookie 無法停用，但可以按一下「自訂」或「拒絕」以拒絕效能 Cookie。", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " 如果您同意，AWS 與經核准的第三方也會使用 Cookie 提供實用的網站功能、記住您的偏好設定，並顯示相關內容，包括相關廣告。若要接受或拒絕所有非必要 Cookie，請按一下「接受」或「拒絕」。若要進行更詳細的選擇，請按一下「自訂」。"),
                    "paragraph-mobile": (0,
                    a.act)("span", null, "我們使用必要的 Cookie 和類似工具，這些是提供我們的網站和服務所必需的工具。我們使用效能 Cookie 收集匿名統計資訊，以便了解客戶如何使用我們的網站並進行改進。基本 Cookie 無法停用，但您可以按一下「自訂 Cookie」來拒絕效能 Cookie。", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), " 如果您同意，AWS 和核准的第三方也會使用 Cookie 來提供有用的網站功能、記住您的偏好設定，以及顯示相關內容，包括相關廣告。若要繼續而不接受這些 Cookie，請按一下「繼續而不接受」。要做出更詳細的選擇或了解更多資訊，請按一下「自訂 Cookie」。AWS 主控台行動應用程式不會交付第三方 Cookie 或用於廣告的 Cookie。"),
                    "button-customize": "自訂",
                    "button-accept": "接受",
                    "button-decline": "拒絕",
                    "button-decline-aria-label": "繼續而不接受",
                    "button-customize-aria-label": "自訂 Cookie 偏好設定",
                    "button-accept-aria-label": "接受所有 Cookie"
                },
                consentSelector: {
                    header: "自訂 Cookie 偏好設定",
                    intro: '我們會將 Cookie 和類似工具 (統稱為 "Cookie") 用於以下目的。',
                    "checkbox-label": "已允許",
                    "button-cancel": "取消",
                    "button-save": "儲存偏好設定",
                    "button-cancel-aria-label": "取消自訂 Cookie 偏好設定",
                    "button-save-aria-label": "儲存自訂的 Cookie 偏好設定",
                    footer: (0,
                    a.act)("span", null, "封鎖部分類型的 Cookie 可能會影響您在使用我們的網站時的體驗。您可以隨時在本網站頁尾按一下「Cookie 偏好設定」來變更您的 Cookie 偏好設定。若要進一步了解我們和獲核准的第三方如何在我們的網站上使用 Cookie，請閱讀我們的 ", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Cookie 通知。", (0,
                    a.act)(o.default, {
                        ariaLabel: "在新視窗中開啟",
                        size: "10px"
                    })))),
                    "footer-mobile": (0,
                    a.act)("span", null, "封鎖某些類型的 Cookie 可能會影響您對我們網站的體驗。您可以隨時按一下此網站頁尾中的「Cookie 偏好設定」來檢閱和變更您的選擇。我們和選取的第三方使用 Cookie 或類似技術，如", (0,
                    a.act)("a", {
                        "data-id": "awsccc-cs-f-notice",
                        href: i,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, (0,
                    a.act)("span", null, "AWS Cookie 聲明", (0,
                    a.act)(o.default, {
                        ariaLabel: "在新視窗中開啟",
                        size: "10px"
                    }))), "中指定。AWS 主控台行動應用程式不會提供第三方 Cookie 或用於廣告的 Cookie。"),
                    "section-essential": {
                        title: "必要",
                        paragraph: "必要 Cookie 對於我們所提供的網站和服務而是必要的，而且無法停用。它們的設定通常是對您在網站上的動作的回應，例如，設定您的隱私偏好、登入或填寫表單。",
                        "checkbox-description": "允許必要類別"
                    },
                    "section-performance": {
                        title: "效能",
                        paragraph: "效能 Cookie 提供有關客戶如何瀏覽我們網站的匿名統計資料，以便我們改善網站體驗和效能。獲核准的第三方可代表我們執行分析，但他們無法將資料用於自己的用途。",
                        "checkbox-description": "允許效能類別"
                    },
                    "section-functional": {
                        title: "功能",
                        paragraph: "功能 Cookie 可協助我們提供實用的網站功能、記住您的偏好設定，以及顯示相關內容，獲核准的第三方可能會設定這些 Cookie 以提供特定網站功能。若您不允許這些 Cookie，則部分或全部服務可能無法正常運作。",
                        "checkbox-description": "允許功能類別"
                    },
                    "section-advertising": {
                        title: "廣告",
                        paragraph: "我們或我們的廣告合作夥伴可以透過網站對廣告 Cookie 進行設定，協助我們提供相關的行銷內容。若您不允許這些 Cookie，您將看到相關程度較低的廣告。",
                        "checkbox-description": "允許廣告類別"
                    }
                },
                errorMessage: {
                    header: "無法儲存 Cookie 偏好設定",
                    paragraph: (0,
                    a.act)("span", null, "我們目前只會儲存基本 Cookie，因為我們無法儲存您的 Cookie 偏好設定。", (0,
                    a.act)("br", null), (0,
                    a.act)("br", null), "如果您想要變更 Cookie 偏好設定，請稍後使用 AWS 主控台頁尾中的連結重試，如果問題仍存在，請聯絡支援部門。"),
                    "button-dismiss": "關閉",
                    "button-dismiss-aria-label": "關閉錯誤訊息"
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(61);
        t.default = function(e, t, n) {
            void 0 === t && (t = a.v4),
            void 0 === n && (n = function() {
                return "ts-".concat(Date.now().toString())
            }
            );
            var o = e ? e("error") : function() {}
            ;
            try {
                return t()
            } catch (e) {
                return o("uuid", {
                    detail: "Error generating UUID",
                    errorMessage: e.message || ""
                }),
                n()
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.COOKIE_CATEGORIES = t.ESSENTIAL = void 0,
        t.ESSENTIAL = "essential",
        t.COOKIE_CATEGORIES = [t.ESSENTIAL, "performance", "functional", "advertising"]
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.queryGeolocationByHttpGetRequest = t.timestampUrl = t.QUERY_PARAM_KEY = t.FALLBACK_CONSOLE_INTEGRATION_GEOLOCATION_URL = t.DEFAULT_CONSOLE_INTEGRATION_GEOLOCATION_URL = t.DEFAULT_GEOLOCATION_URL = void 0;
        var a = n(13)
          , o = n(4)
          , i = n(3);
        t.DEFAULT_GEOLOCATION_URL = "https://prod.tools.shortbread.aws.dev/1x1.png",
        t.DEFAULT_CONSOLE_INTEGRATION_GEOLOCATION_URL = "https://prod.tools.shortbread.panorama.console.api.aws/ping",
        t.FALLBACK_CONSOLE_INTEGRATION_GEOLOCATION_URL = "https://prod.tools.shortbread.analytics.console.aws.a2z.com/ping",
        t.QUERY_PARAM_KEY = "awsccc";
        t.timestampUrl = function(e) {
            if (-1 !== e.indexOf("?")) {
                var n = e.split("?");
                e = n[0] + "?".concat(t.QUERY_PARAM_KEY, "=").concat(Date.now(), "&") + n[1]
            } else {
                if (-1 === e.indexOf("#"))
                    return e + "?".concat(t.QUERY_PARAM_KEY, "=").concat(Date.now());
                n = e.split("#");
                e = n[0] + "?".concat(t.QUERY_PARAM_KEY, "=").concat(Date.now(), "#") + n[1]
            }
            return e
        }
        ;
        t.queryGeolocationByHttpGetRequest = function(e, n, r, s) {
            function c(e, t, a, i, r) {
                e("info")(o.METRICS.CHECK_GEOLOCATION_SUCCESS, {
                    metric: t,
                    region: a,
                    detail: i,
                    url: n,
                    status: r
                })
            }
            return void 0 === e && (e = !1),
            void 0 === n && (n = t.DEFAULT_GEOLOCATION_URL),
            void 0 === r && (r = 5e3),
            void 0 === s && (s = a.DEFAULT_LOGGER),
            function(o, l) {
                if (void 0 === l && (l = s || a.DEFAULT_LOGGER),
                window.location.hostname.endsWith(".cn"))
                    return o("NON-EU");
                if ((0,
                i.isESCPartition)())
                    return o("EU");
                var u = Date.now()
                  , d = function(a, i) {
                    void 0 === i && (i = !1);
                    var s = new XMLHttpRequest
                      , p = "EU"
                      , f = 200;
                    e && s.overrideMimeType("application/json"),
                    s.addEventListener("load", (function() {
                        if (f = this.status,
                        e && 304 !== f)
                            try {
                                var t = JSON.parse(this.response);
                                403 === (f = t.status) && (p = "NON-EU")
                            } catch (e) {
                                l("error")("geolocationResponseError", {
                                    url: a,
                                    detail: "Failed to Parse the Received Geolocation Response"
                                })
                            }
                        else
                            p = 403 === f ? "NON-EU" : "EU";
                        c(l, Date.now() - u, p, "Geolocation Response Received".concat(i ? " (Fallback)" : ""), f),
                        o(p)
                    }
                    ));
                    var h = function() {
                        if (i) {
                            var e = "Geolocation Request Failed (Both Domains)";
                            c(l, r, "EU", e, 0),
                            l("error")("geolocationRequestError", {
                                url: n,
                                fallbackUrl: a,
                                timeoutSetting: r,
                                detail: e
                            }),
                            o("EU")
                        } else
                            d(t.FALLBACK_CONSOLE_INTEGRATION_GEOLOCATION_URL, !0)
                    };
                    s.addEventListener("timeout", h),
                    s.addEventListener("error", h),
                    s.open("GET", (0,
                    t.timestampUrl)(a)),
                    s.timeout = r,
                    s.send()
                };
                d(n)
            }
        }
        ,
        t.default = t.queryGeolocationByHttpGetRequest
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
          , o = this && this.__awaiter || function(e, t, n, a) {
            return new (n || (n = Promise))((function(o, i) {
                function r(e) {
                    try {
                        c(a.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        c(a.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(r, s)
                }
                c((a = a.apply(e, t || [])).next())
            }
            ))
        }
          , i = this && this.__generator || function(e, t) {
            var n, a, o, i = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, r = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return r.next = s(0),
            r.throw = s(1),
            r.return = s(2),
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function s(s) {
                return function(c) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; r && (r = 0,
                        s[0] && (i = 0)),
                        i; )
                            try {
                                if (n = 1,
                                a && (o = 2 & s[0] ? a.return : s[0] ? a.throw || ((o = a.return) && o.call(a),
                                0) : a.next) && !(o = o.call(a, s[1])).done)
                                    return o;
                                switch (a = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    a = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(o = i.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        i.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && i.label < o[1]) {
                                        i.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && i.label < o[2]) {
                                        i.label = o[2],
                                        i.ops.push(s);
                                        break
                                    }
                                    o[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                s = t.call(e, i)
                            } catch (e) {
                                s = [6, e],
                                a = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, c])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.DEFAULT_LOGGER = t.createLogger = t.DEFAULT_CONSOLE_INTEGRATION_FALLBACK_LOGGER_PIXEL_URL = t.DEFAULT_CONSOLE_INTEGRATION_LOGGER_PIXEL_URL = t.DEFAULT_LOGGER_PIXEL_URL = void 0;
        var r = n(14)
          , s = n(4)
          , c = n(28)
          , l = n(3);
        t.DEFAULT_LOGGER_PIXEL_URL = "https://prod.log.shortbread.aws.dev/1x1.png",
        t.DEFAULT_CONSOLE_INTEGRATION_LOGGER_PIXEL_URL = "https://prod.log.shortbread.console.api.aws/1x1.png",
        t.DEFAULT_CONSOLE_INTEGRATION_FALLBACK_LOGGER_PIXEL_URL = "https://prod.log.shortbread.analytics.console.aws.a2z.com/1x1.png";
        var u = function(e, t, n, a) {
            return o(void 0, void 0, void 0, (function() {
                var o;
                return i(this, (function(i) {
                    if ((0,
                    l.isESCPartition)())
                        return [2];
                    try {
                        (o = new XMLHttpRequest).onreadystatechange = function() {
                            4 === o.readyState && (o.status >= 200 && o.status < 300 ? a && a() : n && n())
                        }
                        ,
                        o.ontimeout = function() {
                            n && n()
                        }
                        ,
                        o.onerror = function() {
                            n && n()
                        }
                        ,
                        o.open("HEAD", e),
                        o.timeout = t,
                        o.send()
                    } catch (e) {
                        console.log("Error attempting to post a log message: {e}"),
                        n && n()
                    }
                    return [2]
                }
                ))
            }
            ))
        }
          , d = function(e, t, n, o) {
            void 0 === o && (o = {});
            var i = a({
                timestamp: Date.now(),
                logVersion: "1",
                domain: window.location.host,
                url: window.location.href,
                shortbreadCommit: r.SHORTBREAD_VERSION || "dev"
            }, o);
            return e + "?" + "severity=".concat(encodeURIComponent(t), "&message=").concat(encodeURIComponent(n), "&payload=").concat(encodeURIComponent(JSON.stringify(i)))
        };
        t.createLogger = function(e) {
            var n = e.baseUrl
              , a = void 0 === n ? t.DEFAULT_LOGGER_PIXEL_URL : n
              , o = e.timeout
              , i = void 0 === o ? 5e3 : o
              , r = e.onFail
              , s = e.onSuccess;
            return function(e) {
                return function(n, o) {
                    void 0 === o && (o = {});
                    var c = d(a, e, n, o);
                    p(e, n, o),
                    u(c, i, (function() {
                        if (a !== t.DEFAULT_LOGGER_PIXEL_URL) {
                            var c = d(t.DEFAULT_CONSOLE_INTEGRATION_FALLBACK_LOGGER_PIXEL_URL, e, n, o);
                            u(c, i, (function() {
                                r && r()
                            }
                            ), (function() {
                                s && s(c)
                            }
                            ))
                        }
                    }
                    ), (function() {
                        s && s(c)
                    }
                    ))
                }
            }
        }
        ;
        var p = function(e, t, n) {
            var a = "error" === e ? new Error(t) : void 0
              , o = s.UNIT.COUNT
              , i = 1;
            t.includes("geolocationLatency") && (o = s.UNIT.MILLISECONDS,
            i = n.latency),
            (0,
            c.trackEvent)({
                metric: t,
                value: i,
                unit: o,
                error: a,
                details: JSON.stringify(n)
            })
        };
        t.DEFAULT_LOGGER = (0,
        t.createLogger)({
            baseUrl: t.DEFAULT_LOGGER_PIXEL_URL
        }),
        t.default = t.createLogger
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.SHORTBREAD_VERSION = t.COMMIT_HASH = void 0,
        t.COMMIT_HASH = "cf1152489808ec3ae17b8939f12f6b6dfcb2e3af",
        t.SHORTBREAD_VERSION = "1.0.14.2"
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.TELEMETRY_CONFIG_MISSING_MSG = void 0,
        t.TELEMETRY_CONFIG_MISSING_MSG = "[TangerineBox] Telemetry configuration is missing, events will not be emitted"
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.MetaDataProvider = t.TenantTracker = t.ScheduledEventTracker = t.BrowserCredentials = void 0;
        var a = n(31);
        Object.defineProperty(t, "BrowserCredentials", {
            enumerable: !0,
            get: function() {
                return a.BrowserCredentials
            }
        });
        var o = n(18);
        Object.defineProperty(t, "ScheduledEventTracker", {
            enumerable: !0,
            get: function() {
                return o.ScheduledEventTracker
            }
        });
        var i = n(35);
        Object.defineProperty(t, "TenantTracker", {
            enumerable: !0,
            get: function() {
                return i.TenantTracker
            }
        });
        var r = n(36);
        Object.defineProperty(t, "MetaDataProvider", {
            enumerable: !0,
            get: function() {
                return r.MetaDataProvider
            }
        })
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.TELEMETRY_BROKER_PROPERTY_NAME = void 0,
        t.TELEMETRY_BROKER_PROPERTY_NAME = "_internal_tb_telemetry_broker"
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ScheduledEventTracker = void 0;
        var o = n(6)
          , i = n(19)
          , r = n(34)
          , s = n(5)
          , c = function() {
            function e(e, t) {
                this.props = e;
                var n = function() {
                    var e = t.tokensForPublicEvents;
                    if (void 0 !== e)
                        return e;
                    var n = t.parentToken;
                    return void 0 !== n ? [n] : void 0
                }();
                this.id = this.props.broker.register({
                    source: "weblib-v2",
                    telemetryToken: t.token,
                    telemetryTokensForPublicEvents: n
                })
            }
            return e.getInstance = function(t) {
                var n = null != t ? t : {
                    token: o.DataParser.getInstance().getTelemetryMetaTagContent().telemetryToken
                }
                  , a = o.DataParser.getInstance().getTelemetryBrokerWindow();
                if (void 0 === a)
                    throw new s.TelemetryBrokerNotAvailableError("Telemetry broker not found");
                return new e({
                    broker: new i.BrokerWrapper(a)
                },n)
            }
            ,
            e.prototype.addEvent = function(e, t) {
                var n = {
                    type: "log",
                    content: e,
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: n
                }, t))
            }
            ,
            e.prototype.addError = function(e, t, n) {
                var o = {
                    type: "error",
                    content: a({
                        error: e
                    }, t),
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addFatalError = function(e, t, n, o) {
                var i = {
                    type: "fatal-error",
                    content: a({
                        error: e
                    }, t),
                    fatalErrorMetadata: n,
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: i
                }, o))
            }
            ,
            e.prototype.addAwsSdkEvent = function(e, t) {
                var n = {
                    type: "aws-sdk-metric",
                    awsSdkMetric: e,
                    content: {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: n
                }, t))
            }
            ,
            e.prototype.addFmsEvaluationEvent = function(e, t, n) {
                var o = {
                    type: "fms-evaluation",
                    fmsEvaluation: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addAwsArachnidQueryEvent = function(e, t, n) {
                var o = {
                    type: "aws-arachnid-query",
                    awsArachnidQuery: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addAwsArachnidCredentialEvent = function(e, t, n) {
                var o = {
                    type: "aws-arachnid-credential",
                    awsArachnidCredential: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addJanusApiEvent = function(e, t, n) {
                var o = {
                    type: "janus-api",
                    janusApi: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addJanusCredentialEvent = function(e, t, n) {
                var o = {
                    type: "janus-credential",
                    janusCredential: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addLotusCspEvent = function(e, t, n) {
                var o = {
                    type: "lotus-csp",
                    lotusCsp: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addLotusIsolatedIFrameEvent = function(e, t, n) {
                var o = {
                    type: "lotus-isolated-iframe",
                    lotusIsolatedIFrame: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addLotusImportPackageEvent = function(e, t, n) {
                var o = {
                    type: "lotus-import-package",
                    lotusImportPackage: e.lotusImportPackage,
                    lotusMetadata: e.lotusMetadata,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addModuleLifecycleEvent = function(e, t, n) {
                var o = {
                    type: "module-lifecycle",
                    moduleLifecycle: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addCloudEditorEvent = function(e, t, n) {
                var o = {
                    type: "cloud-editor",
                    cloudEditor: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addCloudEditorLspEvent = function(e, t, n) {
                var o = {
                    type: "cloud-editor-lsp",
                    cloudEditorLsp: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addPapiProxyEvent = function(e, t, n) {
                var o = {
                    type: "papi-proxy",
                    papiProxy: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addPapiCredentialEvent = function(e, t, n) {
                var o = {
                    type: "papi-credential",
                    papiCredential: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.addBootstrapEvent = function(e, t, n) {
                var o = {
                    type: "tb-bootstrap",
                    tbBootstrap: e,
                    content: null != t ? t : {},
                    version: r.PACKAGE_VERSION,
                    timestamp: new Date
                };
                this.props.broker.addEvent(a({
                    tenantId: this.id,
                    event: o
                }, n))
            }
            ,
            e.prototype.dangerouslyFlushEvents = function() {
                this.props.broker.dangerouslyFlushEvents()
            }
            ,
            e
        }();
        t.ScheduledEventTracker = c
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.BrokerWrapper = void 0;
        var a = n(17)
          , o = function() {
            function e(e) {
                this.telemetryBroker = e[a.TELEMETRY_BROKER_PROPERTY_NAME]
            }
            return e.prototype.register = function(e) {
                return this.telemetryBroker.register(e)
            }
            ,
            e.prototype.addEvent = function(e) {
                this.telemetryBroker.addEvent(e)
            }
            ,
            e.prototype.dangerouslyFlushEvents = function() {
                this.telemetryBroker.dangerouslyFlushEvents()
            }
            ,
            e.prototype.registerTenant = function(e, t) {
                var n, a;
                null === (a = (n = this.telemetryBroker).registerTenant) || void 0 === a || a.call(n, e, t)
            }
            ,
            e.prototype.getTenants = function() {
                return this.telemetryBroker.getTenants ? this.telemetryBroker.getTenants() : {
                    hash: "",
                    tenants: []
                }
            }
            ,
            e
        }();
        t.BrokerWrapper = o
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.isChecked = m;
        var a = n(2)
          , o = n(9)
          , i = n(1)
          , r = n(7)
          , s = n(11)
          , c = n(0)
          , l = n(40)
          , u = n(41)
          , d = n(44)
          , p = n(58);
        n(59);
        var f = n(60)
          , h = n(4);
        function m(e) {
            return "" === document.querySelector("label[data-id=awsccc-u-cb-".concat(e, "-label] input")).getAttribute("checked")
        }
        function b(e) {
            var t = o.localizationDictionary[e.language]
              , n = o.localizationRtl.indexOf(e.language) > -1 ? "awsccc-Rtl" : "";
            function b() {
                return document.querySelector("div[data-id=".concat(i.BANNER_ID, "]"))
            }
            function k(e, t) {
                var n = document.querySelector("label[data-id=awsccc-u-cb-".concat(e, "-label]"))
                  , a = n.classList
                  , o = n.querySelector("input");
                t ? (o.setAttribute("checked", ""),
                a.add("awsccc-u-cb-checkbox-active")) : (a.remove("awsccc-u-cb-checkbox-active"),
                o.removeAttribute("checked")),
                o.setAttribute("aria-checked", "".concat(t))
            }
            var v = function(e) {
                var t, n = e.event, a = e.category;
                ("checkbox" === n.target.getAttribute("type") || "awsccc-cs-s-title" === n.target.getAttribute("class") || (null === (t = n.target.getAttribute("class")) || void 0 === t ? void 0 : t.includes("awsccc-u-cb-label"))) && k(a, !m(a))
            }
              , g = function(t) {
                return function(n, a) {
                    var o = b().querySelector("div[data-id=awsccc-cb-tabstart]");
                    b().style.display = "none",
                    o.setAttribute("tabindex", "-1"),
                    "customize" === t && A(),
                    e.handleValidation({
                        domain: e.domain
                    }, "saveBtnClick") ? (e.onSaveConsent(n),
                    e.log("info")(t, {
                        detail: "Save Consent Clicked",
                        source: a,
                        cookie: e.getConsentCookie(),
                        uuid: (0,
                        r.getId)()
                    })) : w()
                }
            }
              , y = function() {
                _()
            }
              , E = function() {
                return e.getConsentCookie() || a.DEFAULT_COOKIE
            }
              , C = function(t) {
                var n;
                n = E(),
                s.COOKIE_CATEGORIES.filter((function(e) {
                    return e !== s.ESSENTIAL
                }
                )).forEach((function(e) {
                    k(e, n[e])
                }
                )),
                (0,
                f.openModal)(i.CUSTOMIZE_ID),
                e.log("info")(h.METRICS.MANNUAL_OPEN_PREFERENCE_MODAL, {
                    detail: "Customize Consent Clicked",
                    source: t,
                    cookie: e.getConsentCookie(),
                    uuid: (0,
                    r.getId)()
                })
            }
              , w = function() {
                (0,
                f.openModal)(i.ERROR_MESSAGE_MODAL_ID)
            }
              , A = function() {
                ((0,
                f.closeModal)(i.CUSTOMIZE_ID),
                "block" === b().style.display) && b().querySelector("div[data-id=awsccc-cb-tabstart]").focus({
                    preventScroll: !0
                });
                e.onModalClose && e.onModalClose()
            }
              , _ = function() {
                (0,
                f.closeModal)(i.ERROR_MESSAGE_MODAL_ID)
            };
            return (0,
            l.default)((function() {
                var a;
                document.querySelector("#".concat(i.CONTAINER_ID)) || (0,
                c.render)(e.parent || document.body, (0,
                c.act)("div", {
                    id: i.CONTAINER_ID
                }, (0,
                c.act)("div", {
                    id: i.APP_ID,
                    class: n
                }, (0,
                c.act)(u.default, {
                    showConsentSelector: C,
                    handleSaveClick: g("acceptAll"),
                    handleDeclineClick: g("decline"),
                    localizedText: t.consentBanner,
                    hasConsoleNavFooter: e.hasConsoleNavFooter,
                    runtimeEnvironment: e.runtimeEnvironment,
                    getConsentCookie: e.getConsentCookie
                }), (0,
                c.act)(d.default, {
                    consentState: E(),
                    handleSaveClick: g("customize"),
                    handleCancelClick: (a = "cancel",
                    function(t) {
                        e.log("info")(a, {
                            detail: "Customize Modal Cancel Button Clicked",
                            source: t,
                            cookie: e.getConsentCookie(),
                            uuid: (0,
                            r.getId)()
                        }),
                        A()
                    }
                    ),
                    handleCheckboxToggle: v,
                    localizedText: t.consentSelector,
                    darkModeEnabled: e.hasConsoleNavFooter,
                    runtimeEnvironment: e.runtimeEnvironment,
                    getConsentCookie: e.getConsentCookie
                }), (0,
                c.act)(p.default, {
                    darkModeEnabled: e.hasConsoleNavFooter,
                    handleDismissClick: y,
                    localizedText: t.errorMessage
                }))))
            }
            )),
            {
                showConsentSelector: function(e) {
                    (0,
                    l.default)((function() {
                        C(e)
                    }
                    ))
                },
                showBanner: function(e) {
                    (0,
                    l.default)((function() {
                        var t;
                        t = b().querySelector("div[data-id=awsccc-cb-tabstart]"),
                        b().style.display = "block",
                        t.setAttribute("tabindex", "0"),
                        t.focus({
                            preventScroll: !0
                        }),
                        e()
                    }
                    ))
                },
                showErrorMessage: function() {
                    (0,
                    l.default)((function() {
                        w()
                    }
                    ))
                }
            }
        }
        t.default = {
            createShortbreadUi: function(e) {
                if (Math.random() < .1) {
                    var t = e.log
                      , n = e.domain;
                    t("info")(h.METRICS.UI_MOUNTED, {
                        domain: n
                    })
                }
                return b(e)
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
          , o = this && this.__rest || function(e, t) {
            var n = {};
            for (var a in e)
                Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (a = Object.getOwnPropertySymbols(e); o < a.length; o++)
                    t.indexOf(a[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[o]) && (n[a[o]] = e[a[o]])
            }
            return n
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(1)
          , r = n(0);
        n(47);
        var s = function(e) {
            var t = "Tab" === e.key
              , n = document.querySelector("div[data-id=".concat(i.TABTRAP_ID, '][tabindex="0"]'));
            if (t && n) {
                var a = n.querySelectorAll('a[href], button, input, [tabindex]:not([tabindex="-1"])')
                  , o = a[0]
                  , r = a[a.length - 1];
                e.shiftKey ? document.activeElement === o ? (r.focus(),
                e.preventDefault()) : document.activeElement.blur() : document.activeElement === r ? (o.focus(),
                e.preventDefault()) : document.activeElement.blur()
            }
        };
        t.default = function(e) {
            var t = e.id
              , n = e.isRTL
              , c = void 0 !== n && n
              , l = e.children
              , u = e.header
              , d = e.footer
              , p = e.size
              , f = void 0 === p ? "large" : p
              , h = e.onDismiss
              , m = void 0 === h ? function() {
                return null
            }
            : h
              , b = e.darkModeEnabled
              , k = void 0 !== b && b
              , v = o(e, ["id", "isRTL", "children", "header", "footer", "size", "onDismiss", "darkModeEnabled"]);
            return (0,
            r.act)("div", {
                id: t,
                "data-id": t,
                style: {
                    display: "none"
                },
                tabIndex: 0,
                class: k ? "dark-mode-enabled" : "",
                onKeyDown: function(e) {
                    if ("Escape" === e.key) {
                        var n = document.querySelector('[data-id="'.concat(t, '"]'));
                        "none" !== (null == n ? void 0 : n.style.display) && (e.stopPropagation(),
                        m())
                    }
                }
            }, (0,
            r.act)("div", a({
                onClick: m
            }, v, {
                class: "awsccc-u-modal-container ".concat(v.class || "")
            }), (0,
            r.act)("div", {
                class: "awsccc-u-modal awsccc-u-modal-".concat(f),
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "awsccc-u-modal-header-".concat(t),
                dir: c ? "rtl" : "ltr",
                "data-awsccc-modal-toggle": !0,
                "data-id": i.TABTRAP_ID,
                tabIndex: -1,
                onKeyDown: s,
                onClick: function(e) {
                    return e.stopPropagation()
                }
            }, (0,
            r.act)("div", {
                class: "awsccc-u-modal-header"
            }, (0,
            r.act)("h2", {
                id: "awsccc-u-modal-header-".concat(t)
            }, u)), (0,
            r.act)("div", {
                class: "awsccc-u-modal-content"
            }, l), d ? (0,
            r.act)("div", {
                class: "awsccc-u-modal-footer"
            }, d) : null), (0,
            r.act)("div", {
                class: "awsccc-u-modal-backdrop"
            })))
        }
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
          , o = this && this.__rest || function(e, t) {
            var n = {};
            for (var a in e)
                Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (a = Object.getOwnPropertySymbols(e); o < a.length; o++)
                    t.indexOf(a[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[o]) && (n[a[o]] = e[a[o]])
            }
            return n
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        n(49),
        t.default = function(e) {
            var t = e.children
              , n = e.size
              , r = void 0 === n ? "m" : n
              , s = e.direction
              , c = void 0 === s ? "horizontal" : s
              , l = o(e, ["children", "size", "direction"]);
            return (0,
            i.act)("div", a({}, l, {
                class: "awsccc-u-sb awsccc-u-sb-".concat(r, " awsccc-u-sb-").concat("horizontal" === c ? "h" : "v", " ").concat(l.class || "")
            }), t)
        }
    }
    , function(e, t, n) {
        e.exports = n(24)
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__createBinding || (Object.create ? function(e, t, n, a) {
            void 0 === a && (a = n);
            var o = Object.getOwnPropertyDescriptor(t, n);
            o && !("get"in o ? !t.__esModule : o.writable || o.configurable) || (o = {
                enumerable: !0,
                get: function() {
                    return t[n]
                }
            }),
            Object.defineProperty(e, a, o)
        }
        : function(e, t, n, a) {
            void 0 === a && (a = n),
            e[a] = t[n]
        }
        )
          , o = this && this.__exportStar || function(e, t) {
            for (var n in e)
                "default" === n || Object.prototype.hasOwnProperty.call(t, n) || a(t, e, n)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.AWSCShortbread = void 0;
        var i = n(25);
        Object.defineProperty(t, "AWSCShortbread", {
            enumerable: !0,
            get: function() {
                return i.AWSCShortbread
            }
        }),
        o(n(12), t),
        o(n(7), t)
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.AWSCShortbread = void 0;
        var o = n(2)
          , i = n(9)
          , r = n(7)
          , s = n(11)
          , c = n(12)
          , l = n(13)
          , u = n(4)
          , d = n(3)
          , p = n(10)
          , f = n(20)
          , h = {};
        function m(e) {
            Object.keys(h).forEach((function(t) {
                if (e[t]) {
                    var n = h[t];
                    n && n.forEach((function(e) {
                        e()
                    }
                    ))
                }
            }
            )),
            s.COOKIE_CATEGORIES.filter((function(t) {
                return e[t]
            }
            )).forEach((function(e) {
                h[e] = []
            }
            ))
        }
        function b(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent(o.CONSENT_COOKIE_CHANGED_EVENT, !1, !1, e),
            document.dispatchEvent(t)
        }
        var k = function(e, t) {
            return function(n) {
                (0,
                r.setConsentCookie)(n, e.domain, o.DEFAULT_COOKIE_AGE, p.default, e.__storeWriter, e.__configurationValidator, t, e.__uuidGenerator, e.__uuidFallback),
                b(n)
            }
        };
        function v(e, t, n) {
            if (!e)
                throw n("error")("checkNameIsInRegistry", {
                    detail: "AWSCC: No registry configured"
                }),
                Error("AWSCC: No registry configured");
            if (!e[t])
                throw n("error")("checkNameIsInRegistry", {
                    detail: "AWSCC: No such entry ".concat(t, " is in the registry")
                }),
                Error("AWSCC: No such entry ".concat(t, " is in the registry"))
        }
        function g(e) {
            if (e && "string" == typeof e) {
                var t = e.toLowerCase().replace(/[–_]/, "-");
                if (i.localizationDictionary[t])
                    return t;
                var n = Object.keys(i.localizationDictionary).find((function(e) {
                    return e.startsWith(t + "-")
                }
                ));
                return n || o.DEFAULT_LANGUAGE
            }
            return o.DEFAULT_LANGUAGE
        }
        t.AWSCShortbread = function(e) {
            void 0 === e && (e = {});
            var t = e
              , n = t.log || (0,
            l.createLogger)({
                baseUrl: t.hasConsoleNavFooter ? l.DEFAULT_CONSOLE_INTEGRATION_LOGGER_PIXEL_URL : l.DEFAULT_LOGGER_PIXEL_URL
            });
            void 0 !== t.domain && "string" == typeof t.domain && -1 !== t.domain.indexOf("aws.amazon.com") ? t.domain = o.DEFAULT_DOMAIN : null == t.domain && -1 !== window.location.hostname.indexOf("aws-dev.amazon.com") ? t.domain = o.DEFAULT_TANGERINEBOX_DEV_DOMAIN : window.location.hostname.endsWith(".aws.com") ? t.domain = o.DEFAULT_NEW_AWS_DOMAIN : (0,
            d.isESCPartition)() && (t.domain = o.DEFAULT_DOMAIN_ESC);
            var i = t.__configurationValidator || r.validateConfiguration;
            i({
                domain: t.domain,
                log: n
            }, "sbInit");
            var s = f.default.createShortbreadUi({
                domain: t.domain,
                parent: t.parent,
                language: g(t.language),
                onSaveConsent: k(t, n),
                getConsentCookie: function() {
                    return (0,
                    r.getConsentCookie)(t.__storeReader, n)
                },
                log: n,
                onModalClose: t.onModalClose,
                hasConsoleNavFooter: t.hasConsoleNavFooter || !1,
                runtimeEnvironment: t.runtimeEnvironment || "default",
                handleValidation: i
            });
            function y() {
                var e = (0,
                r.getConsentCookie)(t.__storeReader, n);
                return e ? (b(e),
                e) : e
            }
            var E, C, w = (E = t.onConsentChanged,
            C = function(e) {
                var t = e.detail;
                m(t),
                E && E(t)
            }
            ,
            document.addEventListener(o.CONSENT_COOKIE_CHANGED_EVENT, C),
            C);
            return {
                checkForCookieConsent: function() {
                    var e = y();
                    if (n("info")(u.METRICS.BANNER_CHECK, e ? {
                        cookie: e,
                        uuid: (0,
                        r.getId)()
                    } : {
                        status: "Consent cookie not present"
                    }),
                    !e) {
                        var i = t.hasConsoleNavFooter ? c.DEFAULT_CONSOLE_INTEGRATION_GEOLOCATION_URL : c.DEFAULT_GEOLOCATION_URL;
                        (t.queryGeolocation || (0,
                        c.default)(t.hasConsoleNavFooter, i))((function(e) {
                            if (!y())
                                if ("EU" === e)
                                    s.showBanner((function() {
                                        n("info")(u.METRICS.BANNER_SHOW, {
                                            region: e
                                        }),
                                        t.onBannerShown && t.onBannerShown()
                                    }
                                    ));
                                else {
                                    b((0,
                                    r.setConsentCookie)(a({}, o.ALL_ALLOWED), t.domain, 86400, p.default, t.__storeWriter, t.__configurationValidator, n, t.__uuidGenerator, t.__uuidFallback))
                                }
                        }
                        ), n)
                    }
                },
                customizeCookies: function() {
                    s.showConsentSelector("manualTrigger")
                },
                getConsentCookie: function() {
                    return (0,
                    r.getConsentCookie)(t.__storeReader, n)
                },
                access: function(e, a) {
                    v(t.registry, e, n);
                    var o = t.registry[e].category;
                    h[o] || (h[o] = []),
                    h[o].push((function() {
                        return a(e, t.registry[e])
                    }
                    ));
                    var i = (0,
                    r.getConsentCookie)(t.__storeReader, n);
                    i && m(i)
                },
                hasConsent: function(e) {
                    return v(t.registry, e, n),
                    ((0,
                    r.getConsentCookie)(t.__storeReader, n) || a({}, o.DEFAULT_COOKIE))[t.registry[e].category]
                },
                __close: function() {
                    document.removeEventListener(o.CONSENT_COOKIE_CHANGED_EVENT, w)
                }
            }
        }
        ,
        t.default = t.AWSCShortbread
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        n(27);
        var a = n(0);
        t.default = function(e) {
            var t = e.ariaLabel;
            return (0,
            a.act)("span", {
                "aria-label": t,
                role: "img",
                class: "awsccc-u-i-open-c"
            }, (0,
            a.act)("svg", {
                class: "awsccc-u-i-open",
                viewBox: "0 0 16 16",
                focusable: "false",
                "aria-hidden": "true"
            }, (0,
            a.act)("path", {
                class: "awsccc-stroke-linecap-square",
                d: "M10 2h4v4"
            }), (0,
            a.act)("path", {
                d: "M6 10l8-8"
            }), (0,
            a.act)("path", {
                class: "awsccc-stroke-linejoin-round",
                d: "M14 9.048V14H2V2h5"
            })))
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__awaiter || function(e, t, n, a) {
            return new (n || (n = Promise))((function(o, i) {
                function r(e) {
                    try {
                        c(a.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        c(a.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(r, s)
                }
                c((a = a.apply(e, t || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(e, t) {
            var n, a, o, i = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, r = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return r.next = s(0),
            r.throw = s(1),
            r.return = s(2),
            "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                return this
            }
            ),
            r;
            function s(s) {
                return function(c) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; r && (r = 0,
                        s[0] && (i = 0)),
                        i; )
                            try {
                                if (n = 1,
                                a && (o = 2 & s[0] ? a.return : s[0] ? a.throw || ((o = a.return) && o.call(a),
                                0) : a.next) && !(o = o.call(a, s[1])).done)
                                    return o;
                                switch (a = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return i.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    i.label++,
                                    a = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = i.ops.pop(),
                                    i.trys.pop();
                                    continue;
                                default:
                                    if (!(o = i.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        i = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        i.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && i.label < o[1]) {
                                        i.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && i.label < o[2]) {
                                        i.label = o[2],
                                        i.ops.push(s);
                                        break
                                    }
                                    o[2] && i.ops.pop(),
                                    i.trys.pop();
                                    continue
                                }
                                s = t.call(e, i)
                            } catch (e) {
                                s = [6, e],
                                a = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, c])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.trackEvent = void 0;
        var i = n(4)
          , r = n(29)
          , s = n(3)
          , c = n(14);
        t.trackEvent = function(e) {
            return a(void 0, void 0, void 0, (function() {
                var t, n, l, u, d, p, f, h;
                return o(this, (function(m) {
                    switch (m.label) {
                    case 0:
                        return m.trys.push([0, 2, , 3]),
                        (0,
                        s.isConsoleSession)() ? [4, a(void 0, void 0, void 0, (function() {
                            var e, t, n;
                            return o(this, (function(a) {
                                try {
                                    return e = (0,
                                    s.isESCPartition)(),
                                    t = (0,
                                    s.isProdConsole)(),
                                    n = e ? t ? i.TELEMETRY_TOKEN.ESC.PROD : i.TELEMETRY_TOKEN.ESC.GAMMA : t ? i.TELEMETRY_TOKEN.AWS.PROD : i.TELEMETRY_TOKEN.AWS.GAMMA,
                                    [2, r.TangerineBoxEventTrackerForWidget.getInstance({
                                        token: n
                                    })]
                                } catch (e) {
                                    return console.log("Failed to get tracker instance:", e),
                                    [2, null]
                                }
                                return [2]
                            }
                            ))
                        }
                        ))] : [2];
                    case 1:
                        return (t = m.sent()) ? (n = e.metric,
                        l = e.value,
                        u = e.unit,
                        d = e.error,
                        p = e.details,
                        f = p ? "".concat(p, ", shortbreadVersion: ").concat(c.SHORTBREAD_VERSION) : "shortbreadVersion: ".concat(c.SHORTBREAD_VERSION),
                        null != d ? t.addError(d, {
                            metric: n,
                            value: l,
                            unit: u,
                            details: f
                        }) : t.addEvent({
                            metric: n,
                            value: l,
                            unit: u,
                            details: f
                        }),
                        [3, 3]) : [2];
                    case 2:
                        return h = m.sent(),
                        console.log("Failed to track event.", h),
                        [3, 3];
                    case 3:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.TangerineBoxEventTrackerForWidget = t.TangerineBoxEventTrackerForLibrary = void 0;
        var a = n(30);
        Object.defineProperty(t, "TangerineBoxEventTrackerForLibrary", {
            enumerable: !0,
            get: function() {
                return a.TangerineBoxEventTrackerForLibrary
            }
        });
        var o = n(39);
        Object.defineProperty(t, "TangerineBoxEventTrackerForWidget", {
            enumerable: !0,
            get: function() {
                return o.TangerineBoxEventTrackerForWidget
            }
        })
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.NoOpTrackerForLibrary = t.TangerineBoxEventTrackerForLibrary = void 0;
        var a = n(15)
          , o = n(16)
          , i = function() {
            function e(e) {
                this.scheduledEventTracker = e
            }
            return e.getInstance = function(t) {
                try {
                    return new e(o.ScheduledEventTracker.getInstance(t))
                } catch (e) {
                    return console.warn(a.TELEMETRY_CONFIG_MISSING_MSG),
                    new r
                }
            }
            ,
            e.prototype.addEvent = function(e) {
                this.scheduledEventTracker.addEvent(e, {
                    publicEvent: !1
                })
            }
            ,
            e.prototype.addError = function(e, t, n) {
                this.scheduledEventTracker.addError(e, t, n)
            }
            ,
            e.prototype.addFatalError = function(e, t, n, a) {
                this.scheduledEventTracker.addFatalError(e, t, n, a)
            }
            ,
            e.prototype.addFmsEvaluationEvent = function(e, t, n) {
                this.scheduledEventTracker.addFmsEvaluationEvent(e, t, n)
            }
            ,
            e.prototype.addAwsArachnidQueryEvent = function(e, t, n) {
                this.scheduledEventTracker.addAwsArachnidQueryEvent(e, t, n)
            }
            ,
            e.prototype.addAwsArachnidCredentialEvent = function(e, t, n) {
                this.scheduledEventTracker.addAwsArachnidCredentialEvent(e, t, n)
            }
            ,
            e.prototype.addJanusApiEvent = function(e, t, n) {
                this.scheduledEventTracker.addJanusApiEvent(e, t, n)
            }
            ,
            e.prototype.addJanusCredentialEvent = function(e, t, n) {
                this.scheduledEventTracker.addJanusCredentialEvent(e, t, n)
            }
            ,
            e.prototype.addLotusCspEvent = function(e, t, n) {
                this.scheduledEventTracker.addLotusCspEvent(e, t, n)
            }
            ,
            e.prototype.addLotusIsolatedIFrameEvent = function(e, t, n) {
                this.scheduledEventTracker.addLotusIsolatedIFrameEvent(e, t, n)
            }
            ,
            e.prototype.addLotusImportPackageEvent = function(e, t, n) {
                this.scheduledEventTracker.addLotusImportPackageEvent(e, t, n)
            }
            ,
            e.prototype.addModuleLifecycleEvent = function(e, t, n) {
                this.scheduledEventTracker.addModuleLifecycleEvent(e, t, n)
            }
            ,
            e.prototype.addCloudEditorEvent = function(e, t, n) {
                this.scheduledEventTracker.addCloudEditorEvent(e, t, n)
            }
            ,
            e.prototype.addCloudEditorLspEvent = function(e, t, n) {
                this.scheduledEventTracker.addCloudEditorLspEvent(e, t, n)
            }
            ,
            e.prototype.addPapiProxyEvent = function(e, t, n) {
                this.scheduledEventTracker.addPapiProxyEvent(e, t, n)
            }
            ,
            e.prototype.addPapiCredentialEvent = function(e, t, n) {
                this.scheduledEventTracker.addPapiCredentialEvent(e, t, n)
            }
            ,
            e.prototype.addBootstrapEvent = function(e, t, n) {
                this.scheduledEventTracker.addBootstrapEvent(e, t, n)
            }
            ,
            e
        }();
        t.TangerineBoxEventTrackerForLibrary = i;
        var r = function() {
            function e() {}
            return e.prototype.addEvent = function(e, t) {}
            ,
            e.prototype.addError = function(e, t, n) {}
            ,
            e.prototype.addFatalError = function(e, t, n, a) {}
            ,
            e.prototype.addFmsEvaluationEvent = function(e, t, n) {}
            ,
            e.prototype.addAwsArachnidQueryEvent = function(e, t, n) {}
            ,
            e.prototype.addAwsArachnidCredentialEvent = function(e, t, n) {}
            ,
            e.prototype.addJanusApiEvent = function(e, t, n) {}
            ,
            e.prototype.addJanusCredentialEvent = function(e, t, n) {}
            ,
            e.prototype.addLotusCspEvent = function(e, t, n) {}
            ,
            e.prototype.addLotusIsolatedIFrameEvent = function(e, t, n) {}
            ,
            e.prototype.addLotusImportPackageEvent = function(e, t, n) {}
            ,
            e.prototype.addModuleLifecycleEvent = function(e, t, n) {}
            ,
            e.prototype.addCloudEditorEvent = function(e, t, n) {}
            ,
            e.prototype.addCloudEditorLspEvent = function(e, t, n) {}
            ,
            e.prototype.addPapiCredentialEvent = function(e, t, n) {}
            ,
            e.prototype.addPapiProxyEvent = function(e, t, n) {}
            ,
            e.prototype.addBootstrapEvent = function(e, t, n) {}
            ,
            e
        }();
        t.NoOpTrackerForLibrary = r
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
          , o = this && this.__awaiter || function(e, t, n, a) {
            return new (n || (n = Promise))((function(o, i) {
                function r(e) {
                    try {
                        c(a.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        c(a.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(r, s)
                }
                c((a = a.apply(e, t || [])).next())
            }
            ))
        }
          , i = this && this.__generator || function(e, t) {
            var n, a, o, i, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; r; )
                            try {
                                if (n = 1,
                                a && (o = 2 & i[0] ? a.return : i[0] ? a.throw || ((o = a.return) && o.call(a),
                                0) : a.next) && !(o = o.call(a, i[1])).done)
                                    return o;
                                switch (a = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    a = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        r.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(i);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                i = t.call(e, r)
                            } catch (e) {
                                i = [6, e],
                                a = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.BrowserCredentials = void 0;
        var r, s, c = n(32), l = n(33), u = n(5), d = n(6), p = n(18), f = function() {
            function e(e, t, n, a, o) {
                var i = this;
                this.isLoggedOut = !1,
                this.loggedOutMessage = "User Logged Out",
                this.dataParser = o,
                this.credentialsConfig = e,
                this.eventTracker = n,
                this.httpClient = t,
                this.cookieObserver = a,
                this.addLogoutListener((function() {
                    i.isLoggedOut = !0,
                    r && (r.accessKeyId = "",
                    r.secretAccessKey = "",
                    r.sessionToken = "",
                    r.expiration = new Date(0))
                }
                ))
            }
            return e.getInstance = function() {
                if (!this.browserCredentialsInstance) {
                    var t = d.DataParser.getInstance()
                      , n = void 0;
                    try {
                        n = p.ScheduledEventTracker.getInstance()
                    } catch (e) {
                        console.error("BrowserCredentials cannot instantiate ScheduledEventTracker", e)
                    }
                    var a = t.getCredentialsConfig()
                      , o = new c.HttpClient;
                    this.browserCredentialsInstance = new e(a,o,n,new l.CookieObserver(t.getLogoutDetectionCookieName()),t)
                }
                return this.browserCredentialsInstance
            }
            ,
            e.prototype.getCredentials = function() {
                return o(this, void 0, void 0, (function() {
                    var e;
                    return i(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            if (this.isLoggedOut)
                                throw new u.RefreshCredentialError(this.loggedOutMessage);
                            if ((null == r ? void 0 : r.expiration) && new Date(r.expiration).getTime() - Date.now() > 3e5)
                                return [2, r];
                            s || (s = this.requestCredentials()),
                            t.label = 1;
                        case 1:
                            return t.trys.push([1, , 3, 4]),
                            [4, s];
                        case 2:
                            return e = t.sent(),
                            [2, r = e];
                        case 3:
                            return s = void 0,
                            [7];
                        case 4:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.requestCredentials = function() {
                return o(this, void 0, void 0, (function() {
                    var e, t, n, a, o;
                    return i(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            e = {
                                url: this.credentialsConfig.browserCredsFullPath,
                                method: "POST",
                                headers: {
                                    "x-csrf-token": this.credentialsConfig.csrfToken
                                },
                                timeout: 5e3,
                                timeoutIncreasePerRetry: 1e3,
                                maxRetries: 4
                            },
                            i.label = 1;
                        case 1:
                            return i.trys.push([1, 3, , 4]),
                            [4, this.httpClient.call(e)];
                        case 2:
                            return t = i.sent(),
                            [3, 4];
                        case 3:
                            throw n = i.sent(),
                            this.emitClientErrorEvent(n),
                            new u.RefreshCredentialError("Fail to request credentials",n);
                        case 4:
                            if (this.emitClientResponseEvent(t),
                            !(t.finalHttpStatusCode >= 200 && t.finalHttpStatusCode < 300)) {
                                if ([401, 403].includes(t.finalHttpStatusCode))
                                    throw a = 401 === t.finalHttpStatusCode ? "Unauthorized" : "InvalidCsrfTokenError",
                                    this.dataParser.triggerLoggedOutDialog(),
                                    this.cookieObserver.getCookieListener().forEach((function(e) {
                                        return e()
                                    }
                                    )),
                                    this.loggedOutMessage = "".concat(a, ": Session is invalid"),
                                    new u.RefreshCredentialError(this.loggedOutMessage);
                                o = void 0;
                                try {
                                    o = JSON.parse(t.data.toString()).error
                                } catch (e) {
                                    o = "HTTP status code ".concat(t.finalHttpStatusCode)
                                }
                                throw new u.RefreshCredentialError(o)
                            }
                            return this.validate(t.data),
                            [2, t.data]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.validate = function(e) {
                for (var t = 0, n = ["accessKeyId", "secretAccessKey", "sessionToken"]; t < n.length; t++) {
                    var a = n[t];
                    if (!e[a])
                        throw new u.InvalidCredentialsError('Invalid credentials, missing property: "'.concat(a, '"'))
                }
            }
            ,
            e.prototype.addLogoutListener = function(e) {
                this.cookieObserver.addChangeListener(e)
            }
            ,
            e.prototype.emitClientErrorEvent = function(e) {
                var t, n = {
                    attemptCount: 1 + e.metadata.retries,
                    latencyMillseconds: e.metadata.latencyMillseconds,
                    maxRetriesExceeded: e.metadata.maxRetriesExceeded,
                    finalRequestId: e.metadata.finalRequestId,
                    startTimestamp: e.metadata.startTimestamp,
                    finalSdkException: e.metadata.code,
                    finalSdkExceptionMessage: e.message,
                    operation: "RefreshCredentials",
                    service: "TangerineBox",
                    region: ""
                };
                null === (t = this.eventTracker) || void 0 === t || t.addAwsSdkEvent(n)
            }
            ,
            e.prototype.emitClientResponseEvent = function(e) {
                var t, n = {
                    attemptCount: 1 + e.retries,
                    finalHttpStatusCode: e.finalHttpStatusCode,
                    finalRequestId: e.finalRequestId,
                    latencyMillseconds: e.latencyMillseconds,
                    maxRetriesExceeded: e.maxRetriesExceeded,
                    startTimestamp: e.startTimestamp,
                    operation: "RefreshCredentials",
                    service: "TangerineBox",
                    region: ""
                };
                e.finalHttpStatusCode >= 400 && (n = a({
                    finalSdkException: "RequestFailed",
                    finalSdkExceptionMessage: "Request failed with status code ".concat(e.finalHttpStatusCode),
                    finalHttpStatusCode: e.finalHttpStatusCode
                }, n)),
                null === (t = this.eventTracker) || void 0 === t || t.addAwsSdkEvent(n)
            }
            ,
            e
        }();
        t.BrowserCredentials = f
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
          , o = this && this.__awaiter || function(e, t, n, a) {
            return new (n || (n = Promise))((function(o, i) {
                function r(e) {
                    try {
                        c(a.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        c(a.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(r, s)
                }
                c((a = a.apply(e, t || [])).next())
            }
            ))
        }
          , i = this && this.__generator || function(e, t) {
            var n, a, o, i, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; r; )
                            try {
                                if (n = 1,
                                a && (o = 2 & i[0] ? a.return : i[0] ? a.throw || ((o = a.return) && o.call(a),
                                0) : a.next) && !(o = o.call(a, i[1])).done)
                                    return o;
                                switch (a = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    a = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        r.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(i);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                i = t.call(e, r)
                            } catch (e) {
                                i = [6, e],
                                a = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.HttpClient = t.MAX_RETRIES = void 0;
        var r = n(5);
        t.MAX_RETRIES = 4;
        var s = function(e) {
            return Math.random() * Math.min(10, Math.pow(2, e)) * 100
        }
          , c = function() {
            function e(e) {
                this.jsonReplacer = e
            }
            return e.prototype.call = function(e) {
                var n, a, c;
                return o(this, void 0, void 0, (function() {
                    var o, l, u, d, p;
                    return i(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            o = new Date,
                            u = 0,
                            i.label = 1;
                        case 1:
                            return u <= (null !== (n = e.maxRetries) && void 0 !== n ? n : t.MAX_RETRIES) ? u ? [4, (h = s(u),
                            new Promise((function(e) {
                                return setTimeout(e, h)
                            }
                            )))] : [3, 3] : [3, 7];
                        case 2:
                            i.sent(),
                            i.label = 3;
                        case 3:
                            return i.trys.push([3, 5, , 6]),
                            [4, this.callWithFetch(e, u)];
                        case 4:
                            return d = i.sent(),
                            l = d.requestId,
                            (f = d.status) >= 500 || 429 === f ? [3, 6] : [2, {
                                finalHttpStatusCode: d.status,
                                finalRequestId: l,
                                data: d.data,
                                retries: u,
                                startTimestamp: o,
                                latencyMillseconds: (new Date).getTime() - o.getTime(),
                                maxRetriesExceeded: !1
                            }];
                        case 5:
                            if (p = i.sent(),
                            u >= (null !== (a = e.maxRetries) && void 0 !== a ? a : t.MAX_RETRIES) && p instanceof Error)
                                throw new r.TerminalRequestError(p.message,{
                                    finalHttpStatusCode: 500,
                                    finalRequestId: l,
                                    retries: u,
                                    code: p.metadata.code,
                                    startTimestamp: o,
                                    latencyMillseconds: (new Date).getTime() - o.getTime(),
                                    maxRetriesExceeded: !0
                                });
                            return [3, 6];
                        case 6:
                            return u++,
                            [3, 1];
                        case 7:
                            throw new r.TerminalRequestError("Too many retries",{
                                finalHttpStatusCode: 500,
                                finalRequestId: l,
                                retries: null !== (c = e.maxRetries) && void 0 !== c ? c : t.MAX_RETRIES,
                                startTimestamp: o,
                                code: "MaxRetriesExceeded",
                                latencyMillseconds: (new Date).getTime() - o.getTime(),
                                maxRetriesExceeded: !0
                            })
                        }
                        var f, h
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.callWithFetch = function(e, t) {
                var n, s, c;
                return o(this, void 0, void 0, (function() {
                    var o, l, u, d, p, f;
                    return i(this, (function(i) {
                        switch (i.label) {
                        case 0:
                            o = {
                                method: e.method,
                                headers: a({
                                    "X-Retries": "".concat(t)
                                }, e.headers),
                                keepalive: !0
                            },
                            void 0 !== e.timeout && e.timeout > 0 && (l = new AbortController,
                            setTimeout((function() {
                                return l.abort()
                            }
                            ), e.timeout + t * (e.timeoutIncreasePerRetry || 0)),
                            o.signal = l.signal),
                            "GET" !== e.method.toUpperCase() && (o.body = this.createBody(e)),
                            i.label = 1;
                        case 1:
                            return i.trys.push([1, 7, , 8]),
                            [4, fetch(e.url, o)];
                        case 2:
                            return u = i.sent(),
                            d = null !== (s = null === (n = null == u ? void 0 : u.headers) || void 0 === n ? void 0 : n.get("X-Amzn-Requestid")) && void 0 !== s ? s : void 0,
                            (p = null === (c = null == u ? void 0 : u.headers) || void 0 === c ? void 0 : c.get("Content-Type")) && /application\/json/.test(p) ? [4, u.json()] : [3, 4];
                        case 3:
                            return [2, {
                                data: i.sent(),
                                retries: t,
                                status: u.status,
                                requestId: d
                            }];
                        case 4:
                            return [4, u.text()];
                        case 5:
                            return [2, {
                                data: i.sent(),
                                retries: t,
                                status: u.status,
                                requestId: d
                            }];
                        case 6:
                            return [3, 8];
                        case 7:
                            throw (f = i.sent())instanceof Error && "AbortError" === f.name ? new r.FailureRequestError("Request timeout",{
                                code: "RequestTimeout",
                                finalHttpStatusCode: 500,
                                retries: t
                            }) : new r.FailureRequestError("Request encountered an error",{
                                code: "RequestFailed",
                                finalHttpStatusCode: 500,
                                retries: t
                            });
                        case 8:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.createBody = function(e) {
                var t = e.data;
                return t ? "string" == typeof t ? t : "object" == typeof t ? JSON.stringify(t, this.jsonReplacer) : String(t) : null
            }
            ,
            e
        }();
        t.HttpClient = c
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.CookieObserver = void 0;
        var a = n(6)
          , o = function() {
            function e(e, t, n) {
                void 0 === t && (t = 2e3),
                this.cookieName = e,
                this.listeners = [],
                this.dataParser = null != n ? n : a.DataParser.getInstance(),
                this.lastSeenCookieValue = this.dataParser.parseCookie(e),
                setInterval(this.poll.bind(this), t)
            }
            return e.prototype.addChangeListener = function(e) {
                this.listeners.push(e)
            }
            ,
            e.prototype.poll = function() {
                var e = this.dataParser.parseCookie(this.cookieName);
                this.lastSeenCookieValue !== e && this.getCookieListener().forEach((function(e) {
                    return e()
                }
                )),
                this.lastSeenCookieValue = e
            }
            ,
            e.prototype.getCookieListener = function() {
                return this.listeners
            }
            ,
            e
        }();
        t.CookieObserver = o
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.PACKAGE_VERSION = void 0,
        t.PACKAGE_VERSION = "2.0.227789.0#e5a59909"
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.TenantTracker = void 0;
        var a = n(6)
          , o = n(5)
          , i = n(19)
          , r = function() {
            function e() {}
            return e.registerTenant = function(e, t) {
                this.getBrokerWrapper().registerTenant(e, t)
            }
            ,
            e.getTenants = function() {
                return this.getBrokerWrapper().getTenants()
            }
            ,
            e.getBrokerWrapper = function() {
                if (this.brokerWrapper)
                    return this.brokerWrapper;
                var e = a.DataParser.getInstance().getTelemetryBrokerWindow();
                if (void 0 === e)
                    throw new o.TelemetryBrokerNotAvailableError("Telemetry broker not found");
                return this.brokerWrapper = new i.BrokerWrapper(e),
                this.brokerWrapper
            }
            ,
            e
        }();
        t.TenantTracker = r
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__awaiter || function(e, t, n, a) {
            return new (n || (n = Promise))((function(o, i) {
                function r(e) {
                    try {
                        c(a.next(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function s(e) {
                    try {
                        c(a.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }
                function c(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(r, s)
                }
                c((a = a.apply(e, t || [])).next())
            }
            ))
        }
          , o = this && this.__generator || function(e, t) {
            var n, a, o, i, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }
            ),
            i;
            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; r; )
                            try {
                                if (n = 1,
                                a && (o = 2 & i[0] ? a.return : i[0] ? a.throw || ((o = a.return) && o.call(a),
                                0) : a.next) && !(o = o.call(a, i[1])).done)
                                    return o;
                                switch (a = 0,
                                o && (i = [2 & i[0], o.value]),
                                i[0]) {
                                case 0:
                                case 1:
                                    o = i;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    a = i[1],
                                    i = [0];
                                    continue;
                                case 7:
                                    i = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                        r.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = i;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(i);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                i = t.call(e, r)
                            } catch (e) {
                                i = [6, e],
                                a = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & i[0])
                            throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.MetaDataProvider = void 0;
        var i = n(6)
          , r = n(37)
          , s = function() {
            function e(e) {
                this.dataParser = e
            }
            return e.getInstance = function() {
                return this.metaDataProviderInstance || (this.metaDataProviderInstance = new e(i.DataParser.getInstance())),
                this.metaDataProviderInstance
            }
            ,
            e.prototype.getCdnUrl = function(e) {
                return /^(http|https|ws|wss):\/\//.test(e) ? e : "".concat(this.dataParser.getMetaTagContent().cdn).concat(e)
            }
            ,
            e.prototype.getCustomContext = function(e) {
                return this.dataParser.getMetaTagContent().custom[e]
            }
            ,
            e.prototype.getAssetUrl = function(e, t) {
                var n = this.getCustomContext(e) + "/".concat(t);
                return this.getCdnUrl(n)
            }
            ,
            e.prototype.getConsoleTelemetryToken = function() {
                return this.dataParser.getTelemetryMetaTagContent().telemetryToken
            }
            ,
            e.prototype.getSessionARN = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return [2, this.dataParser.getSessionDataValue("sessionARN")]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getAccountId = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return [2, this.dataParser.getSessionDataValue("accountId")]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getIdentityToken = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return [2, this.dataParser.getSessionDataValue("identityToken")]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getSessionId = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return [2, this.dataParser.getSessionDataValue("sessionId")]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getInfrastructureRegion = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return [2, this.dataParser.getSessionDataValue("infrastructureRegion")]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getVpc = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return [2, this.dataParser.getSessionDataValue("vpc")]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getAccountAlias = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return [2, this.dataParser.getSessionDataValue("accountAlias")]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getDisplayName = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return [2, this.dataParser.getSessionDataValue("displayName")]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getSessionDifferentiator = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        return [2, this.dataParser.getSessionDataValue("sessionDifferentiator")]
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.isMultiSessionEnabled = function() {
                return a(this, void 0, void 0, (function() {
                    return o(this, (function(e) {
                        switch (e.label) {
                        case 0:
                            return [4, this.dataParser.getSessionDataValue("prismModeEnabled")];
                        case 1:
                            return [2, !!e.sent()]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.getCustomServiceEndpoint = function(e) {
                var t = this.dataParser.getMetaTagContent().endpoints;
                return t ? t["CUSTOM_".concat(e)] : void 0
            }
            ,
            e.prototype.getHelpPanelApiEndpoint = function() {
                return (this.dataParser.getMetaTagContent().endpoints || {}).STANDARD_HelpPanelAPI
            }
            ,
            e.prototype.getHelpPanelApiFallbackEndpoint = function() {
                return (this.dataParser.getMetaTagContent().endpoints || {}).STANDARD_HelpPanelAPI_Fallback
            }
            ,
            e.prototype.getIamAdminStandardConfig = function() {
                var e = (this.dataParser.getMetaTagContent().endpoints || {}).STANDARD_iamadmin
                  , t = this.getCustomContext("STANDARD_iamadmin_signing_region");
                if (e && t)
                    return {
                        region: t,
                        endpoint: e
                    }
            }
            ,
            e.prototype.getUserPreferenceServiceEndpoint = function() {
                return a(this, void 0, void 0, (function() {
                    var e, t, n, a;
                    return o(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            return [4, this.dataParser.getSessionDataValue("dualstackEnabledDomain")];
                        case 1:
                            return e = o.sent(),
                            [4, this.getInfrastructureRegion()];
                        case 2:
                            return t = o.sent(),
                            n = (0,
                            r.ripRegion)(t),
                            a = e ? n.websiteDomainDualstack : n.websiteDomain,
                            [2, "https://".concat(t, ".console.").concat(a, "/p/pref/1")]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e
        }();
        t.MetaDataProvider = s
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.ripRegion = void 0;
        var a = n(38);
        t.ripRegion = function(e) {
            return a[e]
        }
    }
    , function(e) {
        e.exports = JSON.parse('{"ap-isog-east-1":{"websiteDomain":"csphome.adc-g.au","websiteDomainDualstack":"awshome.adc-g.au"},"ap-southeast-6":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"us-isof-south-1":{"websiteDomain":"csphome.hci.ic.gov","websiteDomainDualstack":"awshome.hci.ic.gov"},"us-iso-west-1":{"websiteDomain":"c2shome.ic.gov","websiteDomainDualstack":"awshome.ic.gov"},"eu-north-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"me-south-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"cn-north-1":{"websiteDomain":"amazonaws.cn","websiteDomainDualstack":"amazonwebservices.cn"},"ap-southeast-7":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-south-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"eu-west-3":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-southeast-3":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"us-east-2":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"af-south-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"us-iso-east-1":{"websiteDomain":"c2shome.ic.gov","websiteDomainDualstack":"awshome.ic.gov"},"eu-west-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"me-central-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"us-isob-west-1":{"websiteDomain":"sc2shome.sgov.gov","websiteDomainDualstack":"awshome.scloud"},"eu-central-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"sa-east-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-east-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-south-2":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"us-east-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-northeast-2":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-northeast-3":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-southeast-5":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"us-isob-east-1":{"websiteDomain":"sc2shome.sgov.gov","websiteDomainDualstack":"awshome.scloud"},"eu-west-2":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"us-isof-east-1":{"websiteDomain":"csphome.hci.ic.gov","websiteDomainDualstack":"awshome.hci.ic.gov"},"us-northeast-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-southeast-4":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"eu-south-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"eu-isoe-west-1":{"websiteDomain":"csphome.adc-e.uk","websiteDomainDualstack":"awshome.adc-e.uk"},"ap-northeast-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"us-gov-east-1":{"websiteDomain":"amazonaws-us-gov.com","websiteDomainDualstack":"aws-us-gov.com"},"us-gov-west-1":{"websiteDomain":"amazonaws-us-gov.com","websiteDomainDualstack":"aws-us-gov.com"},"us-west-2":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"mx-central-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"me-west-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"sa-west-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"us-west-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-southeast-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-southeast-2":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"eusc-de-east-1":{"websiteDomain":"amazonaws-eusc.eu","websiteDomainDualstack":"aws.eu"},"il-central-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ap-east-2":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ca-central-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"ca-west-1":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"eu-south-2":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"},"cn-northwest-1":{"websiteDomain":"amazonaws.cn","websiteDomainDualstack":"amazonwebservices.cn"},"eu-central-2":{"websiteDomain":"aws.amazon.com","websiteDomainDualstack":"aws.com"}}')
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.NoOpTrackerForWidget = t.TangerineBoxEventTrackerForWidget = void 0;
        var a = n(15)
          , o = n(16)
          , i = function() {
            function e(e) {
                this.scheduledEventTracker = e
            }
            return e.getInstance = function(t) {
                try {
                    return new e(o.ScheduledEventTracker.getInstance(t))
                } catch (e) {
                    return console.warn(a.TELEMETRY_CONFIG_MISSING_MSG),
                    new r
                }
            }
            ,
            e.prototype.addEvent = function(e, t) {
                this.scheduledEventTracker.addEvent(e, t)
            }
            ,
            e.prototype.addError = function(e, t, n) {
                this.scheduledEventTracker.addError(e, t, n)
            }
            ,
            e.prototype.addFatalError = function(e, t, n, a) {
                this.scheduledEventTracker.addFatalError(e, t, n, a)
            }
            ,
            e
        }();
        t.TangerineBoxEventTrackerForWidget = i;
        var r = function() {
            function e() {}
            return e.prototype.addEvent = function(e, t) {}
            ,
            e.prototype.addError = function(e, t, n) {}
            ,
            e.prototype.addFatalError = function(e, t, n, a) {}
            ,
            e
        }();
        t.NoOpTrackerForWidget = r
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.default = function(e, t, n) {
            void 0 === t && (t = document);
            void 0 === n && (n = window);
            function o() {
                t.removeEventListener(a, o),
                n.removeEventListener("load", o),
                e()
            }
            "loading" !== t.readyState ? n.setTimeout(e) : (t.addEventListener(a, o),
            n.addEventListener("load", o))
        }
        ;
        var a = "DOMContentLoaded"
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(2)
          , o = n(1)
          , i = n(0)
          , r = n(8);
        n(43),
        t.default = function(e) {
            var t = e.showConsentSelector
              , n = e.handleSaveClick
              , s = e.handleDeclineClick
              , c = e.localizedText
              , l = e.getConsentCookie
              , u = e.hasConsoleNavFooter
              , d = void 0 !== u && u
              , p = e.runtimeEnvironment
              , f = void 0 === p ? "default" : p
              , h = (l() || a.DEFAULT_COOKIE,
            {
                essential: !0,
                functional: !0,
                performance: !0,
                advertising: !0
            })
              , m = {
                essential: !0,
                functional: !1,
                performance: !1,
                advertising: !1
            }
              , b = !0 === d ? "awsccc-tab-helper awsc-bot-above-f-imp" : "awsccc-tab-helper";
            return (0,
            i.act)("div", {
                "data-id": o.BANNER_ID,
                style: {
                    display: "none"
                }
            }, (0,
            i.act)("div", {
                id: "awsccc-cb-c",
                "data-id": "awsccc-cb-tabstart",
                class: b,
                tabIndex: -1
            }, (0,
            i.act)("div", {
                id: "awsccc-cb-content"
            }, (0,
            i.act)("div", {
                id: "awsccc-cb-text-section"
            }, (0,
            i.act)("h2", {
                id: "awsccc-cb-title"
            }, c.title), (0,
            i.act)("p", {
                id: "awsccc-cb-text"
            }, "mobile" === f ? c["paragraph-mobile"] : c.paragraph)), (0,
            i.act)("div", {
                id: "awsccc-cb-actions"
            }, (0,
            i.act)("div", {
                id: "awsccc-cb-buttons"
            }, (0,
            i.act)(r.default, {
                dataId: o.BANNER_ACCEPT_BTN_ID,
                variant: "primary",
                text: c["button-accept"],
                events: {
                    onclick: function() {
                        return n(h, "consentBanner")
                    }
                },
                props: {
                    "aria-label": c["button-accept-aria-label"]
                }
            }), (0,
            i.act)(r.default, {
                dataId: o.BANNER_DECLINE_BTN_ID,
                variant: "secondary",
                text: c["button-decline"],
                events: {
                    onclick: function() {
                        return s(m, "consentBanner")
                    }
                },
                props: {
                    "aria-label": c["button-decline-aria-label"]
                }
            }), (0,
            i.act)(r.default, {
                dataId: o.BANNER_CUSTOMIZE_BTN_ID,
                variant: "secondary",
                text: c["button-customize"],
                events: {
                    onclick: function() {
                        return t("consentBanner")
                    }
                },
                props: {
                    "aria-label": c["button-customize-aria-label"]
                }
            }))))))
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(1)
          , o = n(0)
          , i = n(45)
          , r = n(21)
          , s = n(48)
          , c = n(50)
          , l = n(52)
          , u = n(54);
        t.default = function(e) {
            var t = e.handleSaveClick
              , n = e.handleCancelClick
              , d = e.handleCheckboxToggle
              , p = e.localizedText
              , f = e.consentState
              , h = e.getConsentCookie
              , m = e.darkModeEnabled
              , b = void 0 !== m && m
              , k = e.runtimeEnvironment
              , v = void 0 === k ? "default" : k;
            return (0,
            o.act)(r.default, {
                id: a.CUSTOMIZE_ID,
                size: "large",
                onDismiss: n,
                darkModeEnabled: b,
                header: (0,
                o.act)("span", {
                    id: "awsccc-cs-title"
                }, p.header),
                footer: (0,
                o.act)(s.default, {
                    handleSaveClick: t,
                    handleCancelClick: n,
                    localizedText: p,
                    getConsentCookie: h
                })
            }, (0,
            o.act)(i.default, {
                columns: 1,
                borders: "horizontal"
            }, (0,
            o.act)(c.default, {
                localizedText: p.intro
            }), (0,
            o.act)(u.default, {
                category: "essential",
                content: p["section-essential"],
                isDisabled: !0,
                isChecked: f.essential,
                handleCheckboxToggle: d,
                localizedLabelText: p["checkbox-label"]
            }), (0,
            o.act)(u.default, {
                category: "performance",
                content: p["section-performance"],
                isChecked: f.performance,
                handleCheckboxToggle: d,
                localizedLabelText: p["checkbox-label"]
            }), (0,
            o.act)(u.default, {
                category: "functional",
                content: p["section-functional"],
                isChecked: f.functional,
                handleCheckboxToggle: d,
                localizedLabelText: p["checkbox-label"]
            }), (0,
            o.act)(u.default, {
                category: "advertising",
                content: p["section-advertising"],
                isChecked: f.advertising,
                handleCheckboxToggle: d,
                localizedLabelText: p["checkbox-label"]
            }), (0,
            o.act)(l.default, {
                localizedText: "mobile" === v ? p["footer-mobile"] : p.footer
            })))
        }
    }
    , function(e, t, n) {
        "use strict";
        var a = this && this.__assign || function() {
            return a = Object.assign || function(e) {
                for (var t, n = 1, a = arguments.length; n < a; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            a.apply(this, arguments)
        }
          , o = this && this.__rest || function(e, t) {
            var n = {};
            for (var a in e)
                Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var o = 0;
                for (a = Object.getOwnPropertySymbols(e); o < a.length; o++)
                    t.indexOf(a[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[o]) && (n[a[o]] = e[a[o]])
            }
            return n
        }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        n(46),
        t.default = function(e) {
            var t = e.children
              , n = void 0 === t ? [] : t
              , r = e.columns
              , s = void 0 === r ? 1 : r
              , c = (e.borders,
            o(e, ["children", "columns", "borders"]));
            if (1 !== s)
                throw new Error("Multiple columns not implemented");
            return (0,
            i.act)("div", a({}, c, {
                class: "awsccc-u-cl ".concat(c.class || "")
            }), n.map((function(e) {
                return (0,
                i.act)("div", {
                    class: "awsccc-u-cl-c"
                }, e)
            }
            )))
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(2)
          , o = n(1)
          , i = n(0)
          , r = n(8)
          , s = n(22)
          , c = n(20);
        t.default = function(e) {
            var t = e.handleSaveClick
              , n = e.handleCancelClick
              , l = e.localizedText
              , u = e.getConsentCookie;
            function d() {
                u() || a.DEFAULT_COOKIE;
                return {
                    essential: !0,
                    performance: (0,
                    c.isChecked)("performance"),
                    functional: (0,
                    c.isChecked)("functional"),
                    advertising: (0,
                    c.isChecked)("advertising")
                }
            }
            return (0,
            i.act)(s.default, {
                direction: "horizontal",
                size: "xs"
            }, (0,
            i.act)(r.default, {
                dataId: o.CUSTOMIZE_CANCEL_BTN_ID,
                variant: "secondary",
                onClick: function() {
                    n("preferencesModal")
                },
                props: {
                    "aria-label": l["button-cancel-aria-label"]
                }
            }, l["button-cancel"]), (0,
            i.act)(r.default, {
                dataId: o.CUSTOMIZE_SAVE_BTN_ID,
                variant: "primary",
                onClick: function() {
                    t(d(), "preferencesModal")
                },
                props: {
                    "aria-label": l["button-save-aria-label"]
                }
            }, l["button-save"]))
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(0);
        n(51),
        t.default = function(e) {
            var t = e.localizedText;
            return (0,
            a.act)("div", {
                id: "awsccc-cs-info-container"
            }, (0,
            a.act)("span", null, t))
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(0);
        n(53),
        t.default = function(e) {
            var t = e.localizedText;
            return (0,
            a.act)("div", {
                id: "awsccc-cs-l-container"
            }, (0,
            a.act)("p", null, t))
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(0)
          , o = n(55);
        n(57),
        t.default = function(e) {
            var t = e.category
              , n = e.content
              , i = e.isDisabled
              , r = e.handleCheckboxToggle
              , s = e.localizedLabelText
              , c = e.isChecked;
            return (0,
            a.act)("div", {
                "data-category": t,
                class: "awsccc-cs-sec-container"
            }, i ? (0,
            a.act)("h3", {
                class: "awsccc-cs-s-title"
            }, n.title) : (0,
            a.act)("h3", {
                class: "awsccc-cs-s-title",
                onClick: function(e) {
                    return r({
                        category: t,
                        event: {
                            target: e.currentTarget
                        }
                    })
                }
            }, n.title), (0,
            a.act)("div", {
                class: "awsccc-cs-s-text"
            }, (0,
            a.act)("p", {
                class: "awsccc-cs-s-paragraph"
            }, n.paragraph)), i ? (0,
            a.act)("div", {
                class: "awsccc-cs-s-action"
            }) : (0,
            a.act)("div", {
                class: "awsccc-cs-s-action"
            }, (0,
            a.act)(o.default, {
                id: t,
                isChecked: c,
                localizedDescription: n["checkbox-description"],
                localizedLabelText: s,
                category: t,
                handleCheckboxToggle: r
            })))
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(0);
        n(56),
        t.default = function(e) {
            var t = e.id
              , n = e.isChecked
              , o = e.localizedLabelText
              , i = e.localizedDescription
              , r = e.category
              , s = e.handleCheckboxToggle;
            return (0,
            a.act)("div", null, (0,
            a.act)("div", {
                class: "awsccc-cs-s-cb-outer"
            }, (0,
            a.act)("div", {
                class: "awscc-u-cb-checkbox-container",
                "data-id": "awsccc-u-cb-".concat(t, "-container")
            }, (0,
            a.act)("label", {
                "data-id": "awsccc-u-cb-".concat(t, "-label"),
                class: "awsccc-u-cb-label".concat(n ? " awsccc-u-cb-checkbox-active" : "")
            }, (0,
            a.act)("input", {
                id: "awsccc-u-cb-".concat(t),
                class: "awsccc-u-cb-input",
                type: "checkbox",
                "aria-checked": "".concat(n),
                "aria-label": "".concat(i, " ").concat(o),
                checked: !!n || void 0,
                onFocus: function() {
                    document.querySelector("div[data-id=awsccc-u-cb-".concat(t, "-container]")).classList.add("awsccc-u-cb-focused")
                },
                onBlur: function() {
                    document.querySelector("div[data-id=awsccc-u-cb-".concat(t, "-container]")).classList.remove("awsccc-u-cb-focused")
                },
                onChange: function(e) {
                    s({
                        category: r,
                        event: {
                            target: e.target
                        }
                    })
                },
                "aria-description": i
            }), (0,
            a.act)("svg", {
                viewBox: "0 0 14 14",
                "aria-hidden": "true",
                focusable: "false",
                class: "awscc-u-cb-checkbox"
            }, (0,
            a.act)("rect", {
                class: "awscc-u-cb-checkbox-rect",
                x: "0.5",
                y: "0.5",
                rx: "1.5",
                ry: "1.5",
                width: "13",
                height: "13"
            }), (0,
            a.act)("polyline", {
                class: "awscc-u-cb-checkbox-poly-line ",
                points: "2.5,7 6,10 11,3"
            }))))), (0,
            a.act)("span", {
                class: "awsccc-u-cb-text"
            }, o))
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(1)
          , o = n(0)
          , i = n(8)
          , r = n(21)
          , s = n(22);
        t.default = function(e) {
            var t = e.localizedText
              , n = e.handleDismissClick
              , c = e.darkModeEnabled;
            function l() {
                n()
            }
            return (0,
            o.act)(r.default, {
                id: a.ERROR_MESSAGE_MODAL_ID,
                darkModeEnabled: c,
                size: "large",
                onDismiss: l,
                header: (0,
                o.act)("span", {
                    id: "awsccc-em-title"
                }, t.header),
                footer: (0,
                o.act)(s.default, {
                    id: "awsccc-em-f-c",
                    direction: "horizontal",
                    size: "xs"
                }, (0,
                o.act)(i.default, {
                    dataId: a.ERROR_MESSAGE_MODAL_DISMISS_BTN_ID,
                    variant: "primary",
                    onClick: l,
                    props: {
                        "aria-label": t["button-dismiss-aria-label"]
                    }
                }, t["button-dismiss"]))
            }, (0,
            o.act)("div", {
                id: "awsccc-em-modalBody"
            }, (0,
            o.act)("p", {
                id: "awsccc-emm-paragraph"
            }, t.paragraph)))
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t)
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.closeModal = t.openModal = void 0;
        var a = n(1)
          , o = n(3)
          , i = {}
          , r = function(e) {
            if (e === document.documentElement)
                return !0;
            if (!e)
                return !1;
            var t = parseInt(e.getAttribute("tabindex") || "0") < 0
              , n = getComputedStyle(e)
              , a = "none" === n.getPropertyValue("display") || "hidden" === n.getPropertyValue("visibility");
            return !t && !a && r(e.parentElement)
        };
        t.openModal = function(e) {
            var t = document.querySelector('[data-id="'.concat(e, '"]'));
            if (t && t instanceof HTMLElement) {
                document.activeElement instanceof HTMLElement && (i[e] = document.activeElement),
                document.body.classList.add(a.MODAL_OPEN_BODY_CLASS),
                document.body.setAttribute(a.CURRENT_MODAL_DATA_ATTR, e),
                t.style.display = "block";
                var n = t.querySelectorAll("div[data-id=".concat(a.TABTRAP_ID, "]"));
                (0,
                o.convertToArray)(n).forEach((function(e, t) {
                    0 === t && e.focus({
                        preventScroll: !0
                    }),
                    e.setAttribute("tabindex", "0")
                }
                ))
            }
        }
        ;
        t.closeModal = function(e) {
            var t, n = document.querySelector('[data-id="'.concat(e, '"]'));
            if (n && n instanceof HTMLElement) {
                document.body.classList.remove(a.MODAL_OPEN_BODY_CLASS),
                document.body.removeAttribute(a.CURRENT_MODAL_DATA_ATTR),
                n.style.display = "none";
                var s = n.querySelectorAll("div[data-id=".concat(a.TABTRAP_ID, "]"));
                (0,
                o.convertToArray)(s).forEach((function(e) {
                    e.setAttribute("tabindex", "-1")
                }
                )),
                r(i[e]) && (null === (t = i[e]) || void 0 === t || t.focus()),
                delete i[e]
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var a;
        n.r(t),
        n.d(t, "v1", (function() {
            return m
        }
        )),
        n.d(t, "v3", (function() {
            return _
        }
        )),
        n.d(t, "v4", (function() {
            return z
        }
        )),
        n.d(t, "v5", (function() {
            return O
        }
        )),
        n.d(t, "NIL", (function() {
            return D
        }
        )),
        n.d(t, "version", (function() {
            return I
        }
        )),
        n.d(t, "validate", (function() {
            return s
        }
        )),
        n.d(t, "stringify", (function() {
            return p
        }
        )),
        n.d(t, "parse", (function() {
            return b
        }
        ));
        var o = new Uint8Array(16);
        function i() {
            if (!a && !(a = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto)))
                throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return a(o)
        }
        var r = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        for (var s = function(e) {
            return "string" == typeof e && r.test(e)
        }, c = [], l = 0; l < 256; ++l)
            c.push((l + 256).toString(16).substr(1));
        var u, d, p = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
              , n = (c[e[t + 0]] + c[e[t + 1]] + c[e[t + 2]] + c[e[t + 3]] + "-" + c[e[t + 4]] + c[e[t + 5]] + "-" + c[e[t + 6]] + c[e[t + 7]] + "-" + c[e[t + 8]] + c[e[t + 9]] + "-" + c[e[t + 10]] + c[e[t + 11]] + c[e[t + 12]] + c[e[t + 13]] + c[e[t + 14]] + c[e[t + 15]]).toLowerCase();
            if (!s(n))
                throw TypeError("Stringified UUID is invalid");
            return n
        }, f = 0, h = 0;
        var m = function(e, t, n) {
            var a = t && n || 0
              , o = t || new Array(16)
              , r = (e = e || {}).node || u
              , s = void 0 !== e.clockseq ? e.clockseq : d;
            if (null == r || null == s) {
                var c = e.random || (e.rng || i)();
                null == r && (r = u = [1 | c[0], c[1], c[2], c[3], c[4], c[5]]),
                null == s && (s = d = 16383 & (c[6] << 8 | c[7]))
            }
            var l = void 0 !== e.msecs ? e.msecs : Date.now()
              , m = void 0 !== e.nsecs ? e.nsecs : h + 1
              , b = l - f + (m - h) / 1e4;
            if (b < 0 && void 0 === e.clockseq && (s = s + 1 & 16383),
            (b < 0 || l > f) && void 0 === e.nsecs && (m = 0),
            m >= 1e4)
                throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            f = l,
            h = m,
            d = s;
            var k = (1e4 * (268435455 & (l += 122192928e5)) + m) % 4294967296;
            o[a++] = k >>> 24 & 255,
            o[a++] = k >>> 16 & 255,
            o[a++] = k >>> 8 & 255,
            o[a++] = 255 & k;
            var v = l / 4294967296 * 1e4 & 268435455;
            o[a++] = v >>> 8 & 255,
            o[a++] = 255 & v,
            o[a++] = v >>> 24 & 15 | 16,
            o[a++] = v >>> 16 & 255,
            o[a++] = s >>> 8 | 128,
            o[a++] = 255 & s;
            for (var g = 0; g < 6; ++g)
                o[a + g] = r[g];
            return t || p(o)
        };
        var b = function(e) {
            if (!s(e))
                throw TypeError("Invalid UUID");
            var t, n = new Uint8Array(16);
            return n[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24,
            n[1] = t >>> 16 & 255,
            n[2] = t >>> 8 & 255,
            n[3] = 255 & t,
            n[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8,
            n[5] = 255 & t,
            n[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8,
            n[7] = 255 & t,
            n[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8,
            n[9] = 255 & t,
            n[10] = (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255,
            n[11] = t / 4294967296 & 255,
            n[12] = t >>> 24 & 255,
            n[13] = t >>> 16 & 255,
            n[14] = t >>> 8 & 255,
            n[15] = 255 & t,
            n
        };
        var k = function(e, t, n) {
            function a(e, a, o, i) {
                if ("string" == typeof e && (e = function(e) {
                    e = unescape(encodeURIComponent(e));
                    for (var t = [], n = 0; n < e.length; ++n)
                        t.push(e.charCodeAt(n));
                    return t
                }(e)),
                "string" == typeof a && (a = b(a)),
                16 !== a.length)
                    throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                var r = new Uint8Array(16 + e.length);
                if (r.set(a),
                r.set(e, a.length),
                (r = n(r))[6] = 15 & r[6] | t,
                r[8] = 63 & r[8] | 128,
                o) {
                    i = i || 0;
                    for (var s = 0; s < 16; ++s)
                        o[i + s] = r[s];
                    return o
                }
                return p(r)
            }
            try {
                a.name = e
            } catch (e) {}
            return a.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
            a.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
            a
        };
        function v(e) {
            return 14 + (e + 64 >>> 9 << 4) + 1
        }
        function g(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
        }
        function y(e, t, n, a, o, i) {
            return g((r = g(g(t, e), g(a, i))) << (s = o) | r >>> 32 - s, n);
            var r, s
        }
        function E(e, t, n, a, o, i, r) {
            return y(t & n | ~t & a, e, t, o, i, r)
        }
        function C(e, t, n, a, o, i, r) {
            return y(t & a | n & ~a, e, t, o, i, r)
        }
        function w(e, t, n, a, o, i, r) {
            return y(t ^ n ^ a, e, t, o, i, r)
        }
        function A(e, t, n, a, o, i, r) {
            return y(n ^ (t | ~a), e, t, o, i, r)
        }
        var _ = k("v3", 48, (function(e) {
            if ("string" == typeof e) {
                var t = unescape(encodeURIComponent(e));
                e = new Uint8Array(t.length);
                for (var n = 0; n < t.length; ++n)
                    e[n] = t.charCodeAt(n)
            }
            return function(e) {
                for (var t = [], n = 32 * e.length, a = "0123456789abcdef", o = 0; o < n; o += 8) {
                    var i = e[o >> 5] >>> o % 32 & 255
                      , r = parseInt(a.charAt(i >>> 4 & 15) + a.charAt(15 & i), 16);
                    t.push(r)
                }
                return t
            }(function(e, t) {
                e[t >> 5] |= 128 << t % 32,
                e[v(t) - 1] = t;
                for (var n = 1732584193, a = -271733879, o = -1732584194, i = 271733878, r = 0; r < e.length; r += 16) {
                    var s = n
                      , c = a
                      , l = o
                      , u = i;
                    n = E(n, a, o, i, e[r], 7, -680876936),
                    i = E(i, n, a, o, e[r + 1], 12, -389564586),
                    o = E(o, i, n, a, e[r + 2], 17, 606105819),
                    a = E(a, o, i, n, e[r + 3], 22, -1044525330),
                    n = E(n, a, o, i, e[r + 4], 7, -176418897),
                    i = E(i, n, a, o, e[r + 5], 12, 1200080426),
                    o = E(o, i, n, a, e[r + 6], 17, -1473231341),
                    a = E(a, o, i, n, e[r + 7], 22, -45705983),
                    n = E(n, a, o, i, e[r + 8], 7, 1770035416),
                    i = E(i, n, a, o, e[r + 9], 12, -1958414417),
                    o = E(o, i, n, a, e[r + 10], 17, -42063),
                    a = E(a, o, i, n, e[r + 11], 22, -1990404162),
                    n = E(n, a, o, i, e[r + 12], 7, 1804603682),
                    i = E(i, n, a, o, e[r + 13], 12, -40341101),
                    o = E(o, i, n, a, e[r + 14], 17, -1502002290),
                    n = C(n, a = E(a, o, i, n, e[r + 15], 22, 1236535329), o, i, e[r + 1], 5, -165796510),
                    i = C(i, n, a, o, e[r + 6], 9, -1069501632),
                    o = C(o, i, n, a, e[r + 11], 14, 643717713),
                    a = C(a, o, i, n, e[r], 20, -373897302),
                    n = C(n, a, o, i, e[r + 5], 5, -701558691),
                    i = C(i, n, a, o, e[r + 10], 9, 38016083),
                    o = C(o, i, n, a, e[r + 15], 14, -660478335),
                    a = C(a, o, i, n, e[r + 4], 20, -405537848),
                    n = C(n, a, o, i, e[r + 9], 5, 568446438),
                    i = C(i, n, a, o, e[r + 14], 9, -1019803690),
                    o = C(o, i, n, a, e[r + 3], 14, -187363961),
                    a = C(a, o, i, n, e[r + 8], 20, 1163531501),
                    n = C(n, a, o, i, e[r + 13], 5, -1444681467),
                    i = C(i, n, a, o, e[r + 2], 9, -51403784),
                    o = C(o, i, n, a, e[r + 7], 14, 1735328473),
                    n = w(n, a = C(a, o, i, n, e[r + 12], 20, -1926607734), o, i, e[r + 5], 4, -378558),
                    i = w(i, n, a, o, e[r + 8], 11, -2022574463),
                    o = w(o, i, n, a, e[r + 11], 16, 1839030562),
                    a = w(a, o, i, n, e[r + 14], 23, -35309556),
                    n = w(n, a, o, i, e[r + 1], 4, -1530992060),
                    i = w(i, n, a, o, e[r + 4], 11, 1272893353),
                    o = w(o, i, n, a, e[r + 7], 16, -155497632),
                    a = w(a, o, i, n, e[r + 10], 23, -1094730640),
                    n = w(n, a, o, i, e[r + 13], 4, 681279174),
                    i = w(i, n, a, o, e[r], 11, -358537222),
                    o = w(o, i, n, a, e[r + 3], 16, -722521979),
                    a = w(a, o, i, n, e[r + 6], 23, 76029189),
                    n = w(n, a, o, i, e[r + 9], 4, -640364487),
                    i = w(i, n, a, o, e[r + 12], 11, -421815835),
                    o = w(o, i, n, a, e[r + 15], 16, 530742520),
                    n = A(n, a = w(a, o, i, n, e[r + 2], 23, -995338651), o, i, e[r], 6, -198630844),
                    i = A(i, n, a, o, e[r + 7], 10, 1126891415),
                    o = A(o, i, n, a, e[r + 14], 15, -1416354905),
                    a = A(a, o, i, n, e[r + 5], 21, -57434055),
                    n = A(n, a, o, i, e[r + 12], 6, 1700485571),
                    i = A(i, n, a, o, e[r + 3], 10, -1894986606),
                    o = A(o, i, n, a, e[r + 10], 15, -1051523),
                    a = A(a, o, i, n, e[r + 1], 21, -2054922799),
                    n = A(n, a, o, i, e[r + 8], 6, 1873313359),
                    i = A(i, n, a, o, e[r + 15], 10, -30611744),
                    o = A(o, i, n, a, e[r + 6], 15, -1560198380),
                    a = A(a, o, i, n, e[r + 13], 21, 1309151649),
                    n = A(n, a, o, i, e[r + 4], 6, -145523070),
                    i = A(i, n, a, o, e[r + 11], 10, -1120210379),
                    o = A(o, i, n, a, e[r + 2], 15, 718787259),
                    a = A(a, o, i, n, e[r + 9], 21, -343485551),
                    n = g(n, s),
                    a = g(a, c),
                    o = g(o, l),
                    i = g(i, u)
                }
                return [n, a, o, i]
            }(function(e) {
                if (0 === e.length)
                    return [];
                for (var t = 8 * e.length, n = new Uint32Array(v(t)), a = 0; a < t; a += 8)
                    n[a >> 5] |= (255 & e[a / 8]) << a % 32;
                return n
            }(e), 8 * e.length))
        }
        ));
        var z = function(e, t, n) {
            var a = (e = e || {}).random || (e.rng || i)();
            if (a[6] = 15 & a[6] | 64,
            a[8] = 63 & a[8] | 128,
            t) {
                n = n || 0;
                for (var o = 0; o < 16; ++o)
                    t[n + o] = a[o];
                return t
            }
            return p(a)
        };
        function S(e, t, n, a) {
            switch (e) {
            case 0:
                return t & n ^ ~t & a;
            case 1:
            case 3:
                return t ^ n ^ a;
            case 2:
                return t & n ^ t & a ^ n & a
            }
        }
        function T(e, t) {
            return e << t | e >>> 32 - t
        }
        var O = k("v5", 80, (function(e) {
            var t = [1518500249, 1859775393, 2400959708, 3395469782]
              , n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            if ("string" == typeof e) {
                var a = unescape(encodeURIComponent(e));
                e = [];
                for (var o = 0; o < a.length; ++o)
                    e.push(a.charCodeAt(o))
            } else
                Array.isArray(e) || (e = Array.prototype.slice.call(e));
            e.push(128);
            for (var i = e.length / 4 + 2, r = Math.ceil(i / 16), s = new Array(r), c = 0; c < r; ++c) {
                for (var l = new Uint32Array(16), u = 0; u < 16; ++u)
                    l[u] = e[64 * c + 4 * u] << 24 | e[64 * c + 4 * u + 1] << 16 | e[64 * c + 4 * u + 2] << 8 | e[64 * c + 4 * u + 3];
                s[c] = l
            }
            s[r - 1][14] = 8 * (e.length - 1) / Math.pow(2, 32),
            s[r - 1][14] = Math.floor(s[r - 1][14]),
            s[r - 1][15] = 8 * (e.length - 1) & 4294967295;
            for (var d = 0; d < r; ++d) {
                for (var p = new Uint32Array(80), f = 0; f < 16; ++f)
                    p[f] = s[d][f];
                for (var h = 16; h < 80; ++h)
                    p[h] = T(p[h - 3] ^ p[h - 8] ^ p[h - 14] ^ p[h - 16], 1);
                for (var m = n[0], b = n[1], k = n[2], v = n[3], g = n[4], y = 0; y < 80; ++y) {
                    var E = Math.floor(y / 20)
                      , C = T(m, 5) + S(E, b, k, v) + g + t[E] + p[y] >>> 0;
                    g = v,
                    v = k,
                    k = T(b, 30) >>> 0,
                    b = m,
                    m = C
                }
                n[0] = n[0] + m >>> 0,
                n[1] = n[1] + b >>> 0,
                n[2] = n[2] + k >>> 0,
                n[3] = n[3] + v >>> 0,
                n[4] = n[4] + g >>> 0
            }
            return [n[0] >> 24 & 255, n[0] >> 16 & 255, n[0] >> 8 & 255, 255 & n[0], n[1] >> 24 & 255, n[1] >> 16 & 255, n[1] >> 8 & 255, 255 & n[1], n[2] >> 24 & 255, n[2] >> 16 & 255, n[2] >> 8 & 255, 255 & n[2], n[3] >> 24 & 255, n[3] >> 16 & 255, n[3] >> 8 & 255, 255 & n[3], n[4] >> 24 & 255, n[4] >> 16 & 255, n[4] >> 8 & 255, 255 & n[4]]
        }
        ))
          , D = "00000000-0000-0000-0000-000000000000";
        var I = function(e) {
            if (!s(e))
                throw TypeError("Invalid UUID");
            return parseInt(e.substr(14, 1), 16)
        }
    }
    ])
}
));
//# sourceMappingURL=shortbread.js.map
