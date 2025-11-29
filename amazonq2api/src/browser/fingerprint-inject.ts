import { BrowserFingerprint } from "./profile.js";

/**
 * 生成注入到浏览器页面的指纹伪装脚本
 * 这个脚本会在页面加载前注入，修改各种浏览器 API 返回值
 */
export function generateFingerprintScript(fp: BrowserFingerprint): string {
    return `
(function() {
    'use strict';
    
    const fp = ${JSON.stringify(fp)};
    
    // ================ Navigator 属性伪装 ================
    
    // 删除 webdriver 标记
    Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
        configurable: true
    });
    
    // 伪装 platform
    Object.defineProperty(navigator, 'platform', {
        get: () => fp.platform,
        configurable: true
    });
    
    // 伪装 vendor
    Object.defineProperty(navigator, 'vendor', {
        get: () => fp.vendor,
        configurable: true
    });
    
    // 伪装语言
    Object.defineProperty(navigator, 'language', {
        get: () => fp.language,
        configurable: true
    });
    
    Object.defineProperty(navigator, 'languages', {
        get: () => Object.freeze([...fp.languages]),
        configurable: true
    });
    
    // 伪装硬件信息
    Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => fp.hardwareConcurrency,
        configurable: true
    });
    
    Object.defineProperty(navigator, 'deviceMemory', {
        get: () => fp.deviceMemory,
        configurable: true
    });
    
    Object.defineProperty(navigator, 'maxTouchPoints', {
        get: () => fp.maxTouchPoints,
        configurable: true
    });
    
    // 伪装 plugins（空数组，Chrome 无头模式特征）
    Object.defineProperty(navigator, 'plugins', {
        get: () => {
            const plugins = [];
            plugins.length = 5;
            return plugins;
        },
        configurable: true
    });
    
    // ================ 屏幕属性伪装 ================
    
    Object.defineProperty(screen, 'width', {
        get: () => fp.screenWidth,
        configurable: true
    });
    
    Object.defineProperty(screen, 'height', {
        get: () => fp.screenHeight,
        configurable: true
    });
    
    Object.defineProperty(screen, 'availWidth', {
        get: () => fp.availWidth,
        configurable: true
    });
    
    Object.defineProperty(screen, 'availHeight', {
        get: () => fp.availHeight,
        configurable: true
    });
    
    Object.defineProperty(screen, 'colorDepth', {
        get: () => fp.colorDepth,
        configurable: true
    });
    
    Object.defineProperty(screen, 'pixelDepth', {
        get: () => fp.pixelDepth,
        configurable: true
    });
    
    Object.defineProperty(window, 'devicePixelRatio', {
        get: () => fp.devicePixelRatio,
        configurable: true
    });
    
    // ================ 时区伪装 ================
    
    const originalDateGetTimezoneOffset = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = function() {
        return fp.timezoneOffset;
    };
    
    const originalIntlDateTimeFormat = Intl.DateTimeFormat;
    Intl.DateTimeFormat = function(locales, options) {
        options = options || {};
        if (!options.timeZone) {
            options.timeZone = fp.timezone;
        }
        return new originalIntlDateTimeFormat(locales, options);
    };
    Intl.DateTimeFormat.prototype = originalIntlDateTimeFormat.prototype;
    Intl.DateTimeFormat.supportedLocalesOf = originalIntlDateTimeFormat.supportedLocalesOf;
    
    // ================ Canvas 指纹噪声注入 ================
    
    const canvasNoise = (function() {
        let seed = fp.canvasNoiseSeed;
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return (seed / 233280) - 0.5;
        };
    })();
    
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function(type, quality) {
        const context = this.getContext('2d');
        if (context) {
            const imageData = context.getImageData(0, 0, this.width, this.height);
            const data = imageData.data;
            // 添加微小噪声
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.max(0, Math.min(255, data[i] + Math.floor(canvasNoise() * 2)));
            }
            context.putImageData(imageData, 0, 0);
        }
        return originalToDataURL.call(this, type, quality);
    };
    
    const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function(sx, sy, sw, sh) {
        const imageData = originalGetImageData.call(this, sx, sy, sw, sh);
        const data = imageData.data;
        // 添加微小噪声
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.max(0, Math.min(255, data[i] + Math.floor(canvasNoise() * 2)));
        }
        return imageData;
    };
    
    // ================ WebGL 指纹伪装 ================
    
    const getParameterProxyHandler = {
        apply: function(target, thisArg, argumentsList) {
            const param = argumentsList[0];
            const gl = thisArg;
            
            // UNMASKED_VENDOR_WEBGL
            if (param === 37445) {
                return fp.webglVendor;
            }
            // UNMASKED_RENDERER_WEBGL
            if (param === 37446) {
                return fp.webglRenderer;
            }
            
            return Reflect.apply(target, thisArg, argumentsList);
        }
    };
    
    // 拦截 WebGL getParameter
    const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = new Proxy(originalGetParameter, getParameterProxyHandler);
    
    if (typeof WebGL2RenderingContext !== 'undefined') {
        const originalGetParameter2 = WebGL2RenderingContext.prototype.getParameter;
        WebGL2RenderingContext.prototype.getParameter = new Proxy(originalGetParameter2, getParameterProxyHandler);
    }
    
    // ================ AudioContext 指纹噪声注入 ================
    
    const audioNoise = (function() {
        let seed = fp.audioNoiseSeed;
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return (seed / 233280) * 0.0001;
        };
    })();
    
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const AudioContextClass = typeof AudioContext !== 'undefined' ? AudioContext : webkitAudioContext;
        const originalCreateAnalyser = AudioContextClass.prototype.createAnalyser;
        
        AudioContextClass.prototype.createAnalyser = function() {
            const analyser = originalCreateAnalyser.call(this);
            const originalGetFloatFrequencyData = analyser.getFloatFrequencyData;
            
            analyser.getFloatFrequencyData = function(array) {
                originalGetFloatFrequencyData.call(this, array);
                for (let i = 0; i < array.length; i++) {
                    array[i] = array[i] + audioNoise();
                }
            };
            
            return analyser;
        };
    }
    
    // ================ 禁用自动化检测 ================
    
    // 删除 Chrome DevTools 检测
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Array;
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Promise;
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol;
    
    // 删除 Playwright/Puppeteer 特征
    delete window.__playwright;
    delete window.__PW_inspect;
    
    // 覆盖 permissions API
    const originalQuery = navigator.permissions?.query;
    if (originalQuery) {
        navigator.permissions.query = function(parameters) {
            return parameters.name === 'notifications'
                ? Promise.resolve({ state: Notification.permission })
                : originalQuery.call(this, parameters);
        };
    }
    
    // ================ Chrome 特性伪装 ================
    
    // 添加 chrome 对象（如果不存在）
    if (!window.chrome) {
        window.chrome = {
            runtime: {},
            loadTimes: function() { return {}; },
            csi: function() { return {}; },
            app: {
                isInstalled: false
            }
        };
    }
    
    // ================ 完成 ================
    console.debug('[Fingerprint] Profile injected successfully');
})();
`;
}

