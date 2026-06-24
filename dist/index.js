"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // bin/live-reload.js
  var currentScript, liveReloadOrigin;
  var init_live_reload = __esm({
    "bin/live-reload.js"() {
      "use strict";
      currentScript = document.currentScript instanceof HTMLScriptElement ? document.currentScript : null;
      liveReloadOrigin = currentScript?.src ? new URL(currentScript.src).origin : "http://localhost:3000";
      new EventSource(`${liveReloadOrigin}/esbuild`).addEventListener("change", () => location.reload());
    }
  });

  // node_modules/.pnpm/@rive-app+webgl2@2.38.1/node_modules/@rive-app/webgl2/rive.js
  var require_rive = __commonJS({
    "node_modules/.pnpm/@rive-app+webgl2@2.38.1/node_modules/@rive-app/webgl2/rive.js"(exports, module) {
      init_live_reload();
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["rive"] = factory();
        else
          root["rive"] = factory();
      })(exports, () => {
        return (
          /******/
          (() => {
            "use strict";
            var __webpack_modules__ = [
              ,
              /* 1 */
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  Animation: () => (
                    /* reexport safe */
                    _Animation__WEBPACK_IMPORTED_MODULE_0__.Animation
                  )
                  /* harmony export */
                });
                var _Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(2);
              },
              /* 2 */
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  Animation: () => (
                    /* binding */
                    Animation
                  )
                  /* harmony export */
                });
                var Animation = (
                  /** @class */
                  function() {
                    function Animation2(animation, artboard, runtime, playing) {
                      this.animation = animation;
                      this.artboard = artboard;
                      this.playing = playing;
                      this.loopCount = 0;
                      this.scrubTo = null;
                      this.instance = new runtime.LinearAnimationInstance(animation, artboard);
                    }
                    Object.defineProperty(Animation2.prototype, "name", {
                      /**
                       * Returns the animation's name
                       */
                      get: function() {
                        return this.animation.name;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Animation2.prototype, "time", {
                      /**
                       * Returns the animation's name
                       */
                      get: function() {
                        return this.instance.time;
                      },
                      /**
                       * Sets the animation's current time
                       */
                      set: function(value) {
                        this.instance.time = value;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Animation2.prototype, "loopValue", {
                      /**
                       * Returns the animation's loop type
                       */
                      get: function() {
                        return this.animation.loopValue;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(Animation2.prototype, "needsScrub", {
                      /**
                       * Indicates whether the animation needs to be scrubbed.
                       * @returns `true` if the animation needs to be scrubbed, `false` otherwise.
                       */
                      get: function() {
                        return this.scrubTo !== null;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Animation2.prototype.advance = function(time) {
                      if (this.scrubTo === null) {
                        this.instance.advance(time);
                      } else {
                        this.instance.time = 0;
                        this.instance.advance(this.scrubTo);
                        this.scrubTo = null;
                      }
                    };
                    Animation2.prototype.apply = function(mix) {
                      this.instance.apply(mix);
                    };
                    Animation2.prototype.cleanup = function() {
                      this.instance.delete();
                    };
                    return Animation2;
                  }()
                );
              },
              /* 3 */
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  RuntimeLoader: () => (
                    /* binding */
                    RuntimeLoader
                  )
                  /* harmony export */
                });
                var _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(4);
                var package_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(5);
                var __assign = function() {
                  __assign = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                      s = arguments[i];
                      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                    }
                    return t;
                  };
                  return __assign.apply(this, arguments);
                };
                var RuntimeLoader = (
                  /** @class */
                  function() {
                    function RuntimeLoader2() {
                    }
                    RuntimeLoader2.notifyError = function(error) {
                      var _a;
                      RuntimeLoader2.isLoading = false;
                      while (RuntimeLoader2.errorCallbackQueue.length > 0) {
                        (_a = RuntimeLoader2.errorCallbackQueue.shift()) === null || _a === void 0 ? void 0 : _a(error);
                      }
                      RuntimeLoader2.callBackQueue = [];
                    };
                    RuntimeLoader2.loadRuntime = function() {
                      var attemptedUrl = RuntimeLoader2.wasmURL;
                      var wasmBinary = RuntimeLoader2.wasmBinary;
                      if (RuntimeLoader2.enablePerfMarks)
                        performance.mark("rive:wasm-init:start");
                      _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__["default"](__assign({
                        // Loads Wasm bundle
                        locateFile: function() {
                          return attemptedUrl;
                        }
                      }, wasmBinary ? { wasmBinary } : {})).then(function(rive) {
                        var _a;
                        if (RuntimeLoader2.enablePerfMarks) {
                          performance.mark("rive:wasm-init:end");
                          performance.measure("rive:wasm-init", "rive:wasm-init:start", "rive:wasm-init:end");
                        }
                        RuntimeLoader2.runtime = rive;
                        RuntimeLoader2.errorCallbackQueue = [];
                        while (RuntimeLoader2.callBackQueue.length > 0) {
                          (_a = RuntimeLoader2.callBackQueue.shift()) === null || _a === void 0 ? void 0 : _a(RuntimeLoader2.runtime);
                        }
                      }).catch(function(error) {
                        var errorDetails = {
                          message: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error",
                          type: (error === null || error === void 0 ? void 0 : error.name) || "Error",
                          // Some browsers may provide additional WebAssembly-specific details
                          wasmError: error instanceof WebAssembly.CompileError || error instanceof WebAssembly.RuntimeError,
                          originalError: error
                        };
                        console.debug("Rive WASM load error details:", errorDetails);
                        var fallbackUrl = RuntimeLoader2.wasmFallbackURL;
                        var alreadyOnFallback = fallbackUrl !== null && attemptedUrl.toLowerCase() === fallbackUrl.toLowerCase();
                        if (fallbackUrl !== null && !alreadyOnFallback) {
                          console.warn("Failed to load WASM from ".concat(attemptedUrl, " (").concat(errorDetails.message, "), trying fallback URL: ").concat(fallbackUrl));
                          RuntimeLoader2.wasmBinary = null;
                          RuntimeLoader2.setWasmUrl(fallbackUrl);
                          RuntimeLoader2.loadRuntime();
                        } else {
                          var triedUrls = alreadyOnFallback ? "the configured WASM URL or its fallback (".concat(fallbackUrl, ")") : attemptedUrl;
                          var errorMessage = [
                            "Could not load Rive WASM file from ".concat(triedUrls, "."),
                            "Possible reasons:",
                            "- Network connection is down",
                            "- WebAssembly is not supported in this environment",
                            "- The WASM file is corrupted or incompatible",
                            "\nError details:",
                            "- Type: ".concat(errorDetails.type),
                            "- Message: ".concat(errorDetails.message),
                            "- WebAssembly-specific error: ".concat(errorDetails.wasmError),
                            "\nTo resolve, you may need to:",
                            "1. Check your network connection",
                            "2. Set a new WASM source via RuntimeLoader.setWasmUrl()",
                            "3. Call RuntimeLoader.awaitInstance() again"
                          ].join("\n");
                          console.error(errorMessage);
                          RuntimeLoader2.notifyError(new Error(errorMessage));
                        }
                      });
                    };
                    RuntimeLoader2.getInstance = function(callback, onError) {
                      if (!RuntimeLoader2.isLoading) {
                        RuntimeLoader2.isLoading = true;
                        RuntimeLoader2.loadRuntime();
                      }
                      if (!RuntimeLoader2.runtime) {
                        RuntimeLoader2.callBackQueue.push(callback);
                        if (onError) {
                          RuntimeLoader2.errorCallbackQueue.push(onError);
                        }
                      } else {
                        callback(RuntimeLoader2.runtime);
                      }
                    };
                    RuntimeLoader2.awaitInstance = function() {
                      return new Promise(function(resolve, reject) {
                        return RuntimeLoader2.getInstance(resolve, reject);
                      });
                    };
                    RuntimeLoader2.setWasmUrl = function(url) {
                      RuntimeLoader2.wasmURL = url;
                    };
                    RuntimeLoader2.getWasmUrl = function() {
                      return RuntimeLoader2.wasmURL;
                    };
                    RuntimeLoader2.setWasmFallbackUrl = function(url) {
                      RuntimeLoader2.wasmFallbackURL = url;
                    };
                    RuntimeLoader2.getWasmFallbackUrl = function() {
                      return RuntimeLoader2.wasmFallbackURL;
                    };
                    RuntimeLoader2.setWasmBinary = function(value) {
                      if (value instanceof ArrayBuffer || value === null) {
                        RuntimeLoader2.wasmBinary = value;
                        return;
                      }
                      console.error("setWasmBinary expects an ArrayBuffer or null");
                    };
                    RuntimeLoader2.getWasmBinary = function() {
                      return RuntimeLoader2.wasmBinary;
                    };
                    RuntimeLoader2.isLoading = false;
                    RuntimeLoader2.callBackQueue = [];
                    RuntimeLoader2.wasmURL = "https://unpkg.com/".concat(package_json__WEBPACK_IMPORTED_MODULE_1__.name, "@").concat(package_json__WEBPACK_IMPORTED_MODULE_1__.version, "/rive.wasm");
                    RuntimeLoader2.wasmFallbackURL = "https://cdn.jsdelivr.net/npm/".concat(package_json__WEBPACK_IMPORTED_MODULE_1__.name, "@").concat(package_json__WEBPACK_IMPORTED_MODULE_1__.version, "/rive_fallback.wasm");
                    RuntimeLoader2.wasmBinary = null;
                    RuntimeLoader2.errorCallbackQueue = [];
                    RuntimeLoader2.enablePerfMarks = false;
                    return RuntimeLoader2;
                  }()
                );
              },
              /* 4 */
              /***/
              (__unused_webpack___webpack_module__, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  "default": () => __WEBPACK_DEFAULT_EXPORT__
                  /* harmony export */
                });
                var Rive2 = (() => {
                  var _scriptName = typeof document != "undefined" ? document.currentScript?.src : void 0;
                  return function(moduleArg = {}) {
                    var moduleRtn;
                    var l = moduleArg, aa, ba, ca = new Promise((a, b) => {
                      aa = a;
                      ba = b;
                    }), da = "object" == typeof window, ea = "function" == typeof importScripts;
                    function fa() {
                      function a(g) {
                        const k = d;
                        c = b = 0;
                        d = /* @__PURE__ */ new Map();
                        k.forEach((n) => {
                          try {
                            n(g);
                          } catch (m) {
                            console.error(m);
                          }
                        });
                        this.mb();
                        e && e.Nb();
                      }
                      let b = 0, c = 0, d = /* @__PURE__ */ new Map(), e = null, f = null;
                      this.requestAnimationFrame = function(g) {
                        b ||= requestAnimationFrame(a.bind(this));
                        const k = ++c;
                        d.set(k, g);
                        return k;
                      };
                      this.cancelAnimationFrame = function(g) {
                        d.delete(g);
                        b && 0 == d.size && (cancelAnimationFrame(b), b = 0);
                      };
                      this.Lb = function(g) {
                        f && (document.body.remove(f), f = null);
                        g || (f = document.createElement("div"), f.style.backgroundColor = "black", f.style.position = "fixed", f.style.right = 0, f.style.top = 0, f.style.color = "white", f.style.padding = "4px", f.innerHTML = "RIVE FPS", g = function(k) {
                          f.innerHTML = "RIVE FPS " + k.toFixed(1);
                        }, document.body.appendChild(f));
                        e = new function() {
                          let k = 0, n = 0;
                          this.Nb = function() {
                            var m = performance.now();
                            n ? (++k, m -= n, 1e3 < m && (g(1e3 * k / m), k = n = 0)) : (n = m, k = 0);
                          };
                        }();
                      };
                      this.mb = function() {
                      };
                    }
                    function ha() {
                      console.assert(true);
                      const a = /* @__PURE__ */ new Map();
                      let b = -Infinity;
                      this.push = function(c) {
                        c = c + 255 >> 8;
                        a.has(c) && clearTimeout(a.get(c));
                        a.set(c, setTimeout(function() {
                          a.delete(c);
                          0 == a.length ? b = -Infinity : c == b && (b = Math.max(...a.keys()), console.assert(b < c));
                        }, 1e3));
                        b = Math.max(c, b);
                        return b << 8;
                      };
                    }
                    const ia = l.onRuntimeInitialized;
                    l.onRuntimeInitialized = function() {
                      ia && ia();
                      let a = l.decodeAudio;
                      l.decodeAudio = function(f, g) {
                        f = a(f);
                        g(f);
                      };
                      let b = l.decodeFont;
                      l.decodeFont = function(f, g) {
                        f = b(f);
                        g(f);
                      };
                      let c = l.setFallbackFontCb;
                      l.setFallbackFontCallback = "function" === typeof c ? function(f) {
                        c(f);
                      } : function() {
                        console.warn("Module.setFallbackFontCallback called, but text support is not enabled in this build.");
                      };
                      const d = l.FileAssetLoader;
                      l.ptrToAsset = (f) => {
                        let g = l.ptrToFileAsset(f);
                        return g.isImage ? l.ptrToImageAsset(f) : g.isFont ? l.ptrToFontAsset(f) : g.isAudio ? l.ptrToAudioAsset(f) : g;
                      };
                      l.CustomFileAssetLoader = d.extend("CustomFileAssetLoader", { __construct: function({ loadContents: f }) {
                        this.__parent.__construct.call(this);
                        this.Bb = f;
                      }, loadContents: function(f, g) {
                        f = l.ptrToAsset(f);
                        return this.Bb(f, g);
                      } });
                      l.CDNFileAssetLoader = d.extend("CDNFileAssetLoader", { __construct: function() {
                        this.__parent.__construct.call(this);
                      }, loadContents: function(f) {
                        let g = l.ptrToAsset(f);
                        f = g.cdnUuid;
                        if ("" === f) {
                          return false;
                        }
                        (function(k, n) {
                          var m = new XMLHttpRequest();
                          m.responseType = "arraybuffer";
                          m.onreadystatechange = function() {
                            4 == m.readyState && 200 == m.status && n(m);
                          };
                          m.open("GET", k, true);
                          m.send(null);
                        })(g.cdnBaseUrl + "/" + f, (k) => {
                          g.decode(new Uint8Array(k.response));
                        });
                        return true;
                      } });
                      l.FallbackFileAssetLoader = d.extend("FallbackFileAssetLoader", { __construct: function() {
                        this.__parent.__construct.call(this);
                        this.ib = [];
                      }, addLoader: function(f) {
                        this.ib.push(f);
                      }, loadContents: function(f, g) {
                        for (let k of this.ib) {
                          if (k.loadContents(f, g)) {
                            return true;
                          }
                        }
                        return false;
                      } });
                      let e = l.computeAlignment;
                      l.computeAlignment = function(f, g, k, n, m = 1) {
                        return e.call(this, f, g, k, n, m);
                      };
                    };
                    const ja = l.onRuntimeInitialized;
                    l.onRuntimeInitialized = function() {
                      function a(r) {
                        this.G = r;
                        this.Ab = r.getContext("2d");
                        this.Eb = d;
                        this.S = [];
                        this.ka = 0;
                        this.clear = function() {
                          console.assert(0 == this.ka);
                          this.S = [];
                          e.delete(this);
                        };
                        this.save = function() {
                          ++this.ka;
                          this.S.push(d.save.bind(d));
                        };
                        this.restore = function() {
                          0 < this.ka && (this.S.push(d.restore.bind(d)), --this.ka);
                        };
                        this.transform = function(u) {
                          this.S.push(d.transform.bind(d, u));
                        };
                        this.align = function(u, z, A, C, H = 1) {
                          this.S.push(d.align.bind(d, u, z, A, C, H));
                        };
                        this.flush = function() {
                          console.assert(0 == this.ka);
                          e.add(this);
                          d.Ya || c();
                        };
                        this["delete"] = function() {
                        };
                      }
                      function b(r, u = false) {
                        var z = { alpha: true, depth: u, stencil: u, antialias: u, premultipliedAlpha: true, preserveDrawingBuffer: 0, powerPreference: "high-performance", failIfMajorPerformanceCaveat: 0, enableExtensionsByDefault: false, explicitSwapControl: 0, renderViaOffscreenBackBuffer: 0 };
                        u = r.getContext("webgl2", z);
                        if (!u) {
                          return null;
                        }
                        z = ka(u, z);
                        la(z);
                        const A = f(r.width, r.height);
                        A.ja = z;
                        A.G = r;
                        A.Na = r.width;
                        A.Za = r.height;
                        A.T = u;
                        var C = A.delete;
                        A.delete = function() {
                          this.ja && la(this.ja);
                          C.call(this);
                          var H = this.ja;
                          q === w[H] && (q = null);
                          "object" == typeof JSEvents && JSEvents.Qc(w[H].F.canvas);
                          w[H] && w[H].F.canvas && (w[H].F.canvas.zb = void 0);
                          this.ja = this.G = this.Na = this.T = w[H] = null;
                        };
                        return A;
                      }
                      function c() {
                        if (d) {
                          var r = d.Db, u = 0, z = 0, A = 0, C = Array(e.size), H = 0;
                          for (var J of e) {
                            J.ea = Math.min(J.G.width, r), J.da = Math.min(J.G.height, r), J.La = J.da * J.ea, u = Math.max(u, J.ea), z = Math.max(z, J.da), A += J.La, C[H++] = J;
                          }
                          e.clear();
                          if (!(0 >= A)) {
                            u = 1 << (0 >= u ? 0 : 32 - Math.clz32(u - 1));
                            for (z = 1 << (0 >= z ? 0 : 32 - Math.clz32(z - 1)); z * u < A; ) {
                              u <= z ? u *= 2 : z *= 2;
                            }
                            u = Math.min(u, r);
                            u = Math.min(z, r);
                            C.sort((Z, ob) => ob.La - Z.La);
                            A = new l.DynamicRectanizer(r);
                            for (J = 0; J < C.length; ) {
                              A.reset(u, z);
                              for (H = J; H < C.length; ++H) {
                                var K = C[H], I = A.addRect(K.ea, K.da);
                                if (0 > I) {
                                  console.assert(H > J);
                                  break;
                                }
                                K.qa = I & 65535;
                                K.ra = I >> 16;
                              }
                              K = n.push(A.drawWidth());
                              I = m.push(A.drawHeight());
                              console.assert(K >= A.drawWidth());
                              console.assert(I >= A.drawHeight());
                              console.assert(K <= r);
                              console.assert(I <= r);
                              d.G.width != K && (d.G.width = K);
                              d.G.height != I && (d.G.height = I);
                              d.clear();
                              for (K = J; K < H; ++K) {
                                I = C[K];
                                d.saveClipRect(I.qa, I.ra, I.qa + I.ea, I.ra + I.da);
                                let Z = new l.Mat2D();
                                Z.xx = I.ea / I.G.width;
                                Z.yy = I.da / I.G.height;
                                Z.xy = Z.yx = 0;
                                Z.tx = I.qa;
                                Z.ty = I.ra;
                                d.transform(Z);
                                for (const ob of I.S) {
                                  ob();
                                }
                                d.restoreClipRect();
                                I.S = [];
                              }
                              for (d.flush(); J < H; ++J) {
                                K = C[J], I = K.Ab, I.globalCompositeOperation = "copy", I.drawImage(d.G, K.qa, K.ra, K.ea, K.da, 0, 0, K.G.width, K.G.height);
                              }
                              J = H;
                            }
                          }
                        }
                      }
                      ja && ja();
                      let d = null;
                      const e = /* @__PURE__ */ new Set(), f = l.makeRenderer;
                      l.makeRenderer = function(r, u) {
                        if (!d) {
                          let z = function(A) {
                            var C = document.createElement("canvas");
                            C.width = 1;
                            C.height = 1;
                            d = b(C, A);
                            if (!d) {
                              return null;
                            }
                            d.Ya = !!d.T.getExtension("WEBGL_shader_pixel_local_storage");
                            d.Db = Math.min(d.T.getParameter(d.T.MAX_RENDERBUFFER_SIZE), d.T.getParameter(d.T.MAX_TEXTURE_SIZE));
                            d.Ma = !d.Ya;
                            if (A = d.T.getExtension("WEBGL_debug_renderer_info")) {
                              C = d.T.getParameter(A.UNMASKED_RENDERER_WEBGL), d.T.getParameter(A.UNMASKED_VENDOR_WEBGL).includes("Google") && C.includes("ANGLE Metal Renderer") && (d.Ma = false);
                            }
                            return d;
                          };
                          d = z(true);
                          if (!d) {
                            throw "Unable to create WebGL context, your environment may not support WebGL. Try out @rive-app/canvas as an alternative.";
                          }
                          d.Ma || (d = z(false));
                        }
                        return u ? new a(r) : b(r, d.Ma);
                      };
                      const g = l.Artboard.prototype["delete"];
                      l.Artboard.prototype["delete"] = function() {
                        this.Fb = true;
                        g.call(this);
                      };
                      const k = l.Artboard.prototype.draw;
                      l.Artboard.prototype.draw = function(r) {
                        r.S ? r.S.push(() => {
                          this.Fb || k.call(this, r.Eb);
                        }) : k.call(this, r);
                      };
                      const n = new ha(), m = new ha(), t = new fa();
                      l.requestAnimationFrame = t.requestAnimationFrame.bind(t);
                      l.cancelAnimationFrame = t.cancelAnimationFrame.bind(t);
                      l.enableFPSCounter = t.Lb.bind(t);
                      t.mb = c;
                      l.resolveAnimationFrame = c;
                      let v = l.load;
                      l.load = function(r, u, z = true) {
                        const A = new l.FallbackFileAssetLoader();
                        void 0 !== u && A.addLoader(u);
                        z && (u = new l.CDNFileAssetLoader(), A.addLoader(u));
                        return Promise.resolve(v(r, A));
                      };
                      const x = l.WebGL2Renderer.prototype.clear;
                      l.WebGL2Renderer.prototype.clear = function() {
                        la(this.ja);
                        const r = this.G;
                        if (this.Na != r.width || this.Za != r.height) {
                          this.resize(r.width, r.height), this.Na = r.width, this.Za = r.height;
                        }
                        x.call(this);
                      };
                      l.decodeImage = function(r, u) {
                        r = l.decodeWebGL2Image(r);
                        u(r);
                      };
                      let p = l.Renderer.prototype.align;
                      l.Renderer.prototype.align = function(r, u, z, A, C = 1) {
                        p.call(this, r, u, z, A, C);
                      };
                    };
                    var ma = Object.assign({}, l), na = "./this.program", y = "", oa, pa;
                    if (da || ea) {
                      ea ? y = self.location.href : "undefined" != typeof document && document.currentScript && (y = document.currentScript.src), _scriptName && (y = _scriptName), y.startsWith("blob:") ? y = "" : y = y.substr(0, y.replace(/[?#].*/, "").lastIndexOf("/") + 1), ea && (pa = (a) => {
                        var b = new XMLHttpRequest();
                        b.open("GET", a, false);
                        b.responseType = "arraybuffer";
                        b.send(null);
                        return new Uint8Array(b.response);
                      }), oa = (a, b, c) => {
                        if (qa(a)) {
                          var d = new XMLHttpRequest();
                          d.open("GET", a, true);
                          d.responseType = "arraybuffer";
                          d.onload = () => {
                            200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
                          };
                          d.onerror = c;
                          d.send(null);
                        } else {
                          fetch(a, { credentials: "same-origin" }).then((e) => e.ok ? e.arrayBuffer() : Promise.reject(Error(e.status + " : " + e.url))).then(b, c);
                        }
                      };
                    }
                    var ra = l.print || console.log.bind(console), sa = l.printErr || console.error.bind(console);
                    Object.assign(l, ma);
                    ma = null;
                    l.thisProgram && (na = l.thisProgram);
                    var ta;
                    l.wasmBinary && (ta = l.wasmBinary);
                    var ua, va = false, B, D, E, wa, F, G, xa, ya;
                    function za() {
                      var a = ua.buffer;
                      l.HEAP8 = B = new Int8Array(a);
                      l.HEAP16 = E = new Int16Array(a);
                      l.HEAPU8 = D = new Uint8Array(a);
                      l.HEAPU16 = wa = new Uint16Array(a);
                      l.HEAP32 = F = new Int32Array(a);
                      l.HEAPU32 = G = new Uint32Array(a);
                      l.HEAPF32 = xa = new Float32Array(a);
                      l.HEAPF64 = ya = new Float64Array(a);
                    }
                    var Aa = [], Ba = [], Ca = [];
                    function Da() {
                      var a = l.preRun.shift();
                      Aa.unshift(a);
                    }
                    var Ea = 0, Fa = null, Ga = null;
                    function Ha(a) {
                      l.onAbort?.(a);
                      a = "Aborted(" + a + ")";
                      sa(a);
                      va = true;
                      a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
                      ba(a);
                      throw a;
                    }
                    var Ia = (a) => a.startsWith("data:application/octet-stream;base64,"), qa = (a) => a.startsWith("file://"), Ja;
                    function Ka(a) {
                      if (a == Ja && ta) {
                        return new Uint8Array(ta);
                      }
                      if (pa) {
                        return pa(a);
                      }
                      throw "both async and sync fetching of the wasm failed";
                    }
                    function La(a) {
                      return ta ? Promise.resolve().then(() => Ka(a)) : new Promise((b, c) => {
                        oa(a, (d) => b(new Uint8Array(d)), () => {
                          try {
                            b(Ka(a));
                          } catch (d) {
                            c(d);
                          }
                        });
                      });
                    }
                    function Ma(a, b, c) {
                      return La(a).then((d) => WebAssembly.instantiate(d, b)).then(c, (d) => {
                        sa(`failed to asynchronously prepare wasm: ${d}`);
                        Ha(d);
                      });
                    }
                    function Na(a, b) {
                      var c = Ja;
                      return ta || "function" != typeof WebAssembly.instantiateStreaming || Ia(c) || qa(c) || "function" != typeof fetch ? Ma(c, a, b) : fetch(c, { credentials: "same-origin" }).then((d) => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
                        sa(`wasm streaming compile failed: ${e}`);
                        sa("falling back to ArrayBuffer instantiation");
                        return Ma(c, a, b);
                      }));
                    }
                    var Oa, Pa, Ta = { 570840: (a, b, c, d, e) => {
                      if ("undefined" === typeof window || void 0 === (window.AudioContext || window.webkitAudioContext)) {
                        return 0;
                      }
                      if ("undefined" === typeof window.h) {
                        window.h = { Ga: 0 };
                        window.h.I = {};
                        window.h.I.Da = a;
                        window.h.I.capture = b;
                        window.h.I.Pa = c;
                        window.h.ha = {};
                        window.h.ha.stopped = d;
                        window.h.ha.ub = e;
                        let f = window.h;
                        f.C = [];
                        f.mc = function(g) {
                          for (var k = 0; k < f.C.length; ++k) {
                            if (null == f.C[k]) {
                              return f.C[k] = g, k;
                            }
                          }
                          f.C.push(g);
                          return f.C.length - 1;
                        };
                        f.yb = function(g) {
                          for (f.C[g] = null; 0 < f.C.length; ) {
                            if (null == f.C[f.C.length - 1]) {
                              f.C.pop();
                            } else {
                              break;
                            }
                          }
                        };
                        f.Tc = function(g) {
                          for (var k = 0; k < f.C.length; ++k) {
                            if (f.C[k] == g) {
                              return f.yb(k);
                            }
                          }
                        };
                        f.ua = function(g) {
                          return f.C[g];
                        };
                        f.Xa = ["touchend", "click"];
                        f.unlock = function() {
                          for (var g = 0; g < f.C.length; ++g) {
                            var k = f.C[g];
                            null != k && null != k.K && k.state === f.ha.ub && k.K.resume().then(() => {
                              Qa(k.nb);
                            }, (n) => {
                              console.error("Failed to resume audiocontext", n);
                            });
                          }
                          f.Xa.map(function(n) {
                            document.removeEventListener(n, f.unlock, true);
                          });
                        };
                        f.Xa.map(function(g) {
                          document.addEventListener(g, f.unlock, true);
                        });
                      }
                      window.h.Ga += 1;
                      return 1;
                    }, 573018: () => {
                      "undefined" !== typeof window.h && (window.h.Xa.map(function(a) {
                        document.removeEventListener(a, window.h.unlock, true);
                      }), --window.h.Ga, 0 === window.h.Ga && delete window.h);
                    }, 573322: () => void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia, 573426: () => {
                      try {
                        var a = new (window.AudioContext || window.webkitAudioContext)(), b = a.sampleRate;
                        a.close();
                        return b;
                      } catch (c) {
                        return 0;
                      }
                    }, 573597: (a, b, c, d, e, f) => {
                      if ("undefined" === typeof window.h) {
                        return -1;
                      }
                      var g = {}, k = {};
                      a == window.h.I.Da && 0 != c && (k.sampleRate = c);
                      g.K = new (window.AudioContext || window.webkitAudioContext)(k);
                      g.K.suspend();
                      g.state = window.h.ha.stopped;
                      c = 0;
                      a != window.h.I.Da && (c = b);
                      g.Y = g.K.createScriptProcessor(d, c, b);
                      g.Y.onaudioprocess = function(n) {
                        if (null == g.va || 0 == g.va.length) {
                          g.va = new Float32Array(xa.buffer, e, d * b);
                        }
                        if (a == window.h.I.capture || a == window.h.I.Pa) {
                          for (var m = 0; m < b; m += 1) {
                            for (var t = n.inputBuffer.getChannelData(m), v = g.va, x = 0; x < d; x += 1) {
                              v[x * b + m] = t[x];
                            }
                          }
                          Ra(f, d, e);
                        }
                        if (a == window.h.I.Da || a == window.h.I.Pa) {
                          for (Sa(f, d, e), m = 0; m < n.outputBuffer.numberOfChannels; ++m) {
                            for (t = n.outputBuffer.getChannelData(m), v = g.va, x = 0; x < d; x += 1) {
                              t[x] = v[x * b + m];
                            }
                          }
                        } else {
                          for (m = 0; m < n.outputBuffer.numberOfChannels; ++m) {
                            n.outputBuffer.getChannelData(m).fill(0);
                          }
                        }
                      };
                      a != window.h.I.capture && a != window.h.I.Pa || navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function(n) {
                        g.Ha = g.K.createMediaStreamSource(n);
                        g.Ha.connect(g.Y);
                        g.Y.connect(g.K.destination);
                      }).catch(function(n) {
                        console.log("Failed to get user media: " + n);
                      });
                      a == window.h.I.Da && g.Y.connect(g.K.destination);
                      g.nb = f;
                      return window.h.mc(g);
                    }, 576474: (a) => window.h.ua(a).K.sampleRate, 576547: (a) => {
                      a = window.h.ua(a);
                      void 0 !== a.Y && (a.Y.onaudioprocess = function() {
                      }, a.Y.disconnect(), a.Y = void 0);
                      void 0 !== a.Ha && (a.Ha.disconnect(), a.Ha = void 0);
                      a.K.close();
                      a.K = void 0;
                      a.nb = void 0;
                    }, 576947: (a) => {
                      window.h.yb(a);
                    }, 576997: (a) => {
                      a = window.h.ua(a);
                      a.K.resume();
                      a.state = window.h.ha.ub;
                    }, 577136: (a) => {
                      a = window.h.ua(a);
                      a.K.suspend();
                      a.state = window.h.ha.stopped;
                    } }, Ua = (a) => {
                      for (; 0 < a.length; ) {
                        a.shift()(l);
                      }
                    };
                    function Va() {
                      var a = F[+Wa >> 2];
                      Wa += 4;
                      return a;
                    }
                    var Xa = (a, b) => {
                      for (var c = 0, d = a.length - 1; 0 <= d; d--) {
                        var e = a[d];
                        "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
                      }
                      if (b) {
                        for (; c; c--) {
                          a.unshift("..");
                        }
                      }
                      return a;
                    }, Ya = (a) => {
                      var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
                      (a = Xa(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
                      a && c && (a += "/");
                      return (b ? "/" : "") + a;
                    }, Za = (a) => {
                      var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
                      a = b[0];
                      b = b[1];
                      if (!a && !b) {
                        return ".";
                      }
                      b &&= b.substr(0, b.length - 1);
                      return a + b;
                    }, $a = (a) => {
                      if ("/" === a) {
                        return "/";
                      }
                      a = Ya(a);
                      a = a.replace(/\/$/, "");
                      var b = a.lastIndexOf("/");
                      return -1 === b ? a : a.substr(b + 1);
                    }, ab = () => {
                      if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
                        return (a) => crypto.getRandomValues(a);
                      }
                      Ha("initRandomDevice");
                    }, bb = (a) => (bb = ab())(a), cb = (...a) => {
                      for (var b = "", c = false, d = a.length - 1; -1 <= d && !c; d--) {
                        c = 0 <= d ? a[d] : "/";
                        if ("string" != typeof c) {
                          throw new TypeError("Arguments to path.resolve must be strings");
                        }
                        if (!c) {
                          return "";
                        }
                        b = c + "/" + b;
                        c = "/" === c.charAt(0);
                      }
                      b = Xa(b.split("/").filter((e) => !!e), !c).join("/");
                      return (c ? "/" : "") + b || ".";
                    }, db = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, L = (a, b, c) => {
                      var d = b + c;
                      for (c = b; a[c] && !(c >= d); ) {
                        ++c;
                      }
                      if (16 < c - b && a.buffer && db) {
                        return db.decode(a.subarray(b, c));
                      }
                      for (d = ""; b < c; ) {
                        var e = a[b++];
                        if (e & 128) {
                          var f = a[b++] & 63;
                          if (192 == (e & 224)) {
                            d += String.fromCharCode((e & 31) << 6 | f);
                          } else {
                            var g = a[b++] & 63;
                            e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
                            65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
                          }
                        } else {
                          d += String.fromCharCode(e);
                        }
                      }
                      return d;
                    }, eb = [], fb = (a) => {
                      for (var b = 0, c = 0; c < a.length; ++c) {
                        var d = a.charCodeAt(c);
                        127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
                      }
                      return b;
                    }, gb = (a, b, c, d) => {
                      if (!(0 < d)) {
                        return 0;
                      }
                      var e = c;
                      d = c + d - 1;
                      for (var f = 0; f < a.length; ++f) {
                        var g = a.charCodeAt(f);
                        if (55296 <= g && 57343 >= g) {
                          var k = a.charCodeAt(++f);
                          g = 65536 + ((g & 1023) << 10) | k & 1023;
                        }
                        if (127 >= g) {
                          if (c >= d) {
                            break;
                          }
                          b[c++] = g;
                        } else {
                          if (2047 >= g) {
                            if (c + 1 >= d) {
                              break;
                            }
                            b[c++] = 192 | g >> 6;
                          } else {
                            if (65535 >= g) {
                              if (c + 2 >= d) {
                                break;
                              }
                              b[c++] = 224 | g >> 12;
                            } else {
                              if (c + 3 >= d) {
                                break;
                              }
                              b[c++] = 240 | g >> 18;
                              b[c++] = 128 | g >> 12 & 63;
                            }
                            b[c++] = 128 | g >> 6 & 63;
                          }
                          b[c++] = 128 | g & 63;
                        }
                      }
                      b[c] = 0;
                      return c - e;
                    };
                    function hb(a, b) {
                      var c = Array(fb(a) + 1);
                      a = gb(a, c, 0, c.length);
                      b && (c.length = a);
                      return c;
                    }
                    var ib = [];
                    function jb(a, b) {
                      ib[a] = { input: [], H: [], V: b };
                      kb(a, lb);
                    }
                    var lb = { open(a) {
                      var b = ib[a.node.Fa];
                      if (!b) {
                        throw new M(43);
                      }
                      a.s = b;
                      a.seekable = false;
                    }, close(a) {
                      a.s.V.ta(a.s);
                    }, ta(a) {
                      a.s.V.ta(a.s);
                    }, read(a, b, c, d) {
                      if (!a.s || !a.s.V.hb) {
                        throw new M(60);
                      }
                      for (var e = 0, f = 0; f < d; f++) {
                        try {
                          var g = a.s.V.hb(a.s);
                        } catch (k) {
                          throw new M(29);
                        }
                        if (void 0 === g && 0 === e) {
                          throw new M(6);
                        }
                        if (null === g || void 0 === g) {
                          break;
                        }
                        e++;
                        b[c + f] = g;
                      }
                      e && (a.node.timestamp = Date.now());
                      return e;
                    }, write(a, b, c, d) {
                      if (!a.s || !a.s.V.Sa) {
                        throw new M(60);
                      }
                      try {
                        for (var e = 0; e < d; e++) {
                          a.s.V.Sa(a.s, b[c + e]);
                        }
                      } catch (f) {
                        throw new M(29);
                      }
                      d && (a.node.timestamp = Date.now());
                      return e;
                    } }, mb = { hb() {
                      a: {
                        if (!eb.length) {
                          var a = null;
                          "undefined" != typeof window && "function" == typeof window.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
                          if (!a) {
                            a = null;
                            break a;
                          }
                          eb = hb(a, true);
                        }
                        a = eb.shift();
                      }
                      return a;
                    }, Sa(a, b) {
                      null === b || 10 === b ? (ra(L(a.H, 0)), a.H = []) : 0 != b && a.H.push(b);
                    }, ta(a) {
                      a.H && 0 < a.H.length && (ra(L(a.H, 0)), a.H = []);
                    }, Wb() {
                      return { xc: 25856, zc: 5, wc: 191, yc: 35387, vc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
                    }, Xb() {
                      return 0;
                    }, Yb() {
                      return [24, 80];
                    } }, nb = { Sa(a, b) {
                      null === b || 10 === b ? (sa(L(a.H, 0)), a.H = []) : 0 != b && a.H.push(b);
                    }, ta(a) {
                      a.H && 0 < a.H.length && (sa(L(a.H, 0)), a.H = []);
                    } };
                    function pb(a, b) {
                      var c = a.l ? a.l.length : 0;
                      c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.l, a.l = new Uint8Array(b), 0 < a.v && a.l.set(c.subarray(0, a.v), 0));
                    }
                    var N = { N: null, U() {
                      return N.createNode(null, "/", 16895, 0);
                    }, createNode(a, b, c, d) {
                      if (24576 === (c & 61440) || 4096 === (c & 61440)) {
                        throw new M(63);
                      }
                      N.N || (N.N = { dir: { node: { X: N.j.X, P: N.j.P, la: N.j.la, Ba: N.j.Ba, sb: N.j.sb, xb: N.j.xb, tb: N.j.tb, rb: N.j.rb, Ia: N.j.Ia }, stream: { aa: N.m.aa } }, file: { node: { X: N.j.X, P: N.j.P }, stream: { aa: N.m.aa, read: N.m.read, write: N.m.write, $a: N.m.$a, jb: N.m.jb, lb: N.m.lb } }, link: { node: { X: N.j.X, P: N.j.P, ma: N.j.ma }, stream: {} }, ab: { node: { X: N.j.X, P: N.j.P }, stream: qb } });
                      c = rb(a, b, c, d);
                      16384 === (c.mode & 61440) ? (c.j = N.N.dir.node, c.m = N.N.dir.stream, c.l = {}) : 32768 === (c.mode & 61440) ? (c.j = N.N.file.node, c.m = N.N.file.stream, c.v = 0, c.l = null) : 40960 === (c.mode & 61440) ? (c.j = N.N.link.node, c.m = N.N.link.stream) : 8192 === (c.mode & 61440) && (c.j = N.N.ab.node, c.m = N.N.ab.stream);
                      c.timestamp = Date.now();
                      a && (a.l[b] = c, a.timestamp = c.timestamp);
                      return c;
                    }, Fc(a) {
                      return a.l ? a.l.subarray ? a.l.subarray(0, a.v) : new Uint8Array(a.l) : new Uint8Array(0);
                    }, j: { X(a) {
                      var b = {};
                      b.Cc = 8192 === (a.mode & 61440) ? a.id : 1;
                      b.Hc = a.id;
                      b.mode = a.mode;
                      b.Nc = 1;
                      b.uid = 0;
                      b.Gc = 0;
                      b.Fa = a.Fa;
                      16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.v : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
                      b.tc = new Date(a.timestamp);
                      b.Mc = new Date(a.timestamp);
                      b.Ac = new Date(a.timestamp);
                      b.Gb = 4096;
                      b.uc = Math.ceil(b.size / b.Gb);
                      return b;
                    }, P(a, b) {
                      void 0 !== b.mode && (a.mode = b.mode);
                      void 0 !== b.timestamp && (a.timestamp = b.timestamp);
                      if (void 0 !== b.size && (b = b.size, a.v != b)) {
                        if (0 == b) {
                          a.l = null, a.v = 0;
                        } else {
                          var c = a.l;
                          a.l = new Uint8Array(b);
                          c && a.l.set(c.subarray(0, Math.min(b, a.v)));
                          a.v = b;
                        }
                      }
                    }, la() {
                      throw sb[44];
                    }, Ba(a, b, c, d) {
                      return N.createNode(a, b, c, d);
                    }, sb(a, b, c) {
                      if (16384 === (a.mode & 61440)) {
                        try {
                          var d = tb(b, c);
                        } catch (f) {
                        }
                        if (d) {
                          for (var e in d.l) {
                            throw new M(55);
                          }
                        }
                      }
                      delete a.parent.l[a.name];
                      a.parent.timestamp = Date.now();
                      a.name = c;
                      b.l[c] = a;
                      b.timestamp = a.parent.timestamp;
                    }, xb(a, b) {
                      delete a.l[b];
                      a.timestamp = Date.now();
                    }, tb(a, b) {
                      var c = tb(a, b), d;
                      for (d in c.l) {
                        throw new M(55);
                      }
                      delete a.l[b];
                      a.timestamp = Date.now();
                    }, rb(a) {
                      var b = [".", ".."], c;
                      for (c of Object.keys(a.l)) {
                        b.push(c);
                      }
                      return b;
                    }, Ia(a, b, c) {
                      a = N.createNode(a, b, 41471, 0);
                      a.link = c;
                      return a;
                    }, ma(a) {
                      if (40960 !== (a.mode & 61440)) {
                        throw new M(28);
                      }
                      return a.link;
                    } }, m: { read(a, b, c, d, e) {
                      var f = a.node.l;
                      if (e >= a.node.v) {
                        return 0;
                      }
                      a = Math.min(a.node.v - e, d);
                      if (8 < a && f.subarray) {
                        b.set(f.subarray(e, e + a), c);
                      } else {
                        for (d = 0; d < a; d++) {
                          b[c + d] = f[e + d];
                        }
                      }
                      return a;
                    }, write(a, b, c, d, e, f) {
                      b.buffer === B.buffer && (f = false);
                      if (!d) {
                        return 0;
                      }
                      a = a.node;
                      a.timestamp = Date.now();
                      if (b.subarray && (!a.l || a.l.subarray)) {
                        if (f) {
                          return a.l = b.subarray(c, c + d), a.v = d;
                        }
                        if (0 === a.v && 0 === e) {
                          return a.l = b.slice(c, c + d), a.v = d;
                        }
                        if (e + d <= a.v) {
                          return a.l.set(b.subarray(c, c + d), e), d;
                        }
                      }
                      pb(a, e + d);
                      if (a.l.subarray && b.subarray) {
                        a.l.set(b.subarray(c, c + d), e);
                      } else {
                        for (f = 0; f < d; f++) {
                          a.l[e + f] = b[c + f];
                        }
                      }
                      a.v = Math.max(a.v, e + d);
                      return d;
                    }, aa(a, b, c) {
                      1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.v);
                      if (0 > b) {
                        throw new M(28);
                      }
                      return b;
                    }, $a(a, b, c) {
                      pb(a.node, b + c);
                      a.node.v = Math.max(a.node.v, b + c);
                    }, jb(a, b, c, d, e) {
                      if (32768 !== (a.node.mode & 61440)) {
                        throw new M(43);
                      }
                      a = a.node.l;
                      if (e & 2 || a.buffer !== B.buffer) {
                        if (0 < c || c + b < a.length) {
                          a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
                        }
                        c = true;
                        Ha();
                        b = void 0;
                        if (!b) {
                          throw new M(48);
                        }
                        B.set(a, b);
                      } else {
                        c = false, b = a.byteOffset;
                      }
                      return { o: b, sc: c };
                    }, lb(a, b, c, d) {
                      N.m.write(a, b, 0, d, c, false);
                      return 0;
                    } } }, ub = (a, b) => {
                      var c = 0;
                      a && (c |= 365);
                      b && (c |= 146);
                      return c;
                    }, vb = null, wb = {}, xb = [], yb = 1, zb = null, Ab = true, M = class {
                      constructor(a) {
                        this.name = "ErrnoError";
                        this.$ = a;
                      }
                    }, sb = {}, Bb = class {
                      constructor() {
                        this.h = {};
                        this.node = null;
                      }
                      get flags() {
                        return this.h.flags;
                      }
                      set flags(a) {
                        this.h.flags = a;
                      }
                      get position() {
                        return this.h.position;
                      }
                      set position(a) {
                        this.h.position = a;
                      }
                    }, Cb = class {
                      constructor(a, b, c, d) {
                        a ||= this;
                        this.parent = a;
                        this.U = a.U;
                        this.Ca = null;
                        this.id = yb++;
                        this.name = b;
                        this.mode = c;
                        this.j = {};
                        this.m = {};
                        this.Fa = d;
                      }
                      get read() {
                        return 365 === (this.mode & 365);
                      }
                      set read(a) {
                        a ? this.mode |= 365 : this.mode &= -366;
                      }
                      get write() {
                        return 146 === (this.mode & 146);
                      }
                      set write(a) {
                        a ? this.mode |= 146 : this.mode &= -147;
                      }
                    };
                    function Db(a, b = {}) {
                      a = cb(a);
                      if (!a) {
                        return { path: "", node: null };
                      }
                      b = Object.assign({ gb: true, Ua: 0 }, b);
                      if (8 < b.Ua) {
                        throw new M(32);
                      }
                      a = a.split("/").filter((g) => !!g);
                      for (var c = vb, d = "/", e = 0; e < a.length; e++) {
                        var f = e === a.length - 1;
                        if (f && b.parent) {
                          break;
                        }
                        c = tb(c, a[e]);
                        d = Ya(d + "/" + a[e]);
                        c.Ca && (!f || f && b.gb) && (c = c.Ca.root);
                        if (!f || b.fb) {
                          for (f = 0; 40960 === (c.mode & 61440); ) {
                            if (c = Eb(d), d = cb(Za(d), c), c = Db(d, { Ua: b.Ua + 1 }).node, 40 < f++) {
                              throw new M(32);
                            }
                          }
                        }
                      }
                      return { path: d, node: c };
                    }
                    function Fb(a) {
                      for (var b; ; ) {
                        if (a === a.parent) {
                          return a = a.U.kb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
                        }
                        b = b ? `${a.name}/${b}` : a.name;
                        a = a.parent;
                      }
                    }
                    function Gb(a, b) {
                      for (var c = 0, d = 0; d < b.length; d++) {
                        c = (c << 5) - c + b.charCodeAt(d) | 0;
                      }
                      return (a + c >>> 0) % zb.length;
                    }
                    function tb(a, b) {
                      var c = 16384 === (a.mode & 61440) ? (c = Hb(a, "x")) ? c : a.j.la ? 0 : 2 : 54;
                      if (c) {
                        throw new M(c);
                      }
                      for (c = zb[Gb(a.id, b)]; c; c = c.ac) {
                        var d = c.name;
                        if (c.parent.id === a.id && d === b) {
                          return c;
                        }
                      }
                      return a.j.la(a, b);
                    }
                    function rb(a, b, c, d) {
                      a = new Cb(a, b, c, d);
                      b = Gb(a.parent.id, a.name);
                      a.ac = zb[b];
                      return zb[b] = a;
                    }
                    function Ib(a) {
                      var b = ["r", "w", "rw"][a & 3];
                      a & 512 && (b += "w");
                      return b;
                    }
                    function Hb(a, b) {
                      if (Ab) {
                        return 0;
                      }
                      if (!b.includes("r") || a.mode & 292) {
                        if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
                          return 2;
                        }
                      } else {
                        return 2;
                      }
                      return 0;
                    }
                    function Jb(a, b) {
                      try {
                        return tb(a, b), 20;
                      } catch (c) {
                      }
                      return Hb(a, "wx");
                    }
                    function Kb(a) {
                      a = xb[a];
                      if (!a) {
                        throw new M(8);
                      }
                      return a;
                    }
                    function Lb(a, b = -1) {
                      a = Object.assign(new Bb(), a);
                      if (-1 == b) {
                        a: {
                          for (b = 0; 4096 >= b; b++) {
                            if (!xb[b]) {
                              break a;
                            }
                          }
                          throw new M(33);
                        }
                      }
                      a.W = b;
                      return xb[b] = a;
                    }
                    function Mb(a, b = -1) {
                      a = Lb(a, b);
                      a.m?.Ec?.(a);
                      return a;
                    }
                    var qb = { open(a) {
                      a.m = wb[a.node.Fa].m;
                      a.m.open?.(a);
                    }, aa() {
                      throw new M(70);
                    } };
                    function kb(a, b) {
                      wb[a] = { m: b };
                    }
                    function Nb(a, b) {
                      var c = "/" === b;
                      if (c && vb) {
                        throw new M(10);
                      }
                      if (!c && b) {
                        var d = Db(b, { gb: false });
                        b = d.path;
                        d = d.node;
                        if (d.Ca) {
                          throw new M(10);
                        }
                        if (16384 !== (d.mode & 61440)) {
                          throw new M(54);
                        }
                      }
                      b = { type: a, Pc: {}, kb: b, Zb: [] };
                      a = a.U(b);
                      a.U = b;
                      b.root = a;
                      c ? vb = a : d && (d.Ca = b, d.U && d.U.Zb.push(b));
                    }
                    function Ob(a, b, c) {
                      var d = Db(a, { parent: true }).node;
                      a = $a(a);
                      if (!a || "." === a || ".." === a) {
                        throw new M(28);
                      }
                      var e = Jb(d, a);
                      if (e) {
                        throw new M(e);
                      }
                      if (!d.j.Ba) {
                        throw new M(63);
                      }
                      return d.j.Ba(d, a, b, c);
                    }
                    function Pb(a) {
                      return Ob(a, 16895, 0);
                    }
                    function Qb(a, b, c) {
                      "undefined" == typeof c && (c = b, b = 438);
                      Ob(a, b | 8192, c);
                    }
                    function Rb(a, b) {
                      if (!cb(a)) {
                        throw new M(44);
                      }
                      var c = Db(b, { parent: true }).node;
                      if (!c) {
                        throw new M(44);
                      }
                      b = $a(b);
                      var d = Jb(c, b);
                      if (d) {
                        throw new M(d);
                      }
                      if (!c.j.Ia) {
                        throw new M(63);
                      }
                      c.j.Ia(c, b, a);
                    }
                    function Eb(a) {
                      a = Db(a).node;
                      if (!a) {
                        throw new M(44);
                      }
                      if (!a.j.ma) {
                        throw new M(28);
                      }
                      return cb(Fb(a.parent), a.j.ma(a));
                    }
                    function Sb(a, b, c) {
                      if ("" === a) {
                        throw new M(44);
                      }
                      if ("string" == typeof b) {
                        var d = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
                        if ("undefined" == typeof d) {
                          throw Error(`Unknown file open mode: ${b}`);
                        }
                        b = d;
                      }
                      c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
                      if ("object" == typeof a) {
                        var e = a;
                      } else {
                        a = Ya(a);
                        try {
                          e = Db(a, { fb: !(b & 131072) }).node;
                        } catch (f) {
                        }
                      }
                      d = false;
                      if (b & 64) {
                        if (e) {
                          if (b & 128) {
                            throw new M(20);
                          }
                        } else {
                          e = Ob(a, c, 0), d = true;
                        }
                      }
                      if (!e) {
                        throw new M(44);
                      }
                      8192 === (e.mode & 61440) && (b &= -513);
                      if (b & 65536 && 16384 !== (e.mode & 61440)) {
                        throw new M(54);
                      }
                      if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 === (e.mode & 61440) && ("r" !== Ib(b) || b & 512) ? 31 : Hb(e, Ib(b)) : 44)) {
                        throw new M(c);
                      }
                      if (b & 512 && !d) {
                        c = e;
                        c = "string" == typeof c ? Db(c, { fb: true }).node : c;
                        if (!c.j.P) {
                          throw new M(63);
                        }
                        if (16384 === (c.mode & 61440)) {
                          throw new M(31);
                        }
                        if (32768 !== (c.mode & 61440)) {
                          throw new M(28);
                        }
                        if (d = Hb(c, "w")) {
                          throw new M(d);
                        }
                        c.j.P(c, { size: 0, timestamp: Date.now() });
                      }
                      b &= -131713;
                      e = Lb({ node: e, path: Fb(e), flags: b, seekable: true, position: 0, m: e.m, nc: [], error: false });
                      e.m.open && e.m.open(e);
                      !l.logReadFiles || b & 1 || (Tb ||= {}, a in Tb || (Tb[a] = 1));
                      return e;
                    }
                    function Ub(a, b, c) {
                      if (null === a.W) {
                        throw new M(8);
                      }
                      if (!a.seekable || !a.m.aa) {
                        throw new M(70);
                      }
                      if (0 != c && 1 != c && 2 != c) {
                        throw new M(28);
                      }
                      a.position = a.m.aa(a, b, c);
                      a.nc = [];
                    }
                    var Vb;
                    function Wb(a, b, c) {
                      a = Ya("/dev/" + a);
                      var d = ub(!!b, !!c);
                      Xb ||= 64;
                      var e = Xb++ << 8 | 0;
                      kb(e, { open(f) {
                        f.seekable = false;
                      }, close() {
                        c?.buffer?.length && c(10);
                      }, read(f, g, k, n) {
                        for (var m = 0, t = 0; t < n; t++) {
                          try {
                            var v = b();
                          } catch (x) {
                            throw new M(29);
                          }
                          if (void 0 === v && 0 === m) {
                            throw new M(6);
                          }
                          if (null === v || void 0 === v) {
                            break;
                          }
                          m++;
                          g[k + t] = v;
                        }
                        m && (f.node.timestamp = Date.now());
                        return m;
                      }, write(f, g, k, n) {
                        for (var m = 0; m < n; m++) {
                          try {
                            c(g[k + m]);
                          } catch (t) {
                            throw new M(29);
                          }
                        }
                        n && (f.node.timestamp = Date.now());
                        return m;
                      } });
                      Qb(a, d, e);
                    }
                    var Xb, Yb = {}, Tb, Wa = void 0, Zb = (a, b) => Object.defineProperty(b, "name", { value: a }), $b = [], O = [], P, Q = (a) => {
                      if (!a) {
                        throw new P("Cannot use deleted val. handle = " + a);
                      }
                      return O[a];
                    }, ac = (a) => {
                      switch (a) {
                        case void 0:
                          return 2;
                        case null:
                          return 4;
                        case true:
                          return 6;
                        case false:
                          return 8;
                        default:
                          const b = $b.pop() || O.length;
                          O[b] = a;
                          O[b + 1] = 1;
                          return b;
                      }
                    }, bc = (a) => {
                      var b = Error, c = Zb(a, function(d) {
                        this.name = a;
                        this.message = d;
                        d = Error(d).stack;
                        void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
                      });
                      c.prototype = Object.create(b.prototype);
                      c.prototype.constructor = c;
                      c.prototype.toString = function() {
                        return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
                      };
                      return c;
                    }, cc, dc, R = (a) => {
                      for (var b = ""; D[a]; ) {
                        b += dc[D[a++]];
                      }
                      return b;
                    }, ec = [], fc = () => {
                      for (; ec.length; ) {
                        var a = ec.pop();
                        a.g.ga = false;
                        a["delete"]();
                      }
                    }, gc, hc = {}, ic = (a, b) => {
                      if (void 0 === b) {
                        throw new P("ptr should not be undefined");
                      }
                      for (; a.B; ) {
                        b = a.oa(b), a = a.B;
                      }
                      return b;
                    }, jc = {}, mc = (a) => {
                      a = kc(a);
                      var b = R(a);
                      lc(a);
                      return b;
                    }, nc = (a, b) => {
                      var c = jc[a];
                      if (void 0 === c) {
                        throw a = `${b} has unknown type ${mc(a)}`, new P(a);
                      }
                      return c;
                    }, oc = () => {
                    }, pc = false, qc = (a, b, c) => {
                      if (b === c) {
                        return a;
                      }
                      if (void 0 === c.B) {
                        return null;
                      }
                      a = qc(a, b, c.B);
                      return null === a ? null : c.Jb(a);
                    }, rc = {}, sc = (a, b) => {
                      b = ic(a, b);
                      return hc[b];
                    }, tc, vc = (a, b) => {
                      if (!b.u || !b.o) {
                        throw new tc("makeClassHandle requires ptr and ptrType");
                      }
                      if (!!b.J !== !!b.D) {
                        throw new tc("Both smartPtrType and smartPtr must be specified");
                      }
                      b.count = { value: 1 };
                      return uc(Object.create(a, { g: { value: b, writable: true } }));
                    }, uc = (a) => {
                      if ("undefined" === typeof FinalizationRegistry) {
                        return uc = (b) => b, a;
                      }
                      pc = new FinalizationRegistry((b) => {
                        b = b.g;
                        --b.count.value;
                        0 === b.count.value && (b.D ? b.J.O(b.D) : b.u.i.O(b.o));
                      });
                      uc = (b) => {
                        var c = b.g;
                        c.D && pc.register(b, { g: c }, b);
                        return b;
                      };
                      oc = (b) => {
                        pc.unregister(b);
                      };
                      return uc(a);
                    }, wc = {}, xc = (a) => {
                      for (; a.length; ) {
                        var b = a.pop();
                        a.pop()(b);
                      }
                    };
                    function yc(a) {
                      return this.fromWireType(G[a >> 2]);
                    }
                    var zc = {}, Ac = {}, T = (a, b, c) => {
                      function d(k) {
                        k = c(k);
                        if (k.length !== a.length) {
                          throw new tc("Mismatched type converter count");
                        }
                        for (var n = 0; n < a.length; ++n) {
                          S(a[n], k[n]);
                        }
                      }
                      a.forEach(function(k) {
                        Ac[k] = b;
                      });
                      var e = Array(b.length), f = [], g = 0;
                      b.forEach((k, n) => {
                        jc.hasOwnProperty(k) ? e[n] = jc[k] : (f.push(k), zc.hasOwnProperty(k) || (zc[k] = []), zc[k].push(() => {
                          e[n] = jc[k];
                          ++g;
                          g === f.length && d(e);
                        }));
                      });
                      0 === f.length && d(e);
                    };
                    function Bc(a, b, c = {}) {
                      var d = b.name;
                      if (!a) {
                        throw new P(`type "${d}" must have a positive integer typeid pointer`);
                      }
                      if (jc.hasOwnProperty(a)) {
                        if (c.Tb) {
                          return;
                        }
                        throw new P(`Cannot register type '${d}' twice`);
                      }
                      jc[a] = b;
                      delete Ac[a];
                      zc.hasOwnProperty(a) && (b = zc[a], delete zc[a], b.forEach((e) => e()));
                    }
                    function S(a, b, c = {}) {
                      if (!("argPackAdvance" in b)) {
                        throw new TypeError("registerType registeredInstance requires argPackAdvance");
                      }
                      return Bc(a, b, c);
                    }
                    var Cc = (a) => {
                      throw new P(a.g.u.i.name + " instance already deleted");
                    };
                    function Dc() {
                    }
                    var Ec = (a, b, c) => {
                      if (void 0 === a[b].A) {
                        var d = a[b];
                        a[b] = function(...e) {
                          if (!a[b].A.hasOwnProperty(e.length)) {
                            throw new P(`Function '${c}' called with an invalid number of arguments (${e.length}) - expects one of (${a[b].A})!`);
                          }
                          return a[b].A[e.length].apply(this, e);
                        };
                        a[b].A = [];
                        a[b].A[d.fa] = d;
                      }
                    }, Fc = (a, b, c) => {
                      if (l.hasOwnProperty(a)) {
                        if (void 0 === c || void 0 !== l[a].A && void 0 !== l[a].A[c]) {
                          throw new P(`Cannot register public name '${a}' twice`);
                        }
                        Ec(l, a, a);
                        if (l.hasOwnProperty(c)) {
                          throw new P(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
                        }
                        l[a].A[c] = b;
                      } else {
                        l[a] = b, void 0 !== c && (l[a].Oc = c);
                      }
                    }, Gc = (a) => {
                      if (void 0 === a) {
                        return "_unknown";
                      }
                      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
                      var b = a.charCodeAt(0);
                      return 48 <= b && 57 >= b ? `_${a}` : a;
                    };
                    function Hc(a, b, c, d, e, f, g, k) {
                      this.name = a;
                      this.constructor = b;
                      this.M = c;
                      this.O = d;
                      this.B = e;
                      this.Ob = f;
                      this.oa = g;
                      this.Jb = k;
                      this.ob = [];
                    }
                    var Ic = (a, b, c) => {
                      for (; b !== c; ) {
                        if (!b.oa) {
                          throw new P(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
                        }
                        a = b.oa(a);
                        b = b.B;
                      }
                      return a;
                    };
                    function Jc(a, b) {
                      if (null === b) {
                        if (this.Ra) {
                          throw new P(`null is not a valid ${this.name}`);
                        }
                        return 0;
                      }
                      if (!b.g) {
                        throw new P(`Cannot pass "${Kc(b)}" as a ${this.name}`);
                      }
                      if (!b.g.o) {
                        throw new P(`Cannot pass deleted object as a pointer of type ${this.name}`);
                      }
                      return Ic(b.g.o, b.g.u.i, this.i);
                    }
                    function Lc(a, b) {
                      if (null === b) {
                        if (this.Ra) {
                          throw new P(`null is not a valid ${this.name}`);
                        }
                        if (this.xa) {
                          var c = this.Ta();
                          null !== a && a.push(this.O, c);
                          return c;
                        }
                        return 0;
                      }
                      if (!b || !b.g) {
                        throw new P(`Cannot pass "${Kc(b)}" as a ${this.name}`);
                      }
                      if (!b.g.o) {
                        throw new P(`Cannot pass deleted object as a pointer of type ${this.name}`);
                      }
                      if (!this.wa && b.g.u.wa) {
                        throw new P(`Cannot convert argument of type ${b.g.J ? b.g.J.name : b.g.u.name} to parameter type ${this.name}`);
                      }
                      c = Ic(b.g.o, b.g.u.i, this.i);
                      if (this.xa) {
                        if (void 0 === b.g.D) {
                          throw new P("Passing raw pointer to smart pointer is illegal");
                        }
                        switch (this.hc) {
                          case 0:
                            if (b.g.J === this) {
                              c = b.g.D;
                            } else {
                              throw new P(`Cannot convert argument of type ${b.g.J ? b.g.J.name : b.g.u.name} to parameter type ${this.name}`);
                            }
                            break;
                          case 1:
                            c = b.g.D;
                            break;
                          case 2:
                            if (b.g.J === this) {
                              c = b.g.D;
                            } else {
                              var d = b.clone();
                              c = this.cc(c, ac(() => d["delete"]()));
                              null !== a && a.push(this.O, c);
                            }
                            break;
                          default:
                            throw new P("Unsupporting sharing policy");
                        }
                      }
                      return c;
                    }
                    function Mc(a, b) {
                      if (null === b) {
                        if (this.Ra) {
                          throw new P(`null is not a valid ${this.name}`);
                        }
                        return 0;
                      }
                      if (!b.g) {
                        throw new P(`Cannot pass "${Kc(b)}" as a ${this.name}`);
                      }
                      if (!b.g.o) {
                        throw new P(`Cannot pass deleted object as a pointer of type ${this.name}`);
                      }
                      if (b.g.u.wa) {
                        throw new P(`Cannot convert argument of type ${b.g.u.name} to parameter type ${this.name}`);
                      }
                      return Ic(b.g.o, b.g.u.i, this.i);
                    }
                    function Nc(a, b, c, d, e, f, g, k, n, m, t) {
                      this.name = a;
                      this.i = b;
                      this.Ra = c;
                      this.wa = d;
                      this.xa = e;
                      this.bc = f;
                      this.hc = g;
                      this.qb = k;
                      this.Ta = n;
                      this.cc = m;
                      this.O = t;
                      e || void 0 !== b.B ? this.toWireType = Lc : (this.toWireType = d ? Jc : Mc, this.L = null);
                    }
                    var Oc = (a, b, c) => {
                      if (!l.hasOwnProperty(a)) {
                        throw new tc("Replacing nonexistent public symbol");
                      }
                      void 0 !== l[a].A && void 0 !== c ? l[a].A[c] = b : (l[a] = b, l[a].fa = c);
                    }, Pc = [], Qc, Rc = (a) => {
                      var b = Pc[a];
                      b || (a >= Pc.length && (Pc.length = a + 1), Pc[a] = b = Qc.get(a));
                      return b;
                    }, Sc = (a, b, c = []) => {
                      a.includes("j") ? (a = a.replace(/p/g, "i"), b = (0, l["dynCall_" + a])(b, ...c)) : b = Rc(b)(...c);
                      return b;
                    }, Tc = (a, b) => (...c) => Sc(a, b, c), U = (a, b) => {
                      a = R(a);
                      var c = a.includes("j") ? Tc(a, b) : Rc(b);
                      if ("function" != typeof c) {
                        throw new P(`unknown function pointer with signature ${a}: ${b}`);
                      }
                      return c;
                    }, Uc, Vc = (a, b) => {
                      function c(f) {
                        e[f] || jc[f] || (Ac[f] ? Ac[f].forEach(c) : (d.push(f), e[f] = true));
                      }
                      var d = [], e = {};
                      b.forEach(c);
                      throw new Uc(`${a}: ` + d.map(mc).join([", "]));
                    };
                    function Wc(a) {
                      for (var b = 1; b < a.length; ++b) {
                        if (null !== a[b] && void 0 === a[b].L) {
                          return true;
                        }
                      }
                      return false;
                    }
                    function Xc(a, b, c, d, e) {
                      var f = b.length;
                      if (2 > f) {
                        throw new P("argTypes array size mismatch! Must at least get return value and 'this' types!");
                      }
                      var g = null !== b[1] && null !== c, k = Wc(b), n = "void" !== b[0].name, m = f - 2, t = Array(m), v = [], x = [];
                      return Zb(a, function(...p) {
                        if (p.length !== m) {
                          throw new P(`function ${a} called with ${p.length} arguments, expected ${m}`);
                        }
                        x.length = 0;
                        v.length = g ? 2 : 1;
                        v[0] = e;
                        if (g) {
                          var r = b[1].toWireType(x, this);
                          v[1] = r;
                        }
                        for (var u = 0; u < m; ++u) {
                          t[u] = b[u + 2].toWireType(x, p[u]), v.push(t[u]);
                        }
                        p = d(...v);
                        if (k) {
                          xc(x);
                        } else {
                          for (u = g ? 1 : 2; u < b.length; u++) {
                            var z = 1 === u ? r : t[u - 2];
                            null !== b[u].L && b[u].L(z);
                          }
                        }
                        r = n ? b[0].fromWireType(p) : void 0;
                        return r;
                      });
                    }
                    var Yc = (a, b) => {
                      for (var c = [], d = 0; d < a; d++) {
                        c.push(G[b + 4 * d >> 2]);
                      }
                      return c;
                    }, Zc = (a) => {
                      a = a.trim();
                      const b = a.indexOf("(");
                      return -1 !== b ? a.substr(0, b) : a;
                    }, $c = (a, b, c) => {
                      if (!(a instanceof Object)) {
                        throw new P(`${c} with invalid "this": ${a}`);
                      }
                      if (!(a instanceof b.i.constructor)) {
                        throw new P(`${c} incompatible with "this" of type ${a.constructor.name}`);
                      }
                      if (!a.g.o) {
                        throw new P(`cannot call emscripten binding method ${c} on deleted object`);
                      }
                      return Ic(a.g.o, a.g.u.i, b.i);
                    }, ad = (a) => {
                      9 < a && 0 === --O[a + 1] && (O[a] = void 0, $b.push(a));
                    }, bd = { name: "emscripten::val", fromWireType: (a) => {
                      var b = Q(a);
                      ad(a);
                      return b;
                    }, toWireType: (a, b) => ac(b), argPackAdvance: 8, readValueFromPointer: yc, L: null }, cd = (a, b, c) => {
                      switch (b) {
                        case 1:
                          return c ? function(d) {
                            return this.fromWireType(B[d]);
                          } : function(d) {
                            return this.fromWireType(D[d]);
                          };
                        case 2:
                          return c ? function(d) {
                            return this.fromWireType(E[d >> 1]);
                          } : function(d) {
                            return this.fromWireType(wa[d >> 1]);
                          };
                        case 4:
                          return c ? function(d) {
                            return this.fromWireType(F[d >> 2]);
                          } : function(d) {
                            return this.fromWireType(G[d >> 2]);
                          };
                        default:
                          throw new TypeError(`invalid integer width (${b}): ${a}`);
                      }
                    }, Kc = (a) => {
                      if (null === a) {
                        return "null";
                      }
                      var b = typeof a;
                      return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
                    }, dd = (a, b) => {
                      switch (b) {
                        case 4:
                          return function(c) {
                            return this.fromWireType(xa[c >> 2]);
                          };
                        case 8:
                          return function(c) {
                            return this.fromWireType(ya[c >> 3]);
                          };
                        default:
                          throw new TypeError(`invalid float width (${b}): ${a}`);
                      }
                    }, ed = (a, b, c) => {
                      switch (b) {
                        case 1:
                          return c ? (d) => B[d] : (d) => D[d];
                        case 2:
                          return c ? (d) => E[d >> 1] : (d) => wa[d >> 1];
                        case 4:
                          return c ? (d) => F[d >> 2] : (d) => G[d >> 2];
                        default:
                          throw new TypeError(`invalid integer width (${b}): ${a}`);
                      }
                    }, fd = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, gd = (a, b) => {
                      var c = a >> 1;
                      for (var d = c + b / 2; !(c >= d) && wa[c]; ) {
                        ++c;
                      }
                      c <<= 1;
                      if (32 < c - a && fd) {
                        return fd.decode(D.subarray(a, c));
                      }
                      c = "";
                      for (d = 0; !(d >= b / 2); ++d) {
                        var e = E[a + 2 * d >> 1];
                        if (0 == e) {
                          break;
                        }
                        c += String.fromCharCode(e);
                      }
                      return c;
                    }, hd = (a, b, c) => {
                      c ??= 2147483647;
                      if (2 > c) {
                        return 0;
                      }
                      c -= 2;
                      var d = b;
                      c = c < 2 * a.length ? c / 2 : a.length;
                      for (var e = 0; e < c; ++e) {
                        E[b >> 1] = a.charCodeAt(e), b += 2;
                      }
                      E[b >> 1] = 0;
                      return b - d;
                    }, jd = (a) => 2 * a.length, kd = (a, b) => {
                      for (var c = 0, d = ""; !(c >= b / 4); ) {
                        var e = F[a + 4 * c >> 2];
                        if (0 == e) {
                          break;
                        }
                        ++c;
                        65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
                      }
                      return d;
                    }, ld = (a, b, c) => {
                      c ??= 2147483647;
                      if (4 > c) {
                        return 0;
                      }
                      var d = b;
                      c = d + c - 4;
                      for (var e = 0; e < a.length; ++e) {
                        var f = a.charCodeAt(e);
                        if (55296 <= f && 57343 >= f) {
                          var g = a.charCodeAt(++e);
                          f = 65536 + ((f & 1023) << 10) | g & 1023;
                        }
                        F[b >> 2] = f;
                        b += 4;
                        if (b + 4 > c) {
                          break;
                        }
                      }
                      F[b >> 2] = 0;
                      return b - d;
                    }, md = (a) => {
                      for (var b = 0, c = 0; c < a.length; ++c) {
                        var d = a.charCodeAt(c);
                        55296 <= d && 57343 >= d && ++c;
                        b += 4;
                      }
                      return b;
                    }, nd = (a, b, c) => {
                      var d = [];
                      a = a.toWireType(d, c);
                      d.length && (G[b >> 2] = ac(d));
                      return a;
                    }, od = [], pd = {}, qd = (a) => {
                      var b = pd[a];
                      return void 0 === b ? R(a) : b;
                    }, rd = (a) => {
                      var b = od.length;
                      od.push(a);
                      return b;
                    }, sd = (a, b) => {
                      for (var c = Array(a), d = 0; d < a; ++d) {
                        c[d] = nc(G[b + 4 * d >> 2], "parameter " + d);
                      }
                      return c;
                    }, td = Reflect.construct, ud = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400), vd = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], wd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], xd = [], yd = (a) => {
                      a.Dc = a.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
                    }, zd = (a) => {
                      a.Lc = a.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
                    }, Ad = (a) => {
                      var b = "EXT_color_buffer_float EXT_conservative_depth EXT_disjoint_timer_query_webgl2 EXT_texture_norm16 NV_shader_noperspective_interpolation WEBGL_clip_cull_distance EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw".split(" ");
                      return (a.getSupportedExtensions() || []).filter((c) => b.includes(c));
                    }, Bd = 1, Cd = [], V = [], Dd = [], Ed = [], Fd = [], Gd = [], Hd = [], w = [], Id = {}, Jd = 4, Kd = 0, Ld = (a) => {
                      for (var b = Bd++, c = a.length; c < b; c++) {
                        a[c] = null;
                      }
                      return b;
                    }, Md = (a, b, c, d) => {
                      for (var e = 0; e < a; e++) {
                        var f = W[c](), g = f && Ld(d);
                        f ? (f.name = g, d[g] = f) : X ||= 1282;
                        F[b + 4 * e >> 2] = g;
                      }
                    }, ka = (a, b) => {
                      var c = Ld(w), d = { handle: c, attributes: b, version: b.Kc, F: a };
                      a.canvas && (a.canvas.zb = d);
                      w[c] = d;
                      ("undefined" == typeof b.Kb || b.Kb) && Nd(d);
                      return c;
                    }, la = (a) => {
                      q = w[a];
                      l.Bc = W = q?.F;
                      return !(a && !W);
                    }, Nd = (a) => {
                      a ||= q;
                      if (!a.Ub) {
                        a.Ub = true;
                        var b = a.F;
                        yd(b);
                        zd(b);
                        2 <= a.version && (b.cb = b.getExtension("EXT_disjoint_timer_query_webgl2"));
                        if (2 > a.version || !b.cb) {
                          b.cb = b.getExtension("EXT_disjoint_timer_query");
                        }
                        b.$b = b.getExtension("WEBGL_multi_draw");
                        Ad(b).forEach((c) => {
                          c.includes("lose_context") || c.includes("debug") || b.getExtension(c);
                        });
                      }
                    }, X, q, Od = {}, Qd = () => {
                      if (!Pd) {
                        var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: na || "./this.program" }, b;
                        for (b in Od) {
                          void 0 === Od[b] ? delete a[b] : a[b] = Od[b];
                        }
                        var c = [];
                        for (b in a) {
                          c.push(`${b}=${a[b]}`);
                        }
                        Pd = c;
                      }
                      return Pd;
                    }, Pd, Rd = [];
                    function Sd() {
                      var a = Ad(W);
                      return a = a.concat(a.map((b) => "GL_" + b));
                    }
                    var Td = (a, b) => {
                      if (b) {
                        var c = void 0;
                        switch (a) {
                          case 36346:
                            c = 1;
                            break;
                          case 36344:
                            return;
                          case 34814:
                          case 36345:
                            c = 0;
                            break;
                          case 34466:
                            var d = W.getParameter(34467);
                            c = d ? d.length : 0;
                            break;
                          case 33309:
                            if (2 > q.version) {
                              X ||= 1282;
                              return;
                            }
                            c = Sd().length;
                            break;
                          case 33307:
                          case 33308:
                            if (2 > q.version) {
                              X ||= 1280;
                              return;
                            }
                            c = 33307 == a ? 3 : 0;
                        }
                        if (void 0 === c) {
                          switch (d = W.getParameter(a), typeof d) {
                            case "number":
                              c = d;
                              break;
                            case "boolean":
                              c = d ? 1 : 0;
                              break;
                            case "string":
                              X ||= 1280;
                              return;
                            case "object":
                              if (null === d) {
                                switch (a) {
                                  case 34964:
                                  case 35725:
                                  case 34965:
                                  case 36006:
                                  case 36007:
                                  case 32873:
                                  case 34229:
                                  case 36662:
                                  case 36663:
                                  case 35053:
                                  case 35055:
                                  case 36010:
                                  case 35097:
                                  case 35869:
                                  case 32874:
                                  case 36389:
                                  case 35983:
                                  case 35368:
                                  case 34068:
                                    c = 0;
                                    break;
                                  default:
                                    X ||= 1280;
                                    return;
                                }
                              } else {
                                if (d instanceof Float32Array || d instanceof Uint32Array || d instanceof Int32Array || d instanceof Array) {
                                  for (a = 0; a < d.length; ++a) {
                                    F[b + 4 * a >> 2] = d[a];
                                  }
                                  return;
                                }
                                try {
                                  c = d.name | 0;
                                } catch (e) {
                                  X ||= 1280;
                                  sa(`GL_INVALID_ENUM in glGet${0}v: Unknown object returned from WebGL getParameter(${a})! (error: ${e})`);
                                  return;
                                }
                              }
                              break;
                            default:
                              X ||= 1280;
                              sa(`GL_INVALID_ENUM in glGet${0}v: Native code calling glGet${0}v(${a}) and it returns ${d} of type ${typeof d}!`);
                              return;
                          }
                        }
                        F[b >> 2] = c;
                      } else {
                        X ||= 1281;
                      }
                    }, Vd = (a) => {
                      var b = fb(a) + 1, c = Ud(b);
                      c && gb(a, D, c, b);
                      return c;
                    }, Wd = (a) => "]" == a.slice(-1) && a.lastIndexOf("["), Xd = (a) => {
                      a -= 5120;
                      return 0 == a ? B : 1 == a ? D : 2 == a ? E : 4 == a ? F : 6 == a ? xa : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? G : wa;
                    }, Yd = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Zd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], $d = (a, b, c, d) => {
                      function e(p, r, u) {
                        for (p = "number" == typeof p ? p.toString() : p || ""; p.length < r; ) {
                          p = u[0] + p;
                        }
                        return p;
                      }
                      function f(p, r) {
                        return e(p, r, "0");
                      }
                      function g(p, r) {
                        function u(A) {
                          return 0 > A ? -1 : 0 < A ? 1 : 0;
                        }
                        var z;
                        0 === (z = u(p.getFullYear() - r.getFullYear())) && 0 === (z = u(p.getMonth() - r.getMonth())) && (z = u(p.getDate() - r.getDate()));
                        return z;
                      }
                      function k(p) {
                        switch (p.getDay()) {
                          case 0:
                            return new Date(p.getFullYear() - 1, 11, 29);
                          case 1:
                            return p;
                          case 2:
                            return new Date(p.getFullYear(), 0, 3);
                          case 3:
                            return new Date(p.getFullYear(), 0, 2);
                          case 4:
                            return new Date(p.getFullYear(), 0, 1);
                          case 5:
                            return new Date(p.getFullYear() - 1, 11, 31);
                          case 6:
                            return new Date(p.getFullYear() - 1, 11, 30);
                        }
                      }
                      function n(p) {
                        var r = p.ba;
                        for (p = new Date(new Date(p.ca + 1900, 0, 1).getTime()); 0 < r; ) {
                          var u = p.getMonth(), z = (ud(p.getFullYear()) ? Yd : Zd)[u];
                          if (r > z - p.getDate()) {
                            r -= z - p.getDate() + 1, p.setDate(1), 11 > u ? p.setMonth(u + 1) : (p.setMonth(0), p.setFullYear(p.getFullYear() + 1));
                          } else {
                            p.setDate(p.getDate() + r);
                            break;
                          }
                        }
                        u = new Date(p.getFullYear() + 1, 0, 4);
                        r = k(new Date(p.getFullYear(), 0, 4));
                        u = k(u);
                        return 0 >= g(r, p) ? 0 >= g(u, p) ? p.getFullYear() + 1 : p.getFullYear() : p.getFullYear() - 1;
                      }
                      var m = G[d + 40 >> 2];
                      d = { kc: F[d >> 2], jc: F[d + 4 >> 2], Ja: F[d + 8 >> 2], Va: F[d + 12 >> 2], Ka: F[d + 16 >> 2], ca: F[d + 20 >> 2], R: F[d + 24 >> 2], ba: F[d + 28 >> 2], Sc: F[d + 32 >> 2], ic: F[d + 36 >> 2], lc: m ? m ? L(D, m) : "" : "" };
                      c = c ? L(D, c) : "";
                      m = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S", "%Ec": "%c", "%EC": "%C", "%Ex": "%m/%d/%y", "%EX": "%H:%M:%S", "%Ey": "%y", "%EY": "%Y", "%Od": "%d", "%Oe": "%e", "%OH": "%H", "%OI": "%I", "%Om": "%m", "%OM": "%M", "%OS": "%S", "%Ou": "%u", "%OU": "%U", "%OV": "%V", "%Ow": "%w", "%OW": "%W", "%Oy": "%y" };
                      for (var t in m) {
                        c = c.replace(new RegExp(t, "g"), m[t]);
                      }
                      var v = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), x = "January February March April May June July August September October November December".split(" ");
                      m = { "%a": (p) => v[p.R].substring(0, 3), "%A": (p) => v[p.R], "%b": (p) => x[p.Ka].substring(0, 3), "%B": (p) => x[p.Ka], "%C": (p) => f((p.ca + 1900) / 100 | 0, 2), "%d": (p) => f(p.Va, 2), "%e": (p) => e(p.Va, 2, " "), "%g": (p) => n(p).toString().substring(2), "%G": n, "%H": (p) => f(p.Ja, 2), "%I": (p) => {
                        p = p.Ja;
                        0 == p ? p = 12 : 12 < p && (p -= 12);
                        return f(p, 2);
                      }, "%j": (p) => {
                        for (var r = 0, u = 0; u <= p.Ka - 1; r += (ud(p.ca + 1900) ? Yd : Zd)[u++]) {
                        }
                        return f(p.Va + r, 3);
                      }, "%m": (p) => f(p.Ka + 1, 2), "%M": (p) => f(p.jc, 2), "%n": () => "\n", "%p": (p) => 0 <= p.Ja && 12 > p.Ja ? "AM" : "PM", "%S": (p) => f(p.kc, 2), "%t": () => "	", "%u": (p) => p.R || 7, "%U": (p) => f(Math.floor((p.ba + 7 - p.R) / 7), 2), "%V": (p) => {
                        var r = Math.floor((p.ba + 7 - (p.R + 6) % 7) / 7);
                        2 >= (p.R + 371 - p.ba - 2) % 7 && r++;
                        if (r) {
                          53 == r && (u = (p.R + 371 - p.ba) % 7, 4 == u || 3 == u && ud(p.ca) || (r = 1));
                        } else {
                          r = 52;
                          var u = (p.R + 7 - p.ba - 1) % 7;
                          (4 == u || 5 == u && ud(p.ca % 400 - 1)) && r++;
                        }
                        return f(r, 2);
                      }, "%w": (p) => p.R, "%W": (p) => f(Math.floor((p.ba + 7 - (p.R + 6) % 7) / 7), 2), "%y": (p) => (p.ca + 1900).toString().substring(2), "%Y": (p) => p.ca + 1900, "%z": (p) => {
                        p = p.ic;
                        var r = 0 <= p;
                        p = Math.abs(p) / 60;
                        return (r ? "+" : "-") + String("0000" + (p / 60 * 100 + p % 60)).slice(-4);
                      }, "%Z": (p) => p.lc, "%%": () => "%" };
                      c = c.replace(/%%/g, "\0\0");
                      for (t in m) {
                        c.includes(t) && (c = c.replace(new RegExp(t, "g"), m[t](d)));
                      }
                      c = c.replace(/\0\0/g, "%");
                      t = hb(c, false);
                      if (t.length > b) {
                        return 0;
                      }
                      B.set(t, a);
                      return t.length - 1;
                    };
                    [44].forEach((a) => {
                      sb[a] = new M(a);
                      sb[a].stack = "<generic error, no stack>";
                    });
                    zb = Array(4096);
                    Nb(N, "/");
                    Pb("/tmp");
                    Pb("/home");
                    Pb("/home/web_user");
                    (function() {
                      Pb("/dev");
                      kb(259, { read: () => 0, write: (d, e, f, g) => g });
                      Qb("/dev/null", 259);
                      jb(1280, mb);
                      jb(1536, nb);
                      Qb("/dev/tty", 1280);
                      Qb("/dev/tty1", 1536);
                      var a = new Uint8Array(1024), b = 0, c = () => {
                        0 === b && (b = bb(a).byteLength);
                        return a[--b];
                      };
                      Wb("random", c);
                      Wb("urandom", c);
                      Pb("/dev/shm");
                      Pb("/dev/shm/tmp");
                    })();
                    (function() {
                      Pb("/proc");
                      var a = Pb("/proc/self");
                      Pb("/proc/self/fd");
                      Nb({ U() {
                        var b = rb(a, "fd", 16895, 73);
                        b.j = { la(c, d) {
                          var e = Kb(+d);
                          c = { parent: null, U: { kb: "fake" }, j: { ma: () => e.path } };
                          return c.parent = c;
                        } };
                        return b;
                      } }, "/proc/self/fd");
                    })();
                    P = l.BindingError = class extends Error {
                      constructor(a) {
                        super(a);
                        this.name = "BindingError";
                      }
                    };
                    O.push(0, 1, void 0, 1, null, 1, true, 1, false, 1);
                    l.count_emval_handles = () => O.length / 2 - 5 - $b.length;
                    cc = l.PureVirtualError = bc("PureVirtualError");
                    for (var ae = Array(256), be = 0; 256 > be; ++be) {
                      ae[be] = String.fromCharCode(be);
                    }
                    dc = ae;
                    l.getInheritedInstanceCount = () => Object.keys(hc).length;
                    l.getLiveInheritedInstances = () => {
                      var a = [], b;
                      for (b in hc) {
                        hc.hasOwnProperty(b) && a.push(hc[b]);
                      }
                      return a;
                    };
                    l.flushPendingDeletes = fc;
                    l.setDelayFunction = (a) => {
                      gc = a;
                      ec.length && gc && gc(fc);
                    };
                    tc = l.InternalError = class extends Error {
                      constructor(a) {
                        super(a);
                        this.name = "InternalError";
                      }
                    };
                    Object.assign(Dc.prototype, { isAliasOf: function(a) {
                      if (!(this instanceof Dc && a instanceof Dc)) {
                        return false;
                      }
                      var b = this.g.u.i, c = this.g.o;
                      a.g = a.g;
                      var d = a.g.u.i;
                      for (a = a.g.o; b.B; ) {
                        c = b.oa(c), b = b.B;
                      }
                      for (; d.B; ) {
                        a = d.oa(a), d = d.B;
                      }
                      return b === d && c === a;
                    }, clone: function() {
                      this.g.o || Cc(this);
                      if (this.g.ia) {
                        return this.g.count.value += 1, this;
                      }
                      var a = uc, b = Object, c = b.create, d = Object.getPrototypeOf(this), e = this.g;
                      a = a(c.call(b, d, { g: { value: { count: e.count, ga: e.ga, ia: e.ia, o: e.o, u: e.u, D: e.D, J: e.J } } }));
                      a.g.count.value += 1;
                      a.g.ga = false;
                      return a;
                    }, ["delete"]() {
                      this.g.o || Cc(this);
                      if (this.g.ga && !this.g.ia) {
                        throw new P("Object already scheduled for deletion");
                      }
                      oc(this);
                      var a = this.g;
                      --a.count.value;
                      0 === a.count.value && (a.D ? a.J.O(a.D) : a.u.i.O(a.o));
                      this.g.ia || (this.g.D = void 0, this.g.o = void 0);
                    }, isDeleted: function() {
                      return !this.g.o;
                    }, deleteLater: function() {
                      this.g.o || Cc(this);
                      if (this.g.ga && !this.g.ia) {
                        throw new P("Object already scheduled for deletion");
                      }
                      ec.push(this);
                      1 === ec.length && gc && gc(fc);
                      this.g.ga = true;
                      return this;
                    } });
                    Object.assign(Nc.prototype, { Pb(a) {
                      this.qb && (a = this.qb(a));
                      return a;
                    }, bb(a) {
                      this.O?.(a);
                    }, argPackAdvance: 8, readValueFromPointer: yc, fromWireType: function(a) {
                      function b() {
                        return this.xa ? vc(this.i.M, { u: this.bc, o: c, J: this, D: a }) : vc(this.i.M, { u: this, o: a });
                      }
                      var c = this.Pb(a);
                      if (!c) {
                        return this.bb(a), null;
                      }
                      var d = sc(this.i, c);
                      if (void 0 !== d) {
                        if (0 === d.g.count.value) {
                          return d.g.o = c, d.g.D = a, d.clone();
                        }
                        d = d.clone();
                        this.bb(a);
                        return d;
                      }
                      d = this.i.Ob(c);
                      d = rc[d];
                      if (!d) {
                        return b.call(this);
                      }
                      d = this.wa ? d.Hb : d.pointerType;
                      var e = qc(c, this.i, d.i);
                      return null === e ? b.call(this) : this.xa ? vc(d.i.M, { u: d, o: e, J: this, D: a }) : vc(d.i.M, { u: d, o: e });
                    } });
                    Uc = l.UnboundTypeError = bc("UnboundTypeError");
                    for (var W, ce = 0; 32 > ce; ++ce) {
                      Rd.push(Array(ce));
                    }
                    var ee = { __syscall_fcntl64: function(a, b, c) {
                      Wa = c;
                      try {
                        var d = Kb(a);
                        switch (b) {
                          case 0:
                            var e = Va();
                            if (0 > e) {
                              break;
                            }
                            for (; xb[e]; ) {
                              e++;
                            }
                            return Mb(d, e).W;
                          case 1:
                          case 2:
                            return 0;
                          case 3:
                            return d.flags;
                          case 4:
                            return e = Va(), d.flags |= e, 0;
                          case 12:
                            return e = Va(), E[e + 0 >> 1] = 2, 0;
                          case 13:
                          case 14:
                            return 0;
                        }
                        return -28;
                      } catch (f) {
                        if ("undefined" == typeof Yb || "ErrnoError" !== f.name) {
                          throw f;
                        }
                        return -f.$;
                      }
                    }, __syscall_ioctl: function(a, b, c) {
                      Wa = c;
                      try {
                        var d = Kb(a);
                        switch (b) {
                          case 21509:
                            return d.s ? 0 : -59;
                          case 21505:
                            if (!d.s) {
                              return -59;
                            }
                            if (d.s.V.Wb) {
                              a = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                              var e = Va();
                              F[e >> 2] = 25856;
                              F[e + 4 >> 2] = 5;
                              F[e + 8 >> 2] = 191;
                              F[e + 12 >> 2] = 35387;
                              for (var f = 0; 32 > f; f++) {
                                B[e + f + 17] = a[f] || 0;
                              }
                            }
                            return 0;
                          case 21510:
                          case 21511:
                          case 21512:
                            return d.s ? 0 : -59;
                          case 21506:
                          case 21507:
                          case 21508:
                            if (!d.s) {
                              return -59;
                            }
                            if (d.s.V.Xb) {
                              for (e = Va(), a = [], f = 0; 32 > f; f++) {
                                a.push(B[e + f + 17]);
                              }
                            }
                            return 0;
                          case 21519:
                            if (!d.s) {
                              return -59;
                            }
                            e = Va();
                            return F[e >> 2] = 0;
                          case 21520:
                            return d.s ? -28 : -59;
                          case 21531:
                            e = Va();
                            if (!d.m.Vb) {
                              throw new M(59);
                            }
                            return d.m.Vb(d, b, e);
                          case 21523:
                            if (!d.s) {
                              return -59;
                            }
                            d.s.V.Yb && (f = [24, 80], e = Va(), E[e >> 1] = f[0], E[e + 2 >> 1] = f[1]);
                            return 0;
                          case 21524:
                            return d.s ? 0 : -59;
                          case 21515:
                            return d.s ? 0 : -59;
                          default:
                            return -28;
                        }
                      } catch (g) {
                        if ("undefined" == typeof Yb || "ErrnoError" !== g.name) {
                          throw g;
                        }
                        return -g.$;
                      }
                    }, __syscall_openat: function(a, b, c, d) {
                      Wa = d;
                      try {
                        b = b ? L(D, b) : "";
                        var e = b;
                        if ("/" === e.charAt(0)) {
                          b = e;
                        } else {
                          var f = -100 === a ? "/" : Kb(a).path;
                          if (0 == e.length) {
                            throw new M(44);
                          }
                          b = Ya(f + "/" + e);
                        }
                        var g = d ? Va() : 0;
                        return Sb(b, c, g).W;
                      } catch (k) {
                        if ("undefined" == typeof Yb || "ErrnoError" !== k.name) {
                          throw k;
                        }
                        return -k.$;
                      }
                    }, _abort_js: () => {
                      Ha("");
                    }, _embind_create_inheriting_constructor: (a, b, c) => {
                      a = R(a);
                      b = nc(b, "wrapper");
                      c = Q(c);
                      var d = b.i, e = d.M, f = d.B.M, g = d.B.constructor;
                      a = Zb(a, function(...k) {
                        d.B.ob.forEach(function(n) {
                          if (this[n] === f[n]) {
                            throw new cc(`Pure virtual function ${n} must be implemented in JavaScript`);
                          }
                        }.bind(this));
                        Object.defineProperty(this, "__parent", { value: e });
                        this.__construct(...k);
                      });
                      e.__construct = function(...k) {
                        if (this === e) {
                          throw new P("Pass correct 'this' to __construct");
                        }
                        k = g.implement(this, ...k);
                        oc(k);
                        var n = k.g;
                        k.notifyOnDestruction();
                        n.ia = true;
                        Object.defineProperties(this, { g: { value: n } });
                        uc(this);
                        k = n.o;
                        k = ic(d, k);
                        if (hc.hasOwnProperty(k)) {
                          throw new P(`Tried to register registered instance: ${k}`);
                        }
                        hc[k] = this;
                      };
                      e.__destruct = function() {
                        if (this === e) {
                          throw new P("Pass correct 'this' to __destruct");
                        }
                        oc(this);
                        var k = this.g.o;
                        k = ic(d, k);
                        if (hc.hasOwnProperty(k)) {
                          delete hc[k];
                        } else {
                          throw new P(`Tried to unregister unregistered instance: ${k}`);
                        }
                      };
                      a.prototype = Object.create(e);
                      Object.assign(a.prototype, c);
                      return ac(a);
                    }, _embind_finalize_value_object: (a) => {
                      var b = wc[a];
                      delete wc[a];
                      var c = b.Ta, d = b.O, e = b.eb, f = e.map((g) => g.Sb).concat(e.map((g) => g.ec));
                      T([a], f, (g) => {
                        var k = {};
                        e.forEach((n, m) => {
                          var t = g[m], v = n.Qb, x = n.Rb, p = g[m + e.length], r = n.dc, u = n.fc;
                          k[n.Mb] = { read: (z) => t.fromWireType(v(x, z)), write: (z, A) => {
                            var C = [];
                            r(u, z, p.toWireType(C, A));
                            xc(C);
                          } };
                        });
                        return [{ name: b.name, fromWireType: (n) => {
                          var m = {}, t;
                          for (t in k) {
                            m[t] = k[t].read(n);
                          }
                          d(n);
                          return m;
                        }, toWireType: (n, m) => {
                          for (var t in k) {
                            if (!(t in m)) {
                              throw new TypeError(`Missing field: "${t}"`);
                            }
                          }
                          var v = c();
                          for (t in k) {
                            k[t].write(v, m[t]);
                          }
                          null !== n && n.push(d, v);
                          return v;
                        }, argPackAdvance: 8, readValueFromPointer: yc, L: d }];
                      });
                    }, _embind_register_bigint: () => {
                    }, _embind_register_bool: (a, b, c, d) => {
                      b = R(b);
                      S(a, { name: b, fromWireType: function(e) {
                        return !!e;
                      }, toWireType: function(e, f) {
                        return f ? c : d;
                      }, argPackAdvance: 8, readValueFromPointer: function(e) {
                        return this.fromWireType(D[e]);
                      }, L: null });
                    }, _embind_register_class: (a, b, c, d, e, f, g, k, n, m, t, v, x) => {
                      t = R(t);
                      f = U(e, f);
                      k &&= U(g, k);
                      m &&= U(n, m);
                      x = U(v, x);
                      var p = Gc(t);
                      Fc(p, function() {
                        Vc(`Cannot construct ${t} due to unbound types`, [d]);
                      });
                      T([a, b, c], d ? [d] : [], (r) => {
                        r = r[0];
                        if (d) {
                          var u = r.i;
                          var z = u.M;
                        } else {
                          z = Dc.prototype;
                        }
                        r = Zb(t, function(...J) {
                          if (Object.getPrototypeOf(this) !== A) {
                            throw new P("Use 'new' to construct " + t);
                          }
                          if (void 0 === C.Z) {
                            throw new P(t + " has no accessible constructor");
                          }
                          var K = C.Z[J.length];
                          if (void 0 === K) {
                            throw new P(`Tried to invoke ctor of ${t} with invalid number of parameters (${J.length}) - expected (${Object.keys(C.Z).toString()}) parameters instead!`);
                          }
                          return K.apply(this, J);
                        });
                        var A = Object.create(z, { constructor: { value: r } });
                        r.prototype = A;
                        var C = new Hc(t, r, A, x, u, f, k, m);
                        if (C.B) {
                          var H;
                          (H = C.B).pa ?? (H.pa = []);
                          C.B.pa.push(C);
                        }
                        u = new Nc(t, C, true, false, false);
                        H = new Nc(t + "*", C, false, false, false);
                        z = new Nc(t + " const*", C, false, true, false);
                        rc[a] = { pointerType: H, Hb: z };
                        Oc(p, r);
                        return [u, H, z];
                      });
                    }, _embind_register_class_class_function: (a, b, c, d, e, f, g) => {
                      var k = Yc(c, d);
                      b = R(b);
                      b = Zc(b);
                      f = U(e, f);
                      T([], [a], (n) => {
                        function m() {
                          Vc(`Cannot call ${t} due to unbound types`, k);
                        }
                        n = n[0];
                        var t = `${n.name}.${b}`;
                        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
                        var v = n.i.constructor;
                        void 0 === v[b] ? (m.fa = c - 1, v[b] = m) : (Ec(v, b, t), v[b].A[c - 1] = m);
                        T([], k, (x) => {
                          x = Xc(t, [x[0], null].concat(x.slice(1)), null, f, g);
                          void 0 === v[b].A ? (x.fa = c - 1, v[b] = x) : v[b].A[c - 1] = x;
                          if (n.i.pa) {
                            for (const p of n.i.pa) {
                              p.constructor.hasOwnProperty(b) || (p.constructor[b] = x);
                            }
                          }
                          return [];
                        });
                        return [];
                      });
                    }, _embind_register_class_class_property: (a, b, c, d, e, f, g, k) => {
                      b = R(b);
                      f = U(e, f);
                      T([], [a], (n) => {
                        n = n[0];
                        var m = `${n.name}.${b}`, t = { get() {
                          Vc(`Cannot access ${m} due to unbound types`, [c]);
                        }, enumerable: true, configurable: true };
                        t.set = k ? () => {
                          Vc(`Cannot access ${m} due to unbound types`, [c]);
                        } : () => {
                          throw new P(`${m} is a read-only property`);
                        };
                        Object.defineProperty(n.i.constructor, b, t);
                        T([], [c], (v) => {
                          v = v[0];
                          var x = { get() {
                            return v.fromWireType(f(d));
                          }, enumerable: true };
                          k && (k = U(g, k), x.set = (p) => {
                            var r = [];
                            k(d, v.toWireType(r, p));
                            xc(r);
                          });
                          Object.defineProperty(n.i.constructor, b, x);
                          return [];
                        });
                        return [];
                      });
                    }, _embind_register_class_constructor: (a, b, c, d, e, f) => {
                      var g = Yc(b, c);
                      e = U(d, e);
                      T([], [a], (k) => {
                        k = k[0];
                        var n = `constructor ${k.name}`;
                        void 0 === k.i.Z && (k.i.Z = []);
                        if (void 0 !== k.i.Z[b - 1]) {
                          throw new P(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${k.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
                        }
                        k.i.Z[b - 1] = () => {
                          Vc(`Cannot construct ${k.name} due to unbound types`, g);
                        };
                        T([], g, (m) => {
                          m.splice(1, 0, null);
                          k.i.Z[b - 1] = Xc(n, m, null, e, f);
                          return [];
                        });
                        return [];
                      });
                    }, _embind_register_class_function: (a, b, c, d, e, f, g, k) => {
                      var n = Yc(c, d);
                      b = R(b);
                      b = Zc(b);
                      f = U(e, f);
                      T([], [a], (m) => {
                        function t() {
                          Vc(`Cannot call ${v} due to unbound types`, n);
                        }
                        m = m[0];
                        var v = `${m.name}.${b}`;
                        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
                        k && m.i.ob.push(b);
                        var x = m.i.M, p = x[b];
                        void 0 === p || void 0 === p.A && p.className !== m.name && p.fa === c - 2 ? (t.fa = c - 2, t.className = m.name, x[b] = t) : (Ec(x, b, v), x[b].A[c - 2] = t);
                        T([], n, (r) => {
                          r = Xc(v, r, m, f, g);
                          void 0 === x[b].A ? (r.fa = c - 2, x[b] = r) : x[b].A[c - 2] = r;
                          return [];
                        });
                        return [];
                      });
                    }, _embind_register_class_property: (a, b, c, d, e, f, g, k, n, m) => {
                      b = R(b);
                      e = U(d, e);
                      T([], [a], (t) => {
                        t = t[0];
                        var v = `${t.name}.${b}`, x = { get() {
                          Vc(`Cannot access ${v} due to unbound types`, [c, g]);
                        }, enumerable: true, configurable: true };
                        x.set = n ? () => Vc(`Cannot access ${v} due to unbound types`, [c, g]) : () => {
                          throw new P(v + " is a read-only property");
                        };
                        Object.defineProperty(t.i.M, b, x);
                        T([], n ? [c, g] : [c], (p) => {
                          var r = p[0], u = { get() {
                            var A = $c(this, t, v + " getter");
                            return r.fromWireType(e(f, A));
                          }, enumerable: true };
                          if (n) {
                            n = U(k, n);
                            var z = p[1];
                            u.set = function(A) {
                              var C = $c(this, t, v + " setter"), H = [];
                              n(m, C, z.toWireType(H, A));
                              xc(H);
                            };
                          }
                          Object.defineProperty(t.i.M, b, u);
                          return [];
                        });
                        return [];
                      });
                    }, _embind_register_emval: (a) => S(a, bd), _embind_register_enum: (a, b, c, d) => {
                      function e() {
                      }
                      b = R(b);
                      e.values = {};
                      S(a, { name: b, constructor: e, fromWireType: function(f) {
                        return this.constructor.values[f];
                      }, toWireType: (f, g) => g.value, argPackAdvance: 8, readValueFromPointer: cd(b, c, d), L: null });
                      Fc(b, e);
                    }, _embind_register_enum_value: (a, b, c) => {
                      var d = nc(a, "enum");
                      b = R(b);
                      a = d.constructor;
                      d = Object.create(d.constructor.prototype, { value: { value: c }, constructor: { value: Zb(`${d.name}_${b}`, function() {
                      }) } });
                      a.values[c] = d;
                      a[b] = d;
                    }, _embind_register_float: (a, b, c) => {
                      b = R(b);
                      S(a, { name: b, fromWireType: (d) => d, toWireType: (d, e) => e, argPackAdvance: 8, readValueFromPointer: dd(b, c), L: null });
                    }, _embind_register_function: (a, b, c, d, e, f) => {
                      var g = Yc(b, c);
                      a = R(a);
                      a = Zc(a);
                      e = U(d, e);
                      Fc(a, function() {
                        Vc(`Cannot call ${a} due to unbound types`, g);
                      }, b - 1);
                      T([], g, (k) => {
                        Oc(a, Xc(a, [k[0], null].concat(k.slice(1)), null, e, f), b - 1);
                        return [];
                      });
                    }, _embind_register_integer: (a, b, c, d, e) => {
                      b = R(b);
                      -1 === e && (e = 4294967295);
                      e = (k) => k;
                      if (0 === d) {
                        var f = 32 - 8 * c;
                        e = (k) => k << f >>> f;
                      }
                      var g = b.includes("unsigned") ? function(k, n) {
                        return n >>> 0;
                      } : function(k, n) {
                        return n;
                      };
                      S(a, { name: b, fromWireType: e, toWireType: g, argPackAdvance: 8, readValueFromPointer: ed(b, c, 0 !== d), L: null });
                    }, _embind_register_memory_view: (a, b, c) => {
                      function d(f) {
                        return new e(B.buffer, G[f + 4 >> 2], G[f >> 2]);
                      }
                      var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
                      c = R(c);
                      S(a, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { Tb: true });
                    }, _embind_register_std_string: (a, b) => {
                      b = R(b);
                      var c = "std::string" === b;
                      S(a, { name: b, fromWireType: function(d) {
                        var e = G[d >> 2], f = d + 4;
                        if (c) {
                          for (var g = f, k = 0; k <= e; ++k) {
                            var n = f + k;
                            if (k == e || 0 == D[n]) {
                              g = g ? L(D, g, n - g) : "";
                              if (void 0 === m) {
                                var m = g;
                              } else {
                                m += String.fromCharCode(0), m += g;
                              }
                              g = n + 1;
                            }
                          }
                        } else {
                          m = Array(e);
                          for (k = 0; k < e; ++k) {
                            m[k] = String.fromCharCode(D[f + k]);
                          }
                          m = m.join("");
                        }
                        lc(d);
                        return m;
                      }, toWireType: function(d, e) {
                        e instanceof ArrayBuffer && (e = new Uint8Array(e));
                        var f = "string" == typeof e;
                        if (!(f || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array)) {
                          throw new P("Cannot pass non-string to std::string");
                        }
                        var g = c && f ? fb(e) : e.length;
                        var k = Ud(4 + g + 1), n = k + 4;
                        G[k >> 2] = g;
                        if (c && f) {
                          gb(e, D, n, g + 1);
                        } else {
                          if (f) {
                            for (f = 0; f < g; ++f) {
                              var m = e.charCodeAt(f);
                              if (255 < m) {
                                throw lc(n), new P("String has UTF-16 code units that do not fit in 8 bits");
                              }
                              D[n + f] = m;
                            }
                          } else {
                            for (f = 0; f < g; ++f) {
                              D[n + f] = e[f];
                            }
                          }
                        }
                        null !== d && d.push(lc, k);
                        return k;
                      }, argPackAdvance: 8, readValueFromPointer: yc, L(d) {
                        lc(d);
                      } });
                    }, _embind_register_std_wstring: (a, b, c) => {
                      c = R(c);
                      if (2 === b) {
                        var d = gd;
                        var e = hd;
                        var f = jd;
                        var g = (k) => wa[k >> 1];
                      } else {
                        4 === b && (d = kd, e = ld, f = md, g = (k) => G[k >> 2]);
                      }
                      S(a, { name: c, fromWireType: (k) => {
                        for (var n = G[k >> 2], m, t = k + 4, v = 0; v <= n; ++v) {
                          var x = k + 4 + v * b;
                          if (v == n || 0 == g(x)) {
                            t = d(t, x - t), void 0 === m ? m = t : (m += String.fromCharCode(0), m += t), t = x + b;
                          }
                        }
                        lc(k);
                        return m;
                      }, toWireType: (k, n) => {
                        if ("string" != typeof n) {
                          throw new P(`Cannot pass non-string to C++ string type ${c}`);
                        }
                        var m = f(n), t = Ud(4 + m + b);
                        G[t >> 2] = m / b;
                        e(n, t + 4, m + b);
                        null !== k && k.push(lc, t);
                        return t;
                      }, argPackAdvance: 8, readValueFromPointer: yc, L(k) {
                        lc(k);
                      } });
                    }, _embind_register_value_object: (a, b, c, d, e, f) => {
                      wc[a] = { name: R(b), Ta: U(c, d), O: U(e, f), eb: [] };
                    }, _embind_register_value_object_field: (a, b, c, d, e, f, g, k, n, m) => {
                      wc[a].eb.push({ Mb: R(b), Sb: c, Qb: U(d, e), Rb: f, ec: g, dc: U(k, n), fc: m });
                    }, _embind_register_void: (a, b) => {
                      b = R(b);
                      S(a, { Ic: true, name: b, argPackAdvance: 0, fromWireType: () => {
                      }, toWireType: () => {
                      } });
                    }, _emscripten_get_now_is_monotonic: () => 1, _emscripten_memcpy_js: (a, b, c) => D.copyWithin(a, b, b + c), _emscripten_throw_longjmp: () => {
                      throw Infinity;
                    }, _emval_as: (a, b, c) => {
                      a = Q(a);
                      b = nc(b, "emval::as");
                      return nd(b, c, a);
                    }, _emval_call: (a, b, c, d) => {
                      a = od[a];
                      b = Q(b);
                      return a(null, b, c, d);
                    }, _emval_call_method: (a, b, c, d, e) => {
                      a = od[a];
                      b = Q(b);
                      c = qd(c);
                      return a(b, b[c], d, e);
                    }, _emval_decref: ad, _emval_get_method_caller: (a, b, c) => {
                      var d = sd(a, b), e = d.shift();
                      a--;
                      var f = Array(a);
                      b = `methodCaller<(${d.map((g) => g.name).join(", ")}) => ${e.name}>`;
                      return rd(Zb(b, (g, k, n, m) => {
                        for (var t = 0, v = 0; v < a; ++v) {
                          f[v] = d[v].readValueFromPointer(m + t), t += d[v].argPackAdvance;
                        }
                        g = 1 === c ? td(k, f) : k.apply(g, f);
                        return nd(e, n, g);
                      }));
                    }, _emval_get_property: (a, b) => {
                      a = Q(a);
                      b = Q(b);
                      return ac(a[b]);
                    }, _emval_incref: (a) => {
                      9 < a && (O[a + 1] += 1);
                    }, _emval_new_array: () => ac([]), _emval_new_cstring: (a) => ac(qd(a)), _emval_new_object: () => ac({}), _emval_run_destructors: (a) => {
                      var b = Q(a);
                      xc(b);
                      ad(a);
                    }, _emval_set_property: (a, b, c) => {
                      a = Q(a);
                      b = Q(b);
                      c = Q(c);
                      a[b] = c;
                    }, _emval_take_value: (a, b) => {
                      a = nc(a, "_emval_take_value");
                      a = a.readValueFromPointer(b);
                      return ac(a);
                    }, _gmtime_js: function(a, b, c) {
                      a = new Date(1e3 * (b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN));
                      F[c >> 2] = a.getUTCSeconds();
                      F[c + 4 >> 2] = a.getUTCMinutes();
                      F[c + 8 >> 2] = a.getUTCHours();
                      F[c + 12 >> 2] = a.getUTCDate();
                      F[c + 16 >> 2] = a.getUTCMonth();
                      F[c + 20 >> 2] = a.getUTCFullYear() - 1900;
                      F[c + 24 >> 2] = a.getUTCDay();
                      F[c + 28 >> 2] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0;
                    }, _localtime_js: function(a, b, c) {
                      a = new Date(1e3 * (b + 2097152 >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * b : NaN));
                      F[c >> 2] = a.getSeconds();
                      F[c + 4 >> 2] = a.getMinutes();
                      F[c + 8 >> 2] = a.getHours();
                      F[c + 12 >> 2] = a.getDate();
                      F[c + 16 >> 2] = a.getMonth();
                      F[c + 20 >> 2] = a.getFullYear() - 1900;
                      F[c + 24 >> 2] = a.getDay();
                      F[c + 28 >> 2] = (ud(a.getFullYear()) ? vd : wd)[a.getMonth()] + a.getDate() - 1 | 0;
                      F[c + 36 >> 2] = -(60 * a.getTimezoneOffset());
                      b = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
                      var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
                      F[c + 32 >> 2] = (b != d && a.getTimezoneOffset() == Math.min(d, b)) | 0;
                    }, _tzset_js: (a, b, c, d) => {
                      var e = (/* @__PURE__ */ new Date()).getFullYear(), f = new Date(e, 0, 1), g = new Date(e, 6, 1);
                      e = f.getTimezoneOffset();
                      var k = g.getTimezoneOffset();
                      G[a >> 2] = 60 * Math.max(e, k);
                      F[b >> 2] = Number(e != k);
                      a = (n) => n.toLocaleTimeString(void 0, { hour12: false, timeZoneName: "short" }).split(" ")[1];
                      f = a(f);
                      g = a(g);
                      k < e ? (gb(f, D, c, 17), gb(g, D, d, 17)) : (gb(f, D, d, 17), gb(g, D, c, 17));
                    }, beginPixelLocalStorageWEBGL: function(a, b, c) {
                      (a = w[a].F.Ea) && a.beginPixelLocalStorageWEBGL(l.HEAPU32.subarray(c, c + b));
                    }, decode_image: function(a, b, c) {
                      var d = l.images;
                      d || (d = /* @__PURE__ */ new Map(), l.images = d);
                      var e = new Image();
                      d.set(a, e);
                      b = l.HEAP8.subarray(b, b + c);
                      c = new Uint8Array(c);
                      c.set(b);
                      e.src = URL.createObjectURL(new Blob([c], { type: "image/png" }));
                      e.onload = function() {
                        l._setWebImage(a, e.width, e.height);
                      };
                    }, delete_image: function(a) {
                      var b = l.images;
                      b && b.get(a) && b.delete(a);
                    }, emscripten_asm_const_int: (a, b, c) => {
                      xd.length = 0;
                      for (var d; d = D[b++]; ) {
                        var e = 105 != d;
                        e &= 112 != d;
                        c += e && c % 8 ? 4 : 0;
                        xd.push(112 == d ? G[c >> 2] : 105 == d ? F[c >> 2] : ya[c >> 3]);
                        c += e ? 8 : 4;
                      }
                      return Ta[a](...xd);
                    }, emscripten_date_now: () => Date.now(), emscripten_get_now: () => performance.now(), emscripten_resize_heap: (a) => {
                      var b = D.length;
                      a >>>= 0;
                      if (2147483648 < a) {
                        return false;
                      }
                      for (var c = 1; 4 >= c; c *= 2) {
                        var d = b * (1 + 0.2 / c);
                        d = Math.min(d, a + 100663296);
                        var e = Math;
                        d = Math.max(a, d);
                        a: {
                          e = (e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536) - ua.buffer.byteLength + 65535) / 65536;
                          try {
                            ua.grow(e);
                            za();
                            var f = 1;
                            break a;
                          } catch (g) {
                          }
                          f = void 0;
                        }
                        if (f) {
                          return true;
                        }
                      }
                      return false;
                    }, emscripten_webgl_enable_extension: (a, b) => {
                      a = w[a];
                      b = b ? L(D, b) : "";
                      b.startsWith("GL_") && (b = b.substr(3));
                      "WEBGL_draw_instanced_base_vertex_base_instance" == b && yd(W);
                      "WEBGL_multi_draw_instanced_base_vertex_base_instance" == b && zd(W);
                      "WEBGL_multi_draw" == b && (W.$b = W.getExtension("WEBGL_multi_draw"));
                      return !!a.F.getExtension(b);
                    }, emscripten_webgl_get_current_context: () => q ? q.handle : 0, emscripten_webgl_make_context_current: (a) => la(a) ? 0 : -5, enable_WEBGL_provoking_vertex: function(a) {
                      a = w[a].F;
                      a.pb = a.getExtension("WEBGL_provoking_vertex");
                      return !!a.pb;
                    }, enable_WEBGL_shader_pixel_local_storage_coherent: function(a) {
                      a = w[a].F;
                      const b = a.getExtension("WEBGL_shader_pixel_local_storage");
                      return b && b.isCoherent() && 5 == b.framebufferTexturePixelLocalStorageWEBGL.length ? (a.Ea = b, true) : false;
                    }, endPixelLocalStorageWEBGL: function(a, b, c) {
                      (a = w[a].F.Ea) && a.endPixelLocalStorageWEBGL(l.HEAPU32.subarray(c, c + b));
                    }, environ_get: (a, b) => {
                      var c = 0;
                      Qd().forEach((d, e) => {
                        var f = b + c;
                        e = G[a + 4 * e >> 2] = f;
                        for (f = 0; f < d.length; ++f) {
                          B[e++] = d.charCodeAt(f);
                        }
                        B[e] = 0;
                        c += d.length + 1;
                      });
                      return 0;
                    }, environ_sizes_get: (a, b) => {
                      var c = Qd();
                      G[a >> 2] = c.length;
                      var d = 0;
                      c.forEach((e) => d += e.length + 1);
                      G[b >> 2] = d;
                      return 0;
                    }, fd_close: function(a) {
                      try {
                        var b = Kb(a);
                        if (null === b.W) {
                          throw new M(8);
                        }
                        b.Qa && (b.Qa = null);
                        try {
                          b.m.close && b.m.close(b);
                        } catch (c) {
                          throw c;
                        } finally {
                          xb[b.W] = null;
                        }
                        b.W = null;
                        return 0;
                      } catch (c) {
                        if ("undefined" == typeof Yb || "ErrnoError" !== c.name) {
                          throw c;
                        }
                        return c.$;
                      }
                    }, fd_read: function(a, b, c, d) {
                      try {
                        a: {
                          var e = Kb(a);
                          a = b;
                          for (var f, g = b = 0; g < c; g++) {
                            var k = G[a >> 2], n = G[a + 4 >> 2];
                            a += 8;
                            var m = e, t = f, v = B;
                            if (0 > n || 0 > t) {
                              throw new M(28);
                            }
                            if (null === m.W) {
                              throw new M(8);
                            }
                            if (1 === (m.flags & 2097155)) {
                              throw new M(8);
                            }
                            if (16384 === (m.node.mode & 61440)) {
                              throw new M(31);
                            }
                            if (!m.m.read) {
                              throw new M(28);
                            }
                            var x = "undefined" != typeof t;
                            if (!x) {
                              t = m.position;
                            } else if (!m.seekable) {
                              throw new M(70);
                            }
                            var p = m.m.read(m, v, k, n, t);
                            x || (m.position += p);
                            var r = p;
                            if (0 > r) {
                              var u = -1;
                              break a;
                            }
                            b += r;
                            if (r < n) {
                              break;
                            }
                            "undefined" != typeof f && (f += r);
                          }
                          u = b;
                        }
                        G[d >> 2] = u;
                        return 0;
                      } catch (z) {
                        if ("undefined" == typeof Yb || "ErrnoError" !== z.name) {
                          throw z;
                        }
                        return z.$;
                      }
                    }, fd_seek: function(a, b, c, d, e) {
                      b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
                      try {
                        if (isNaN(b)) {
                          return 61;
                        }
                        var f = Kb(a);
                        Ub(f, b, d);
                        Pa = [f.position >>> 0, (Oa = f.position, 1 <= +Math.abs(Oa) ? 0 < Oa ? +Math.floor(Oa / 4294967296) >>> 0 : ~~+Math.ceil((Oa - +(~~Oa >>> 0)) / 4294967296) >>> 0 : 0)];
                        F[e >> 2] = Pa[0];
                        F[e + 4 >> 2] = Pa[1];
                        f.Qa && 0 === b && 0 === d && (f.Qa = null);
                        return 0;
                      } catch (g) {
                        if ("undefined" == typeof Yb || "ErrnoError" !== g.name) {
                          throw g;
                        }
                        return g.$;
                      }
                    }, fd_write: function(a, b, c, d) {
                      try {
                        a: {
                          var e = Kb(a);
                          a = b;
                          for (var f, g = b = 0; g < c; g++) {
                            var k = G[a >> 2], n = G[a + 4 >> 2];
                            a += 8;
                            var m = e, t = k, v = n, x = f, p = B;
                            if (0 > v || 0 > x) {
                              throw new M(28);
                            }
                            if (null === m.W) {
                              throw new M(8);
                            }
                            if (0 === (m.flags & 2097155)) {
                              throw new M(8);
                            }
                            if (16384 === (m.node.mode & 61440)) {
                              throw new M(31);
                            }
                            if (!m.m.write) {
                              throw new M(28);
                            }
                            m.seekable && m.flags & 1024 && Ub(m, 0, 2);
                            var r = "undefined" != typeof x;
                            if (!r) {
                              x = m.position;
                            } else if (!m.seekable) {
                              throw new M(70);
                            }
                            var u = m.m.write(m, p, t, v, x, void 0);
                            r || (m.position += u);
                            var z = u;
                            if (0 > z) {
                              var A = -1;
                              break a;
                            }
                            b += z;
                            "undefined" != typeof f && (f += z);
                          }
                          A = b;
                        }
                        G[d >> 2] = A;
                        return 0;
                      } catch (C) {
                        if ("undefined" == typeof Yb || "ErrnoError" !== C.name) {
                          throw C;
                        }
                        return C.$;
                      }
                    }, framebufferPixelLocalClearValuefvWEBGL: function(a, b, c, d, e, f) {
                      (a = w[a].F.Ea) && a.framebufferPixelLocalClearValuefvWEBGL(b, [c, d, e, f]);
                    }, framebufferTexturePixelLocalStorageWEBGL: function(a, b, c, d, e, f) {
                      (a = w[a].F.Ea) && a.framebufferTexturePixelLocalStorageWEBGL(b, Fd[c], d, e, f);
                    }, glActiveTexture: (a) => W.activeTexture(a), glAttachShader: (a, b) => {
                      W.attachShader(V[a], Gd[b]);
                    }, glBindBuffer: (a, b) => {
                      35051 == a ? W.Oa = b : 35052 == a && (W.sa = b);
                      W.bindBuffer(a, Cd[b]);
                    }, glBindBufferRange: (a, b, c, d, e) => {
                      W.bindBufferRange(a, b, Cd[c], d, e);
                    }, glBindFramebuffer: (a, b) => {
                      W.bindFramebuffer(a, Dd[b]);
                    }, glBindRenderbuffer: (a, b) => {
                      W.bindRenderbuffer(a, Ed[b]);
                    }, glBindTexture: (a, b) => {
                      W.bindTexture(a, Fd[b]);
                    }, glBindVertexArray: (a) => {
                      W.bindVertexArray(Hd[a]);
                    }, glBlendEquation: (a) => W.blendEquation(a), glBlendFunc: (a, b) => W.blendFunc(a, b), glBlitFramebuffer: (a, b, c, d, e, f, g, k, n, m) => W.blitFramebuffer(a, b, c, d, e, f, g, k, n, m), glBufferData: (a, b, c, d) => {
                      c && b ? W.bufferData(a, D, d, c, b) : W.bufferData(a, b, d);
                    }, glBufferSubData: (a, b, c, d) => {
                      c && W.bufferSubData(a, b, D, d, c);
                    }, glClear: (a) => W.clear(a), glClearBufferfv: (a, b, c) => {
                      W.clearBufferfv(a, b, xa, c >> 2);
                    }, glClearBufferuiv: (a, b, c) => {
                      W.clearBufferuiv(a, b, G, c >> 2);
                    }, glClearColor: (a, b, c, d) => W.clearColor(a, b, c, d), glClearDepthf: (a) => W.clearDepth(a), glClearStencil: (a) => W.clearStencil(a), glColorMask: (a, b, c, d) => {
                      W.colorMask(!!a, !!b, !!c, !!d);
                    }, glCompileShader: (a) => {
                      W.compileShader(Gd[a]);
                    }, glCompressedTexSubImage2D: (a, b, c, d, e, f, g, k, n) => {
                      W.sa || !k ? W.compressedTexSubImage2D(a, b, c, d, e, f, g, k, n) : W.compressedTexSubImage2D(a, b, c, d, e, f, g, D, n, k);
                    }, glCreateProgram: () => {
                      var a = Ld(V), b = W.createProgram();
                      b.name = a;
                      b.Aa = b.ya = b.za = 0;
                      b.Wa = 1;
                      V[a] = b;
                      return a;
                    }, glCreateShader: (a) => {
                      var b = Ld(Gd);
                      Gd[b] = W.createShader(a);
                      return b;
                    }, glCullFace: (a) => W.cullFace(a), glDeleteBuffers: (a, b) => {
                      for (var c = 0; c < a; c++) {
                        var d = F[b + 4 * c >> 2], e = Cd[d];
                        e && (W.deleteBuffer(e), e.name = 0, Cd[d] = null, d == W.Oa && (W.Oa = 0), d == W.sa && (W.sa = 0));
                      }
                    }, glDeleteFramebuffers: (a, b) => {
                      for (var c = 0; c < a; ++c) {
                        var d = F[b + 4 * c >> 2], e = Dd[d];
                        e && (W.deleteFramebuffer(e), e.name = 0, Dd[d] = null);
                      }
                    }, glDeleteProgram: (a) => {
                      if (a) {
                        var b = V[a];
                        b ? (W.deleteProgram(b), b.name = 0, V[a] = null) : X ||= 1281;
                      }
                    }, glDeleteRenderbuffers: (a, b) => {
                      for (var c = 0; c < a; c++) {
                        var d = F[b + 4 * c >> 2], e = Ed[d];
                        e && (W.deleteRenderbuffer(e), e.name = 0, Ed[d] = null);
                      }
                    }, glDeleteShader: (a) => {
                      if (a) {
                        var b = Gd[a];
                        b ? (W.deleteShader(b), Gd[a] = null) : X ||= 1281;
                      }
                    }, glDeleteTextures: (a, b) => {
                      for (var c = 0; c < a; c++) {
                        var d = F[b + 4 * c >> 2], e = Fd[d];
                        e && (W.deleteTexture(e), e.name = 0, Fd[d] = null);
                      }
                    }, glDeleteVertexArrays: (a, b) => {
                      for (var c = 0; c < a; c++) {
                        var d = F[b + 4 * c >> 2];
                        W.deleteVertexArray(Hd[d]);
                        Hd[d] = null;
                      }
                    }, glDepthFunc: (a) => W.depthFunc(a), glDepthMask: (a) => {
                      W.depthMask(!!a);
                    }, glDepthRangef: (a, b) => W.depthRange(a, b), glDisable: (a) => W.disable(a), glDrawArrays: (a, b, c) => {
                      W.drawArrays(a, b, c);
                    }, glDrawArraysInstanced: (a, b, c, d) => {
                      W.drawArraysInstanced(a, b, c, d);
                    }, glDrawBuffers: (a, b) => {
                      for (var c = Rd[a], d = 0; d < a; d++) {
                        c[d] = F[b + 4 * d >> 2];
                      }
                      W.drawBuffers(c);
                    }, glDrawElements: (a, b, c, d) => {
                      W.drawElements(a, b, c, d);
                    }, glDrawElementsInstanced: (a, b, c, d, e) => {
                      W.drawElementsInstanced(a, b, c, d, e);
                    }, glEnable: (a) => W.enable(a), glEnableVertexAttribArray: (a) => {
                      W.enableVertexAttribArray(a);
                    }, glFlush: () => W.flush(), glFramebufferRenderbuffer: (a, b, c, d) => {
                      W.framebufferRenderbuffer(a, b, c, Ed[d]);
                    }, glFramebufferTexture2D: (a, b, c, d, e) => {
                      W.framebufferTexture2D(a, b, c, Fd[d], e);
                    }, glFrontFace: (a) => W.frontFace(a), glGenBuffers: (a, b) => {
                      Md(a, b, "createBuffer", Cd);
                    }, glGenFramebuffers: (a, b) => {
                      Md(a, b, "createFramebuffer", Dd);
                    }, glGenRenderbuffers: (a, b) => {
                      Md(a, b, "createRenderbuffer", Ed);
                    }, glGenTextures: (a, b) => {
                      Md(a, b, "createTexture", Fd);
                    }, glGenVertexArrays: (a, b) => {
                      Md(a, b, "createVertexArray", Hd);
                    }, glGenerateMipmap: (a) => W.generateMipmap(a), glGetIntegerv: (a, b) => Td(a, b), glGetProgramiv: (a, b, c) => {
                      if (c) {
                        if (a >= Bd) {
                          X ||= 1281;
                        } else {
                          if (a = V[a], 35716 == b) {
                            a = W.getProgramInfoLog(a), null === a && (a = "(unknown error)"), F[c >> 2] = a.length + 1;
                          } else if (35719 == b) {
                            if (!a.Aa) {
                              for (b = 0; b < W.getProgramParameter(a, 35718); ++b) {
                                a.Aa = Math.max(a.Aa, W.getActiveUniform(a, b).name.length + 1);
                              }
                            }
                            F[c >> 2] = a.Aa;
                          } else if (35722 == b) {
                            if (!a.ya) {
                              for (b = 0; b < W.getProgramParameter(a, 35721); ++b) {
                                a.ya = Math.max(a.ya, W.getActiveAttrib(a, b).name.length + 1);
                              }
                            }
                            F[c >> 2] = a.ya;
                          } else if (35381 == b) {
                            if (!a.za) {
                              for (b = 0; b < W.getProgramParameter(a, 35382); ++b) {
                                a.za = Math.max(a.za, W.getActiveUniformBlockName(a, b).length + 1);
                              }
                            }
                            F[c >> 2] = a.za;
                          } else {
                            F[c >> 2] = W.getProgramParameter(a, b);
                          }
                        }
                      } else {
                        X ||= 1281;
                      }
                    }, glGetString: (a) => {
                      var b = Id[a];
                      if (!b) {
                        switch (a) {
                          case 7939:
                            b = Vd(Sd().join(" "));
                            break;
                          case 7936:
                          case 7937:
                          case 37445:
                          case 37446:
                            (b = W.getParameter(a)) || (X ||= 1280);
                            b = b ? Vd(b) : 0;
                            break;
                          case 7938:
                            b = Vd(`OpenGL ES 3.0 (${W.getParameter(7938)})`);
                            break;
                          case 35724:
                            b = W.getParameter(35724);
                            var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                            null !== c && (3 == c[1].length && (c[1] += "0"), b = `OpenGL ES GLSL ES ${c[1]} (${b})`);
                            b = Vd(b);
                            break;
                          default:
                            X ||= 1280;
                        }
                        Id[a] = b;
                      }
                      return b;
                    }, glGetUniformBlockIndex: (a, b) => W.getUniformBlockIndex(V[a], b ? L(D, b) : ""), glGetUniformLocation: (a, b) => {
                      b = b ? L(D, b) : "";
                      if (a = V[a]) {
                        var c = a, d = c.na, e = c.wb, f;
                        if (!d) {
                          for (c.na = d = {}, c.vb = {}, f = 0; f < W.getProgramParameter(c, 35718); ++f) {
                            var g = W.getActiveUniform(c, f);
                            var k = g.name;
                            g = g.size;
                            var n = Wd(k);
                            n = 0 < n ? k.slice(0, n) : k;
                            var m = c.Wa;
                            c.Wa += g;
                            e[n] = [g, m];
                            for (k = 0; k < g; ++k) {
                              d[m] = k, c.vb[m++] = n;
                            }
                          }
                        }
                        c = a.na;
                        d = 0;
                        e = b;
                        f = Wd(b);
                        0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
                        if ((e = a.wb[e]) && d < e[0] && (d += e[1], c[d] = c[d] || W.getUniformLocation(a, b))) {
                          return d;
                        }
                      } else {
                        X ||= 1281;
                      }
                      return -1;
                    }, glInvalidateFramebuffer: (a, b, c) => {
                      for (var d = Rd[b], e = 0; e < b; e++) {
                        d[e] = F[c + 4 * e >> 2];
                      }
                      W.invalidateFramebuffer(a, d);
                    }, glLinkProgram: (a) => {
                      a = V[a];
                      W.linkProgram(a);
                      a.na = 0;
                      a.wb = {};
                    }, glPixelStorei: (a, b) => {
                      3317 == a ? Jd = b : 3314 == a && (Kd = b);
                      W.pixelStorei(a, b);
                    }, glReadPixels: (a, b, c, d, e, f, g) => {
                      if (W.Oa) {
                        W.readPixels(a, b, c, d, e, f, g);
                      } else {
                        var k = Xd(f);
                        g >>>= 31 - Math.clz32(k.BYTES_PER_ELEMENT);
                        W.readPixels(a, b, c, d, e, f, k, g);
                      }
                    }, glRenderbufferStorageMultisample: (a, b, c, d, e) => W.renderbufferStorageMultisample(a, b, c, d, e), glScissor: (a, b, c, d) => W.scissor(a, b, c, d), glShaderSource: (a, b, c, d) => {
                      for (var e = "", f = 0; f < b; ++f) {
                        var g = (g = G[c + 4 * f >> 2]) ? L(D, g, d ? G[d + 4 * f >> 2] : void 0) : "";
                        e += g;
                      }
                      W.shaderSource(Gd[a], e);
                    }, glStencilFunc: (a, b, c) => W.stencilFunc(a, b, c), glStencilFuncSeparate: (a, b, c, d) => W.stencilFuncSeparate(a, b, c, d), glStencilMask: (a) => W.stencilMask(a), glStencilOp: (a, b, c) => W.stencilOp(a, b, c), glStencilOpSeparate: (a, b, c, d) => W.stencilOpSeparate(a, b, c, d), glTexParameteri: (a, b, c) => W.texParameteri(a, b, c), glTexStorage2D: (a, b, c, d, e) => W.texStorage2D(a, b, c, d, e), glTexStorage3D: (a, b, c, d, e, f) => W.texStorage3D(a, b, c, d, e, f), glTexSubImage2D: (a, b, c, d, e, f, g, k, n) => {
                      if (W.sa) {
                        W.texSubImage2D(a, b, c, d, e, f, g, k, n);
                      } else {
                        if (n) {
                          var m = Xd(k);
                          W.texSubImage2D(a, b, c, d, e, f, g, k, m, n >>> 31 - Math.clz32(m.BYTES_PER_ELEMENT));
                        } else {
                          if (n) {
                            m = Xd(k);
                            var t = f * ((Kd || e) * ({ 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4, 26917: 2, 26918: 2, 29846: 3, 29847: 4 }[g - 6402] || 1) * m.BYTES_PER_ELEMENT + Jd - 1 & -Jd);
                            n = m.subarray(n >>> 31 - Math.clz32(m.BYTES_PER_ELEMENT), n + t >>> 31 - Math.clz32(m.BYTES_PER_ELEMENT));
                          } else {
                            n = null;
                          }
                          W.texSubImage2D(a, b, c, d, e, f, g, k, n);
                        }
                      }
                    }, glUniform1i: (a, b) => {
                      var c = W, d = c.uniform1i;
                      var e = W.Ib;
                      if (e) {
                        var f = e.na[a];
                        "number" == typeof f && (e.na[a] = f = W.getUniformLocation(e, e.vb[a] + (0 < f ? `[${f}]` : "")));
                        a = f;
                      } else {
                        X ||= 1282, a = void 0;
                      }
                      d.call(c, a, b);
                    }, glUniformBlockBinding: (a, b, c) => {
                      a = V[a];
                      W.uniformBlockBinding(a, b, c);
                    }, glUseProgram: (a) => {
                      a = V[a];
                      W.useProgram(a);
                      W.Ib = a;
                    }, glVertexAttribDivisor: (a, b) => {
                      W.vertexAttribDivisor(a, b);
                    }, glVertexAttribIPointer: (a, b, c, d, e) => {
                      W.vertexAttribIPointer(a, b, c, d, e);
                    }, glVertexAttribPointer: (a, b, c, d, e, f) => {
                      W.vertexAttribPointer(a, b, c, !!d, e, f);
                    }, glViewport: (a, b, c, d) => W.viewport(a, b, c, d), invoke_vii: de, isWindowsBrowser: function() {
                      return -1 < navigator.platform.indexOf("Win");
                    }, provokingVertexWEBGL: function(a, b) {
                      (a = w[a].F.pb) && a.provokingVertexWEBGL(b);
                    }, strftime: $d, strftime_l: (a, b, c, d) => $d(a, b, c, d), upload_image: function(a, b) {
                      var c = l.images;
                      c && (b = c.get(b)) && (a = w[a].F, a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b), a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false));
                    }, wasm_start_image_decode: function(a, b, c) {
                      b = l.HEAP8.subarray(b, b + c);
                      c = new Uint8Array(c);
                      c.set(b);
                      createImageBitmap(new Blob([c])).then(function(d) {
                        var e = new OffscreenCanvas(d.width, d.height).getContext("2d");
                        e.drawImage(d, 0, 0);
                        e = e.getImageData(0, 0, d.width, d.height);
                        var f = e.data.length, g = l.Cb(f);
                        l.oc.set(e.data, g);
                        l.qc(a, d.width, d.height, g, f);
                      }).catch(function(d) {
                        d = d.message || "decode failed";
                        var e = l.Jc(d) + 1, f = l.Cb(e);
                        l.Rc(d, f, e);
                        l.rc(a, f);
                        l.pc(f);
                      });
                    } }, Y = function() {
                      function a(c) {
                        Y = c.exports;
                        ua = Y.memory;
                        za();
                        Qc = Y.__indirect_function_table;
                        Ba.unshift(Y.__wasm_call_ctors);
                        Ea--;
                        l.monitorRunDependencies?.(Ea);
                        0 == Ea && (null !== Fa && (clearInterval(Fa), Fa = null), Ga && (c = Ga, Ga = null, c()));
                        return Y;
                      }
                      var b = { env: ee, wasi_snapshot_preview1: ee };
                      Ea++;
                      l.monitorRunDependencies?.(Ea);
                      if (l.instantiateWasm) {
                        try {
                          return l.instantiateWasm(b, a);
                        } catch (c) {
                          sa(`Module.instantiateWasm callback failed with error: ${c}`), ba(c);
                        }
                      }
                      Ja ||= Ia("webgl2_advanced.wasm") ? "webgl2_advanced.wasm" : l.locateFile ? l.locateFile("webgl2_advanced.wasm", y) : y + "webgl2_advanced.wasm";
                      Na(b, function(c) {
                        a(c.instance);
                      }).catch(ba);
                      return {};
                    }(), lc = (a) => (lc = Y.free)(a), Ud = (a) => (Ud = Y.malloc)(a);
                    l._setWebImage = (a, b, c) => (l._setWebImage = Y.setWebImage)(a, b, c);
                    var kc = (a) => (kc = Y.__getTypeName)(a);
                    l._wasm_image_decode_complete = (a, b, c, d, e) => (l._wasm_image_decode_complete = Y.wasm_image_decode_complete)(a, b, c, d, e);
                    l._wasm_image_decode_error = (a, b) => (l._wasm_image_decode_error = Y.wasm_image_decode_error)(a, b);
                    var Qa = l._ma_device__on_notification_unlocked = (a) => (Qa = l._ma_device__on_notification_unlocked = Y.ma_device__on_notification_unlocked)(a);
                    l._ma_malloc_emscripten = (a, b) => (l._ma_malloc_emscripten = Y.ma_malloc_emscripten)(a, b);
                    l._ma_free_emscripten = (a, b) => (l._ma_free_emscripten = Y.ma_free_emscripten)(a, b);
                    var Ra = l._ma_device_process_pcm_frames_capture__webaudio = (a, b, c) => (Ra = l._ma_device_process_pcm_frames_capture__webaudio = Y.ma_device_process_pcm_frames_capture__webaudio)(a, b, c), Sa = l._ma_device_process_pcm_frames_playback__webaudio = (a, b, c) => (Sa = l._ma_device_process_pcm_frames_playback__webaudio = Y.ma_device_process_pcm_frames_playback__webaudio)(a, b, c), fe = (a, b) => (fe = Y.setThrew)(a, b), ge = (a) => (ge = Y._emscripten_stack_restore)(a), he = () => (he = Y.emscripten_stack_get_current)();
                    l.dynCall_iiiji = (a, b, c, d, e, f) => (l.dynCall_iiiji = Y.dynCall_iiiji)(a, b, c, d, e, f);
                    l.dynCall_iij = (a, b, c, d) => (l.dynCall_iij = Y.dynCall_iij)(a, b, c, d);
                    l.dynCall_iiji = (a, b, c, d, e) => (l.dynCall_iiji = Y.dynCall_iiji)(a, b, c, d, e);
                    l.dynCall_jii = (a, b, c) => (l.dynCall_jii = Y.dynCall_jii)(a, b, c);
                    l.dynCall_vijj = (a, b, c, d, e, f) => (l.dynCall_vijj = Y.dynCall_vijj)(a, b, c, d, e, f);
                    l.dynCall_jiji = (a, b, c, d, e) => (l.dynCall_jiji = Y.dynCall_jiji)(a, b, c, d, e);
                    l.dynCall_viijii = (a, b, c, d, e, f, g) => (l.dynCall_viijii = Y.dynCall_viijii)(a, b, c, d, e, f, g);
                    l.dynCall_iiiiij = (a, b, c, d, e, f, g) => (l.dynCall_iiiiij = Y.dynCall_iiiiij)(a, b, c, d, e, f, g);
                    l.dynCall_iiiiijj = (a, b, c, d, e, f, g, k, n) => (l.dynCall_iiiiijj = Y.dynCall_iiiiijj)(a, b, c, d, e, f, g, k, n);
                    l.dynCall_iiiiiijj = (a, b, c, d, e, f, g, k, n, m) => (l.dynCall_iiiiiijj = Y.dynCall_iiiiiijj)(a, b, c, d, e, f, g, k, n, m);
                    function de(a, b, c) {
                      var d = he();
                      try {
                        Rc(a)(b, c);
                      } catch (e) {
                        ge(d);
                        if (e !== e + 0) {
                          throw e;
                        }
                        fe(1, 0);
                      }
                    }
                    var ie;
                    Ga = function je() {
                      ie || ke();
                      ie || (Ga = je);
                    };
                    function ke() {
                      function a() {
                        if (!ie && (ie = true, l.calledRun = true, !va)) {
                          l.noFSInit || Vb || (Vb = true, l.stdin = l.stdin, l.stdout = l.stdout, l.stderr = l.stderr, l.stdin ? Wb("stdin", l.stdin) : Rb("/dev/tty", "/dev/stdin"), l.stdout ? Wb("stdout", null, l.stdout) : Rb("/dev/tty", "/dev/stdout"), l.stderr ? Wb("stderr", null, l.stderr) : Rb("/dev/tty1", "/dev/stderr"), Sb("/dev/stdin", 0), Sb("/dev/stdout", 1), Sb("/dev/stderr", 1));
                          Ab = false;
                          Ua(Ba);
                          aa(l);
                          if (l.onRuntimeInitialized) {
                            l.onRuntimeInitialized();
                          }
                          if (l.postRun) {
                            for ("function" == typeof l.postRun && (l.postRun = [l.postRun]); l.postRun.length; ) {
                              var b = l.postRun.shift();
                              Ca.unshift(b);
                            }
                          }
                          Ua(Ca);
                        }
                      }
                      if (!(0 < Ea)) {
                        if (l.preRun) {
                          for ("function" == typeof l.preRun && (l.preRun = [l.preRun]); l.preRun.length; ) {
                            Da();
                          }
                        }
                        Ua(Aa);
                        0 < Ea || (l.setStatus ? (l.setStatus("Running..."), setTimeout(function() {
                          setTimeout(function() {
                            l.setStatus("");
                          }, 1);
                          a();
                        }, 1)) : a());
                      }
                    }
                    if (l.preInit) {
                      for ("function" == typeof l.preInit && (l.preInit = [l.preInit]); 0 < l.preInit.length; ) {
                        l.preInit.pop()();
                      }
                    }
                    ke();
                    moduleRtn = ca;
                    return moduleRtn;
                  };
                })();
                const __WEBPACK_DEFAULT_EXPORT__ = Rive2;
              },
              /* 5 */
              /***/
              (module2) => {
                module2.exports = /* @__PURE__ */ JSON.parse(`{"name":"@rive-app/webgl2","version":"2.38.1","description":"Rive's webgl2 based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)","Chris Dalton <chris@rive.app> (https://rive.app)"],"license":"MIT","files":["rive.js","rive.wasm","rive_fallback.wasm","rive.js.map","rive.d.ts","rive_advanced.mjs.d.ts","runtimeLoader.d.ts","utils"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}`);
              },
              /* 6 */
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  AudioAssetWrapper: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.AudioAssetWrapper
                  ),
                  /* harmony export */
                  AudioWrapper: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.AudioWrapper
                  ),
                  /* harmony export */
                  BLANK_URL: () => (
                    /* reexport safe */
                    _sanitizeUrl__WEBPACK_IMPORTED_MODULE_2__.BLANK_URL
                  ),
                  /* harmony export */
                  CustomFileAssetLoaderWrapper: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.CustomFileAssetLoaderWrapper
                  ),
                  /* harmony export */
                  FileAssetWrapper: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.FileAssetWrapper
                  ),
                  /* harmony export */
                  FileFinalizer: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.FileFinalizer
                  ),
                  /* harmony export */
                  FocusSessionState: () => (
                    /* reexport safe */
                    _registerKeyboardInteractions__WEBPACK_IMPORTED_MODULE_1__.FocusSessionState
                  ),
                  /* harmony export */
                  FontAssetWrapper: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.FontAssetWrapper
                  ),
                  /* harmony export */
                  FontWrapper: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.FontWrapper
                  ),
                  /* harmony export */
                  ImageAssetWrapper: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.ImageAssetWrapper
                  ),
                  /* harmony export */
                  ImageWrapper: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.ImageWrapper
                  ),
                  /* harmony export */
                  KeyboardInteractions: () => (
                    /* reexport safe */
                    _registerKeyboardInteractions__WEBPACK_IMPORTED_MODULE_1__.KeyboardInteractions
                  ),
                  /* harmony export */
                  RiveFont: () => (
                    /* reexport safe */
                    _riveFont__WEBPACK_IMPORTED_MODULE_4__.RiveFont
                  ),
                  /* harmony export */
                  createFinalization: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.createFinalization
                  ),
                  /* harmony export */
                  finalizationRegistry: () => (
                    /* reexport safe */
                    _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__.finalizationRegistry
                  ),
                  /* harmony export */
                  registerTouchInteractions: () => (
                    /* reexport safe */
                    _registerTouchInteractions__WEBPACK_IMPORTED_MODULE_0__.registerTouchInteractions
                  ),
                  /* harmony export */
                  sanitizeUrl: () => (
                    /* reexport safe */
                    _sanitizeUrl__WEBPACK_IMPORTED_MODULE_2__.sanitizeUrl
                  )
                  /* harmony export */
                });
                var _registerTouchInteractions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(7);
                var _registerKeyboardInteractions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(8);
                var _sanitizeUrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__2(9);
                var _finalizationRegistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__2(10);
                var _riveFont__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__2(11);
              },
              /* 7 */
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  registerTouchInteractions: () => (
                    /* binding */
                    registerTouchInteractions
                  )
                  /* harmony export */
                });
                var _this = void 0;
                var getTouchCoordinates = function(changedTouches, enableMultiTouch, primaryTouchId) {
                  var _a;
                  var coordinates = [];
                  if (enableMultiTouch) {
                    for (var i = 0; i < changedTouches.length; i++) {
                      var touch = changedTouches[i];
                      coordinates.push({
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                        identifier: touch.identifier
                      });
                    }
                  } else {
                    var primaryTouch = primaryTouchId !== null ? (_a = Array.from(changedTouches).find(function(t) {
                      return t.identifier === primaryTouchId;
                    })) !== null && _a !== void 0 ? _a : null : changedTouches[0];
                    if (primaryTouch) {
                      coordinates.push({
                        clientX: primaryTouch.clientX,
                        clientY: primaryTouch.clientY,
                        identifier: primaryTouch.identifier
                      });
                    }
                  }
                  return coordinates;
                };
                var getClientCoordinates = function(event, isTouchScrollEnabled, enableMultiTouch, primaryTouchId) {
                  var _a;
                  var touchEvent = event;
                  if ((_a = touchEvent.changedTouches) === null || _a === void 0 ? void 0 : _a.length) {
                    if (!isTouchScrollEnabled && ["touchstart", "touchmove"].includes(event.type)) {
                      event.preventDefault();
                    }
                    return getTouchCoordinates(touchEvent.changedTouches, enableMultiTouch, primaryTouchId);
                  }
                  return [
                    {
                      clientX: event.clientX,
                      clientY: event.clientY,
                      identifier: 0
                    }
                  ];
                };
                var registerTouchInteractions = function(_a) {
                  var canvas = _a.canvas, artboard = _a.artboard, _b = _a.stateMachines, stateMachines = _b === void 0 ? [] : _b, renderer = _a.renderer, rive = _a.rive, fit = _a.fit, alignment = _a.alignment, _c = _a.isTouchScrollEnabled, isTouchScrollEnabled = _c === void 0 ? false : _c, _d = _a.dispatchPointerExit, dispatchPointerExit = _d === void 0 ? true : _d, _e = _a.enableMultiTouch, enableMultiTouch = _e === void 0 ? false : _e, _f = _a.layoutScaleFactor, layoutScaleFactor = _f === void 0 ? 1 : _f, advanceAndDrain = _a.advanceAndDrain;
                  if (!canvas || !stateMachines.length || !renderer || !rive || !artboard || typeof window === "undefined") {
                    return null;
                  }
                  var _prevEventType = null;
                  var _syntheticEventsActive = false;
                  var _primaryTouchId = null;
                  var processEventCallback = function(event) {
                    var _a2;
                    if (_syntheticEventsActive && event instanceof MouseEvent) {
                      if (event.type == "mouseup") {
                        _syntheticEventsActive = false;
                      }
                      return;
                    }
                    _syntheticEventsActive = isTouchScrollEnabled && event.type === "touchend" && _prevEventType === "touchstart";
                    _prevEventType = event.type;
                    var boundingRect = event.currentTarget.getBoundingClientRect();
                    if (!enableMultiTouch && event.type === "touchstart" && _primaryTouchId === null) {
                      var firstTouch = (_a2 = event.changedTouches) === null || _a2 === void 0 ? void 0 : _a2[0];
                      if (firstTouch) {
                        _primaryTouchId = firstTouch.identifier;
                      }
                    }
                    var coordinateSets = getClientCoordinates(event, isTouchScrollEnabled, enableMultiTouch, enableMultiTouch ? null : _primaryTouchId);
                    var forwardMatrix = rive.computeAlignment(fit, alignment, {
                      minX: 0,
                      minY: 0,
                      maxX: boundingRect.width,
                      maxY: boundingRect.height
                    }, artboard.bounds, layoutScaleFactor);
                    var invertedMatrix = new rive.Mat2D();
                    forwardMatrix.invert(invertedMatrix);
                    coordinateSets.forEach(function(coordinateSet) {
                      var clientX = coordinateSet.clientX;
                      var clientY = coordinateSet.clientY;
                      if (!clientX && !clientY) {
                        return;
                      }
                      var canvasX = clientX - boundingRect.left;
                      var canvasY = clientY - boundingRect.top;
                      var canvasCoordinatesVector = new rive.Vec2D(canvasX, canvasY);
                      var transformedVector = rive.mapXY(invertedMatrix, canvasCoordinatesVector);
                      var transformedX = transformedVector.x();
                      var transformedY = transformedVector.y();
                      coordinateSet.transformedX = transformedX;
                      coordinateSet.transformedY = transformedY;
                      transformedVector.delete();
                      canvasCoordinatesVector.delete();
                    });
                    invertedMatrix.delete();
                    forwardMatrix.delete();
                    switch (event.type) {
                      /**
                       * There's a 2px buffer for a hitRadius when translating the pointer coordinates
                       * down to the state machine. In cases where the hitbox is about that much away
                       * from the Artboard border, we don't have exact precision on determining pointer
                       * exit. We're therefore adding to the translated coordinates on mouseout of a canvas
                       * to ensure that we report the mouse has truly exited the hitarea.
                       * https://github.com/rive-app/rive-cpp/blob/master/src/animation/state_machine_instance.cpp#L336
                       *
                       */
                      case "mouseout":
                        var _loop_1 = function(stateMachine2) {
                          if (dispatchPointerExit) {
                            coordinateSets.forEach(function(coordinateSet) {
                              stateMachine2.pointerExit(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                            });
                          } else {
                            coordinateSets.forEach(function(coordinateSet) {
                              stateMachine2.pointerMove(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                            });
                          }
                        };
                        for (var _i = 0, stateMachines_1 = stateMachines; _i < stateMachines_1.length; _i++) {
                          var stateMachine = stateMachines_1[_i];
                          _loop_1(stateMachine);
                        }
                        break;
                      // Pointer moving/hovering on the canvas
                      case "touchmove":
                      case "mouseover":
                      case "mousemove": {
                        var _loop_2 = function(stateMachine2) {
                          coordinateSets.forEach(function(coordinateSet) {
                            stateMachine2.pointerMove(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                          });
                        };
                        for (var _b2 = 0, stateMachines_2 = stateMachines; _b2 < stateMachines_2.length; _b2++) {
                          var stateMachine = stateMachines_2[_b2];
                          _loop_2(stateMachine);
                        }
                        break;
                      }
                      // Pointer click initiated but not released yet on the canvas
                      case "touchstart":
                      case "mousedown": {
                        var _loop_3 = function(stateMachine2) {
                          coordinateSets.forEach(function(coordinateSet) {
                            stateMachine2.pointerDown(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                          });
                        };
                        for (var _c2 = 0, stateMachines_3 = stateMachines; _c2 < stateMachines_3.length; _c2++) {
                          var stateMachine = stateMachines_3[_c2];
                          _loop_3(stateMachine);
                        }
                        advanceAndDrain(0);
                        break;
                      }
                      // Pointer click released on the canvas
                      case "touchend": {
                        var _loop_4 = function(stateMachine2) {
                          coordinateSets.forEach(function(coordinateSet) {
                            stateMachine2.pointerUp(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                            stateMachine2.pointerExit(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                          });
                        };
                        for (var _d2 = 0, stateMachines_4 = stateMachines; _d2 < stateMachines_4.length; _d2++) {
                          var stateMachine = stateMachines_4[_d2];
                          _loop_4(stateMachine);
                        }
                        advanceAndDrain(0);
                        if (!enableMultiTouch && coordinateSets.some(function(c) {
                          return c.identifier === _primaryTouchId;
                        })) {
                          _primaryTouchId = null;
                        }
                        break;
                      }
                      case "mouseup": {
                        var _loop_5 = function(stateMachine2) {
                          coordinateSets.forEach(function(coordinateSet) {
                            stateMachine2.pointerUp(coordinateSet.transformedX, coordinateSet.transformedY, coordinateSet.identifier);
                          });
                        };
                        for (var _e2 = 0, stateMachines_5 = stateMachines; _e2 < stateMachines_5.length; _e2++) {
                          var stateMachine = stateMachines_5[_e2];
                          _loop_5(stateMachine);
                        }
                        advanceAndDrain(0);
                        break;
                      }
                      default:
                    }
                  };
                  var touchCancelCallback = function() {
                    _primaryTouchId = null;
                  };
                  var callback = processEventCallback.bind(_this);
                  canvas.addEventListener("mouseover", callback);
                  canvas.addEventListener("mouseout", callback);
                  canvas.addEventListener("mousemove", callback);
                  canvas.addEventListener("mousedown", callback);
                  canvas.addEventListener("mouseup", callback);
                  canvas.addEventListener("touchmove", callback, {
                    passive: isTouchScrollEnabled
                  });
                  canvas.addEventListener("touchstart", callback, {
                    passive: isTouchScrollEnabled
                  });
                  canvas.addEventListener("touchend", callback);
                  canvas.addEventListener("touchcancel", touchCancelCallback);
                  return function() {
                    canvas.removeEventListener("mouseover", callback);
                    canvas.removeEventListener("mouseout", callback);
                    canvas.removeEventListener("mousemove", callback);
                    canvas.removeEventListener("mousedown", callback);
                    canvas.removeEventListener("mouseup", callback);
                    canvas.removeEventListener("touchmove", callback);
                    canvas.removeEventListener("touchstart", callback);
                    canvas.removeEventListener("touchend", callback);
                    canvas.removeEventListener("touchcancel", touchCancelCallback);
                  };
                };
              },
              /* 8 */
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  FocusSessionState: () => (
                    /* binding */
                    FocusSessionState
                  ),
                  /* harmony export */
                  KeyboardInteractions: () => (
                    /* binding */
                    KeyboardInteractions
                  )
                  /* harmony export */
                });
                var FocusSessionState;
                (function(FocusSessionState2) {
                  FocusSessionState2["NotFocused"] = "notFocused";
                  FocusSessionState2["EntryPending"] = "entryPending";
                  FocusSessionState2["RiveFocused"] = "riveFocused";
                })(FocusSessionState || (FocusSessionState = {}));
                var KeyboardInteractions = (
                  /** @class */
                  function() {
                    function KeyboardInteractions2(_a) {
                      var canvas = _a.canvas, stateMachine = _a.stateMachine, hasFocusNodes = _a.hasFocusNodes;
                      var _this = this;
                      this.focusSessionState = FocusSessionState.NotFocused;
                      this.onCanvasFocus = function(event) {
                        if (!_this.hasFocusNodes)
                          return;
                        if (_this.mainSm.focusState().hasFocus)
                          return;
                        _this.focusSessionState = FocusSessionState.EntryPending;
                        if (!_this.isKeyboardDrivenFocus())
                          return;
                        var forward = _this.cameFromBeforeCanvas(event.relatedTarget);
                        if (forward ? _this.mainSm.focusNext() : _this.mainSm.focusPrevious()) {
                          _this.focusSessionState = FocusSessionState.RiveFocused;
                        }
                      };
                      this.onCanvasBlur = function(_event) {
                        _this.focusSessionState = FocusSessionState.NotFocused;
                      };
                      this.onKeyDown = function(event) {
                        if (_this.focusSessionState === FocusSessionState.NotFocused)
                          return;
                        if (event.code === "Tab" && _this.hasFocusNodes) {
                          var forward = !event.shiftKey;
                          var focusMoved = forward ? _this.mainSm.focusNext() : _this.mainSm.focusPrevious();
                          if (focusMoved) {
                            _this.focusSessionState = FocusSessionState.RiveFocused;
                            event.preventDefault();
                          } else {
                            _this.focusSessionState = FocusSessionState.NotFocused;
                          }
                        }
                      };
                      this.canvas = canvas;
                      this.mainSm = stateMachine;
                      this.hasFocusNodes = hasFocusNodes;
                      canvas.addEventListener("focus", this.onCanvasFocus);
                      canvas.addEventListener("blur", this.onCanvasBlur);
                      canvas.addEventListener("keydown", this.onKeyDown);
                    }
                    KeyboardInteractions2.prototype.setFocusSessionState = function(state) {
                      this.focusSessionState = state;
                    };
                    KeyboardInteractions2.prototype.notifyRiveFocused = function() {
                      this.focusSessionState = FocusSessionState.RiveFocused;
                    };
                    KeyboardInteractions2.prototype.isKeyboardDrivenFocus = function() {
                      try {
                        return this.canvas.matches(":focus-visible");
                      } catch (_a) {
                        return false;
                      }
                    };
                    KeyboardInteractions2.prototype.cameFromBeforeCanvas = function(from) {
                      if (!from)
                        return true;
                      var position = this.canvas.compareDocumentPosition(from);
                      if (position & Node.DOCUMENT_POSITION_PRECEDING)
                        return true;
                      if (position & Node.DOCUMENT_POSITION_FOLLOWING)
                        return false;
                      return true;
                    };
                    KeyboardInteractions2.prototype.cleanup = function() {
                      this.canvas.removeEventListener("focus", this.onCanvasFocus);
                      this.canvas.removeEventListener("blur", this.onCanvasBlur);
                      this.canvas.removeEventListener("keydown", this.onKeyDown);
                    };
                    return KeyboardInteractions2;
                  }()
                );
              },
              /* 9 */
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  BLANK_URL: () => (
                    /* binding */
                    BLANK_URL
                  ),
                  /* harmony export */
                  sanitizeUrl: () => (
                    /* binding */
                    sanitizeUrl
                  )
                  /* harmony export */
                });
                var invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
                var htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
                var htmlCtrlEntityRegex = /&(newline|tab);/gi;
                var ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
                var urlSchemeRegex = /^.+(:|&colon;)/gim;
                var relativeFirstCharacters = [".", "/"];
                var BLANK_URL = "about:blank";
                function isRelativeUrlWithoutProtocol(url) {
                  return relativeFirstCharacters.indexOf(url[0]) > -1;
                }
                function decodeHtmlCharacters(str) {
                  var removedNullByte = str.replace(ctrlCharactersRegex, "");
                  return removedNullByte.replace(htmlEntitiesRegex, function(match, dec) {
                    return String.fromCharCode(dec);
                  });
                }
                function sanitizeUrl(url) {
                  if (!url) {
                    return BLANK_URL;
                  }
                  var sanitizedUrl = decodeHtmlCharacters(url).replace(htmlCtrlEntityRegex, "").replace(ctrlCharactersRegex, "").trim();
                  if (!sanitizedUrl) {
                    return BLANK_URL;
                  }
                  if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
                    return sanitizedUrl;
                  }
                  var urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);
                  if (!urlSchemeParseResults) {
                    return sanitizedUrl;
                  }
                  var urlScheme = urlSchemeParseResults[0];
                  if (invalidProtocolRegex.test(urlScheme)) {
                    return BLANK_URL;
                  }
                  return sanitizedUrl;
                }
              },
              /* 10 */
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  AudioAssetWrapper: () => (
                    /* binding */
                    AudioAssetWrapper
                  ),
                  /* harmony export */
                  AudioWrapper: () => (
                    /* binding */
                    AudioWrapper
                  ),
                  /* harmony export */
                  CustomFileAssetLoaderWrapper: () => (
                    /* binding */
                    CustomFileAssetLoaderWrapper
                  ),
                  /* harmony export */
                  FileAssetWrapper: () => (
                    /* binding */
                    FileAssetWrapper
                  ),
                  /* harmony export */
                  FileFinalizer: () => (
                    /* binding */
                    FileFinalizer
                  ),
                  /* harmony export */
                  FontAssetWrapper: () => (
                    /* binding */
                    FontAssetWrapper
                  ),
                  /* harmony export */
                  FontWrapper: () => (
                    /* binding */
                    FontWrapper
                  ),
                  /* harmony export */
                  ImageAssetWrapper: () => (
                    /* binding */
                    ImageAssetWrapper
                  ),
                  /* harmony export */
                  ImageWrapper: () => (
                    /* binding */
                    ImageWrapper
                  ),
                  /* harmony export */
                  createFinalization: () => (
                    /* binding */
                    createFinalization
                  ),
                  /* harmony export */
                  finalizationRegistry: () => (
                    /* binding */
                    finalizationRegistry
                  )
                  /* harmony export */
                });
                var __extends = /* @__PURE__ */ function() {
                  var extendStatics = function(d, b) {
                    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                      d2.__proto__ = b2;
                    } || function(d2, b2) {
                      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
                    };
                    return extendStatics(d, b);
                  };
                  return function(d, b) {
                    if (typeof b !== "function" && b !== null)
                      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    extendStatics(d, b);
                    function __() {
                      this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                  };
                }();
                var FileFinalizer = (
                  /** @class */
                  function() {
                    function FileFinalizer2(file) {
                      this.selfUnref = false;
                      this._file = file;
                    }
                    FileFinalizer2.prototype.unref = function() {
                      if (this._file) {
                        this._file.unref();
                      }
                    };
                    return FileFinalizer2;
                  }()
                );
                var ObjectFinalizer = (
                  /** @class */
                  function() {
                    function ObjectFinalizer2(finalizableObject) {
                      this._finalizableObject = finalizableObject;
                    }
                    ObjectFinalizer2.prototype.unref = function() {
                      this._finalizableObject.unref();
                    };
                    return ObjectFinalizer2;
                  }()
                );
                var AssetWrapper = (
                  /** @class */
                  function() {
                    function AssetWrapper2() {
                      this.selfUnref = false;
                    }
                    AssetWrapper2.prototype.unref = function() {
                    };
                    return AssetWrapper2;
                  }()
                );
                var ImageWrapper = (
                  /** @class */
                  function(_super) {
                    __extends(ImageWrapper2, _super);
                    function ImageWrapper2(image) {
                      var _this = _super.call(this) || this;
                      _this._nativeImage = image;
                      return _this;
                    }
                    Object.defineProperty(ImageWrapper2.prototype, "nativeImage", {
                      get: function() {
                        return this._nativeImage;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    ImageWrapper2.prototype.unref = function() {
                      if (this.selfUnref) {
                        this._nativeImage.unref();
                      }
                    };
                    return ImageWrapper2;
                  }(AssetWrapper)
                );
                var AudioWrapper = (
                  /** @class */
                  function(_super) {
                    __extends(AudioWrapper2, _super);
                    function AudioWrapper2(audio) {
                      var _this = _super.call(this) || this;
                      _this._nativeAudio = audio;
                      return _this;
                    }
                    Object.defineProperty(AudioWrapper2.prototype, "nativeAudio", {
                      get: function() {
                        return this._nativeAudio;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    AudioWrapper2.prototype.unref = function() {
                      if (this.selfUnref) {
                        this._nativeAudio.unref();
                      }
                    };
                    return AudioWrapper2;
                  }(AssetWrapper)
                );
                var FontWrapper = (
                  /** @class */
                  function(_super) {
                    __extends(FontWrapper2, _super);
                    function FontWrapper2(font) {
                      var _this = _super.call(this) || this;
                      _this._nativeFont = font;
                      return _this;
                    }
                    Object.defineProperty(FontWrapper2.prototype, "nativeFont", {
                      get: function() {
                        return this._nativeFont;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    FontWrapper2.prototype.unref = function() {
                      if (this.selfUnref) {
                        this._nativeFont.unref();
                      }
                    };
                    return FontWrapper2;
                  }(AssetWrapper)
                );
                var CustomFileAssetLoaderWrapper = (
                  /** @class */
                  function() {
                    function CustomFileAssetLoaderWrapper2(runtime, loaderCallback) {
                      this._assetLoaderCallback = loaderCallback;
                      this.assetLoader = new runtime.CustomFileAssetLoader({
                        loadContents: this.loadContents.bind(this)
                      });
                    }
                    CustomFileAssetLoaderWrapper2.prototype.loadContents = function(asset, bytes) {
                      var assetWrapper;
                      if (asset.isImage) {
                        assetWrapper = new ImageAssetWrapper(asset);
                      } else if (asset.isAudio) {
                        assetWrapper = new AudioAssetWrapper(asset);
                      } else if (asset.isFont) {
                        assetWrapper = new FontAssetWrapper(asset);
                      } else {
                        return false;
                      }
                      return this._assetLoaderCallback(assetWrapper, bytes);
                    };
                    return CustomFileAssetLoaderWrapper2;
                  }()
                );
                var FileAssetWrapper = (
                  /** @class */
                  function() {
                    function FileAssetWrapper2(nativeAsset) {
                      this._nativeFileAsset = nativeAsset;
                    }
                    FileAssetWrapper2.prototype.decode = function(bytes) {
                      this._nativeFileAsset.decode(bytes);
                    };
                    Object.defineProperty(FileAssetWrapper2.prototype, "name", {
                      get: function() {
                        return this._nativeFileAsset.name;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FileAssetWrapper2.prototype, "fileExtension", {
                      get: function() {
                        return this._nativeFileAsset.fileExtension;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FileAssetWrapper2.prototype, "uniqueFilename", {
                      get: function() {
                        return this._nativeFileAsset.uniqueFilename;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FileAssetWrapper2.prototype, "isAudio", {
                      get: function() {
                        return this._nativeFileAsset.isAudio;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FileAssetWrapper2.prototype, "isImage", {
                      get: function() {
                        return this._nativeFileAsset.isImage;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FileAssetWrapper2.prototype, "isFont", {
                      get: function() {
                        return this._nativeFileAsset.isFont;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FileAssetWrapper2.prototype, "cdnUuid", {
                      get: function() {
                        return this._nativeFileAsset.cdnUuid;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    Object.defineProperty(FileAssetWrapper2.prototype, "nativeFileAsset", {
                      get: function() {
                        return this._nativeFileAsset;
                      },
                      enumerable: false,
                      configurable: true
                    });
                    return FileAssetWrapper2;
                  }()
                );
                var ImageAssetWrapper = (
                  /** @class */
                  function(_super) {
                    __extends(ImageAssetWrapper2, _super);
                    function ImageAssetWrapper2() {
                      return _super !== null && _super.apply(this, arguments) || this;
                    }
                    ImageAssetWrapper2.prototype.setRenderImage = function(image) {
                      this._nativeFileAsset.setRenderImage(image.nativeImage);
                    };
                    return ImageAssetWrapper2;
                  }(FileAssetWrapper)
                );
                var AudioAssetWrapper = (
                  /** @class */
                  function(_super) {
                    __extends(AudioAssetWrapper2, _super);
                    function AudioAssetWrapper2() {
                      return _super !== null && _super.apply(this, arguments) || this;
                    }
                    AudioAssetWrapper2.prototype.setAudioSource = function(audio) {
                      this._nativeFileAsset.setAudioSource(audio.nativeAudio);
                    };
                    return AudioAssetWrapper2;
                  }(FileAssetWrapper)
                );
                var FontAssetWrapper = (
                  /** @class */
                  function(_super) {
                    __extends(FontAssetWrapper2, _super);
                    function FontAssetWrapper2() {
                      return _super !== null && _super.apply(this, arguments) || this;
                    }
                    FontAssetWrapper2.prototype.setFont = function(font) {
                      this._nativeFileAsset.setFont(font.nativeFont);
                    };
                    return FontAssetWrapper2;
                  }(FileAssetWrapper)
                );
                var FakeFinalizationRegistry = (
                  /** @class */
                  function() {
                    function FakeFinalizationRegistry2(_) {
                    }
                    FakeFinalizationRegistry2.prototype.register = function(object) {
                      object.selfUnref = true;
                    };
                    FakeFinalizationRegistry2.prototype.unregister = function(_) {
                    };
                    return FakeFinalizationRegistry2;
                  }()
                );
                var MyFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : FakeFinalizationRegistry;
                var finalizationRegistry = new MyFinalizationRegistry(function(ob) {
                  ob === null || ob === void 0 ? void 0 : ob.unref();
                });
                var createFinalization = function(target, finalizable) {
                  var finalizer = new ObjectFinalizer(finalizable);
                  finalizationRegistry.register(target, finalizer);
                };
              },
              /* 11 */
              /***/
              (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
                __webpack_require__2.r(__webpack_exports__2);
                __webpack_require__2.d(__webpack_exports__2, {
                  /* harmony export */
                  RiveFont: () => (
                    /* binding */
                    RiveFont
                  )
                  /* harmony export */
                });
                var _runtimeLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(3);
                var RiveFont = (
                  /** @class */
                  function() {
                    function RiveFont2() {
                    }
                    RiveFont2.setFallbackFontCallback = function(fontCallback) {
                      RiveFont2._fallbackFontCallback = fontCallback !== null && fontCallback !== void 0 ? fontCallback : null;
                      RiveFont2._wireFallbackProc();
                    };
                    RiveFont2._fontToPtr = function(fontWrapper) {
                      var _a;
                      if (fontWrapper == null)
                        return null;
                      var embindFont = fontWrapper.nativeFont;
                      var ptr = (_a = embindFont === null || embindFont === void 0 ? void 0 : embindFont.ptr) === null || _a === void 0 ? void 0 : _a.call(embindFont);
                      return ptr !== null && ptr !== void 0 ? ptr : null;
                    };
                    RiveFont2._getFallbackPtr = function(fonts, index) {
                      if (index < 0 || index >= fonts.length)
                        return null;
                      return RiveFont2._fontToPtr(fonts[index]);
                    };
                    RiveFont2._wireFallbackProc = function() {
                      _runtimeLoader__WEBPACK_IMPORTED_MODULE_0__.RuntimeLoader.getInstance(function(rive) {
                        var cb = RiveFont2._fallbackFontCallback;
                        if (cb) {
                          rive.setFallbackFontCallback(function(missingGlyph, fallbackFontIndex, weight) {
                            var fontsReturned = cb(missingGlyph, weight);
                            if (fontsReturned) {
                              if (Array.isArray(fontsReturned)) {
                                return RiveFont2._getFallbackPtr(fontsReturned, fallbackFontIndex);
                              }
                              return fallbackFontIndex === 0 ? RiveFont2._fontToPtr(fontsReturned) : null;
                            }
                            return null;
                          });
                        } else {
                          rive.setFallbackFontCallback(null);
                        }
                      });
                    };
                    RiveFont2._fallbackFontCallback = null;
                    return RiveFont2;
                  }()
                );
              }
              /******/
            ];
            var __webpack_module_cache__ = {};
            function __webpack_require__(moduleId) {
              var cachedModule = __webpack_module_cache__[moduleId];
              if (cachedModule !== void 0) {
                return cachedModule.exports;
              }
              var module2 = __webpack_module_cache__[moduleId] = {
                /******/
                // no module.id needed
                /******/
                // no module.loaded needed
                /******/
                exports: {}
                /******/
              };
              __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
              return module2.exports;
            }
            (() => {
              __webpack_require__.d = (exports2, definition) => {
                for (var key in definition) {
                  if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                    Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                  }
                }
              };
            })();
            (() => {
              __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
            })();
            (() => {
              __webpack_require__.r = (exports2) => {
                if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
                }
                Object.defineProperty(exports2, "__esModule", { value: true });
              };
            })();
            var __webpack_exports__ = {};
            (() => {
              __webpack_require__.r(__webpack_exports__);
              __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                Alignment: () => (
                  /* binding */
                  Alignment2
                ),
                /* harmony export */
                DataEnum: () => (
                  /* binding */
                  DataEnum
                ),
                /* harmony export */
                DataType: () => (
                  /* binding */
                  DataType
                ),
                /* harmony export */
                DrawOptimizationOptions: () => (
                  /* binding */
                  DrawOptimizationOptions
                ),
                /* harmony export */
                EventType: () => (
                  /* binding */
                  EventType2
                ),
                /* harmony export */
                Fit: () => (
                  /* binding */
                  Fit2
                ),
                /* harmony export */
                Layout: () => (
                  /* binding */
                  Layout2
                ),
                /* harmony export */
                LoopType: () => (
                  /* binding */
                  LoopType
                ),
                /* harmony export */
                Rive: () => (
                  /* binding */
                  Rive2
                ),
                /* harmony export */
                RiveEventType: () => (
                  /* binding */
                  RiveEventType
                ),
                /* harmony export */
                RiveFile: () => (
                  /* binding */
                  RiveFile
                ),
                /* harmony export */
                RiveFont: () => (
                  /* reexport safe */
                  _utils__WEBPACK_IMPORTED_MODULE_2__.RiveFont
                ),
                /* harmony export */
                RuntimeLoader: () => (
                  /* reexport safe */
                  _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader
                ),
                /* harmony export */
                StateMachineInput: () => (
                  /* binding */
                  StateMachineInput
                ),
                /* harmony export */
                StateMachineInputType: () => (
                  /* binding */
                  StateMachineInputType
                ),
                /* harmony export */
                Testing: () => (
                  /* binding */
                  Testing
                ),
                /* harmony export */
                ViewModel: () => (
                  /* binding */
                  ViewModel
                ),
                /* harmony export */
                ViewModelInstance: () => (
                  /* binding */
                  ViewModelInstance
                ),
                /* harmony export */
                ViewModelInstanceArtboard: () => (
                  /* binding */
                  ViewModelInstanceArtboard
                ),
                /* harmony export */
                ViewModelInstanceAssetImage: () => (
                  /* binding */
                  ViewModelInstanceAssetImage
                ),
                /* harmony export */
                ViewModelInstanceBoolean: () => (
                  /* binding */
                  ViewModelInstanceBoolean
                ),
                /* harmony export */
                ViewModelInstanceColor: () => (
                  /* binding */
                  ViewModelInstanceColor
                ),
                /* harmony export */
                ViewModelInstanceEnum: () => (
                  /* binding */
                  ViewModelInstanceEnum
                ),
                /* harmony export */
                ViewModelInstanceList: () => (
                  /* binding */
                  ViewModelInstanceList
                ),
                /* harmony export */
                ViewModelInstanceNumber: () => (
                  /* binding */
                  ViewModelInstanceNumber
                ),
                /* harmony export */
                ViewModelInstanceString: () => (
                  /* binding */
                  ViewModelInstanceString
                ),
                /* harmony export */
                ViewModelInstanceTrigger: () => (
                  /* binding */
                  ViewModelInstanceTrigger
                ),
                /* harmony export */
                ViewModelInstanceValue: () => (
                  /* binding */
                  ViewModelInstanceValue
                ),
                /* harmony export */
                decodeAudio: () => (
                  /* binding */
                  decodeAudio
                ),
                /* harmony export */
                decodeFont: () => (
                  /* binding */
                  decodeFont
                ),
                /* harmony export */
                decodeImage: () => (
                  /* binding */
                  decodeImage
                )
                /* harmony export */
              });
              var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
              var _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
              var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
              var __extends = /* @__PURE__ */ function() {
                var extendStatics = function(d, b) {
                  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                    d2.__proto__ = b2;
                  } || function(d2, b2) {
                    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
                  };
                  return extendStatics(d, b);
                };
                return function(d, b) {
                  if (typeof b !== "function" && b !== null)
                    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                  extendStatics(d, b);
                  function __() {
                    this.constructor = d;
                  }
                  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
              }();
              var __assign = function() {
                __assign = Object.assign || function(t) {
                  for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                      t[p] = s[p];
                  }
                  return t;
                };
                return __assign.apply(this, arguments);
              };
              var __awaiter = function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              var __generator = function(thisArg, body) {
                var _ = { label: 0, sent: function() {
                  if (t[0] & 1) throw t[1];
                  return t[1];
                }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
                return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                  return this;
                }), g;
                function verb(n) {
                  return function(v) {
                    return step([n, v]);
                  };
                }
                function step(op) {
                  if (f) throw new TypeError("Generator is already executing.");
                  while (g && (g = 0, op[0] && (_ = 0)), _) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                      case 0:
                      case 1:
                        t = op;
                        break;
                      case 4:
                        _.label++;
                        return { value: op[1], done: false };
                      case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                      case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                      default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                          _ = 0;
                          continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                          _.label = op[1];
                          break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                          _.label = t[1];
                          t = op;
                          break;
                        }
                        if (t && _.label < t[2]) {
                          _.label = t[2];
                          _.ops.push(op);
                          break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                  } catch (e) {
                    op = [6, e];
                    y = 0;
                  } finally {
                    f = t = 0;
                  }
                  if (op[0] & 5) throw op[1];
                  return { value: op[0] ? op[1] : void 0, done: true };
                }
              };
              var __spreadArray = function(to, from, pack) {
                if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
                  if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                  }
                }
                return to.concat(ar || Array.prototype.slice.call(from));
              };
              var RiveError = (
                /** @class */
                function(_super) {
                  __extends(RiveError2, _super);
                  function RiveError2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isHandledError = true;
                    return _this;
                  }
                  return RiveError2;
                }(Error)
              );
              var resolveErrorMessage = function(error) {
                return error && error.isHandledError ? error.message : "Problem loading file; may be corrupt!";
              };
              var Fit2;
              (function(Fit3) {
                Fit3["Cover"] = "cover";
                Fit3["Contain"] = "contain";
                Fit3["Fill"] = "fill";
                Fit3["FitWidth"] = "fitWidth";
                Fit3["FitHeight"] = "fitHeight";
                Fit3["None"] = "none";
                Fit3["ScaleDown"] = "scaleDown";
                Fit3["Layout"] = "layout";
              })(Fit2 || (Fit2 = {}));
              var Alignment2;
              (function(Alignment3) {
                Alignment3["Center"] = "center";
                Alignment3["TopLeft"] = "topLeft";
                Alignment3["TopCenter"] = "topCenter";
                Alignment3["TopRight"] = "topRight";
                Alignment3["CenterLeft"] = "centerLeft";
                Alignment3["CenterRight"] = "centerRight";
                Alignment3["BottomLeft"] = "bottomLeft";
                Alignment3["BottomCenter"] = "bottomCenter";
                Alignment3["BottomRight"] = "bottomRight";
              })(Alignment2 || (Alignment2 = {}));
              var DrawOptimizationOptions;
              (function(DrawOptimizationOptions2) {
                DrawOptimizationOptions2["AlwaysDraw"] = "alwaysDraw";
                DrawOptimizationOptions2["DrawOnChanged"] = "drawOnChanged";
              })(DrawOptimizationOptions || (DrawOptimizationOptions = {}));
              var Layout2 = (
                /** @class */
                function() {
                  function Layout3(params) {
                    var _a, _b, _c, _d, _e, _f, _g;
                    this.fit = (_a = params === null || params === void 0 ? void 0 : params.fit) !== null && _a !== void 0 ? _a : Fit2.Contain;
                    this.alignment = (_b = params === null || params === void 0 ? void 0 : params.alignment) !== null && _b !== void 0 ? _b : Alignment2.Center;
                    this.layoutScaleFactor = (_c = params === null || params === void 0 ? void 0 : params.layoutScaleFactor) !== null && _c !== void 0 ? _c : 1;
                    this.minX = (_d = params === null || params === void 0 ? void 0 : params.minX) !== null && _d !== void 0 ? _d : 0;
                    this.minY = (_e = params === null || params === void 0 ? void 0 : params.minY) !== null && _e !== void 0 ? _e : 0;
                    this.maxX = (_f = params === null || params === void 0 ? void 0 : params.maxX) !== null && _f !== void 0 ? _f : 0;
                    this.maxY = (_g = params === null || params === void 0 ? void 0 : params.maxY) !== null && _g !== void 0 ? _g : 0;
                  }
                  Layout3.new = function(_a) {
                    var fit = _a.fit, alignment = _a.alignment, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
                    console.warn("This function is deprecated: please use `new Layout({})` instead");
                    return new Layout3({ fit, alignment, minX, minY, maxX, maxY });
                  };
                  Layout3.prototype.copyWith = function(_a) {
                    var fit = _a.fit, alignment = _a.alignment, layoutScaleFactor = _a.layoutScaleFactor, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
                    return new Layout3({
                      fit: fit !== null && fit !== void 0 ? fit : this.fit,
                      alignment: alignment !== null && alignment !== void 0 ? alignment : this.alignment,
                      layoutScaleFactor: layoutScaleFactor !== null && layoutScaleFactor !== void 0 ? layoutScaleFactor : this.layoutScaleFactor,
                      minX: minX !== null && minX !== void 0 ? minX : this.minX,
                      minY: minY !== null && minY !== void 0 ? minY : this.minY,
                      maxX: maxX !== null && maxX !== void 0 ? maxX : this.maxX,
                      maxY: maxY !== null && maxY !== void 0 ? maxY : this.maxY
                    });
                  };
                  Layout3.prototype.runtimeFit = function(rive) {
                    if (this.cachedRuntimeFit)
                      return this.cachedRuntimeFit;
                    var fit;
                    if (this.fit === Fit2.Cover)
                      fit = rive.Fit.cover;
                    else if (this.fit === Fit2.Contain)
                      fit = rive.Fit.contain;
                    else if (this.fit === Fit2.Fill)
                      fit = rive.Fit.fill;
                    else if (this.fit === Fit2.FitWidth)
                      fit = rive.Fit.fitWidth;
                    else if (this.fit === Fit2.FitHeight)
                      fit = rive.Fit.fitHeight;
                    else if (this.fit === Fit2.ScaleDown)
                      fit = rive.Fit.scaleDown;
                    else if (this.fit === Fit2.Layout)
                      fit = rive.Fit.layout;
                    else
                      fit = rive.Fit.none;
                    this.cachedRuntimeFit = fit;
                    return fit;
                  };
                  Layout3.prototype.runtimeAlignment = function(rive) {
                    if (this.cachedRuntimeAlignment)
                      return this.cachedRuntimeAlignment;
                    var alignment;
                    if (this.alignment === Alignment2.TopLeft)
                      alignment = rive.Alignment.topLeft;
                    else if (this.alignment === Alignment2.TopCenter)
                      alignment = rive.Alignment.topCenter;
                    else if (this.alignment === Alignment2.TopRight)
                      alignment = rive.Alignment.topRight;
                    else if (this.alignment === Alignment2.CenterLeft)
                      alignment = rive.Alignment.centerLeft;
                    else if (this.alignment === Alignment2.CenterRight)
                      alignment = rive.Alignment.centerRight;
                    else if (this.alignment === Alignment2.BottomLeft)
                      alignment = rive.Alignment.bottomLeft;
                    else if (this.alignment === Alignment2.BottomCenter)
                      alignment = rive.Alignment.bottomCenter;
                    else if (this.alignment === Alignment2.BottomRight)
                      alignment = rive.Alignment.bottomRight;
                    else
                      alignment = rive.Alignment.center;
                    this.cachedRuntimeAlignment = alignment;
                    return alignment;
                  };
                  return Layout3;
                }()
              );
              var StateMachineInputType;
              (function(StateMachineInputType2) {
                StateMachineInputType2[StateMachineInputType2["Number"] = 56] = "Number";
                StateMachineInputType2[StateMachineInputType2["Trigger"] = 58] = "Trigger";
                StateMachineInputType2[StateMachineInputType2["Boolean"] = 59] = "Boolean";
              })(StateMachineInputType || (StateMachineInputType = {}));
              var StateMachineInput = (
                /** @class */
                function() {
                  function StateMachineInput2(type, runtimeInput) {
                    this.type = type;
                    this.runtimeInput = runtimeInput;
                  }
                  Object.defineProperty(StateMachineInput2.prototype, "name", {
                    /**
                     * Returns the name of the input
                     */
                    get: function() {
                      return this.runtimeInput.name;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(StateMachineInput2.prototype, "value", {
                    /**
                     * Returns the current value of the input
                     */
                    get: function() {
                      return this.runtimeInput.value;
                    },
                    /**
                     * Sets the value of the input
                     */
                    set: function(value) {
                      this.runtimeInput.value = value;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  StateMachineInput2.prototype.fire = function() {
                    if (this.type === StateMachineInputType.Trigger) {
                      this.runtimeInput.fire();
                    }
                  };
                  StateMachineInput2.prototype.delete = function() {
                    this.runtimeInput = null;
                  };
                  return StateMachineInput2;
                }()
              );
              var RiveEventType;
              (function(RiveEventType2) {
                RiveEventType2[RiveEventType2["General"] = 128] = "General";
                RiveEventType2[RiveEventType2["OpenUrl"] = 131] = "OpenUrl";
              })(RiveEventType || (RiveEventType = {}));
              var BaseArtboard = (
                /** @class */
                /* @__PURE__ */ function() {
                  function BaseArtboard2(_isBindableArtboard) {
                    this.isBindableArtboard = false;
                    this.isBindableArtboard = _isBindableArtboard;
                  }
                  return BaseArtboard2;
                }()
              );
              var Artboard = (
                /** @class */
                function(_super) {
                  __extends(Artboard2, _super);
                  function Artboard2(artboard, _file) {
                    var _this = _super.call(this, false) || this;
                    _this.nativeArtboard = artboard;
                    _this.file = _file;
                    return _this;
                  }
                  return Artboard2;
                }(BaseArtboard)
              );
              var BindableArtboard = (
                /** @class */
                function(_super) {
                  __extends(BindableArtboard2, _super);
                  function BindableArtboard2(artboard) {
                    var _this = _super.call(this, true) || this;
                    _this.selfUnref = false;
                    _this.nativeArtboard = artboard;
                    return _this;
                  }
                  Object.defineProperty(BindableArtboard2.prototype, "viewModel", {
                    set: function(value) {
                      this.nativeViewModel = value.nativeInstance;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  BindableArtboard2.prototype.destroy = function() {
                    var _a;
                    if (this.selfUnref) {
                      this.nativeArtboard.unref();
                      (_a = this.nativeViewModel) === null || _a === void 0 ? void 0 : _a.unref();
                    }
                  };
                  return BindableArtboard2;
                }(BaseArtboard)
              );
              var StateMachine = (
                /** @class */
                function() {
                  function StateMachine2(stateMachine, runtime, playing, artboard) {
                    this.stateMachine = stateMachine;
                    this.playing = playing;
                    this.artboard = artboard;
                    this.inputs = [];
                    this.instance = new runtime.StateMachineInstance(stateMachine, artboard);
                    this.initInputs(runtime);
                    this.hasFocusNodes = this.instance.hasFocusNodes();
                  }
                  Object.defineProperty(StateMachine2.prototype, "name", {
                    get: function() {
                      return this.stateMachine.name;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(StateMachine2.prototype, "statesChanged", {
                    /**
                     * Returns a list of state names that have changed on this frame
                     */
                    get: function() {
                      var names = [];
                      for (var i = 0; i < this.instance.stateChangedCount(); i++) {
                        names.push(this.instance.stateChangedNameByIndex(i));
                      }
                      return names;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  StateMachine2.prototype.advance = function(time) {
                    this.instance.advance(time);
                  };
                  StateMachine2.prototype.advanceAndApply = function(time) {
                    this.instance.advanceAndApply(time);
                  };
                  StateMachine2.prototype.reportedEventCount = function() {
                    return this.instance.reportedEventCount();
                  };
                  StateMachine2.prototype.reportedEventAt = function(i) {
                    return this.instance.reportedEventAt(i);
                  };
                  StateMachine2.prototype.initInputs = function(runtime) {
                    for (var i = 0; i < this.instance.inputCount(); i++) {
                      var input = this.instance.input(i);
                      this.inputs.push(this.mapRuntimeInput(input, runtime));
                    }
                  };
                  StateMachine2.prototype.mapRuntimeInput = function(input, runtime) {
                    if (input.type === runtime.SMIInput.bool) {
                      return new StateMachineInput(StateMachineInputType.Boolean, input.asBool());
                    } else if (input.type === runtime.SMIInput.number) {
                      return new StateMachineInput(StateMachineInputType.Number, input.asNumber());
                    } else if (input.type === runtime.SMIInput.trigger) {
                      return new StateMachineInput(StateMachineInputType.Trigger, input.asTrigger());
                    }
                  };
                  StateMachine2.prototype.cleanup = function() {
                    this.inputs.forEach(function(input) {
                      input.delete();
                    });
                    this.inputs.length = 0;
                    this.instance.delete();
                  };
                  StateMachine2.prototype.bindViewModelInstance = function(viewModelInstance) {
                    if (viewModelInstance.runtimeInstance != null) {
                      this.instance.bindViewModelInstance(viewModelInstance.runtimeInstance);
                    }
                  };
                  StateMachine2.prototype.focusState = function() {
                    return this.instance.focusState();
                  };
                  StateMachine2.prototype.clearFocus = function() {
                    this.instance.clearFocus();
                  };
                  return StateMachine2;
                }()
              );
              var Animator = (
                /** @class */
                function() {
                  function Animator2(runtime, artboard, eventManager, animations, stateMachines) {
                    if (animations === void 0) {
                      animations = [];
                    }
                    if (stateMachines === void 0) {
                      stateMachines = [];
                    }
                    this.runtime = runtime;
                    this.artboard = artboard;
                    this.eventManager = eventManager;
                    this.animations = animations;
                    this.stateMachines = stateMachines;
                  }
                  Animator2.prototype.add = function(animatables, playing, fireEvent) {
                    if (fireEvent === void 0) {
                      fireEvent = true;
                    }
                    animatables = mapToStringArray(animatables);
                    if (animatables.length === 0) {
                      this.animations.forEach(function(a) {
                        return a.playing = playing;
                      });
                      this.stateMachines.forEach(function(m) {
                        return m.playing = playing;
                      });
                    } else {
                      var instancedAnimationNames = this.animations.map(function(a) {
                        return a.name;
                      });
                      var instancedMachineNames = this.stateMachines.map(function(m) {
                        return m.name;
                      });
                      for (var i = 0; i < animatables.length; i++) {
                        var aIndex = instancedAnimationNames.indexOf(animatables[i]);
                        var mIndex = instancedMachineNames.indexOf(animatables[i]);
                        if (aIndex >= 0 || mIndex >= 0) {
                          if (aIndex >= 0) {
                            this.animations[aIndex].playing = playing;
                          } else {
                            this.stateMachines[mIndex].playing = playing;
                          }
                        } else {
                          var anim = this.artboard.animationByName(animatables[i]);
                          if (anim) {
                            var newAnimation = new _animation__WEBPACK_IMPORTED_MODULE_0__.Animation(anim, this.artboard, this.runtime, playing);
                            newAnimation.advance(0);
                            newAnimation.apply(1);
                            this.animations.push(newAnimation);
                          } else {
                            var sm = this.artboard.stateMachineByName(animatables[i]);
                            if (sm) {
                              var newStateMachine = new StateMachine(sm, this.runtime, playing, this.artboard);
                              this.stateMachines.push(newStateMachine);
                            }
                          }
                        }
                      }
                    }
                    if (fireEvent) {
                      if (playing) {
                        this.eventManager.fire({
                          type: EventType2.Play,
                          data: this.playing
                        });
                      } else {
                        this.eventManager.fire({
                          type: EventType2.Pause,
                          data: this.paused
                        });
                      }
                    }
                    return playing ? this.playing : this.paused;
                  };
                  Animator2.prototype.initLinearAnimations = function(animatables, playing, isFallingBackFromStateMachines) {
                    if (isFallingBackFromStateMachines === void 0) {
                      isFallingBackFromStateMachines = false;
                    }
                    var instancedAnimationNames = this.animations.map(function(a) {
                      return a.name;
                    });
                    for (var i = 0; i < animatables.length; i++) {
                      var aIndex = instancedAnimationNames.indexOf(animatables[i]);
                      if (aIndex >= 0) {
                        this.animations[aIndex].playing = playing;
                      } else {
                        var anim = this.artboard.animationByName(animatables[i]);
                        if (anim) {
                          var newAnimation = new _animation__WEBPACK_IMPORTED_MODULE_0__.Animation(anim, this.artboard, this.runtime, playing);
                          newAnimation.advance(0);
                          newAnimation.apply(1);
                          this.animations.push(newAnimation);
                        } else if (isFallingBackFromStateMachines) {
                          var smInitializationMessage = "State Machine with name ".concat(animatables[i], " not found");
                          throw new RiveError(smInitializationMessage);
                        } else {
                          console.error("Animation with name ".concat(animatables[i], " not found."));
                        }
                      }
                    }
                  };
                  Animator2.prototype.initStateMachines = function(animatables, playing) {
                    var instancedStateMachineNames = this.stateMachines.map(function(a) {
                      return a.name;
                    });
                    for (var i = 0; i < animatables.length; i++) {
                      var aIndex = instancedStateMachineNames.indexOf(animatables[i]);
                      if (aIndex >= 0) {
                        this.stateMachines[aIndex].playing = playing;
                      } else {
                        var sm = this.artboard.stateMachineByName(animatables[i]);
                        if (sm) {
                          var newStateMachine = new StateMachine(sm, this.runtime, playing, this.artboard);
                          this.stateMachines.push(newStateMachine);
                        } else {
                          console.warn("State Machine with name ".concat(animatables[i], " not found. Falling back to find an animation with the same name."));
                          this.initLinearAnimations([animatables[i]], playing, true);
                        }
                      }
                    }
                  };
                  Animator2.prototype.play = function(animatables) {
                    return this.add(animatables, true);
                  };
                  Animator2.prototype.advanceIfPaused = function() {
                    this.stateMachines.forEach(function(sm) {
                      if (!sm.playing) {
                        sm.advanceAndApply(0);
                      }
                    });
                  };
                  Animator2.prototype.pause = function(animatables) {
                    return this.add(animatables, false);
                  };
                  Animator2.prototype.scrub = function(animatables, value) {
                    var forScrubbing = this.animations.filter(function(a) {
                      return animatables.includes(a.name);
                    });
                    forScrubbing.forEach(function(a) {
                      return a.scrubTo = value;
                    });
                    return forScrubbing.map(function(a) {
                      return a.name;
                    });
                  };
                  Object.defineProperty(Animator2.prototype, "playing", {
                    /**
                     * Returns a list of names of all animations and state machines currently
                     * playing
                     */
                    get: function() {
                      return this.animations.filter(function(a) {
                        return a.playing;
                      }).map(function(a) {
                        return a.name;
                      }).concat(this.stateMachines.filter(function(m) {
                        return m.playing;
                      }).map(function(m) {
                        return m.name;
                      }));
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Animator2.prototype, "paused", {
                    /**
                     * Returns a list of names of all animations and state machines currently
                     * paused
                     */
                    get: function() {
                      return this.animations.filter(function(a) {
                        return !a.playing;
                      }).map(function(a) {
                        return a.name;
                      }).concat(this.stateMachines.filter(function(m) {
                        return !m.playing;
                      }).map(function(m) {
                        return m.name;
                      }));
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Animator2.prototype.stop = function(animatables) {
                    var _this = this;
                    animatables = mapToStringArray(animatables);
                    var removedNames = [];
                    if (animatables.length === 0) {
                      removedNames = this.animations.map(function(a) {
                        return a.name;
                      }).concat(this.stateMachines.map(function(m) {
                        return m.name;
                      }));
                      this.animations.forEach(function(a) {
                        return a.cleanup();
                      });
                      this.stateMachines.forEach(function(m) {
                        return m.cleanup();
                      });
                      this.animations.splice(0, this.animations.length);
                      this.stateMachines.splice(0, this.stateMachines.length);
                    } else {
                      var animationsToRemove = this.animations.filter(function(a) {
                        return animatables.includes(a.name);
                      });
                      animationsToRemove.forEach(function(a) {
                        a.cleanup();
                        _this.animations.splice(_this.animations.indexOf(a), 1);
                      });
                      var machinesToRemove = this.stateMachines.filter(function(m) {
                        return animatables.includes(m.name);
                      });
                      machinesToRemove.forEach(function(m) {
                        m.cleanup();
                        _this.stateMachines.splice(_this.stateMachines.indexOf(m), 1);
                      });
                      removedNames = animationsToRemove.map(function(a) {
                        return a.name;
                      }).concat(machinesToRemove.map(function(m) {
                        return m.name;
                      }));
                    }
                    this.eventManager.fire({
                      type: EventType2.Stop,
                      data: removedNames
                    });
                    return removedNames;
                  };
                  Object.defineProperty(Animator2.prototype, "isPlaying", {
                    /**
                     * Returns true if at least one animation is active
                     */
                    get: function() {
                      return this.animations.reduce(function(acc, curr) {
                        return acc || curr.playing;
                      }, false) || this.stateMachines.reduce(function(acc, curr) {
                        return acc || curr.playing;
                      }, false);
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Animator2.prototype, "isPaused", {
                    /**
                     * Returns true if all animations are paused and there's at least one animation
                     */
                    get: function() {
                      return !this.isPlaying && (this.animations.length > 0 || this.stateMachines.length > 0);
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Animator2.prototype, "isStopped", {
                    /**
                     * Returns true if there are no playing or paused animations/state machines
                     */
                    get: function() {
                      return this.animations.length === 0 && this.stateMachines.length === 0;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Animator2.prototype.atLeastOne = function(playing, fireEvent) {
                    if (fireEvent === void 0) {
                      fireEvent = true;
                    }
                    var instancedName;
                    if (this.animations.length === 0 && this.stateMachines.length === 0) {
                      if (this.artboard.animationCount() > 0) {
                        this.add([instancedName = this.artboard.animationByIndex(0).name], playing, fireEvent);
                      } else if (this.artboard.stateMachineCount() > 0) {
                        this.add([instancedName = this.artboard.stateMachineByIndex(0).name], playing, fireEvent);
                      }
                    }
                    return instancedName;
                  };
                  Animator2.prototype.handleLooping = function() {
                    for (var _i = 0, _a = this.animations.filter(function(a) {
                      return a.playing;
                    }); _i < _a.length; _i++) {
                      var animation = _a[_i];
                      if (animation.loopValue === 0 && animation.loopCount) {
                        animation.loopCount = 0;
                        this.stop(animation.name);
                      } else if (animation.loopValue === 1 && animation.loopCount) {
                        this.eventManager.fire({
                          type: EventType2.Loop,
                          data: { animation: animation.name, type: LoopType.Loop }
                        });
                        animation.loopCount = 0;
                      } else if (animation.loopValue === 2 && animation.loopCount > 1) {
                        this.eventManager.fire({
                          type: EventType2.Loop,
                          data: { animation: animation.name, type: LoopType.PingPong }
                        });
                        animation.loopCount = 0;
                      }
                    }
                  };
                  Animator2.prototype.handleStateChanges = function() {
                    var statesChanged = [];
                    for (var _i = 0, _a = this.stateMachines.filter(function(sm) {
                      return sm.playing;
                    }); _i < _a.length; _i++) {
                      var stateMachine = _a[_i];
                      statesChanged.push.apply(statesChanged, stateMachine.statesChanged);
                    }
                    if (statesChanged.length > 0) {
                      this.eventManager.fire({
                        type: EventType2.StateChange,
                        data: statesChanged
                      });
                    }
                  };
                  Animator2.prototype.handleAdvancing = function(time) {
                    this.eventManager.fire({
                      type: EventType2.Advance,
                      data: time
                    });
                  };
                  return Animator2;
                }()
              );
              var EventType2;
              (function(EventType3) {
                EventType3["Load"] = "load";
                EventType3["LoadError"] = "loaderror";
                EventType3["Play"] = "play";
                EventType3["Pause"] = "pause";
                EventType3["Stop"] = "stop";
                EventType3["Loop"] = "loop";
                EventType3["Draw"] = "draw";
                EventType3["Advance"] = "advance";
                EventType3["StateChange"] = "statechange";
                EventType3["RiveEvent"] = "riveevent";
                EventType3["AudioStatusChange"] = "audiostatuschange";
              })(EventType2 || (EventType2 = {}));
              var LoopType;
              (function(LoopType2) {
                LoopType2["OneShot"] = "oneshot";
                LoopType2["Loop"] = "loop";
                LoopType2["PingPong"] = "pingpong";
              })(LoopType || (LoopType = {}));
              var EventManager = (
                /** @class */
                function() {
                  function EventManager2(listeners) {
                    if (listeners === void 0) {
                      listeners = [];
                    }
                    this.listeners = listeners;
                  }
                  EventManager2.prototype.getListeners = function(type) {
                    return this.listeners.filter(function(e) {
                      return e.type === type;
                    });
                  };
                  EventManager2.prototype.add = function(listener) {
                    if (!this.listeners.includes(listener)) {
                      this.listeners.push(listener);
                    }
                  };
                  EventManager2.prototype.remove = function(listener) {
                    for (var i = 0; i < this.listeners.length; i++) {
                      var currentListener = this.listeners[i];
                      if (currentListener.type === listener.type) {
                        if (currentListener.callback === listener.callback) {
                          this.listeners.splice(i, 1);
                          break;
                        }
                      }
                    }
                  };
                  EventManager2.prototype.removeAll = function(type) {
                    var _this = this;
                    if (!type) {
                      this.listeners.splice(0, this.listeners.length);
                    } else {
                      this.listeners.filter(function(l) {
                        return l.type === type;
                      }).forEach(function(l) {
                        return _this.remove(l);
                      });
                    }
                  };
                  EventManager2.prototype.fire = function(event) {
                    var eventListeners = this.getListeners(event.type);
                    eventListeners.forEach(function(listener) {
                      return listener.callback(event);
                    });
                  };
                  return EventManager2;
                }()
              );
              var TaskQueueManager = (
                /** @class */
                function() {
                  function TaskQueueManager2(eventManager) {
                    this.eventManager = eventManager;
                    this.queue = [];
                  }
                  TaskQueueManager2.prototype.add = function(task) {
                    this.queue.push(task);
                  };
                  TaskQueueManager2.prototype.process = function() {
                    while (this.queue.length > 0) {
                      var task = this.queue.shift();
                      if (task === null || task === void 0 ? void 0 : task.action) {
                        task.action();
                      }
                      if (task === null || task === void 0 ? void 0 : task.event) {
                        this.eventManager.fire(task.event);
                      }
                    }
                  };
                  return TaskQueueManager2;
                }()
              );
              var SystemAudioStatus;
              (function(SystemAudioStatus2) {
                SystemAudioStatus2[SystemAudioStatus2["AVAILABLE"] = 0] = "AVAILABLE";
                SystemAudioStatus2[SystemAudioStatus2["UNAVAILABLE"] = 1] = "UNAVAILABLE";
              })(SystemAudioStatus || (SystemAudioStatus = {}));
              var AudioManager = (
                /** @class */
                function(_super) {
                  __extends(AudioManager2, _super);
                  function AudioManager2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._started = false;
                    _this._enabled = false;
                    _this._status = SystemAudioStatus.UNAVAILABLE;
                    return _this;
                  }
                  AudioManager2.prototype.delay = function(time) {
                    return __awaiter(this, void 0, void 0, function() {
                      return __generator(this, function(_a) {
                        return [2, new Promise(function(resolve) {
                          return setTimeout(resolve, time);
                        })];
                      });
                    });
                  };
                  AudioManager2.prototype.timeout = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      return __generator(this, function(_a) {
                        return [2, new Promise(function(_, reject) {
                          return setTimeout(reject, 50);
                        })];
                      });
                    });
                  };
                  AudioManager2.prototype.reportToListeners = function() {
                    this.fire({ type: EventType2.AudioStatusChange });
                    this.removeAll();
                  };
                  AudioManager2.prototype.enableAudio = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      return __generator(this, function(_a) {
                        if (!this._enabled) {
                          this._enabled = true;
                          this._status = SystemAudioStatus.AVAILABLE;
                          this.reportToListeners();
                        }
                        return [
                          2
                          /*return*/
                        ];
                      });
                    });
                  };
                  AudioManager2.prototype.testAudio = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      var _a;
                      return __generator(this, function(_b) {
                        switch (_b.label) {
                          case 0:
                            if (!(this._status === SystemAudioStatus.UNAVAILABLE && this._audioContext !== null)) return [3, 4];
                            _b.label = 1;
                          case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4, Promise.race([this._audioContext.resume(), this.timeout()])];
                          case 2:
                            _b.sent();
                            this.enableAudio();
                            return [3, 4];
                          case 3:
                            _a = _b.sent();
                            return [3, 4];
                          case 4:
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  };
                  AudioManager2.prototype._establishAudio = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                          case 0:
                            if (!!this._started) return [3, 5];
                            this._started = true;
                            if (!(typeof window == "undefined")) return [3, 1];
                            this.enableAudio();
                            return [3, 5];
                          case 1:
                            this._audioContext = new AudioContext();
                            this.listenForUserAction();
                            _a.label = 2;
                          case 2:
                            if (!(this._status === SystemAudioStatus.UNAVAILABLE)) return [3, 5];
                            return [4, this.testAudio()];
                          case 3:
                            _a.sent();
                            return [4, this.delay(1e3)];
                          case 4:
                            _a.sent();
                            return [3, 2];
                          case 5:
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  };
                  AudioManager2.prototype.listenForUserAction = function() {
                    var _this = this;
                    var _clickListener = function() {
                      return __awaiter(_this, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                          this.enableAudio();
                          return [
                            2
                            /*return*/
                          ];
                        });
                      });
                    };
                    document.addEventListener("pointerdown", _clickListener, {
                      once: true
                    });
                  };
                  AudioManager2.prototype.establishAudio = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      return __generator(this, function(_a) {
                        this._establishAudio();
                        return [
                          2
                          /*return*/
                        ];
                      });
                    });
                  };
                  Object.defineProperty(AudioManager2.prototype, "systemVolume", {
                    get: function() {
                      if (this._status === SystemAudioStatus.UNAVAILABLE) {
                        this.testAudio();
                        return 0;
                      }
                      return 1;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(AudioManager2.prototype, "status", {
                    get: function() {
                      return this._status;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  return AudioManager2;
                }(EventManager)
              );
              var audioManager = new AudioManager();
              var FakeResizeObserver = (
                /** @class */
                function() {
                  function FakeResizeObserver2() {
                  }
                  FakeResizeObserver2.prototype.observe = function() {
                  };
                  FakeResizeObserver2.prototype.unobserve = function() {
                  };
                  FakeResizeObserver2.prototype.disconnect = function() {
                  };
                  return FakeResizeObserver2;
                }()
              );
              var MyResizeObserver = globalThis.ResizeObserver || FakeResizeObserver;
              var ObjectObservers = (
                /** @class */
                function() {
                  function ObjectObservers2() {
                    var _this = this;
                    this._elementsMap = /* @__PURE__ */ new Map();
                    this._onObservedEntry = function(entry) {
                      var observed = _this._elementsMap.get(entry.target);
                      if (observed !== null) {
                        observed.onResize(entry.target.clientWidth == 0 || entry.target.clientHeight == 0);
                      } else {
                        _this._resizeObserver.unobserve(entry.target);
                      }
                    };
                    this._onObserved = function(entries) {
                      entries.forEach(_this._onObservedEntry);
                    };
                    this._resizeObserver = new MyResizeObserver(this._onObserved);
                  }
                  ObjectObservers2.prototype.add = function(element, onResize) {
                    var observed = {
                      onResize,
                      element
                    };
                    this._elementsMap.set(element, observed);
                    this._resizeObserver.observe(element);
                    return observed;
                  };
                  ObjectObservers2.prototype.remove = function(observed) {
                    this._resizeObserver.unobserve(observed.element);
                    this._elementsMap.delete(observed.element);
                  };
                  return ObjectObservers2;
                }()
              );
              var observers = new ObjectObservers();
              var RiveFile = (
                /** @class */
                function() {
                  function RiveFile2(params) {
                    this.enableRiveAssetCDN = true;
                    this.enablePerfMarks = false;
                    this.referenceCount = 0;
                    this.destroyed = false;
                    this.selfUnref = false;
                    this.bindableArtboards = [];
                    this.src = params.src;
                    this.buffer = params.buffer;
                    if (params.assetLoader)
                      this.assetLoader = params.assetLoader;
                    this.enableRiveAssetCDN = typeof params.enableRiveAssetCDN == "boolean" ? params.enableRiveAssetCDN : true;
                    this.enablePerfMarks = !!params.enablePerfMarks;
                    if (this.enablePerfMarks)
                      _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.enablePerfMarks = true;
                    this.eventManager = new EventManager();
                    if (params.onLoad)
                      this.on(EventType2.Load, params.onLoad);
                    if (params.onLoadError)
                      this.on(EventType2.LoadError, params.onLoadError);
                  }
                  RiveFile2.prototype.releaseFile = function() {
                    var _a;
                    if (this.selfUnref) {
                      (_a = this.file) === null || _a === void 0 ? void 0 : _a.unref();
                    }
                    this.file = null;
                  };
                  RiveFile2.prototype.releaseBindableArtboards = function() {
                    this.bindableArtboards.forEach(function(bindableArtboard) {
                      return bindableArtboard.destroy();
                    });
                  };
                  RiveFile2.prototype.initData = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      var _a, error_1, loader, loaderWrapper, _b, fileFinalizer;
                      return __generator(this, function(_c) {
                        switch (_c.label) {
                          case 0:
                            if (!(this.src && !this.buffer)) return [3, 4];
                            _c.label = 1;
                          case 1:
                            _c.trys.push([1, 3, , 4]);
                            _a = this;
                            return [4, loadRiveFile(this.src)];
                          case 2:
                            _a.buffer = _c.sent();
                            return [3, 4];
                          case 3:
                            error_1 = _c.sent();
                            if (error_1 instanceof Error) {
                              throw error_1;
                            }
                            throw new RiveError(RiveFile2.fileLoadErrorMessage);
                          case 4:
                            if (this.destroyed) {
                              return [
                                2
                                /*return*/
                              ];
                            }
                            if (this.assetLoader) {
                              loaderWrapper = new _utils__WEBPACK_IMPORTED_MODULE_2__.CustomFileAssetLoaderWrapper(this.runtime, this.assetLoader);
                              loader = loaderWrapper.assetLoader;
                            }
                            if (this.enablePerfMarks)
                              performance.mark("rive:file-load:start");
                            _b = this;
                            return [4, this.runtime.load(new Uint8Array(this.buffer), loader, this.enableRiveAssetCDN)];
                          case 5:
                            _b.file = _c.sent();
                            if (this.enablePerfMarks) {
                              performance.mark("rive:file-load:end");
                              performance.measure("rive:file-load", "rive:file-load:start", "rive:file-load:end");
                            }
                            fileFinalizer = new _utils__WEBPACK_IMPORTED_MODULE_2__.FileFinalizer(this.file);
                            _utils__WEBPACK_IMPORTED_MODULE_2__.finalizationRegistry.register(this, fileFinalizer);
                            if (this.destroyed) {
                              this.releaseFile();
                              return [
                                2
                                /*return*/
                              ];
                            }
                            if (this.file !== null) {
                              this.eventManager.fire({
                                type: EventType2.Load,
                                data: this
                              });
                            } else {
                              this.fireLoadError(RiveFile2.fileLoadErrorMessage);
                            }
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  };
                  RiveFile2.prototype.loadRiveFileBytes = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      var bufferPromise;
                      return __generator(this, function(_a) {
                        if (this.enablePerfMarks)
                          performance.mark("rive:fetch-riv:start");
                        bufferPromise = this.src ? loadRiveFile(this.src) : Promise.resolve(this.buffer);
                        if (this.enablePerfMarks && this.src) {
                          bufferPromise.then(function() {
                            performance.mark("rive:fetch-riv:end");
                            performance.measure("rive:fetch-riv", "rive:fetch-riv:start", "rive:fetch-riv:end");
                          });
                        }
                        return [2, bufferPromise];
                      });
                    });
                  };
                  RiveFile2.prototype.loadRuntime = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      var runtimePromise;
                      return __generator(this, function(_a) {
                        if (this.enablePerfMarks)
                          performance.mark("rive:await-wasm:start");
                        runtimePromise = _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.awaitInstance();
                        if (this.enablePerfMarks) {
                          runtimePromise.then(function() {
                            performance.mark("rive:await-wasm:end");
                            performance.measure("rive:await-wasm", "rive:await-wasm:start", "rive:await-wasm:end");
                          });
                        }
                        return [2, runtimePromise];
                      });
                    });
                  };
                  RiveFile2.prototype.init = function() {
                    return __awaiter(this, void 0, void 0, function() {
                      var _a, bufferResolved, runtimeResolved, error_2;
                      return __generator(this, function(_b) {
                        switch (_b.label) {
                          case 0:
                            if (!this.src && !this.buffer) {
                              this.fireLoadError(RiveFile2.missingErrorMessage);
                              return [
                                2
                                /*return*/
                              ];
                            }
                            _b.label = 1;
                          case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4, Promise.all([this.loadRiveFileBytes(), this.loadRuntime()])];
                          case 2:
                            _a = _b.sent(), bufferResolved = _a[0], runtimeResolved = _a[1];
                            if (this.destroyed) {
                              return [
                                2
                                /*return*/
                              ];
                            }
                            this.buffer = bufferResolved;
                            this.runtime = runtimeResolved;
                            if (this.enablePerfMarks)
                              performance.mark("rive:init-data:start");
                            return [4, this.initData()];
                          case 3:
                            _b.sent();
                            if (this.enablePerfMarks) {
                              performance.mark("rive:init-data:end");
                              performance.measure("rive:init-data", "rive:init-data:start", "rive:init-data:end");
                            }
                            return [3, 5];
                          case 4:
                            error_2 = _b.sent();
                            this.fireLoadError(error_2 instanceof Error ? error_2.message : RiveFile2.fileLoadErrorMessage);
                            return [3, 5];
                          case 5:
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  };
                  RiveFile2.prototype.fireLoadError = function(message) {
                    this.eventManager.fire({
                      type: EventType2.LoadError,
                      data: message
                    });
                    throw new RiveError(message);
                  };
                  RiveFile2.prototype.on = function(type, callback) {
                    this.eventManager.add({
                      type,
                      callback
                    });
                  };
                  RiveFile2.prototype.off = function(type, callback) {
                    this.eventManager.remove({
                      type,
                      callback
                    });
                  };
                  RiveFile2.prototype.cleanup = function() {
                    this.referenceCount -= 1;
                    if (this.referenceCount <= 0) {
                      this.removeAllRiveEventListeners();
                      this.releaseFile();
                      this.releaseBindableArtboards();
                      this.destroyed = true;
                    }
                  };
                  RiveFile2.prototype.removeAllRiveEventListeners = function(type) {
                    this.eventManager.removeAll(type);
                  };
                  RiveFile2.prototype.getInstance = function() {
                    if (this.file !== null) {
                      this.referenceCount += 1;
                      return this.file;
                    }
                  };
                  RiveFile2.prototype.destroyIfUnused = function() {
                    if (this.referenceCount <= 0) {
                      this.cleanup();
                    }
                  };
                  RiveFile2.prototype.createBindableArtboard = function(nativeBindableArtboard) {
                    if (nativeBindableArtboard != null) {
                      var bindableArtboard = new BindableArtboard(nativeBindableArtboard);
                      (0, _utils__WEBPACK_IMPORTED_MODULE_2__.createFinalization)(bindableArtboard, bindableArtboard.nativeArtboard);
                      this.bindableArtboards.push(bindableArtboard);
                      return bindableArtboard;
                    }
                    return null;
                  };
                  RiveFile2.prototype.getArtboard = function(name) {
                    var nativeArtboard = this.file.artboardByName(name);
                    if (nativeArtboard != null) {
                      return new Artboard(nativeArtboard, this);
                    }
                  };
                  RiveFile2.prototype.getBindableArtboard = function(name) {
                    var nativeArtboard = this.file.bindableArtboardByName(name);
                    return this.createBindableArtboard(nativeArtboard);
                  };
                  RiveFile2.prototype.getDefaultBindableArtboard = function() {
                    var nativeArtboard = this.file.bindableArtboardDefault();
                    return this.createBindableArtboard(nativeArtboard);
                  };
                  RiveFile2.prototype.internalBindableArtboardFromArtboard = function(artboard) {
                    var nativeBindableArtboard = this.file.internalBindableArtboardFromArtboard(artboard);
                    return this.createBindableArtboard(nativeBindableArtboard);
                  };
                  RiveFile2.prototype.viewModelByName = function(name) {
                    var viewModel = this.file.viewModelByName(name);
                    if (viewModel !== null) {
                      return new ViewModel(viewModel);
                    }
                    return null;
                  };
                  RiveFile2.missingErrorMessage = "Rive source file or data buffer required";
                  RiveFile2.fileLoadErrorMessage = "The file failed to load";
                  return RiveFile2;
                }()
              );
              var Rive2 = (
                /** @class */
                function() {
                  function Rive3(params) {
                    var _this = this;
                    var _a, _b, _c;
                    this.loaded = false;
                    this.destroyed = false;
                    this._observed = null;
                    this.readyForPlaying = false;
                    this.artboard = null;
                    this.eventCleanup = null;
                    this._keyboardInteractions = null;
                    this.shouldDisableRiveListeners = false;
                    this.automaticallyHandleEvents = false;
                    this.dispatchPointerExit = true;
                    this.enableMultiTouch = false;
                    this.enableRiveAssetCDN = true;
                    this._volume = 1;
                    this._artboardWidth = void 0;
                    this._artboardHeight = void 0;
                    this._devicePixelRatioUsed = 1;
                    this._hasZeroSize = false;
                    this._needsRedraw = false;
                    this._currentCanvasWidth = 0;
                    this._currentCanvasHeight = 0;
                    this._audioEventListener = null;
                    this._boundDraw = null;
                    this._pageVisibilityHandler = null;
                    this._explicitlyStoppedRendering = false;
                    this._viewModelInstance = null;
                    this._dataEnums = null;
                    this._tabIndex = null;
                    this._prevHasFocus = false;
                    this._focusOptions = {
                      allowFocusInterrupt: false
                    };
                    this.drawOptimization = DrawOptimizationOptions.DrawOnChanged;
                    this.enablePerfMarks = false;
                    this.durations = [];
                    this.frameTimes = [];
                    this.frameCount = 0;
                    this.isTouchScrollEnabled = false;
                    this.onCanvasResize = function(hasZeroSize) {
                      var toggledDisplay = _this._hasZeroSize !== hasZeroSize;
                      _this._hasZeroSize = hasZeroSize;
                      if (!hasZeroSize) {
                        if (toggledDisplay) {
                          _this.resizeDrawingSurfaceToCanvas();
                        }
                      } else if (!_this._layout.maxX || !_this._layout.maxY) {
                        _this.resizeToCanvas();
                      }
                    };
                    this.frameRequestId = null;
                    this.renderSecondTimer = 0;
                    this._boundDraw = this.draw.bind(this);
                    if (typeof document !== "undefined") {
                      this._pageVisibilityHandler = this._onPageVisibilityChange.bind(this);
                      document.addEventListener("visibilitychange", this._pageVisibilityHandler);
                    }
                    this.canvas = params.canvas;
                    if (params.canvas.constructor === HTMLCanvasElement) {
                      this._observed = observers.add(this.canvas, this.onCanvasResize);
                    }
                    this._currentCanvasWidth = this.canvas.width;
                    this._currentCanvasHeight = this.canvas.height;
                    this.src = params.src;
                    this.buffer = params.buffer;
                    this.riveFile = params.riveFile;
                    this.layout = (_a = params.layout) !== null && _a !== void 0 ? _a : new Layout2();
                    this.shouldDisableRiveListeners = !!params.shouldDisableRiveListeners;
                    this.isTouchScrollEnabled = !!params.isTouchScrollEnabled;
                    this.automaticallyHandleEvents = !!params.automaticallyHandleEvents;
                    this.dispatchPointerExit = params.dispatchPointerExit === false ? params.dispatchPointerExit : this.dispatchPointerExit;
                    this.enableMultiTouch = !!params.enableMultiTouch;
                    this.drawOptimization = (_b = params.drawingOptions) !== null && _b !== void 0 ? _b : this.drawOptimization;
                    this.enableRiveAssetCDN = params.enableRiveAssetCDN === void 0 ? true : params.enableRiveAssetCDN;
                    this.enablePerfMarks = !!params.enablePerfMarks;
                    if (this.enablePerfMarks)
                      _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.enablePerfMarks = true;
                    this._focusOptions = (_c = params.focusOptions) !== null && _c !== void 0 ? _c : this._focusOptions;
                    this.eventManager = new EventManager();
                    if (params.onLoad)
                      this.on(EventType2.Load, params.onLoad);
                    if (params.onLoadError)
                      this.on(EventType2.LoadError, params.onLoadError);
                    if (params.onPlay)
                      this.on(EventType2.Play, params.onPlay);
                    if (params.onPause)
                      this.on(EventType2.Pause, params.onPause);
                    if (params.onStop)
                      this.on(EventType2.Stop, params.onStop);
                    if (params.onLoop)
                      this.on(EventType2.Loop, params.onLoop);
                    if (params.onStateChange)
                      this.on(EventType2.StateChange, params.onStateChange);
                    if (params.onAdvance)
                      this.on(EventType2.Advance, params.onAdvance);
                    if (params.onload && !params.onLoad)
                      this.on(EventType2.Load, params.onload);
                    if (params.onloaderror && !params.onLoadError)
                      this.on(EventType2.LoadError, params.onloaderror);
                    if (params.onplay && !params.onPlay)
                      this.on(EventType2.Play, params.onplay);
                    if (params.onpause && !params.onPause)
                      this.on(EventType2.Pause, params.onpause);
                    if (params.onstop && !params.onStop)
                      this.on(EventType2.Stop, params.onstop);
                    if (params.onloop && !params.onLoop)
                      this.on(EventType2.Loop, params.onloop);
                    if (params.onstatechange && !params.onStateChange)
                      this.on(EventType2.StateChange, params.onstatechange);
                    if (params.assetLoader)
                      this.assetLoader = params.assetLoader;
                    this.taskQueue = new TaskQueueManager(this.eventManager);
                    this.init({
                      src: this.src,
                      buffer: this.buffer,
                      riveFile: this.riveFile,
                      autoplay: params.autoplay,
                      autoBind: params.autoBind,
                      animations: params.animations,
                      stateMachines: params.stateMachines,
                      artboard: params.artboard,
                      useOffscreenRenderer: params.useOffscreenRenderer,
                      tabIndex: params.tabIndex
                    });
                  }
                  Object.defineProperty(Rive3.prototype, "viewModelCount", {
                    get: function() {
                      return this.file.viewModelCount();
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Rive3.new = function(params) {
                    console.warn("This function is deprecated: please use `new Rive({})` instead");
                    return new Rive3(params);
                  };
                  Rive3.prototype.onSystemAudioChanged = function() {
                    this.volume = this._volume;
                  };
                  Rive3.prototype.init = function(_a) {
                    var _this = this;
                    var src = _a.src, buffer = _a.buffer, riveFile = _a.riveFile, animations = _a.animations, stateMachines = _a.stateMachines, artboard = _a.artboard, _b = _a.autoplay, autoplay = _b === void 0 ? false : _b, _c = _a.useOffscreenRenderer, useOffscreenRenderer = _c === void 0 ? false : _c, _d = _a.autoBind, autoBind = _d === void 0 ? false : _d, tabIndex = _a.tabIndex;
                    if (this.destroyed) {
                      return;
                    }
                    this.src = src;
                    this.buffer = buffer;
                    this.riveFile = riveFile;
                    this._tabIndex = tabIndex !== null && tabIndex !== void 0 ? tabIndex : null;
                    if (!this.src && !this.buffer && !this.riveFile) {
                      throw new RiveError(Rive3.missingErrorMessage);
                    }
                    var startingAnimationNames = mapToStringArray(animations);
                    var startingStateMachineNames = mapToStringArray(stateMachines);
                    this.loaded = false;
                    this.readyForPlaying = false;
                    _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.awaitInstance().then(function(runtime) {
                      if (_this.destroyed) {
                        return;
                      }
                      _this.runtime = runtime;
                      _this.removeRiveListeners();
                      _this.deleteRiveRenderer();
                      if (_this.enablePerfMarks)
                        performance.mark("rive:make-renderer:start");
                      try {
                        _this.renderer = _this.runtime.makeRenderer(_this.canvas, useOffscreenRenderer);
                        if (!_this.renderer) {
                          throw new Error("Renderer is null, cannot render Rive on the canvas.");
                        }
                      } catch (e) {
                        console.error(e);
                        throw new RiveError("Unable to create the renderer, your environment may not support WebGL. Try the @rive-app/canvas runtime as an alternative.");
                      }
                      if (_this.enablePerfMarks) {
                        performance.mark("rive:make-renderer:end");
                        performance.measure("rive:make-renderer", "rive:make-renderer:start", "rive:make-renderer:end");
                      }
                      if (!(_this.canvas.width || _this.canvas.height)) {
                        _this.resizeDrawingSurfaceToCanvas();
                      }
                      _this.initData(artboard, startingAnimationNames, startingStateMachineNames, autoplay, autoBind).then(function(hasInitialized) {
                        if (hasInitialized) {
                          return _this.setupRiveListeners();
                        }
                      }).catch(function(e) {
                        console.error(e);
                      });
                    }).catch(function(e) {
                      _this.eventManager.fire({ type: EventType2.LoadError, data: e.message });
                    });
                  };
                  Rive3.prototype.setupRiveListeners = function(riveListenerOptions) {
                    var _this = this;
                    if (this.eventCleanup) {
                      this.eventCleanup();
                    }
                    this.cleanupKeyboardInteractions();
                    if (!this.shouldDisableRiveListeners) {
                      var playingStateMachines = this.animator.stateMachines.filter(function(sm) {
                        return sm.playing;
                      });
                      var activeStateMachines = playingStateMachines.filter(function(sm) {
                        return _this.runtime.hasListeners(sm.instance);
                      }).map(function(sm) {
                        return sm.instance;
                      });
                      var touchScrollEnabledOption = this.isTouchScrollEnabled;
                      var dispatchPointerExit = this.dispatchPointerExit;
                      var enableMultiTouch = this.enableMultiTouch;
                      if (riveListenerOptions && "isTouchScrollEnabled" in riveListenerOptions) {
                        touchScrollEnabledOption = riveListenerOptions.isTouchScrollEnabled;
                      }
                      this.eventCleanup = (0, _utils__WEBPACK_IMPORTED_MODULE_2__.registerTouchInteractions)({
                        canvas: this.canvas,
                        artboard: this.artboard,
                        stateMachines: activeStateMachines,
                        renderer: this.renderer,
                        rive: this.runtime,
                        fit: this._layout.runtimeFit(this.runtime),
                        alignment: this._layout.runtimeAlignment(this.runtime),
                        isTouchScrollEnabled: touchScrollEnabledOption,
                        dispatchPointerExit,
                        enableMultiTouch,
                        layoutScaleFactor: this._layout.layoutScaleFactor,
                        advanceAndDrain: this.advanceAndReportChanges.bind(this)
                      });
                      var smWithFocusNodes = playingStateMachines.filter(function(sm) {
                        return sm.hasFocusNodes;
                      });
                      if (smWithFocusNodes.length) {
                        var currentCanvasTabIndex = this.canvas.tabIndex;
                        if (currentCanvasTabIndex === -1 || isNaN(currentCanvasTabIndex)) {
                          this.canvas.tabIndex = this._tabIndex !== null ? this._tabIndex : 0;
                        }
                        if (typeof window !== "undefined") {
                          this._keyboardInteractions = new _utils__WEBPACK_IMPORTED_MODULE_2__.KeyboardInteractions({
                            canvas: this.canvas,
                            stateMachine: smWithFocusNodes[0].instance,
                            // work off assumption of single state machine
                            hasFocusNodes: true
                          });
                        }
                      }
                    }
                  };
                  Rive3.prototype.cleanupKeyboardInteractions = function() {
                    if (this._keyboardInteractions) {
                      this._keyboardInteractions.cleanup();
                      this._keyboardInteractions = null;
                    }
                  };
                  Rive3.prototype.removeRiveListeners = function() {
                    if (this.eventCleanup) {
                      this.eventCleanup();
                      this.eventCleanup = null;
                    }
                    this.cleanupKeyboardInteractions();
                  };
                  Rive3.prototype.initializeAudio = function() {
                    var _this = this;
                    var _a;
                    if (audioManager.status == SystemAudioStatus.UNAVAILABLE) {
                      if (this.file.hasAudio || ((_a = this.artboard) === null || _a === void 0 ? void 0 : _a.hasAudio) && this._audioEventListener === null) {
                        this._audioEventListener = {
                          type: EventType2.AudioStatusChange,
                          callback: function() {
                            return _this.onSystemAudioChanged();
                          }
                        };
                        audioManager.add(this._audioEventListener);
                        audioManager.establishAudio();
                      }
                    }
                  };
                  Rive3.prototype.initArtboardSize = function() {
                    if (!this.artboard)
                      return;
                    this._artboardWidth = this.artboard.width = this._artboardWidth || this.artboard.width;
                    this._artboardHeight = this.artboard.height = this._artboardHeight || this.artboard.height;
                  };
                  Rive3.prototype.initData = function(artboardName, animationNames, stateMachineNames, autoplay, autoBind) {
                    return __awaiter(this, void 0, void 0, function() {
                      var riveFile, error_3, msg;
                      var _a;
                      return __generator(this, function(_b) {
                        switch (_b.label) {
                          case 0:
                            _b.trys.push([0, 3, , 4]);
                            if (!(this.riveFile == null)) return [3, 2];
                            riveFile = new RiveFile({
                              src: this.src,
                              buffer: this.buffer,
                              enableRiveAssetCDN: this.enableRiveAssetCDN,
                              assetLoader: this.assetLoader,
                              enablePerfMarks: this.enablePerfMarks
                            });
                            this.riveFile = riveFile;
                            return [4, riveFile.init()];
                          case 1:
                            _b.sent();
                            if (this.destroyed) {
                              riveFile.destroyIfUnused();
                              return [2, false];
                            }
                            _b.label = 2;
                          case 2:
                            this.file = this.riveFile.getInstance();
                            this.initArtboard(artboardName, animationNames, stateMachineNames, autoplay, autoBind);
                            this.initArtboardSize();
                            this.initializeAudio();
                            try {
                              this.loaded = true;
                              this.eventManager.fire({
                                type: EventType2.Load,
                                data: (_a = this.src) !== null && _a !== void 0 ? _a : "buffer"
                              });
                            } catch (e) {
                              console.error(e);
                            }
                            this.animator.advanceIfPaused();
                            this.readyForPlaying = true;
                            this.taskQueue.process();
                            this.drawFrame();
                            return [2, true];
                          case 3:
                            error_3 = _b.sent();
                            msg = resolveErrorMessage(error_3);
                            this.eventManager.fire({ type: EventType2.LoadError, data: msg });
                            return [2, Promise.reject(msg)];
                          case 4:
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    });
                  };
                  Rive3.prototype.initArtboard = function(artboardName, animationNames, stateMachineNames, autoplay, autoBind) {
                    if (!this.file) {
                      return;
                    }
                    var rootArtboard = artboardName ? this.file.artboardByName(artboardName) : this.file.defaultArtboard();
                    if (!rootArtboard) {
                      throw new RiveError("Invalid artboard name or no default artboard");
                    }
                    this.artboard = rootArtboard;
                    rootArtboard.volume = this._volume * audioManager.systemVolume;
                    this.animator = new Animator(this.runtime, this.artboard, this.eventManager);
                    var instanceNames;
                    if (animationNames.length > 0 || stateMachineNames.length > 0) {
                      instanceNames = animationNames.concat(stateMachineNames);
                      this.animator.initLinearAnimations(animationNames, autoplay);
                      this.animator.initStateMachines(stateMachineNames, autoplay);
                    } else {
                      instanceNames = [this.animator.atLeastOne(autoplay, false)];
                    }
                    this.taskQueue.add({
                      event: {
                        type: autoplay ? EventType2.Play : EventType2.Pause,
                        data: instanceNames
                      }
                    });
                    if (autoBind) {
                      var viewModel = this.file.defaultArtboardViewModel(rootArtboard);
                      if (viewModel !== null) {
                        var runtimeInstance = viewModel.defaultInstance();
                        if (runtimeInstance !== null) {
                          var viewModelInstance = new ViewModelInstance(runtimeInstance, null);
                          (0, _utils__WEBPACK_IMPORTED_MODULE_2__.createFinalization)(viewModelInstance, viewModelInstance.runtimeInstance);
                          this.bindViewModelInstance(viewModelInstance);
                        }
                      }
                    }
                  };
                  Rive3.prototype.drawFrame = function() {
                    var _a, _b;
                    if ((_a = document === null || document === void 0 ? void 0 : document.timeline) === null || _a === void 0 ? void 0 : _a.currentTime) {
                      if (this.loaded && this.artboard && !this.frameRequestId) {
                        this._boundDraw(document.timeline.currentTime);
                        (_b = this.runtime) === null || _b === void 0 ? void 0 : _b.resolveAnimationFrame();
                      }
                    } else {
                      this.scheduleRendering();
                    }
                  };
                  Rive3.prototype._canvasSizeChanged = function() {
                    var changed = false;
                    if (this.canvas) {
                      if (this.canvas.width !== this._currentCanvasWidth) {
                        this._currentCanvasWidth = this.canvas.width;
                        changed = true;
                      }
                      if (this.canvas.height !== this._currentCanvasHeight) {
                        this._currentCanvasHeight = this.canvas.height;
                        changed = true;
                      }
                    }
                    return changed;
                  };
                  Rive3.prototype.pollFocusState = function() {
                    if (!this._keyboardInteractions) {
                      this._prevHasFocus = false;
                      return;
                    }
                    var activeSm = this.animator.stateMachines.find(function(sm) {
                      return sm.playing && sm.hasFocusNodes;
                    });
                    if (!activeSm) {
                      this._prevHasFocus = false;
                      return;
                    }
                    if (this.canvas instanceof HTMLCanvasElement) {
                      var hasFocus = activeSm.focusState().hasFocus;
                      if (hasFocus) {
                        this._keyboardInteractions.notifyRiveFocused();
                        if (!this._prevHasFocus) {
                          if (this.canvas !== document.activeElement && this._focusOptions.allowFocusInterrupt) {
                            this.canvas.focus();
                          }
                          this._prevHasFocus = true;
                        }
                        return;
                      }
                      this._prevHasFocus = false;
                      if (this._keyboardInteractions.focusSessionState === _utils__WEBPACK_IMPORTED_MODULE_2__.FocusSessionState.RiveFocused) {
                        this._keyboardInteractions.setFocusSessionState(_utils__WEBPACK_IMPORTED_MODULE_2__.FocusSessionState.NotFocused);
                      }
                    }
                  };
                  Rive3.prototype.advanceAndReportChanges = function(elapsedTime) {
                    var _a;
                    var activeAnimations = this.animator.animations.filter(function(a) {
                      return a.playing || a.needsScrub;
                    }).sort(function(first) {
                      return first.needsScrub ? -1 : 1;
                    });
                    for (var _i = 0, activeAnimations_1 = activeAnimations; _i < activeAnimations_1.length; _i++) {
                      var animation = activeAnimations_1[_i];
                      animation.advance(elapsedTime);
                      if (animation.instance.didLoop) {
                        animation.loopCount += 1;
                      }
                      animation.apply(1);
                    }
                    var activeStateMachines = this.animator.stateMachines.filter(function(a) {
                      return a.playing;
                    });
                    var _perfFrame = this.enablePerfMarks && this.frameCount < 3 ? this.frameCount : -1;
                    for (var _b = 0, activeStateMachines_1 = activeStateMachines; _b < activeStateMachines_1.length; _b++) {
                      var stateMachine = activeStateMachines_1[_b];
                      var numEventsReported = stateMachine.reportedEventCount();
                      if (numEventsReported) {
                        for (var i = 0; i < numEventsReported; i++) {
                          var event_1 = stateMachine.reportedEventAt(i);
                          if (event_1) {
                            if (event_1.type === RiveEventType.OpenUrl) {
                              this.eventManager.fire({
                                type: EventType2.RiveEvent,
                                data: event_1
                              });
                              if (this.automaticallyHandleEvents) {
                                var newAnchorTag = document.createElement("a");
                                var _c = event_1, url = _c.url, target = _c.target;
                                var sanitizedUrl = (0, _utils__WEBPACK_IMPORTED_MODULE_2__.sanitizeUrl)(url);
                                url && newAnchorTag.setAttribute("href", sanitizedUrl);
                                target && newAnchorTag.setAttribute("target", target);
                                if (sanitizedUrl && sanitizedUrl !== _utils__WEBPACK_IMPORTED_MODULE_2__.BLANK_URL) {
                                  newAnchorTag.click();
                                }
                              }
                            } else {
                              this.eventManager.fire({
                                type: EventType2.RiveEvent,
                                data: event_1
                              });
                            }
                          }
                        }
                      }
                      if (_perfFrame >= 0)
                        performance.mark("rive:sm-advance:start:f".concat(_perfFrame));
                      stateMachine.advanceAndApply(elapsedTime);
                      if (_perfFrame >= 0) {
                        performance.mark("rive:sm-advance:end:f".concat(_perfFrame));
                        performance.measure("rive:sm-advance:f".concat(_perfFrame), "rive:sm-advance:start:f".concat(_perfFrame), "rive:sm-advance:end:f".concat(_perfFrame));
                      }
                    }
                    if (this.animator.stateMachines.length == 0) {
                      this.artboard.advance(elapsedTime);
                    }
                    this.animator.handleLooping();
                    this.animator.handleStateChanges();
                    this.animator.handleAdvancing(elapsedTime);
                    this.pollFocusState();
                    (_a = this._viewModelInstance) === null || _a === void 0 ? void 0 : _a.handleCallbacks();
                  };
                  Rive3.prototype.draw = function(time, onSecond) {
                    this.frameRequestId = null;
                    var before = performance.now();
                    var _perfFrame = this.enablePerfMarks && this.frameCount < 3 ? this.frameCount : -1;
                    if (!this.lastRenderTime) {
                      this.lastRenderTime = time;
                    }
                    this.renderSecondTimer += time - this.lastRenderTime;
                    if (this.renderSecondTimer > 5e3) {
                      this.renderSecondTimer = 0;
                      onSecond === null || onSecond === void 0 ? void 0 : onSecond();
                    }
                    var elapsedTime = (time - this.lastRenderTime) / 1e3;
                    this.lastRenderTime = time;
                    this.advanceAndReportChanges(elapsedTime);
                    var renderer = this.renderer;
                    if (!this._hasZeroSize) {
                      if (this.drawOptimization == DrawOptimizationOptions.AlwaysDraw || this.artboard.didChange() || this._needsRedraw || this._canvasSizeChanged()) {
                        renderer.clear();
                        renderer.save();
                        if (_perfFrame >= 0)
                          performance.mark("rive:align-renderer:start:f".concat(_perfFrame));
                        this.alignRenderer();
                        if (_perfFrame >= 0) {
                          performance.mark("rive:align-renderer:end:f".concat(_perfFrame));
                          performance.measure("rive:align-renderer:f".concat(_perfFrame), "rive:align-renderer:start:f".concat(_perfFrame), "rive:align-renderer:end:f".concat(_perfFrame));
                        }
                        if (_perfFrame >= 0)
                          performance.mark("rive:artboard-draw:start:f".concat(_perfFrame));
                        this.artboard.draw(renderer);
                        if (_perfFrame >= 0) {
                          performance.mark("rive:artboard-draw:end:f".concat(_perfFrame));
                          performance.measure("rive:artboard-draw:f".concat(_perfFrame), "rive:artboard-draw:start:f".concat(_perfFrame), "rive:artboard-draw:end:f".concat(_perfFrame));
                        }
                        renderer.restore();
                        if (_perfFrame >= 0)
                          performance.mark("rive:renderer-flush:start:f".concat(_perfFrame));
                        renderer.flush();
                        if (_perfFrame >= 0) {
                          performance.mark("rive:renderer-flush:end:f".concat(_perfFrame));
                          performance.measure("rive:renderer-flush:f".concat(_perfFrame), "rive:renderer-flush:start:f".concat(_perfFrame), "rive:renderer-flush:end:f".concat(_perfFrame));
                        }
                        this._needsRedraw = false;
                      }
                    }
                    this.frameCount++;
                    var after = performance.now();
                    this.frameTimes.push(after);
                    this.durations.push(after - before);
                    while (this.frameTimes[0] <= after - 1e3) {
                      this.frameTimes.shift();
                      this.durations.shift();
                    }
                    if (this.animator.isPlaying) {
                      this.scheduleRendering();
                    } else if (this.animator.isPaused) {
                      this.lastRenderTime = 0;
                    } else if (this.animator.isStopped) {
                      this.lastRenderTime = 0;
                    }
                  };
                  Rive3.prototype.alignRenderer = function() {
                    var _a = this, renderer = _a.renderer, runtime = _a.runtime, _layout = _a._layout, artboard = _a.artboard;
                    renderer.align(_layout.runtimeFit(runtime), _layout.runtimeAlignment(runtime), {
                      minX: _layout.minX,
                      minY: _layout.minY,
                      maxX: _layout.maxX,
                      maxY: _layout.maxY
                    }, artboard.bounds, this._devicePixelRatioUsed * _layout.layoutScaleFactor);
                  };
                  Object.defineProperty(Rive3.prototype, "fps", {
                    get: function() {
                      return this.durations.length;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "frameTime", {
                    get: function() {
                      if (this.durations.length === 0) {
                        return 0;
                      }
                      return (this.durations.reduce(function(a, b) {
                        return a + b;
                      }, 0) / this.durations.length).toFixed(4);
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Rive3.prototype.cleanup = function() {
                    var _a, _b;
                    this.destroyed = true;
                    this.stopRendering();
                    this.cleanupInstances();
                    if (this._observed !== null) {
                      observers.remove(this._observed);
                    }
                    this.removeRiveListeners();
                    if (this.file) {
                      (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.cleanup();
                      this.file = null;
                    }
                    this.riveFile = null;
                    this.deleteRiveRenderer();
                    if (this._audioEventListener !== null) {
                      audioManager.remove(this._audioEventListener);
                      this._audioEventListener = null;
                    }
                    if (this._pageVisibilityHandler) {
                      document.removeEventListener("visibilitychange", this._pageVisibilityHandler);
                      this._pageVisibilityHandler = null;
                    }
                    (_b = this._viewModelInstance) === null || _b === void 0 ? void 0 : _b.cleanup();
                    this._viewModelInstance = null;
                    this._dataEnums = null;
                  };
                  Rive3.prototype.deleteRiveRenderer = function() {
                    var _a;
                    (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.delete();
                    this.renderer = null;
                  };
                  Rive3.prototype.cleanupInstances = function() {
                    if (this.eventCleanup !== null) {
                      this.eventCleanup();
                    }
                    this.cleanupKeyboardInteractions();
                    this.stop();
                    if (this.artboard) {
                      this.artboard.delete();
                      this.artboard = null;
                    }
                  };
                  Rive3.prototype.retrieveTextRun = function(textRunName) {
                    var _a;
                    if (!textRunName) {
                      console.warn("No text run name provided");
                      return;
                    }
                    if (!this.artboard) {
                      console.warn("Tried to access text run, but the Artboard is null");
                      return;
                    }
                    var textRun = this.artboard.textRun(textRunName);
                    if (!textRun) {
                      console.warn("Could not access a text run with name '".concat(textRunName, "' in the '").concat((_a = this.artboard) === null || _a === void 0 ? void 0 : _a.name, "' Artboard. Note that you must rename a text run node in the Rive editor to make it queryable at runtime."));
                      return;
                    }
                    return textRun;
                  };
                  Rive3.prototype.getTextRunValue = function(textRunName) {
                    var textRun = this.retrieveTextRun(textRunName);
                    return textRun ? textRun.text : void 0;
                  };
                  Rive3.prototype.setTextRunValue = function(textRunName, textRunValue) {
                    var textRun = this.retrieveTextRun(textRunName);
                    if (textRun) {
                      textRun.text = textRunValue;
                    }
                  };
                  Rive3.prototype.play = function(animationNames, autoplay) {
                    var _this = this;
                    animationNames = mapToStringArray(animationNames);
                    if (!this.readyForPlaying) {
                      this.taskQueue.add({
                        action: function() {
                          return _this.play(animationNames, autoplay);
                        }
                      });
                      return;
                    }
                    this.animator.play(animationNames);
                    if (this.eventCleanup) {
                      this.eventCleanup();
                    }
                    this.cleanupKeyboardInteractions();
                    this.setupRiveListeners();
                    this.startRendering();
                  };
                  Rive3.prototype.pause = function(animationNames) {
                    var _this = this;
                    animationNames = mapToStringArray(animationNames);
                    if (!this.readyForPlaying) {
                      this.taskQueue.add({
                        action: function() {
                          return _this.pause(animationNames);
                        }
                      });
                      return;
                    }
                    if (this.eventCleanup) {
                      this.eventCleanup();
                    }
                    this.cleanupKeyboardInteractions();
                    this.animator.pause(animationNames);
                  };
                  Rive3.prototype.scrub = function(animationNames, value) {
                    var _this = this;
                    animationNames = mapToStringArray(animationNames);
                    if (!this.readyForPlaying) {
                      this.taskQueue.add({
                        action: function() {
                          return _this.scrub(animationNames, value);
                        }
                      });
                      return;
                    }
                    this.animator.scrub(animationNames, value || 0);
                    this.drawFrame();
                  };
                  Rive3.prototype.stop = function(animationNames) {
                    var _this = this;
                    animationNames = mapToStringArray(animationNames);
                    if (!this.readyForPlaying) {
                      this.taskQueue.add({
                        action: function() {
                          return _this.stop(animationNames);
                        }
                      });
                      return;
                    }
                    if (this.animator) {
                      this.animator.stop(animationNames);
                    }
                    if (this.eventCleanup) {
                      this.eventCleanup();
                    }
                    this.cleanupKeyboardInteractions();
                  };
                  Rive3.prototype.reset = function(params) {
                    var _a, _b;
                    var artBoardName = params === null || params === void 0 ? void 0 : params.artboard;
                    var animationNames = mapToStringArray(params === null || params === void 0 ? void 0 : params.animations);
                    var stateMachineNames = mapToStringArray(params === null || params === void 0 ? void 0 : params.stateMachines);
                    var autoplay = (_a = params === null || params === void 0 ? void 0 : params.autoplay) !== null && _a !== void 0 ? _a : false;
                    var autoBind = (_b = params === null || params === void 0 ? void 0 : params.autoBind) !== null && _b !== void 0 ? _b : false;
                    this.cleanupInstances();
                    this.initArtboard(artBoardName, animationNames, stateMachineNames, autoplay, autoBind);
                    this.taskQueue.process();
                  };
                  Rive3.prototype.load = function(params) {
                    this.file = null;
                    this.stop();
                    this.init(params);
                  };
                  Object.defineProperty(Rive3.prototype, "layout", {
                    /**
                     * Returns the current layout. Note that layout should be treated as
                     * immutable. If you want to change the layout, create a new one use the
                     * layout setter
                     */
                    get: function() {
                      return this._layout;
                    },
                    // Sets a new layout
                    set: function(layout) {
                      this._layout = layout;
                      if (!layout.maxX || !layout.maxY) {
                        this.resizeToCanvas();
                      }
                      if (this.loaded && !this.animator.isPlaying) {
                        this.drawFrame();
                      }
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Rive3.prototype.resizeToCanvas = function() {
                    this._layout = this.layout.copyWith({
                      minX: 0,
                      minY: 0,
                      maxX: this.canvas.width,
                      maxY: this.canvas.height
                    });
                  };
                  Rive3.prototype.resizeDrawingSurfaceToCanvas = function(customDevicePixelRatio) {
                    if (this.canvas instanceof HTMLCanvasElement && !!window) {
                      var _a = this.canvas.getBoundingClientRect(), width = _a.width, height = _a.height;
                      var dpr = customDevicePixelRatio || window.devicePixelRatio || 1;
                      this.devicePixelRatioUsed = dpr;
                      this.canvas.width = dpr * width;
                      this.canvas.height = dpr * height;
                      this._needsRedraw = true;
                      this.resizeToCanvas();
                      this.drawFrame();
                      if (this.layout.fit === Fit2.Layout) {
                        var scaleFactor = this._layout.layoutScaleFactor;
                        this.artboard.width = width / scaleFactor;
                        this.artboard.height = height / scaleFactor;
                      }
                    }
                  };
                  Object.defineProperty(Rive3.prototype, "source", {
                    // Returns the animation source, which may be undefined
                    get: function() {
                      return this.src;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "activeArtboard", {
                    /**
                     * Returns the name of the active artboard
                     */
                    get: function() {
                      return this.artboard ? this.artboard.name : "";
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "animationNames", {
                    // Returns a list of animation names on the chosen artboard
                    get: function() {
                      if (!this.loaded || !this.artboard) {
                        return [];
                      }
                      var animationNames = [];
                      for (var i = 0; i < this.artboard.animationCount(); i++) {
                        animationNames.push(this.artboard.animationByIndex(i).name);
                      }
                      return animationNames;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "stateMachineNames", {
                    /**
                     * Returns a list of state machine names from the current artboard
                     */
                    get: function() {
                      if (!this.loaded || !this.artboard) {
                        return [];
                      }
                      var stateMachineNames = [];
                      for (var i = 0; i < this.artboard.stateMachineCount(); i++) {
                        stateMachineNames.push(this.artboard.stateMachineByIndex(i).name);
                      }
                      return stateMachineNames;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Rive3.prototype.stateMachineInputs = function(name) {
                    if (!this.loaded) {
                      return;
                    }
                    var stateMachine = this.animator.stateMachines.find(function(m) {
                      return m.name === name;
                    });
                    return stateMachine === null || stateMachine === void 0 ? void 0 : stateMachine.inputs;
                  };
                  Rive3.prototype.retrieveInputAtPath = function(name, path) {
                    if (!name) {
                      console.warn("No input name provided for path '".concat(path, "'"));
                      return;
                    }
                    if (!this.artboard) {
                      console.warn("Tried to access input: '".concat(name, "', at path: '").concat(path, "', but the Artboard is null"));
                      return;
                    }
                    var input = this.artboard.inputByPath(name, path);
                    if (!input) {
                      console.warn("Could not access an input with name: '".concat(name, "', at path:'").concat(path, "'"));
                      return;
                    }
                    return input;
                  };
                  Rive3.prototype.setBooleanStateAtPath = function(inputName, value, path) {
                    var input = this.retrieveInputAtPath(inputName, path);
                    if (!input)
                      return;
                    if (input.type === StateMachineInputType.Boolean) {
                      input.asBool().value = value;
                    } else {
                      console.warn("Input with name: '".concat(inputName, "', at path:'").concat(path, "' is not a boolean"));
                    }
                  };
                  Rive3.prototype.setNumberStateAtPath = function(inputName, value, path) {
                    var input = this.retrieveInputAtPath(inputName, path);
                    if (!input)
                      return;
                    if (input.type === StateMachineInputType.Number) {
                      input.asNumber().value = value;
                    } else {
                      console.warn("Input with name: '".concat(inputName, "', at path:'").concat(path, "' is not a number"));
                    }
                  };
                  Rive3.prototype.fireStateAtPath = function(inputName, path) {
                    var input = this.retrieveInputAtPath(inputName, path);
                    if (!input)
                      return;
                    if (input.type === StateMachineInputType.Trigger) {
                      input.asTrigger().fire();
                    } else {
                      console.warn("Input with name: '".concat(inputName, "', at path:'").concat(path, "' is not a trigger"));
                    }
                  };
                  Rive3.prototype.retrieveTextAtPath = function(name, path) {
                    if (!name) {
                      console.warn("No text name provided for path '".concat(path, "'"));
                      return;
                    }
                    if (!path) {
                      console.warn("No path provided for text '".concat(name, "'"));
                      return;
                    }
                    if (!this.artboard) {
                      console.warn("Tried to access text: '".concat(name, "', at path: '").concat(path, "', but the Artboard is null"));
                      return;
                    }
                    var text = this.artboard.textByPath(name, path);
                    if (!text) {
                      console.warn("Could not access text with name: '".concat(name, "', at path:'").concat(path, "'"));
                      return;
                    }
                    return text;
                  };
                  Rive3.prototype.getTextRunValueAtPath = function(textName, path) {
                    var run = this.retrieveTextAtPath(textName, path);
                    if (!run) {
                      console.warn("Could not get text with name: '".concat(textName, "', at path:'").concat(path, "'"));
                      return;
                    }
                    return run.text;
                  };
                  Rive3.prototype.setTextRunValueAtPath = function(textName, value, path) {
                    var run = this.retrieveTextAtPath(textName, path);
                    if (!run) {
                      console.warn("Could not set text with name: '".concat(textName, "', at path:'").concat(path, "'"));
                      return;
                    }
                    run.text = value;
                  };
                  Object.defineProperty(Rive3.prototype, "playingStateMachineNames", {
                    // Returns a list of playing machine names
                    get: function() {
                      if (!this.loaded) {
                        return [];
                      }
                      return this.animator.stateMachines.filter(function(m) {
                        return m.playing;
                      }).map(function(m) {
                        return m.name;
                      });
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "playingAnimationNames", {
                    // Returns a list of playing animation names
                    get: function() {
                      if (!this.loaded) {
                        return [];
                      }
                      return this.animator.animations.filter(function(a) {
                        return a.playing;
                      }).map(function(a) {
                        return a.name;
                      });
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "pausedAnimationNames", {
                    // Returns a list of paused animation names
                    get: function() {
                      if (!this.loaded) {
                        return [];
                      }
                      return this.animator.animations.filter(function(a) {
                        return !a.playing;
                      }).map(function(a) {
                        return a.name;
                      });
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "pausedStateMachineNames", {
                    /**
                     *  Returns a list of paused machine names
                     * @returns a list of state machine names that are paused
                     */
                    get: function() {
                      if (!this.loaded) {
                        return [];
                      }
                      return this.animator.stateMachines.filter(function(m) {
                        return !m.playing;
                      }).map(function(m) {
                        return m.name;
                      });
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "isPlaying", {
                    /**
                     * @returns true if any animation is playing
                     */
                    get: function() {
                      return this.animator.isPlaying;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "isPaused", {
                    /**
                     * @returns true if all instanced animations are paused
                     */
                    get: function() {
                      return this.animator.isPaused;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "isStopped", {
                    /**
                     * @returns true if no animations are playing or paused
                     */
                    get: function() {
                      var _a, _b;
                      return (_b = (_a = this.animator) === null || _a === void 0 ? void 0 : _a.isStopped) !== null && _b !== void 0 ? _b : true;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "bounds", {
                    /**
                     * @returns the bounds of the current artboard, or undefined if the artboard
                     * isn't loaded yet.
                     */
                    get: function() {
                      return this.artboard ? this.artboard.bounds : void 0;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Rive3.prototype.on = function(type, callback) {
                    this.eventManager.add({
                      type,
                      callback
                    });
                  };
                  Rive3.prototype.off = function(type, callback) {
                    this.eventManager.remove({
                      type,
                      callback
                    });
                  };
                  Rive3.prototype.unsubscribe = function(type, callback) {
                    console.warn("This function is deprecated: please use `off()` instead.");
                    this.off(type, callback);
                  };
                  Rive3.prototype.removeAllRiveEventListeners = function(type) {
                    this.eventManager.removeAll(type);
                  };
                  Rive3.prototype.unsubscribeAll = function(type) {
                    console.warn("This function is deprecated: please use `removeAllRiveEventListeners()` instead.");
                    this.removeAllRiveEventListeners(type);
                  };
                  Rive3.prototype.stopRendering = function() {
                    this._explicitlyStoppedRendering = true;
                    if (this.loaded && this.frameRequestId) {
                      if (this.runtime.cancelAnimationFrame) {
                        this.runtime.cancelAnimationFrame(this.frameRequestId);
                      } else {
                        cancelAnimationFrame(this.frameRequestId);
                      }
                      this.frameRequestId = null;
                    }
                  };
                  Rive3.prototype.startRendering = function() {
                    this._explicitlyStoppedRendering = false;
                    this.drawFrame();
                  };
                  Rive3.prototype.scheduleRendering = function() {
                    if (this.loaded && this.artboard && !this.frameRequestId) {
                      if (this.runtime.requestAnimationFrame) {
                        this.frameRequestId = this.runtime.requestAnimationFrame(this._boundDraw);
                      } else {
                        this.frameRequestId = requestAnimationFrame(this._boundDraw);
                      }
                    }
                  };
                  Rive3.prototype._onPageVisibilityChange = function() {
                    var _a, _b;
                    if (document.hidden) {
                      if (this.frameRequestId !== null) {
                        if ((_a = this.runtime) === null || _a === void 0 ? void 0 : _a.cancelAnimationFrame) {
                          this.runtime.cancelAnimationFrame(this.frameRequestId);
                        } else {
                          cancelAnimationFrame(this.frameRequestId);
                        }
                        this.frameRequestId = null;
                      }
                      this.lastRenderTime = 0;
                    } else if (((_b = this.animator) === null || _b === void 0 ? void 0 : _b.isPlaying) && !this._explicitlyStoppedRendering) {
                      this.scheduleRendering();
                    }
                  };
                  Rive3.prototype.enableFPSCounter = function(fpsCallback) {
                    this.runtime.enableFPSCounter(fpsCallback);
                  };
                  Rive3.prototype.disableFPSCounter = function() {
                    this.runtime.disableFPSCounter();
                  };
                  Object.defineProperty(Rive3.prototype, "contents", {
                    /**
                     * Returns the contents of a Rive file: the artboards, animations, and state machines
                     */
                    get: function() {
                      if (!this.loaded) {
                        return void 0;
                      }
                      var riveContents = {
                        artboards: []
                      };
                      for (var i = 0; i < this.file.artboardCount(); i++) {
                        var artboard = this.file.artboardByIndex(i);
                        var artboardContents = {
                          name: artboard.name,
                          animations: [],
                          stateMachines: []
                        };
                        for (var j = 0; j < artboard.animationCount(); j++) {
                          var animation = artboard.animationByIndex(j);
                          artboardContents.animations.push(animation.name);
                        }
                        for (var k = 0; k < artboard.stateMachineCount(); k++) {
                          var stateMachine = artboard.stateMachineByIndex(k);
                          var name_1 = stateMachine.name;
                          var instance = new this.runtime.StateMachineInstance(stateMachine, artboard);
                          var inputContents = [];
                          for (var l = 0; l < instance.inputCount(); l++) {
                            var input = instance.input(l);
                            inputContents.push({ name: input.name, type: input.type });
                          }
                          artboardContents.stateMachines.push({
                            name: name_1,
                            inputs: inputContents
                          });
                        }
                        riveContents.artboards.push(artboardContents);
                      }
                      return riveContents;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "volume", {
                    /**
                     * Getter / Setter for the volume of the artboard
                     */
                    get: function() {
                      if (this.artboard && this.artboard.volume !== this._volume) {
                        this._volume = this.artboard.volume;
                      }
                      return this._volume;
                    },
                    set: function(value) {
                      this._volume = value;
                      if (this.artboard) {
                        this.artboard.volume = value * audioManager.systemVolume;
                      }
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "artboardWidth", {
                    /**
                     * The width of the artboard.
                     *
                     * This will return 0 if the artboard is not loaded yet and a custom
                     * width has not been set.
                     *
                     * Do not set this value manually when using {@link resizeDrawingSurfaceToCanvas}
                     * with a {@link Layout.fit} of {@link Fit.Layout}, as the artboard width is
                     * automatically set.
                     */
                    get: function() {
                      var _a;
                      if (this.artboard) {
                        return this.artboard.width;
                      }
                      return (_a = this._artboardWidth) !== null && _a !== void 0 ? _a : 0;
                    },
                    set: function(value) {
                      this._artboardWidth = value;
                      if (this.artboard) {
                        this.artboard.width = value;
                      }
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(Rive3.prototype, "artboardHeight", {
                    /**
                     * The height of the artboard.
                     *
                     * This will return 0 if the artboard is not loaded yet and a custom
                     * height has not been set.
                     *
                     * Do not set this value manually when using {@link resizeDrawingSurfaceToCanvas}
                     * with a {@link Layout.fit} of {@link Fit.Layout}, as the artboard height is
                     * automatically set.
                     */
                    get: function() {
                      var _a;
                      if (this.artboard) {
                        return this.artboard.height;
                      }
                      return (_a = this._artboardHeight) !== null && _a !== void 0 ? _a : 0;
                    },
                    set: function(value) {
                      this._artboardHeight = value;
                      if (this.artboard) {
                        this.artboard.height = value;
                      }
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Rive3.prototype.resetArtboardSize = function() {
                    if (this.artboard) {
                      this.artboard.resetArtboardSize();
                      this._artboardWidth = this.artboard.width;
                      this._artboardHeight = this.artboard.height;
                    } else {
                      this._artboardWidth = void 0;
                      this._artboardHeight = void 0;
                    }
                  };
                  Object.defineProperty(Rive3.prototype, "devicePixelRatioUsed", {
                    /**
                     * The device pixel ratio used in rendering and canvas/artboard resizing.
                     *
                     * This value will be overidden by the device pixel ratio used in
                     * {@link resizeDrawingSurfaceToCanvas}. If you use that method, do not set this value.
                     */
                    get: function() {
                      return this._devicePixelRatioUsed;
                    },
                    set: function(value) {
                      this._devicePixelRatioUsed = value;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Rive3.prototype.bindViewModelInstance = function(viewModelInstance) {
                    var _a;
                    if (this.artboard && !this.destroyed) {
                      if (viewModelInstance && viewModelInstance.runtimeInstance) {
                        viewModelInstance.internalIncrementReferenceCount();
                        (_a = this._viewModelInstance) === null || _a === void 0 ? void 0 : _a.cleanup();
                        this._viewModelInstance = viewModelInstance;
                        if (this.animator.stateMachines.length > 0) {
                          this.animator.stateMachines.forEach(function(stateMachine) {
                            return stateMachine.bindViewModelInstance(viewModelInstance);
                          });
                        } else {
                          this.artboard.bindViewModelInstance(viewModelInstance.runtimeInstance);
                        }
                      }
                    }
                  };
                  Object.defineProperty(Rive3.prototype, "viewModelInstance", {
                    get: function() {
                      return this._viewModelInstance;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Rive3.prototype.viewModelByIndex = function(index) {
                    var viewModel = this.file.viewModelByIndex(index);
                    if (viewModel !== null) {
                      return new ViewModel(viewModel);
                    }
                    return null;
                  };
                  Rive3.prototype.viewModelByName = function(name) {
                    var _a;
                    return (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.viewModelByName(name);
                  };
                  Rive3.prototype.enums = function() {
                    if (this._dataEnums === null) {
                      var dataEnums = this.file.enums();
                      this._dataEnums = dataEnums.map(function(dataEnum) {
                        return new DataEnum(dataEnum);
                      });
                    }
                    return this._dataEnums;
                  };
                  Rive3.prototype.defaultViewModel = function() {
                    if (this.artboard) {
                      var viewModel = this.file.defaultArtboardViewModel(this.artboard);
                      if (viewModel) {
                        return new ViewModel(viewModel);
                      }
                    }
                    return null;
                  };
                  Rive3.prototype.getArtboard = function(name) {
                    var _a, _b;
                    return (_b = (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.getArtboard(name)) !== null && _b !== void 0 ? _b : null;
                  };
                  Rive3.prototype.getBindableArtboard = function(name) {
                    var _a, _b;
                    return (_b = (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.getBindableArtboard(name)) !== null && _b !== void 0 ? _b : null;
                  };
                  Rive3.prototype.getDefaultBindableArtboard = function() {
                    var _a, _b;
                    return (_b = (_a = this.riveFile) === null || _a === void 0 ? void 0 : _a.getDefaultBindableArtboard()) !== null && _b !== void 0 ? _b : null;
                  };
                  Rive3.prototype.clearFocus = function() {
                    var playingStateMachines = this.animator.stateMachines.filter(function(sm) {
                      return sm.playing && sm.hasFocusNodes;
                    });
                    playingStateMachines.forEach(function(sm) {
                      return sm.clearFocus();
                    });
                  };
                  Rive3.missingErrorMessage = "Rive source file or data buffer required";
                  Rive3.cleanupErrorMessage = "Attempt to use file after calling cleanup.";
                  return Rive3;
                }()
              );
              var DataType;
              (function(DataType2) {
                DataType2["none"] = "none";
                DataType2["string"] = "string";
                DataType2["number"] = "number";
                DataType2["boolean"] = "boolean";
                DataType2["color"] = "color";
                DataType2["list"] = "list";
                DataType2["enumType"] = "enumType";
                DataType2["trigger"] = "trigger";
                DataType2["viewModel"] = "viewModel";
                DataType2["integer"] = "integer";
                DataType2["listIndex"] = "listIndex";
                DataType2["image"] = "image";
                DataType2["artboard"] = "artboard";
              })(DataType || (DataType = {}));
              var ViewModel = (
                /** @class */
                function() {
                  function ViewModel2(viewModel) {
                    this._viewModel = viewModel;
                  }
                  Object.defineProperty(ViewModel2.prototype, "instanceCount", {
                    get: function() {
                      return this._viewModel.instanceCount;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(ViewModel2.prototype, "name", {
                    get: function() {
                      return this._viewModel.name;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModel2.prototype.instanceByIndex = function(index) {
                    var instance = this._viewModel.instanceByIndex(index);
                    if (instance !== null) {
                      var viewModelInstance = new ViewModelInstance(instance, null);
                      (0, _utils__WEBPACK_IMPORTED_MODULE_2__.createFinalization)(viewModelInstance, instance);
                      return viewModelInstance;
                    }
                    return null;
                  };
                  ViewModel2.prototype.instanceByName = function(name) {
                    var instance = this._viewModel.instanceByName(name);
                    if (instance !== null) {
                      var viewModelInstance = new ViewModelInstance(instance, null);
                      (0, _utils__WEBPACK_IMPORTED_MODULE_2__.createFinalization)(viewModelInstance, instance);
                      return viewModelInstance;
                    }
                    return null;
                  };
                  ViewModel2.prototype.defaultInstance = function() {
                    var runtimeInstance = this._viewModel.defaultInstance();
                    if (runtimeInstance !== null) {
                      var viewModelInstance = new ViewModelInstance(runtimeInstance, null);
                      (0, _utils__WEBPACK_IMPORTED_MODULE_2__.createFinalization)(viewModelInstance, runtimeInstance);
                      return viewModelInstance;
                    }
                    return null;
                  };
                  ViewModel2.prototype.instance = function() {
                    var runtimeInstance = this._viewModel.instance();
                    if (runtimeInstance !== null) {
                      var viewModelInstance = new ViewModelInstance(runtimeInstance, null);
                      (0, _utils__WEBPACK_IMPORTED_MODULE_2__.createFinalization)(viewModelInstance, runtimeInstance);
                      return viewModelInstance;
                    }
                    return null;
                  };
                  Object.defineProperty(ViewModel2.prototype, "properties", {
                    get: function() {
                      return this._viewModel.getProperties();
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(ViewModel2.prototype, "instanceNames", {
                    get: function() {
                      return this._viewModel.getInstanceNames();
                    },
                    enumerable: false,
                    configurable: true
                  });
                  return ViewModel2;
                }()
              );
              var DataEnum = (
                /** @class */
                function() {
                  function DataEnum2(dataEnum) {
                    this._dataEnum = dataEnum;
                  }
                  Object.defineProperty(DataEnum2.prototype, "name", {
                    get: function() {
                      return this._dataEnum.name;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(DataEnum2.prototype, "values", {
                    get: function() {
                      return this._dataEnum.values;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  return DataEnum2;
                }()
              );
              var PropertyType;
              (function(PropertyType2) {
                PropertyType2["Number"] = "number";
                PropertyType2["String"] = "string";
                PropertyType2["Boolean"] = "boolean";
                PropertyType2["Color"] = "color";
                PropertyType2["Trigger"] = "trigger";
                PropertyType2["Enum"] = "enum";
                PropertyType2["List"] = "list";
                PropertyType2["Image"] = "image";
                PropertyType2["Artboard"] = "artboard";
              })(PropertyType || (PropertyType = {}));
              var ViewModelInstance = (
                /** @class */
                function() {
                  function ViewModelInstance2(runtimeInstance, parent) {
                    this._parents = [];
                    this._children = [];
                    this._viewModelInstances = /* @__PURE__ */ new Map();
                    this._propertiesWithCallbacks = [];
                    this._referenceCount = 0;
                    this.selfUnref = false;
                    this._runtimeInstance = runtimeInstance;
                    if (parent !== null) {
                      this._parents.push(parent);
                    }
                  }
                  Object.defineProperty(ViewModelInstance2.prototype, "runtimeInstance", {
                    get: function() {
                      return this._runtimeInstance;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(ViewModelInstance2.prototype, "nativeInstance", {
                    get: function() {
                      return this._runtimeInstance;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstance2.prototype.handleCallbacks = function() {
                    if (this._propertiesWithCallbacks.length !== 0) {
                      this._propertiesWithCallbacks.forEach(function(property) {
                        property.handleCallbacks();
                      });
                      this._propertiesWithCallbacks.forEach(function(property) {
                        property.clearChanges();
                      });
                    }
                    this._children.forEach(function(child) {
                      return child.handleCallbacks();
                    });
                  };
                  ViewModelInstance2.prototype.addParent = function(parent) {
                    if (!this._parents.includes(parent)) {
                      this._parents.push(parent);
                      if (this._propertiesWithCallbacks.length > 0 || this._children.length > 0) {
                        parent.addToViewModelCallbacks(this);
                      }
                    }
                  };
                  ViewModelInstance2.prototype.removeParent = function(parent) {
                    var index = this._parents.indexOf(parent);
                    if (index !== -1) {
                      var parent_1 = this._parents[index];
                      parent_1.removeFromViewModelCallbacks(this);
                      this._parents.splice(index, 1);
                    }
                  };
                  ViewModelInstance2.prototype.addToPropertyCallbacks = function(property) {
                    var _this = this;
                    if (!this._propertiesWithCallbacks.includes(property)) {
                      this._propertiesWithCallbacks.push(property);
                      if (this._propertiesWithCallbacks.length > 0) {
                        this._parents.forEach(function(parent) {
                          parent.addToViewModelCallbacks(_this);
                        });
                      }
                    }
                  };
                  ViewModelInstance2.prototype.removeFromPropertyCallbacks = function(property) {
                    var _this = this;
                    if (this._propertiesWithCallbacks.includes(property)) {
                      this._propertiesWithCallbacks = this._propertiesWithCallbacks.filter(function(prop) {
                        return prop !== property;
                      });
                      if (this._children.length === 0 && this._propertiesWithCallbacks.length === 0) {
                        this._parents.forEach(function(parent) {
                          parent.removeFromViewModelCallbacks(_this);
                        });
                      }
                    }
                  };
                  ViewModelInstance2.prototype.addToViewModelCallbacks = function(instance) {
                    var _this = this;
                    if (!this._children.includes(instance)) {
                      this._children.push(instance);
                      this._parents.forEach(function(parent) {
                        parent.addToViewModelCallbacks(_this);
                      });
                    }
                  };
                  ViewModelInstance2.prototype.removeFromViewModelCallbacks = function(instance) {
                    var _this = this;
                    if (this._children.includes(instance)) {
                      this._children = this._children.filter(function(child) {
                        return child !== instance;
                      });
                      if (this._children.length === 0 && this._propertiesWithCallbacks.length === 0) {
                        this._parents.forEach(function(parent) {
                          parent.removeFromViewModelCallbacks(_this);
                        });
                      }
                    }
                  };
                  ViewModelInstance2.prototype.clearCallbacks = function() {
                    this._propertiesWithCallbacks.forEach(function(property) {
                      property.clearCallbacks();
                    });
                  };
                  ViewModelInstance2.prototype.propertyFromPath = function(path, type) {
                    var pathSegments = path.split("/");
                    return this.propertyFromPathSegments(pathSegments, 0, type);
                  };
                  ViewModelInstance2.prototype.viewModelFromPathSegments = function(pathSegments, index) {
                    var viewModelInstance = this.internalViewModelInstance(pathSegments[index]);
                    if (viewModelInstance !== null) {
                      if (index == pathSegments.length - 1) {
                        return viewModelInstance;
                      } else {
                        return viewModelInstance.viewModelFromPathSegments(pathSegments, index++);
                      }
                    }
                    return null;
                  };
                  ViewModelInstance2.prototype.propertyFromPathSegments = function(pathSegments, index, type) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                    if (index < pathSegments.length - 1) {
                      var viewModelInstance = this.internalViewModelInstance(pathSegments[index]);
                      if (viewModelInstance !== null) {
                        return viewModelInstance.propertyFromPathSegments(pathSegments, index + 1, type);
                      } else {
                        return null;
                      }
                    }
                    var instance = null;
                    switch (type) {
                      case PropertyType.Number:
                        instance = (_b = (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.number(pathSegments[index])) !== null && _b !== void 0 ? _b : null;
                        if (instance !== null) {
                          return new ViewModelInstanceNumber(instance, this);
                        }
                        break;
                      case PropertyType.String:
                        instance = (_d = (_c = this._runtimeInstance) === null || _c === void 0 ? void 0 : _c.string(pathSegments[index])) !== null && _d !== void 0 ? _d : null;
                        if (instance !== null) {
                          return new ViewModelInstanceString(instance, this);
                        }
                        break;
                      case PropertyType.Boolean:
                        instance = (_f = (_e = this._runtimeInstance) === null || _e === void 0 ? void 0 : _e.boolean(pathSegments[index])) !== null && _f !== void 0 ? _f : null;
                        if (instance !== null) {
                          return new ViewModelInstanceBoolean(instance, this);
                        }
                        break;
                      case PropertyType.Color:
                        instance = (_h = (_g = this._runtimeInstance) === null || _g === void 0 ? void 0 : _g.color(pathSegments[index])) !== null && _h !== void 0 ? _h : null;
                        if (instance !== null) {
                          return new ViewModelInstanceColor(instance, this);
                        }
                        break;
                      case PropertyType.Trigger:
                        instance = (_k = (_j = this._runtimeInstance) === null || _j === void 0 ? void 0 : _j.trigger(pathSegments[index])) !== null && _k !== void 0 ? _k : null;
                        if (instance !== null) {
                          return new ViewModelInstanceTrigger(instance, this);
                        }
                        break;
                      case PropertyType.Enum:
                        instance = (_m = (_l = this._runtimeInstance) === null || _l === void 0 ? void 0 : _l.enum(pathSegments[index])) !== null && _m !== void 0 ? _m : null;
                        if (instance !== null) {
                          return new ViewModelInstanceEnum(instance, this);
                        }
                        break;
                      case PropertyType.List:
                        instance = (_p = (_o = this._runtimeInstance) === null || _o === void 0 ? void 0 : _o.list(pathSegments[index])) !== null && _p !== void 0 ? _p : null;
                        if (instance !== null) {
                          return new ViewModelInstanceList(instance, this);
                        }
                        break;
                      case PropertyType.Image:
                        instance = (_r = (_q = this._runtimeInstance) === null || _q === void 0 ? void 0 : _q.image(pathSegments[index])) !== null && _r !== void 0 ? _r : null;
                        if (instance !== null) {
                          return new ViewModelInstanceAssetImage(instance, this);
                        }
                        break;
                      case PropertyType.Artboard:
                        instance = (_t = (_s = this._runtimeInstance) === null || _s === void 0 ? void 0 : _s.artboard(pathSegments[index])) !== null && _t !== void 0 ? _t : null;
                        if (instance !== null) {
                          return new ViewModelInstanceArtboard(instance, this);
                        }
                        break;
                    }
                    return null;
                  };
                  ViewModelInstance2.prototype.internalViewModelInstance = function(name) {
                    var _a;
                    if (this._viewModelInstances.has(name)) {
                      return this._viewModelInstances.get(name);
                    }
                    var viewModelRuntimeInstance = (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.viewModel(name);
                    if (viewModelRuntimeInstance !== null) {
                      var viewModelInstance = new ViewModelInstance2(viewModelRuntimeInstance, this);
                      (0, _utils__WEBPACK_IMPORTED_MODULE_2__.createFinalization)(viewModelInstance, viewModelRuntimeInstance);
                      viewModelInstance.internalIncrementReferenceCount();
                      this._viewModelInstances.set(name, viewModelInstance);
                      return viewModelInstance;
                    }
                    return null;
                  };
                  ViewModelInstance2.prototype.number = function(path) {
                    var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Number);
                    return viewmodelInstanceValue;
                  };
                  ViewModelInstance2.prototype.string = function(path) {
                    var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.String);
                    return viewmodelInstanceValue;
                  };
                  ViewModelInstance2.prototype.boolean = function(path) {
                    var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Boolean);
                    return viewmodelInstanceValue;
                  };
                  ViewModelInstance2.prototype.color = function(path) {
                    var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Color);
                    return viewmodelInstanceValue;
                  };
                  ViewModelInstance2.prototype.trigger = function(path) {
                    var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Trigger);
                    return viewmodelInstanceValue;
                  };
                  ViewModelInstance2.prototype.enum = function(path) {
                    var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Enum);
                    return viewmodelInstanceValue;
                  };
                  ViewModelInstance2.prototype.list = function(path) {
                    var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.List);
                    return viewmodelInstanceValue;
                  };
                  ViewModelInstance2.prototype.image = function(path) {
                    var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Image);
                    return viewmodelInstanceValue;
                  };
                  ViewModelInstance2.prototype.artboard = function(path) {
                    var viewmodelInstanceValue = this.propertyFromPath(path, PropertyType.Artboard);
                    return viewmodelInstanceValue;
                  };
                  ViewModelInstance2.prototype.viewModel = function(path) {
                    var pathSegments = path.split("/");
                    var parentViewModelInstance = pathSegments.length > 1 ? this.viewModelFromPathSegments(pathSegments.slice(0, pathSegments.length - 1), 0) : this;
                    if (parentViewModelInstance != null) {
                      return parentViewModelInstance.internalViewModelInstance(pathSegments[pathSegments.length - 1]);
                    }
                    return null;
                  };
                  ViewModelInstance2.prototype.internalReplaceViewModel = function(name, value) {
                    var _a;
                    if (value.runtimeInstance !== null) {
                      var result = ((_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.replaceViewModel(name, value.runtimeInstance)) || false;
                      if (result) {
                        value.internalIncrementReferenceCount();
                        var oldInstance_1 = this.internalViewModelInstance(name);
                        if (oldInstance_1 !== null) {
                          oldInstance_1.removeParent(this);
                          if (this._children.includes(oldInstance_1)) {
                            this._children = this._children.filter(function(child) {
                              return child !== oldInstance_1;
                            });
                          }
                          oldInstance_1.cleanup();
                        }
                        this._viewModelInstances.set(name, value);
                        value.addParent(this);
                      }
                      return result;
                    }
                    return false;
                  };
                  ViewModelInstance2.prototype.replaceViewModel = function(path, value) {
                    var _a;
                    var pathSegments = path.split("/");
                    var viewModelInstance = pathSegments.length > 1 ? this.viewModelFromPathSegments(pathSegments.slice(0, pathSegments.length - 1), 0) : this;
                    return (_a = viewModelInstance === null || viewModelInstance === void 0 ? void 0 : viewModelInstance.internalReplaceViewModel(pathSegments[pathSegments.length - 1], value)) !== null && _a !== void 0 ? _a : false;
                  };
                  ViewModelInstance2.prototype.incrementReferenceCount = function() {
                    var _a;
                    this._referenceCount++;
                    (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.incrementReferenceCount();
                  };
                  ViewModelInstance2.prototype.decrementReferenceCount = function() {
                    var _a;
                    this._referenceCount--;
                    (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.decrementReferenceCount();
                  };
                  Object.defineProperty(ViewModelInstance2.prototype, "properties", {
                    get: function() {
                      var _a;
                      return ((_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.getProperties().map(function(prop) {
                        return __assign({}, prop);
                      })) || [];
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(ViewModelInstance2.prototype, "viewModelName", {
                    /**
                     * Get the name of the ViewModel definition this instance was created from.
                     */
                    get: function() {
                      var _a, _b;
                      return (_b = (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.getViewModelName()) !== null && _b !== void 0 ? _b : "";
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstance2.prototype.internalIncrementReferenceCount = function() {
                    this._referenceCount++;
                  };
                  ViewModelInstance2.prototype.cleanup = function() {
                    var _this = this;
                    var _a;
                    this._referenceCount--;
                    if (this._referenceCount <= 0) {
                      if (this.selfUnref) {
                        (_a = this._runtimeInstance) === null || _a === void 0 ? void 0 : _a.unref();
                      }
                      this._runtimeInstance = null;
                      this.clearCallbacks();
                      this._propertiesWithCallbacks = [];
                      this._viewModelInstances.forEach(function(value) {
                        value.cleanup();
                      });
                      this._viewModelInstances.clear();
                      var children = __spreadArray([], this._children, true);
                      this._children.length = 0;
                      var parents = __spreadArray([], this._parents, true);
                      this._parents.length = 0;
                      children.forEach(function(child) {
                        child.removeParent(_this);
                      });
                      parents.forEach(function(parent) {
                        parent.removeFromViewModelCallbacks(_this);
                      });
                    }
                  };
                  return ViewModelInstance2;
                }()
              );
              var ViewModelInstanceValue = (
                /** @class */
                function() {
                  function ViewModelInstanceValue2(instance, parent) {
                    this.callbacks = [];
                    this._viewModelInstanceValue = instance;
                    this._parentViewModel = parent;
                  }
                  ViewModelInstanceValue2.prototype.on = function(callback) {
                    if (this.callbacks.length === 0) {
                      this._viewModelInstanceValue.clearChanges();
                    }
                    if (!this.callbacks.includes(callback)) {
                      this.callbacks.push(callback);
                      this._parentViewModel.addToPropertyCallbacks(this);
                    }
                  };
                  ViewModelInstanceValue2.prototype.off = function(callback) {
                    if (!callback) {
                      this.callbacks.length = 0;
                    } else {
                      this.callbacks = this.callbacks.filter(function(cb) {
                        return cb !== callback;
                      });
                    }
                    if (this.callbacks.length === 0) {
                      this._parentViewModel.removeFromPropertyCallbacks(this);
                    }
                  };
                  ViewModelInstanceValue2.prototype.internalHandleCallback = function(callback) {
                  };
                  ViewModelInstanceValue2.prototype.handleCallbacks = function() {
                    var _this = this;
                    if (this._viewModelInstanceValue.hasChanged) {
                      this.callbacks.forEach(function(callback) {
                        _this.internalHandleCallback(callback);
                      });
                    }
                  };
                  ViewModelInstanceValue2.prototype.clearChanges = function() {
                    this._viewModelInstanceValue.clearChanges();
                  };
                  ViewModelInstanceValue2.prototype.clearCallbacks = function() {
                    this.callbacks.length = 0;
                  };
                  Object.defineProperty(ViewModelInstanceValue2.prototype, "name", {
                    get: function() {
                      return this._viewModelInstanceValue.name;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  return ViewModelInstanceValue2;
                }()
              );
              var ViewModelInstanceString = (
                /** @class */
                function(_super) {
                  __extends(ViewModelInstanceString2, _super);
                  function ViewModelInstanceString2(instance, parent) {
                    return _super.call(this, instance, parent) || this;
                  }
                  Object.defineProperty(ViewModelInstanceString2.prototype, "value", {
                    get: function() {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function(val) {
                      this._viewModelInstanceValue.value = val;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstanceString2.prototype.internalHandleCallback = function(callback) {
                    callback(this.value);
                  };
                  return ViewModelInstanceString2;
                }(ViewModelInstanceValue)
              );
              var ViewModelInstanceNumber = (
                /** @class */
                function(_super) {
                  __extends(ViewModelInstanceNumber2, _super);
                  function ViewModelInstanceNumber2(instance, parent) {
                    return _super.call(this, instance, parent) || this;
                  }
                  Object.defineProperty(ViewModelInstanceNumber2.prototype, "value", {
                    get: function() {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function(val) {
                      this._viewModelInstanceValue.value = val;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstanceNumber2.prototype.internalHandleCallback = function(callback) {
                    callback(this.value);
                  };
                  return ViewModelInstanceNumber2;
                }(ViewModelInstanceValue)
              );
              var ViewModelInstanceBoolean = (
                /** @class */
                function(_super) {
                  __extends(ViewModelInstanceBoolean2, _super);
                  function ViewModelInstanceBoolean2(instance, parent) {
                    return _super.call(this, instance, parent) || this;
                  }
                  Object.defineProperty(ViewModelInstanceBoolean2.prototype, "value", {
                    get: function() {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function(val) {
                      this._viewModelInstanceValue.value = val;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstanceBoolean2.prototype.internalHandleCallback = function(callback) {
                    callback(this.value);
                  };
                  return ViewModelInstanceBoolean2;
                }(ViewModelInstanceValue)
              );
              var ViewModelInstanceTrigger = (
                /** @class */
                function(_super) {
                  __extends(ViewModelInstanceTrigger2, _super);
                  function ViewModelInstanceTrigger2(instance, parent) {
                    return _super.call(this, instance, parent) || this;
                  }
                  ViewModelInstanceTrigger2.prototype.trigger = function() {
                    return this._viewModelInstanceValue.trigger();
                  };
                  ViewModelInstanceTrigger2.prototype.internalHandleCallback = function(callback) {
                    callback();
                  };
                  return ViewModelInstanceTrigger2;
                }(ViewModelInstanceValue)
              );
              var ViewModelInstanceEnum = (
                /** @class */
                function(_super) {
                  __extends(ViewModelInstanceEnum2, _super);
                  function ViewModelInstanceEnum2(instance, parent) {
                    return _super.call(this, instance, parent) || this;
                  }
                  Object.defineProperty(ViewModelInstanceEnum2.prototype, "value", {
                    get: function() {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function(val) {
                      this._viewModelInstanceValue.value = val;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(ViewModelInstanceEnum2.prototype, "valueIndex", {
                    get: function() {
                      return this._viewModelInstanceValue.valueIndex;
                    },
                    set: function(val) {
                      this._viewModelInstanceValue.valueIndex = val;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  Object.defineProperty(ViewModelInstanceEnum2.prototype, "values", {
                    get: function() {
                      return this._viewModelInstanceValue.values;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstanceEnum2.prototype.internalHandleCallback = function(callback) {
                    callback(this.value);
                  };
                  return ViewModelInstanceEnum2;
                }(ViewModelInstanceValue)
              );
              var ViewModelInstanceList = (
                /** @class */
                function(_super) {
                  __extends(ViewModelInstanceList2, _super);
                  function ViewModelInstanceList2(instance, parent) {
                    return _super.call(this, instance, parent) || this;
                  }
                  Object.defineProperty(ViewModelInstanceList2.prototype, "length", {
                    get: function() {
                      return this._viewModelInstanceValue.size;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstanceList2.prototype.addInstance = function(instance) {
                    if (instance.runtimeInstance != null) {
                      this._viewModelInstanceValue.addInstance(instance.runtimeInstance);
                      instance.addParent(this._parentViewModel);
                    }
                  };
                  ViewModelInstanceList2.prototype.addInstanceAt = function(instance, index) {
                    if (instance.runtimeInstance != null) {
                      if (this._viewModelInstanceValue.addInstanceAt(instance.runtimeInstance, index)) {
                        instance.addParent(this._parentViewModel);
                        return true;
                      }
                    }
                    return false;
                  };
                  ViewModelInstanceList2.prototype.removeInstance = function(instance) {
                    if (instance.runtimeInstance != null) {
                      this._viewModelInstanceValue.removeInstance(instance.runtimeInstance);
                      instance.removeParent(this._parentViewModel);
                    }
                  };
                  ViewModelInstanceList2.prototype.removeInstanceAt = function(index) {
                    this._viewModelInstanceValue.removeInstanceAt(index);
                  };
                  ViewModelInstanceList2.prototype.instanceAt = function(index) {
                    var runtimeInstance = this._viewModelInstanceValue.instanceAt(index);
                    if (runtimeInstance != null) {
                      var viewModelInstance = new ViewModelInstance(runtimeInstance, this._parentViewModel);
                      (0, _utils__WEBPACK_IMPORTED_MODULE_2__.createFinalization)(viewModelInstance, runtimeInstance);
                      return viewModelInstance;
                    }
                    return null;
                  };
                  ViewModelInstanceList2.prototype.swap = function(a, b) {
                    this._viewModelInstanceValue.swap(a, b);
                  };
                  ViewModelInstanceList2.prototype.internalHandleCallback = function(callback) {
                    callback();
                  };
                  return ViewModelInstanceList2;
                }(ViewModelInstanceValue)
              );
              var ViewModelInstanceColor = (
                /** @class */
                function(_super) {
                  __extends(ViewModelInstanceColor2, _super);
                  function ViewModelInstanceColor2(instance, parent) {
                    return _super.call(this, instance, parent) || this;
                  }
                  Object.defineProperty(ViewModelInstanceColor2.prototype, "value", {
                    get: function() {
                      return this._viewModelInstanceValue.value;
                    },
                    set: function(val) {
                      this._viewModelInstanceValue.value = val;
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstanceColor2.prototype.rgb = function(r, g, b) {
                    this._viewModelInstanceValue.rgb(r, g, b);
                  };
                  ViewModelInstanceColor2.prototype.rgba = function(r, g, b, a) {
                    this._viewModelInstanceValue.argb(a, r, g, b);
                  };
                  ViewModelInstanceColor2.prototype.argb = function(a, r, g, b) {
                    this._viewModelInstanceValue.argb(a, r, g, b);
                  };
                  ViewModelInstanceColor2.prototype.alpha = function(a) {
                    this._viewModelInstanceValue.alpha(a);
                  };
                  ViewModelInstanceColor2.prototype.opacity = function(o) {
                    this._viewModelInstanceValue.alpha(Math.round(Math.max(0, Math.min(1, o)) * 255));
                  };
                  ViewModelInstanceColor2.prototype.internalHandleCallback = function(callback) {
                    callback(this.value);
                  };
                  return ViewModelInstanceColor2;
                }(ViewModelInstanceValue)
              );
              var ViewModelInstanceAssetImage = (
                /** @class */
                function(_super) {
                  __extends(ViewModelInstanceAssetImage2, _super);
                  function ViewModelInstanceAssetImage2(instance, root) {
                    return _super.call(this, instance, root) || this;
                  }
                  Object.defineProperty(ViewModelInstanceAssetImage2.prototype, "value", {
                    set: function(image) {
                      var _a;
                      this._viewModelInstanceValue.value((_a = image === null || image === void 0 ? void 0 : image.nativeImage) !== null && _a !== void 0 ? _a : null);
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstanceAssetImage2.prototype.internalHandleCallback = function(callback) {
                    callback();
                  };
                  return ViewModelInstanceAssetImage2;
                }(ViewModelInstanceValue)
              );
              var ViewModelInstanceArtboard = (
                /** @class */
                function(_super) {
                  __extends(ViewModelInstanceArtboard2, _super);
                  function ViewModelInstanceArtboard2(instance, root) {
                    return _super.call(this, instance, root) || this;
                  }
                  Object.defineProperty(ViewModelInstanceArtboard2.prototype, "value", {
                    set: function(artboard) {
                      var _a, _b;
                      var bindableArtboard;
                      if (artboard.isBindableArtboard) {
                        bindableArtboard = artboard;
                      } else {
                        bindableArtboard = artboard.file.internalBindableArtboardFromArtboard(artboard.nativeArtboard);
                      }
                      this._viewModelInstanceValue.value((_a = bindableArtboard === null || bindableArtboard === void 0 ? void 0 : bindableArtboard.nativeArtboard) !== null && _a !== void 0 ? _a : null);
                      if (bindableArtboard === null || bindableArtboard === void 0 ? void 0 : bindableArtboard.nativeViewModel) {
                        this._viewModelInstanceValue.viewModelInstance((_b = bindableArtboard === null || bindableArtboard === void 0 ? void 0 : bindableArtboard.nativeViewModel) !== null && _b !== void 0 ? _b : null);
                      }
                    },
                    enumerable: false,
                    configurable: true
                  });
                  ViewModelInstanceArtboard2.prototype.internalHandleCallback = function(callback) {
                    callback();
                  };
                  return ViewModelInstanceArtboard2;
                }(ViewModelInstanceValue)
              );
              var loadRiveFile = function(src) {
                return __awaiter(void 0, void 0, void 0, function() {
                  var req, res, buffer;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        req = new Request(src);
                        return [4, fetch(req)];
                      case 1:
                        res = _a.sent();
                        if (!res.ok) {
                          throw new Error("Failed to fetch the Rive file: HTTP ".concat(res.status));
                        }
                        return [4, res.arrayBuffer()];
                      case 2:
                        buffer = _a.sent();
                        return [2, buffer];
                    }
                  });
                });
              };
              var mapToStringArray = function(obj) {
                if (typeof obj === "string") {
                  return [obj];
                } else if (obj instanceof Array) {
                  return obj;
                }
                return [];
              };
              var Testing = {
                EventManager,
                TaskQueueManager
              };
              var decodeAudio = function(bytes) {
                return __awaiter(void 0, void 0, void 0, function() {
                  var decodedPromise, audio, audioWrapper;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        decodedPromise = new Promise(function(resolve) {
                          return _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.getInstance(function(rive) {
                            rive.decodeAudio(bytes, resolve);
                          });
                        });
                        return [4, decodedPromise];
                      case 1:
                        audio = _a.sent();
                        audioWrapper = new _utils__WEBPACK_IMPORTED_MODULE_2__.AudioWrapper(audio);
                        _utils__WEBPACK_IMPORTED_MODULE_2__.finalizationRegistry.register(audioWrapper, audio);
                        return [2, audioWrapper];
                    }
                  });
                });
              };
              var decodeImage = function(bytes) {
                return __awaiter(void 0, void 0, void 0, function() {
                  var decodedPromise, image, imageWrapper;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        decodedPromise = new Promise(function(resolve) {
                          return _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.getInstance(function(rive) {
                            rive.decodeImage(bytes, resolve);
                          });
                        });
                        return [4, decodedPromise];
                      case 1:
                        image = _a.sent();
                        imageWrapper = new _utils__WEBPACK_IMPORTED_MODULE_2__.ImageWrapper(image);
                        _utils__WEBPACK_IMPORTED_MODULE_2__.finalizationRegistry.register(imageWrapper, image);
                        return [2, imageWrapper];
                    }
                  });
                });
              };
              var decodeFont = function(bytes) {
                return __awaiter(void 0, void 0, void 0, function() {
                  var decodedPromise, font, fontWrapper;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        decodedPromise = new Promise(function(resolve) {
                          return _runtimeLoader__WEBPACK_IMPORTED_MODULE_1__.RuntimeLoader.getInstance(function(rive) {
                            rive.decodeFont(bytes, resolve);
                          });
                        });
                        return [4, decodedPromise];
                      case 1:
                        font = _a.sent();
                        fontWrapper = new _utils__WEBPACK_IMPORTED_MODULE_2__.FontWrapper(font);
                        _utils__WEBPACK_IMPORTED_MODULE_2__.finalizationRegistry.register(fontWrapper, font);
                        return [2, fontWrapper];
                    }
                  });
                });
              };
            })();
            return __webpack_exports__;
          })()
        );
      });
    }
  });

  // src/index.ts
  init_live_reload();

  // src/init-site.ts
  init_live_reload();

  // src/components/accordions/index.ts
  init_live_reload();
  function initAccordions() {
    const ICON_SELECTOR = "[data-accordion-icon]";
    const DIVIDER_SELECTOR = ".divider-horizontal-full";
    const MOBILE_QUERY2 = "(max-width: 767px)";
    const PHONE_PORTRAIT_QUERY = "(max-width: 479px)";
    const CONFIGS = [
      {
        name: "practices",
        rootSelector: "[data-practices-accordion]",
        groupSelector: "[data-practices-group]",
        itemSelector: "[data-practices-item]",
        triggerSelector: "[data-practices-trigger]",
        panelSelector: "[data-practices-panel]",
        innerSelector: "[data-practices-panel-inner]",
        phoneInitialOpenAttribute: "data-practices-phone-initial-open"
      },
      {
        name: "faq",
        rootSelector: "[data-faq-accordion]",
        groupSelector: "[data-faq-group]",
        itemSelector: "[data-faq-item]",
        triggerSelector: "[data-faq-trigger]",
        panelSelector: "[data-faq-panel]",
        innerSelector: "[data-faq-panel-inner]"
      }
    ];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileLayout = window.matchMedia(MOBILE_QUERY2);
    const phonePortraitLayout = window.matchMedia(PHONE_PORTRAIT_QUERY);
    function initAccordionSystem(config) {
      const windowGsap = window.gsap;
      const roots = document.querySelectorAll(config.rootSelector);
      if (!roots.length) return;
      if (!windowGsap) {
        console.warn(
          `${config.name} accordion: GSAP is missing. Enable the Webflow GSAP integration first.`
        );
        return;
      }
      const gsap = windowGsap;
      roots.forEach((root, rootIndex) => {
        if (root.dataset.accordionReady === "true") return;
        const activeTimelines = /* @__PURE__ */ new WeakMap();
        const groupRequestIds = /* @__PURE__ */ new WeakMap();
        const groups = Array.from(root.querySelectorAll(config.groupSelector));
        function getParts(item) {
          const inner = item.querySelector(config.innerSelector);
          return {
            trigger: item.querySelector(config.triggerSelector),
            panel: item.querySelector(config.panelSelector),
            inner,
            divider: inner?.querySelector(DIVIDER_SELECTOR) ?? null,
            icon: item.querySelector(ICON_SELECTOR)
          };
        }
        function isMobileMode() {
          return mobileLayout.matches;
        }
        function getNextRequestId(group) {
          const nextId = (groupRequestIds.get(group) || 0) + 1;
          groupRequestIds.set(group, nextId);
          return nextId;
        }
        function isLatestRequest(group, requestId) {
          return groupRequestIds.get(group) === requestId;
        }
        function clearLegacyInnerMotion(inner) {
          const children = Array.from(inner.children);
          if (!children.length) return;
          gsap.set(children, {
            clearProps: "transform,opacity"
          });
        }
        function stopItemMotion(item) {
          const timeline = activeTimelines.get(item);
          if (timeline) {
            timeline.kill();
            activeTimelines.delete(item);
          }
          const { panel, divider, icon } = getParts(item);
          if (panel) {
            gsap.killTweensOf(panel);
          }
          if (divider) {
            gsap.killTweensOf(divider);
          }
          if (icon) {
            gsap.killTweensOf(icon);
          }
        }
        function getTargetHeight(inner) {
          return Math.ceil(inner.getBoundingClientRect().height);
        }
        function openDurationFor(height) {
          return gsap.utils.clamp(0.22, 0.34, 0.2 + height / 3e3);
        }
        function closeDurationFor(height) {
          return gsap.utils.clamp(0.18, 0.24, 0.16 + height / 4200);
        }
        function setAriaState(item, group, open) {
          const { trigger } = getParts(item);
          if (!trigger) return;
          const collapsible = group.dataset.collapsible !== "false";
          trigger.setAttribute("aria-expanded", String(open));
          if (open && !collapsible && !isMobileMode()) {
            trigger.setAttribute("aria-disabled", "true");
          } else {
            trigger.removeAttribute("aria-disabled");
          }
        }
        function setImmediateState(item, group, open) {
          const { panel, inner, divider, icon } = getParts(item);
          if (!panel || !inner || !icon) return;
          stopItemMotion(item);
          clearLegacyInnerMotion(inner);
          setAriaState(item, group, open);
          delete item.dataset.motion;
          item.dataset.state = open ? "open" : "closed";
          panel.hidden = !open;
          gsap.set(panel, {
            clearProps: "opacity,transform",
            height: open ? "auto" : 0,
            visibility: open ? "visible" : "hidden",
            overflow: "hidden"
          });
          if (divider) {
            gsap.set(divider, {
              opacity: open ? 1 : 0
            });
          }
          gsap.set(icon, {
            rotation: open ? 0 : 180
          });
        }
        function openItem(item, group, animate = true) {
          const { trigger, panel, inner, divider, icon } = getParts(item);
          if (!trigger || !panel || !inner || !icon) return;
          stopItemMotion(item);
          setAriaState(item, group, true);
          delete item.dataset.motion;
          item.dataset.state = "open";
          const wasHidden = panel.hidden;
          panel.hidden = false;
          gsap.set(panel, {
            clearProps: "opacity,transform",
            visibility: "visible",
            overflow: "hidden"
          });
          const startHeight = panel.getBoundingClientRect().height;
          const targetHeight = getTargetHeight(inner);
          const startsFromClosed = wasHidden || startHeight <= 0.5;
          if (divider && startsFromClosed) {
            gsap.set(divider, {
              opacity: 0
            });
          }
          if (!animate || reducedMotion.matches) {
            gsap.set(panel, {
              height: "auto",
              visibility: "visible",
              overflow: "hidden"
            });
            if (divider) {
              gsap.set(divider, {
                opacity: 1
              });
            }
            gsap.set(icon, {
              rotation: 0
            });
            return;
          }
          gsap.set(panel, {
            height: startHeight
          });
          const timeline = gsap.timeline({
            defaults: {
              overwrite: "auto"
            },
            onComplete: () => {
              gsap.set(panel, {
                height: "auto",
                visibility: "visible",
                overflow: "hidden"
              });
              activeTimelines.delete(item);
            }
          });
          activeTimelines.set(item, timeline);
          timeline.to(
            panel,
            {
              height: targetHeight,
              duration: openDurationFor(targetHeight),
              ease: "power2.inOut"
            },
            0
          ).to(
            icon,
            {
              rotation: 0,
              duration: 0.22,
              ease: "power2.inOut"
            },
            0
          );
          if (divider) {
            timeline.to(
              divider,
              {
                opacity: 1,
                duration: startsFromClosed ? 0.16 : 0.1,
                ease: "power1.out"
              },
              startsFromClosed ? 0.055 : 0
            );
          }
        }
        function closeItem(item, group, animate = true, onComplete) {
          const { trigger, panel, inner, divider, icon } = getParts(item);
          if (!trigger || !panel || !inner || !icon) return;
          stopItemMotion(item);
          setAriaState(item, group, false);
          item.dataset.state = "closed";
          item.dataset.motion = "closing";
          panel.hidden = false;
          gsap.set(panel, {
            clearProps: "opacity,transform",
            visibility: "visible",
            overflow: "hidden"
          });
          const currentHeight = panel.getBoundingClientRect().height || getTargetHeight(inner);
          if (!animate || reducedMotion.matches || currentHeight <= 0.5) {
            panel.hidden = true;
            delete item.dataset.motion;
            gsap.set(panel, {
              height: 0,
              visibility: "hidden",
              overflow: "hidden"
            });
            if (divider) {
              gsap.set(divider, {
                opacity: 0
              });
            }
            gsap.set(icon, {
              rotation: 180
            });
            onComplete?.();
            return;
          }
          gsap.set(panel, {
            height: currentHeight
          });
          const duration = closeDurationFor(currentHeight);
          const dividerFadeDuration = Math.min(0.11, duration);
          const dividerFadeStart = Math.max(0, duration - dividerFadeDuration);
          const timeline = gsap.timeline({
            defaults: {
              overwrite: "auto"
            },
            onComplete: () => {
              panel.hidden = true;
              delete item.dataset.motion;
              gsap.set(panel, {
                height: 0,
                visibility: "hidden",
                overflow: "hidden"
              });
              if (divider) {
                gsap.set(divider, {
                  opacity: 0
                });
              }
              activeTimelines.delete(item);
              onComplete?.();
            }
          });
          activeTimelines.set(item, timeline);
          timeline.to(
            panel,
            {
              height: 0,
              duration,
              ease: "power2.inOut"
            },
            0
          ).to(
            icon,
            {
              rotation: 180,
              duration: 0.2,
              ease: "power2.inOut"
            },
            0
          );
          if (divider) {
            timeline.to(
              divider,
              {
                opacity: 0,
                duration: dividerFadeDuration,
                ease: "power1.out"
              },
              dividerFadeStart
            );
          }
        }
        function applyDesktopSingleOpenState(group, items) {
          const openItems = items.filter((item) => item.dataset.state === "open");
          if (openItems.length <= 1) return;
          openItems.slice(1).forEach((item) => {
            setImmediateState(item, group, false);
          });
        }
        function getPhoneInitialOpenMode(group) {
          if (!config.phoneInitialOpenAttribute || !phonePortraitLayout.matches) return null;
          return group.getAttribute(config.phoneInitialOpenAttribute)?.trim().toLowerCase() === "first" ? "first" : "none";
        }
        groups.forEach((group, groupIndex) => {
          const items = Array.from(group.querySelectorAll(config.itemSelector));
          const triggers = [];
          const initialMode = group.dataset.initialOpen || "first";
          const explicitlyOpen = items.find((item) => item.dataset.state === "open");
          const phoneInitialOpenMode = getPhoneInitialOpenMode(group);
          const initialOpen = phoneInitialOpenMode ? phoneInitialOpenMode === "first" ? items[0] : null : explicitlyOpen || (initialMode === "first" ? items[0] : null);
          items.forEach((item, itemIndex) => {
            const { trigger, panel, inner, icon } = getParts(item);
            if (!trigger || !panel) return;
            if (!inner) {
              console.warn(`${config.name} accordion: missing inner wrapper inside panel.`, panel);
              return;
            }
            if (!icon) {
              console.warn(
                `${config.name} accordion: missing [data-accordion-icon] inside item.`,
                item
              );
              return;
            }
            const triggerId = trigger.id || `${config.name}-trigger-${rootIndex + 1}-${groupIndex + 1}-${itemIndex + 1}`;
            const panelId = panel.id || `${config.name}-panel-${rootIndex + 1}-${groupIndex + 1}-${itemIndex + 1}`;
            trigger.id = triggerId;
            panel.id = panelId;
            trigger.setAttribute("aria-controls", panelId);
            panel.setAttribute("aria-labelledby", triggerId);
            panel.setAttribute("role", "region");
            if (!trigger.matches("button")) {
              trigger.setAttribute("role", "button");
              trigger.setAttribute("tabindex", "0");
            } else if (!trigger.hasAttribute("type")) {
              trigger.setAttribute("type", "button");
            }
            triggers.push(trigger);
            const activate = () => {
              const isOpen = item.dataset.state === "open";
              const isClosing = item.dataset.motion === "closing";
              const collapsible = group.dataset.collapsible !== "false";
              if (isClosing) {
                openItem(item, group, true);
                return;
              }
              if (isOpen) {
                if (collapsible || isMobileMode()) {
                  closeItem(item, group, true);
                }
                return;
              }
              if (isMobileMode()) {
                openItem(item, group, true);
                return;
              }
              const requestId = getNextRequestId(group);
              const visibleSibling = items.find(
                (sibling) => sibling !== item && (sibling.dataset.state === "open" || sibling.dataset.motion === "closing")
              );
              if (visibleSibling) {
                closeItem(visibleSibling, group, true, () => {
                  if (!isLatestRequest(group, requestId)) return;
                  openItem(item, group, true);
                });
                return;
              }
              openItem(item, group, true);
            };
            trigger.addEventListener("click", activate);
            trigger.addEventListener("keydown", (event) => {
              if (!trigger.matches("button") && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                activate();
                return;
              }
              const currentIndex = triggers.indexOf(trigger);
              let nextIndex = null;
              if (event.key === "ArrowDown") {
                nextIndex = (currentIndex + 1) % triggers.length;
              }
              if (event.key === "ArrowUp") {
                nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
              }
              if (event.key === "Home") {
                nextIndex = 0;
              }
              if (event.key === "End") {
                nextIndex = triggers.length - 1;
              }
              if (nextIndex !== null) {
                event.preventDefault();
                triggers[nextIndex].focus();
              }
            });
          });
          items.forEach((item) => {
            setImmediateState(item, group, item === initialOpen);
          });
        });
        root.dataset.accordionReady = "true";
        const syncForMotionPreference = () => {
          groups.forEach((group) => {
            Array.from(group.querySelectorAll(config.itemSelector)).forEach((item) => {
              setImmediateState(item, group, item.dataset.state === "open");
            });
          });
        };
        const syncForLayoutMode = () => {
          groups.forEach((group) => {
            const items = Array.from(group.querySelectorAll(config.itemSelector));
            if (!isMobileMode()) {
              applyDesktopSingleOpenState(group, items);
            }
            items.forEach((item) => {
              setAriaState(item, group, item.dataset.state === "open");
            });
          });
        };
        reducedMotion.addEventListener("change", syncForMotionPreference);
        mobileLayout.addEventListener("change", syncForLayoutMode);
      });
    }
    function initAllAccordions() {
      CONFIGS.forEach((config) => {
        initAccordionSystem(config);
      });
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initAllAccordions, {
        once: true
      });
    } else {
      initAllAccordions();
    }
  }

  // src/components/animations/benefit-shine/index.ts
  init_live_reload();
  var BENEFIT_SHINE_VERSION = "1.5.0";
  var BENEFIT_SHINE_SELECTORS = {
    component: '[data-tsa-benefit-shine="component"]',
    benefitTrigger: '[data-tsa-benefit-shine="trigger"]',
    stampTrigger: '[data-tsa-stamp-shine="trigger"]',
    statueTrigger: '[data-tsa-statue-shine="trigger"]',
    trigger: '[data-tsa-benefit-shine="trigger"], [data-tsa-stamp-shine="trigger"], [data-tsa-statue-shine="trigger"]',
    overlay: '[data-tsa-benefit-shine="overlay"], [data-tsa-benefit-shine="footer-logo"], [data-tsa-footer-logo="overlay"]'
  };
  var OVERLAY_ACTIVE_OPACITY_PROPERTY = "--tsa-overlay-active-opacity";
  var DEFAULT_BENEFIT_SHINE_SETTINGS = {
    activeOpacity: 0.82,
    coordinateMode: "overlay",
    enterDuration: 0.26,
    exitDuration: 0.3,
    followSpeed: 22,
    radiusX: "clamp(3.25rem, 4.5vw, 4.75rem)",
    radiusY: "clamp(4rem, 5.5vw, 6rem)",
    offsetXPercent: 0,
    offsetYPercent: 0,
    coordinateMinPercent: -100,
    coordinateMaxPercent: 200
  };
  var BENEFIT_SHINE_SETTINGS = {
    "definitive-logo": {
      activeOpacity: 0.88,
      coordinateMode: "trigger"
    },
    "definitive-bg": {
      activeOpacity: 1,
      coordinateMode: "trigger"
    },
    "definitive-text": {},
    "definitive-accent": {},
    "stamp-overlay": {
      coordinateMode: "trigger"
    },
    "footer-logo": {
      coordinateMode: "trigger"
    }
  };
  var POSITION_SETTLE_THRESHOLD = 0.015;
  var MAX_FRAME_DELTA_SECONDS = 0.05;
  var didWarnInvalidOverlayImage = false;
  function getRuntimeGsap() {
    return window.gsap ?? null;
  }
  function getBenefitShineSettings(overlayId) {
    return {
      ...DEFAULT_BENEFIT_SHINE_SETTINGS,
      ...BENEFIT_SHINE_SETTINGS[overlayId] ?? {}
    };
  }
  function addMediaQueryChangeListener(query, listener) {
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", listener);
      return;
    }
    query.addListener?.(listener);
  }
  function removeMediaQueryChangeListener(query, listener) {
    if (typeof query.removeEventListener === "function") {
      query.removeEventListener("change", listener);
      return;
    }
    query.removeListener?.(listener);
  }
  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }
  function getOverlayActiveOpacity(element, fallbackOpacity) {
    const rawOpacity = window.getComputedStyle(element).getPropertyValue(OVERLAY_ACTIVE_OPACITY_PROPERTY).trim();
    if (!rawOpacity) {
      return fallbackOpacity;
    }
    const activeOpacity = Number(rawOpacity);
    if (!Number.isFinite(activeOpacity)) {
      return fallbackOpacity;
    }
    return clamp(activeOpacity, 0, 1);
  }
  function supportsRadialMask() {
    if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
      return false;
    }
    return CSS.supports("-webkit-mask-image", "radial-gradient(circle, #000, transparent)") || CSS.supports("mask-image", "radial-gradient(circle, #000, transparent)");
  }
  function isDevelopmentHost() {
    return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  }
  function warnInvalidOverlayImageIfNeeded(image, overlayId) {
    if (!isDevelopmentHost() || didWarnInvalidOverlayImage) {
      return;
    }
    if (!image.complete || image.naturalWidth > 0) {
      return;
    }
    didWarnInvalidOverlayImage = true;
    console.warn("[TSA Benefit Shine] Overlay image has no valid source.", {
      image,
      overlayId
    });
  }
  function killOpacityAnimation(overlay, gsap) {
    overlay.activeOpacityAnimation?.kill();
    overlay.activeOpacityAnimation = null;
    gsap?.killTweensOf(overlay.element);
  }
  function setOverlayHidden(overlay) {
    overlay.element.style.opacity = "0";
    overlay.element.style.visibility = "hidden";
  }
  function setOverlayVisible(overlay) {
    overlay.element.style.visibility = "visible";
    overlay.element.style.opacity = String(overlay.settings.activeOpacity);
  }
  function showOverlay(controller, overlay) {
    if (overlay.isActive) {
      return;
    }
    overlay.isActive = true;
    killOpacityAnimation(overlay, controller.gsap);
    if (!controller.gsap || controller.reducedMotionQuery.matches) {
      setOverlayVisible(overlay);
      return;
    }
    controller.gsap.set(overlay.element, {
      visibility: "visible"
    });
    overlay.activeOpacityAnimation = controller.gsap.to(overlay.element, {
      duration: overlay.settings.enterDuration,
      ease: "power2.out",
      opacity: overlay.settings.activeOpacity,
      overwrite: "auto",
      onComplete: () => {
        overlay.activeOpacityAnimation = null;
      }
    });
  }
  function hideOverlay(controller, overlay) {
    if (!overlay.isActive) {
      setOverlayHidden(overlay);
      return;
    }
    overlay.isActive = false;
    overlay.isPositionAnimating = false;
    killOpacityAnimation(overlay, controller.gsap);
    if (!controller.gsap || controller.reducedMotionQuery.matches) {
      setOverlayHidden(overlay);
      return;
    }
    overlay.activeOpacityAnimation = controller.gsap.to(overlay.element, {
      duration: overlay.settings.exitDuration,
      ease: "power2.out",
      opacity: 0,
      overwrite: "auto",
      onComplete: () => {
        overlay.activeOpacityAnimation = null;
        if (overlay.isActive) {
          return;
        }
        controller.gsap?.set(overlay.element, {
          opacity: 0,
          visibility: "hidden"
        });
      }
    });
  }
  function updateMaskPosition(overlay) {
    overlay.element.style.setProperty(
      "--tsa-benefit-shine-x",
      `${overlay.currentXPercent.toFixed(3)}%`
    );
    overlay.element.style.setProperty(
      "--tsa-benefit-shine-y",
      `${overlay.currentYPercent.toFixed(3)}%`
    );
  }
  function setInitialPosition(overlay, xPercent, yPercent) {
    overlay.currentXPercent = xPercent;
    overlay.currentYPercent = yPercent;
    overlay.targetXPercent = xPercent;
    overlay.targetYPercent = yPercent;
    overlay.hasPointerPosition = true;
    overlay.isPositionAnimating = false;
    updateMaskPosition(overlay);
  }
  function calculateOverlayPointerPosition(controller, overlay, event) {
    const rect = overlay.settings.coordinateMode === "trigger" ? controller.trigger.getBoundingClientRect() : overlay.element.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1) {
      return null;
    }
    const rawXPercent = (event.clientX - rect.left) / rect.width * 100;
    const rawYPercent = (event.clientY - rect.top) / rect.height * 100;
    return {
      xPercent: clamp(
        rawXPercent + overlay.settings.offsetXPercent,
        overlay.settings.coordinateMinPercent,
        overlay.settings.coordinateMaxPercent
      ),
      yPercent: clamp(
        rawYPercent + overlay.settings.offsetYPercent,
        overlay.settings.coordinateMinPercent,
        overlay.settings.coordinateMaxPercent
      )
    };
  }
  function stopPositionAnimation(controller) {
    if (controller.animationFrame === 0) {
      return;
    }
    window.cancelAnimationFrame(controller.animationFrame);
    controller.animationFrame = 0;
    controller.previousFrameTime = 0;
    controller.overlays.forEach((overlay) => {
      overlay.isPositionAnimating = false;
    });
  }
  function renderPositionFrame(controller, currentTime) {
    controller.animationFrame = 0;
    if (!controller.isPointerActive) {
      controller.previousFrameTime = 0;
      return;
    }
    const previousTime = controller.previousFrameTime || currentTime;
    const deltaSeconds = Math.min(
      Math.max((currentTime - previousTime) / 1e3, 0),
      MAX_FRAME_DELTA_SECONDS
    );
    controller.previousFrameTime = currentTime;
    let stillMoving = false;
    controller.overlays.forEach((overlay) => {
      if (!overlay.isPositionAnimating) {
        return;
      }
      if (controller.reducedMotionQuery.matches) {
        overlay.currentXPercent = overlay.targetXPercent;
        overlay.currentYPercent = overlay.targetYPercent;
        overlay.isPositionAnimating = false;
        updateMaskPosition(overlay);
        return;
      }
      const interpolation = 1 - Math.exp(-overlay.settings.followSpeed * deltaSeconds);
      overlay.currentXPercent += (overlay.targetXPercent - overlay.currentXPercent) * interpolation;
      overlay.currentYPercent += (overlay.targetYPercent - overlay.currentYPercent) * interpolation;
      updateMaskPosition(overlay);
      const xDistance = Math.abs(overlay.targetXPercent - overlay.currentXPercent);
      const yDistance = Math.abs(overlay.targetYPercent - overlay.currentYPercent);
      if (xDistance > POSITION_SETTLE_THRESHOLD || yDistance > POSITION_SETTLE_THRESHOLD) {
        stillMoving = true;
        return;
      }
      overlay.currentXPercent = overlay.targetXPercent;
      overlay.currentYPercent = overlay.targetYPercent;
      overlay.isPositionAnimating = false;
      updateMaskPosition(overlay);
    });
    if (!stillMoving) {
      controller.previousFrameTime = 0;
      return;
    }
    controller.animationFrame = window.requestAnimationFrame((time) => {
      renderPositionFrame(controller, time);
    });
  }
  function schedulePositionAnimation(controller) {
    if (controller.animationFrame !== 0) {
      return;
    }
    controller.animationFrame = window.requestAnimationFrame((time) => {
      renderPositionFrame(controller, time);
    });
  }
  function updateOverlayTargets(controller, event, initializeCurrentPosition) {
    let shouldAnimate = false;
    controller.overlays.forEach((overlay) => {
      const position = calculateOverlayPointerPosition(controller, overlay, event);
      if (!position) {
        return;
      }
      overlay.targetXPercent = position.xPercent;
      overlay.targetYPercent = position.yPercent;
      const hadPointerPosition = overlay.hasPointerPosition;
      if (initializeCurrentPosition || !overlay.hasPointerPosition) {
        setInitialPosition(overlay, position.xPercent, position.yPercent);
        if (!hadPointerPosition && controller.isPointerActive) {
          showOverlay(controller, overlay);
        }
        return;
      }
      if (controller.reducedMotionQuery.matches) {
        setInitialPosition(overlay, position.xPercent, position.yPercent);
        return;
      }
      overlay.isPositionAnimating = true;
      shouldAnimate = true;
    });
    if (shouldAnimate) {
      schedulePositionAnimation(controller);
    }
  }
  function showAllOverlays(controller) {
    controller.overlays.forEach((overlay) => {
      if (!overlay.hasPointerPosition) {
        return;
      }
      showOverlay(controller, overlay);
    });
  }
  function hideAllOverlays(controller) {
    stopPositionAnimation(controller);
    controller.overlays.forEach((overlay) => {
      hideOverlay(controller, overlay);
    });
  }
  function getBenefitShineOverlayId(element) {
    const explicitId = element.getAttribute("data-tsa-benefit-shine-id")?.trim();
    if (explicitId) {
      return explicitId;
    }
    if (element.getAttribute("data-tsa-footer-logo")?.trim() === "overlay") {
      return "footer-logo";
    }
    const role = element.getAttribute("data-tsa-benefit-shine")?.trim();
    if (role && role !== "overlay") {
      return role;
    }
    return "default";
  }
  function prepareOverlay(element) {
    const overlayId = getBenefitShineOverlayId(element);
    const settings = getBenefitShineSettings(overlayId);
    settings.activeOpacity = getOverlayActiveOpacity(element, settings.activeOpacity);
    element.setAttribute("aria-hidden", "true");
    element.style.setProperty("--tsa-benefit-shine-radius-x", settings.radiusX);
    element.style.setProperty("--tsa-benefit-shine-radius-y", settings.radiusY);
    if (element instanceof HTMLImageElement) {
      element.alt = "";
      element.draggable = false;
      element.setAttribute("draggable", "false");
      warnInvalidOverlayImageIfNeeded(element, overlayId);
    }
    const overlay = {
      element,
      overlayId,
      settings,
      currentXPercent: 50,
      currentYPercent: 50,
      targetXPercent: 50,
      targetYPercent: 50,
      activeOpacityAnimation: null,
      hasPointerPosition: false,
      isActive: false,
      isPositionAnimating: false
    };
    updateMaskPosition(overlay);
    setOverlayHidden(overlay);
    return overlay;
  }
  function clearOverlayInlineProperties(overlay) {
    overlay.element.style.removeProperty("--tsa-benefit-shine-x");
    overlay.element.style.removeProperty("--tsa-benefit-shine-y");
    overlay.element.style.removeProperty("--tsa-benefit-shine-radius-x");
    overlay.element.style.removeProperty("--tsa-benefit-shine-radius-y");
  }
  function getMatchingTrigger(component, selector) {
    return component.matches(selector) ? component : component.querySelector(selector);
  }
  function getBenefitShineTrigger(component) {
    return getMatchingTrigger(component, BENEFIT_SHINE_SELECTORS.benefitTrigger) ?? getMatchingTrigger(component, BENEFIT_SHINE_SELECTORS.stampTrigger) ?? getMatchingTrigger(component, BENEFIT_SHINE_SELECTORS.statueTrigger);
  }
  function findImplicitBenefitShineComponent(overlay) {
    let candidate = overlay.parentElement;
    while (candidate && candidate !== document.body) {
      if (candidate.matches(BENEFIT_SHINE_SELECTORS.component)) {
        return null;
      }
      const trigger = getMatchingTrigger(candidate, BENEFIT_SHINE_SELECTORS.trigger);
      if (trigger) {
        return candidate;
      }
      candidate = candidate.parentElement;
    }
    return null;
  }
  function getImplicitBenefitShineComponents() {
    const components = /* @__PURE__ */ new Set();
    document.querySelectorAll(BENEFIT_SHINE_SELECTORS.overlay).forEach((overlay) => {
      const component = findImplicitBenefitShineComponent(overlay);
      if (component) {
        components.add(component);
      }
    });
    return Array.from(components);
  }
  function initializeBenefitShineComponent(component) {
    if (component.dataset.tsaBenefitShineReady === BENEFIT_SHINE_VERSION) {
      return;
    }
    component.__tsaBenefitShineCleanup?.();
    const trigger = getBenefitShineTrigger(component);
    const overlayElements = Array.from(
      component.querySelectorAll(BENEFIT_SHINE_SELECTORS.overlay)
    );
    if (!trigger || overlayElements.length === 0) {
      console.warn("[TSA Benefit Shine] Required elements are missing.", {
        component,
        overlays: overlayElements,
        trigger
      });
      return;
    }
    const overlays = overlayElements.map(prepareOverlay);
    const controller = {
      component,
      trigger,
      overlays,
      cleanupCallbacks: [],
      gsap: getRuntimeGsap(),
      reducedMotionQuery: window.matchMedia("(prefers-reduced-motion: reduce)"),
      animationFrame: 0,
      isPointerActive: false,
      previousFrameTime: 0
    };
    if (!supportsRadialMask()) {
      component.dataset.tsaBenefitShineReady = BENEFIT_SHINE_VERSION;
      component.__tsaBenefitShineCleanup = () => {
        overlays.forEach((overlay) => {
          killOpacityAnimation(overlay, controller.gsap);
          setOverlayHidden(overlay);
          clearOverlayInlineProperties(overlay);
        });
        delete component.dataset.tsaBenefitShineReady;
        delete component.__tsaBenefitShineCleanup;
      };
      return;
    }
    const handlePointerEnter = (event) => {
      if (event.pointerType === "touch") {
        return;
      }
      controller.isPointerActive = true;
      controller.previousFrameTime = 0;
      updateOverlayTargets(controller, event, true);
      showAllOverlays(controller);
    };
    const handlePointerMove = (event) => {
      if (event.pointerType === "touch") {
        return;
      }
      if (!controller.isPointerActive) {
        controller.isPointerActive = true;
        updateOverlayTargets(controller, event, true);
        showAllOverlays(controller);
        return;
      }
      updateOverlayTargets(controller, event, false);
    };
    const handlePointerExit = () => {
      controller.isPointerActive = false;
      controller.previousFrameTime = 0;
      hideAllOverlays(controller);
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePointerExit();
      }
    };
    const handleReducedMotionChange = () => {
      stopPositionAnimation(controller);
      controller.overlays.forEach((overlay) => {
        if (!overlay.isActive) {
          killOpacityAnimation(overlay, controller.gsap);
          setOverlayHidden(overlay);
          return;
        }
        killOpacityAnimation(overlay, controller.gsap);
        setInitialPosition(overlay, overlay.targetXPercent, overlay.targetYPercent);
        setOverlayVisible(overlay);
      });
    };
    trigger.addEventListener("pointerenter", handlePointerEnter, {
      passive: true
    });
    trigger.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });
    trigger.addEventListener("pointerleave", handlePointerExit);
    trigger.addEventListener("pointercancel", handlePointerExit);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handlePointerExit);
    addMediaQueryChangeListener(controller.reducedMotionQuery, handleReducedMotionChange);
    controller.cleanupCallbacks.push(
      () => {
        trigger.removeEventListener("pointerenter", handlePointerEnter);
        trigger.removeEventListener("pointermove", handlePointerMove);
        trigger.removeEventListener("pointerleave", handlePointerExit);
        trigger.removeEventListener("pointercancel", handlePointerExit);
      },
      () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("blur", handlePointerExit);
        removeMediaQueryChangeListener(controller.reducedMotionQuery, handleReducedMotionChange);
      }
    );
    component.dataset.tsaBenefitShineReady = BENEFIT_SHINE_VERSION;
    const cleanup = () => {
      stopPositionAnimation(controller);
      controller.cleanupCallbacks.splice(0).forEach((callback) => {
        callback();
      });
      overlays.forEach((overlay) => {
        killOpacityAnimation(overlay, controller.gsap);
        setOverlayHidden(overlay);
        clearOverlayInlineProperties(overlay);
      });
      delete component.dataset.tsaBenefitShineReady;
      delete component.__tsaBenefitShineCleanup;
    };
    component.__tsaBenefitShineCleanup = cleanup;
  }
  function initBenefitShine() {
    getImplicitBenefitShineComponents().forEach((component) => {
      initializeBenefitShineComponent(component);
    });
    document.querySelectorAll(BENEFIT_SHINE_SELECTORS.component).forEach((component) => {
      initializeBenefitShineComponent(component);
    });
  }

  // src/components/animations/gavel/index.ts
  init_live_reload();
  var QUICK_TUNING = {
    version: "10.0.0",
    /*
     * Varianta încărcată implicit după publicare.
     *
     * A = Quiet tap
     * B = Scroll-cocked reveal
     * C = Ceremonial slam
     * D = Editorial pendulum
     * E = Snap verdict
     */
    activePreset: "B",
    interaction: {
      desktopMinWidthPx: 992,
      /*
       * Mobile/tablet can either play a normal time-based strike on entry
       * or scrub the hammer pose through ScrollTrigger progress per preset.
       */
      mobileViewport: {
        enabled: true,
        playback: "timed",
        start: "top 72%",
        end: "bottom 12%",
        scrubSmoothingSeconds: 0.35,
        scrubImpactThreshold: 0.95,
        scrubResetThreshold: 0.42,
        entryDelaySeconds: 0.22,
        replayMode: "once",
        initialState: "rest",
        finalState: "hold-impact",
        holdAtImpactSeconds: 0.85,
        autoReturnDelaySeconds: 0.85,
        resetWhenFullyOutside: false,
        resetPosition: "either",
        resetDelaySeconds: 0.08,
        resetDurationSeconds: 0.3,
        resetEase: "power2.out",
        playOnInitialLoadIfVisible: true,
        playOnEnter: true,
        playOnEnterBack: false,
        finishCurrentAnimationOnLeave: true,
        reverseOnLeave: false,
        minimumReplayIntervalSeconds: 1.4,
        refreshSilently: true,
        preventRefreshPlayback: true,
        markers: false
      }
    },
    /*
     * Punctele assetului care sunt comune tuturor variantelor.
     *
     * Aceste valori corectează faptul că imaginea ciocanului
     * conține spațiu transparent.
     */
    assetGeometry: {
      contactXPercent: 88.2,
      contactYPercent: 56.7,
      desktopAuthoredOriginXPercent: 50,
      desktopAuthoredOriginYPercent: 50,
      mobileAuthoredOriginXPercent: 75,
      mobileAuthoredOriginYPercent: 80,
      desktopTargetContactXPercent: 52,
      mobileTargetContactXPercent: 50,
      targetContactYPercent: 0
    },
    debug: {
      enabled: false,
      /*
       * 1 = normal
       * 2 = de două ori mai lent
       * 3 = de trei ori mai lent
       */
      slowMotionMultiplier: 1,
      showBounds: true,
      showPivot: true,
      showRestContact: true,
      showImpactContact: true,
      showTargetContact: true,
      showContactLine: true,
      showDustAnchor: true,
      showContactShadowAnchor: true,
      showResonanceAnchor: true,
      showViewportTrigger: false,
      showMobileState: true,
      logGeometry: true,
      logStateChanges: false,
      logTimelineEvents: false,
      logPresetChanges: false,
      markers: false
    },
    performance: {
      force3D: "auto",
      temporaryWillChange: true,
      clearPropsAfterRest: false,
      clearPropsAfterImpact: false,
      overwriteMode: "auto",
      refreshOnResize: true,
      refreshOnImageLoad: true,
      refreshOnFontReady: true,
      useResizeObserver: true,
      useVisibilityPause: true,
      skipEffectsWhenDocumentHidden: true
    },
    reducedMotion: {
      mode: "rest",
      hideDust: true,
      hideResonance: true,
      hideContactShadow: true,
      disableTargetReaction: true,
      disableShadowReaction: true,
      preserveFocusFeedback: true
    },
    /*
     * Efectele suplimentare disponibile cu structura actuală:
     * target întreg, cast shadow separat și dust separat.
     *
     * Toate valorile care merită calibrate sunt aici.
     */
    impactEffects: {
      target: {
        desktop: {
          enabled: true,
          compressionXpx: 0.08,
          compressionYpx: 0.85,
          compressionRotationDeg: 0.018,
          compressionScaleX: 1.0008,
          compressionScaleY: 0.9975,
          compressionDurationSeconds: 0.042,
          compressionEase: "power3.out",
          recoilEnabled: true,
          recoilXpx: -0.04,
          recoilYpx: -0.1,
          recoilRotationDeg: -8e-3,
          recoilScaleX: 1,
          recoilScaleY: 1.0002,
          recoilDurationSeconds: 0.034,
          recoilEase: "power2.out",
          settleDurationSeconds: 0.095,
          settleEase: "power3.out",
          transformOrigin: "bottom center"
        },
        mobile: {
          enabled: true,
          compressionXpx: 0.1,
          compressionYpx: 1.05,
          compressionRotationDeg: 0.025,
          compressionScaleX: 1.0012,
          compressionScaleY: 0.9965,
          compressionDurationSeconds: 0.045,
          compressionEase: "power3.out",
          recoilEnabled: true,
          recoilXpx: -0.05,
          recoilYpx: -0.12,
          recoilRotationDeg: -0.01,
          recoilScaleX: 1,
          recoilScaleY: 1.0003,
          recoilDurationSeconds: 0.038,
          recoilEase: "power2.out",
          settleDurationSeconds: 0.1,
          settleEase: "power3.out",
          transformOrigin: "bottom center"
        }
      },
      broadShadow: {
        enabled: true,
        translateXpx: 0,
        translateYpx: 0.9,
        scaleX: 1.06,
        scaleY: 0.92,
        opacity: 0.9,
        compressionDurationSeconds: 0.055,
        compressionEase: "power3.out",
        recoveryDurationSeconds: 0.15,
        recoveryEase: "power3.out",
        transformOrigin: "center center"
      },
      castShadow: {
        enabled: true,
        /*
         * Gavel-ul și shadow-ul au aceeași cutie și aceeași dimensiune.
         * Shadow-ul primește exact aceeași traiectorie x/y ca gavel-ul.
         *
         * Aceste trei valori reprezintă numai repoziționarea locală
         * văzută în Webflow. Offsetul este intenționat mic, astfel încât
         * shadow-ul să rămână lipit vizual de gavel în toate fazele.
         */
        xPercent: 3,
        yPercent: 6,
        rotationOffsetDeg: 8,
        filterEnabled: true,
        cssFilter: "brightness(0) saturate(0) blur(3px)",
        mixBlendMode: "multiply",
        /*
         * Nu scalăm shadow-ul între faze. Schimbarea scalei făcea
         * conturul să alunece și să pară că plutește departe la impact.
         * Doar opacitatea se modifică foarte discret.
         */
        rest: {
          scaleX: 1,
          scaleY: 1,
          opacity: 0.07
        },
        anticipation: {
          scaleX: 1,
          scaleY: 1,
          opacity: 0.045
        },
        impact: {
          scaleX: 1,
          scaleY: 1,
          opacity: 0.12
        },
        settle: {
          scaleX: 1,
          scaleY: 1,
          opacity: 0.085
        }
      },
      dust: {
        enabled: true,
        /*
         * Poziția este calculată dinamic din punctul real de contact.
         * Valorile pozitive pe Y mută praful mai jos.
         * Valorile negative pe X îl mută spre stânga.
         */
        anchorOffsetXpx: 0,
        anchorOffsetYpx: 0,
        xPercent: -50,
        startOpacity: 0,
        peakOpacity: 0.09,
        endOpacity: 0,
        startScale: 0.76,
        peakScale: 0.92,
        endScale: 1.06,
        startScaleX: 0.76,
        startScaleY: 0.76,
        peakScaleX: 0.92,
        peakScaleY: 0.92,
        endScaleX: 1.06,
        endScaleY: 1.06,
        startYPercent: -42,
        peakYPercent: -52,
        endYPercent: -66,
        startRotationDeg: 0,
        peakRotationDeg: 0,
        endRotationDeg: 0,
        revealDurationSeconds: 0.04,
        fadeDurationSeconds: 0.15,
        revealEase: "power2.out",
        fadeEase: "power2.out",
        cssFilter: "brightness(0) saturate(0)",
        mixBlendMode: "multiply",
        transformOrigin: "center bottom"
      },
      contactShadow: {
        enabled: true,
        anchorOffsetXpx: 0,
        anchorOffsetYpx: 0,
        widthRem: 4.25,
        heightRem: 0.65,
        cssFilter: "blur(2px)",
        mixBlendMode: "multiply",
        initialOpacity: 0,
        initialScaleX: 0.78,
        initialScaleY: 0.7,
        preContactLeadSeconds: 0.05,
        preContactOpacity: 0.05,
        preContactScaleX: 0.82,
        preContactScaleY: 0.72,
        impactOpacity: 0.16,
        impactScaleX: 1,
        impactScaleY: 0.55,
        contactOpacity: 0.16,
        contactScaleX: 1,
        contactScaleY: 0.55,
        contactDurationSeconds: 0.035,
        contactEase: "power2.out",
        recoilOpacity: 0.1,
        recoilScaleX: 1.06,
        recoilScaleY: 0.65,
        recoilDurationSeconds: 0.045,
        recoilEase: "power2.out",
        fadeOpacity: 0,
        fadeScaleX: 0.94,
        fadeScaleY: 0.72,
        fadeDurationSeconds: 0.12,
        fadeEase: "power3.out",
        endOpacity: 0,
        endScaleX: 0.94,
        endScaleY: 0.72,
        transformOrigin: "center center"
      },
      resonance: {
        enabled: true,
        anchorOffsetXpx: 0,
        anchorOffsetYpx: 0,
        widthRem: 5.75,
        heightRem: 1.35,
        startOpacity: 0.065,
        peakOpacity: 0.065,
        endOpacity: 0,
        startScaleX: 0.72,
        startScaleY: 0.82,
        peakScaleX: 0.9,
        peakScaleY: 0.9,
        endScaleX: 1.18,
        endScaleY: 1,
        durationSeconds: 0.12,
        revealDurationSeconds: 0.04,
        fadeDurationSeconds: 0.08,
        revealEase: "power2.out",
        fadeEase: "power2.out",
        ease: "power2.out",
        borderColor: "rgb(70 70 70 / 14%)",
        borderWidthPx: 1,
        boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 22%)",
        transformOrigin: "center center"
      }
    },
    presets: {
      A: {
        label: "Quiet tap",
        description: "Restrained time-based tap with a quick auto-return; best when the section already has enough visual weight.",
        mobileViewport: {
          playback: "timed",
          replayMode: "once",
          finalState: "auto-return",
          entryDelaySeconds: 0.05,
          holdAtImpactSeconds: 0.18,
          autoReturnDelaySeconds: 0.16
        },
        desktop: {
          pivotXPercent: 17,
          pivotYPercent: 66,
          restRotationDeg: -17,
          impactRotationDeg: 0.4,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 6,
          restFineTuneYpx: 0,
          motion: {
            anticipationDurationSeconds: 0.04,
            anticipationRotationDeltaDeg: -0.8,
            anticipationXpx: -0.12,
            anticipationYpx: -0.1,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.1,
            strikeDurationSeconds: 0.115,
            strikeMinDurationSeconds: 0.105,
            strikeMaxDurationSeconds: 0.13,
            strikeEase: "power3.in",
            followThroughDurationSeconds: 0.012,
            overshootRotationDeltaDeg: 0.02,
            overshootXpx: 0.02,
            overshootYpx: 0.06,
            settleDurationSeconds: 0.07,
            settleEase: "power3.out",
            liftDurationSeconds: 0.14,
            liftMinDurationSeconds: 0.12,
            liftMaxDurationSeconds: 0.18,
            liftEase: "power3.out"
          }
        },
        mobile: {
          pivotXPercent: 17,
          pivotYPercent: 66,
          restRotationDeg: -16,
          impactRotationDeg: 0.4,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 3,
          restFineTuneYpx: 0,
          motion: {
            anticipationDurationSeconds: 0.045,
            anticipationRotationDeltaDeg: -0.7,
            anticipationXpx: -0.1,
            anticipationYpx: -0.08,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.1,
            strikeDurationSeconds: 0.12,
            strikeMinDurationSeconds: 0.11,
            strikeMaxDurationSeconds: 0.14,
            strikeEase: "power3.in",
            followThroughDurationSeconds: 0.012,
            overshootRotationDeltaDeg: 0.02,
            overshootXpx: 0.02,
            overshootYpx: 0.06,
            settleDurationSeconds: 0.075,
            settleEase: "power3.out",
            liftDurationSeconds: 0.15,
            liftMinDurationSeconds: 0.13,
            liftMaxDurationSeconds: 0.19,
            liftEase: "power3.out"
          }
        },
        targetReaction: {
          translateXpx: 0,
          translateYpx: 0.45,
          scaleX: 1.001,
          scaleY: 0.998,
          compressionDurationSeconds: 0.04,
          compressionEase: "power2.out",
          recoveryDurationSeconds: 0.13,
          recoveryEase: "power3.out",
          transformOrigin: "bottom center"
        },
        shadowReaction: {
          translateXpx: 0,
          translateYpx: 1.5,
          scaleX: 1.12,
          scaleY: 0.86,
          opacity: 0.84,
          compressionDurationSeconds: 0.05,
          compressionEase: "power2.out",
          recoveryDurationSeconds: 0.16,
          recoveryEase: "power3.out",
          transformOrigin: "center center"
        },
        impactEffects: {
          target: {
            desktop: {
              compressionYpx: 0.22,
              compressionScaleY: 0.9992,
              recoilEnabled: true,
              recoilYpx: -0.018,
              recoilDurationSeconds: 0.022,
              settleDurationSeconds: 0.06
            },
            mobile: {
              compressionYpx: 0.28,
              compressionScaleY: 0.999,
              recoilEnabled: true,
              recoilYpx: -0.02,
              recoilDurationSeconds: 0.024,
              settleDurationSeconds: 0.065
            }
          },
          broadShadow: {
            translateYpx: 0.28,
            scaleX: 1.012,
            scaleY: 0.985,
            opacity: 0.66,
            compressionDurationSeconds: 0.035,
            recoveryDurationSeconds: 0.08
          },
          contactShadow: {
            preContactOpacity: 0.02,
            contactOpacity: 0.055,
            recoilOpacity: 0.035,
            fadeDurationSeconds: 0.07
          },
          dust: {
            enabled: false
          },
          resonance: {
            enabled: false
          }
        }
      },
      B: {
        label: "Scroll-cocked reveal",
        description: "Recommended mobile showcase: the hammer cocks with scroll, lands at the end of the viewport pass, then releases a polished contact burst.",
        mobileViewport: {
          playback: "scrub",
          start: "top 92%",
          end: "bottom 38%",
          scrubSmoothingSeconds: 0.32,
          scrubImpactThreshold: 0.9,
          scrubResetThreshold: 0.46,
          replayMode: "once-per-entry",
          finalState: "hold-impact",
          entryDelaySeconds: 0,
          minimumReplayIntervalSeconds: 0.25,
          playOnInitialLoadIfVisible: false
        },
        desktop: {
          pivotXPercent: 18,
          pivotYPercent: 65,
          restRotationDeg: -28,
          impactRotationDeg: 0.8,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 18,
          restFineTuneYpx: 0,
          motion: {
            anticipationDurationSeconds: 0.09,
            anticipationRotationDeltaDeg: -3.2,
            anticipationXpx: -0.74,
            anticipationYpx: -0.48,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.24,
            strikeDurationSeconds: 0.18,
            strikeMinDurationSeconds: 0.15,
            strikeMaxDurationSeconds: 0.2,
            strikeEase: "power3.in",
            followThroughDurationSeconds: 0.03,
            overshootRotationDeltaDeg: 0.12,
            overshootXpx: 0.12,
            overshootYpx: 0.28,
            settleDurationSeconds: 0.12,
            settleEase: "power3.out",
            liftDurationSeconds: 0.22,
            liftMinDurationSeconds: 0.16,
            liftMaxDurationSeconds: 0.25,
            liftEase: "power3.out"
          }
        },
        mobile: {
          pivotXPercent: 18,
          pivotYPercent: 65,
          restRotationDeg: -34,
          impactRotationDeg: 0.8,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 12,
          restFineTuneYpx: 10,
          motion: {
            anticipationDurationSeconds: 0.11,
            anticipationRotationDeltaDeg: -3.2,
            anticipationXpx: -18,
            anticipationYpx: -12,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.32,
            strikeDurationSeconds: 0.2,
            strikeMinDurationSeconds: 0.17,
            strikeMaxDurationSeconds: 0.23,
            strikeEase: "power3.in",
            followThroughDurationSeconds: 0.034,
            overshootRotationDeltaDeg: 0.14,
            overshootXpx: 0.12,
            overshootYpx: 0.32,
            settleDurationSeconds: 0.13,
            settleEase: "power3.out",
            liftDurationSeconds: 0.23,
            liftMinDurationSeconds: 0.17,
            liftMaxDurationSeconds: 0.26,
            liftEase: "power3.out"
          }
        },
        targetReaction: {
          translateXpx: 0,
          translateYpx: 1,
          scaleX: 1.005,
          scaleY: 0.989,
          compressionDurationSeconds: 0.055,
          compressionEase: "power2.out",
          recoveryDurationSeconds: 0.17,
          recoveryEase: "power3.out",
          transformOrigin: "bottom center"
        },
        shadowReaction: {
          translateXpx: 0,
          translateYpx: 1.5,
          scaleX: 1.12,
          scaleY: 0.85,
          opacity: 0.82,
          compressionDurationSeconds: 0.065,
          compressionEase: "power2.out",
          recoveryDurationSeconds: 0.19,
          recoveryEase: "power3.out",
          transformOrigin: "center center"
        },
        impactEffects: {
          target: {
            desktop: {
              compressionYpx: 0.8,
              compressionScaleY: 0.9972,
              recoilYpx: -0.08,
              settleDurationSeconds: 0.115
            },
            mobile: {
              compressionYpx: 1.12,
              compressionScaleY: 0.9964,
              recoilYpx: -0.11,
              settleDurationSeconds: 0.12
            }
          },
          broadShadow: {
            translateYpx: 1.1,
            scaleX: 1.085,
            scaleY: 0.89,
            opacity: 0.9,
            compressionDurationSeconds: 0.06,
            recoveryDurationSeconds: 0.18
          },
          castShadow: {
            xPercent: 3.5,
            yPercent: 7.5,
            cssFilter: "brightness(0) saturate(0) blur(2.25px)",
            rest: {
              opacity: 0.2
            },
            anticipation: {
              opacity: 0.14
            },
            impact: {
              opacity: 0.28
            },
            settle: {
              opacity: 0.22
            }
          },
          contactShadow: {
            preContactOpacity: 0.06,
            contactOpacity: 0.18,
            contactScaleX: 1.08,
            recoilOpacity: 0.105,
            fadeDurationSeconds: 0.16
          },
          dust: {
            anchorOffsetXpx: 0,
            anchorOffsetYpx: 0,
            peakOpacity: 0.12,
            peakScale: 1.02,
            endScale: 1.22,
            startYPercent: -42,
            peakYPercent: -52,
            endYPercent: -66,
            fadeDurationSeconds: 0.18
          },
          resonance: {
            enabled: true,
            startOpacity: 0.07,
            peakOpacity: 0.08,
            endScaleX: 1.32,
            endScaleY: 1.04,
            revealDurationSeconds: 0.035,
            fadeDurationSeconds: 0.11
          }
        }
      },
      C: {
        label: "Ceremonial slam",
        description: "Largest time-based gesture: a deliberate wind-up, a heavier landing, and the most visible dust and resonance.",
        mobileViewport: {
          playback: "timed",
          replayMode: "once",
          finalState: "hold-impact",
          entryDelaySeconds: 0.04
        },
        /*
         * Production TSA preset:
         * restrained anticipation, accelerating approach, exact contact,
         * micro follow-through, controlled stabilization and a firm hold.
         */
        desktop: {
          pivotXPercent: 18,
          pivotYPercent: 65,
          restRotationDeg: -31,
          impactRotationDeg: 1.2,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 20,
          restFineTuneYpx: 0,
          motion: {
            anticipationDurationSeconds: 0.12,
            anticipationRotationDeltaDeg: -5.2,
            anticipationXpx: -1.1,
            anticipationYpx: -0.72,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.32,
            strikeDurationSeconds: 0.23,
            strikeMinDurationSeconds: 0.2,
            strikeMaxDurationSeconds: 0.26,
            strikeEase: "power4.in",
            followThroughDurationSeconds: 0.045,
            overshootRotationDeltaDeg: 0.24,
            overshootXpx: 0.18,
            overshootYpx: 0.46,
            settleDurationSeconds: 0.18,
            settleEase: "expo.out",
            liftDurationSeconds: 0.36,
            liftMinDurationSeconds: 0.3,
            liftMaxDurationSeconds: 0.42,
            liftEase: "power3.out"
          }
        },
        mobile: {
          pivotXPercent: 18,
          pivotYPercent: 65,
          restRotationDeg: -34,
          impactRotationDeg: 1.2,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 20,
          restFineTuneYpx: 0,
          motion: {
            anticipationDurationSeconds: 0.13,
            anticipationRotationDeltaDeg: -5,
            anticipationXpx: -1,
            anticipationYpx: -0.66,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.32,
            strikeDurationSeconds: 0.25,
            strikeMinDurationSeconds: 0.22,
            strikeMaxDurationSeconds: 0.28,
            strikeEase: "power4.in",
            followThroughDurationSeconds: 0.048,
            overshootRotationDeltaDeg: 0.22,
            overshootXpx: 0.18,
            overshootYpx: 0.5,
            settleDurationSeconds: 0.2,
            settleEase: "expo.out",
            liftDurationSeconds: 0.38,
            liftMinDurationSeconds: 0.32,
            liftMaxDurationSeconds: 0.44,
            liftEase: "power3.out"
          }
        },
        targetReaction: {
          translateXpx: 0,
          translateYpx: 0.45,
          scaleX: 1.0008,
          scaleY: 0.9975,
          compressionDurationSeconds: 0.045,
          compressionEase: "power3.out",
          recoveryDurationSeconds: 0.12,
          recoveryEase: "power3.out",
          transformOrigin: "bottom center"
        },
        shadowReaction: {
          translateXpx: 0,
          translateYpx: 0.9,
          scaleX: 1.06,
          scaleY: 0.92,
          opacity: 0.9,
          compressionDurationSeconds: 0.055,
          compressionEase: "power3.out",
          recoveryDurationSeconds: 0.15,
          recoveryEase: "power3.out",
          transformOrigin: "center center"
        },
        impactEffects: {
          target: {
            desktop: {
              compressionXpx: 0.08,
              compressionYpx: 1.28,
              compressionRotationDeg: 0.018,
              compressionScaleX: 1.001,
              compressionScaleY: 0.9958,
              compressionDurationSeconds: 0.05,
              compressionEase: "power3.out",
              recoilXpx: -0.04,
              recoilYpx: -0.14,
              recoilRotationDeg: -8e-3,
              recoilScaleX: 1,
              recoilScaleY: 1.0002,
              recoilDurationSeconds: 0.034,
              recoilEase: "power2.out",
              settleDurationSeconds: 0.16,
              settleEase: "power3.out",
              transformOrigin: "bottom center"
            },
            mobile: {
              compressionXpx: 0.1,
              compressionYpx: 1.42,
              compressionRotationDeg: 0.025,
              compressionScaleX: 1.0012,
              compressionScaleY: 0.9952,
              compressionDurationSeconds: 0.052,
              compressionEase: "power3.out",
              recoilXpx: -0.05,
              recoilYpx: -0.16,
              recoilRotationDeg: -0.01,
              recoilScaleX: 1,
              recoilScaleY: 1.0003,
              recoilDurationSeconds: 0.038,
              recoilEase: "power2.out",
              settleDurationSeconds: 0.17,
              settleEase: "power3.out",
              transformOrigin: "bottom center"
            }
          },
          broadShadow: {
            translateYpx: 1.45,
            scaleX: 1.12,
            scaleY: 0.84,
            opacity: 0.94,
            compressionDurationSeconds: 0.07,
            recoveryDurationSeconds: 0.22
          },
          castShadow: {
            xPercent: 3,
            yPercent: 6,
            rotationOffsetDeg: 8,
            rest: {
              scaleX: 1,
              scaleY: 1,
              opacity: 0.07
            },
            anticipation: {
              scaleX: 1,
              scaleY: 1,
              opacity: 0.045
            },
            impact: {
              scaleX: 1,
              scaleY: 1,
              opacity: 0.18
            },
            settle: {
              scaleX: 1,
              scaleY: 1,
              opacity: 0.12
            }
          },
          dust: {
            anchorOffsetXpx: 0,
            anchorOffsetYpx: 0,
            xPercent: -50,
            startOpacity: 0,
            peakOpacity: 0.16,
            startScale: 0.76,
            peakScale: 1.08,
            endScale: 1.34,
            startYPercent: -42,
            peakYPercent: -54,
            endYPercent: -76,
            revealDurationSeconds: 0.04,
            fadeDurationSeconds: 0.22,
            revealEase: "power2.out",
            fadeEase: "power2.out",
            transformOrigin: "center bottom"
          },
          contactShadow: {
            anchorOffsetXpx: 0,
            anchorOffsetYpx: 0,
            preContactLeadSeconds: 0.05,
            preContactOpacity: 0.07,
            preContactScaleX: 0.82,
            preContactScaleY: 0.72,
            contactOpacity: 0.22,
            contactScaleX: 1.16,
            contactScaleY: 0.46,
            contactDurationSeconds: 0.035,
            contactEase: "power2.out",
            recoilOpacity: 0.12,
            recoilScaleX: 1.16,
            recoilScaleY: 0.58,
            recoilDurationSeconds: 0.045,
            recoilEase: "power2.out",
            fadeOpacity: 0,
            fadeScaleX: 0.94,
            fadeScaleY: 0.72,
            fadeDurationSeconds: 0.18,
            fadeEase: "power3.out"
          },
          resonance: {
            enabled: true,
            anchorOffsetXpx: 0,
            anchorOffsetYpx: 0,
            startOpacity: 0.08,
            peakOpacity: 0.1,
            endOpacity: 0,
            startScaleX: 0.72,
            startScaleY: 0.82,
            endScaleX: 1.45,
            endScaleY: 1.08,
            durationSeconds: 0.18,
            revealDurationSeconds: 0.05,
            fadeDurationSeconds: 0.13,
            ease: "power2.out"
          }
        }
      },
      D: {
        label: "Editorial pendulum",
        description: "A slow scroll-scrubbed arc: less explosive than B, more cinematic and inspectable on mobile.",
        mobileViewport: {
          playback: "scrub",
          start: "top 96%",
          end: "bottom 12%",
          scrubSmoothingSeconds: 0.55,
          scrubImpactThreshold: 0.96,
          scrubResetThreshold: 0.38,
          replayMode: "once-per-entry",
          finalState: "hold-impact",
          entryDelaySeconds: 0,
          minimumReplayIntervalSeconds: 0.35,
          playOnInitialLoadIfVisible: false
        },
        desktop: {
          pivotXPercent: 16,
          pivotYPercent: 66,
          restRotationDeg: -24,
          impactRotationDeg: 0.6,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 9,
          restFineTuneYpx: 0,
          motion: {
            anticipationDurationSeconds: 0.14,
            anticipationRotationDeltaDeg: -2.6,
            anticipationXpx: -0.45,
            anticipationYpx: -0.3,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.26,
            strikeDurationSeconds: 0.34,
            strikeMinDurationSeconds: 0.3,
            strikeMaxDurationSeconds: 0.38,
            strikeEase: "power2.in",
            followThroughDurationSeconds: 0.032,
            overshootRotationDeltaDeg: 0.06,
            overshootXpx: 0.06,
            overshootYpx: 0.18,
            settleDurationSeconds: 0.22,
            settleEase: "sine.out",
            liftDurationSeconds: 0.42,
            liftMinDurationSeconds: 0.36,
            liftMaxDurationSeconds: 0.48,
            liftEase: "power3.out"
          }
        },
        mobile: {
          pivotXPercent: 16,
          pivotYPercent: 66,
          restRotationDeg: -30,
          impactRotationDeg: 0.6,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 8,
          restFineTuneYpx: 0,
          motion: {
            anticipationDurationSeconds: 0.16,
            anticipationRotationDeltaDeg: -2.5,
            anticipationXpx: -0.42,
            anticipationYpx: -0.28,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.28,
            strikeDurationSeconds: 0.38,
            strikeMinDurationSeconds: 0.34,
            strikeMaxDurationSeconds: 0.44,
            strikeEase: "power2.in",
            followThroughDurationSeconds: 0.032,
            overshootRotationDeltaDeg: 0.06,
            overshootXpx: 0.06,
            overshootYpx: 0.18,
            settleDurationSeconds: 0.24,
            settleEase: "sine.out",
            liftDurationSeconds: 0.48,
            liftMinDurationSeconds: 0.42,
            liftMaxDurationSeconds: 0.54,
            liftEase: "power3.out"
          }
        },
        targetReaction: {
          translateXpx: 0,
          translateYpx: 0.8,
          scaleX: 1.003,
          scaleY: 0.991,
          compressionDurationSeconds: 0.06,
          compressionEase: "power2.out",
          recoveryDurationSeconds: 0.17,
          recoveryEase: "power3.out",
          transformOrigin: "bottom center"
        },
        shadowReaction: {
          translateXpx: 0,
          translateYpx: 1.25,
          scaleX: 1.09,
          scaleY: 0.88,
          opacity: 0.85,
          compressionDurationSeconds: 0.07,
          compressionEase: "power2.out",
          recoveryDurationSeconds: 0.19,
          recoveryEase: "power3.out",
          transformOrigin: "center center"
        },
        impactEffects: {
          target: {
            desktop: {
              compressionYpx: 0.42,
              compressionScaleY: 0.9986,
              recoilYpx: -0.04,
              compressionDurationSeconds: 0.052,
              settleDurationSeconds: 0.12
            },
            mobile: {
              compressionYpx: 0.5,
              compressionScaleY: 0.9982,
              recoilYpx: -0.045,
              compressionDurationSeconds: 0.055,
              settleDurationSeconds: 0.13
            }
          },
          broadShadow: {
            translateYpx: 0.52,
            scaleX: 1.03,
            scaleY: 0.965,
            opacity: 0.7,
            compressionDurationSeconds: 0.06,
            recoveryDurationSeconds: 0.18
          },
          contactShadow: {
            preContactOpacity: 0.032,
            contactOpacity: 0.08,
            recoilOpacity: 0.058,
            fadeDurationSeconds: 0.14
          },
          dust: {
            enabled: false
          },
          resonance: {
            enabled: true,
            startOpacity: 0.04,
            peakOpacity: 0.045,
            endScaleX: 1.22,
            endScaleY: 1,
            revealDurationSeconds: 0.06,
            fadeDurationSeconds: 0.16
          }
        }
      },
      E: {
        label: "Snap verdict",
        description: "Fastest time-based option: a sharp decisive hit with very little atmosphere and a clear mobile change.",
        mobileViewport: {
          playback: "timed",
          replayMode: "once",
          finalState: "hold-impact",
          entryDelaySeconds: 0
        },
        desktop: {
          pivotXPercent: 18,
          pivotYPercent: 65,
          restRotationDeg: -26,
          impactRotationDeg: 1.6,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 14,
          restFineTuneYpx: 0,
          motion: {
            anticipationDurationSeconds: 0.028,
            anticipationRotationDeltaDeg: -0.55,
            anticipationXpx: -0.08,
            anticipationYpx: -0.16,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.08,
            strikeDurationSeconds: 0.095,
            strikeMinDurationSeconds: 0.085,
            strikeMaxDurationSeconds: 0.11,
            strikeEase: "expo.in",
            followThroughDurationSeconds: 0.012,
            overshootRotationDeltaDeg: 0.08,
            overshootXpx: 0.04,
            overshootYpx: 0.18,
            settleDurationSeconds: 0.055,
            settleEase: "power3.out",
            liftDurationSeconds: 0.16,
            liftMinDurationSeconds: 0.13,
            liftMaxDurationSeconds: 0.18,
            liftEase: "power3.out"
          }
        },
        mobile: {
          pivotXPercent: 18,
          pivotYPercent: 65,
          restRotationDeg: -28,
          impactRotationDeg: 1.6,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 10,
          restFineTuneYpx: 0,
          motion: {
            anticipationDurationSeconds: 0.032,
            anticipationRotationDeltaDeg: -0.5,
            anticipationXpx: -0.08,
            anticipationYpx: -0.14,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.08,
            strikeDurationSeconds: 0.105,
            strikeMinDurationSeconds: 0.095,
            strikeMaxDurationSeconds: 0.12,
            strikeEase: "expo.in",
            followThroughDurationSeconds: 0.012,
            overshootRotationDeltaDeg: 0.08,
            overshootXpx: 0.04,
            overshootYpx: 0.2,
            settleDurationSeconds: 0.06,
            settleEase: "power3.out",
            liftDurationSeconds: 0.17,
            liftMinDurationSeconds: 0.14,
            liftMaxDurationSeconds: 0.19,
            liftEase: "power3.out"
          }
        },
        targetReaction: {
          translateXpx: 0,
          translateYpx: 0.4,
          scaleX: 1.0005,
          scaleY: 0.9995,
          compressionDurationSeconds: 0.04,
          compressionEase: "power2.out",
          recoveryDurationSeconds: 0.11,
          recoveryEase: "power3.out",
          transformOrigin: "bottom center"
        },
        shadowReaction: {
          translateXpx: 0,
          translateYpx: 0.8,
          scaleX: 1.06,
          scaleY: 0.92,
          opacity: 0.92,
          compressionDurationSeconds: 0.055,
          compressionEase: "power2.out",
          recoveryDurationSeconds: 0.14,
          recoveryEase: "power3.out",
          transformOrigin: "center center"
        },
        impactEffects: {
          target: {
            compressionXpx: 0.06,
            compressionYpx: 0.72,
            compressionRotationDeg: 0.01,
            compressionScaleX: 1.0004,
            compressionScaleY: 0.999,
            compressionDurationSeconds: 0.04,
            compressionEase: "power3.out",
            recoilXpx: -0.025,
            recoilYpx: -0.07,
            recoilRotationDeg: -4e-3,
            recoilScaleX: 1,
            recoilScaleY: 1,
            recoilDurationSeconds: 0.026,
            recoilEase: "power2.out",
            settleDurationSeconds: 0.06,
            settleEase: "power3.out",
            transformOrigin: "bottom center"
          },
          broadShadow: {
            translateYpx: 0.68,
            scaleX: 1.04,
            scaleY: 0.94,
            opacity: 0.8,
            compressionDurationSeconds: 0.032,
            recoveryDurationSeconds: 0.09
          },
          castShadow: {
            xPercent: 3,
            yPercent: 6,
            rotationOffsetDeg: 8,
            rest: {
              scaleX: 1,
              scaleY: 1,
              opacity: 0.07
            },
            anticipation: {
              scaleX: 1,
              scaleY: 1,
              opacity: 0.05
            },
            impact: {
              scaleX: 1,
              scaleY: 1,
              opacity: 0.105
            },
            settle: {
              scaleX: 1,
              scaleY: 1,
              opacity: 0.08
            }
          },
          dust: {
            anchorOffsetXpx: 0,
            anchorOffsetYpx: 0,
            xPercent: -50,
            startOpacity: 0,
            peakOpacity: 0.025,
            startScale: 0.72,
            peakScale: 0.8,
            endScale: 0.92,
            startYPercent: -40,
            peakYPercent: -50,
            endYPercent: -62,
            revealDurationSeconds: 0.04,
            fadeDurationSeconds: 0.1,
            revealEase: "power2.out",
            fadeEase: "power2.out",
            transformOrigin: "center bottom"
          },
          contactShadow: {
            anchorOffsetXpx: 0,
            anchorOffsetYpx: 0,
            preContactLeadSeconds: 0.05,
            preContactOpacity: 0.032,
            preContactScaleX: 0.82,
            preContactScaleY: 0.72,
            contactOpacity: 0.13,
            contactScaleX: 0.96,
            contactScaleY: 0.6,
            contactDurationSeconds: 0.032,
            contactEase: "power2.out",
            recoilOpacity: 0.07,
            recoilScaleX: 1.02,
            recoilScaleY: 0.68,
            recoilDurationSeconds: 0.04,
            recoilEase: "power2.out",
            fadeOpacity: 0,
            fadeScaleX: 0.94,
            fadeScaleY: 0.72,
            fadeDurationSeconds: 0.075,
            fadeEase: "power3.out"
          },
          resonance: {
            enabled: false,
            anchorOffsetXpx: 0,
            anchorOffsetYpx: 0,
            startOpacity: 0.05,
            endOpacity: 0,
            startScaleX: 0.72,
            startScaleY: 0.82,
            endScaleX: 1.14,
            endScaleY: 0.98,
            durationSeconds: 0.1,
            ease: "power2.out"
          }
        }
      }
    }
  };
  function initGavel() {
    const runtimeWindow = window;
    runtimeWindow.Webflow ||= [];
    runtimeWindow.Webflow.push(() => {
      const { gsap } = runtimeWindow;
      const { ScrollTrigger } = runtimeWindow;
      if (!gsap || !ScrollTrigger) {
        console.warn("[TSA Gavel] GSAP sau ScrollTrigger nu este disponibil.");
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      runtimeWindow.TSA_GAVEL_CONFIG = QUICK_TUNING;
      const SELECTORS3 = {
        scope: "[data-gavel-scope]",
        trigger: "[data-gavel-trigger]",
        component: "[data-gavel-component]",
        gavel: "[data-gavel]",
        castShadow: "[data-gavel-cast-shadow]",
        dust: "[data-gavel-impact-dust]",
        contactShadow: "[data-gavel-contact-shadow]",
        resonance: "[data-gavel-resonance]",
        target: "[data-gavel-target]",
        shadow: "[data-gavel-shadow]"
      };
      const DESKTOP_QUERY = `(min-width: ${QUICK_TUNING.interaction.desktopMinWidthPx}px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`;
      const MOBILE_QUERY2 = `(max-width: ${QUICK_TUNING.interaction.desktopMinWidthPx - 1}px) and (prefers-reduced-motion: no-preference)`;
      const REDUCED_MOTION_QUERY3 = "(prefers-reduced-motion: reduce)";
      let activePresetName = QUICK_TUNING.activePreset;
      const presetDefinitions = QUICK_TUNING.presets;
      const instances = [];
      const globalCleanup = [];
      const clamp4 = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
      };
      const lerp = (start, end, progress) => {
        return start + (end - start) * progress;
      };
      const easeInCubic = (progress) => {
        return progress * progress * progress;
      };
      const easeOutCubic = (progress) => {
        return 1 - Math.pow(1 - progress, 3);
      };
      const degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
      };
      const radiansToDegrees = (radians) => {
        return radians * 180 / Math.PI;
      };
      const rotateVector = (point, degrees) => {
        const radians = degreesToRadians(degrees);
        const cosine = Math.cos(radians);
        const sine = Math.sin(radians);
        return {
          x: point.x * cosine - point.y * sine,
          y: point.x * sine + point.y * cosine
        };
      };
      const getPercentPoint = (width, height, xPercent, yPercent) => {
        return {
          x: width * xPercent / 100,
          y: height * yPercent / 100
        };
      };
      const deepMerge = (base, override) => {
        if (!override) {
          return { ...base };
        }
        const output = { ...base };
        Object.entries(override).forEach(([key, value]) => {
          if (value === void 0) {
            return;
          }
          const baseValue = output[key];
          if (value && baseValue && typeof value === "object" && typeof baseValue === "object" && !Array.isArray(value) && !Array.isArray(baseValue)) {
            output[key] = deepMerge(
              baseValue,
              value
            );
            return;
          }
          output[key] = value;
        });
        return output;
      };
      const BASE_GAVEL_PRESET = {
        label: "Scroll-cocked reveal",
        description: "Recommended mobile showcase: the hammer cocks with scroll, lands at the end of the viewport pass, then releases a polished contact burst.",
        desktop: {
          pivotXPercent: 18,
          pivotYPercent: 65,
          restRotationDeg: -22,
          impactRotationDeg: 0.8,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 14,
          restFineTuneYpx: 0,
          motion: {
            anticipationEnabled: true,
            anticipationDurationSeconds: 0.07,
            anticipationRotationDeltaDeg: -2.8,
            anticipationXpx: -0.65,
            anticipationYpx: -0.45,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.18,
            strikeDurationSeconds: 0.16,
            strikeMinDurationSeconds: 0.145,
            strikeMaxDurationSeconds: 0.175,
            strikeEase: "power3.in",
            followThroughEnabled: true,
            followThroughDurationSeconds: 0.028,
            overshootRotationDeltaDeg: 0.12,
            overshootXpx: 0.12,
            overshootYpx: 0.28,
            settleEnabled: true,
            settleDurationSeconds: 0.095,
            settleEase: "power3.out",
            liftDurationSeconds: 0.22,
            liftMinDurationSeconds: 0.16,
            liftMaxDurationSeconds: 0.25,
            liftEase: "power3.out"
          }
        },
        mobile: {
          pivotXPercent: 18,
          pivotYPercent: 65,
          restRotationDeg: -20,
          impactRotationDeg: 0.8,
          impactFineTuneXpx: 0,
          impactFineTuneYpx: 0,
          restFineTuneXpx: 10,
          restFineTuneYpx: 0,
          motion: {
            anticipationEnabled: true,
            anticipationDurationSeconds: 0.07,
            anticipationRotationDeltaDeg: -2.8,
            anticipationXpx: -0.65,
            anticipationYpx: -0.45,
            anticipationEase: "power2.out",
            anticipationMaxProgress: 0.18,
            strikeDurationSeconds: 0.16,
            strikeMinDurationSeconds: 0.145,
            strikeMaxDurationSeconds: 0.175,
            strikeEase: "power3.in",
            followThroughEnabled: true,
            followThroughDurationSeconds: 0.028,
            overshootRotationDeltaDeg: 0.12,
            overshootXpx: 0.12,
            overshootYpx: 0.28,
            settleEnabled: true,
            settleDurationSeconds: 0.095,
            settleEase: "power3.out",
            liftDurationSeconds: 0.22,
            liftMinDurationSeconds: 0.16,
            liftMaxDurationSeconds: 0.25,
            liftEase: "power3.out"
          }
        },
        mobileViewport: QUICK_TUNING.interaction.mobileViewport,
        impactEffects: QUICK_TUNING.impactEffects
      };
      const resolvePreset = (presetName) => {
        const definition = presetDefinitions[presetName];
        const legacyImpactEffects = definition.shadowReaction ? {
          broadShadow: definition.shadowReaction
        } : {};
        return deepMerge(
          {
            ...BASE_GAVEL_PRESET,
            label: definition.label,
            description: definition.description ?? BASE_GAVEL_PRESET.description
          },
          {
            desktop: definition.desktop,
            mobile: definition.mobile,
            mobileViewport: definition.mobileViewport,
            impactEffects: {
              ...legacyImpactEffects,
              ...definition.impactEffects ?? {}
            }
          }
        );
      };
      const getActivePreset = () => {
        return resolvePreset(activePresetName);
      };
      const getGeometryConfig = (mode, deviceProfile) => {
        const shared = QUICK_TUNING.assetGeometry;
        const isDesktop = mode === "desktop";
        return {
          authoredOriginXPercent: isDesktop ? shared.desktopAuthoredOriginXPercent : shared.mobileAuthoredOriginXPercent,
          authoredOriginYPercent: isDesktop ? shared.desktopAuthoredOriginYPercent : shared.mobileAuthoredOriginYPercent,
          pivotXPercent: deviceProfile.pivotXPercent,
          pivotYPercent: deviceProfile.pivotYPercent,
          contactXPercent: shared.contactXPercent,
          contactYPercent: shared.contactYPercent,
          targetContactXPercent: isDesktop ? shared.desktopTargetContactXPercent : shared.mobileTargetContactXPercent,
          targetContactYPercent: shared.targetContactYPercent,
          impactRotationDeg: deviceProfile.impactRotationDeg,
          impactFineTuneXpx: deviceProfile.impactFineTuneXpx,
          impactFineTuneYpx: deviceProfile.impactFineTuneYpx,
          restFineTuneXpx: deviceProfile.restFineTuneXpx,
          restFineTuneYpx: deviceProfile.restFineTuneYpx
        };
      };
      const isDeviceTargetImpactEffectConfig = (targetConfig) => {
        return "desktop" in targetConfig && "mobile" in targetConfig;
      };
      const getTargetImpactEffect = (targetConfig, mode) => {
        return isDeviceTargetImpactEffectConfig(targetConfig) ? targetConfig[mode] : targetConfig;
      };
      const ensureGeneratedEffect = ({
        component,
        selector,
        attributeName,
        className
      }) => {
        const existing = component.querySelector(selector);
        if (existing) {
          return {
            element: existing,
            createdByScript: false
          };
        }
        const element = document.createElement("div");
        element.setAttribute(attributeName, "");
        if (className) {
          element.classList.add(className);
        }
        component.appendChild(element);
        return {
          element,
          createdByScript: true
        };
      };
      const calculateOriginCompensation = ({
        width,
        height,
        authoredOriginXPercent,
        authoredOriginYPercent,
        pivotXPercent,
        pivotYPercent,
        rotationDeg
      }) => {
        const authoredOrigin = getPercentPoint(
          width,
          height,
          authoredOriginXPercent,
          authoredOriginYPercent
        );
        const pivotOrigin = getPercentPoint(width, height, pivotXPercent, pivotYPercent);
        const difference = {
          x: authoredOrigin.x - pivotOrigin.x,
          y: authoredOrigin.y - pivotOrigin.y
        };
        const rotatedDifference = rotateVector(difference, rotationDeg);
        return {
          x: difference.x - rotatedDifference.x,
          y: difference.y - rotatedDifference.y
        };
      };
      const measureWithoutOwnTransform = (element, component) => {
        const previousTransform = element.style.transform;
        const previousTransformOrigin = element.style.transformOrigin;
        element.style.transform = "none";
        element.style.transformOrigin = "50% 50%";
        const componentRect = component.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        element.style.transform = previousTransform;
        element.style.transformOrigin = previousTransformOrigin;
        return {
          left: elementRect.left - componentRect.left,
          top: elementRect.top - componentRect.top,
          width: elementRect.width,
          height: elementRect.height
        };
      };
      const removeDebug = (component, gavel, target) => {
        component.querySelector(".tsa-gavel-debug-layer")?.remove();
        gavel.classList.remove("is-tsa-gavel-debug");
        target.classList.remove("is-tsa-gavel-debug");
      };
      const renderDebug = (component, gavel, target, geometry, effectAnchors) => {
        removeDebug(component, gavel, target);
        if (!QUICK_TUNING.debug.enabled) {
          return;
        }
        const layer = document.createElement("div");
        layer.className = "tsa-gavel-debug-layer";
        component.appendChild(layer);
        if (QUICK_TUNING.debug.showBounds) {
          gavel.classList.add("is-tsa-gavel-debug");
          target.classList.add("is-tsa-gavel-debug");
        }
        const addMarker = (point, label, modifier) => {
          const marker = document.createElement("div");
          marker.className = `tsa-gavel-debug-marker ${modifier}`;
          marker.dataset.label = label;
          marker.style.left = `${point.x}px`;
          marker.style.top = `${point.y}px`;
          layer.appendChild(marker);
        };
        if (QUICK_TUNING.debug.showPivot) {
          addMarker(geometry.pivotWorld, "PIVOT", "is-pivot");
        }
        if (QUICK_TUNING.debug.showRestContact) {
          addMarker(geometry.restContact, "REST CONTACT", "is-rest-contact");
        }
        if (QUICK_TUNING.debug.showImpactContact) {
          addMarker(geometry.impactContact, "IMPACT", "is-impact-contact");
        }
        if (QUICK_TUNING.debug.showTargetContact) {
          addMarker(geometry.targetContact, "TARGET", "is-target-contact");
        }
        if (effectAnchors) {
          if (QUICK_TUNING.debug.showContactShadowAnchor && effectAnchors.contactShadow) {
            addMarker(effectAnchors.contactShadow, "CONTACT SHADOW", "is-contact-shadow-anchor");
          }
          if (QUICK_TUNING.debug.showDustAnchor && effectAnchors.dust) {
            addMarker(effectAnchors.dust, "DUST", "is-dust-anchor");
          }
          if (QUICK_TUNING.debug.showResonanceAnchor && effectAnchors.resonance) {
            addMarker(effectAnchors.resonance, "RESONANCE", "is-resonance-anchor");
          }
        }
        if (QUICK_TUNING.debug.showContactLine) {
          const deltaX = geometry.targetContact.x - geometry.restContact.x;
          const deltaY = geometry.targetContact.y - geometry.restContact.y;
          const line = document.createElement("div");
          line.className = "tsa-gavel-debug-line";
          line.style.left = `${geometry.restContact.x}px`;
          line.style.top = `${geometry.restContact.y}px`;
          line.style.width = `${Math.hypot(deltaX, deltaY)}px`;
          line.style.transform = `rotate(${radiansToDegrees(Math.atan2(deltaY, deltaX))}deg)`;
          layer.appendChild(line);
        }
        if (QUICK_TUNING.debug.logGeometry) {
          console.group(`[TSA Gavel] Preset ${activePresetName}: ` + getActivePreset().label);
          console.table({
            restX: geometry.rest.x,
            restY: geometry.rest.y,
            restRotation: geometry.rest.rotation,
            impactX: geometry.impact.x,
            impactY: geometry.impact.y,
            impactRotation: geometry.impact.rotation,
            pivotX: geometry.pivotWorld.x,
            pivotY: geometry.pivotWorld.y,
            targetX: geometry.targetContact.x,
            targetY: geometry.targetContact.y,
            impactContactX: geometry.impactContact.x,
            impactContactY: geometry.impactContact.y,
            contactShadowAnchor: effectAnchors?.contactShadow && `${effectAnchors.contactShadow.x}, ${effectAnchors.contactShadow.y}`,
            dustAnchor: effectAnchors?.dust && `${effectAnchors.dust.x}, ${effectAnchors.dust.y}`,
            resonanceAnchor: effectAnchors?.resonance && `${effectAnchors.resonance.x}, ${effectAnchors.resonance.y}`,
            mobileImpactState: effectAnchors?.mobileImpactState
          });
          console.groupEnd();
        }
      };
      const calculateGeometry = ({
        component,
        gavel,
        target,
        geometryConfig,
        restRotationDeg
      }) => {
        const gavelBox = measureWithoutOwnTransform(gavel, component);
        const targetBox = measureWithoutOwnTransform(target, component);
        if (gavelBox.width <= 0 || gavelBox.height <= 0 || targetBox.width <= 0 || targetBox.height <= 0) {
          return null;
        }
        const pivotLocal = getPercentPoint(
          gavelBox.width,
          gavelBox.height,
          geometryConfig.pivotXPercent,
          geometryConfig.pivotYPercent
        );
        const contactLocal = getPercentPoint(
          gavelBox.width,
          gavelBox.height,
          geometryConfig.contactXPercent,
          geometryConfig.contactYPercent
        );
        const contactVector = {
          x: contactLocal.x - pivotLocal.x,
          y: contactLocal.y - pivotLocal.y
        };
        const originCompensation = calculateOriginCompensation({
          width: gavelBox.width,
          height: gavelBox.height,
          authoredOriginXPercent: geometryConfig.authoredOriginXPercent,
          authoredOriginYPercent: geometryConfig.authoredOriginYPercent,
          pivotXPercent: geometryConfig.pivotXPercent,
          pivotYPercent: geometryConfig.pivotYPercent,
          rotationDeg: restRotationDeg
        });
        const rest = {
          x: originCompensation.x + geometryConfig.restFineTuneXpx,
          y: originCompensation.y + geometryConfig.restFineTuneYpx,
          rotation: restRotationDeg
        };
        const pivotWorld = {
          x: gavelBox.left + pivotLocal.x + rest.x,
          y: gavelBox.top + pivotLocal.y + rest.y
        };
        const targetContact = {
          x: targetBox.left + targetBox.width * (geometryConfig.targetContactXPercent / 100) + geometryConfig.impactFineTuneXpx,
          y: targetBox.top + targetBox.height * (geometryConfig.targetContactYPercent / 100) + geometryConfig.impactFineTuneYpx
        };
        const rotatedImpactVector = rotateVector(contactVector, geometryConfig.impactRotationDeg);
        const contactBeforeTranslation = {
          x: pivotWorld.x + rotatedImpactVector.x,
          y: pivotWorld.y + rotatedImpactVector.y
        };
        const impactCorrection = {
          x: targetContact.x - contactBeforeTranslation.x,
          y: targetContact.y - contactBeforeTranslation.y
        };
        const impact = {
          x: rest.x + impactCorrection.x,
          y: rest.y + impactCorrection.y,
          rotation: geometryConfig.impactRotationDeg
        };
        const restContactVector = rotateVector(contactVector, rest.rotation);
        const impactContactVector = rotateVector(contactVector, impact.rotation);
        const restContact = {
          x: pivotWorld.x + restContactVector.x,
          y: pivotWorld.y + restContactVector.y
        };
        const impactPivot = {
          x: gavelBox.left + pivotLocal.x + impact.x,
          y: gavelBox.top + pivotLocal.y + impact.y
        };
        const impactContact = {
          x: impactPivot.x + impactContactVector.x,
          y: impactPivot.y + impactContactVector.y
        };
        return {
          transformOrigin: `${geometryConfig.pivotXPercent}% ${geometryConfig.pivotYPercent}%`,
          rest,
          impact,
          pivotWorld,
          restContact,
          impactContact,
          targetContact,
          gavelBox,
          targetBox
        };
      };
      const createController = ({
        mode,
        component,
        gavel,
        castShadow,
        dust,
        contactShadow,
        resonance,
        target,
        shadow,
        geometryConfig,
        deviceProfile,
        impactEffects
      }) => {
        let geometry = null;
        let activeTimeline = null;
        let impactReactionTimeline = null;
        let replayTimer = null;
        let resizeFrame = 0;
        let desiredState = "rest";
        let activePhase = "rest";
        let mobileStateReader = null;
        const motionConfig = deviceProfile.motion;
        const broadShadowEffect = impactEffects.broadShadow;
        const { restRotationDeg } = deviceProfile;
        const durationMultiplier = QUICK_TUNING.debug.enabled ? QUICK_TUNING.debug.slowMotionMultiplier : 1;
        const duration = (seconds) => {
          return seconds * durationMultiplier;
        };
        const setWillChange = (active) => {
          if (!QUICK_TUNING.performance.temporaryWillChange) {
            return;
          }
          gavel.style.willChange = active ? "transform" : "";
          target.style.willChange = active ? "transform" : "";
          shadow.style.willChange = active ? "transform, opacity" : "";
          if (castShadow) {
            castShadow.style.willChange = active ? "transform, opacity" : "";
          }
          if (dust) {
            dust.style.willChange = active ? "transform, opacity" : "";
          }
          contactShadow.style.willChange = active ? "transform, opacity" : "";
          resonance.style.willChange = active ? "transform, opacity" : "";
        };
        const getNumericProperty = (element, property) => {
          const value = gsap.getProperty(element, property);
          if (typeof value === "number") {
            return value;
          }
          return Number.parseFloat(String(value)) || 0;
        };
        const readCurrentPose = () => {
          return {
            x: getNumericProperty(gavel, "x"),
            y: getNumericProperty(gavel, "y"),
            rotation: getNumericProperty(gavel, "rotation")
          };
        };
        const getProgress = () => {
          if (!geometry) {
            return 0;
          }
          const rotationWeight = 2.5;
          const { rest } = geometry;
          const { impact } = geometry;
          const current = readCurrentPose();
          const axis = {
            x: impact.x - rest.x,
            y: impact.y - rest.y,
            rotation: (impact.rotation - rest.rotation) * rotationWeight
          };
          const currentVector = {
            x: current.x - rest.x,
            y: current.y - rest.y,
            rotation: (current.rotation - rest.rotation) * rotationWeight
          };
          const axisLengthSquared = axis.x * axis.x + axis.y * axis.y + axis.rotation * axis.rotation;
          if (axisLengthSquared <= 1e-3) {
            return desiredState === "impact" ? 1 : 0;
          }
          const projection = (currentVector.x * axis.x + currentVector.y * axis.y + currentVector.rotation * axis.rotation) / axisLengthSquared;
          return clamp4(projection, 0, 1);
        };
        const interpolatePose = (progress) => {
          if (!geometry) {
            return {
              x: 0,
              y: 0,
              rotation: restRotationDeg
            };
          }
          if (mode === "mobile" && progress > 5e-3 && progress < 0.995) {
            const approachEndProgress = 0.74;
            const preImpactPose = {
              x: geometry.impact.x + motionConfig.anticipationXpx,
              y: geometry.impact.y + motionConfig.anticipationYpx,
              rotation: geometry.impact.rotation + motionConfig.anticipationRotationDeltaDeg
            };
            if (progress < approachEndProgress) {
              const approachProgress = easeOutCubic(clamp4(progress / approachEndProgress, 0, 1));
              return {
                x: lerp(geometry.rest.x, preImpactPose.x, approachProgress),
                y: lerp(geometry.rest.y, preImpactPose.y, approachProgress),
                rotation: lerp(geometry.rest.rotation, preImpactPose.rotation, approachProgress)
              };
            }
            const strikeProgress = easeInCubic(
              clamp4((progress - approachEndProgress) / (1 - approachEndProgress), 0, 1)
            );
            return {
              x: lerp(preImpactPose.x, geometry.impact.x, strikeProgress),
              y: lerp(preImpactPose.y, geometry.impact.y, strikeProgress),
              rotation: lerp(preImpactPose.rotation, geometry.impact.rotation, strikeProgress)
            };
          }
          return {
            x: lerp(geometry.rest.x, geometry.impact.x, progress),
            y: lerp(geometry.rest.y, geometry.impact.y, progress),
            rotation: lerp(geometry.rest.rotation, geometry.impact.rotation, progress)
          };
        };
        const getCastShadowVars = (pose, phase) => {
          const castShadowEffect = impactEffects.castShadow;
          const phaseEffect = castShadowEffect[phase];
          return {
            /*
             * x, y și rotația sunt preluate din aceeași poziție a gavel-ului.
             * Nu mai există o traiectorie separată care poate diverge.
             */
            x: pose.x,
            y: pose.y,
            rotation: pose.rotation + castShadowEffect.rotationOffsetDeg,
            /*
             * Offsetul vizual dintre assetul gavel și assetul umbrei
             * rămâne constant pe toată durata animației.
             */
            xPercent: castShadowEffect.xPercent,
            yPercent: castShadowEffect.yPercent,
            scaleX: phaseEffect.scaleX,
            scaleY: phaseEffect.scaleY,
            opacity: phaseEffect.opacity,
            filter: castShadowEffect.filterEnabled === false ? "" : castShadowEffect.cssFilter ?? "",
            mixBlendMode: castShadowEffect.mixBlendMode ?? "",
            transformOrigin: geometry?.transformOrigin ?? "18% 65%",
            force3D: QUICK_TUNING.performance.force3D
          };
        };
        const positionDustAtContact = () => {
          if (!dust || !geometry) {
            return;
          }
          const dustEffect = impactEffects.dust;
          const offsetParent = dust.offsetParent instanceof HTMLElement ? dust.offsetParent : component;
          const componentRect = component.getBoundingClientRect();
          const parentRect = offsetParent.getBoundingClientRect();
          const left = componentRect.left - parentRect.left + geometry.targetContact.x + dustEffect.anchorOffsetXpx;
          const top = componentRect.top - parentRect.top + geometry.targetContact.y + dustEffect.anchorOffsetYpx;
          gsap.set(dust, {
            left,
            top,
            right: "auto",
            bottom: "auto"
          });
        };
        const getComponentEffectAnchor = (offsetXpx, offsetYpx) => {
          if (!geometry) {
            return null;
          }
          return {
            x: geometry.targetContact.x + offsetXpx,
            y: geometry.targetContact.y + offsetYpx
          };
        };
        const getLocalEffectAnchor = (element, offsetXpx, offsetYpx) => {
          if (!geometry) {
            return null;
          }
          const offsetParent = element.offsetParent instanceof HTMLElement ? element.offsetParent : component;
          const componentRect = component.getBoundingClientRect();
          const parentRect = offsetParent.getBoundingClientRect();
          return {
            x: componentRect.left - parentRect.left + geometry.targetContact.x + offsetXpx,
            y: componentRect.top - parentRect.top + geometry.targetContact.y + offsetYpx
          };
        };
        const positionEffectAtContact = (element, offsetXpx, offsetYpx) => {
          const anchor = getLocalEffectAnchor(element, offsetXpx, offsetYpx);
          if (!anchor) {
            return;
          }
          gsap.set(element, {
            left: anchor.x,
            top: anchor.y,
            right: "auto",
            bottom: "auto"
          });
        };
        const positionImpactEffectsAtContact = () => {
          const contactShadowEffect = impactEffects.contactShadow;
          const resonanceEffect = impactEffects.resonance;
          positionDustAtContact();
          positionEffectAtContact(
            contactShadow,
            contactShadowEffect.anchorOffsetXpx,
            contactShadowEffect.anchorOffsetYpx
          );
          positionEffectAtContact(
            resonance,
            resonanceEffect.anchorOffsetXpx,
            resonanceEffect.anchorOffsetYpx
          );
        };
        const getDebugEffectAnchors = () => {
          const dustEffect = impactEffects.dust;
          const contactShadowEffect = impactEffects.contactShadow;
          const resonanceEffect = impactEffects.resonance;
          return {
            contactShadow: getComponentEffectAnchor(
              contactShadowEffect.anchorOffsetXpx,
              contactShadowEffect.anchorOffsetYpx
            ),
            dust: dust ? getComponentEffectAnchor(dustEffect.anchorOffsetXpx, dustEffect.anchorOffsetYpx) : null,
            resonance: getComponentEffectAnchor(
              resonanceEffect.anchorOffsetXpx,
              resonanceEffect.anchorOffsetYpx
            ),
            mobileImpactState: mode === "mobile" ? mobileStateReader?.().mobileStatus ?? "uninitialized" : void 0
          };
        };
        const renderControllerDebug = () => {
          if (!geometry) {
            return;
          }
          renderDebug(component, gavel, target, geometry, getDebugEffectAnchors());
        };
        const setImpactReactionDefaults = () => {
          const targetEffect = getTargetImpactEffect(impactEffects.target, mode);
          const dustEffect = impactEffects.dust;
          const contactShadowEffect = impactEffects.contactShadow;
          const resonanceEffect = impactEffects.resonance;
          positionImpactEffectsAtContact();
          gsap.set(target, {
            x: 0,
            y: 0,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            transformOrigin: targetEffect.transformOrigin
          });
          gsap.set(shadow, {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            transformOrigin: broadShadowEffect.transformOrigin
          });
          if (dust) {
            gsap.set(dust, {
              xPercent: dustEffect.xPercent,
              yPercent: dustEffect.startYPercent,
              scaleX: dustEffect.startScaleX ?? dustEffect.startScale,
              scaleY: dustEffect.startScaleY ?? dustEffect.startScale,
              rotation: dustEffect.startRotationDeg ?? 0,
              opacity: dustEffect.startOpacity,
              visibility: "hidden",
              filter: dustEffect.cssFilter ?? "",
              mixBlendMode: dustEffect.mixBlendMode ?? "",
              transformOrigin: dustEffect.transformOrigin
            });
          }
          gsap.set(contactShadow, {
            xPercent: -50,
            yPercent: -50,
            width: contactShadowEffect.widthRem ? `${contactShadowEffect.widthRem}rem` : "",
            height: contactShadowEffect.heightRem ? `${contactShadowEffect.heightRem}rem` : "",
            scaleX: contactShadowEffect.initialScaleX ?? 0.78,
            scaleY: contactShadowEffect.initialScaleY ?? 0.7,
            opacity: contactShadowEffect.initialOpacity ?? 0,
            visibility: "hidden",
            filter: contactShadowEffect.cssFilter ?? "",
            mixBlendMode: contactShadowEffect.mixBlendMode ?? "",
            transformOrigin: contactShadowEffect.transformOrigin ?? "center center"
          });
          gsap.set(resonance, {
            xPercent: -50,
            yPercent: -50,
            width: resonanceEffect.widthRem ? `${resonanceEffect.widthRem}rem` : "",
            height: resonanceEffect.heightRem ? `${resonanceEffect.heightRem}rem` : "",
            scaleX: resonanceEffect.startScaleX,
            scaleY: resonanceEffect.startScaleY,
            opacity: 0,
            visibility: "hidden",
            borderColor: resonanceEffect.borderColor ?? "",
            borderWidth: typeof resonanceEffect.borderWidthPx === "number" ? `${resonanceEffect.borderWidthPx}px` : "",
            boxShadow: resonanceEffect.boxShadow ?? "",
            transformOrigin: resonanceEffect.transformOrigin ?? "center center"
          });
        };
        const setReactionDefaults = () => {
          setImpactReactionDefaults();
          if (castShadow && geometry) {
            gsap.set(castShadow, getCastShadowVars(geometry.rest, "rest"));
          }
        };
        const killActiveTimeline = () => {
          activeTimeline?.kill();
          activeTimeline = null;
        };
        const killImpactReactionTimeline = () => {
          impactReactionTimeline?.kill();
          impactReactionTimeline = null;
        };
        const clearReplayTimer = () => {
          if (replayTimer === null) {
            return;
          }
          window.clearTimeout(replayTimer);
          replayTimer = null;
        };
        const addContactShadowPreContact = (timeline, contactTime) => {
          const contactShadowEffect = impactEffects.contactShadow;
          if (contactShadowEffect.enabled === false) {
            return;
          }
          const leadDuration = duration(contactShadowEffect.preContactLeadSeconds);
          const startTime = Math.max(0, contactTime - leadDuration);
          const availableDuration = Math.max(1e-3, contactTime - startTime);
          timeline.set(
            contactShadow,
            {
              visibility: "visible",
              xPercent: -50,
              yPercent: -50
            },
            startTime
          );
          timeline.to(
            contactShadow,
            {
              opacity: contactShadowEffect.preContactOpacity,
              scaleX: contactShadowEffect.preContactScaleX,
              scaleY: contactShadowEffect.preContactScaleY,
              duration: availableDuration,
              ease: "power2.out"
            },
            startTime
          );
        };
        const addImpactReactionToTimeline = (timeline, contactTime) => {
          const targetEffect = getTargetImpactEffect(impactEffects.target, mode);
          const dustEffect = impactEffects.dust;
          const contactShadowEffect = impactEffects.contactShadow;
          const resonanceEffect = impactEffects.resonance;
          const effectsAllowed = !QUICK_TUNING.performance.skipEffectsWhenDocumentHidden || document.visibilityState !== "hidden";
          if (targetEffect.enabled !== false) {
            timeline.to(
              target,
              {
                x: targetEffect.compressionXpx,
                y: targetEffect.compressionYpx,
                rotation: targetEffect.compressionRotationDeg,
                scaleX: targetEffect.compressionScaleX,
                scaleY: targetEffect.compressionScaleY,
                transformOrigin: targetEffect.transformOrigin,
                duration: duration(targetEffect.compressionDurationSeconds),
                ease: targetEffect.compressionEase
              },
              contactTime
            );
            if (targetEffect.recoilEnabled !== false) {
              timeline.to(
                target,
                {
                  x: targetEffect.recoilXpx,
                  y: targetEffect.recoilYpx,
                  rotation: targetEffect.recoilRotationDeg,
                  scaleX: targetEffect.recoilScaleX,
                  scaleY: targetEffect.recoilScaleY,
                  duration: duration(targetEffect.recoilDurationSeconds),
                  ease: targetEffect.recoilEase
                },
                contactTime + duration(targetEffect.compressionDurationSeconds)
              );
            }
            timeline.to(
              target,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                duration: duration(targetEffect.settleDurationSeconds),
                ease: targetEffect.settleEase
              },
              contactTime + duration(
                targetEffect.compressionDurationSeconds + (targetEffect.recoilEnabled === false ? 0 : targetEffect.recoilDurationSeconds)
              )
            );
          }
          if (broadShadowEffect.enabled !== false) {
            timeline.to(
              shadow,
              {
                x: broadShadowEffect.translateXpx,
                y: broadShadowEffect.translateYpx,
                scaleX: broadShadowEffect.scaleX,
                scaleY: broadShadowEffect.scaleY,
                opacity: broadShadowEffect.opacity ?? 1,
                transformOrigin: broadShadowEffect.transformOrigin,
                duration: duration(broadShadowEffect.compressionDurationSeconds),
                ease: broadShadowEffect.compressionEase
              },
              contactTime
            );
            timeline.to(
              shadow,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                duration: duration(broadShadowEffect.recoveryDurationSeconds),
                ease: broadShadowEffect.recoveryEase
              },
              contactTime + duration(broadShadowEffect.compressionDurationSeconds)
            );
          }
          if (contactShadowEffect.enabled !== false && effectsAllowed) {
            timeline.set(
              contactShadow,
              {
                visibility: "visible",
                xPercent: -50,
                yPercent: -50
              },
              contactTime
            );
            timeline.to(
              contactShadow,
              {
                opacity: contactShadowEffect.contactOpacity,
                scaleX: contactShadowEffect.contactScaleX,
                scaleY: contactShadowEffect.contactScaleY,
                duration: duration(contactShadowEffect.contactDurationSeconds),
                ease: contactShadowEffect.contactEase
              },
              contactTime
            );
            timeline.to(
              contactShadow,
              {
                opacity: contactShadowEffect.recoilOpacity,
                scaleX: contactShadowEffect.recoilScaleX,
                scaleY: contactShadowEffect.recoilScaleY,
                duration: duration(contactShadowEffect.recoilDurationSeconds),
                ease: contactShadowEffect.recoilEase
              },
              contactTime + duration(contactShadowEffect.contactDurationSeconds)
            );
            timeline.to(
              contactShadow,
              {
                opacity: contactShadowEffect.fadeOpacity,
                scaleX: contactShadowEffect.fadeScaleX,
                scaleY: contactShadowEffect.fadeScaleY,
                duration: duration(contactShadowEffect.fadeDurationSeconds),
                ease: contactShadowEffect.fadeEase
              },
              contactTime + duration(
                contactShadowEffect.contactDurationSeconds + contactShadowEffect.recoilDurationSeconds
              )
            );
            timeline.set(
              contactShadow,
              {
                visibility: "hidden"
              },
              contactTime + duration(
                contactShadowEffect.contactDurationSeconds + contactShadowEffect.recoilDurationSeconds + contactShadowEffect.fadeDurationSeconds
              )
            );
          }
          if (dust && dustEffect.enabled !== false && effectsAllowed) {
            timeline.set(
              dust,
              {
                xPercent: dustEffect.xPercent,
                yPercent: dustEffect.startYPercent,
                scaleX: dustEffect.startScaleX ?? dustEffect.startScale,
                scaleY: dustEffect.startScaleY ?? dustEffect.startScale,
                rotation: dustEffect.startRotationDeg ?? 0,
                opacity: dustEffect.startOpacity,
                visibility: "visible"
              },
              contactTime
            );
            timeline.to(
              dust,
              {
                yPercent: dustEffect.peakYPercent,
                scaleX: dustEffect.peakScaleX ?? dustEffect.peakScale,
                scaleY: dustEffect.peakScaleY ?? dustEffect.peakScale,
                rotation: dustEffect.peakRotationDeg ?? 0,
                opacity: dustEffect.peakOpacity,
                duration: duration(dustEffect.revealDurationSeconds),
                ease: dustEffect.revealEase
              },
              contactTime
            );
            timeline.to(
              dust,
              {
                yPercent: dustEffect.endYPercent,
                scaleX: dustEffect.endScaleX ?? dustEffect.endScale,
                scaleY: dustEffect.endScaleY ?? dustEffect.endScale,
                rotation: dustEffect.endRotationDeg ?? 0,
                opacity: dustEffect.endOpacity ?? 0,
                duration: duration(dustEffect.fadeDurationSeconds),
                ease: dustEffect.fadeEase
              },
              contactTime + duration(dustEffect.revealDurationSeconds)
            );
            timeline.set(
              dust,
              {
                visibility: "hidden"
              },
              contactTime + duration(dustEffect.revealDurationSeconds + dustEffect.fadeDurationSeconds)
            );
          }
          if (resonanceEffect.enabled && effectsAllowed) {
            const resonanceRevealDuration = duration(
              resonanceEffect.revealDurationSeconds ?? resonanceEffect.durationSeconds * 0.35
            );
            const resonanceFadeDuration = duration(
              resonanceEffect.fadeDurationSeconds ?? resonanceEffect.durationSeconds * 0.65
            );
            timeline.set(
              resonance,
              {
                visibility: "visible",
                xPercent: -50,
                yPercent: -50,
                scaleX: resonanceEffect.startScaleX,
                scaleY: resonanceEffect.startScaleY,
                opacity: resonanceEffect.startOpacity
              },
              contactTime
            );
            timeline.to(
              resonance,
              {
                opacity: resonanceEffect.peakOpacity ?? resonanceEffect.startOpacity,
                scaleX: resonanceEffect.peakScaleX ?? resonanceEffect.startScaleX,
                scaleY: resonanceEffect.peakScaleY ?? resonanceEffect.startScaleY,
                duration: resonanceRevealDuration,
                ease: resonanceEffect.revealEase ?? resonanceEffect.ease
              },
              contactTime
            );
            timeline.to(
              resonance,
              {
                opacity: resonanceEffect.endOpacity,
                scaleX: resonanceEffect.endScaleX,
                scaleY: resonanceEffect.endScaleY,
                duration: resonanceFadeDuration,
                ease: resonanceEffect.fadeEase ?? resonanceEffect.ease
              },
              contactTime + resonanceRevealDuration
            );
            timeline.set(
              resonance,
              {
                visibility: "hidden"
              },
              contactTime + resonanceRevealDuration + resonanceFadeDuration
            );
          }
        };
        const resetImpactReaction = () => {
          killImpactReactionTimeline();
          setReactionDefaults();
        };
        const playImpactReaction = () => {
          if (!ensureGeometry() || !geometry) {
            return;
          }
          killImpactReactionTimeline();
          positionImpactEffectsAtContact();
          setImpactReactionDefaults();
          const timeline = gsap.timeline({
            paused: true,
            defaults: {
              overwrite: "auto"
            },
            onComplete: () => {
              if (impactReactionTimeline === timeline) {
                impactReactionTimeline = null;
              }
            },
            onInterrupt: () => {
              if (impactReactionTimeline === timeline) {
                impactReactionTimeline = null;
              }
            }
          });
          impactReactionTimeline = timeline;
          activePhase = "contact";
          addImpactReactionToTimeline(timeline, 0);
          timeline.play(0);
        };
        const scrubToProgress = (progress) => {
          if (!ensureGeometry() || !geometry) {
            return;
          }
          const clampedProgress = clamp4(progress, 0, 1);
          const pose = interpolatePose(clampedProgress);
          const castShadowPhase = clampedProgress >= 0.98 ? "settle" : clampedProgress >= 0.72 ? "impact" : clampedProgress >= 0.12 ? "anticipation" : "rest";
          clearReplayTimer();
          killActiveTimeline();
          desiredState = clampedProgress >= 0.5 ? "impact" : "rest";
          activePhase = clampedProgress <= 5e-3 ? "rest" : clampedProgress >= 0.995 ? "impact-hold" : clampedProgress >= 0.9 ? "contact" : clampedProgress >= 0.12 ? "strike" : "anticipation";
          if (clampedProgress <= 5e-3) {
            resetImpactReaction();
          }
          setWillChange(clampedProgress > 5e-3 && clampedProgress < 0.995);
          gsap.set(gavel, {
            x: pose.x,
            y: pose.y,
            rotation: pose.rotation,
            transformOrigin: geometry.transformOrigin,
            force3D: QUICK_TUNING.performance.force3D
          });
          if (castShadow) {
            gsap.set(castShadow, getCastShadowVars(pose, castShadowPhase));
          }
        };
        const ensureGeometry = () => {
          if (geometry) {
            return true;
          }
          geometry = calculateGeometry({
            component,
            gavel,
            target,
            geometryConfig,
            restRotationDeg
          });
          if (!geometry) {
            return false;
          }
          renderControllerDebug();
          positionImpactEffectsAtContact();
          return true;
        };
        const completeTimeline = (timeline, completedPhase) => {
          if (activeTimeline !== timeline) {
            return;
          }
          activeTimeline = null;
          activePhase = completedPhase;
          setWillChange(false);
        };
        const animateToImpact = (options = {}) => {
          const wasMovingToImpact = desiredState === "impact";
          if (activeTimeline && wasMovingToImpact && !options.force) {
            return;
          }
          clearReplayTimer();
          killImpactReactionTimeline();
          desiredState = "impact";
          if (!ensureGeometry() || !geometry) {
            return;
          }
          const currentProgress = getProgress();
          if (currentProgress >= 0.995 && !activeTimeline && !options.force) {
            activePhase = "impact-hold";
            return;
          }
          killActiveTimeline();
          setImpactReactionDefaults();
          setWillChange(true);
          activePhase = "strike";
          const timeline = gsap.timeline({
            paused: true,
            defaults: {
              overwrite: "auto"
            },
            onComplete: () => {
              completeTimeline(timeline, "impact-hold");
            },
            onInterrupt: () => {
              if (activeTimeline === timeline) {
                activeTimeline = null;
              }
            }
          });
          activeTimeline = timeline;
          const canAnticipate = motionConfig.anticipationEnabled !== false && !options.skipAnticipation && currentProgress <= motionConfig.anticipationMaxProgress;
          if (canAnticipate) {
            activePhase = "anticipation";
            const availableProgress = 1 - currentProgress / motionConfig.anticipationMaxProgress;
            const anticipationDuration = Math.max(
              0.035,
              motionConfig.anticipationDurationSeconds * availableProgress
            );
            const anticipationPose = {
              x: geometry.rest.x + motionConfig.anticipationXpx,
              y: geometry.rest.y + motionConfig.anticipationYpx,
              rotation: geometry.rest.rotation + motionConfig.anticipationRotationDeltaDeg
            };
            timeline.to(gavel, {
              ...anticipationPose,
              transformOrigin: geometry.transformOrigin,
              duration: duration(anticipationDuration),
              ease: motionConfig.anticipationEase,
              force3D: QUICK_TUNING.performance.force3D
            });
            if (castShadow) {
              timeline.to(
                castShadow,
                {
                  ...getCastShadowVars(anticipationPose, "anticipation"),
                  duration: duration(anticipationDuration),
                  ease: motionConfig.anticipationEase
                },
                "<"
              );
            }
            timeline.call(
              () => {
                activePhase = "strike";
              },
              null,
              ">"
            );
          }
          const remainingDistance = clamp4(1 - currentProgress, 0, 1);
          const strikeDuration = motionConfig.strikeDurationSeconds ?? lerp(
            motionConfig.strikeMinDurationSeconds,
            motionConfig.strikeMaxDurationSeconds,
            remainingDistance
          );
          const overshootPose = {
            x: geometry.impact.x + motionConfig.overshootXpx,
            y: geometry.impact.y + motionConfig.overshootYpx,
            rotation: geometry.impact.rotation + motionConfig.overshootRotationDeltaDeg
          };
          timeline.to(gavel, {
            x: geometry.impact.x,
            y: geometry.impact.y,
            rotation: geometry.impact.rotation,
            transformOrigin: geometry.transformOrigin,
            duration: duration(strikeDuration),
            ease: motionConfig.strikeEase,
            force3D: QUICK_TUNING.performance.force3D
          });
          if (castShadow) {
            timeline.to(
              castShadow,
              {
                ...getCastShadowVars(geometry.impact, "impact"),
                duration: duration(strikeDuration),
                ease: motionConfig.strikeEase
              },
              "<"
            );
          }
          const contactTime = timeline.duration();
          addContactShadowPreContact(timeline, contactTime);
          timeline.call(
            () => {
              activePhase = "contact";
            },
            null,
            contactTime
          );
          const followThroughDuration = motionConfig.followThroughEnabled === false ? 0 : motionConfig.followThroughDurationSeconds ?? 0.028;
          const finalSettleDuration = motionConfig.settleEnabled === false ? 0 : motionConfig.settleDurationSeconds;
          if (followThroughDuration > 0) {
            timeline.to(
              gavel,
              {
                ...overshootPose,
                transformOrigin: geometry.transformOrigin,
                duration: duration(followThroughDuration),
                ease: "power1.out",
                force3D: QUICK_TUNING.performance.force3D
              },
              contactTime
            );
            timeline.call(
              () => {
                activePhase = "follow-through";
              },
              null,
              contactTime
            );
          }
          if (finalSettleDuration > 0) {
            timeline.to(
              gavel,
              {
                x: geometry.impact.x,
                y: geometry.impact.y,
                rotation: geometry.impact.rotation,
                transformOrigin: geometry.transformOrigin,
                duration: duration(finalSettleDuration),
                ease: motionConfig.settleEase,
                force3D: QUICK_TUNING.performance.force3D
              },
              contactTime + duration(followThroughDuration)
            );
            timeline.call(
              () => {
                activePhase = "settle";
              },
              null,
              contactTime + duration(followThroughDuration)
            );
          }
          addImpactReactionToTimeline(timeline, contactTime);
          if (castShadow && followThroughDuration > 0) {
            timeline.to(
              castShadow,
              {
                ...getCastShadowVars(overshootPose, "impact"),
                duration: duration(followThroughDuration),
                ease: "power1.out"
              },
              contactTime
            );
            if (finalSettleDuration > 0) {
              timeline.to(
                castShadow,
                {
                  ...getCastShadowVars(geometry.impact, "settle"),
                  duration: duration(finalSettleDuration),
                  ease: motionConfig.settleEase
                },
                contactTime + duration(followThroughDuration)
              );
            }
          }
          timeline.play(0);
        };
        const animateToRest = () => {
          clearReplayTimer();
          killImpactReactionTimeline();
          desiredState = "rest";
          if (!ensureGeometry() || !geometry) {
            return;
          }
          const currentProgress = getProgress();
          if (currentProgress <= 5e-3 && !activeTimeline) {
            setReactionDefaults();
            activePhase = "rest";
            return;
          }
          killActiveTimeline();
          setWillChange(true);
          activePhase = "lift";
          const liftDuration = motionConfig.liftDurationSeconds ?? lerp(
            motionConfig.liftMinDurationSeconds,
            motionConfig.liftMaxDurationSeconds,
            currentProgress
          );
          const timeline = gsap.timeline({
            paused: true,
            defaults: {
              overwrite: "auto"
            },
            onComplete: () => {
              completeTimeline(timeline, "rest");
            },
            onInterrupt: () => {
              if (activeTimeline === timeline) {
                activeTimeline = null;
              }
            }
          });
          activeTimeline = timeline;
          timeline.to(
            gavel,
            {
              x: geometry.rest.x,
              y: geometry.rest.y,
              rotation: geometry.rest.rotation,
              transformOrigin: geometry.transformOrigin,
              duration: duration(liftDuration),
              ease: motionConfig.liftEase,
              force3D: QUICK_TUNING.performance.force3D
            },
            0
          );
          timeline.to(
            target,
            {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              duration: duration(0.13),
              ease: "power2.out"
            },
            0
          );
          timeline.to(
            shadow,
            {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              opacity: 1,
              duration: duration(0.16),
              ease: "power2.out"
            },
            0
          );
          if (castShadow) {
            timeline.to(
              castShadow,
              {
                ...getCastShadowVars(geometry.rest, "rest"),
                duration: duration(liftDuration),
                ease: motionConfig.liftEase
              },
              0
            );
          }
          if (dust) {
            timeline.set(
              dust,
              {
                opacity: 0,
                visibility: "hidden"
              },
              0
            );
          }
          timeline.set(
            [contactShadow, resonance],
            {
              opacity: 0,
              visibility: "hidden"
            },
            0
          );
          timeline.play(0);
        };
        const setRest = () => {
          clearReplayTimer();
          killImpactReactionTimeline();
          desiredState = "rest";
          activePhase = "rest";
          if (!ensureGeometry() || !geometry) {
            return;
          }
          killActiveTimeline();
          setReactionDefaults();
          gsap.set(gavel, {
            x: geometry.rest.x,
            y: geometry.rest.y,
            rotation: geometry.rest.rotation,
            transformOrigin: geometry.transformOrigin,
            force3D: QUICK_TUNING.performance.force3D
          });
          setWillChange(false);
        };
        const setImpact = () => {
          clearReplayTimer();
          killImpactReactionTimeline();
          desiredState = "impact";
          activePhase = "impact-hold";
          if (!ensureGeometry() || !geometry) {
            return;
          }
          killActiveTimeline();
          setReactionDefaults();
          gsap.set(gavel, {
            x: geometry.impact.x,
            y: geometry.impact.y,
            rotation: geometry.impact.rotation,
            transformOrigin: geometry.transformOrigin,
            force3D: QUICK_TUNING.performance.force3D
          });
          if (castShadow) {
            gsap.set(castShadow, getCastShadowVars(geometry.impact, "settle"));
          }
          if (dust) {
            gsap.set(dust, {
              opacity: 0,
              visibility: "hidden"
            });
          }
          setWillChange(false);
        };
        const refreshNow = () => {
          cancelAnimationFrame(resizeFrame);
          resizeFrame = 0;
          const preservedProgress = getProgress();
          const preservedState = desiredState;
          killActiveTimeline();
          killImpactReactionTimeline();
          geometry = calculateGeometry({
            component,
            gavel,
            target,
            geometryConfig,
            restRotationDeg
          });
          if (!geometry) {
            return;
          }
          setReactionDefaults();
          renderControllerDebug();
          const preservedPose = interpolatePose(preservedProgress);
          gsap.set(gavel, {
            x: preservedPose.x,
            y: preservedPose.y,
            rotation: preservedPose.rotation,
            transformOrigin: geometry.transformOrigin,
            force3D: QUICK_TUNING.performance.force3D
          });
          if (castShadow) {
            gsap.set(
              castShadow,
              getCastShadowVars(preservedPose, preservedState === "impact" ? "settle" : "rest")
            );
          }
          if (preservedState === "impact" && preservedProgress >= 0.995) {
            setImpact();
          } else if (preservedState === "rest" && preservedProgress <= 5e-3) {
            setRest();
          } else {
            activePhase = preservedState === "impact" ? "impact-hold" : "rest";
            setWillChange(false);
          }
        };
        const scheduleRefresh = () => {
          cancelAnimationFrame(resizeFrame);
          resizeFrame = requestAnimationFrame(() => {
            refreshNow();
          });
        };
        const kill = () => {
          cancelAnimationFrame(resizeFrame);
          clearReplayTimer();
          killActiveTimeline();
          killImpactReactionTimeline();
          activePhase = "killed";
          removeDebug(component, gavel, target);
          setWillChange(false);
          gsap.set(
            [gavel, castShadow, dust, contactShadow, resonance, target, shadow].filter(Boolean),
            {
              clearProps: "transform,transformOrigin,willChange,opacity,visibility"
            }
          );
        };
        geometry = calculateGeometry({
          component,
          gavel,
          target,
          geometryConfig,
          restRotationDeg
        });
        if (geometry) {
          setReactionDefaults();
          gsap.set(gavel, {
            x: geometry.rest.x,
            y: geometry.rest.y,
            rotation: geometry.rest.rotation,
            transformOrigin: geometry.transformOrigin,
            force3D: QUICK_TUNING.performance.force3D
          });
          renderControllerDebug();
        }
        activePhase = "rest";
        const replay = (options = {}) => {
          clearReplayTimer();
          if (!ensureGeometry()) {
            return;
          }
          if (getProgress() > 5e-3 || activeTimeline) {
            animateToRest();
            const liftDuration = duration(
              motionConfig.liftDurationSeconds ?? motionConfig.liftMaxDurationSeconds
            );
            replayTimer = window.setTimeout(
              () => {
                replayTimer = null;
                animateToImpact({ ...options, force: true });
              },
              liftDuration * 1e3 + 32
            );
            return;
          }
          animateToImpact({ ...options, force: true });
        };
        const reset = (options = {}) => {
          clearReplayTimer();
          killActiveTimeline();
          killImpactReactionTimeline();
          if (options.initialState === "impact") {
            setImpact();
            return;
          }
          setRest();
        };
        return {
          moveToImpact: (options = {}) => {
            animateToImpact(options);
          },
          moveToRest: () => {
            animateToRest();
          },
          playImpactSequence: (options = {}) => {
            animateToImpact(options);
          },
          playImpactReaction,
          resetImpactReaction,
          scrubToProgress,
          replay,
          reset,
          setRest,
          setImpact,
          refresh: scheduleRefresh,
          refreshNow,
          scheduleRefresh,
          geometry: () => geometry,
          progress: getProgress,
          desiredState: () => desiredState,
          isAnimating: () => Boolean(activeTimeline || impactReactionTimeline),
          activePhase: () => activePhase,
          state: () => {
            const mobileState = mobileStateReader?.() ?? {
              mobileStatus: null,
              hasPlayed: null,
              isInside: null
            };
            return {
              mode,
              desiredState,
              progress: getProgress(),
              mobileStatus: mobileState.mobileStatus,
              hasPlayed: mobileState.hasPlayed,
              isInside: mobileState.isInside,
              activePreset: activePresetName
            };
          },
          setMobileStateReader: (reader) => {
            mobileStateReader = reader;
          },
          kill
        };
      };
      const inputState = runtimeWindow.__tsaGavelInputState || {
        keyboard: false,
        initialized: false
      };
      runtimeWindow.__tsaGavelInputState = inputState;
      if (!inputState.initialized) {
        inputState.initialized = true;
        document.addEventListener(
          "keydown",
          (event) => {
            if (event.key === "Tab") {
              inputState.keyboard = true;
            }
          },
          true
        );
        document.addEventListener(
          "pointerdown",
          () => {
            inputState.keyboard = false;
          },
          true
        );
      }
      const registerInstance = (instance) => {
        instances.push(instance);
      };
      const removeInstance = (instance) => {
        const index = instances.indexOf(instance);
        if (index >= 0) {
          instances.splice(index, 1);
        }
      };
      const initializeScope = (scope) => {
        scope.__tsaGavelCleanup?.();
        const trigger = scope.querySelector(SELECTORS3.trigger);
        const component = scope.querySelector(SELECTORS3.component);
        const gavel = component?.querySelector(SELECTORS3.gavel);
        const castShadow = component?.querySelector(SELECTORS3.castShadow) ?? null;
        const dust = component?.querySelector(SELECTORS3.dust) ?? null;
        const target = component?.querySelector(SELECTORS3.target);
        const shadow = component?.querySelector(SELECTORS3.shadow);
        if (!trigger || !component || !gavel || !target || !shadow) {
          console.warn("[TSA Gavel] Lipsesc elemente necesare.", {
            scope,
            trigger,
            component,
            gavel,
            target,
            shadow
          });
          return;
        }
        const localCleanup = [];
        const contactShadowLayer = ensureGeneratedEffect({
          component,
          selector: SELECTORS3.contactShadow,
          attributeName: "data-gavel-contact-shadow"
        });
        const resonanceLayer = ensureGeneratedEffect({
          component,
          selector: SELECTORS3.resonance,
          attributeName: "data-gavel-resonance",
          className: "tsa-gavel-resonance"
        });
        if (contactShadowLayer.createdByScript) {
          localCleanup.push(() => {
            contactShadowLayer.element.remove();
          });
        }
        if (resonanceLayer.createdByScript) {
          localCleanup.push(() => {
            resonanceLayer.element.remove();
          });
        }
        const preset = getActivePreset();
        const impactEffects = preset.impactEffects ?? QUICK_TUNING.impactEffects;
        const media = gsap.matchMedia();
        media.add(DESKTOP_QUERY, () => {
          const deviceProfile = preset.desktop;
          const controller = createController({
            mode: "desktop",
            component,
            gavel,
            castShadow,
            dust,
            contactShadow: contactShadowLayer.element,
            resonance: resonanceLayer.element,
            target,
            shadow,
            geometryConfig: getGeometryConfig("desktop", deviceProfile),
            deviceProfile,
            impactEffects
          });
          const instance = {
            scope,
            mode: "desktop",
            controller
          };
          registerInstance(instance);
          let pointerInside = false;
          let keyboardFocus = false;
          const syncDesiredState = () => {
            if (pointerInside || keyboardFocus) {
              controller.moveToImpact();
            } else {
              controller.moveToRest();
            }
          };
          const handlePointerEnter = () => {
            pointerInside = true;
            syncDesiredState();
          };
          const handlePointerLeave = () => {
            pointerInside = false;
            syncDesiredState();
          };
          const handleFocusIn = () => {
            keyboardFocus = inputState.keyboard;
            syncDesiredState();
          };
          const handleFocusOut = () => {
            queueMicrotask(() => {
              const { activeElement } = document;
              keyboardFocus = Boolean(activeElement && trigger.contains(activeElement));
              syncDesiredState();
            });
          };
          trigger.addEventListener("pointerenter", handlePointerEnter);
          trigger.addEventListener("pointerleave", handlePointerLeave);
          trigger.addEventListener("focusin", handleFocusIn);
          trigger.addEventListener("focusout", handleFocusOut);
          const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
            controller.scheduleRefresh();
          }) : null;
          resizeObserver?.observe(component);
          return () => {
            trigger.removeEventListener("pointerenter", handlePointerEnter);
            trigger.removeEventListener("pointerleave", handlePointerLeave);
            trigger.removeEventListener("focusin", handleFocusIn);
            trigger.removeEventListener("focusout", handleFocusOut);
            resizeObserver?.disconnect();
            controller.kill();
            removeInstance(instance);
          };
        });
        media.add(MOBILE_QUERY2, () => {
          const { mobile: deviceProfile, mobileViewport } = preset;
          const controller = createController({
            mode: "mobile",
            component,
            gavel,
            castShadow,
            dust,
            contactShadow: contactShadowLayer.element,
            resonance: resonanceLayer.element,
            target,
            shadow,
            geometryConfig: getGeometryConfig("mobile", deviceProfile),
            deviceProfile,
            impactEffects
          });
          const instance = {
            scope,
            mode: "mobile",
            controller
          };
          registerInstance(instance);
          const mobileState = {
            status: "uninitialized",
            hasPlayed: false,
            isInside: false,
            enteredFrom: null,
            lastPlayTimestamp: 0,
            entryDelayTimer: null,
            returnTimer: null,
            resetTimer: null,
            isRefreshing: false,
            isDestroyed: false
          };
          controller.setMobileStateReader(() => ({
            mobileStatus: mobileState.status,
            hasPlayed: mobileState.hasPlayed,
            isInside: mobileState.isInside
          }));
          let scrollRefreshFrame = 0;
          let initialVisibilityFrame = 0;
          const durationMultiplier = QUICK_TUNING.debug.enabled ? QUICK_TUNING.debug.slowMotionMultiplier : 1;
          const setMobileStatus = (status) => {
            if (mobileState.status === status) {
              return;
            }
            mobileState.status = status;
            if (QUICK_TUNING.debug.enabled && QUICK_TUNING.debug.logStateChanges) {
              console.info("[TSA Gavel] Mobile state:", status);
            }
          };
          const clearTimer = (key) => {
            const timer = mobileState[key];
            if (timer === null) {
              return;
            }
            window.clearTimeout(timer);
            mobileState[key] = null;
          };
          const cancelMobileTimers = () => {
            clearTimer("entryDelayTimer");
            clearTimer("returnTimer");
            clearTimer("resetTimer");
          };
          const scheduleScrollTriggerRefresh = () => {
            cancelAnimationFrame(scrollRefreshFrame);
            scrollRefreshFrame = requestAnimationFrame(() => {
              scrollRefreshFrame = 0;
              ScrollTrigger.refresh();
            });
          };
          const getImpactSequenceDurationMs = () => {
            const { motion } = deviceProfile;
            const targetEffect = getTargetImpactEffect(impactEffects.target, "mobile");
            const contactShadowEffect = impactEffects.contactShadow;
            const dustEffect = impactEffects.dust;
            const resonanceEffect = impactEffects.resonance;
            const motionDuration = (motion.anticipationEnabled === false ? 0 : motion.anticipationDurationSeconds) + (motion.strikeDurationSeconds ?? motion.strikeMaxDurationSeconds) + (motion.followThroughEnabled === false ? 0 : motion.followThroughDurationSeconds ?? 0.028) + (motion.settleEnabled === false ? 0 : motion.settleDurationSeconds);
            const targetDuration = targetEffect.enabled === false ? 0 : targetEffect.compressionDurationSeconds + (targetEffect.recoilEnabled === false ? 0 : targetEffect.recoilDurationSeconds) + targetEffect.settleDurationSeconds;
            const contactShadowDuration = contactShadowEffect.enabled === false ? 0 : contactShadowEffect.contactDurationSeconds + contactShadowEffect.recoilDurationSeconds + contactShadowEffect.fadeDurationSeconds;
            const dustDuration = !dust || dustEffect.enabled === false ? 0 : dustEffect.revealDurationSeconds + dustEffect.fadeDurationSeconds;
            const resonanceDuration = resonanceEffect.enabled ? (resonanceEffect.revealDurationSeconds ?? 0) + (resonanceEffect.fadeDurationSeconds ?? resonanceEffect.durationSeconds) : 0;
            const broadShadowDuration = impactEffects.broadShadow.enabled === false ? 0 : impactEffects.broadShadow.compressionDurationSeconds + impactEffects.broadShadow.recoveryDurationSeconds;
            return Math.max(
              motionDuration,
              targetDuration,
              contactShadowDuration,
              dustDuration,
              resonanceDuration,
              broadShadowDuration
            ) * durationMultiplier * 1e3 + 48;
          };
          const getLiftDurationMs = () => {
            const { motion } = deviceProfile;
            return (motion.liftDurationSeconds ?? motion.liftMaxDurationSeconds) * durationMultiplier * 1e3 + 48;
          };
          const isComponentVisible = () => {
            const rect = component.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top < viewportHeight && rect.bottom > 0;
          };
          const canReplayMobileEntry = (allowWaiting = false) => {
            if (mobileViewport.replayMode === "manual") {
              return false;
            }
            if (mobileState.status === "waiting") {
              return allowWaiting;
            }
            if (mobileState.status === "playing" || mobileState.status === "returning") {
              return false;
            }
            const elapsed = window.performance.now() - mobileState.lastPlayTimestamp;
            const cooldownElapsed = elapsed >= mobileViewport.minimumReplayIntervalSeconds * 1e3;
            if (!cooldownElapsed && mobileState.lastPlayTimestamp > 0) {
              return false;
            }
            if (mobileViewport.replayMode === "once") {
              return !mobileState.hasPlayed;
            }
            return !mobileState.hasPlayed || mobileState.status === "outside";
          };
          const startReturnToRest = () => {
            if (mobileState.isDestroyed) {
              return;
            }
            clearTimer("returnTimer");
            setMobileStatus("returning");
            controller.moveToRest();
            mobileState.returnTimer = window.setTimeout(() => {
              mobileState.returnTimer = null;
              if (mobileState.isDestroyed) {
                return;
              }
              setMobileStatus(mobileState.isInside ? "completed" : "outside");
            }, getLiftDurationMs());
          };
          const completeMobileImpact = () => {
            if (mobileState.isDestroyed) {
              return;
            }
            if (!mobileState.isInside && !mobileViewport.finishCurrentAnimationOnLeave) {
              setMobileStatus("outside");
              return;
            }
            setMobileStatus("holding");
            if (mobileViewport.finalState !== "auto-return") {
              return;
            }
            clearTimer("returnTimer");
            mobileState.returnTimer = window.setTimeout(
              () => {
                mobileState.returnTimer = null;
                startReturnToRest();
              },
              (mobileViewport.holdAtImpactSeconds + mobileViewport.autoReturnDelaySeconds) * 1e3
            );
          };
          const scheduleMobileEntry = (direction, isInitialLoad = false) => {
            mobileState.isInside = true;
            mobileState.enteredFrom = direction;
            if (!mobileViewport.enabled || mobileState.isDestroyed) {
              return;
            }
            if (mobileState.isRefreshing && mobileViewport.preventRefreshPlayback) {
              return;
            }
            if (!isInitialLoad) {
              if (direction === "below" && !mobileViewport.playOnEnter) {
                return;
              }
              if (direction === "above" && !mobileViewport.playOnEnterBack) {
                return;
              }
            }
            if (!canReplayMobileEntry()) {
              return;
            }
            cancelMobileTimers();
            setMobileStatus("waiting");
            mobileState.entryDelayTimer = window.setTimeout(() => {
              mobileState.entryDelayTimer = null;
              if (mobileState.isDestroyed || mobileState.isRefreshing && mobileViewport.preventRefreshPlayback) {
                return;
              }
              if (!mobileState.isInside && !mobileViewport.finishCurrentAnimationOnLeave) {
                setMobileStatus("outside");
                return;
              }
              if (!canReplayMobileEntry(true)) {
                return;
              }
              setMobileStatus("playing");
              mobileState.hasPlayed = true;
              mobileState.lastPlayTimestamp = window.performance.now();
              controller.playImpactSequence({ force: true });
              mobileState.returnTimer = window.setTimeout(() => {
                mobileState.returnTimer = null;
                completeMobileImpact();
              }, getImpactSequenceDurationMs());
            }, mobileViewport.entryDelaySeconds * 1e3);
          };
          const shouldResetForLeave = (position) => {
            return mobileViewport.resetWhenFullyOutside && (mobileViewport.resetPosition === "either" || mobileViewport.resetPosition === position);
          };
          const rearmReplayIfAllowed = () => {
            if (mobileViewport.replayMode === "once-per-entry" || mobileViewport.replayMode === "on-enter-and-enter-back") {
              mobileState.hasPlayed = false;
            }
          };
          const handleMobileLeave = (position) => {
            mobileState.isInside = false;
            if (mobileState.status === "waiting" && !mobileViewport.finishCurrentAnimationOnLeave) {
              clearTimer("entryDelayTimer");
              setMobileStatus("outside");
            }
            if (mobileViewport.finalState === "return-on-leave") {
              if (mobileState.status === "playing" && mobileViewport.reverseOnLeave) {
                cancelMobileTimers();
                startReturnToRest();
              } else if (mobileState.status === "playing" && mobileViewport.finishCurrentAnimationOnLeave) {
                clearTimer("returnTimer");
                mobileState.returnTimer = window.setTimeout(() => {
                  mobileState.returnTimer = null;
                  startReturnToRest();
                }, getImpactSequenceDurationMs());
              } else if (mobileState.status === "holding" || mobileState.status === "completed") {
                startReturnToRest();
              }
            }
            if (shouldResetForLeave(position)) {
              clearTimer("resetTimer");
              mobileState.resetTimer = window.setTimeout(() => {
                mobileState.resetTimer = null;
                if (mobileState.isDestroyed || mobileState.isInside) {
                  return;
                }
                controller.reset({
                  initialState: mobileViewport.initialState,
                  resetMobileReplay: true
                });
                rearmReplayIfAllowed();
                setMobileStatus("outside");
              }, mobileViewport.resetDelaySeconds * 1e3);
            } else {
              rearmReplayIfAllowed();
              setMobileStatus("outside");
            }
          };
          const beginSilentRefresh = () => {
            mobileState.isRefreshing = true;
            if (mobileViewport.refreshSilently) {
              controller.refreshNow();
            }
          };
          const finishSilentRefresh = (isActive) => {
            mobileState.isRefreshing = false;
            mobileState.isInside = Boolean(isActive);
            if (mobileState.status === "uninitialized") {
              setMobileStatus("ready");
              return;
            }
            if (!mobileState.isInside && mobileState.status !== "returning") {
              setMobileStatus("outside");
            }
          };
          controller.reset({
            initialState: mobileViewport.initialState,
            resetMobileReplay: false
          });
          setMobileStatus("ready");
          const baseReset = controller.reset;
          controller.reset = (options = {}) => {
            baseReset(options);
            if (options.resetMobileReplay !== false) {
              mobileState.hasPlayed = false;
              mobileState.lastPlayTimestamp = 0;
            }
          };
          if (mobileViewport.playback === "scrub") {
            let scrubImpactPlayed = false;
            const canPlayScrubImpact = () => {
              if (mobileViewport.replayMode === "manual") {
                return false;
              }
              if (mobileViewport.replayMode === "once" && mobileState.hasPlayed) {
                return false;
              }
              const elapsed = window.performance.now() - mobileState.lastPlayTimestamp;
              return mobileState.lastPlayTimestamp === 0 || elapsed >= mobileViewport.minimumReplayIntervalSeconds * 1e3;
            };
            const resetScrubImpact = () => {
              if (!scrubImpactPlayed) {
                return;
              }
              scrubImpactPlayed = false;
              if (mobileViewport.replayMode !== "once") {
                mobileState.hasPlayed = false;
              }
              controller.resetImpactReaction();
            };
            const handleScrubUpdate = (self2) => {
              if (!mobileViewport.enabled || mobileState.isDestroyed) {
                return;
              }
              const progress = clamp4(self2.progress ?? 0, 0, 1);
              const isInside = Boolean(self2.isActive) || progress > 0 && progress < 1;
              mobileState.isInside = isInside;
              if (mobileState.isRefreshing && mobileViewport.preventRefreshPlayback) {
                controller.scrubToProgress(progress);
                return;
              }
              controller.scrubToProgress(progress);
              if (progress < mobileViewport.scrubResetThreshold) {
                resetScrubImpact();
                if (isInside) {
                  setMobileStatus("scrubbing");
                }
              }
              if (progress >= mobileViewport.scrubImpactThreshold && !scrubImpactPlayed && canPlayScrubImpact()) {
                scrubImpactPlayed = true;
                mobileState.hasPlayed = true;
                mobileState.lastPlayTimestamp = window.performance.now();
                setMobileStatus("holding");
                controller.playImpactReaction();
                return;
              }
              if (isInside && mobileState.status !== "holding") {
                setMobileStatus("scrubbing");
              } else if (!isInside && mobileState.status !== "holding") {
                setMobileStatus("outside");
              }
            };
            const scrollTrigger2 = ScrollTrigger.create({
              trigger: component,
              start: mobileViewport.start,
              end: mobileViewport.end,
              scrub: mobileViewport.scrubSmoothingSeconds > 0 ? mobileViewport.scrubSmoothingSeconds : true,
              markers: mobileViewport.markers || QUICK_TUNING.debug.markers,
              invalidateOnRefresh: true,
              onUpdate: handleScrubUpdate,
              onEnter: () => {
                mobileState.isInside = true;
                setMobileStatus("scrubbing");
              },
              onEnterBack: () => {
                mobileState.isInside = true;
                setMobileStatus("scrubbing");
              },
              onLeave: () => {
                mobileState.isInside = false;
                setMobileStatus("outside");
              },
              onLeaveBack: () => {
                mobileState.isInside = false;
                resetScrubImpact();
                setMobileStatus("outside");
              },
              onRefreshInit: () => {
                beginSilentRefresh();
              },
              onRefresh: (self2) => {
                finishSilentRefresh(self2.isActive);
                handleScrubUpdate(self2);
              }
            });
            const resizeObserver2 = QUICK_TUNING.performance.useResizeObserver && typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
              controller.scheduleRefresh();
              scheduleScrollTriggerRefresh();
            }) : null;
            resizeObserver2?.observe(component);
            scheduleScrollTriggerRefresh();
            return () => {
              cancelAnimationFrame(scrollRefreshFrame);
              cancelAnimationFrame(initialVisibilityFrame);
              mobileState.isDestroyed = true;
              setMobileStatus("destroyed");
              cancelMobileTimers();
              scrollTrigger2.kill();
              resizeObserver2?.disconnect();
              controller.setMobileStateReader(null);
              controller.kill();
              removeInstance(instance);
            };
          }
          const scrollTrigger = ScrollTrigger.create({
            trigger: component,
            start: mobileViewport.start,
            end: mobileViewport.end,
            markers: mobileViewport.markers || QUICK_TUNING.debug.markers,
            invalidateOnRefresh: true,
            onEnter: () => {
              scheduleMobileEntry("below");
            },
            onEnterBack: () => {
              scheduleMobileEntry("above");
            },
            onLeave: () => {
              handleMobileLeave("above");
            },
            onLeaveBack: () => {
              handleMobileLeave("below");
            },
            onRefreshInit: () => {
              beginSilentRefresh();
            },
            onRefresh: (self2) => {
              finishSilentRefresh(self2.isActive);
            }
          });
          const resizeObserver = QUICK_TUNING.performance.useResizeObserver && typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
            controller.scheduleRefresh();
            scheduleScrollTriggerRefresh();
          }) : null;
          resizeObserver?.observe(component);
          scheduleScrollTriggerRefresh();
          if (mobileViewport.playOnInitialLoadIfVisible && mobileViewport.replayMode !== "manual") {
            initialVisibilityFrame = requestAnimationFrame(() => {
              initialVisibilityFrame = requestAnimationFrame(() => {
                initialVisibilityFrame = 0;
                if (mobileState.isDestroyed || mobileState.isRefreshing || !isComponentVisible()) {
                  return;
                }
                scheduleMobileEntry("below", true);
              });
            });
          }
          return () => {
            cancelAnimationFrame(scrollRefreshFrame);
            cancelAnimationFrame(initialVisibilityFrame);
            mobileState.isDestroyed = true;
            setMobileStatus("destroyed");
            cancelMobileTimers();
            scrollTrigger.kill();
            resizeObserver?.disconnect();
            controller.setMobileStateReader(null);
            controller.kill();
            removeInstance(instance);
          };
        });
        media.add(REDUCED_MOTION_QUERY3, () => {
          removeDebug(component, gavel, target);
          gsap.set(
            [
              gavel,
              castShadow,
              dust,
              contactShadowLayer.element,
              resonanceLayer.element,
              target,
              shadow
            ].filter(Boolean),
            {
              clearProps: "transform,transformOrigin,willChange,opacity"
            }
          );
          gsap.set([dust, contactShadowLayer.element, resonanceLayer.element].filter(Boolean), {
            opacity: 0,
            visibility: "hidden"
          });
        });
        [gavel, castShadow, dust, target, shadow].filter((element) => Boolean(element)).forEach((element) => {
          if (!(element instanceof HTMLImageElement)) {
            return;
          }
          if (element.complete && element.naturalWidth > 0) {
            return;
          }
          const refresh = () => {
            instances.filter((instance) => instance.scope === scope).forEach((instance) => {
              instance.controller.scheduleRefresh();
            });
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });
          };
          element.addEventListener("load", refresh, { once: true });
          element.addEventListener("error", refresh, { once: true });
          localCleanup.push(() => {
            element.removeEventListener("load", refresh);
            element.removeEventListener("error", refresh);
          });
        });
        scope.dataset.gavelReady = `${QUICK_TUNING.version}:${activePresetName}`;
        const cleanup = () => {
          media.revert();
          localCleanup.forEach((callback) => {
            callback();
          });
          delete scope.dataset.gavelReady;
          delete scope.__tsaGavelCleanup;
        };
        scope.__tsaGavelCleanup = cleanup;
        globalCleanup.push(cleanup);
      };
      const destroyAll = () => {
        globalCleanup.splice(0).forEach((cleanup) => {
          cleanup();
        });
        instances.splice(0).forEach((instance) => {
          instance.controller.kill();
        });
      };
      const initializeAll = () => {
        document.querySelectorAll(SELECTORS3.scope).forEach(initializeScope);
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      };
      runtimeWindow.TSAGavel?.destroyAll?.();
      runtimeWindow.TSAGavel = {
        play: (index = 0) => {
          instances[index]?.controller.playImpactSequence({ manual: true });
        },
        lift: (index = 0) => {
          instances[index]?.controller.moveToRest();
        },
        rest: (index = 0) => {
          instances[index]?.controller.setRest();
        },
        impact: (index = 0) => {
          instances[index]?.controller.setImpact();
        },
        replay: (index = 0) => {
          instances[index]?.controller.replay({ manual: true, force: true });
        },
        reset: (index = 0) => {
          instances[index]?.controller.reset({ resetMobileReplay: true });
        },
        refresh: (index = 0) => {
          instances[index]?.controller.refresh();
        },
        refreshAll: () => {
          instances.forEach((instance) => {
            instance.controller.scheduleRefresh();
          });
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
        geometry: (index = 0) => {
          const geometry = instances[index]?.controller.geometry() || null;
          console.log(`[TSA Gavel] Geometry, preset ${activePresetName}`, geometry);
          return geometry;
        },
        progress: (index = 0) => {
          return instances[index]?.controller.progress() || 0;
        },
        desiredState: (index = 0) => {
          return instances[index]?.controller.desiredState() || null;
        },
        state: (index = 0) => {
          return instances[index]?.controller.state() || null;
        },
        usePreset: (presetName) => {
          if (!Object.prototype.hasOwnProperty.call(presetDefinitions, presetName)) {
            console.warn("[TSA Gavel] Preset invalid.", presetName);
            console.info("[TSA Gavel] Preseturi disponibile:", Object.keys(presetDefinitions));
            return false;
          }
          if (activePresetName === presetName) {
            console.info(`[TSA Gavel] Presetul ${presetName} este deja activ.`);
            return true;
          }
          destroyAll();
          activePresetName = presetName;
          initializeAll();
          console.info(
            `[TSA Gavel] Preset activ: ${presetName}, ` + presetDefinitions[presetName].label
          );
          return true;
        },
        previewPreset: (presetName, index = 0) => {
          if (!runtimeWindow.TSAGavel?.usePreset(presetName)) {
            return false;
          }
          const instance = instances[index];
          if (!instance) {
            return false;
          }
          instance.controller.reset({ initialState: "rest", resetMobileReplay: true });
          requestAnimationFrame(() => {
            instance.controller.playImpactSequence({ manual: true, force: true });
          });
          return true;
        },
        currentPreset: () => {
          console.info(`[TSA Gavel] Preset activ: ${activePresetName}, ` + getActivePreset().label);
          return activePresetName;
        },
        listPresets: () => {
          const names = Object.keys(presetDefinitions);
          console.table(
            names.map((name) => ({
              preset: name,
              label: presetDefinitions[name].label,
              description: presetDefinitions[name].description ?? resolvePreset(name).description
            }))
          );
          return names;
        },
        describePreset: (presetName) => {
          if (!Object.prototype.hasOwnProperty.call(presetDefinitions, presetName)) {
            console.warn("[TSA Gavel] Preset invalid.", presetName);
            return null;
          }
          const definition = presetDefinitions[presetName];
          return {
            label: definition.label,
            description: definition.description ?? resolvePreset(presetName).description,
            overrides: {
              desktop: definition.desktop,
              mobile: definition.mobile,
              mobileViewport: definition.mobileViewport,
              impactEffects: definition.impactEffects
            }
          };
        },
        config: () => QUICK_TUNING,
        destroyAll
      };
      initializeAll();
    });
  }

  // src/components/animations/overlay/index.ts
  init_live_reload();
  var STATUE_SHINE_VERSION = "3.0.0";
  var STATUE_SHINE_SELECTORS = {
    component: '[data-tsa-statue-shine="component"]',
    trigger: '[data-tsa-statue-shine="trigger"]',
    overlay: '[data-tsa-statue-shine="overlay"]'
  };
  var OVERLAY_ACTIVE_OPACITY_PROPERTY2 = "--tsa-overlay-active-opacity";
  var STATUE_SHINE_CONFIG = {
    /*
      Final opacity of the overlay inside the masked area.
    */
    activeOpacity: 1,
    /*
      Opacity transition speeds.
    */
    enterDuration: 0.26,
    exitDuration: 0.3,
    /*
        Higher values follow the cursor more tightly.
    
        14 = soft and cinematic
        18 = balanced
        22 = responsive but still smooth
        30 = almost directly attached to the pointer
      */
    followSpeed: 14,
    /*
        Optional percentage offset from the real pointer position.
    
        Keep both at 0 for exact cursor alignment.
      */
    cursorOffsetXPercent: 0,
    cursorOffsetYPercent: 0,
    /*
      Adds a small amount of extra hit area around the statue.
      Keep at 0 for the exact rendered image rectangle.
    */
    hitAreaPaddingPx: 0
  };
  function getRuntimeGsap2() {
    return window.gsap ?? null;
  }
  function clamp2(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }
  function getOverlayActiveOpacity2(element) {
    const rawOpacity = window.getComputedStyle(element).getPropertyValue(OVERLAY_ACTIVE_OPACITY_PROPERTY2).trim();
    if (!rawOpacity) {
      return STATUE_SHINE_CONFIG.activeOpacity;
    }
    const activeOpacity = Number(rawOpacity);
    if (!Number.isFinite(activeOpacity)) {
      return STATUE_SHINE_CONFIG.activeOpacity;
    }
    return clamp2(activeOpacity, 0, 1);
  }
  function addMediaQueryChangeListener2(query, listener) {
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", listener);
      return;
    }
    query.addListener?.(listener);
  }
  function removeMediaQueryChangeListener2(query, listener) {
    if (typeof query.removeEventListener === "function") {
      query.removeEventListener("change", listener);
      return;
    }
    query.removeListener?.(listener);
  }
  function moveOverlayAboveTrigger(trigger, overlay) {
    if (trigger.parentElement && trigger.parentElement === overlay.parentElement && trigger.nextElementSibling !== overlay) {
      trigger.insertAdjacentElement("afterend", overlay);
    }
  }
  function killCurrentAnimation(controller) {
    controller.timeline?.kill();
    controller.timeline = null;
    controller.gsap.killTweensOf(controller.overlay);
  }
  function updateMaskPosition2(controller) {
    controller.overlay.style.setProperty(
      "--tsa-statue-shine-x",
      `${controller.currentXPercent.toFixed(3)}%`
    );
    controller.overlay.style.setProperty(
      "--tsa-statue-shine-y",
      `${controller.currentYPercent.toFixed(3)}%`
    );
  }
  function stopPositionAnimation2(controller) {
    if (controller.animationFrame === 0) {
      return;
    }
    window.cancelAnimationFrame(controller.animationFrame);
    controller.animationFrame = 0;
    controller.previousFrameTime = 0;
  }
  function renderSmoothPosition(controller, currentTime) {
    controller.animationFrame = 0;
    if (controller.reducedMotionQuery.matches) {
      controller.currentXPercent = controller.targetXPercent;
      controller.currentYPercent = controller.targetYPercent;
      updateMaskPosition2(controller);
      controller.previousFrameTime = currentTime;
      return;
    }
    const previousTime = controller.previousFrameTime || currentTime;
    const deltaSeconds = Math.min(Math.max((currentTime - previousTime) / 1e3, 0), 0.05);
    controller.previousFrameTime = currentTime;
    const interpolation = 1 - Math.exp(-STATUE_SHINE_CONFIG.followSpeed * deltaSeconds);
    controller.currentXPercent += (controller.targetXPercent - controller.currentXPercent) * interpolation;
    controller.currentYPercent += (controller.targetYPercent - controller.currentYPercent) * interpolation;
    updateMaskPosition2(controller);
    const xDistance = Math.abs(controller.targetXPercent - controller.currentXPercent);
    const yDistance = Math.abs(controller.targetYPercent - controller.currentYPercent);
    const stillMoving = xDistance > 0.015 || yDistance > 0.015;
    if (stillMoving) {
      controller.animationFrame = window.requestAnimationFrame((time) => {
        renderSmoothPosition(controller, time);
      });
    } else {
      controller.currentXPercent = controller.targetXPercent;
      controller.currentYPercent = controller.targetYPercent;
      updateMaskPosition2(controller);
    }
  }
  function schedulePositionAnimation2(controller) {
    if (controller.animationFrame !== 0) {
      return;
    }
    controller.animationFrame = window.requestAnimationFrame((time) => {
      renderSmoothPosition(controller, time);
    });
  }
  function setInitialPosition2(controller, xPercent, yPercent) {
    stopPositionAnimation2(controller);
    controller.currentXPercent = xPercent;
    controller.currentYPercent = yPercent;
    controller.targetXPercent = xPercent;
    controller.targetYPercent = yPercent;
    updateMaskPosition2(controller);
  }
  function showStatueShine(controller) {
    killCurrentAnimation(controller);
    const activeOpacity = getOverlayActiveOpacity2(controller.overlay);
    controller.gsap.set(controller.overlay, {
      visibility: "visible"
    });
    if (controller.reducedMotionQuery.matches) {
      controller.gsap.set(controller.overlay, {
        opacity: activeOpacity
      });
      return;
    }
    const timeline = controller.gsap.timeline({
      defaults: {
        overwrite: "auto"
      }
    });
    controller.timeline = timeline;
    timeline.to(
      controller.overlay,
      {
        opacity: activeOpacity,
        duration: STATUE_SHINE_CONFIG.enterDuration,
        ease: "power2.out"
      },
      0
    );
  }
  function hideStatueShine(controller) {
    killCurrentAnimation(controller);
    if (controller.reducedMotionQuery.matches) {
      controller.gsap.set(controller.overlay, {
        opacity: 0,
        visibility: "hidden"
      });
      return;
    }
    const timeline = controller.gsap.timeline({
      defaults: {
        overwrite: "auto"
      }
    });
    controller.timeline = timeline;
    timeline.to(
      controller.overlay,
      {
        opacity: 0,
        duration: STATUE_SHINE_CONFIG.exitDuration,
        ease: "power2.out",
        onComplete: () => {
          if (controller.isActive) {
            return;
          }
          controller.gsap.set(controller.overlay, {
            opacity: 0,
            visibility: "hidden"
          });
        }
      },
      0
    );
  }
  function setActiveState(controller, active) {
    if (active === controller.isActive) {
      return;
    }
    controller.isActive = active;
    if (active) {
      showStatueShine(controller);
    } else {
      hideStatueShine(controller);
    }
  }
  function calculatePointerPosition(controller) {
    const { pointerX, pointerY, trigger } = controller;
    if (pointerX === null || pointerY === null) {
      return {
        inside: false,
        xPercent: controller.targetXPercent,
        yPercent: controller.targetYPercent
      };
    }
    const rect = trigger.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1) {
      return {
        inside: false,
        xPercent: controller.targetXPercent,
        yPercent: controller.targetYPercent
      };
    }
    const padding = STATUE_SHINE_CONFIG.hitAreaPaddingPx;
    const inside = pointerX >= rect.left - padding && pointerX <= rect.right + padding && pointerY >= rect.top - padding && pointerY <= rect.bottom + padding;
    const rawXPercent = (pointerX - rect.left) / rect.width * 100;
    const rawYPercent = (pointerY - rect.top) / rect.height * 100;
    const xPercent = clamp2(rawXPercent + STATUE_SHINE_CONFIG.cursorOffsetXPercent, 0, 100);
    const yPercent = clamp2(rawYPercent + STATUE_SHINE_CONFIG.cursorOffsetYPercent, 0, 100);
    return {
      inside,
      xPercent,
      yPercent
    };
  }
  function processPointerPosition(controller) {
    const position = calculatePointerPosition(controller);
    if (!position.inside) {
      setActiveState(controller, false);
      return;
    }
    controller.targetXPercent = position.xPercent;
    controller.targetYPercent = position.yPercent;
    if (!controller.isActive) {
      setInitialPosition2(controller, position.xPercent, position.yPercent);
      setActiveState(controller, true);
      return;
    }
    schedulePositionAnimation2(controller);
  }
  function initializeStatueShineComponent(component, gsap) {
    if (component.dataset.tsaStatueShineReady === STATUE_SHINE_VERSION) {
      return;
    }
    component.__tsaStatueShineCleanup?.();
    const trigger = component.querySelector(STATUE_SHINE_SELECTORS.trigger);
    const overlay = component.querySelector(STATUE_SHINE_SELECTORS.overlay);
    if (!trigger || !overlay) {
      console.warn("[TSA Statue Shine] Required elements are missing.", {
        component,
        trigger,
        overlay
      });
      return;
    }
    moveOverlayAboveTrigger(trigger, overlay);
    overlay.setAttribute("aria-hidden", "true");
    if (overlay instanceof HTMLImageElement) {
      overlay.alt = "";
      overlay.draggable = false;
    }
    const controller = {
      component,
      trigger,
      overlay,
      gsap,
      timeline: null,
      reducedMotionQuery: window.matchMedia("(prefers-reduced-motion: reduce)"),
      pointerX: null,
      pointerY: null,
      currentXPercent: 50,
      currentYPercent: 50,
      targetXPercent: 50,
      targetYPercent: 50,
      animationFrame: 0,
      previousFrameTime: 0,
      isActive: false
    };
    gsap.set(overlay, {
      opacity: 0,
      visibility: "hidden"
    });
    updateMaskPosition2(controller);
    const handlePointerMove = (event) => {
      if (event.pointerType === "touch") {
        controller.pointerX = null;
        controller.pointerY = null;
        setActiveState(controller, false);
        return;
      }
      controller.pointerX = event.clientX;
      controller.pointerY = event.clientY;
      processPointerPosition(controller);
    };
    const handlePointerExit = () => {
      controller.pointerX = null;
      controller.pointerY = null;
      setActiveState(controller, false);
    };
    const handleViewportChange = () => {
      processPointerPosition(controller);
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePointerExit();
      }
    };
    const handleReducedMotionChange = () => {
      if (controller.isActive) {
        controller.currentXPercent = controller.targetXPercent;
        controller.currentYPercent = controller.targetYPercent;
        updateMaskPosition2(controller);
        showStatueShine(controller);
      } else {
        gsap.set(controller.overlay, {
          opacity: 0,
          visibility: "hidden"
        });
      }
    };
    document.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });
    document.addEventListener("mouseleave", handlePointerExit);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handlePointerExit);
    window.addEventListener("scroll", handleViewportChange, {
      passive: true
    });
    window.addEventListener("resize", handleViewportChange, {
      passive: true
    });
    addMediaQueryChangeListener2(controller.reducedMotionQuery, handleReducedMotionChange);
    component.dataset.tsaStatueShineReady = STATUE_SHINE_VERSION;
    const cleanup = () => {
      stopPositionAnimation2(controller);
      killCurrentAnimation(controller);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerExit);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handlePointerExit);
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      removeMediaQueryChangeListener2(controller.reducedMotionQuery, handleReducedMotionChange);
      delete component.dataset.tsaStatueShineReady;
      delete component.__tsaStatueShineCleanup;
    };
    component.__tsaStatueShineCleanup = cleanup;
  }
  function initTsaStatueShine() {
    const gsap = getRuntimeGsap2();
    if (!gsap) {
      console.error("[TSA Statue Shine] GSAP is missing. Enable the Webflow GSAP integration first.");
      return;
    }
    document.querySelectorAll(STATUE_SHINE_SELECTORS.component).forEach((component) => {
      initializeStatueShineComponent(component, gsap);
    });
  }

  // src/components/animations/overlay-filters/index.ts
  init_live_reload();
  var OVERLAY_FILTER_ATTRIBUTE = "data-tsa-overlay-filter";
  var OVERLAY_FILTER_ASSIGNMENTS = [
    {
      selector: '[data-tsa-statue-shine="overlay"]',
      preset: "base-neon"
    },
    {
      selector: '[data-tsa-benefit-shine="overlay"]',
      preset: "strong-neon"
    },
    {
      selector: '[data-tsa-benefit-shine-id="definitive-logo"]',
      preset: "strong-neon"
    },
    {
      selector: '[data-tsa-benefit-shine-id="definitive-bg"]',
      preset: "strong-neon"
    },
    {
      selector: '[data-tsa-benefit-shine-id="definitive-text"]',
      preset: "strong-neon"
    },
    {
      selector: '[data-tsa-benefit-shine-id="definitive-accent"]',
      preset: "strong-neon"
    },
    {
      selector: '[data-tsa-benefit-shine-id="stamp-overlay"]',
      preset: "soft-neon"
    },
    {
      selector: '[data-tsa-benefit-shine="footer-logo"]',
      preset: "strong-neon"
    },
    {
      selector: '[data-tsa-footer-logo="overlay"]',
      preset: "solid-glow"
    }
  ];
  function initOverlayFilterPresets() {
    OVERLAY_FILTER_ASSIGNMENTS.forEach(({ selector, preset }) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.setAttribute(OVERLAY_FILTER_ATTRIBUTE, preset);
      });
    });
  }

  // src/components/animations/stamp/index.ts
  init_live_reload();
  var PLAN_STAMP_PRESETS = {
    classicImpact: {
      approach: {
        x: 6,
        y: -14,
        scale: 1.07,
        rotation: 1.8,
        opacity: 0.32,
        start: 0,
        duration: 0.08,
        ease: "power1.out"
      },
      impact: {
        x: 0,
        y: 1,
        scale: 0.975,
        rotation: -0.45,
        opacity: 1,
        start: 0,
        duration: 0.24,
        ease: "power2.in"
      },
      ink: {
        opacity: 1,
        start: 0.1,
        duration: 0.14,
        ease: "power1.out"
      },
      settle: {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        start: 0.24,
        duration: 0.36,
        ease: "power2.out"
      },
      restore: {
        duration: 0.16,
        ease: "power1.out"
      },
      exit: {
        x: 0,
        y: -3,
        scale: 1.01,
        rotation: 0.25,
        opacity: 0,
        start: 0,
        duration: 0.14,
        ease: "power1.out"
      }
    },
    precisionSeal: {
      approach: {
        x: 9,
        y: -10,
        scale: 1.035,
        rotation: 2.4,
        opacity: 0.2,
        start: 0,
        duration: 0.1,
        ease: "power1.out"
      },
      impact: {
        x: 0,
        y: 0.75,
        scale: 0.985,
        rotation: -0.15,
        opacity: 1,
        start: 0,
        duration: 0.28,
        ease: "power3.in"
      },
      ink: {
        opacity: 1,
        start: 0.15,
        duration: 0.13,
        ease: "power1.out"
      },
      settle: {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        start: 0.28,
        duration: 0.32,
        ease: "power3.out"
      },
      restore: {
        duration: 0.14,
        ease: "power1.out"
      },
      exit: {
        x: 1,
        y: -2,
        scale: 1.005,
        rotation: 0.15,
        opacity: 0,
        start: 0,
        duration: 0.12,
        ease: "power1.out"
      }
    },
    archivalImprint: {
      approach: {
        x: 2,
        y: -6,
        scale: 1.018,
        rotation: 0.65,
        opacity: 0.12,
        start: 0,
        duration: 0.14,
        ease: "sine.out"
      },
      impact: {
        x: 0,
        y: 0.5,
        scale: 0.982,
        rotation: -0.1,
        opacity: 0.7,
        start: 0,
        duration: 0.34,
        ease: "power2.inOut"
      },
      ink: {
        opacity: 1,
        start: 0.16,
        duration: 0.24,
        ease: "sine.inOut"
      },
      settle: {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        start: 0.34,
        duration: 0.44,
        ease: "sine.out"
      },
      restore: {
        duration: 0.2,
        ease: "sine.out"
      },
      exit: {
        x: 0,
        y: -1,
        scale: 1.005,
        rotation: 0,
        opacity: 0,
        start: 0,
        duration: 0.18,
        ease: "sine.out"
      }
    },
    verdictStrike: {
      approach: {
        x: 7,
        y: -19,
        scale: 1.065,
        rotation: 2.1,
        opacity: 0.24,
        start: 0,
        duration: 0.08,
        ease: "power1.out"
      },
      impact: {
        x: 0,
        y: 2,
        scale: 0.965,
        rotation: -0.65,
        opacity: 1,
        start: 0,
        duration: 0.3,
        ease: "power4.in"
      },
      ink: {
        opacity: 1,
        start: 0.17,
        duration: 0.13,
        ease: "power1.out"
      },
      settle: {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        start: 0.3,
        duration: 0.4,
        ease: "expo.out"
      },
      restore: {
        duration: 0.14,
        ease: "power1.out"
      },
      exit: {
        x: 0,
        y: -3,
        scale: 1.012,
        rotation: 0.3,
        opacity: 0,
        start: 0,
        duration: 0.13,
        ease: "power1.out"
      }
    }
  };
  var ACTIVE_PLAN_STAMP_PRESET = "precisionSeal";
  var PLAN_STAMP_SETTINGS = {
    breakpoint: 768,
    trigger: {
      /*
       * APPEARANCE
       *
       * Higher percentage = appears earlier.
       * Lower percentage = appears later.
       */
      desktop: {
        itemAnchor: "center",
        viewportPercent: 60
      },
      mobile: {
        itemAnchor: "center",
        viewportPercent: 100
      },
      /*
       * DISAPPEARANCE WHEN SCROLLING BACK UP
       *
       * Lower percentage = disappears earlier.
       *
       * Desktop examples:
       * 70 = slightly earlier
       * 65 = recommended
       * 55 = much earlier
       *
       * Mobile examples:
       * 95 = slightly earlier
       * 88 = recommended
       * 80 = noticeably earlier
       */
      exitViewportPercent: {
        desktop: 60,
        mobile: 80
      },
      end: "bottom top"
    },
    /*
     * Set to true temporarily to see the trigger lines.
     */
    debugMarkers: false,
    transformOrigin: "50% 50%"
  };
  var LIST_SELECTOR = '[data-plan-stamp-list="true"]';
  var ITEM_SELECTOR = '[data-plan-stamp-item="true"]';
  var MARK_SELECTOR = '[data-plan-stamp-mark="true"]';
  var ACTIVE_PRESET = PLAN_STAMP_PRESETS[ACTIVE_PLAN_STAMP_PRESET];
  var PLAN_STAMP_MEDIA_QUERIES = {
    desktop: `(min-width: ${PLAN_STAMP_SETTINGS.breakpoint}px)`,
    mobile: `(max-width: ${PLAN_STAMP_SETTINGS.breakpoint - 1}px)`,
    reduceMotion: "(prefers-reduced-motion: reduce)"
  };
  function getPlanStampTriggerStart(mode) {
    const trigger = PLAN_STAMP_SETTINGS.trigger[mode];
    return `${trigger.itemAnchor} ${trigger.viewportPercent}%`;
  }
  function getPlanStampExitStart(mode) {
    const viewportPercent = PLAN_STAMP_SETTINGS.trigger.exitViewportPercent[mode];
    return `center ${viewportPercent}%`;
  }
  function initPlanStamp() {
    const runtimeWindow = window;
    runtimeWindow.Webflow ||= [];
    runtimeWindow.Webflow.push(() => {
      const { gsap } = runtimeWindow;
      const { ScrollTrigger } = runtimeWindow;
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);
      runtimeWindow.__tsaPlanStampAnimation?.revert();
      const media = gsap.matchMedia();
      runtimeWindow.__tsaPlanStampAnimation = media;
      media.add(PLAN_STAMP_MEDIA_QUERIES, (context) => {
        const { desktop = false, mobile = false, reduceMotion = false } = context.conditions ?? {};
        if (!desktop && !mobile) return;
        const mode = mobile ? "mobile" : "desktop";
        const appearanceTriggerStart = getPlanStampTriggerStart(mode);
        const exitTriggerStart = getPlanStampExitStart(mode);
        const cleanupFunctions = [];
        const lists = Array.from(document.querySelectorAll(LIST_SELECTOR));
        lists.forEach((list) => {
          const items = Array.from(list.querySelectorAll(ITEM_SELECTOR));
          items.forEach((item) => {
            const stamp = item.querySelector(MARK_SELECTOR);
            if (!stamp) return;
            let activeAnimation = null;
            let isStamped = false;
            const killActiveAnimation = () => {
              if (!activeAnimation) return;
              activeAnimation.kill();
              activeAnimation = null;
            };
            const setHiddenState = () => {
              gsap.set(stamp, {
                autoAlpha: 0,
                x: ACTIVE_PRESET.approach.x,
                y: ACTIVE_PRESET.approach.y,
                scale: ACTIVE_PRESET.approach.scale,
                rotation: ACTIVE_PRESET.approach.rotation,
                transformOrigin: PLAN_STAMP_SETTINGS.transformOrigin,
                force3D: true,
                clearProps: "willChange"
              });
            };
            const setCompletedState = () => {
              gsap.set(stamp, {
                autoAlpha: ACTIVE_PRESET.settle.opacity,
                x: ACTIVE_PRESET.settle.x,
                y: ACTIVE_PRESET.settle.y,
                scale: ACTIVE_PRESET.settle.scale,
                rotation: ACTIVE_PRESET.settle.rotation,
                transformOrigin: PLAN_STAMP_SETTINGS.transformOrigin,
                force3D: true,
                clearProps: "willChange"
              });
            };
            if (reduceMotion) {
              setCompletedState();
              cleanupFunctions.push(() => {
                killActiveAnimation();
                gsap.set(stamp, {
                  clearProps: "opacity,visibility,transform,transformOrigin,willChange"
                });
              });
              return;
            }
            const playStrike = () => {
              if (isStamped) return;
              isStamped = true;
              killActiveAnimation();
              setHiddenState();
              gsap.set(stamp, {
                willChange: "transform,opacity"
              });
              activeAnimation = gsap.timeline({
                defaults: {
                  overwrite: "auto"
                },
                onComplete: () => {
                  setCompletedState();
                  activeAnimation = null;
                }
              });
              activeAnimation.to(
                stamp,
                {
                  autoAlpha: ACTIVE_PRESET.approach.opacity,
                  duration: ACTIVE_PRESET.approach.duration,
                  ease: ACTIVE_PRESET.approach.ease
                },
                ACTIVE_PRESET.approach.start
              );
              activeAnimation.to(
                stamp,
                {
                  x: ACTIVE_PRESET.impact.x,
                  y: ACTIVE_PRESET.impact.y,
                  scale: ACTIVE_PRESET.impact.scale,
                  rotation: ACTIVE_PRESET.impact.rotation,
                  duration: ACTIVE_PRESET.impact.duration,
                  ease: ACTIVE_PRESET.impact.ease
                },
                ACTIVE_PRESET.impact.start
              );
              activeAnimation.to(
                stamp,
                {
                  autoAlpha: ACTIVE_PRESET.ink.opacity,
                  duration: ACTIVE_PRESET.ink.duration,
                  ease: ACTIVE_PRESET.ink.ease
                },
                ACTIVE_PRESET.ink.start
              );
              activeAnimation.to(
                stamp,
                {
                  autoAlpha: ACTIVE_PRESET.settle.opacity,
                  x: ACTIVE_PRESET.settle.x,
                  y: ACTIVE_PRESET.settle.y,
                  scale: ACTIVE_PRESET.settle.scale,
                  rotation: ACTIVE_PRESET.settle.rotation,
                  duration: ACTIVE_PRESET.settle.duration,
                  ease: ACTIVE_PRESET.settle.ease
                },
                ACTIVE_PRESET.settle.start
              );
            };
            const restoreVisibleStamp = () => {
              isStamped = true;
              killActiveAnimation();
              const currentOpacity = Number(gsap.getProperty(stamp, "opacity"));
              if (currentOpacity >= 0.99) {
                setCompletedState();
                return;
              }
              gsap.set(stamp, {
                willChange: "transform,opacity"
              });
              activeAnimation = gsap.timeline({
                defaults: {
                  overwrite: "auto"
                },
                onComplete: () => {
                  setCompletedState();
                  activeAnimation = null;
                }
              });
              activeAnimation.to(stamp, {
                autoAlpha: ACTIVE_PRESET.settle.opacity,
                x: ACTIVE_PRESET.settle.x,
                y: ACTIVE_PRESET.settle.y,
                scale: ACTIVE_PRESET.settle.scale,
                rotation: ACTIVE_PRESET.settle.rotation,
                duration: ACTIVE_PRESET.restore.duration,
                ease: ACTIVE_PRESET.restore.ease
              });
            };
            const hideAndResetStamp = () => {
              if (!isStamped) {
                setHiddenState();
                return;
              }
              isStamped = false;
              killActiveAnimation();
              gsap.set(stamp, {
                willChange: "transform,opacity"
              });
              activeAnimation = gsap.timeline({
                defaults: {
                  overwrite: "auto"
                },
                onComplete: () => {
                  setHiddenState();
                  activeAnimation = null;
                }
              });
              activeAnimation.to(
                stamp,
                {
                  autoAlpha: ACTIVE_PRESET.exit.opacity,
                  x: ACTIVE_PRESET.exit.x,
                  y: ACTIVE_PRESET.exit.y,
                  scale: ACTIVE_PRESET.exit.scale,
                  rotation: ACTIVE_PRESET.exit.rotation,
                  duration: ACTIVE_PRESET.exit.duration,
                  ease: ACTIVE_PRESET.exit.ease
                },
                ACTIVE_PRESET.exit.start
              );
            };
            setHiddenState();
            const appearanceScrollTrigger = ScrollTrigger.create({
              trigger: item,
              start: appearanceTriggerStart,
              end: PLAN_STAMP_SETTINGS.trigger.end,
              markers: PLAN_STAMP_SETTINGS.debugMarkers,
              invalidateOnRefresh: true,
              onEnter: playStrike,
              onLeave: () => {
              },
              onEnterBack: restoreVisibleStamp,
              onLeaveBack: () => {
              },
              onRefresh: (self2) => {
                if (self2.progress >= 1) {
                  isStamped = true;
                  killActiveAnimation();
                  setCompletedState();
                  return;
                }
                if (self2.isActive && !isStamped) {
                  playStrike();
                  return;
                }
                if (self2.progress <= 0 && isStamped) {
                  isStamped = false;
                  killActiveAnimation();
                  setHiddenState();
                }
              }
            });
            const exitScrollTrigger = ScrollTrigger.create({
              trigger: item,
              start: exitTriggerStart,
              end: PLAN_STAMP_SETTINGS.trigger.end,
              markers: PLAN_STAMP_SETTINGS.debugMarkers,
              invalidateOnRefresh: true,
              onEnter: () => {
              },
              onLeave: () => {
              },
              onEnterBack: () => {
              },
              onLeaveBack: hideAndResetStamp
            });
            cleanupFunctions.push(() => {
              killActiveAnimation();
              appearanceScrollTrigger.kill();
              exitScrollTrigger.kill();
              gsap.set(stamp, {
                clearProps: "opacity,visibility,transform,transformOrigin,willChange"
              });
            });
          });
        });
        const refreshScrollTriggers = () => {
          ScrollTrigger.refresh();
        };
        if (document.readyState === "complete") {
          requestAnimationFrame(refreshScrollTriggers);
        } else {
          window.addEventListener("load", refreshScrollTriggers, {
            once: true
          });
        }
        return () => {
          window.removeEventListener("load", refreshScrollTriggers);
          cleanupFunctions.forEach((cleanup) => {
            cleanup();
          });
        };
      });
    });
  }

  // src/components/blog-toc/index.ts
  init_live_reload();
  var TOC_VIEWPORT_BOTTOM_GAP = 32;
  function initBlogToc() {
    document.addEventListener("DOMContentLoaded", () => {
      const wrappers = document.querySelectorAll(".cms-page_toc-list-wrapper");
      wrappers.forEach((wrapper) => {
        const list = wrapper.querySelector(".blog-post_toc-list");
        if (!list) return;
        const linkSelector = ".toc_h2, .toc_h3, .toc_h4, .toc_h5, .toc_h6";
        const activeSelectors = ["a.u-toc-current-link", "a.w--current", "a[aria-current='true']"];
        let frame = null;
        const updateTocAvailableHeight = () => {
          const listTop = list.getBoundingClientRect().top;
          const availableHeight = Math.max(0, window.innerHeight - listTop - TOC_VIEWPORT_BOTTOM_GAP);
          list.style.setProperty("--toc-available-height", `${availableHeight}px`);
        };
        const updateTocState = () => {
          if (frame) cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            updateTocAvailableHeight();
            const links = Array.from(wrapper.querySelectorAll(linkSelector));
            const activeLink = wrapper.querySelector(activeSelectors.join(", "));
            if (!activeLink) {
              wrapper.style.setProperty("--toc-current-opacity", "0");
              links.forEach((link) => {
                link.classList.remove("is-toc-active", "is-toc-muted");
              });
              return;
            }
            const wrapperRect = wrapper.getBoundingClientRect();
            const activeRect = activeLink.getBoundingClientRect();
            const y = activeRect.top - wrapperRect.top;
            const { height } = activeRect;
            wrapper.style.setProperty("--toc-current-y", `${y}px`);
            wrapper.style.setProperty("--toc-current-height", `${height}px`);
            wrapper.style.setProperty("--toc-current-opacity", "1");
            links.forEach((link) => {
              const isActive = link === activeLink;
              link.classList.toggle("is-toc-active", isActive);
              link.classList.toggle("is-toc-muted", !isActive);
            });
          });
        };
        updateTocState();
        const observer = new MutationObserver(updateTocState);
        observer.observe(list, {
          subtree: true,
          attributes: true,
          attributeFilter: ["class", "aria-current"]
        });
        window.addEventListener("resize", updateTocState);
        window.addEventListener("scroll", updateTocState, { passive: true });
        list.addEventListener("scroll", updateTocState, { passive: true });
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(updateTocState);
        }
        setTimeout(updateTocState, 300);
        setTimeout(updateTocState, 1e3);
      });
    });
  }

  // src/components/call-popover/index.ts
  init_live_reload();

  // src/utils/dom.ts
  init_live_reload();
  function onDomReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
      return;
    }
    callback();
  }

  // src/components/call-popover/index.ts
  var CALL_POPOVER_SETTINGS = {
    enabled: true,
    desktopMinWidth: 768,
    mobileMaxWidth: 767,
    viewportPadding: 16,
    triggerGap: 12,
    restoreDelay: 1800,
    readyClass: "is-call-popover-ready",
    initializedAttribute: "callPopoverReady",
    openClass: "is-open",
    placementTopClass: "is-placement-top",
    placementBottomClass: "is-placement-bottom",
    successClass: "is-copy-success",
    failureClass: "is-copy-failure",
    defaultTargetSelector: "#contact-call",
    helperDefaultText: "Apoi sun\u0103-ne de pe telefon.",
    helperSuccessText: "Num\u0103r copiat.",
    helperFailureText: "Nu s-a putut copia automat."
  };
  var SELECTORS = {
    trigger: "[data-call-trigger]",
    area: "[data-call-area]",
    popover: "[data-call-popover]",
    arrow: "[data-call-popover-arrow]",
    title: "[data-call-popover-title]",
    helper: "[data-call-helper]",
    copy: "[data-call-copy]",
    status: "[data-call-status]",
    close: "[data-call-popover-close]"
  };
  function initCallPopover() {
    onDomReady(() => {
      if (!CALL_POPOVER_SETTINGS.enabled) return;
      const root = document.documentElement;
      if (root.dataset[CALL_POPOVER_SETTINGS.initializedAttribute] === "true") return;
      const popoverElement = document.querySelector(SELECTORS.popover);
      if (!popoverElement) return;
      const popover = popoverElement;
      const pageTriggers = Array.from(document.querySelectorAll(SELECTORS.trigger));
      const knownTriggers = /* @__PURE__ */ new Set();
      const mobileQuery = window.matchMedia(`(max-width: ${CALL_POPOVER_SETTINGS.mobileMaxWidth}px)`);
      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const arrow = popover.querySelector(SELECTORS.arrow);
      const title = popover.querySelector(SELECTORS.title);
      const helper = popover.querySelector(SELECTORS.helper);
      const copyControl = popover.querySelector(SELECTORS.copy);
      const status = popover.querySelector(SELECTORS.status);
      let activeTrigger = null;
      let originTrigger = null;
      let restoreTimer;
      let openFrame;
      let lastKeyboardTrigger = null;
      if (!popover.id) {
        popover.id = "call-popover";
      }
      if (!title?.id && title) {
        title.id = "call-popover-title";
      }
      popover.setAttribute("role", "dialog");
      popover.setAttribute("tabindex", "-1");
      if (title) {
        popover.setAttribute("aria-labelledby", title.id);
      }
      if (status) {
        status.setAttribute("aria-live", "polite");
        status.setAttribute("aria-atomic", "true");
      }
      if (copyControl && !(copyControl instanceof HTMLButtonElement)) {
        copyControl.setAttribute("role", "button");
        if (!copyControl.hasAttribute("tabindex")) {
          copyControl.setAttribute("tabindex", "0");
        }
      }
      root.dataset[CALL_POPOVER_SETTINGS.initializedAttribute] = "true";
      root.classList.add(CALL_POPOVER_SETTINGS.readyClass);
      function getTargetSelector(trigger) {
        const explicitTarget = trigger.getAttribute("data-call-target")?.trim();
        if (explicitTarget) return explicitTarget;
        const href = trigger instanceof HTMLAnchorElement ? trigger.getAttribute("href") : null;
        if (!href) return CALL_POPOVER_SETTINGS.defaultTargetSelector;
        if (href.startsWith("#")) return href;
        try {
          const url = new URL(href, window.location.href);
          const isCurrentPage = url.origin === window.location.origin && url.pathname === window.location.pathname && url.search === window.location.search;
          if (isCurrentPage && url.hash) return url.hash;
        } catch {
          return CALL_POPOVER_SETTINGS.defaultTargetSelector;
        }
        return CALL_POPOVER_SETTINGS.defaultTargetSelector;
      }
      function getCallArea(trigger) {
        const selector = getTargetSelector(trigger);
        if (selector) {
          const selectedArea = document.querySelector(selector);
          if (selectedArea) return selectedArea;
        }
        return document.querySelector(SELECTORS.area);
      }
      function isNativePhoneTrigger(trigger) {
        return trigger instanceof HTMLAnchorElement && (trigger.getAttribute("href")?.trim().toLowerCase().startsWith("tel:") ?? false);
      }
      function isDesktopViewport() {
        return !mobileQuery.matches && window.innerWidth >= CALL_POPOVER_SETTINGS.desktopMinWidth;
      }
      function clearRestoreTimer() {
        if (restoreTimer === void 0) return;
        window.clearTimeout(restoreTimer);
        restoreTimer = void 0;
      }
      function restoreCopyMessage() {
        clearRestoreTimer();
        if (helper) {
          helper.textContent = CALL_POPOVER_SETTINGS.helperDefaultText;
        }
        if (status) {
          status.textContent = "";
        }
        popover.classList.remove(
          CALL_POPOVER_SETTINGS.successClass,
          CALL_POPOVER_SETTINGS.failureClass
        );
      }
      function syncHiddenState(hidden) {
        popover.setAttribute("aria-hidden", String(hidden));
        popover.toggleAttribute("inert", hidden);
        if (hidden) {
          restoreCopyMessage();
        }
      }
      function registerTrigger(trigger) {
        if (knownTriggers.has(trigger)) return;
        knownTriggers.add(trigger);
        trigger.setAttribute("aria-haspopup", "dialog");
        trigger.setAttribute("aria-expanded", "false");
        if (trigger.getRootNode() === document) {
          trigger.setAttribute("aria-controls", popover.id);
        }
      }
      function setExpanded(expandedTrigger) {
        knownTriggers.forEach((trigger) => {
          trigger.setAttribute("aria-expanded", String(trigger === expandedTrigger));
        });
      }
      function cancelOpenFrame() {
        if (openFrame === void 0) return;
        window.cancelAnimationFrame(openFrame);
        openFrame = void 0;
      }
      function closePopover(restoreFocus = false) {
        if (!activeTrigger) return;
        cancelOpenFrame();
        const triggerToRestore = originTrigger;
        activeTrigger = null;
        originTrigger = null;
        popover.classList.remove(CALL_POPOVER_SETTINGS.openClass);
        syncHiddenState(true);
        setExpanded(null);
        if (restoreFocus && triggerToRestore?.isConnected) {
          triggerToRestore.focus();
        }
      }
      function mountPopoverToBody() {
        if (popover.parentNode !== document.body) {
          document.body.appendChild(popover);
        }
      }
      function applyPlacement(trigger) {
        mountPopoverToBody();
        const triggerRect = trigger.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const { viewportPadding, triggerGap } = CALL_POPOVER_SETTINGS;
        const spaceBelow = viewportHeight - triggerRect.bottom - triggerGap - viewportPadding;
        const spaceAbove = triggerRect.top - triggerGap - viewportPadding;
        const placement = spaceBelow >= popoverRect.height || spaceBelow >= spaceAbove ? "bottom" : "top";
        const top = placement === "bottom" ? triggerRect.bottom + triggerGap : triggerRect.top - popoverRect.height - triggerGap;
        const unclampedLeft = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        const maxLeft = viewportWidth - popoverRect.width - viewportPadding;
        const left = Math.min(
          Math.max(unclampedLeft, viewportPadding),
          Math.max(maxLeft, viewportPadding)
        );
        const triggerCenterX = triggerRect.left + triggerRect.width / 2;
        const arrowX = Math.min(
          Math.max(triggerCenterX - left, 18),
          Math.max(popoverRect.width - 18, 18)
        );
        popover.style.left = `${left}px`;
        popover.style.top = `${Math.max(top, viewportPadding)}px`;
        popover.style.setProperty("--call-popover-arrow-x", `${arrowX}px`);
        popover.style.setProperty("--call-popover-origin-x", `${arrowX}px`);
        popover.style.setProperty("--call-popover-origin-y", placement === "bottom" ? "0%" : "100%");
        popover.classList.toggle(CALL_POPOVER_SETTINGS.placementBottomClass, placement === "bottom");
        popover.classList.toggle(CALL_POPOVER_SETTINGS.placementTopClass, placement === "top");
        arrow?.setAttribute("aria-hidden", "true");
      }
      function openPopover(trigger, source) {
        cancelOpenFrame();
        restoreCopyMessage();
        activeTrigger = trigger;
        originTrigger = trigger;
        mountPopoverToBody();
        syncHiddenState(false);
        setExpanded(trigger);
        applyPlacement(trigger);
        openFrame = window.requestAnimationFrame(() => {
          popover.classList.add(CALL_POPOVER_SETTINGS.openClass);
          openFrame = void 0;
        });
        if (source === "keyboard") {
          (copyControl ?? popover).focus();
        }
      }
      function scheduleMobileScroll(trigger, source) {
        const area = getCallArea(trigger);
        if (!area) return;
        const behavior = reducedMotionQuery.matches ? "auto" : "smooth";
        window.setTimeout(() => {
          area.scrollIntoView({ block: "start", behavior });
          if (source === "keyboard") {
            area.focus({ preventScroll: true });
          }
        }, 80);
      }
      function handlePageTriggerActivation(event, trigger, source) {
        if (!isDesktopViewport()) {
          closePopover(false);
          if (isNativePhoneTrigger(trigger)) return;
          if (!getCallArea(trigger)) return;
          event.preventDefault();
          scheduleMobileScroll(trigger, source);
          return;
        }
        event.preventDefault();
        if (activeTrigger === trigger) {
          closePopover(false);
          return;
        }
        registerTrigger(trigger);
        openPopover(trigger, source);
      }
      async function copyText(text) {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          return;
        }
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const didCopy = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!didCopy) {
          throw new Error("Clipboard fallback failed");
        }
      }
      async function copyNumberAndReport(text) {
        const normalizedText = text.trim();
        if (!normalizedText) return;
        try {
          await copyText(normalizedText);
          if (helper) {
            helper.textContent = CALL_POPOVER_SETTINGS.helperSuccessText;
          }
          if (status) {
            status.textContent = "Num\u0103rul de telefon a fost copiat.";
          }
          popover.classList.add(CALL_POPOVER_SETTINGS.successClass);
          popover.classList.remove(CALL_POPOVER_SETTINGS.failureClass);
        } catch {
          if (helper) {
            helper.textContent = CALL_POPOVER_SETTINGS.helperFailureText;
          }
          if (status) {
            status.textContent = CALL_POPOVER_SETTINGS.helperFailureText;
          }
          popover.classList.add(CALL_POPOVER_SETTINGS.failureClass);
          popover.classList.remove(CALL_POPOVER_SETTINGS.successClass);
        }
        clearRestoreTimer();
        restoreTimer = window.setTimeout(restoreCopyMessage, CALL_POPOVER_SETTINGS.restoreDelay);
      }
      async function handleCopy(event) {
        if (!copyControl) return;
        event.preventDefault();
        event.stopPropagation();
        const text = copyControl.getAttribute("data-call-number")?.trim();
        if (!text) return;
        await copyNumberAndReport(text);
      }
      pageTriggers.forEach((trigger) => {
        registerTrigger(trigger);
        trigger.addEventListener("click", (event) => {
          const source = lastKeyboardTrigger === trigger || event.detail === 0 ? "keyboard" : "pointer";
          lastKeyboardTrigger = null;
          handlePageTriggerActivation(event, trigger, source);
        });
        trigger.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          lastKeyboardTrigger = trigger;
          if (event.key === " ") {
            event.preventDefault();
            handlePageTriggerActivation(event, trigger, "keyboard");
          }
        });
      });
      window.addEventListener("tsa:call-trigger", (event) => {
        const customEvent = event;
        const trigger = customEvent.detail?.trigger;
        if (!(trigger instanceof HTMLElement)) return;
        if (!trigger.matches(SELECTORS.trigger)) return;
        if (!isDesktopViewport()) return;
        registerTrigger(trigger);
        const source = customEvent.detail?.source === "keyboard" ? "keyboard" : "pointer";
        if (activeTrigger === trigger) {
          closePopover(false);
          return;
        }
        openPopover(trigger, source);
      });
      window.addEventListener("tsa:copy-number", (event) => {
        if (!isDesktopViewport()) return;
        const customEvent = event;
        const text = customEvent.detail?.text?.trim();
        if (!text) return;
        void copyNumberAndReport(text);
      });
      copyControl?.addEventListener("click", (event) => {
        void handleCopy(event);
      });
      copyControl?.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        void handleCopy(event);
      });
      popover.querySelector(SELECTORS.close)?.addEventListener("click", () => {
        closePopover(true);
      });
      document.addEventListener("pointerdown", (event) => {
        if (!activeTrigger) return;
        const { target } = event;
        if (!(target instanceof Node)) return;
        const eventPath = event.composedPath();
        if (popover.contains(target) || eventPath.includes(activeTrigger)) return;
        closePopover(false);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || !activeTrigger) return;
        event.preventDefault();
        closePopover(true);
      });
      window.addEventListener(
        "scroll",
        () => {
          closePopover(false);
        },
        { passive: true }
      );
      window.addEventListener("resize", () => {
        if (!activeTrigger) return;
        if (!isDesktopViewport()) {
          closePopover(false);
          return;
        }
        applyPlacement(activeTrigger);
      });
      mobileQuery.addEventListener("change", () => {
        if (mobileQuery.matches) {
          closePopover(false);
        }
      });
      syncHiddenState(true);
    });
  }

  // src/components/hero-avatars/index.ts
  init_live_reload();
  var HERO_AVATAR_SETTINGS = {
    listSelector: "[data-hero-avatars]",
    avatarSelector: "[data-hero-name]",
    tooltipSelector: "[data-hero-tooltip]",
    tooltipNameSelector: "[data-hero-tooltip-name]",
    activeClass: "is-active",
    visibleClass: "is-visible",
    positioningClass: "is-positioning",
    resizingClass: "is-resizing",
    clampedClass: "is-viewport-clamped",
    readyClass: "is-avatar-motion-ready",
    /*
      Spațiul minim dintre tooltip și marginile viewport-ului pe touch.
    */
    tooltipViewportPadding: 16,
    /*
      Trebuie să corespundă cu:
      --hero-tooltip-morph-duration: 260ms;
      din CSS.
    */
    tooltipMorphDuration: 260,
    /*
      Evită ca tooltip-ul să dispară în spațiul foarte mic
      dintre două avataruri atunci când miști cursorul rapid.
    */
    pointerLeaveDelay: 55
  };
  function initHeroAvatarHover() {
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lists = document.querySelectorAll(HERO_AVATAR_SETTINGS.listSelector);
    lists.forEach((list, listIndex) => {
      if (list.dataset.heroAvatarReady === "true") return;
      const avatars = Array.from(
        list.querySelectorAll(HERO_AVATAR_SETTINGS.avatarSelector)
      );
      const tooltip = list.querySelector(
        HERO_AVATAR_SETTINGS.tooltipSelector
      );
      const tooltipName = tooltip.querySelector(
        HERO_AVATAR_SETTINGS.tooltipNameSelector
      );
      if (!avatars.length || !tooltip || !tooltipName) {
        console.warn("Hero avatars: lipsesc data-hero-name sau tooltip-ul configurat.", list);
        return;
      }
      list.dataset.heroAvatarReady = "true";
      list.classList.add(HERO_AVATAR_SETTINGS.readyClass);
      const tooltipId = tooltip.id || `hero-avatar-tooltip-${listIndex + 1}`;
      tooltip.id = tooltipId;
      tooltip.setAttribute("role", "tooltip");
      tooltip.setAttribute("aria-hidden", "true");
      let hoveredAvatar = null;
      let focusedAvatar = null;
      let tappedAvatar = null;
      let currentAvatar = null;
      let pointerLeaveTimer;
      let resizeTimer;
      let showFrame;
      let morphFrame;
      let morphCleanupTimer;
      avatars.forEach((avatar) => {
        const name = avatar.dataset.heroName?.trim();
        if (!name) return;
        avatar.setAttribute("role", "button");
        avatar.setAttribute("tabindex", "0");
        avatar.setAttribute("aria-label", name);
        avatar.setAttribute("aria-expanded", "false");
        avatar.setAttribute("aria-controls", tooltipId);
      });
      function cancelFrame(frame) {
        if (frame !== void 0) {
          window.cancelAnimationFrame(frame);
        }
      }
      function cancelPendingMotion() {
        cancelFrame(showFrame);
        cancelFrame(morphFrame);
        showFrame = void 0;
        morphFrame = void 0;
        if (morphCleanupTimer !== void 0) {
          window.clearTimeout(morphCleanupTimer);
          morphCleanupTimer = void 0;
        }
      }
      function stopPointerLeaveTimer() {
        if (pointerLeaveTimer === void 0) return;
        window.clearTimeout(pointerLeaveTimer);
        pointerLeaveTimer = void 0;
      }
      function getActiveAvatar() {
        return focusedAvatar || hoveredAvatar || tappedAvatar;
      }
      function getAvatarName(avatar) {
        const name = avatar.dataset.heroName?.trim();
        return name || null;
      }
      function getNaturalTooltipWidth(name) {
        tooltipName.textContent = name;
        tooltip.style.width = "max-content";
        return tooltip.getBoundingClientRect().width;
      }
      function calculateTooltipPosition(avatar, tooltipWidth, constrainToViewport) {
        const listRect = list.getBoundingClientRect();
        const avatarRect = avatar.getBoundingClientRect();
        const avatarCenterViewportX = avatarRect.left + avatarRect.width / 2;
        let tooltipCenterViewportX = avatarCenterViewportX;
        if (constrainToViewport) {
          const halfTooltipWidth = tooltipWidth / 2;
          const minCenterX = HERO_AVATAR_SETTINGS.tooltipViewportPadding + halfTooltipWidth;
          const maxCenterX = window.innerWidth - HERO_AVATAR_SETTINGS.tooltipViewportPadding - halfTooltipWidth;
          tooltipCenterViewportX = minCenterX <= maxCenterX ? Math.min(Math.max(avatarCenterViewportX, minCenterX), maxCenterX) : window.innerWidth / 2;
        }
        const tooltipLeftViewportX = tooltipCenterViewportX - tooltipWidth / 2;
        const arrowX = avatarCenterViewportX - tooltipLeftViewportX;
        const isClamped = Math.abs(tooltipCenterViewportX - avatarCenterViewportX) > 0.5;
        return {
          centerWithinList: tooltipCenterViewportX - listRect.left,
          arrowX,
          isClamped
        };
      }
      function applyTooltipPosition(position) {
        tooltip.style.setProperty("--hero-tooltip-x", `${position.centerWithinList}px`);
        tooltip.classList.toggle(HERO_AVATAR_SETTINGS.clampedClass, position.isClamped);
        if (position.isClamped) {
          tooltip.style.setProperty("--hero-tooltip-arrow-x", `${position.arrowX}px`);
        } else {
          tooltip.style.removeProperty("--hero-tooltip-arrow-x");
        }
      }
      function clearMorphStyles() {
        tooltip.classList.remove(HERO_AVATAR_SETTINGS.resizingClass);
        tooltip.style.removeProperty("width");
      }
      function positionTooltipInstantly(avatar) {
        const name = getAvatarName(avatar);
        if (!name) return;
        cancelPendingMotion();
        clearMorphStyles();
        tooltip.classList.add(HERO_AVATAR_SETTINGS.positioningClass);
        const naturalWidth = getNaturalTooltipWidth(name);
        const position = calculateTooltipPosition(avatar, naturalWidth, !finePointerQuery.matches);
        applyTooltipPosition(position);
        tooltip.style.removeProperty("width");
        void tooltip.offsetWidth;
        tooltip.classList.remove(HERO_AVATAR_SETTINGS.positioningClass);
      }
      function animateVisibleTooltipTo(avatar) {
        const name = getAvatarName(avatar);
        if (!name) return;
        if (!finePointerQuery.matches || reducedMotionQuery.matches) {
          positionTooltipInstantly(avatar);
          return;
        }
        cancelPendingMotion();
        const listRect = list.getBoundingClientRect();
        const currentRect = tooltip.getBoundingClientRect();
        const currentWidth = currentRect.width;
        const currentCenterWithinList = currentRect.left + currentRect.width / 2 - listRect.left;
        tooltip.classList.add(
          HERO_AVATAR_SETTINGS.positioningClass,
          HERO_AVATAR_SETTINGS.resizingClass
        );
        tooltip.classList.remove(HERO_AVATAR_SETTINGS.clampedClass);
        tooltip.style.removeProperty("--hero-tooltip-arrow-x");
        tooltip.style.setProperty("--hero-tooltip-x", `${currentCenterWithinList}px`);
        tooltip.style.width = `${currentWidth}px`;
        const targetWidth = getNaturalTooltipWidth(name);
        const targetPosition = calculateTooltipPosition(avatar, targetWidth, false);
        tooltip.style.width = `${currentWidth}px`;
        void tooltip.offsetWidth;
        tooltip.classList.remove(HERO_AVATAR_SETTINGS.positioningClass);
        morphFrame = window.requestAnimationFrame(() => {
          tooltip.style.width = `${targetWidth}px`;
          applyTooltipPosition(targetPosition);
          morphFrame = void 0;
        });
        morphCleanupTimer = window.setTimeout(() => {
          clearMorphStyles();
          morphCleanupTimer = void 0;
        }, HERO_AVATAR_SETTINGS.tooltipMorphDuration + 40);
      }
      function showTooltip(avatar) {
        const isAlreadyVisible = tooltip.classList.contains(HERO_AVATAR_SETTINGS.visibleClass);
        if (isAlreadyVisible && currentAvatar === avatar) {
          return;
        }
        if (isAlreadyVisible && currentAvatar) {
          animateVisibleTooltipTo(avatar);
          currentAvatar = avatar;
          tooltip.setAttribute("aria-hidden", "false");
          return;
        }
        positionTooltipInstantly(avatar);
        currentAvatar = avatar;
        tooltip.setAttribute("aria-hidden", "false");
        showFrame = window.requestAnimationFrame(() => {
          tooltip.classList.add(HERO_AVATAR_SETTINGS.visibleClass);
          showFrame = void 0;
        });
      }
      function hideTooltip() {
        cancelPendingMotion();
        clearMorphStyles();
        currentAvatar = null;
        tooltip.classList.remove(
          HERO_AVATAR_SETTINGS.visibleClass,
          HERO_AVATAR_SETTINGS.positioningClass,
          HERO_AVATAR_SETTINGS.clampedClass
        );
        tooltip.style.removeProperty("--hero-tooltip-arrow-x");
        tooltip.setAttribute("aria-hidden", "true");
      }
      function render() {
        const nextAvatar = getActiveAvatar();
        avatars.forEach((avatar) => {
          const isActive = avatar === nextAvatar;
          avatar.classList.toggle(HERO_AVATAR_SETTINGS.activeClass, isActive);
          avatar.setAttribute("aria-expanded", String(isActive));
          if (isActive) {
            avatar.setAttribute("aria-describedby", tooltipId);
          } else {
            avatar.removeAttribute("aria-describedby");
          }
        });
        if (!nextAvatar) {
          hideTooltip();
          return;
        }
        showTooltip(nextAvatar);
      }
      avatars.forEach((avatar) => {
        avatar.addEventListener("pointerdown", (event) => {
          if (finePointerQuery.matches && event.pointerType === "mouse") {
            event.preventDefault();
          }
        });
        avatar.addEventListener("pointerenter", () => {
          if (!finePointerQuery.matches) return;
          stopPointerLeaveTimer();
          hoveredAvatar = avatar;
          render();
        });
        avatar.addEventListener("pointerleave", () => {
          if (!finePointerQuery.matches) return;
          stopPointerLeaveTimer();
          pointerLeaveTimer = window.setTimeout(() => {
            if (hoveredAvatar === avatar) {
              hoveredAvatar = null;
              render();
            }
          }, HERO_AVATAR_SETTINGS.pointerLeaveDelay);
        });
        avatar.addEventListener("focusin", () => {
          focusedAvatar = avatar;
          render();
        });
        avatar.addEventListener("focusout", () => {
          if (focusedAvatar === avatar) {
            focusedAvatar = null;
            render();
          }
        });
        avatar.addEventListener("click", () => {
          if (finePointerQuery.matches) return;
          focusedAvatar = null;
          avatar.blur();
          tappedAvatar = tappedAvatar === avatar ? null : avatar;
          render();
        });
        avatar.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            hoveredAvatar = null;
            focusedAvatar = null;
            tappedAvatar = null;
            avatar.blur();
            render();
            return;
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            focusedAvatar = avatar;
            render();
          }
        });
      });
      document.addEventListener("pointerdown", (event) => {
        if (finePointerQuery.matches || !tappedAvatar) {
          return;
        }
        const { target } = event;
        if (!(target instanceof Node)) return;
        if (!list.contains(target)) {
          tappedAvatar = null;
          render();
        }
      });
      window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          const activeAvatar = getActiveAvatar();
          if (activeAvatar) {
            positionTooltipInstantly(activeAvatar);
          }
        }, 100);
      });
      finePointerQuery.addEventListener("change", () => {
        stopPointerLeaveTimer();
        hoveredAvatar = null;
        tappedAvatar = null;
        render();
      });
    });
  }

  // src/components/navbar/index.ts
  init_live_reload();

  // src/components/navbar/mobile-menu.ts
  init_live_reload();
  var MOBILE_NAV_SETTINGS = {
    breakpoint: 767,
    readyClass: "is-mobile-nav-ready",
    openClass: "is-menu-open",
    overlayClass: "is-mobile-nav-overlay",
    overlayOpenClass: "is-open",
    scrollLockClass: "tsa-nav-is-locked",
    openLabel: "\xCEnchide meniul",
    closedLabel: "Deschide meniul"
  };
  function initMobileNavbarMenus() {
    const navbars = document.querySelectorAll(".navbar_component");
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_NAV_SETTINGS.breakpoint}px)`);
    navbars.forEach((navbar, navbarIndex) => {
      if (navbar.dataset.mobileNavReady === "true") return;
      const trigger = navbar.querySelector(".navbar_menu-icon");
      const panel = navbar.querySelector(".navbar_mobile-panel");
      if (!trigger || !panel) {
        console.warn("Mobile navbar: lipsesc .navbar_menu-icon sau .navbar_mobile-panel.", navbar);
        return;
      }
      navbar.dataset.mobileNavReady = "true";
      const originalPanelParent = panel.parentNode;
      const originalPanelNextSibling = panel.nextSibling;
      const isNativeButton = trigger instanceof HTMLButtonElement;
      let isOpen = false;
      let lockedScrollY = 0;
      let navHeightObserver = null;
      let bodyInlineStyles = null;
      if (!panel.id) {
        panel.id = `tsa-mobile-menu-${navbarIndex + 1}`;
      }
      if (!isNativeButton) {
        trigger.setAttribute("role", "button");
        trigger.setAttribute("tabindex", "0");
      }
      trigger.setAttribute("aria-controls", panel.id);
      trigger.setAttribute("aria-haspopup", "true");
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-label", MOBILE_NAV_SETTINGS.closedLabel);
      function isMobileViewport() {
        return mobileQuery.matches;
      }
      function syncNavbarHeightVariable() {
        const navbarHeight = Math.ceil(navbar.getBoundingClientRect().height);
        if (navbarHeight <= 0) return;
        panel.style.setProperty("--tsa-nav-real-header-height", `${navbarHeight}px`);
      }
      function startNavbarHeightObserver() {
        syncNavbarHeightVariable();
        if (!("ResizeObserver" in window) || navHeightObserver) return;
        navHeightObserver = new ResizeObserver(() => {
          syncNavbarHeightVariable();
        });
        navHeightObserver.observe(navbar);
      }
      function mountOverlayToBody() {
        if (panel.parentNode !== document.body) {
          document.body.appendChild(panel);
        }
        panel.classList.add(MOBILE_NAV_SETTINGS.overlayClass);
      }
      function restorePanelToNavbar() {
        panel.classList.remove(
          MOBILE_NAV_SETTINGS.overlayClass,
          MOBILE_NAV_SETTINGS.overlayOpenClass
        );
        if (!originalPanelParent) return;
        if (originalPanelNextSibling && originalPanelNextSibling.parentNode === originalPanelParent) {
          originalPanelParent.insertBefore(panel, originalPanelNextSibling);
        } else {
          originalPanelParent.appendChild(panel);
        }
      }
      function lockPageScroll() {
        if (bodyInlineStyles) return;
        lockedScrollY = window.scrollY;
        bodyInlineStyles = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          right: document.body.style.right,
          width: document.body.style.width,
          overflow: document.body.style.overflow
        };
        document.documentElement.classList.add(MOBILE_NAV_SETTINGS.scrollLockClass);
        document.body.classList.add(MOBILE_NAV_SETTINGS.scrollLockClass);
        document.body.style.position = "fixed";
        document.body.style.top = `-${lockedScrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
      }
      function unlockPageScroll() {
        if (!bodyInlineStyles) return;
        const savedStyles = bodyInlineStyles;
        bodyInlineStyles = null;
        document.documentElement.classList.remove(MOBILE_NAV_SETTINGS.scrollLockClass);
        document.body.classList.remove(MOBILE_NAV_SETTINGS.scrollLockClass);
        document.body.style.position = savedStyles.position;
        document.body.style.top = savedStyles.top;
        document.body.style.left = savedStyles.left;
        document.body.style.right = savedStyles.right;
        document.body.style.width = savedStyles.width;
        document.body.style.overflow = savedStyles.overflow;
        window.scrollTo(0, lockedScrollY);
      }
      function syncPanelAccessibility(open) {
        if (!isMobileViewport()) {
          panel.removeAttribute("aria-hidden");
          panel.removeAttribute("inert");
          return;
        }
        panel.setAttribute("aria-hidden", String(!open));
        panel.toggleAttribute("inert", !open);
      }
      function getFocusableElements() {
        const panelFocusables = Array.from(
          panel.querySelectorAll(
            [
              "a[href]",
              "button:not([disabled])",
              "input:not([disabled])",
              "select:not([disabled])",
              "textarea:not([disabled])",
              '[tabindex]:not([tabindex="-1"])'
            ].join(", ")
          )
        );
        return [trigger, ...panelFocusables];
      }
      function setMenuOpen(nextOpen, restoreFocus = false) {
        const open = isMobileViewport() && nextOpen;
        if (open) {
          mountOverlayToBody();
        }
        if (isMobileViewport()) {
          startNavbarHeightObserver();
          window.requestAnimationFrame(() => {
            syncNavbarHeightVariable();
          });
        }
        isOpen = open;
        navbar.classList.toggle(MOBILE_NAV_SETTINGS.openClass, open);
        panel.classList.toggle(MOBILE_NAV_SETTINGS.overlayOpenClass, open);
        trigger.setAttribute("aria-expanded", String(open));
        trigger.setAttribute(
          "aria-label",
          open ? MOBILE_NAV_SETTINGS.openLabel : MOBILE_NAV_SETTINGS.closedLabel
        );
        syncPanelAccessibility(open);
        if (open) {
          lockPageScroll();
        } else {
          unlockPageScroll();
        }
        if (restoreFocus && isMobileViewport()) {
          trigger.focus();
        }
      }
      function toggleMenu() {
        if (!isMobileViewport()) return;
        setMenuOpen(!isOpen);
      }
      function syncViewportMode() {
        setMenuOpen(false);
        if (isMobileViewport()) {
          mountOverlayToBody();
          startNavbarHeightObserver();
          syncPanelAccessibility(false);
        } else {
          restorePanelToNavbar();
          syncPanelAccessibility(false);
        }
      }
      trigger.addEventListener("click", (event) => {
        if (!isMobileViewport()) return;
        if (trigger instanceof HTMLAnchorElement) {
          event.preventDefault();
        }
        toggleMenu();
      });
      trigger.addEventListener("keydown", (event) => {
        if (!isMobileViewport() || isNativeButton) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleMenu();
        }
      });
      document.addEventListener("keydown", (event) => {
        if (!isOpen || !isMobileViewport()) return;
        if (event.key === "Escape") {
          event.preventDefault();
          setMenuOpen(false, true);
          return;
        }
        if (event.key !== "Tab") return;
        const focusables = getFocusableElements();
        if (!focusables.length) return;
        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];
        const { activeElement } = document;
        if (event.shiftKey && activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      });
      document.addEventListener("pointerdown", (event) => {
        if (!isOpen || !isMobileViewport()) return;
        const { target } = event;
        if (!(target instanceof Node)) return;
        if (!navbar.contains(target) && !panel.contains(target)) {
          setMenuOpen(false);
        }
      });
      panel.addEventListener("click", (event) => {
        if (!isOpen || !isMobileViewport()) return;
        const { target } = event;
        if (!(target instanceof Element)) return;
        const activatedItem = target.closest(
          ["a[href]", "button", '[role="link"]', ".navbar_link", ".navbar_button-wrapper"].join(", ")
        );
        if (activatedItem) {
          setMenuOpen(false);
        }
      });
      window.addEventListener(
        "resize",
        () => {
          if (!isMobileViewport()) return;
          syncNavbarHeightVariable();
        },
        { passive: true }
      );
      if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", syncViewportMode);
      } else {
        mobileQuery.addListener(syncViewportMode);
      }
      navbar.classList.add(MOBILE_NAV_SETTINGS.readyClass);
      syncViewportMode();
    });
  }

  // src/components/navbar/smart-navbar.ts
  init_live_reload();
  function initializeSmartNavbar() {
    const navbar = document.querySelector(".navbar_component");
    if (!navbar) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealDelta = 8;
    const hideAfterScroll = 80;
    const hiddenTransform = "translate3d(0, calc(-100% - 1rem), 0)";
    const visibleTransform = "translate3d(0, 0, 0)";
    let lastScrollY = window.scrollY;
    let isHidden = false;
    let ticking = false;
    const applyBaseStyles = () => {
      navbar.style.backfaceVisibility = "hidden";
      navbar.style.transform = visibleTransform;
      navbar.style.willChange = "transform, opacity";
      navbar.style.transition = reducedMotion.matches ? "none" : [
        "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        "opacity 420ms ease",
        "box-shadow 420ms ease"
      ].join(", ");
    };
    const isMenuOpen = () => {
      const menuButton = navbar.querySelector(".w-nav-button");
      const navMenu = navbar.querySelector(".w-nav-menu");
      return Boolean(menuButton?.classList.contains("w--open") || navMenu?.style.display === "block");
    };
    const showNavbar = () => {
      if (!isHidden) return;
      navbar.style.transform = visibleTransform;
      navbar.style.opacity = "1";
      navbar.style.pointerEvents = "auto";
      navbar.style.boxShadow = "";
      navbar.dataset.scrollState = "visible";
      isHidden = false;
    };
    const hideNavbar = () => {
      if (isHidden || isMenuOpen()) return;
      navbar.style.transform = hiddenTransform;
      navbar.style.opacity = "0";
      navbar.style.pointerEvents = "none";
      navbar.style.boxShadow = "none";
      navbar.dataset.scrollState = "hidden";
      isHidden = true;
    };
    const updateNavbar = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDelta = currentScrollY - lastScrollY;
      if (currentScrollY <= hideAfterScroll || scrollDelta < -revealDelta || isMenuOpen()) {
        showNavbar();
      } else if (scrollDelta > revealDelta) {
        hideNavbar();
      }
      lastScrollY = currentScrollY;
      ticking = false;
    };
    const requestNavbarUpdate = () => {
      if (ticking) return;
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    };
    applyBaseStyles();
    navbar.dataset.scrollState = "visible";
    window.addEventListener("scroll", requestNavbarUpdate, { passive: true });
    window.addEventListener("resize", showNavbar);
    navbar.addEventListener("focusin", showNavbar);
    navbar.querySelector(".w-nav-button")?.addEventListener("click", () => {
      window.setTimeout(showNavbar, 0);
    });
    reducedMotion.addEventListener("change", applyBaseStyles);
  }
  function initSmartNavbar() {
    window.Webflow ||= [];
    window.Webflow.push(() => {
      initializeSmartNavbar();
    });
  }

  // src/components/navbar/index.ts
  function initNavbar() {
    onDomReady(initMobileNavbarMenus);
    initSmartNavbar();
  }

  // src/components/practice-text-reel/index.ts
  init_live_reload();
  var PRACTICE_TEXT_REEL_SETTINGS = {
    /*
      Activează sau dezactivează animația automată.
      Dacă devine false, lista completă va fi afișată static.
    */
    runAnimation: true,
    /*
      Pe desktop, animația se oprește discret cât timp utilizatorul
      ține cursorul peste componentă pentru a citi.
      Pe dispozitive touch această regulă nu se aplică.
    */
    pauseOnHover: false,
    /*
      Webflow mobile landscape și mobile portrait.
    */
    mobileBreakpoint: 767,
    /*
      Item-ul afișat prima dată când animația pornește.
      0 = afaceri din sectorul energetic
      1 = profesioniști din medical
      2 = dezvoltatori imobiliari
      3 = organizații sportive
      4 = societăți din domeniul agricol
      5 = investitori și fondatori
    */
    initialActiveIndex: 0,
    /*
      Animația pornește doar după ce o parte relevantă
      a componentei a intrat în viewport.
    */
    visibilityThreshold: 0.01,
    /*
      Permite utilizatorului să tragă lista manual.
      Folosește Pointer Events, deci funcționează pe mouse, touch și stylus.
    */
    dragEnabled: true,
    /*
      Numărul minim de pixeli înainte ca pointer-ul să fie tratat ca drag.
      Previne pornirea accidentală a interacțiunii la un simplu tap/click.
    */
    dragMinDistance: 6,
    /*
      Cât de mult trebuie să tragă utilizatorul ca starea vizuală
      să treacă pe item-ul următor/anterior în timpul drag-ului.
    */
    dragStateChangeThreshold: 0.38,
    /*
      Cât de mult trebuie să tragă utilizatorul ca item-ul următor/anterior
      să fie selectat la release, dacă gestul nu are viteză mare.
    */
    dragReleaseThreshold: 0.34,
    /*
      Dacă utilizatorul eliberează cu o mișcare rapidă,
      reel-ul avansează încă un item în direcția gestului.
      Valoarea este în px/ms.
    */
    dragVelocityThreshold: 0.65,
    /*
      Limitează cât de departe poate fi tras track-ul peste un singur item.
      Asta păstrează senzația editorială și previne spațiile goale mari.
    */
    dragMaxPullRatio: 1.08,
    /*
      Câtă rezistență primește drag-ul după ce trece de zona naturală.
      Valori mici = mai controlat. Valori mari = mai elastic.
    */
    dragResistance: 0.16
  };
  var PRACTICE_TEXT_REEL_STATE_CLASSES = [
    "is-active",
    "is-prev",
    "is-next",
    "is-prev-two",
    "is-next-two"
  ];
  function initPracticeTextReels() {
    const components = document.querySelectorAll(
      "[data-practice-text-reel], .practice-text-reel_component"
    );
    const mobileQuery = window.matchMedia(
      `(max-width: ${PRACTICE_TEXT_REEL_SETTINGS.mobileBreakpoint}px)`
    );
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    components.forEach((component) => {
      if (component.dataset.reelReady === "true") return;
      component.dataset.reelReady = "true";
      const prefix = component.querySelector(
        ".practice-text-reel_prefix"
      );
      const mask = component.querySelector(".practice-text-reel_mask");
      const track = component.querySelector(".practice-text-reel_track");
      if (!prefix || !mask || !track) return;
      let originalItemCount = 0;
      let currentTrackIndex = 0;
      let activeLogicalIndex = PRACTICE_TEXT_REEL_SETTINGS.initialActiveIndex;
      let isMobile = mobileQuery.matches;
      let shouldAnimate = false;
      let isInView = !("IntersectionObserver" in window);
      let isPausedByHover = false;
      let isLoopResetting = false;
      let holdTimer;
      let setupFrame;
      let resetFrame;
      let resizeTimer;
      let dragResumeTimer;
      let isDragging = false;
      let hasDragMoved = false;
      let dragPointerId;
      let dragStartClientY = 0;
      let dragStartTrackY = 0;
      let dragLastClientY = 0;
      let dragLastTime = 0;
      let dragVelocityY = 0;
      let dragBaseIndex = 0;
      let dragBaseY = 0;
      let dragCurrentDeltaY = 0;
      let dragVisualIndex = 0;
      let dragPendingTrackY = null;
      let dragFrame;
      let lastViewportWidth = window.innerWidth;
      function getOriginalItems() {
        return Array.from(
          track.querySelectorAll(".practice-text-reel_item:not([aria-hidden='true'])")
        );
      }
      function getAllItems() {
        return Array.from(track.querySelectorAll(".practice-text-reel_item"));
      }
      function normalizeIndex(value, itemCount) {
        if (!itemCount) return 0;
        return (value % itemCount + itemCount) % itemCount;
      }
      function clamp4(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }
      function getCssNumberVariable(name, fallback) {
        const value = Number.parseFloat(getComputedStyle(component).getPropertyValue(name).trim());
        return Number.isFinite(value) ? value : fallback;
      }
      function getDragResumeDelay() {
        return getCssNumberVariable("--reel-drag-resume-delay", 760);
      }
      function getHoldDuration() {
        const value = Number.parseFloat(
          getComputedStyle(component).getPropertyValue("--reel-hold-duration").trim()
        );
        return Number.isFinite(value) ? value : 2250;
      }
      function stopHoldTimer() {
        if (holdTimer === void 0) return;
        window.clearTimeout(holdTimer);
        holdTimer = void 0;
      }
      function clearDragResumeTimer() {
        if (dragResumeTimer === void 0) return;
        window.clearTimeout(dragResumeTimer);
        dragResumeTimer = void 0;
      }
      function cancelDragFrame() {
        if (dragFrame === void 0) return;
        window.cancelAnimationFrame(dragFrame);
        dragFrame = void 0;
      }
      function flushDragFrame() {
        if (dragPendingTrackY === null) return;
        cancelDragFrame();
        setTrackY(dragPendingTrackY, false);
        dragPendingTrackY = null;
      }
      function cancelScheduledFrames() {
        if (setupFrame !== void 0) {
          window.cancelAnimationFrame(setupFrame);
          setupFrame = void 0;
        }
        if (resetFrame !== void 0) {
          window.cancelAnimationFrame(resetFrame);
          resetFrame = void 0;
        }
        cancelDragFrame();
      }
      function syncMotionMode() {
        isMobile = mobileQuery.matches;
        const prefersReducedMotion = reducedMotionQuery.matches;
        shouldAnimate = PRACTICE_TEXT_REEL_SETTINGS.runAnimation && !prefersReducedMotion;
        component.classList.toggle("is-mobile-mode", isMobile);
        component.classList.toggle("is-reduced-motion", prefersReducedMotion);
        component.classList.toggle("is-static-list", !shouldAnimate);
      }
      function removeClones() {
        track.querySelectorAll(".practice-text-reel_item[aria-hidden='true']").forEach((item) => item.remove());
      }
      function createLoopClones(originalItems) {
        const prependedClones = originalItems.map((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          return clone;
        });
        const appendedClones = originalItems.map((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          return clone;
        });
        prependedClones.reverse().forEach((clone) => {
          track.insertBefore(clone, track.firstChild);
        });
        appendedClones.forEach((clone) => {
          track.appendChild(clone);
        });
      }
      function clearItemStates() {
        getAllItems().forEach((item) => {
          item.classList.remove(...PRACTICE_TEXT_REEL_STATE_CLASSES);
          item.style.removeProperty("opacity");
          item.style.removeProperty("transform");
        });
      }
      function setMobileMaskHeight(originalItems) {
        component.style.removeProperty("--reel-mobile-mask-height");
        if (!isMobile || !originalItems.length) return;
        const trackStyles = window.getComputedStyle(track);
        const gapValue = Number.parseFloat(trackStyles.rowGap) || Number.parseFloat(trackStyles.gap) || 0;
        const itemHeights = originalItems.map((item) => {
          return Math.ceil(item.getBoundingClientRect().height);
        });
        const visibleItemCount = Math.min(3, itemHeights.length);
        let largestVisibleGroupHeight = 0;
        for (let startIndex = 0; startIndex < itemHeights.length; startIndex += 1) {
          let currentGroupHeight = gapValue * Math.max(visibleItemCount - 1, 0);
          for (let offset = 0; offset < visibleItemCount; offset += 1) {
            const loopingIndex = (startIndex + offset) % itemHeights.length;
            currentGroupHeight += itemHeights[loopingIndex];
          }
          largestVisibleGroupHeight = Math.max(largestVisibleGroupHeight, currentGroupHeight);
        }
        component.style.setProperty(
          "--reel-mobile-mask-height",
          `${Math.ceil(largestVisibleGroupHeight + 2)}px`
        );
      }
      function getTargetY(targetIndex) {
        const targetItem = getAllItems()[targetIndex];
        if (!targetItem) return 0;
        if (isMobile) {
          return -targetItem.offsetTop;
        }
        const maskRect = mask.getBoundingClientRect();
        const prefixRect = prefix.getBoundingClientRect();
        const prefixCenterRelativeToMask = prefixRect.top + prefixRect.height / 2 - maskRect.top;
        const itemCenterInTrack = targetItem.offsetTop + targetItem.offsetHeight / 2;
        return prefixCenterRelativeToMask - itemCenterInTrack;
      }
      function getCurrentTrackY() {
        const { transform } = window.getComputedStyle(track);
        if (!transform || transform === "none") return 0;
        const matrixValues = transform.match(/matrix.*\((.+)\)/)?.[1];
        if (!matrixValues) return 0;
        const values = matrixValues.split(",").map((value) => Number.parseFloat(value.trim()));
        if (transform.startsWith("matrix3d")) {
          return Number.isFinite(values[13]) ? values[13] : 0;
        }
        return Number.isFinite(values[5]) ? values[5] : 0;
      }
      function setTrackY(value, animate) {
        if (animate) {
          track.style.removeProperty("transition-duration");
        } else {
          track.style.transitionDuration = "0ms";
        }
        track.style.transform = `translate3d(0, ${value}px, 0)`;
      }
      function scheduleDragTrackY(value) {
        dragPendingTrackY = value;
        if (dragFrame !== void 0) return;
        dragFrame = window.requestAnimationFrame(() => {
          dragFrame = void 0;
          if (dragPendingTrackY === null) return;
          setTrackY(dragPendingTrackY, false);
          dragPendingTrackY = null;
        });
      }
      function setTrackPosition(targetIndex, animate) {
        setTrackY(getTargetY(targetIndex), animate);
      }
      function getLoopResetIndex() {
        if (!originalItemCount) return null;
        if (currentTrackIndex < originalItemCount) {
          return currentTrackIndex + originalItemCount;
        }
        if (currentTrackIndex >= originalItemCount * 2) {
          return currentTrackIndex - originalItemCount;
        }
        return null;
      }
      function updateActiveLogicalIndexFromTrackIndex(trackIndex) {
        activeLogicalIndex = normalizeIndex(trackIndex - originalItemCount, originalItemCount);
      }
      function applyVisualState(targetIndex) {
        const items = getAllItems();
        items.forEach((item) => {
          item.classList.remove(...PRACTICE_TEXT_REEL_STATE_CLASSES);
        });
        items[targetIndex]?.classList.add("is-active");
        if (isMobile) {
          items[targetIndex + 1]?.classList.add("is-next");
          items[targetIndex + 2]?.classList.add("is-next-two");
          return;
        }
        items[targetIndex - 1]?.classList.add("is-prev");
        items[targetIndex + 1]?.classList.add("is-next");
        items[targetIndex - 2]?.classList.add("is-prev-two");
        items[targetIndex + 2]?.classList.add("is-next-two");
      }
      function queueNextMove() {
        stopHoldTimer();
        if (!shouldAnimate || !isInView || isPausedByHover || isLoopResetting || isDragging || document.hidden || component.classList.contains("is-setting-up") || component.classList.contains("is-drag-settling")) {
          return;
        }
        holdTimer = window.setTimeout(() => {
          holdTimer = void 0;
          currentTrackIndex += 1;
          activeLogicalIndex = normalizeIndex(activeLogicalIndex + 1, originalItemCount);
          applyVisualState(currentTrackIndex);
          setTrackPosition(currentTrackIndex, true);
        }, getHoldDuration());
      }
      function silentlyResetLoop() {
        if (!shouldAnimate) return false;
        const resetIndex = getLoopResetIndex();
        if (resetIndex === null) return false;
        isLoopResetting = true;
        component.classList.add("is-loop-resetting");
        currentTrackIndex = resetIndex;
        updateActiveLogicalIndexFromTrackIndex(currentTrackIndex);
        applyVisualState(currentTrackIndex);
        setTrackPosition(currentTrackIndex, false);
        void track.offsetHeight;
        resetFrame = window.requestAnimationFrame(() => {
          component.classList.remove("is-loop-resetting");
          track.style.removeProperty("transition-duration");
          isLoopResetting = false;
          resetFrame = void 0;
          queueNextMove();
        });
        return true;
      }
      function finishInstantSetup() {
        void track.offsetHeight;
        setupFrame = window.requestAnimationFrame(() => {
          component.classList.remove("is-setting-up");
          track.style.removeProperty("transition-duration");
          setupFrame = void 0;
          queueNextMove();
        });
      }
      function resetDragState() {
        isDragging = false;
        hasDragMoved = false;
        dragPointerId = void 0;
        dragVelocityY = 0;
        dragBaseIndex = currentTrackIndex;
        dragBaseY = getCurrentTrackY();
        dragCurrentDeltaY = 0;
        dragVisualIndex = currentTrackIndex;
        dragPendingTrackY = null;
        cancelDragFrame();
        clearDragResumeTimer();
        component.classList.remove("is-dragging", "is-drag-settling");
      }
      function setup() {
        stopHoldTimer();
        cancelScheduledFrames();
        resetDragState();
        component.classList.add("is-initialized", "is-setting-up");
        component.classList.remove("is-loop-resetting");
        isLoopResetting = false;
        syncMotionMode();
        removeClones();
        clearItemStates();
        const originalItems = getOriginalItems();
        originalItemCount = originalItems.length;
        if (!originalItemCount) {
          component.classList.remove("is-setting-up");
          return;
        }
        activeLogicalIndex = normalizeIndex(activeLogicalIndex, originalItemCount);
        if (!shouldAnimate) {
          component.style.removeProperty("--reel-mobile-mask-height");
          track.style.transitionDuration = "0ms";
          track.style.transform = "none";
          finishInstantSetup();
          return;
        }
        component.classList.remove("is-static-list");
        if (isMobile) {
          setMobileMaskHeight(originalItems);
        } else {
          component.style.removeProperty("--reel-mobile-mask-height");
        }
        createLoopClones(originalItems);
        currentTrackIndex = originalItemCount + activeLogicalIndex;
        applyVisualState(currentTrackIndex);
        setTrackPosition(currentTrackIndex, false);
        finishInstantSetup();
      }
      function canDrag() {
        return PRACTICE_TEXT_REEL_SETTINGS.dragEnabled && !isMobile && shouldAnimate && originalItemCount > 1 && !isLoopResetting && !component.classList.contains("is-setting-up") && !component.classList.contains("is-drag-settling");
      }
      function getDragDirection(deltaY) {
        if (Math.abs(deltaY) < PRACTICE_TEXT_REEL_SETTINGS.dragMinDistance) return 0;
        return deltaY < 0 ? 1 : -1;
      }
      function getVelocityDirection(velocityY) {
        if (Math.abs(velocityY) < PRACTICE_TEXT_REEL_SETTINGS.dragVelocityThreshold) return 0;
        return velocityY < 0 ? 1 : -1;
      }
      function getNeighborIndex(baseIndex, direction) {
        const items = getAllItems();
        if (!items.length || direction === 0) return baseIndex;
        return clamp4(baseIndex + direction, 0, items.length - 1);
      }
      function getDragStepDistance(baseIndex, direction) {
        const neighborIndex = getNeighborIndex(baseIndex, direction);
        if (neighborIndex === baseIndex) return 1;
        return Math.max(Math.abs(getTargetY(neighborIndex) - getTargetY(baseIndex)), 1);
      }
      function getResistedDelta(deltaY, stepDistance) {
        const sign = Math.sign(deltaY);
        const distance = Math.abs(deltaY);
        const maxNaturalDistance = stepDistance * PRACTICE_TEXT_REEL_SETTINGS.dragMaxPullRatio;
        if (distance <= maxNaturalDistance) return deltaY;
        const extraDistance = distance - maxNaturalDistance;
        return sign * (maxNaturalDistance + extraDistance * PRACTICE_TEXT_REEL_SETTINGS.dragResistance);
      }
      function getDragProgress(deltaY, stepDistance) {
        return clamp4(Math.abs(deltaY) / stepDistance, 0, 1);
      }
      function beginDrag(event) {
        if (!canDrag()) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;
        isDragging = true;
        hasDragMoved = false;
        dragPointerId = event.pointerId;
        dragStartClientY = event.clientY;
        dragStartTrackY = getCurrentTrackY();
        dragLastClientY = event.clientY;
        dragLastTime = performance.now();
        dragVelocityY = 0;
        dragBaseIndex = currentTrackIndex;
        dragBaseY = getTargetY(currentTrackIndex);
        dragCurrentDeltaY = 0;
        dragVisualIndex = currentTrackIndex;
        dragPendingTrackY = null;
        stopHoldTimer();
        clearDragResumeTimer();
        component.classList.add("is-dragging");
        component.classList.remove("is-drag-settling");
        track.style.transitionDuration = "0ms";
        try {
          mask.setPointerCapture(event.pointerId);
        } catch {
        }
      }
      function updateDrag(event) {
        if (!isDragging || event.pointerId !== dragPointerId) return;
        const currentTime = performance.now();
        const rawDeltaY = event.clientY - dragStartClientY;
        const direction = getDragDirection(rawDeltaY);
        if (!hasDragMoved && direction === 0) return;
        hasDragMoved = true;
        if (event.cancelable) {
          event.preventDefault();
        }
        const timeDelta = Math.max(currentTime - dragLastTime, 1);
        dragVelocityY = (event.clientY - dragLastClientY) / timeDelta;
        dragLastClientY = event.clientY;
        dragLastTime = currentTime;
        dragCurrentDeltaY = rawDeltaY;
        if (direction === 0) {
          scheduleDragTrackY(dragStartTrackY + rawDeltaY);
          if (dragVisualIndex !== dragBaseIndex) {
            dragVisualIndex = dragBaseIndex;
            applyVisualState(dragVisualIndex);
          }
          return;
        }
        const stepDistance = getDragStepDistance(dragBaseIndex, direction);
        const resistedDeltaY = getResistedDelta(rawDeltaY, stepDistance);
        const progress = getDragProgress(rawDeltaY, stepDistance);
        const candidateIndex = getNeighborIndex(dragBaseIndex, direction);
        scheduleDragTrackY(dragBaseY + resistedDeltaY);
        const nextVisualIndex = progress >= PRACTICE_TEXT_REEL_SETTINGS.dragStateChangeThreshold ? candidateIndex : dragBaseIndex;
        if (nextVisualIndex === dragVisualIndex) return;
        dragVisualIndex = nextVisualIndex;
        applyVisualState(dragVisualIndex);
      }
      function getReleaseIndex() {
        const velocityDirection = getVelocityDirection(dragVelocityY);
        const dragDirection = getDragDirection(dragCurrentDeltaY);
        const direction = velocityDirection || dragDirection;
        if (direction === 0) return dragBaseIndex;
        const stepDistance = getDragStepDistance(dragBaseIndex, direction);
        const progress = getDragProgress(dragCurrentDeltaY, stepDistance);
        const candidateIndex = getNeighborIndex(dragBaseIndex, direction);
        if (velocityDirection !== 0 || progress >= PRACTICE_TEXT_REEL_SETTINGS.dragReleaseThreshold) {
          return candidateIndex;
        }
        return dragBaseIndex;
      }
      function finishDrag(event) {
        if (!isDragging || event.pointerId !== dragPointerId) return;
        try {
          if (mask.hasPointerCapture(event.pointerId)) {
            mask.releasePointerCapture(event.pointerId);
          }
        } catch {
        }
        flushDragFrame();
        component.classList.remove("is-dragging");
        const shouldSnap = hasDragMoved;
        isDragging = false;
        hasDragMoved = false;
        dragPointerId = void 0;
        if (!shouldSnap) {
          track.style.removeProperty("transition-duration");
          queueNextMove();
          return;
        }
        currentTrackIndex = getReleaseIndex();
        updateActiveLogicalIndexFromTrackIndex(currentTrackIndex);
        component.classList.add("is-drag-settling");
        applyVisualState(currentTrackIndex);
        setTrackPosition(currentTrackIndex, true);
        clearDragResumeTimer();
        dragResumeTimer = window.setTimeout(() => {
          dragResumeTimer = void 0;
          component.classList.remove("is-drag-settling");
          if (silentlyResetLoop()) return;
          queueNextMove();
        }, getDragResumeDelay());
      }
      function cancelDrag(event) {
        if (!isDragging || event.pointerId !== dragPointerId) return;
        finishDrag(event);
      }
      track.addEventListener("transitionend", (event) => {
        if (event.target !== track || event.propertyName !== "transform") {
          return;
        }
        if (component.classList.contains("is-drag-settling")) {
          component.classList.remove("is-drag-settling");
          clearDragResumeTimer();
        }
        if (silentlyResetLoop()) return;
        queueNextMove();
      });
      mask.addEventListener("pointerdown", beginDrag);
      window.addEventListener("pointermove", updateDrag, { passive: false });
      window.addEventListener("pointerup", finishDrag);
      window.addEventListener("pointercancel", cancelDrag);
      component.addEventListener("pointerenter", () => {
        if (!PRACTICE_TEXT_REEL_SETTINGS.pauseOnHover || !finePointerQuery.matches || !shouldAnimate) {
          return;
        }
        isPausedByHover = true;
        stopHoldTimer();
      });
      component.addEventListener("pointerleave", () => {
        if (!PRACTICE_TEXT_REEL_SETTINGS.pauseOnHover || !finePointerQuery.matches || !shouldAnimate) {
          return;
        }
        isPausedByHover = false;
        queueNextMove();
      });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopHoldTimer();
          resetDragState();
          return;
        }
        queueNextMove();
      });
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (!entry) return;
            const nextInView = entry.isIntersecting && entry.intersectionRatio >= PRACTICE_TEXT_REEL_SETTINGS.visibilityThreshold;
            if (nextInView === isInView) return;
            isInView = nextInView;
            if (isInView) {
              queueNextMove();
            } else {
              stopHoldTimer();
            }
          },
          {
            threshold: [0, PRACTICE_TEXT_REEL_SETTINGS.visibilityThreshold]
          }
        );
        observer.observe(component);
      }
      reducedMotionQuery.addEventListener("change", setup);
      window.addEventListener("resize", () => {
        const nextViewportWidth = window.innerWidth;
        if (Math.abs(nextViewportWidth - lastViewportWidth) < 2) {
          return;
        }
        lastViewportWidth = nextViewportWidth;
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          setup();
        }, 150);
      });
      if (document.fonts) {
        document.fonts.ready.then(() => {
          setup();
        });
      }
      setup();
    });
  }

  // src/components/reading-time/index.ts
  init_live_reload();

  // src/components/reading-time/reading-time.ts
  init_live_reload();
  var SELECTORS2 = {
    pageSource: '[data-reading-time-source="page"]',
    pageTarget: '[data-reading-time-target="page"]',
    cardItem: '[data-reading-time-item="card"]',
    cardSource: '[data-reading-time-source="card"]',
    cardTarget: '[data-reading-time-target="card"]',
    ignoredContent: 'script, style, noscript, svg, img, iframe, video, audio, canvas, [aria-hidden="true"], [data-reading-time-ignore="true"]'
  };
  var DEFAULT_WORDS_PER_MINUTE = 200;
  var DEFAULT_MINIMUM_MINUTES = 1;
  var hasInitializedReadingTime = false;
  function getWordMatches(text) {
    const cleanText = text.trim();
    if (!cleanText) return [];
    try {
      return cleanText.match(/[\p{L}\p{N}]+(?:['\u2019][\p{L}\p{N}]+)*/gu) || [];
    } catch {
      return cleanText.match(/[A-Za-z\u00C0-\u017E0-9]+(?:['\u2019][A-Za-z\u00C0-\u017E0-9]+)*/g) || [];
    }
  }
  function getReadableText(element) {
    if (!element) return "";
    const clone = element.cloneNode(true);
    const ignoredElements = clone.querySelectorAll(SELECTORS2.ignoredContent);
    ignoredElements.forEach((ignoredElement) => {
      ignoredElement.remove();
    });
    return clone.textContent?.replace(/\s+/g, " ").trim() || "";
  }
  function getWordsPerMinute(element) {
    const customValue = element?.getAttribute("data-reading-time-wpm");
    const customWordsPerMinute = Number(customValue);
    if (Number.isFinite(customWordsPerMinute) && customWordsPerMinute > 0) {
      return customWordsPerMinute;
    }
    return DEFAULT_WORDS_PER_MINUTE;
  }
  function calculateReadingMinutes(source) {
    const text = getReadableText(source);
    const wordCount = getWordMatches(text).length;
    if (!wordCount) return null;
    const wordsPerMinute = getWordsPerMinute(source);
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(DEFAULT_MINIMUM_MINUTES, minutes);
  }
  function getLabelText(minutes) {
    return minutes === 1 ? "minut de lectur\u0103" : "minute de lectur\u0103";
  }
  function findComponent(target, type) {
    return target.closest(`[data-reading-time-component="${type}"]`) || target.closest("[data-reading-time-component]") || target.closest(".heading-cms_timer") || target.closest(".resources_timer");
  }
  function findLabel(target, type) {
    const component = findComponent(target, type);
    return component?.querySelector(`[data-reading-time-label="${type}"]`) || component?.querySelector("[data-reading-time-label]") || target.parentElement?.querySelector("[data-reading-time-label]") || null;
  }
  function showComponent(target, type) {
    const component = findComponent(target, type);
    if (!component) return;
    if (component.hidden) {
      component.hidden = false;
    }
    if (component.getAttribute("aria-hidden") === "true") {
      component.removeAttribute("aria-hidden");
    }
  }
  function hideComponent(target, type) {
    const component = findComponent(target, type);
    if (!component) return;
    if (!component.hidden) {
      component.hidden = true;
    }
    if (component.getAttribute("aria-hidden") !== "true") {
      component.setAttribute("aria-hidden", "true");
    }
  }
  function setReadingTime(target, minutes, type) {
    const numberText = String(minutes);
    const labelText = getLabelText(minutes);
    const label = findLabel(target, type);
    const ariaLabel = `${numberText} ${labelText}`;
    if (target.textContent?.trim() !== numberText) {
      target.textContent = numberText;
    }
    if (target.getAttribute("aria-label") !== ariaLabel) {
      target.setAttribute("aria-label", ariaLabel);
    }
    if (label && label.textContent?.trim() !== labelText) {
      label.textContent = labelText;
    }
    showComponent(target, type);
  }
  function updatePageReadingTime() {
    const source = document.querySelector(SELECTORS2.pageSource);
    const target = document.querySelector(SELECTORS2.pageTarget);
    if (!target) return;
    const minutes = calculateReadingMinutes(source);
    if (!minutes) {
      hideComponent(target, "page");
      return;
    }
    setReadingTime(target, minutes, "page");
  }
  function updateCardReadingTime(cardItem) {
    const source = cardItem.querySelector(SELECTORS2.cardSource);
    const target = cardItem.querySelector(SELECTORS2.cardTarget);
    if (!target) return;
    const minutes = calculateReadingMinutes(source);
    if (!minutes) {
      hideComponent(target, "card");
      return;
    }
    setReadingTime(target, minutes, "card");
  }
  function updateCardReadingTimes() {
    const cardItems = document.querySelectorAll(SELECTORS2.cardItem);
    cardItems.forEach((cardItem) => {
      updateCardReadingTime(cardItem);
    });
  }
  function initReadingTime() {
    if (hasInitializedReadingTime) return;
    hasInitializedReadingTime = true;
    updatePageReadingTime();
    updateCardReadingTimes();
  }

  // src/components/related-articles/index.ts
  init_live_reload();
  var RELATED_ARTICLES_SECTION_SELECTOR = '[data-related-articles-section="true"]';
  var RELATED_ARTICLES_EMPTY_SELECTOR = '[data-related-articles-empty="true"]';
  function initRelatedArticlesEmptyState() {
    const sections = document.querySelectorAll(RELATED_ARTICLES_SECTION_SELECTOR);
    sections.forEach((section) => {
      const emptyState = section.querySelector(RELATED_ARTICLES_EMPTY_SELECTOR);
      if (!emptyState) return;
      const styles = window.getComputedStyle(emptyState);
      const isEmptyStateVisible = !emptyState.hidden && styles.display !== "none" && styles.visibility !== "hidden";
      if (isEmptyStateVisible) {
        section.hidden = true;
        section.setAttribute("aria-hidden", "true");
        return;
      }
      section.hidden = false;
      section.removeAttribute("aria-hidden");
    });
  }

  // src/components/resources-filter/index.ts
  init_live_reload();
  var ROOT_SELECTOR = '[data-tsa-filter="resources"]';
  var TRIGGER_SELECTOR = '[data-tsa-filter-trigger="true"]';
  var ITEM_SELECTOR2 = '[data-tsa-filter-item="true"]';
  var FILTER_ALIASES = {
    toate: "all",
    "toate-articolele": "all",
    all: "all",
    civil: "drept-civil",
    "drept-civil": "drept-civil",
    penal: "drept-penal",
    "drept-penal": "drept-penal"
  };
  var ALLOWED_FILTERS = /* @__PURE__ */ new Set(["all", "drept-civil", "drept-penal"]);
  function slugify(value = "") {
    return (value ?? "").toString().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function normalizeFilter(value = "") {
    const slug = slugify(value);
    return FILTER_ALIASES[slug] || slug;
  }
  function isAllowedFilter(value) {
    return ALLOWED_FILTERS.has(value);
  }
  function getUrlFilter() {
    const params = new URLSearchParams(window.location.search);
    const urlValue = normalizeFilter(params.get("arie") || "all");
    return isAllowedFilter(urlValue) ? urlValue : "all";
  }
  function updateUrl(filter) {
    const url = new URL(window.location.href);
    if (filter === "all") {
      url.searchParams.delete("arie");
    } else {
      url.searchParams.set("arie", filter);
    }
    window.history.replaceState({ tsaFilter: filter }, "", url.toString());
  }
  function initFilterGroup(root) {
    if (root.dataset.tsaFilterReady === "true") return;
    const triggers = Array.from(root.querySelectorAll(TRIGGER_SELECTOR));
    const items = Array.from(root.querySelectorAll(ITEM_SELECTOR2));
    const tabsWrapper = root.querySelector('[data-tsa-filter-tabs="true"]');
    const emptyState = root.querySelector("[data-tsa-filter-empty]");
    if (!triggers.length || !items.length) return;
    root.dataset.tsaFilterReady = "true";
    if (tabsWrapper) {
      tabsWrapper.setAttribute("role", "tablist");
    }
    function getItemArea(item) {
      const attributeValue = item.getAttribute("data-tsa-filter-area");
      if (attributeValue) {
        return normalizeFilter(attributeValue);
      }
      const fallbackSource = item.querySelector("[data-tsa-filter-source]");
      return normalizeFilter(fallbackSource ? fallbackSource.textContent : "");
    }
    function setFilter(filter, shouldUpdateUrl = false) {
      const activeFilter = isAllowedFilter(filter) ? filter : "all";
      let visibleCount = 0;
      items.forEach((item) => {
        const itemArea = getItemArea(item);
        const shouldShow = activeFilter === "all" || itemArea === activeFilter;
        item.classList.toggle("is-filter-hidden", !shouldShow);
        item.toggleAttribute("hidden", !shouldShow);
        item.setAttribute("aria-hidden", shouldShow ? "false" : "true");
        if (shouldShow) visibleCount += 1;
      });
      triggers.forEach((trigger) => {
        const triggerValue = normalizeFilter(trigger.getAttribute("data-tsa-filter-value"));
        const isActive = triggerValue === activeFilter;
        trigger.classList.toggle("is-active", isActive);
        trigger.setAttribute("aria-selected", isActive ? "true" : "false");
        trigger.setAttribute("tabindex", isActive ? "0" : "-1");
      });
      if (emptyState) {
        emptyState.classList.toggle("is-visible", visibleCount === 0);
      }
      if (shouldUpdateUrl) {
        updateUrl(activeFilter);
      }
    }
    triggers.forEach((trigger, index) => {
      trigger.setAttribute("role", "tab");
      if (trigger instanceof HTMLButtonElement && !trigger.hasAttribute("type")) {
        trigger.setAttribute("type", "button");
      }
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const filterValue = normalizeFilter(trigger.getAttribute("data-tsa-filter-value"));
        setFilter(filterValue, true);
      });
      trigger.addEventListener("keydown", (event) => {
        const { key } = event;
        if (key === "Enter" || key === " ") {
          event.preventDefault();
          const filterValue = normalizeFilter(trigger.getAttribute("data-tsa-filter-value"));
          setFilter(filterValue, true);
        }
        if (key === "ArrowRight" || key === "ArrowDown") {
          event.preventDefault();
          const nextTrigger = triggers[(index + 1) % triggers.length];
          nextTrigger?.focus();
        }
        if (key === "ArrowLeft" || key === "ArrowUp") {
          event.preventDefault();
          const previousTrigger = triggers[(index - 1 + triggers.length) % triggers.length];
          previousTrigger?.focus();
        }
      });
    });
    setFilter(getUrlFilter(), false);
    window.addEventListener("popstate", () => {
      setFilter(getUrlFilter(), false);
    });
  }
  function initResourcesFilters() {
    document.querySelectorAll(ROOT_SELECTOR).forEach(initFilterGroup);
  }

  // src/components/team-card/index.ts
  init_live_reload();
  var READY_CLASS = "team-scroll-motion-ready";
  var ACTIVE_CLASS = "is-inview";
  var CARD_SELECTOR = ".team_component .team_card";
  var IMAGE_SELECTOR = ".team_image";
  var AVATAR_SELECTOR = ".team_avatar";
  var MOBILE_QUERY = "(max-width: 767px)";
  var REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
  var ORIENTATION_RESET_DELAY = 250;
  var ENTER_ZONE_TOP = 0.35;
  var ENTER_ZONE_BOTTOM = 0.68;
  var RESET_OFFSET = 80;
  var DEBUG_TEAM_LAYOUT = false;
  var EXPECTED_IMAGE_WIDTH_REM = 14.5;
  var EXPECTED_IMAGE_HEIGHT_REM = 18.125;
  var LAYOUT_TOLERANCE_PX = 1;
  var isTeamCardMotionQueued = false;
  var isTeamLayoutDebugQueued = false;
  function isWithinTolerance(actual, expected) {
    return Math.abs(actual - expected) <= LAYOUT_TOLERANCE_PX;
  }
  function formatSize(size) {
    return `${size.width.toFixed(1)} x ${size.height.toFixed(1)}`;
  }
  function getElementLayoutSize(element, computedStyles) {
    const computedWidth = Number.parseFloat(computedStyles.width);
    const computedHeight = Number.parseFloat(computedStyles.height);
    return {
      width: Number.isFinite(computedWidth) ? computedWidth : element.offsetWidth,
      height: Number.isFinite(computedHeight) ? computedHeight : element.offsetHeight
    };
  }
  function getExpectedImageSize(imageSize) {
    const rootFontSize = Number.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    const remSize = Number.isFinite(rootFontSize) ? rootFontSize : 16;
    const desktopWidth = EXPECTED_IMAGE_WIDTH_REM * remSize;
    const desktopHeight = EXPECTED_IMAGE_HEIGHT_REM * remSize;
    if (window.matchMedia("(min-width: 992px)").matches) {
      return {
        width: desktopWidth,
        height: desktopHeight
      };
    }
    const responsiveWidth = imageSize.width || desktopWidth;
    return {
      width: responsiveWidth,
      height: responsiveWidth * (desktopHeight / desktopWidth)
    };
  }
  function logTeamLayout() {
    if (!DEBUG_TEAM_LAYOUT) return;
    const cards = Array.from(document.querySelectorAll(CARD_SELECTOR));
    if (!cards.length) return;
    cards.forEach((card, index) => {
      const image = card.querySelector(IMAGE_SELECTOR);
      const avatar = card.querySelector(AVATAR_SELECTOR);
      if (!image || !avatar) {
        console.warn(`[TSA Team Layout] Card ${index + 1}: Missing team image or avatar`, {
          hasImage: Boolean(image),
          hasAvatar: Boolean(avatar)
        });
        return;
      }
      const imageComputed = window.getComputedStyle(image);
      const avatarComputed = window.getComputedStyle(avatar);
      const imageSize = getElementLayoutSize(image, imageComputed);
      const avatarSize = getElementLayoutSize(avatar, avatarComputed);
      const imageVisualRect = image.getBoundingClientRect();
      const avatarVisualRect = avatar.getBoundingClientRect();
      const expectedSize = getExpectedImageSize(imageSize);
      const avatarFillsImage = isWithinTolerance(avatarSize.width, imageSize.width) && isWithinTolerance(avatarSize.height, imageSize.height);
      const isCorrect = isWithinTolerance(imageSize.width, expectedSize.width) && isWithinTolerance(imageSize.height, expectedSize.height) && avatarFillsImage;
      console.log(`[TSA Team Layout] Card ${index + 1}: ${isCorrect ? "OK" : "Check"}`, {
        imageSize: formatSize(imageSize),
        avatarSize: formatSize(avatarSize),
        imageVisualSize: formatSize(imageVisualRect),
        avatarVisualSize: formatSize(avatarVisualRect),
        expectedSize: `${expectedSize.width.toFixed(1)} x ${expectedSize.height.toFixed(1)}`,
        computedWidth: imageComputed.width,
        computedHeight: imageComputed.height,
        computedPosition: imageComputed.position,
        avatarComputedWidth: avatarComputed.width,
        avatarComputedHeight: avatarComputed.height,
        avatarComputedPosition: avatarComputed.position,
        objectFit: avatarComputed.objectFit,
        avatarFillsImage,
        isCorrect
      });
    });
  }
  function setupTeamLayoutDebug() {
    if (!DEBUG_TEAM_LAYOUT || isTeamLayoutDebugQueued) return;
    isTeamLayoutDebugQueued = true;
    const requestLog = () => {
      window.requestAnimationFrame(logTeamLayout);
    };
    let resizeTimer;
    requestLog();
    if (document.readyState !== "complete") {
      window.addEventListener("load", requestLog, { once: true });
    }
    window.addEventListener(
      "resize",
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(requestLog, 160);
      },
      { passive: true }
    );
  }
  function initializeTeamCardScrollMotion() {
    setupTeamLayoutDebug();
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const reduceMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let cards = [];
    let orientationTimer;
    let rafId = null;
    let isListening = false;
    function updateCards() {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const enterZoneTop = viewportHeight * ENTER_ZONE_TOP;
      const enterZoneBottom = viewportHeight * ENTER_ZONE_BOTTOM;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const isActive = card.classList.contains(ACTIVE_CLASS);
        const isInsideEnterZone = cardCenter >= enterZoneTop && cardCenter <= enterZoneBottom;
        const isFullyOutOfView = rect.bottom < -RESET_OFFSET || rect.top > viewportHeight + RESET_OFFSET;
        if (isFullyOutOfView) {
          card.classList.remove(ACTIVE_CLASS);
          return;
        }
        if (!isActive && isInsideEnterZone) {
          card.classList.add(ACTIVE_CLASS);
        }
      });
    }
    function requestUpdate() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateCards();
      });
    }
    function addRuntimeListeners() {
      if (isListening) return;
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate, { passive: true });
      isListening = true;
    }
    function removeRuntimeListeners() {
      if (!isListening) return;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      isListening = false;
    }
    function reset() {
      removeRuntimeListeners();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      document.documentElement.classList.remove(READY_CLASS);
      cards.forEach((card) => {
        card.classList.remove(ACTIVE_CLASS);
      });
      cards = [];
    }
    function init() {
      reset();
      if (!mobileQuery.matches || reduceMotionQuery.matches) {
        return;
      }
      cards = Array.from(document.querySelectorAll(CARD_SELECTOR));
      if (!cards.length) return;
      document.documentElement.classList.add(READY_CLASS);
      updateCards();
      addRuntimeListeners();
    }
    init();
    mobileQuery.addEventListener("change", init);
    reduceMotionQuery.addEventListener("change", init);
    window.addEventListener(
      "orientationchange",
      () => {
        window.clearTimeout(orientationTimer);
        orientationTimer = window.setTimeout(init, ORIENTATION_RESET_DELAY);
      },
      { passive: true }
    );
  }
  function initTeamCards() {
    if (isTeamCardMotionQueued) return;
    isTeamCardMotionQueued = true;
    window.Webflow ||= [];
    window.Webflow.push(() => {
      initializeTeamCardScrollMotion();
    });
  }

  // src/features/benefit-rive/benefit-rive.ts
  init_live_reload();
  var import_webgl2 = __toESM(require_rive(), 1);
  var ROOT_SELECTOR2 = "[data-benefit-rive]";
  var MOUNT_SELECTOR = "[data-benefit-rive-mount]";
  var FALLBACK_SELECTOR = "[data-benefit-rive-fallback]";
  var TRIGGER_SELECTOR2 = "[data-benefit-rive-trigger]";
  var LEGACY_ROOT_SELECTOR = "[data-benefit-experience-rive]";
  var LEGACY_MOUNT_SELECTOR = ".rive_canvas.is-benefit-1";
  var LEGACY_FALLBACK_SELECTOR = "[data-benefit-experience-rive-fallback]";
  var ROOT_QUERY = `${ROOT_SELECTOR2}, ${LEGACY_ROOT_SELECTOR}`;
  var FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
  var REDUCED_MOTION_QUERY2 = "(prefers-reduced-motion: reduce)";
  var DEFAULT_STATE_MACHINE_QUERY = "(min-width: 992px)";
  var MOBILE_PRELOAD_QUERY = "(max-width: 991px)";
  var DEFAULT_DESKTOP_PRELOAD_ROOT_MARGIN_PX = 400;
  var RENDER_VISIBILITY_THRESHOLD = 0.01;
  var DEFAULT_VIEWPORT_THRESHOLD = 0.35;
  var DEFAULT_DESKTOP_NEARBY_PRELOAD_VIEWPORTS = 1.5;
  var DEFAULT_MOBILE_PRELOAD_VIEWPORTS = 2.5;
  var MIN_NEARBY_PRELOAD_VIEWPORTS = 0.5;
  var MAX_NEARBY_PRELOAD_VIEWPORTS = 3;
  var DEFAULT_BOUNDARY_PROPERTY = "pulseBoundary";
  var CURSOR_PROPERTIES_ATTRIBUTE = "data-rive-cursor-properties";
  var LAYOUT_PARITY_TOLERANCE = 0.5;
  var VISUAL_READY_FRAME_COUNT = 4;
  var VISUAL_READY_MIN_STABILIZATION_MS = 120;
  var IDLE_RESET_FRAME_COUNT = 3;
  var IDLE_RESIZE_FRAME_COUNT = 2;
  var INITIALIZED_ATTRIBUTE = "benefitRiveInitialized";
  var LEGACY_INITIALIZED_ATTRIBUTE = "benefitExperienceRiveInitialized";
  var DEFAULT_LAYOUT_CONFIG = {
    alignment: import_webgl2.Alignment.BottomCenter,
    fit: import_webgl2.Fit.Contain,
    objectFit: "contain",
    objectPosition: "center bottom"
  };
  var FIT_MAP = {
    contain: { fit: import_webgl2.Fit.Contain, objectFit: "contain" },
    cover: { fit: import_webgl2.Fit.Cover, objectFit: "cover" },
    fill: { fit: import_webgl2.Fit.Fill, objectFit: "fill" },
    "fit-height": { fit: import_webgl2.Fit.FitHeight, objectFit: "contain" },
    "fit-width": { fit: import_webgl2.Fit.FitWidth, objectFit: "contain" },
    layout: { fit: import_webgl2.Fit.Layout, objectFit: "contain" },
    none: { fit: import_webgl2.Fit.None, objectFit: "none" },
    "scale-down": { fit: import_webgl2.Fit.ScaleDown, objectFit: "scale-down" }
  };
  var ALIGNMENT_MAP = {
    center: { alignment: import_webgl2.Alignment.Center, objectPosition: "center center" },
    "bottom-center": { alignment: import_webgl2.Alignment.BottomCenter, objectPosition: "center bottom" },
    "bottom-left": { alignment: import_webgl2.Alignment.BottomLeft, objectPosition: "left bottom" },
    "bottom-right": { alignment: import_webgl2.Alignment.BottomRight, objectPosition: "right bottom" },
    "center-left": { alignment: import_webgl2.Alignment.CenterLeft, objectPosition: "left center" },
    "center-right": { alignment: import_webgl2.Alignment.CenterRight, objectPosition: "right center" },
    "top-center": { alignment: import_webgl2.Alignment.TopCenter, objectPosition: "center top" },
    "top-left": { alignment: import_webgl2.Alignment.TopLeft, objectPosition: "left top" },
    "top-right": { alignment: import_webgl2.Alignment.TopRight, objectPosition: "right top" }
  };
  var didWarnBoundaryFallback = false;
  var malformedAttributeWarnings = /* @__PURE__ */ new WeakMap();
  function initBenefitRive() {
    document.querySelectorAll(ROOT_QUERY).forEach(initBenefitRiveRoot);
  }
  function initBenefitRiveRoot(root) {
    if (root.dataset[INITIALIZED_ATTRIBUTE] === "true" || root.dataset[LEGACY_INITIALIZED_ATTRIBUTE] === "true") {
      return;
    }
    root.dataset[INITIALIZED_ATTRIBUTE] = "true";
    root.dataset[LEGACY_INITIALIZED_ATTRIBUTE] = "true";
    const key = getBenefitKey(root);
    const layoutConfig = getResolvedLayoutConfig(root);
    const fallback = getFallbackElement(root, key);
    const fallbackMode = getFallbackMode(root);
    const mount = getMountElement(root, key);
    const preloadMode = getPreloadMode(root);
    const minScrollPreloadViewports = getPreloadMinScrollViewports(root);
    applyLayoutCssVariables(root, layoutConfig);
    prepareFallbackImage(fallback, fallbackMode);
    if (!mount) {
      applyErrorState(root);
      return;
    }
    const canvas = prepareCanvas(mount);
    const config = getPlaybackConfig(root);
    if (!config) {
      applyErrorState(root);
      return;
    }
    root.classList.toggle("is-rive-playback-state-machine", config.mode === "state-machine");
    root.classList.toggle("is-rive-playback-animation", config.mode === "animation");
    const pointerCursorPropertyNames = getCursorPropertyNames(root);
    const finePointerQuery = window.matchMedia(FINE_POINTER_QUERY);
    const mobilePreloadQuery = window.matchMedia(MOBILE_PRELOAD_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY2);
    const devicePolicy = getDevicePolicy(root);
    const activationMode = getActivationMode(root, config);
    const trigger = getTriggerElement(root, key);
    const responsiveStateMachineQuery = config.mode === "state-machine" && config.responsiveStateMachine ? window.matchMedia(config.responsiveStateMachine.query) : null;
    let rive = null;
    let boundaryProperty = null;
    let boundaryCallback = null;
    let loopCallback = null;
    const pointerCursorSubscriptions = [];
    const missingCursorPropertyNames = /* @__PURE__ */ new Set();
    let resizeFrame = 0;
    let layoutParityFrame = 0;
    let prematureFadeFrame = 0;
    let visualReadyToken = 0;
    let warmupTimeout = 0;
    let idleResetToken = 0;
    let idleResizeToken = 0;
    let hasFallbackImageListeners = false;
    let fallbackImageSettledPromise = null;
    let resolveFallbackImageSettled = null;
    let fallbackLoadCallback = null;
    let fallbackErrorCallback = null;
    const warmupFrameIds = [];
    const warmupCancelResolvers = [];
    const idleResetFrameIds = [];
    const idleResetCancelResolvers = [];
    const idleResizeFrameIds = [];
    const idleResizeCancelResolvers = [];
    let preloadObserver = null;
    let preloadResizeFrame = 0;
    let preloadScrollFrame = 0;
    let preloadScrollCallback = null;
    let isWithinPreloadArea = false;
    let isNearViewport = false;
    let isRiveLoaded = false;
    let isVisualReady = false;
    let isWarmingUp = false;
    let isRenderVisible = false;
    let isRendering = false;
    let isPlaying = false;
    let isPausedForHidden = false;
    let activationRequested = false;
    let mobileViewportActive = false;
    let pendingGracefulStop = false;
    let stopRequestedFromBoundaryValue = null;
    let lastBoundaryValue = null;
    let didWarnLayoutParityMismatch = false;
    let didWarnPrematureFallbackFade = false;
    let isCleanedUp = false;
    let activeStateMachineName = config.mode === "state-machine" ? resolveStateMachineName(config, responsiveStateMachineQuery) : null;
    let hasMetPreloadMinScroll = preloadMode !== "nearby" || minScrollPreloadViewports === null || getCurrentScrollY() > 1 || isElementActuallyVisible(root);
    const syncMountToFallbackGeometry = () => {
      return syncMountToFallbackGeometryBox(root, mount, fallback);
    };
    const cancelQueuedFrames = (frameIds) => {
      frameIds.forEach((frameId) => {
        window.cancelAnimationFrame(frameId);
      });
      frameIds.length = 0;
    };
    const resolvePendingWaits = (resolvers) => {
      resolvers.splice(0).forEach((resolve) => {
        resolve();
      });
    };
    const cancelWarmup = () => {
      visualReadyToken += 1;
      isWarmingUp = false;
      window.clearTimeout(warmupTimeout);
      warmupTimeout = 0;
      cancelQueuedFrames(warmupFrameIds);
      resolvePendingWaits(warmupCancelResolvers);
    };
    const cancelIdleFrames = () => {
      idleResetToken += 1;
      idleResizeToken += 1;
      cancelQueuedFrames(idleResetFrameIds);
      cancelQueuedFrames(idleResizeFrameIds);
      resolvePendingWaits(idleResetCancelResolvers);
      resolvePendingWaits(idleResizeCancelResolvers);
    };
    const waitForAnimationFrames = (count, frameIds, cancelResolvers) => {
      return new Promise((resolve) => {
        let isSettled = false;
        const removeCancelResolver = (cancelResolver2) => {
          const index = cancelResolvers.indexOf(cancelResolver2);
          if (index >= 0) {
            cancelResolvers.splice(index, 1);
          }
        };
        const finish = (cancelResolver2) => {
          if (isSettled) return;
          isSettled = true;
          removeCancelResolver(cancelResolver2);
          resolve();
        };
        const cancelResolver = () => {
          finish(cancelResolver);
        };
        const step = (remainingFrames) => {
          const frameId = window.requestAnimationFrame(() => {
            const index = frameIds.indexOf(frameId);
            if (index >= 0) {
              frameIds.splice(index, 1);
            }
            if (isSettled) return;
            if (remainingFrames <= 1) {
              finish(cancelResolver);
              return;
            }
            step(remainingFrames - 1);
          });
          frameIds.push(frameId);
        };
        cancelResolvers.push(cancelResolver);
        step(Math.max(1, count));
      });
    };
    const waitForWarmupStabilization = () => {
      return new Promise((resolve) => {
        let isSettled = false;
        const removeCancelResolver = (cancelResolver2) => {
          const index = warmupCancelResolvers.indexOf(cancelResolver2);
          if (index >= 0) {
            warmupCancelResolvers.splice(index, 1);
          }
        };
        const finish = (cancelResolver2) => {
          if (isSettled) return;
          isSettled = true;
          window.clearTimeout(warmupTimeout);
          warmupTimeout = 0;
          removeCancelResolver(cancelResolver2);
          resolve();
        };
        const cancelResolver = () => {
          finish(cancelResolver);
        };
        warmupCancelResolvers.push(cancelResolver);
        warmupTimeout = window.setTimeout(() => {
          finish(cancelResolver);
        }, VISUAL_READY_MIN_STABILIZATION_MS);
      });
    };
    const canRenderNow = () => {
      return document.visibilityState === "visible" && isRenderVisible;
    };
    const canWarmupOffscreen = () => {
      return preloadMode === "nearby";
    };
    const canWarmupNow = () => {
      return document.visibilityState === "visible" && (isRenderVisible || canWarmupOffscreen());
    };
    const performGeometrySyncAndResize = async () => {
      syncMountToFallbackGeometry();
      if (!rive) {
        scheduleLayoutParityCheck();
        return;
      }
      const shouldPaintIdleResize = config.mode === "animation" && isRiveLoaded && isVisualReady && !activationRequested && !isPlaying && canRenderNow();
      if (shouldPaintIdleResize) {
        startRenderingIfAllowed();
      }
      rive.resizeDrawingSurfaceToCanvas();
      if (shouldPaintIdleResize) {
        idleResizeToken += 1;
        const token = idleResizeToken;
        await waitForAnimationFrames(
          IDLE_RESIZE_FRAME_COUNT,
          idleResizeFrameIds,
          idleResizeCancelResolvers
        );
        if (token === idleResizeToken && config.mode === "animation" && isVisualReady && !activationRequested && !isPlaying) {
          stopRendering();
        }
      }
      scheduleLayoutParityCheck();
    };
    const scheduleGeometrySyncAndResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        void performGeometrySyncAndResize();
      });
    };
    const resolveFallbackImageSettledIfPending = () => {
      resolveFallbackImageSettled?.();
      resolveFallbackImageSettled = null;
      fallbackImageSettledPromise = null;
    };
    const removeFallbackImageListeners = (resolvePending = false) => {
      if (!(fallback instanceof HTMLImageElement) || !hasFallbackImageListeners) return;
      if (fallbackLoadCallback) {
        fallback.removeEventListener("load", fallbackLoadCallback);
      }
      if (fallbackErrorCallback) {
        fallback.removeEventListener("error", fallbackErrorCallback);
      }
      hasFallbackImageListeners = false;
      fallbackLoadCallback = null;
      fallbackErrorCallback = null;
      if (resolvePending) {
        resolveFallbackImageSettledIfPending();
      }
    };
    const handleFallbackImageSettled = () => {
      removeFallbackImageListeners();
      resolveFallbackImageSettledIfPending();
      scheduleGeometrySyncAndResize();
    };
    const setupFallbackImageListeners = () => {
      if (!(fallback instanceof HTMLImageElement) || fallback.complete || hasFallbackImageListeners) {
        return;
      }
      fallbackImageSettledPromise ??= new Promise((resolve) => {
        resolveFallbackImageSettled = resolve;
      });
      fallbackLoadCallback = handleFallbackImageSettled;
      fallbackErrorCallback = handleFallbackImageSettled;
      fallback.addEventListener("load", fallbackLoadCallback, { once: true });
      fallback.addEventListener("error", fallbackErrorCallback, { once: true });
      hasFallbackImageListeners = true;
    };
    const scheduleLayoutParityCheck = () => {
      if (!isDevelopmentHost2() || didWarnLayoutParityMismatch) return;
      window.cancelAnimationFrame(layoutParityFrame);
      layoutParityFrame = window.requestAnimationFrame(() => {
        layoutParityFrame = 0;
        if (!isVisualReady || !fallback || !mount || !canvas.isConnected) return;
        const mismatch = getLayoutParityMismatch(fallback, mount, canvas);
        if (!mismatch) return;
        didWarnLayoutParityMismatch = true;
        console.warn("Benefit Rive: fallback, mount, and canvas layout boxes differ.", mismatch);
      });
    };
    const schedulePrematureFallbackFadeCheck = () => {
      if (fallbackMode === "error-only" || !isDevelopmentHost2() || didWarnPrematureFallbackFade || !fallback) {
        return;
      }
      window.cancelAnimationFrame(prematureFadeFrame);
      prematureFadeFrame = window.requestAnimationFrame(() => {
        prematureFadeFrame = 0;
        if (isVisualReady || !fallback.isConnected) return;
        const opacity = Number(window.getComputedStyle(fallback).opacity);
        if (!Number.isFinite(opacity) || opacity > 0.05) return;
        didWarnPrematureFallbackFade = true;
        console.warn("Benefit Rive: fallback faded before the Rive visual frame was ready.", {
          opacity
        });
      });
    };
    const startRenderingIfAllowed = (allowOffscreen = false) => {
      if (!rive || document.visibilityState !== "visible") return;
      if (!allowOffscreen && !isRenderVisible) return;
      if (isRendering) return;
      rive.startRendering();
      isRendering = true;
    };
    const stopRendering = (force = false) => {
      if (!rive || !isRendering) return;
      if (!force && isRiveLoaded && !isVisualReady) return;
      rive.stopRendering();
      isRendering = false;
    };
    const waitForFallbackImageReadiness = async () => {
      if (fallbackMode === "error-only") return;
      if (!(fallback instanceof HTMLImageElement)) return;
      if (!fallback.complete) {
        setupFallbackImageListeners();
        await fallbackImageSettledPromise;
      }
      if (isCleanedUp) return;
      if (typeof fallback.decode === "function") {
        await fallback.decode().catch(() => void 0);
      }
    };
    const paintIdleFrameThenStop = async () => {
      cancelIdleFrames();
      if (!rive || !canRenderNow()) {
        stopRendering(true);
        return;
      }
      idleResetToken += 1;
      const token = idleResetToken;
      startRenderingIfAllowed();
      rive.stop(config.mode === "animation" ? config.animationName : void 0);
      if (config.mode === "animation") {
        isPlaying = false;
        isPausedForHidden = false;
      }
      syncMountToFallbackGeometry();
      rive.resizeDrawingSurfaceToCanvas();
      await waitForAnimationFrames(
        IDLE_RESET_FRAME_COUNT,
        idleResetFrameIds,
        idleResetCancelResolvers
      );
      if (token === idleResetToken && (!activationRequested || config.mode !== "animation")) {
        stopRendering();
      }
    };
    const startVisualWarmup = (instance) => {
      if (isWarmingUp || isVisualReady || !isRiveLoaded || rive !== instance || !canWarmupNow() || isCleanedUp) {
        return;
      }
      visualReadyToken += 1;
      const token = visualReadyToken;
      isWarmingUp = true;
      void (async () => {
        await waitForFallbackImageReadiness();
        if (token !== visualReadyToken || rive !== instance || !isRiveLoaded || isCleanedUp || !canWarmupNow()) {
          return;
        }
        syncMountToFallbackGeometry();
        if (config.mode === "animation") {
          instance.stop(config.animationName);
          isPlaying = false;
          isPausedForHidden = false;
        }
        instance.resizeDrawingSurfaceToCanvas();
        startRenderingIfAllowed(canWarmupOffscreen());
        await Promise.all([
          waitForAnimationFrames(VISUAL_READY_FRAME_COUNT, warmupFrameIds, warmupCancelResolvers),
          waitForWarmupStabilization()
        ]);
        if (token !== visualReadyToken || rive !== instance || !isRiveLoaded || isCleanedUp || !canWarmupNow()) {
          return;
        }
        syncMountToFallbackGeometry();
        instance.resizeDrawingSurfaceToCanvas();
        isVisualReady = true;
        isWarmingUp = false;
        root.classList.add("is-rive-visual-ready");
        syncPlayback();
        scheduleLayoutParityCheck();
      })().finally(() => {
        if (token === visualReadyToken && !isVisualReady) {
          isWarmingUp = false;
        }
      });
    };
    const restartVisualWarmupIfNeeded = () => {
      if (!rive || !isRiveLoaded || isVisualReady || isWarmingUp || !canWarmupNow()) return;
      startVisualWarmup(rive);
    };
    const unsubscribeBoundaryObserver = () => {
      if (boundaryProperty && boundaryCallback) {
        boundaryProperty.off(boundaryCallback);
      }
      boundaryProperty = null;
      boundaryCallback = null;
    };
    const unsubscribeLoopObserver = () => {
      if (rive && loopCallback) {
        rive.off(import_webgl2.EventType.Loop, loopCallback);
      }
      loopCallback = null;
    };
    const clearBoundaryState = () => {
      unsubscribeBoundaryObserver();
      unsubscribeLoopObserver();
      lastBoundaryValue = null;
      pendingGracefulStop = false;
      stopRequestedFromBoundaryValue = null;
    };
    const warnMissingCursorProperty = (propertyName) => {
      if (!isDevelopmentHost2() || missingCursorPropertyNames.has(propertyName)) return;
      missingCursorPropertyNames.add(propertyName);
      console.warn(`Benefit Rive: View Model Boolean "${propertyName}" was not found.`);
    };
    const syncPointerCursor = () => {
      const shouldUsePointerCursor = config.mode === "state-machine" && finePointerQuery.matches && pointerCursorSubscriptions.some(({ property }) => property.value);
      canvas.style.cursor = shouldUsePointerCursor ? "pointer" : "";
    };
    const clearPointerCursorObservers = () => {
      pointerCursorSubscriptions.forEach(({ property, callback }) => {
        try {
          property.off(callback);
        } catch {
        }
      });
      pointerCursorSubscriptions.length = 0;
      canvas.style.cursor = "";
    };
    const setupPointerCursorObservers = (instance) => {
      clearPointerCursorObservers();
      if (config.mode !== "state-machine" || pointerCursorPropertyNames.length === 0) return;
      const { viewModelInstance } = instance;
      if (!viewModelInstance) return;
      pointerCursorPropertyNames.forEach((propertyName) => {
        let property = null;
        try {
          property = viewModelInstance.boolean(propertyName);
        } catch {
          property = null;
        }
        if (!property) {
          warnMissingCursorProperty(propertyName);
          return;
        }
        const callback = () => {
          syncPointerCursor();
        };
        try {
          property.on(callback);
          pointerCursorSubscriptions.push({ property, callback });
        } catch {
        }
      });
      syncPointerCursor();
    };
    const stopAndResetToIdle = (paintFrame = true) => {
      if (!rive || config.mode !== "animation") return;
      cancelIdleFrames();
      isPlaying = false;
      isPausedForHidden = false;
      pendingGracefulStop = false;
      stopRequestedFromBoundaryValue = null;
      if (paintFrame) {
        void paintIdleFrameThenStop();
        return;
      }
      if (!isVisualReady) {
        cancelWarmup();
      }
      rive.stop(config.animationName);
      stopRendering(true);
    };
    const readBoundaryValue = (event) => {
      if (typeof event === "number") return event;
      if (event && typeof event === "object" && "data" in event) {
        const value = event.data;
        if (typeof value === "number") return value;
      }
      return boundaryProperty?.value ?? null;
    };
    const handleBoundaryNotification = (event) => {
      if (config.mode !== "animation") return;
      const nextBoundaryValue = readBoundaryValue(event);
      if (nextBoundaryValue === null || nextBoundaryValue === lastBoundaryValue) return;
      lastBoundaryValue = nextBoundaryValue;
      if (!pendingGracefulStop) return;
      if (activationRequested) {
        pendingGracefulStop = false;
        stopRequestedFromBoundaryValue = null;
        return;
      }
      if (nextBoundaryValue !== stopRequestedFromBoundaryValue) {
        stopAndResetToIdle();
      }
    };
    const isLoopEventForAnimation = (event) => {
      if (config.mode !== "animation") return false;
      if (!event || typeof event !== "object" || !("data" in event)) return true;
      const { data } = event;
      if (typeof data === "string") return data === config.animationName;
      if (Array.isArray(data)) return data.includes(config.animationName);
      if (data && typeof data === "object" && "animation" in data) {
        return data.animation === config.animationName;
      }
      return true;
    };
    const warnBoundaryFallbackOnce = () => {
      if (!isDevelopmentHost2() || didWarnBoundaryFallback) return;
      didWarnBoundaryFallback = true;
      console.error(
        `Benefit Rive: View Model Number "${config.mode === "animation" ? config.boundaryPropertyName : DEFAULT_BOUNDARY_PROPERTY}" was not found. Falling back to loop-boundary stopping.`
      );
    };
    const setupLoopFallback = () => {
      if (config.mode !== "animation" || !rive || loopCallback) return;
      loopCallback = (event) => {
        if (!pendingGracefulStop || !isLoopEventForAnimation(event)) return;
        if (activationRequested) {
          pendingGracefulStop = false;
          stopRequestedFromBoundaryValue = null;
          return;
        }
        stopAndResetToIdle();
      };
      rive.on(import_webgl2.EventType.Loop, loopCallback);
    };
    const resolveBoundaryProperty = () => {
      if (config.mode !== "animation" || !rive) return;
      unsubscribeBoundaryObserver();
      unsubscribeLoopObserver();
      boundaryProperty = rive.viewModelInstance?.number(config.boundaryPropertyName) ?? null;
      lastBoundaryValue = boundaryProperty?.value ?? null;
      if (!boundaryProperty) {
        warnBoundaryFallbackOnce();
        setupLoopFallback();
        return;
      }
      boundaryCallback = (event) => {
        handleBoundaryNotification(event);
      };
      boundaryProperty.on(boundaryCallback);
    };
    const requestGracefulStop = () => {
      if (config.mode !== "animation" || !rive || !isPlaying) return;
      pendingGracefulStop = true;
      stopRequestedFromBoundaryValue = lastBoundaryValue;
      startRenderingIfAllowed();
    };
    const startTimeline = () => {
      if (config.mode !== "animation" || !rive || isPlaying) return;
      cancelIdleFrames();
      rive.play(config.animationName);
      isPlaying = true;
      isPausedForHidden = false;
      startRenderingIfAllowed();
    };
    const syncAnimationActivation = () => {
      if (config.mode !== "animation" || !rive || !isRiveLoaded) return;
      if (document.visibilityState === "hidden") {
        cancelWarmup();
        if (isPlaying && !isPausedForHidden) {
          rive.pause(config.animationName);
          isPausedForHidden = true;
        }
        stopRendering(true);
        return;
      }
      if (!isRenderVisible) {
        if (!isVisualReady && canWarmupOffscreen()) {
          restartVisualWarmupIfNeeded();
          return;
        }
        cancelWarmup();
        stopAndResetToIdle(false);
        return;
      }
      if (!isVisualReady) {
        restartVisualWarmupIfNeeded();
        return;
      }
      if (activationRequested) {
        pendingGracefulStop = false;
        stopRequestedFromBoundaryValue = null;
        if (isPausedForHidden) {
          rive.play(config.animationName);
          isPlaying = true;
          isPausedForHidden = false;
          startRenderingIfAllowed();
          return;
        }
        startTimeline();
        return;
      }
      if (pendingGracefulStop) {
        if (isPausedForHidden) {
          rive.play(config.animationName);
          isPlaying = true;
          isPausedForHidden = false;
        }
        startRenderingIfAllowed();
        return;
      }
      if (isPlaying) {
        requestGracefulStop();
        return;
      }
      void paintIdleFrameThenStop();
    };
    const setActivationRequested = (active) => {
      if (config.mode !== "animation") return;
      activationRequested = active;
      syncAnimationActivation();
    };
    const syncStateMachineRendering = () => {
      if (config.mode !== "state-machine" || !rive || !isRiveLoaded) return;
      if (document.visibilityState === "hidden") {
        cancelWarmup();
        if (!isPausedForHidden) {
          rive.pause();
          isPausedForHidden = true;
        }
        stopRendering(true);
        return;
      }
      if (!isRenderVisible) {
        if (!isVisualReady && canWarmupOffscreen()) {
          restartVisualWarmupIfNeeded();
          return;
        }
        cancelWarmup();
        if (!isPausedForHidden) {
          rive.pause();
          isPausedForHidden = true;
        }
        stopRendering(true);
        return;
      }
      if (!isVisualReady) {
        restartVisualWarmupIfNeeded();
        return;
      }
      if (isPausedForHidden) {
        rive.play();
        isPausedForHidden = false;
      }
      startRenderingIfAllowed();
    };
    const syncPlayback = () => {
      if (config.mode === "animation") {
        syncAnimationActivation();
        return;
      }
      syncStateMachineRendering();
    };
    const cleanupRiveInstance = (clearError = true) => {
      isCleanedUp = true;
      cancelWarmup();
      cancelIdleFrames();
      window.cancelAnimationFrame(resizeFrame);
      window.cancelAnimationFrame(layoutParityFrame);
      window.cancelAnimationFrame(prematureFadeFrame);
      resizeFrame = 0;
      layoutParityFrame = 0;
      prematureFadeFrame = 0;
      removeFallbackImageListeners(true);
      clearBoundaryState();
      clearPointerCursorObservers();
      if (rive) {
        rive.cleanup();
        rive = null;
      }
      isRiveLoaded = false;
      isVisualReady = false;
      isWarmingUp = false;
      isRendering = false;
      isPlaying = false;
      isPausedForHidden = false;
      pendingGracefulStop = false;
      stopRequestedFromBoundaryValue = null;
      root.classList.remove("is-rive-loading", "is-rive-ready", "is-rive-visual-ready");
      if (clearError) {
        root.classList.remove("is-rive-error", "is-rive-unavailable");
      }
      canvas.removeAttribute("width");
      canvas.removeAttribute("height");
    };
    const applyLoadError = (instance) => {
      if (rive !== instance) return;
      cancelWarmup();
      cancelIdleFrames();
      removeFallbackImageListeners(true);
      clearBoundaryState();
      clearPointerCursorObservers();
      instance.cleanup();
      rive = null;
      isRiveLoaded = false;
      isVisualReady = false;
      isWarmingUp = false;
      isRendering = false;
      isPlaying = false;
      isPausedForHidden = false;
      root.classList.remove(
        "is-rive-loading",
        "is-rive-ready",
        "is-rive-unavailable",
        "is-rive-visual-ready"
      );
      root.classList.add("is-rive-error");
    };
    const applyLoadSuccess = (instance, mountedStateMachineName) => {
      if (rive !== instance) return;
      const shouldResetMountedStateMachine = config.mode === "state-machine" && mountedStateMachineName !== activeStateMachineName;
      isRiveLoaded = true;
      isVisualReady = false;
      isWarmingUp = false;
      syncMountToFallbackGeometry();
      if (config.mode === "animation") {
        resolveBoundaryProperty();
        instance.stop(config.animationName);
        isPlaying = false;
      } else if (!shouldResetMountedStateMachine) {
        setupPointerCursorObservers(instance);
      }
      root.classList.remove("is-rive-loading", "is-rive-error", "is-rive-unavailable");
      root.classList.add("is-rive-ready");
      root.classList.remove("is-rive-visual-ready");
      schedulePrematureFallbackFadeCheck();
      if (shouldResetMountedStateMachine) {
        resetActiveStateMachine();
        return;
      }
      startVisualWarmup(instance);
    };
    const resetActiveStateMachine = () => {
      if (config.mode !== "state-machine" || !rive || !isRiveLoaded || !activeStateMachineName) {
        return;
      }
      const instance = rive;
      cancelWarmup();
      cancelIdleFrames();
      stopRendering(true);
      clearPointerCursorObservers();
      isPausedForHidden = false;
      try {
        instance.reset({
          artboard: config.artboardName,
          stateMachines: activeStateMachineName,
          autoplay: true,
          autoBind: true
        });
        instance.setupRiveListeners({ isTouchScrollEnabled: true });
        setupPointerCursorObservers(instance);
      } catch {
        applyLoadError(instance);
        return;
      }
      syncMountToFallbackGeometry();
      instance.resizeDrawingSurfaceToCanvas();
      syncPlayback();
      scheduleLayoutParityCheck();
    };
    const mountRive = () => {
      if (rive || !isNearViewport) return;
      const src = root.dataset.riveSrc?.trim();
      if (!src || !isValidUrl(src)) {
        applyErrorState(root);
        return;
      }
      root.classList.add("is-rive-loading");
      root.classList.remove("is-rive-error", "is-rive-unavailable", "is-rive-visual-ready");
      isCleanedUp = false;
      isRiveLoaded = false;
      isVisualReady = false;
      isWarmingUp = false;
      setupFallbackImageListeners();
      syncMountToFallbackGeometry();
      const mountedStateMachineName = config.mode === "state-machine" ? activeStateMachineName : null;
      const layout = new import_webgl2.Layout({
        fit: layoutConfig.fit,
        alignment: layoutConfig.alignment
      });
      const params = {
        src,
        canvas,
        artboard: config.artboardName,
        layout,
        autoplay: config.mode === "state-machine",
        autoBind: true,
        useOffscreenRenderer: true,
        onLoad: () => applyLoadSuccess(instance, mountedStateMachineName),
        onLoadError: () => applyLoadError(instance)
      };
      if (config.mode === "animation") {
        params.animations = config.animationName;
        params.shouldDisableRiveListeners = true;
        params.isTouchScrollEnabled = true;
        params.dispatchPointerExit = false;
      } else {
        if (!mountedStateMachineName) {
          applyErrorState(root);
          return;
        }
        params.stateMachines = mountedStateMachineName;
        params.shouldDisableRiveListeners = false;
        params.isTouchScrollEnabled = true;
        params.dispatchPointerExit = true;
      }
      const instance = new import_webgl2.Rive(params);
      rive = instance;
    };
    const isEligible = () => {
      if (reducedMotionQuery.matches) return false;
      if (devicePolicy === "all") return true;
      return finePointerQuery.matches;
    };
    const usesDesktopHoverActivation = () => {
      return config.mode === "animation" && activationMode === "hover-or-viewport" && finePointerQuery.matches;
    };
    const syncEligibility = () => {
      const eligible = isEligible();
      root.classList.toggle("is-rive-eligible", eligible);
      if (!eligible) {
        cleanupRiveInstance();
        applyUnavailableState(root);
        return;
      }
      root.classList.remove("is-rive-unavailable");
      if (isNearViewport) {
        mountRive();
      }
      if (usesDesktopHoverActivation()) {
        setActivationRequested(false);
        return;
      }
      if (config.mode === "animation" && activationMode === "hover-or-viewport") {
        setActivationRequested(mobileViewportActive);
        return;
      }
      syncPlayback();
      syncPointerCursor();
    };
    const handleResponsiveStateMachineChange = () => {
      if (config.mode !== "state-machine" || !responsiveStateMachineQuery) return;
      const nextStateMachineName = resolveStateMachineName(config, responsiveStateMachineQuery);
      if (nextStateMachineName === activeStateMachineName) return;
      activeStateMachineName = nextStateMachineName;
      if (!rive) return;
      if (!isEligible()) {
        cleanupRiveInstance();
        return;
      }
      if (!isRiveLoaded) return;
      resetActiveStateMachine();
    };
    const handlePointerEnter = () => {
      if (!usesDesktopHoverActivation()) return;
      setActivationRequested(true);
    };
    const handlePointerLeave = () => {
      if (!usesDesktopHoverActivation()) return;
      setActivationRequested(false);
    };
    const handleDocumentVisibility = () => {
      syncPlayback();
    };
    const getPreloadVerticalMarginPx = () => {
      if (preloadMode !== "nearby") {
        if (!mobilePreloadQuery.matches) return DEFAULT_DESKTOP_PRELOAD_ROOT_MARGIN_PX;
        return Math.max(
          DEFAULT_DESKTOP_PRELOAD_ROOT_MARGIN_PX,
          Math.round(getViewportHeight() * DEFAULT_MOBILE_PRELOAD_VIEWPORTS)
        );
      }
      return Math.round(
        getViewportHeight() * getNearbyPreloadViewports(root, mobilePreloadQuery.matches)
      );
    };
    const getPreloadRootMargin = () => {
      return `${getPreloadVerticalMarginPx()}px 0px`;
    };
    const disconnectPreloadObserver = () => {
      preloadObserver?.disconnect();
      preloadObserver = null;
    };
    const removePreloadScrollGuard = () => {
      if (preloadScrollCallback) {
        window.removeEventListener("scroll", preloadScrollCallback);
      }
      window.cancelAnimationFrame(preloadScrollFrame);
      preloadScrollFrame = 0;
      preloadScrollCallback = null;
    };
    const hasSatisfiedPreloadMinScroll = () => {
      if (hasMetPreloadMinScroll) return true;
      if (isElementActuallyVisible(root)) {
        hasMetPreloadMinScroll = true;
        return true;
      }
      if (minScrollPreloadViewports !== null && getCurrentScrollY() >= getViewportHeight() * minScrollPreloadViewports) {
        hasMetPreloadMinScroll = true;
        return true;
      }
      return false;
    };
    const beginPreload = () => {
      if (isNearViewport) return;
      isNearViewport = true;
      disconnectPreloadObserver();
      removePreloadScrollGuard();
      syncEligibility();
    };
    const checkPreloadScrollGuard = () => {
      if (!hasSatisfiedPreloadMinScroll()) return;
      removePreloadScrollGuard();
      if (isWithinPreloadArea || isElementWithinVerticalViewportMargin(root, getPreloadVerticalMarginPx())) {
        beginPreload();
      }
    };
    const schedulePreloadScrollGuardCheck = () => {
      if (preloadScrollFrame) return;
      preloadScrollFrame = window.requestAnimationFrame(() => {
        preloadScrollFrame = 0;
        checkPreloadScrollGuard();
      });
    };
    const ensurePreloadScrollGuard = () => {
      if (preloadScrollCallback || hasMetPreloadMinScroll) return;
      preloadScrollCallback = schedulePreloadScrollGuardCheck;
      window.addEventListener("scroll", preloadScrollCallback, { passive: true });
    };
    const handlePreloadIntersection = ([entry]) => {
      isWithinPreloadArea = Boolean(entry?.isIntersecting);
      if (!isWithinPreloadArea) return;
      if (!hasSatisfiedPreloadMinScroll()) {
        ensurePreloadScrollGuard();
        return;
      }
      beginPreload();
    };
    const createPreloadObserver = () => {
      if (isNearViewport) return;
      disconnectPreloadObserver();
      preloadObserver = new IntersectionObserver(handlePreloadIntersection, {
        rootMargin: getPreloadRootMargin()
      });
      preloadObserver.observe(root);
    };
    const schedulePreloadObserverRefresh = () => {
      if (isNearViewport) return;
      window.cancelAnimationFrame(preloadResizeFrame);
      preloadResizeFrame = window.requestAnimationFrame(() => {
        preloadResizeFrame = 0;
        createPreloadObserver();
        if (preloadScrollCallback) {
          schedulePreloadScrollGuardCheck();
        }
      });
    };
    const handleViewportResize = () => {
      scheduleGeometrySyncAndResize();
      schedulePreloadObserverRefresh();
    };
    const handlePreloadMediaChange = () => {
      schedulePreloadObserverRefresh();
    };
    const renderVisibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isRenderVisible = Boolean(entry?.isIntersecting);
        if (!isRenderVisible) {
          if (canWarmupOffscreen() && !isVisualReady) {
            syncPlayback();
            return;
          }
          cancelWarmup();
          if (config.mode !== "animation") {
            syncPlayback();
            return;
          }
          stopAndResetToIdle(false);
          return;
        }
        syncPlayback();
      },
      { threshold: RENDER_VISIBILITY_THRESHOLD }
    );
    const mobileActivationObserver = new IntersectionObserver(
      ([entry]) => {
        if (config.mode !== "animation" || activationMode !== "hover-or-viewport") return;
        const ratio = entry?.intersectionRatio ?? 0;
        const isCompletelyOffscreen = !entry?.isIntersecting || ratio <= 0;
        mobileViewportActive = ratio >= config.viewportThreshold;
        if (usesDesktopHoverActivation()) return;
        if (isCompletelyOffscreen) {
          setActivationRequested(false);
          stopAndResetToIdle(false);
          return;
        }
        setActivationRequested(mobileViewportActive);
      },
      {
        threshold: [
          0,
          config.mode === "animation" ? config.viewportThreshold : DEFAULT_VIEWPORT_THRESHOLD
        ]
      }
    );
    const resizeObserver = new ResizeObserver(() => {
      scheduleGeometrySyncAndResize();
    });
    const cleanup = () => {
      disconnectPreloadObserver();
      removePreloadScrollGuard();
      window.cancelAnimationFrame(preloadResizeFrame);
      preloadResizeFrame = 0;
      renderVisibilityObserver.disconnect();
      mobileActivationObserver.disconnect();
      resizeObserver.disconnect();
      finePointerQuery.removeEventListener("change", syncEligibility);
      mobilePreloadQuery.removeEventListener("change", handlePreloadMediaChange);
      reducedMotionQuery.removeEventListener("change", syncEligibility);
      responsiveStateMachineQuery?.removeEventListener("change", handleResponsiveStateMachineChange);
      document.removeEventListener("visibilitychange", handleDocumentVisibility);
      trigger?.removeEventListener("pointerenter", handlePointerEnter);
      trigger?.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleViewportResize);
      window.removeEventListener("orientationchange", handleViewportResize);
      cleanupRiveInstance();
    };
    setupFallbackImageListeners();
    syncMountToFallbackGeometry();
    createPreloadObserver();
    renderVisibilityObserver.observe(root);
    mobileActivationObserver.observe(root);
    resizeObserver.observe(root);
    if (fallback) {
      resizeObserver.observe(fallback);
    }
    finePointerQuery.addEventListener("change", syncEligibility);
    mobilePreloadQuery.addEventListener("change", handlePreloadMediaChange);
    reducedMotionQuery.addEventListener("change", syncEligibility);
    responsiveStateMachineQuery?.addEventListener("change", handleResponsiveStateMachineChange);
    document.addEventListener("visibilitychange", handleDocumentVisibility);
    trigger?.addEventListener("pointerenter", handlePointerEnter);
    trigger?.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleViewportResize);
    window.addEventListener("orientationchange", handleViewportResize);
    window.addEventListener("pagehide", cleanup, { once: true });
    syncEligibility();
  }
  function getBenefitKey(root) {
    return root.getAttribute("data-benefit-rive")?.trim() || "experience";
  }
  function getMatchingChild(root, selector, attributeName, value) {
    const elements = Array.from(root.querySelectorAll(selector));
    return elements.find((element) => element.getAttribute(attributeName) === value) ?? elements[0] ?? null;
  }
  function getMountElement(root, key) {
    return getMatchingChild(root, MOUNT_SELECTOR, "data-benefit-rive-mount", key) ?? root.querySelector(LEGACY_MOUNT_SELECTOR);
  }
  function getFallbackElement(root, key) {
    return getMatchingChild(root, FALLBACK_SELECTOR, "data-benefit-rive-fallback", key) ?? root.querySelector(LEGACY_FALLBACK_SELECTOR);
  }
  function getTriggerElement(root, key) {
    const closestTrigger = root.closest(TRIGGER_SELECTOR2);
    if (closestTrigger?.getAttribute("data-benefit-rive-trigger") === key) {
      return closestTrigger;
    }
    return Array.from(document.querySelectorAll(TRIGGER_SELECTOR2)).find(
      (trigger) => trigger.getAttribute("data-benefit-rive-trigger") === key
    ) ?? null;
  }
  function prepareFallbackImage(fallback, fallbackMode) {
    if (!fallback) return;
    fallback.setAttribute("aria-hidden", "true");
    if (!(fallback instanceof HTMLImageElement)) return;
    if (!fallback.hasAttribute("alt")) {
      fallback.alt = "";
    }
    if (fallbackMode === "error-only") {
      fallback.setAttribute("loading", "lazy");
      fallback.setAttribute("fetchpriority", "low");
    }
    const hasUsableSource = Boolean(
      fallback.currentSrc.trim() || fallback.getAttribute("src")?.trim()
    );
    if (hasUsableSource) return;
    const fallbackSource = fallback.getAttribute("src-fallback")?.trim();
    if (fallbackSource && isValidUrl(fallbackSource)) {
      fallback.src = fallbackSource;
    }
  }
  function prepareCanvas(mount) {
    const ownedCanvases = Array.from(
      mount.querySelectorAll("canvas[data-benefit-rive-canvas]")
    );
    const canvas = ownedCanvases[0] ?? mount.querySelector("canvas") ?? document.createElement("canvas");
    canvas.dataset.benefitRiveCanvas = "";
    canvas.setAttribute("aria-hidden", "true");
    if (!canvas.parentElement) {
      mount.appendChild(canvas);
    }
    ownedCanvases.slice(1).forEach((duplicateCanvas) => {
      duplicateCanvas.remove();
    });
    return canvas;
  }
  function getOptionalAttribute(root, attributeName) {
    return root.getAttribute(attributeName)?.trim() || null;
  }
  function getCursorPropertyNames(root) {
    const value = root.getAttribute(CURSOR_PROPERTIES_ATTRIBUTE);
    if (!value) return [];
    return Array.from(
      new Set(
        value.split(",").map((propertyName) => propertyName.trim()).filter(Boolean)
      )
    );
  }
  function getPlaybackConfig(root) {
    const explicitPlayback = getOptionalAttribute(root, "data-rive-playback");
    const animationName = getOptionalAttribute(root, "data-rive-animation");
    const stateMachineName = getValidatedRiveAttribute(root, "data-rive-state-machine");
    const desktopStateMachineName = getValidatedRiveAttribute(
      root,
      "data-rive-state-machine-desktop"
    );
    const mobileStateMachineName = getValidatedRiveAttribute(root, "data-rive-state-machine-mobile");
    const artboardName = getOptionalAttribute(root, "data-rive-artboard");
    let mode = null;
    if (explicitPlayback === "animation" || explicitPlayback === "state-machine") {
      mode = explicitPlayback;
    } else if (animationName) {
      mode = "animation";
    } else if (stateMachineName) {
      mode = "state-machine";
    }
    if (!mode || !artboardName) return null;
    if (mode === "animation") {
      if (!animationName) return null;
      return {
        animationName,
        artboardName,
        boundaryPropertyName: root.getAttribute("data-rive-boundary-property")?.trim() || DEFAULT_BOUNDARY_PROPERTY,
        mode,
        viewportThreshold: getViewportThreshold(root)
      };
    }
    if (!stateMachineName) return null;
    const hasResponsiveStateMachine = Boolean(desktopStateMachineName || mobileStateMachineName);
    return {
      artboardName,
      mode,
      ...hasResponsiveStateMachine ? {
        responsiveStateMachine: {
          desktopName: desktopStateMachineName,
          mobileName: mobileStateMachineName,
          query: getValidatedRiveAttribute(root, "data-rive-state-machine-query") ?? DEFAULT_STATE_MACHINE_QUERY
        }
      } : {},
      stateMachineName
    };
  }
  function resolveStateMachineName(config, mediaQuery) {
    if (!config.responsiveStateMachine || !mediaQuery) return config.stateMachineName;
    const responsiveStateMachineName = mediaQuery.matches ? config.responsiveStateMachine.desktopName : config.responsiveStateMachine.mobileName;
    return responsiveStateMachineName ?? config.stateMachineName;
  }
  function getValidatedRiveAttribute(root, attributeName) {
    const value = getOptionalAttribute(root, attributeName);
    if (!value) return null;
    if (value !== attributeName) return value;
    warnMalformedRiveAttribute(root, attributeName);
    return null;
  }
  function warnMalformedRiveAttribute(root, attributeName) {
    if (!isDevelopmentHost2()) return;
    let warnedAttributes = malformedAttributeWarnings.get(root);
    if (!warnedAttributes) {
      warnedAttributes = /* @__PURE__ */ new Set();
      malformedAttributeWarnings.set(root, warnedAttributes);
    }
    if (warnedAttributes.has(attributeName)) return;
    warnedAttributes.add(attributeName);
    console.warn(
      `Benefit Rive: ignoring malformed placeholder ${attributeName}="${attributeName}". Replace it with a real Rive value.`,
      { attributeName, root }
    );
  }
  function getDevicePolicy(root) {
    return root.getAttribute("data-rive-device")?.trim() === "all" ? "all" : "fine-pointer";
  }
  function getActivationMode(root, config) {
    const activation = root.getAttribute("data-rive-activation")?.trim();
    if (activation === "hover-or-viewport") return activation;
    if (activation === "internal") return activation;
    return config.mode === "animation" ? "hover-or-viewport" : "internal";
  }
  function getViewportThreshold(root) {
    const value = Number(root.getAttribute("data-rive-viewport-threshold"));
    if (!Number.isFinite(value) || value <= 0 || value > 1) {
      return DEFAULT_VIEWPORT_THRESHOLD;
    }
    return value;
  }
  function getFallbackMode(root) {
    return root.getAttribute("data-rive-fallback-mode")?.trim() === "error-only" ? "error-only" : "fallback-first";
  }
  function getPreloadMode(root) {
    return root.getAttribute("data-rive-preload")?.trim() === "nearby" ? "nearby" : "default";
  }
  function getNearbyPreloadViewports(root, useMobileDefault) {
    const attributeValue = getOptionalAttribute(root, "data-rive-preload-viewports");
    const defaultValue = useMobileDefault ? DEFAULT_MOBILE_PRELOAD_VIEWPORTS : DEFAULT_DESKTOP_NEARBY_PRELOAD_VIEWPORTS;
    if (!attributeValue) {
      return defaultValue;
    }
    const value = Number(attributeValue);
    if (!Number.isFinite(value)) {
      return defaultValue;
    }
    return clamp3(value, MIN_NEARBY_PRELOAD_VIEWPORTS, MAX_NEARBY_PRELOAD_VIEWPORTS);
  }
  function getPreloadMinScrollViewports(root) {
    const attributeValue = getOptionalAttribute(root, "data-rive-preload-min-scroll-viewports");
    if (!attributeValue) return null;
    const value = Number(attributeValue);
    if (!Number.isFinite(value) || value <= 0) return null;
    return clamp3(value, MIN_NEARBY_PRELOAD_VIEWPORTS, MAX_NEARBY_PRELOAD_VIEWPORTS);
  }
  function getResolvedLayoutConfig(root) {
    const fitValue = root.getAttribute("data-rive-fit")?.trim().toLowerCase();
    const alignmentValue = root.getAttribute("data-rive-alignment")?.trim().toLowerCase();
    const resolvedFit = fitValue ? FIT_MAP[fitValue] ?? DEFAULT_LAYOUT_CONFIG : DEFAULT_LAYOUT_CONFIG;
    const resolvedAlignment = alignmentValue ? ALIGNMENT_MAP[alignmentValue] ?? DEFAULT_LAYOUT_CONFIG : DEFAULT_LAYOUT_CONFIG;
    return {
      alignment: resolvedAlignment.alignment,
      fit: resolvedFit.fit,
      objectFit: resolvedFit.objectFit,
      objectPosition: resolvedAlignment.objectPosition
    };
  }
  function applyLayoutCssVariables(root, layoutConfig) {
    root.style.setProperty("--benefit-rive-object-fit", layoutConfig.objectFit);
    root.style.setProperty("--benefit-rive-object-position", layoutConfig.objectPosition);
  }
  function syncMountToFallbackGeometryBox(root, mount, fallback) {
    if (!fallback || !root.isConnected || !mount.isConnected || !fallback.isConnected || isPendingImage(fallback)) {
      applyFullRootMountGeometry(mount);
      return false;
    }
    const rootRect = root.getBoundingClientRect();
    const fallbackRect = fallback.getBoundingClientRect();
    const rootLayoutWidth = root.offsetWidth || rootRect.width;
    const rootLayoutHeight = root.offsetHeight || rootRect.height;
    const scaleX = rootLayoutWidth > 0 ? rootRect.width / rootLayoutWidth : 1;
    const scaleY = rootLayoutHeight > 0 ? rootRect.height / rootLayoutHeight : 1;
    if (rootRect.width <= 0 || rootRect.height <= 0 || fallbackRect.width <= 0 || fallbackRect.height <= 0 || !Number.isFinite(scaleX) || !Number.isFinite(scaleY) || scaleX <= 0 || scaleY <= 0) {
      applyFullRootMountGeometry(mount);
      return false;
    }
    const left = (fallbackRect.left - rootRect.left) / scaleX;
    const top = (fallbackRect.top - rootRect.top) / scaleY;
    const width = fallbackRect.width / scaleX;
    const height = fallbackRect.height / scaleY;
    if (![left, top, width, height].every(Number.isFinite) || width <= 0 || height <= 0) {
      applyFullRootMountGeometry(mount);
      return false;
    }
    mount.style.left = `${left}px`;
    mount.style.top = `${top}px`;
    mount.style.width = `${width}px`;
    mount.style.height = `${height}px`;
    mount.style.right = "auto";
    mount.style.bottom = "auto";
    return true;
  }
  function applyFullRootMountGeometry(mount) {
    mount.style.left = "0px";
    mount.style.top = "0px";
    mount.style.width = "100%";
    mount.style.height = "100%";
    mount.style.right = "auto";
    mount.style.bottom = "auto";
  }
  function getViewportHeight() {
    return Math.max(window.innerHeight || document.documentElement.clientHeight || 0, 0);
  }
  function getViewportWidth() {
    return Math.max(window.innerWidth || document.documentElement.clientWidth || 0, 0);
  }
  function getCurrentScrollY() {
    return Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop, 0);
  }
  function isElementActuallyVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < getViewportHeight() && rect.right > 0 && rect.left < getViewportWidth();
  }
  function isElementWithinVerticalViewportMargin(element, marginPx) {
    const rect = element.getBoundingClientRect();
    return rect.bottom >= -marginPx && rect.top <= getViewportHeight() + marginPx && rect.right >= 0 && rect.left <= getViewportWidth();
  }
  function clamp3(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  function isPendingImage(element) {
    return element instanceof HTMLImageElement && !element.complete;
  }
  function getLayoutParityMismatch(fallback, mount, canvas) {
    const fallbackRect = getRectSnapshot(fallback);
    const mountRect = getRectSnapshot(mount);
    const canvasRect = getRectSnapshot(canvas);
    if (isRectWithinTolerance(fallbackRect, mountRect) && isRectWithinTolerance(mountRect, canvasRect) && canvasRect.width > 0 && canvasRect.height > 0) {
      return null;
    }
    return {
      canvas: canvasRect,
      fallback: fallbackRect,
      mount: mountRect,
      tolerance: LAYOUT_PARITY_TOLERANCE
    };
  }
  function getRectSnapshot(element) {
    const { height, left, top, width } = element.getBoundingClientRect();
    return { height, left, top, width };
  }
  function isRectWithinTolerance(rect, targetRect) {
    return Math.abs(rect.width - targetRect.width) <= LAYOUT_PARITY_TOLERANCE && Math.abs(rect.height - targetRect.height) <= LAYOUT_PARITY_TOLERANCE && Math.abs(rect.top - targetRect.top) <= LAYOUT_PARITY_TOLERANCE && Math.abs(rect.left - targetRect.left) <= LAYOUT_PARITY_TOLERANCE;
  }
  function isDevelopmentHost2() {
    return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  }
  function isValidUrl(value) {
    try {
      const url = new URL(value, document.baseURI);
      return url.protocol === "https:" || url.protocol === "http:" || url.protocol === "data:";
    } catch {
      return false;
    }
  }
  function applyErrorState(root) {
    root.classList.remove(
      "is-rive-loading",
      "is-rive-ready",
      "is-rive-unavailable",
      "is-rive-visual-ready"
    );
    root.classList.add("is-rive-error");
  }
  function applyUnavailableState(root) {
    root.classList.remove(
      "is-rive-loading",
      "is-rive-ready",
      "is-rive-error",
      "is-rive-visual-ready"
    );
    root.classList.add("is-rive-unavailable");
  }

  // src/init-site.ts
  function initSite() {
    initNavbar();
    initTeamCards();
    initPlanStamp();
    initCallPopover();
    onDomReady(initGavel);
    onDomReady(initOverlayFilterPresets);
    onDomReady(initTsaStatueShine);
    onDomReady(initBenefitShine);
    onDomReady(initAccordions);
    onDomReady(initPracticeTextReels);
    onDomReady(initReadingTime);
    onDomReady(initResourcesFilters);
    initBlogToc();
    onDomReady(initHeroAvatarHover);
    onDomReady(initRelatedArticlesEmptyState);
    onDomReady(initBenefitRive);
  }

  // src/index.ts
  initSite();
})();
//# sourceMappingURL=index.js.map