/**
 * 生成隐藏 Playwright 特征的脚本（更激进的反检测）
 */
export function generateStealthScript(): string {
    return `
(function() {
    'use strict';
    
    // 覆盖 Reflect.ownKeys，隐藏注入的属性
    const originalOwnKeys = Reflect.ownKeys;
    Reflect.ownKeys = function(target) {
        const keys = originalOwnKeys(target);
        // 过滤掉可能暴露自动化的属性
        return keys.filter(key => {
            if (typeof key === 'string') {
                return !key.includes('cdc_') && 
                       !key.includes('__playwright') &&
                       !key.includes('__PW_');
            }
            return true;
        });
    };
    
    // 修复 toString 检测
    const originalFunctionToString = Function.prototype.toString;
    Function.prototype.toString = function() {
        if (this === navigator.permissions?.query) {
            return 'function query() { [native code] }';
        }
        if (this === Date.prototype.getTimezoneOffset) {
            return 'function getTimezoneOffset() { [native code] }';
        }
        return originalFunctionToString.call(this);
    };
    
    // 隐藏 iframe 检测
    Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
        get: function() {
            const contentWindow = Object.getOwnPropertyDescriptor(
                HTMLIFrameElement.prototype, 'contentWindow'
            ).get.call(this);
            if (contentWindow) {
                try {
                    contentWindow.chrome = window.chrome;
                } catch (e) {
                    // 跨域 iframe 忽略
                }
            }
            return contentWindow;
        }
    });
    
    console.debug('[Stealth] Anti-detection scripts loaded');
})();
`;
}

