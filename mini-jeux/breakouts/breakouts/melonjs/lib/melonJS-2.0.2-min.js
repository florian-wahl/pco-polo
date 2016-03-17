/**
 * @license MelonJS Game Engine
 * @copyright (C) 2011 - 2014 Olivier Biot, Jason Oster, Aaron McLeod
 * http://www.melonjs.org
 *
 * melonJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
if (function () {
        function a() {
            if (!d) {
                if (!document.body)return setTimeout(a, 13);
                document.removeEventListener ? document.removeEventListener("DOMContentLoaded", a, !1) : window.removeEventListener("load", a, !1), d = !0;
                for (var b = 0; b < e.length; b++)e[b].call(window, []);
                e.length = 0, "function" == typeof define && define.amd && define("me", [], function () {
                    return me
                })
            }
        }

        function b() {
            return c ? void 0 : (c = !0, "complete" === document.readyState ? a() : (document.addEventListener && document.addEventListener("DOMContentLoaded", a, !1), void window.addEventListener("load", a, !1)))
        }

        window.me = window.me || {};
        var c = !1, d = !1, e = [];
        window.onReady = function (a) {
            return b(), d ? a.call(window, []) : e.push(function () {
                return a.call(window, [])
            }), this
        }, me.skipAutoInit !== !0 ? window.onReady(function () {
            me.boot()
        }) : me.init = function () {
            me.boot(), a()
        }, window.throttle || (window.throttle = function (a, b, c) {
            var d, e = window.performance.now();
            return "boolean" != typeof b && (b = !1), function () {
                var f = window.performance.now(), g = f - e, h = arguments;
                return a > g ? void(b === !1 && (clearTimeout(d), d = setTimeout(function () {
                    return e = f, c.apply(null, h)
                }, g))) : (e = f, c.apply(null, h))
            }
        }), "undefined" == typeof console && (console = {
            log: function () {
            }, info: function () {
            }, error: function () {
                alert(Array.prototype.slice.call(arguments).join(", "))
            }
        })
    }(), Object.defineProperty || (Object.defineProperty = function (a, b, c) {
        if (!a.__defineGetter__)throw new TypeError("Object.defineProperty not supported");
        c.get && a.__defineGetter__(b, c.get), c.set && a.__defineSetter__(b, c.set)
    }), "function" != typeof Object.create && (Object.create = function (a) {
        var b = function () {
        };
        return b.prototype = a, new b
    }), !Function.prototype.bind) {
    var Empty = function () {
    };
    Function.prototype.bind = function (a) {
        var b = this;
        if ("function" != typeof b)throw new TypeError("Function.prototype.bind called on incompatible " + b);
        var c = Array.prototype.slice.call(arguments, 1), d = function () {
            if (this instanceof d) {
                var e = b.apply(this, c.concat(Array.prototype.slice.call(arguments)));
                return Object(e) === e ? e : this
            }
            return b.apply(a, c.concat(Array.prototype.slice.call(arguments)))
        };
        return b.prototype && (Empty.prototype = b.prototype, d.prototype = new Empty, Empty.prototype = null), d
    }
}
if (function () {
        function a(a, b, c) {
            Object.keys(c).forEach(function (d) {
                if (b[d] = c[d], "function" != typeof c[d])throw new TypeError("extend: Method `" + d + "` is not a function");
                Object.defineProperty(a.prototype, d, {configurable: !0, value: c[d]})
            })
        }

        function b(a, b, c) {
            return a.prototype[b].apply(this, c)
        }

        Object.defineProperty(Object.prototype, "extend", {
            value: function () {
                function c() {
                    return this.init.apply(this, arguments), this
                }

                var d = {}, e = Array.prototype.slice.call(arguments, 0);
                if (c.prototype = Object.create(this.prototype), e.forEach(function (b) {
                        a(c, d, b.__methods__ || b)
                    }), !("init" in c.prototype))throw new TypeError("extend: Class is missing a constructor named `init`");
                return Object.defineProperty(c.prototype, "_super", {value: b}), Object.defineProperty(c, "__methods__", {value: d}), c
            }
        })
    }(), me.Error = Error.extend({
        init: function (a) {
            this.name = "me.Error", this.message = a
        }
    }), Function.prototype.defer = function () {
        return setTimeout(this.bind.apply(this, arguments), .01)
    }, Number.prototype.clamp = function (a, b) {
        return a > this ? a : this > b ? b : +this
    }, Number.prototype.random = function (a, b) {
        return b || (b = a, a = this), ~~(Math.random() * (b - a)) + a
    }, Number.prototype.randomFloat = function (a, b) {
        return b || (b = a, a = this), Math.random() * (b - a) + a
    }, Number.prototype.weightedRandom = function (a, b) {
        return b || (b = a, a = this), ~~(Math.pow(Math.random(), 2) * (b - a)) + a
    }, Number.prototype.round = function (a, b) {
        a = arguments.length < 2 ? this : a;
        var c = Math.pow(10, b || a || 0);
        return ~~(.5 + a * c) / c
    }, Number.prototype.toHex = function () {
        return "0123456789ABCDEF".charAt(this - this % 16 >> 4) + "0123456789ABCDEF".charAt(this % 16)
    }, Number.prototype.sign = function () {
        return 0 > this ? -1 : this > 0 ? 1 : 0
    }, Number.prototype.degToRad = function (a) {
        return (a || this) / 180 * Math.PI
    }, Number.prototype.radToDeg = function (a) {
        return (a || this) * (180 / Math.PI)
    }, String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/gm, "")
    }), String.prototype.trimLeft || (String.prototype.trimLeft = function () {
        return this.replace(/^\s+/, "")
    }), String.prototype.trimRight || (String.prototype.trimRight = function () {
        return this.replace(/\s+$/, "")
    }), String.prototype.isNumeric = function () {
        return !isNaN(this) && "" !== this.trim()
    }, String.prototype.isBoolean = function () {
        var a = this.trim();
        return "true" === a || "false" === a
    }, String.prototype.contains || (String.prototype.contains = function (a, b) {
        return -1 !== String.prototype.indexOf.call(this, a, b)
    }), String.prototype.toHex = function () {
        for (var a = "", b = 0; b < this.length;)a += this.charCodeAt(b++).toString(16);
        return a
    }, Array.prototype.remove = function (a) {
        var b = Array.prototype.indexOf.call(this, a);
        return -1 !== b && Array.prototype.splice.call(this, b, 1), this
    }, Array.prototype.forEach || (Array.prototype.forEach = function (a, b) {
        for (var c = 0, d = this.length; d--; c++)a.call(b || this, this[c], c, this)
    }), Array.isArray || (Array.isArray = function (a) {
        var b;
        return b = a instanceof Array
    }), Array.prototype.random = function (a) {
        return a[0..random(a.length)]
    }, Array.prototype.weightedRandom = function (a) {
        return a[0..weightedRandom(a.length)]
    }, me.TypedArray = function (a) {
        var b = 0;
        if (Array.isArray(a))for (b = 0; b < a.length; b++)this.push(a[b]); else {
            if (1 !== arguments.length || "number" != typeof a)throw new me.Error("TypedArray polyfill: Unsupported constructor arguments", arguments);
            for (b = 0; a > b; b++)this.push(0)
        }
    }, me.TypedArray.prototype = Array.prototype, window.Float32Array = window.Float32Array || me.TypedArray, window.Uint16Array = window.Uint16Array || me.TypedArray, window.Uint32Array = window.Uint32Array || me.TypedArray, "undefined" == typeof window.performance && (window.performance = {}), "undefined" == typeof Date.now && (Date.now = function () {
        return (new Date).getTime()
    }), !window.performance.now) {
    var timeOffset = Date.now();
    window.performance.timing && window.performance.timing.navigationStart && (timeOffset = window.performance.timing.navigationStart), window.performance.now = function () {
        return Date.now() - timeOffset
    }
}
!function () {
    me.mod = "melonJS", me.version = "2.0.2", me.sys = {
        fps: 60,
        interpolation: !1,
        scale: null,
        scalingInterpolation: !1,
        gravity: void 0,
        stopOnAudioError: !0,
        pauseOnBlur: !0,
        resumeOnFocus: !0,
        stopOnBlur: !1,
        preRender: !1,
        checkVersion: function (a, b) {
            b = b || me.version;
            for (var c = a.split("."), d = b.split("."), e = Math.min(c.length, d.length), f = 0, g = 0; e > g && !(f = +c[g] - +d[g]); g++);
            return f ? f : c.length - d.length
        }
    };
    var a = !1;
    Object.defineProperty(me, "initialized", {
        get: function () {
            return a
        }
    }), me.boot = function () {
        a || (me.device._check(), me.save._init(), me.loader.setNocache(document.location.href.match(/\?nocache/) || !1), me.timer.init(), me.mapReader = new me.TMXMapReader, me.state.init(), me.pool.init(), me.device.isMobile === !1 && me.input._enableKeyboardEvent(), me.levelDirector.reset(), a = !0)
    }
}(), function () {
    me.game = function () {
        var a = {}, b = !1, c = !0, d = 0, e = 1, f = null;
        return a.viewport = null, a.currentLevel = null, a.world = null, a.mergeGroup = !0, a.sortOn = "z", a.tmxRenderer = null, a.onLevelLoaded = null, a.init = function (d, e) {
            b || (d = d || me.video.renderer.getWidth(), e = e || me.video.renderer.getHeight(), a.viewport = new me.Viewport(0, 0, d, e), a.world = new me.Container(0, 0, d, e), a.world.name = "rootContainer", me.collision.init(), f = me.video.renderer, me.event.publish(me.event.GAME_INIT), me.input._translatePointerEvents(), c = !0, a.currentLevel = {
                pos: {
                    x: 0,
                    y: 0
                }
            }, b = !0)
        }, a.reset = function () {
            me.collision.quadTree.clear(), a.world.destroy(), a.viewport && a.viewport.reset(), a.currentLevel = {
                pos: {
                    x: 0,
                    y: 0
                }
            }, f.resetTransform(), d = 0, e = ~~(.5 + 60 / me.sys.fps)
        }, a.getParentContainer = function (a) {
            return a.ancestor
        }, a.repaint = function () {
            c = !0
        }, a.update = function (b) {
            ++d % e === 0 && (d = 0, me.timer.update(b), me.collision.quadTree.clear(), me.collision.quadTree.insertContainer(a.world), c = a.world.update(me.timer.getDelta()) || c, c = a.viewport.update(me.timer.getDelta()) || c)
        }, a.draw = function () {
            if (c) {
                var b = a.viewport.pos.x + ~~a.viewport.offset.x, d = a.viewport.pos.y + ~~a.viewport.offset.y;
                a.world.transform.translate(-b, -d), a.viewport.screenX = b - a.currentLevel.pos.x, a.viewport.screenY = d - a.currentLevel.pos.y, a.world.draw(f, a.viewport), a.world.transform.translate(b, d), a.viewport.draw(f)
            }
            c = !1, me.video.renderer.blitSurface()
        }, a
    }()
}(), function () {
    var a = function (a) {
        return a.substring(0, 1).toUpperCase() + a.substring(1, a.length)
    };
    me.agent = function () {
        var b = {}, c = ["ms", "MS", "moz", "webkit", "o"];
        return b.prefixed = function (b, d) {
            if (d = d || window, b in d)return d[b];
            var e, f = a(b);
            return c.some(function (a) {
                var b = a + f;
                return e = b in d ? d[b] : void 0
            }), e
        }, b.setPrefixed = function (b, d, e) {
            if (e = e || window, b in e)return void(e[b] = d);
            var f = a(b);
            c.some(function (a) {
                var b = a + f;
                return b in e ? (e[b] = d, !0) : !1
            })
        }, b
    }()
}(), function () {
    me.device = function () {
        function a(a) {
            a.reading ? (c.accelerationX = a.reading.accelerationX, c.accelerationY = a.reading.accelerationY, c.accelerationZ = a.reading.accelerationZ) : (c.accelerationX = a.accelerationIncludingGravity.x, c.accelerationY = a.accelerationIncludingGravity.y, c.accelerationZ = a.accelerationIncludingGravity.z)
        }

        function b(a) {
            c.gamma = a.gamma, c.beta = a.beta, c.alpha = a.alpha
        }

        var c = {}, d = !1, e = !1, f = null;
        return c._check = function () {
            me.device._detectDevice(), me.device.pointerEnabled = me.agent.prefixed("pointerEnabled", navigator), navigator.maxTouchPoints = me.agent.prefixed("maxTouchPoints", navigator) || 0, window.gesture = me.agent.prefixed("gesture"), me.device.touch = "createTouch" in document || "ontouchstart" in window || navigator.isCocoonJS || me.device.pointerEnabled && navigator.maxTouchPoints > 0, me.device.hasAccelerometer = "undefined" != typeof window.DeviceMotionEvent || "undefined" != typeof window.Windows && "function" == typeof Windows.Devices.Sensors.Accelerometer, this.hasPointerLockSupport = me.agent.prefixed("pointerLockElement", document), this.hasPointerLockSupport && (document.exitPointerLock = me.agent.prefixed("exitPointerLock", document)), window.DeviceOrientationEvent && (me.device.hasDeviceOrientation = !0), this.hasFullscreenSupport = me.agent.prefixed("fullscreenEnabled", document) || document.mozFullScreenEnabled, document.exitFullscreen = me.agent.prefixed("cancelFullScreen", document) || me.agent.prefixed("exitFullscreen", document), navigator.vibrate = me.agent.prefixed("vibrate", navigator);
            try {
                c.localStorage = !!window.localStorage
            } catch (a) {
                c.localStorage = !1
            }
            window.addEventListener("blur", function () {
                me.sys.stopOnBlur && me.state.stop(!0), me.sys.pauseOnBlur && me.state.pause(!0)
            }, !1), window.addEventListener("focus", function () {
                me.sys.stopOnBlur && me.state.restart(!0), me.sys.resumeOnFocus && me.state.resume(!0)
            }, !1);
            var b, d;
            "undefined" != typeof document.hidden ? (b = "hidden", d = "visibilitychange") : "undefined" != typeof document.mozHidden ? (b = "mozHidden", d = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (b = "msHidden", d = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (b = "webkitHidden", d = "webkitvisibilitychange"), "string" == typeof d && document.addEventListener(d, function () {
                document[b] ? (me.sys.stopOnBlur && me.state.stop(!0), me.sys.pauseOnBlur && me.state.pause(!0)) : (me.sys.stopOnBlur && me.state.restart(!0), me.sys.resumeOnFocus && me.state.resume(!0))
            }, !1)
        }, c._detectDevice = function () {
            me.device.iOS = me.device.ua.match(/iPhone|iPad|iPod/i) || !1, me.device.android = me.device.ua.match(/Android/i) || !1, me.device.android2 = me.device.ua.match(/Android 2/i) || !1, me.device.wp = me.device.ua.match(/Windows Phone/i) || !1, me.device.BlackBerry = me.device.ua.match(/BlackBerry/i) || !1, me.device.Kindle = me.device.ua.match(/Kindle|Silk.*Mobile Safari/i) || !1, me.device.isMobile = me.device.ua.match(/Mobi/i) || me.device.iOS || me.device.android || me.device.wp || me.device.BlackBerry || me.device.Kindle || me.device.iOS || !1
        }, c.ua = navigator.userAgent, c.localStorage = !1, c.hasAccelerometer = !1, c.hasDeviceOrientation = !1, c.hasFullscreenSupport = !1, c.hasPointerLockSupport = !1, c.nativeBase64 = "function" == typeof window.atob, c.touch = !1, c.isMobile = !1, c.iOS = !1, c.android = !1, c.android2 = !1, c.wp = !1, c.BlackBerry = !1, c.Kindle = !1, c.orientation = 0, c.accelerationX = 0, c.accelerationY = 0, c.accelerationZ = 0, c.gamma = 0, c.beta = 0, c.alpha = 0, c.requestFullscreen = function (a) {
            this.hasFullscreenSupport && (a = a || me.video.getWrapper(), a.requestFullscreen = me.agent.prefixed("requestFullscreen", a) || a.mozRequestFullScreen, a.requestFullscreen())
        }, c.exitFullscreen = function () {
            this.hasFullscreenSupport && document.exitFullscreen()
        }, c.getPixelRatio = function () {
            if (null === f) {
                var a;
                a = "undefined" != typeof me.video.renderer ? me.video.renderer.getScreenContext() : me.CanvasRenderer.getContext2d(document.createElement("canvas"));
                var b = window.devicePixelRatio || 1, c = me.agent.prefixed("backingStorePixelRatio", a) || 1;
                f = b / c
            }
            return f
        }, c.getStorage = function (a) {
            switch (a = a || "local") {
                case"local":
                    return me.save;
                default:
                    throw new me.Error("storage type " + a + " not supported")
            }
        }, c.turnOnPointerLock = function () {
            if (this.hasPointerLockSupport) {
                var a = me.video.getWrapper();
                if (me.device.ua.match(/Firefox/i)) {
                    var b = function () {
                        (me.agent.prefixed("fullscreenElement", document) || document.mozFullScreenElement) === a && (document.removeEventListener("fullscreenchange", b), document.removeEventListener("mozfullscreenchange", b), a.requestPointerLock = me.agent.prefixed("requestPointerLock", a), a.requestPointerLock())
                    };
                    document.addEventListener("fullscreenchange", b, !1), document.addEventListener("mozfullscreenchange", b, !1), me.device.requestFullscreen()
                } else a.requestPointerLock()
            }
        }, c.turnOffPointerLock = function () {
            this.hasPointerLockSupport && document.exitPointerLock()
        }, c.watchAccelerometer = function () {
            if (me.device.hasAccelerometer) {
                if (!d) {
                    if ("undefined" == typeof Windows)window.addEventListener("devicemotion", a, !1); else {
                        var b = Windows.Devices.Sensors.Accelerometer.getDefault();
                        if (b) {
                            var c = b.minimumReportInterval, e = c >= 16 ? c : 25;
                            b.reportInterval = e, b.addEventListener("readingchanged", a, !1)
                        }
                    }
                    d = !0
                }
                return !0
            }
            return !1
        }, c.unwatchAccelerometer = function () {
            if (d) {
                if ("undefined" == typeof Windows)window.removeEventListener("devicemotion", a, !1); else {
                    var b = Windows.Device.Sensors.Accelerometer.getDefault();
                    b.removeEventListener("readingchanged", a, !1)
                }
                d = !1
            }
        }, c.watchDeviceOrientation = function () {
            return me.device.hasDeviceOrientation && !e && (window.addEventListener("deviceorientation", b, !1), e = !0), !1
        }, c.unwatchDeviceOrientation = function () {
            e && (window.removeEventListener("deviceorientation", b, !1), e = !1)
        }, c.vibrate = function (a) {
            navigator.vibrate && navigator.vibrate(a)
        }, c
    }(), Object.defineProperty(me.device, "isFullscreen", {
        get: function () {
            if (me.device.hasFullscreenSupport) {
                var a = me.agent.prefixed("fullscreenElement", document) || document.mozFullScreenElement;
                return a === me.video.getWrapper()
            }
            return !1
        }
    }), Object.defineProperty(me.device, "sound", {
        get: function () {
            return !Howler.noAudio
        }
    })
}(), function () {
    me.timer = function () {
        var a = {}, b = 0, c = 0, d = 0, e = 0, f = 0, g = Math.ceil(1e3 / me.sys.fps), h = 1e3 / me.sys.fps * 1.25, i = [], j = 0, k = function (a) {
            for (var b = 0, c = i.length; c > b; b++)if (i[b].timerId === a) {
                i.splice(b, 1);
                break
            }
        }, l = function (a) {
            for (var b = 0, c = i.length; c > b; b++) {
                var d = i[b];
                d.pauseable && me.state.isPaused() || (d.elapsed += a), d.elapsed >= d.delay && (d.func.apply(this), d.repeat === !0 ? d.elapsed -= d.delay : me.timer.clearTimeout(d.timerId))
            }
        };
        return a.tick = 1, a.fps = 0, a.init = function () {
            a.reset(), e = d = 0
        }, a.reset = function () {
            d = e = window.performance.now(), f = 0, c = 0, b = 0
        }, a.setTimeout = function (a, b, c) {
            return i.push({func: a, delay: b, elapsed: 0, repeat: !1, timerId: ++j, pauseable: c === !0 || !0}), j
        }, a.setInterval = function (a, b, c) {
            return i.push({func: a, delay: b, elapsed: 0, repeat: !0, timerId: ++j, pauseable: c === !0 || !0}), j
        }, a.clearTimeout = function (a) {
            k.defer(this, a)
        }, a.clearInterval = function (a) {
            k.defer(this, a)
        }, a.getTime = function () {
            return e
        }, a.getDelta = function () {
            return f
        }, a.countFPS = function () {
            b++, c += f, b % 10 === 0 && (this.fps = (~~(1e3 * b / c)).clamp(0, me.sys.fps), c = 0, b = 0)
        }, a.update = function (b) {
            return d = e, e = b, f = e - d, a.tick = f > h && me.sys.interpolation ? f / g : 1, l(f), f
        }, a
    }()
}(), function () {
    me.pool = function () {
        var a = {}, b = {};
        return a.init = function () {
            a.register("me.Entity", me.Entity), a.register("me.CollectableEntity", me.CollectableEntity), a.register("me.LevelEntity", me.LevelEntity), a.register("TileObject", me.Sprite), a.register("me.Tween", me.Tween, !0), a.register("me.Color", me.Color, !0), a.register("me.Particle", me.Particle, !0)
        }, a.register = function (a, c, d) {
            return d ? void(b[a.toLowerCase()] = {"class": c, pool: []}) : void(b[a.toLowerCase()] = {
                "class": c,
                pool: void 0
            })
        }, a.pull = function (a) {
            var c = "string" == typeof a ? a.toLowerCase() : void 0, d = Array.prototype.slice.call(arguments);
            if (c && b[c]) {
                var e;
                if (!b[c].pool)return e = b[c]["class"], d[0] = e, new (e.bind.apply(e, d));
                var f, g = b[c];
                return e = g["class"], g.pool.length > 0 ? (f = g.pool.pop(), "function" == typeof f.init && f.init.apply(f, d.slice(1)), "function" == typeof f.onResetEvent && f.onResetEvent.apply(f, d.slice(1))) : (d[0] = e, f = new (e.bind.apply(e, d)), f.className = c), f
            }
            return c && console.error("Cannot instantiate entity of type '" + a + "': Class not found!"), null
        }, a.purge = function () {
            for (var a in b)b.hasOwnProperty(a) && (b[a].pool = [])
        }, a.push = function (a) {
            var c = a.className;
            "undefined" != typeof c && b[c] && b[c].pool.push(a)
        }, a
    }()
}(), function () {
    me.Vector2d = Object.extend({
        init: function (a, b) {
            return this.set(a || 0, b || 0)
        }, set: function (a, b) {
            if (a !== +a || b !== +b)throw new me.Vector2d.Error("invalid x,y parameters (not a number)");
            return this.x = a, this.y = b, this
        }, setZero: function () {
            return this.set(0, 0)
        }, setV: function (a) {
            return this.x = a.x, this.y = a.y, this
        }, add: function (a) {
            return this.x += a.x, this.y += a.y, this
        }, sub: function (a) {
            return this.x -= a.x, this.y -= a.y, this
        }, scale: function (a, b) {
            return this.x *= a, this.y *= "undefined" != typeof b ? b : a, this
        }, scaleV: function (a) {
            return this.x *= a.x, this.y *= a.y, this
        }, div: function (a) {
            return this.x /= a, this.y /= a, this
        }, abs: function () {
            return this.x < 0 && (this.x = -this.x), this.y < 0 && (this.y = -this.y), this
        }, clamp: function (a, b) {
            return new me.Vector2d(this.x.clamp(a, b), this.y.clamp(a, b))
        }, clampSelf: function (a, b) {
            return this.x = this.x.clamp(a, b), this.y = this.y.clamp(a, b), this
        }, minV: function (a) {
            return this.x = this.x < a.x ? this.x : a.x, this.y = this.y < a.y ? this.y : a.y, this
        }, maxV: function (a) {
            return this.x = this.x > a.x ? this.x : a.x, this.y = this.y > a.y ? this.y : a.y, this
        }, floor: function () {
            return new me.Vector2d(~~this.x, ~~this.y)
        }, floorSelf: function () {
            return this.x = ~~this.x, this.y = ~~this.y, this
        }, ceil: function () {
            return new me.Vector2d(Math.ceil(this.x), Math.ceil(this.y))
        }, ceilSelf: function () {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        }, negate: function () {
            return new me.Vector2d(-this.x, -this.y)
        }, negateSelf: function () {
            return this.x = -this.x, this.y = -this.y, this
        }, copy: function (a) {
            return this.x = a.x, this.y = a.y, this
        }, equals: function (a) {
            return this.x === a.x && this.y === a.y
        }, normalize: function () {
            var a = this.length();
            return a > 0 && (this.x = this.x / a, this.y = this.y / a), this
        }, perp: function () {
            var a = this.x;
            return this.x = this.y, this.y = -a, this
        }, rotate: function (a) {
            var b = this.x, c = this.y;
            return this.x = b * Math.cos(a) - c * Math.sin(a), this.y = b * Math.sin(a) + c * Math.cos(a), this
        }, reverse: function () {
            return this.x = -this.x, this.y = -this.y, this
        }, dotProduct: function (a) {
            return this.x * a.x + this.y * a.y
        }, length2: function () {
            return this.dotProduct(this)
        }, length: function () {
            return Math.sqrt(this.length2())
        }, distance: function (a) {
            return Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y))
        }, angle: function (a) {
            return Math.atan2(a.y - this.y, a.x - this.x)
        }, project: function (a) {
            var b = this.dotProduct(a) / a.length2();
            return this.x = b * a.x, this.y = b * a.y, this
        }, projectN: function (a) {
            var b = this.dotProduct(a);
            return this.x = b * a.x, this.y = b * a.y, this
        }, reflect: function (a) {
            var b = this.x, c = this.y;
            return this.project(a).scale(2), this.x -= b, this.y -= c, this
        }, reflectN: function (a) {
            var b = this.x, c = this.y;
            return this.projectN(a).scale(2), this.x -= b, this.y -= c, this
        }, clone: function () {
            return new me.Vector2d(this.x, this.y)
        }, toString: function () {
            return "x:" + this.x + ",y:" + this.y
        }
    }), me.Vector2d.Error = me.Error.extend({
        init: function (a) {
            me.Error.prototype.init.apply(this, [a]), this.name = "me.Vector2d.Error"
        }
    })
}(), function () {
    me.Rect = Object.extend({
        init: function (a, b, c, d) {
            this.pos = new me.Vector2d(a, b), this.width = c, this.height = d, this.shapeType = "Rectangle"
        }, setShape: function (a, b, c, d) {
            return this.pos.set(a, b), this.resize(c, d), this
        }, resize: function (a, b) {
            return this.width = a, this.height = b, this
        }, getBounds: function () {
            return this
        }, updateBounds: function () {
            return this
        }, clone: function () {
            return new me.Rect(this.pos.x, this.pos.y, this.width, this.height)
        }, copy: function (a) {
            return this.setShape(a.pos.x, a.pos.y, a.width, a.height)
        }, translate: function (a, b) {
            return this.pos.x += a, this.pos.y += b, this
        }, translateV: function (a) {
            return this.translate(a.x, a.y)
        }, union: function (a) {
            var b = Math.min(this.left, a.left), c = Math.min(this.top, a.top);
            return this.resize(Math.max(this.right, a.right) - b, Math.max(this.bottom, a.bottom) - c), this.pos.set(b, c), this
        }, overlaps: function (a) {
            return this.left < a.right && a.left < this.right && this.top < a.bottom && a.top < this.bottom
        }, contains: function (a) {
            return a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom
        }, containsPointV: function (a) {
            return this.containsPoint(a.x, a.y)
        }, containsPoint: function (a, b) {
            return a >= this.left && a <= this.right && b >= this.top && b <= this.bottom
        }, toPolygon: function () {
            var a = this.pos, b = this.width, c = this.height;
            return new me.Polygon(a.x, a.y, [new me.Vector2d, new me.Vector2d(b, 0), new me.Vector2d(b, c), new me.Vector2d(0, c)])
        }
    }), Object.defineProperty(me.Rect.prototype, "left", {
        get: function () {
            return this.pos.x
        }, configurable: !0
    }), Object.defineProperty(me.Rect.prototype, "right", {
        get: function () {
            return this.pos.x + this.width || this.width
        }, configurable: !0
    }), Object.defineProperty(me.Rect.prototype, "top", {
        get: function () {
            return this.pos.y
        }, configurable: !0
    }), Object.defineProperty(me.Rect.prototype, "bottom", {
        get: function () {
            return this.pos.y + this.height || this.height
        }, configurable: !0
    })
}(), function () {
    me.Ellipse = Object.extend({
        init: function (a, b, c, d) {
            this.pos = new me.Vector2d, this.bounds = void 0, this.radius = 0 / 0, this.radiusV = new me.Vector2d, this.radiusSq = new me.Vector2d, this.ratio = new me.Vector2d, this.shapeType = "Ellipse", this.setShape(a, b, c, d)
        }, setShape: function (a, b, c, d) {
            var e = c / 2, f = d / 2;
            this.pos.set(a, b), this.radius = Math.max(e, f), this.ratio.set(e / this.radius, f / this.radius), this.radiusV.set(this.radius, this.radius).scaleV(this.ratio);
            var g = this.radius * this.radius;
            return this.radiusSq.set(g, g).scaleV(this.ratio), this.updateBounds(), this
        }, rotate: function () {
            return this
        }, scale: function (a, b) {
            return b = "undefined" != typeof b ? b : a, this.setShape(this.pos.x, this.pos.y, 2 * this.radiusV.x * a, 2 * this.radiusV.y * b)
        }, scaleV: function (a) {
            return this.scale(a.x, a.y)
        }, translate: function (a, b) {
            return this.pos.x += a, this.pos.y += b, this.bounds.translate(a, b), this
        }, translateV: function (a) {
            return this.pos.add(a), this.bounds.translateV(a), this
        }, containsPointV: function (a) {
            return this.containsPoint(a.x, a.y)
        }, containsPoint: function (a, b) {
            return a -= this.pos.x, b -= this.pos.y, a * a / this.radiusSq.x + b * b / this.radiusSq.y <= 1
        }, getBounds: function () {
            return this.bounds
        }, updateBounds: function () {
            var a = this.radiusV.x, b = this.radiusV.y, c = this.pos.x - a, d = this.pos.y - b, e = 2 * a, f = 2 * b;
            return this.bounds ? this.bounds.setShape(c, d, e, f) : this.bounds = new me.Rect(c, d, e, f), this.bounds
        }, clone: function () {
            return new me.Ellipse(this.pos.x, this.pos.y, 2 * this.radiusV.x, 2 * this.radiusV.y)
        }
    })
}(), function () {
    me.Polygon = Object.extend({
        init: function (a, b, c) {
            this.pos = new me.Vector2d, this.bounds = void 0, this.points = null, this.shapeType = "Polygon", this.setShape(a, b, c)
        }, setShape: function (a, b, c) {
            return this.pos.set(a, b), this.points = c, this.recalc(), this.updateBounds(), this
        }, rotate: function (a) {
            if (0 !== a) {
                for (var b = this.points, c = b.length, d = 0; c > d; d++)b[d].rotate(a);
                this.recalc(), this.updateBounds()
            }
            return this
        }, scale: function (a, b) {
            b = "undefined" != typeof b ? b : a;
            for (var c = this.points, d = c.length, e = 0; d > e; e++)c[e].scale(a, b);
            return this.recalc(), this.updateBounds(), this
        }, scaleV: function (a) {
            return this.scale(a.x, a.y)
        }, recalc: function () {
            var a, b = this.edges = [], c = this.normals = [], d = this.points, e = d.length;
            if (3 > e)throw new me.Polygon.Error("Requires at least 3 points");
            for (a = 0; e > a; a++) {
                var f = (new me.Vector2d).copy(d[(a + 1) % e]).sub(d[a]);
                b.push(f), c.push((new me.Vector2d).copy(f).perp().normalize())
            }
            return this
        }, translate: function (a, b) {
            return this.pos.x += a, this.pos.y += b, this.bounds.translate(a, b), this
        }, translateV: function (a) {
            return this.pos.add(a), this.bounds.translateV(a), this
        }, containsPointV: function (a) {
            return this.containsPoint(a.x, a.y)
        }, containsPoint: function (a, b) {
            for (var c = !1, d = this.pos.x, e = this.pos.y, f = this.points, g = f.length, h = 0, i = g - 1; g > h; i = h++) {
                var j = f[h].y + e, k = f[h].x + d, l = f[i].y + e, m = f[i].x + d;
                j > b != l > b && (m - k) * (b - j) / (l - j) + k > a && (c = !c)
            }
            return c
        }, getBounds: function () {
            return this.bounds
        }, updateBounds: function () {
            var a = 1 / 0, b = 1 / 0, c = -1 / 0, d = -1 / 0;
            return this.points.forEach(function (e) {
                a = Math.min(a, e.x), b = Math.min(b, e.y), c = Math.max(c, e.x), d = Math.max(d, e.y)
            }), this.bounds ? this.bounds.setShape(a, b, c - a, d - b) : this.bounds = new me.Rect(a, b, c - a, d - b), this.bounds.translateV(this.pos)
        }, clone: function () {
            var a = [];
            return this.points.forEach(function (b) {
                a.push(new me.Vector2d(b.x, b.y))
            }), new me.Polygon(this.pos.x, this.pos.y, a)
        }
    }), me.Polygon.Error = me.Error.extend({
        init: function (a) {
            me.Error.prototype.init.apply(this, [a]), this.name = "me.Polygon.Error"
        }
    })
}(), function () {
    me.Line = me.Polygon.extend({
        containsPointV: function (a) {
            return this.containsPoint(a.x, a.y)
        }, containsPoint: function (a, b) {
            a -= this.pos.x, b -= this.pos.y;
            var c = this.points[0], d = this.points[1];
            return (b - c.y) * (d.x - c.x) === (d.y - c.y) * (a - c.x)
        }, recalc: function () {
            var a = this.edges = [], b = this.normals = [], c = this.points;
            if (2 !== c.length)throw new me.Line.Error("Requires exactly 2 points");
            var d = (new me.Vector2d).copy(c[1]).sub(c[0]);
            return a.push(d), b.push((new me.Vector2d).copy(d).perp().normalize()), this
        }
    }), me.Line.Error = me.Error.extend({
        init: function (a) {
            me.Error.prototype.init.apply(this, [a]), this.name = "me.Line.Error"
        }
    })
}(), function () {
    me.Matrix2d = Object.extend({
        init: function (a) {
            this.val = new Float32Array(6), a ? this.copy(a) : this.identity()
        }, identity: function () {
            return this.set(1, 0, 0, 1, 0, 0), this
        }, set: function () {
            var a = this.val;
            return a[0] = arguments[0], a[1] = arguments[1], a[2] = arguments[2], a[3] = arguments[3], a[4] = arguments[4], a[5] = arguments[5], this
        }, multiply: function (a) {
            var b = this.val, c = a.val, d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], i = b[5], j = c[0], k = c[1], l = c[2], m = c[3], n = c[4], o = c[5];
            return b[0] = d * j + f * k, b[1] = e * j + g * k, b[2] = d * l + f * m, b[3] = e * l + g * m, b[4] = d * n + f * o + h, b[5] = e * n + g * o + i, this
        }, scale: function (a, b) {
            var c = this.val;
            return c[0] *= a, c[1] *= a, c[2] *= b, c[3] *= b, this
        }, rotate: function (a) {
            if (0 !== a) {
                var b = this.val, c = b[0], d = b[1], e = b[2], f = b[3], g = Math.sin(a), h = Math.cos(a);
                b[0] = c * h + e * g, b[1] = d * h + f * g, b[2] = c * -g + e * h, b[3] = d * -g + f * h
            }
            return this
        }, translate: function (a, b) {
            var c = this.val;
            return c[4] += a, c[5] += b, this
        }, translateV: function (a) {
            return this.translate(a.x, a.y)
        }, isIdentity: function () {
            var a = this.val;
            return 1 === a[0] && 0 === a[1] && 0 === a[2] && 1 === a[3] && 0 === a[4] && 0 === a[5]
        }, clone: function () {
            return new me.Matrix2d(this)
        }, toString: function () {
            var a = this.val;
            return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")"
        }
    })
}(), function () {
    me.Matrix3d = Object.extend({
        init: function (a) {
            this.val = new Float32Array(9), a ? this.copy(a) : this.identity()
        }, adjoint: function () {
            var a = this.val, b = a[0], c = a[1], d = a[2], e = a[3], f = a[4], g = a[5], h = a[6], i = a[7], j = a[8];
            return a[0] = f * j - g * i, a[1] = d * i - c * j, a[2] = c * g - d * f, a[3] = g * h - e * j, a[4] = b * j - d * h, a[5] = d * e - b * g, a[6] = e * i - f * h, a[7] = c * h - b * i, a[8] = b * f - c * e, this
        }, isIdentity: function () {
            var a = this.val;
            return 1 === a[0] && 0 === a[1] && 0 === a[2] && 0 === a[3] && 1 === a[4] && 0 === a[5] && 0 === a[6] && 0 === a[7] && 1 === a[8]
        }, clone: function () {
            return new me.Matrix3d(this)
        }, copy: function (a) {
            var b = this.val, c = a.val;
            return b[0] = c[0], b[1] = c[1], b[2] = c[2], b[3] = c[3], b[4] = c[4], b[5] = c[5], b[6] = c[6], b[7] = c[7], b[8] = c[8], this
        }, determinant: function () {
            var a = this.val, b = a[0], c = a[1], d = a[2], e = a[3], f = a[4], g = a[5], h = a[6], i = a[7], j = a[8];
            return b * (j * f - g * i) + c * (-j * e + g * h) + d * (i * e - f * h)
        }, identity: function () {
            var a = this.val;
            return a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 1, a[5] = 0, a[6] = 0, a[7] = 0, a[8] = 1, this
        }, invert: function () {
            var a = this.val, b = a[0], c = a[1], d = a[2], e = a[3], f = a[4], g = a[5], h = a[6], i = a[7], j = a[8], k = j * f - g * i, l = -j * e + g * h, m = i * e - f * h, n = b * k + c * l + d * m;
            return n ? (n = 1 / n, a[0] = k * n, a[1] = (-j * c + d * i) * n, a[2] = (g * c - d * f) * n, a[3] = l * n, a[4] = (j * b - d * h) * n, a[5] = (-g * b + d * e) * n, a[6] = m * n, a[7] = (-i * b + c * h) * n, a[8] = (f * b - c * e) * n, this) : null
        }, multiply: function (a) {
            return this.multiplyArray(a.val)
        }, multiplyArray: function (a) {
            var b = this.val, c = a, d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], i = b[5], j = b[6], k = b[7], l = b[8], m = c[0], n = c[1], o = c[2], p = c[3], q = c[4], r = c[5], s = c[6], t = c[7], u = c[8];
            return b[0] = m * d + n * g + o * j, b[1] = m * e + n * h + o * k, b[2] = m * f + n * i + o * l, b[3] = p * d + q * g + r * j, b[4] = p * e + q * h + r * k, b[5] = p * f + q * i + r * l, b[6] = s * d + t * g + u * j, b[7] = s * e + t * h + u * k, b[8] = s * f + t * i + u * l, this
        }, rotate: function (a) {
            var b = this.val, c = b[0], d = b[1], e = b[2], f = b[3], g = b[4], h = b[5], i = Math.sin(a), j = Math.cos(a);
            return b[0] = j * c + i * f, b[1] = j * d + i * g, b[2] = j * e + i * h, b[3] = j * f - i * c, b[4] = j * g - i * d, b[5] = j * h - i * e, this
        }, scale: function (a, b) {
            var c = this.val;
            return c[0] = a * c[0], c[1] = a * c[1], c[2] = a * c[2], c[3] = b * c[3], c[4] = b * c[4], c[5] = b * c[5], this
        }, set: function () {
            var a = this.val;
            return a[0] = arguments[0], a[1] = arguments[1], a[2] = arguments[2], a[3] = arguments[3], a[4] = arguments[4], a[5] = arguments[5], a[6] = arguments[6], a[7] = arguments[7], a[8] = arguments[8], this
        }, translate: function (a, b) {
            var c = this.val;
            return c[6] = a * c[0] + b * c[3] + c[6], c[7] = a * c[1] + b * c[4] + c[7], c[8] = a * c[2] + b * c[5] + c[8], this
        }, translateV: function (a) {
            return this.translate(a.x, a.y)
        }, transform: function (a, b, c, d, e, f) {
            var g = this.val;
            return g[0] = a, g[1] = c, g[2] = e, g[3] = b, g[4] = d, g[5] = f, g[6] = 0, g[7] = 0, g[8] = 1, this
        }, transpose: function () {
            var a = this.val, b = a[1], c = a[2], d = a[5];
            return a[1] = a[3], a[2] = a[6], a[3] = b, a[5] = a[7], a[6] = c, a[7] = d, this
        }, toString: function () {
            var a = this.val;
            return "mat3d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")"
        }
    })
}(), function () {
    me.Body = me.Rect.extend({
        init: function (a, b) {
            this.entity = a, this.shapes = b || [], this.collisionMask = me.collision.types.ALL_OBJECT, this.collisionType = me.collision.types.ENEMY_OBJECT, "undefined" == typeof this.vel && (this.vel = new me.Vector2d), this.vel.set(0, 0), "undefined" == typeof this.accel && (this.accel = new me.Vector2d), this.accel.set(0, 0), "undefined" == typeof this.friction && (this.friction = new me.Vector2d), this.friction.set(0, 0), "undefined" == typeof this.maxVel && (this.maxVel = new me.Vector2d), this.maxVel.set(1e3, 1e3), this.gravity = "undefined" != typeof me.sys.gravity ? me.sys.gravity : .98, this.falling = !1, this.jumping = !0, this._super(me.Rect, "init", [0, 0, a.width, a.height])
        }, addShape: function (a) {
            return this.shapes.push("Rectangle" === a.shapeType ? a.toPolygon() : a), this.updateBounds(), this.shapes.length
        }, getShape: function (a) {
            return this.shapes[a || 0]
        }, removeShape: function (a) {
            return this.shapes.remove(a), this.updateBounds(), this.shapes.length
        }, removeShapeAt: function (a) {
            return this.removeShape(this.getShape(a))
        }, setCollisionMask: function (a) {
            this.collisionMask = a
        }, respondToCollision: function (a) {
            var b = a.overlapV;
            this.entity.pos.sub(b), 0 !== b.x && (this.vel.x = ~~(.5 + this.vel.x - b.x) || 0), 0 !== b.y && (this.vel.y = ~~(.5 + this.vel.y - b.y) || 0, this.falling = b.y >= 1, this.jumping = b.y <= -1), this.entity.updateBounds()
        }, updateBounds: function () {
            if (this.shapes.length > 0) {
                var a = this.shapes[0].getBounds();
                this.pos.setV(a.pos), this.resize(a.width, a.height);
                for (var b = 1; b < this.shapes.length; b++)this.union(this.shapes[b].getBounds())
            }
            return this.entity.updateBounds(), this
        }, setVelocity: function (a, b) {
            this.accel.x = 0 !== a ? a : this.accel.x, this.accel.y = 0 !== b ? b : this.accel.y, this.setMaxVelocity(a, b)
        }, setMaxVelocity: function (a, b) {
            this.maxVel.x = a, this.maxVel.y = b
        }, setFriction: function (a, b) {
            this.friction.x = a || 0, this.friction.y = b || 0
        }, computeVelocity: function (a) {
            this.gravity && (a.y += this.gravity * me.timer.tick, this.falling = a.y > 0, this.jumping = this.falling ? !1 : this.jumping), this.friction.x && (a.x = me.utils.applyFriction(a.x, this.friction.x)), this.friction.y && (a.y = me.utils.applyFriction(a.y, this.friction.y)), 0 !== a.y && (a.y = a.y.clamp(-this.maxVel.y, this.maxVel.y)), 0 !== a.x && (a.x = a.x.clamp(-this.maxVel.x, this.maxVel.x))
        }, update: function () {
            return this.computeVelocity(this.vel), this.entity.pos.add(this.vel), this.entity.updateBounds(), 0 !== this.vel.x || 0 !== this.vel.y
        }, destroy: function () {
            this.entity = null, this.shapes = []
        }
    }), me.Body.Error = me.Error.extend({
        init: function (a) {
            me.Error.prototype.init.apply(this, [a]), this.name = "me.Body.Error"
        }
    })
}(), function () {
    function a(a, b, c, d) {
        this.max_objects = b || 4, this.max_levels = c || 4, this.level = d || 0, this.bounds = a, this.objects = [], this.nodes = []
    }

    var b = [], c = function (a, c, d, e) {
        if (b.length > 0) {
            var f = b.pop();
            return f.bounds = a, f.max_objects = c || 4, f.max_levels = d || 4, f.level = e || 0, f
        }
        return new me.QuadTree(a, c, d, e)
    }, d = function (a) {
        b.push(a)
    };
    a.prototype.split = function () {
        var a = this.level + 1, b = ~~(.5 + this.bounds.width / 2), d = ~~(.5 + this.bounds.height / 2), e = ~~(.5 + this.bounds.pos.x), f = ~~(.5 + this.bounds.pos.y);
        this.nodes[0] = c({
            pos: {x: e + b, y: f},
            width: b,
            height: d
        }, this.max_objects, this.max_levels, a), this.nodes[1] = c({
            pos: {x: e, y: f},
            width: b,
            height: d
        }, this.max_objects, this.max_levels, a), this.nodes[2] = c({
            pos: {x: e, y: f + d},
            width: b,
            height: d
        }, this.max_objects, this.max_levels, a), this.nodes[3] = c({
            pos: {x: e + b, y: f + d},
            width: b,
            height: d
        }, this.max_objects, this.max_levels, a)
    }, a.prototype.getIndex = function (a) {
        var b = -1, c = this.bounds.pos.x + this.bounds.width / 2, d = this.bounds.pos.y + this.bounds.height / 2, e = a.pos.y < d && a.pos.y + a.height < d, f = a.pos.y > d;
        return a.pos.x < c && a.pos.x + a.width < c ? e ? b = 1 : f && (b = 2) : a.pos.x > c && (e ? b = 0 : f && (b = 3)), b
    }, a.prototype.insertContainer = function (a) {
        for (var b, c = a.children.length; c--, b = a.children[c];)b instanceof me.Container ? this.insertContainer(b) : "undefined" != typeof b.body && this.insert(b)
    }, a.prototype.insert = function (a) {
        var b = -1;
        if (this.nodes.length > 0 && (b = this.getIndex(a.getBounds()), -1 !== b))return void this.nodes[b].insert(a);
        if (this.objects.push(a), this.objects.length > this.max_objects && this.level < this.max_levels) {
            0 === this.nodes.length && this.split();
            for (var c = 0; c < this.objects.length;)b = this.getIndex(this.objects[c].getBounds()), -1 !== b ? this.nodes[b].insert(this.objects.splice(c, 1)[0]) : c += 1
        }
    }, a.prototype.retrieve = function (a) {
        var b = this.objects;
        if (this.nodes.length > 0) {
            var c = this.getIndex(a.getBounds());
            if (-1 !== c)b = b.concat(this.nodes[c].retrieve(a)); else for (var d = 0; d < this.nodes.length; d += 1)b = b.concat(this.nodes[d].retrieve(a))
        }
        return b
    }, a.prototype.clear = function (a) {
        this.objects = [];
        for (var b = 0; b < this.nodes.length; b += 1)this.nodes[b].clear(a), d(this.nodes[b]);
        this.nodes = [], "undefined" != typeof a && (this.bounds.pos.x = a.pos.x, this.bounds.pos.y = a.pos.y, this.bounds.width = a.width, this.bounds.height = a.height)
    }, me.QuadTree = a
}(), function () {
    function a(a, b, c) {
        for (var d = Number.MAX_VALUE, e = -Number.MAX_VALUE, f = a.length, g = 0; f > g; g++) {
            var h = a[g].dotProduct(b);
            d > h && (d = h), h > e && (e = h)
        }
        c[0] = d, c[1] = e
    }

    function b(b, c, d, e, f, h) {
        var j = i.pop(), k = i.pop(), l = g.pop().copy(c).sub(b), m = l.dotProduct(f);
        if (a(d, f, j), a(e, f, k), k[0] += m, k[1] += m, j[0] > k[1] || k[0] > j[1])return g.push(l), i.push(j), i.push(k), !0;
        if (h) {
            var n = 0;
            if (j[0] < k[0])if (h.aInB = !1, j[1] < k[1])n = j[1] - k[0], h.bInA = !1; else {
                var o = j[1] - k[0], p = k[1] - j[0];
                n = p > o ? o : -p
            } else if (h.bInA = !1, j[1] > k[1])n = j[0] - k[1], h.aInB = !1; else {
                var q = j[1] - k[0], r = k[1] - j[0];
                n = r > q ? q : -r
            }
            var s = Math.abs(n);
            s < h.overlap && (h.overlap = s, h.overlapN.copy(f), 0 > n && h.overlapN.reverse())
        }
        return g.push(l), i.push(j), i.push(k), !1
    }

    function c(a, b) {
        var c = a.length2(), g = b.dotProduct(a);
        return 0 > g ? d : g > c ? f : e
    }

    for (var d = -1, e = 0, f = 1, g = [], h = 0; 10 > h; h++)g.push(new me.Vector2d);
    for (var i = [], j = 0; 5 > j; j++)i.push([]);
    me.collision = function () {
        var a = {};
        return a.quadTree = null, a.maxDepth = 4, a.maxChildren = 8, a.bounds = null, a.types = {
            NO_OBJECT: 0,
            PLAYER_OBJECT: 1,
            NPC_OBJECT: 2,
            ENEMY_OBJECT: 4,
            COLLECTABLE_OBJECT: 8,
            ACTION_OBJECT: 16,
            PROJECTILE_OBJECT: 32,
            WORLD_SHAPE: 64,
            ALL_OBJECT: 4294967295
        }, a.init = function () {
            a.bounds = me.game.viewport.clone(), a.quadTree = new me.QuadTree(a.bounds, a.maxChildren, a.maxDepth), me.event.subscribe(me.event.LEVEL_LOADED, function () {
                me.collision.bounds = me.game.world.clone(), me.collision.quadTree.clear(me.collision.bounds)
            })
        }, a.ResponseObject = function () {
            this.a = null, this.b = null, this.overlapN = new me.Vector2d, this.overlapV = new me.Vector2d, this.aInB = !0, this.bInA = !0, this.indexShapeA = -1, this.indexShapeB = -1, this.overlap = Number.MAX_VALUE
        }, a.ResponseObject.prototype.clear = function () {
            return this.aInB = !0, this.bInA = !0, this.overlap = Number.MAX_VALUE, this.indexShapeA = -1, this.indexShapeB = -1, this
        }, a.response = new a.ResponseObject, a.shouldCollide = function (a, b) {
            return a.body && b.body && 0 !== (a.body.collisionMask & b.body.collisionType) && 0 !== (a.body.collisionType & b.body.collisionMask)
        }, a.check = function (b, c) {
            for (var d, e = 0, f = c || a.response, g = a.quadTree.retrieve(b), h = g.length; h--, d = g[h];)if (d !== b && a.shouldCollide(b, d) && b.getBounds().overlaps(d.getBounds())) {
                var i = b.body.shapes.length, j = d.body.shapes.length;
                if (0 === i || 0 === j)continue;
                var k = 0;
                do {
                    var l = b.body.getShape(k), m = 0;
                    do {
                        var n = d.body.getShape(m);
                        a["test" + l.shapeType + n.shapeType].call(this, b, l, d, n, f.clear()) === !0 && (e++, f.indexShapeA = k, f.indexShapeB = m, b.onCollision(f, d) !== !1 && b.body.respondToCollision.call(b.body, f), d.onCollision(f, b) !== !1 && d.body.respondToCollision.call(d.body, f)), m++
                    } while (j > m);
                    k++
                } while (i > k)
            }
            return e > 0
        }, a.testPolygonPolygon = function (a, c, d, e, f) {
            var h, i = c.points, j = c.normals, k = j.length, l = e.points, m = e.normals, n = m.length, o = g.pop().copy(a.pos).add(c.pos), p = g.pop().copy(d.pos).add(e.pos);
            for (h = 0; k > h; h++)if (b(o, p, i, l, j[h], f))return g.push(o), g.push(p), !1;
            for (h = 0; n > h; h++)if (b(o, p, i, l, m[h], f))return g.push(o), g.push(p), !1;
            return f && (f.a = a, f.b = d, f.overlapV.copy(f.overlapN).scale(f.overlap)), g.push(o), g.push(p), !0
        }, a.testEllipseEllipse = function (a, b, c, d, e) {
            var f = g.pop().copy(c.pos).add(d.pos).sub(a.pos).sub(b.pos), h = b.radius, i = d.radius, j = h + i, k = j * j, l = f.length2();
            if (l > k)return g.push(f), !1;
            if (e) {
                var m = Math.sqrt(l);
                e.a = a, e.b = c, e.overlap = j - m, e.overlapN.copy(f.normalize()), e.overlapV.copy(f).scale(e.overlap), e.aInB = i >= h && i - h >= m, e.bInA = h >= i && h - i >= m
            }
            return g.push(f), !0
        }, a.testPolygonEllipse = function (a, b, e, h, i) {
            for (var j = g.pop().copy(e.pos).add(h.pos).sub(a.pos).sub(b.pos), k = h.radius, l = k * k, m = b.points, n = b.edges, o = n.length, p = g.pop(), q = g.pop(), r = g.pop(), s = 0, t = 0; o > t; t++) {
                var u = t === o - 1 ? 0 : t + 1, v = 0 === t ? o - 1 : t - 1, w = 0, x = null;
                p.copy(n[t]), r.copy(j).sub(m[t]), i && r.length2() > l && (i.aInB = !1);
                var y = c(p, r), z = !0;
                if (y === d) {
                    var A = null;
                    if (o > 1 && (p.copy(n[v]), A = g.pop().copy(j).sub(m[v]), y = c(p, A), y !== f && (z = !1)), z) {
                        if (s = r.length(), s > k)return g.push(j), g.push(p), g.push(q), g.push(r), A && g.push(A), !1;
                        i && (i.bInA = !1, x = r.normalize(), w = k - s)
                    }
                    A && g.push(A)
                } else if (y === f) {
                    if (o > 1 && (p.copy(n[u]), r.copy(j).sub(m[u]), y = c(p, r), y !== d && (z = !1)), z) {
                        if (s = r.length(), s > k)return g.push(j), g.push(p), g.push(q), g.push(r), !1;
                        i && (i.bInA = !1, x = r.normalize(), w = k - s)
                    }
                } else {
                    q.copy(b.normals[t]), s = r.dotProduct(q);
                    var B = Math.abs(s);
                    if ((1 === o || s > 0) && B > k)return g.push(j), g.push(p), g.push(q), g.push(r), !1;
                    i && (x = q, w = k - s, (s >= 0 || 2 * k > w) && (i.bInA = !1))
                }
                x && i && Math.abs(w) < Math.abs(i.overlap) && (i.overlap = w, i.overlapN.copy(x))
            }
            return i && (i.a = a, i.b = e, i.overlapV.copy(i.overlapN).scale(i.overlap)), g.push(j), g.push(p), g.push(q), g.push(r), !0
        }, a.testEllipsePolygon = function (b, c, d, e, f) {
            var g = a.testPolygonEllipse(d, e, b, c, f);
            if (g && f) {
                var h = f.a, i = f.aInB;
                f.overlapN.reverse(), f.overlapV.reverse(), f.a = f.b, f.b = h, f.aInB = f.bInA, f.bInA = i
            }
            return g
        }, a
    }()
}(), function () {
    me.Renderable = me.Rect.extend({
        init: function (a, b, c, d) {
            this.isRenderable = !0, this.GUID = void 0, this.inViewport = !1, this.alwaysUpdate = !1, this.updateWhenPaused = !1, this.isPersistent = !1, this.floating = !1, this.z = 0 / 0, this.anchorPoint = new me.Vector2d, this.alpha = 1, me.Rect.prototype.init.apply(this, [a, b, c, d]), this.anchorPoint.set(.5, .5), this.setOpacity(1)
        }, getOpacity: function () {
            return this.alpha
        }, setOpacity: function (a) {
            "number" == typeof a && (this.alpha = a.clamp(0, 1), this.alpha !== this.alpha && (this.alpha = 1))
        }, update: function () {
            return !1
        }, draw: function () {
        }
    }), me.Renderable.Error = me.Error.extend({
        init: function (a) {
            me.Error.prototype.init.apply(this, [a]), this.name = "me.Renderable.Error"
        }
    })
}(), function () {
    me.Sprite = me.Renderable.extend({
        init: function (a, b, c, d, e) {
            this._scale = new me.Vector2d, this.scaleFlag = !1, this.lastflipX = !1, this.lastflipY = !1, this.z = 0, this.offset = new me.Vector2d, this.angle = 0, this._sourceAngle = 0, this.image = null, this.flickering = !1, this.flickerDuration = 0, this.flickercb = null, this.flickerState = !1, this.isSprite = !0, me.Renderable.prototype.init.apply(this, [a, b, d || c.width, e || c.height]), this.image = c, this._scale.set(1, 1), this.lastflipX = this.lastflipY = !1, this.scaleFlag = !1, this.offset.set(0, 0), this.isPersistent = !1, this.flickering = !1
        }, setTransparency: function (a) {
            a = "#" === a.charAt(0) ? a.substring(1, 7) : a, this.image = me.video.renderer.applyRGBFilter(this.image, "transparent", a.toUpperCase()).canvas
        }, isFlickering: function () {
            return this.flickering
        }, flicker: function (a, b) {
            this.flickerDuration = a, this.flickerDuration <= 0 ? (this.flickering = !1, this.flickercb = null) : this.flickering || (this.flickercb = b, this.flickering = !0)
        }, flipX: function (a) {
            a !== this.lastflipX && (this.lastflipX = a, this._scale.x = -this._scale.x, this.scaleFlag = 1 !== this._scale.x || 1 !== this._scale.y)
        }, flipY: function (a) {
            a !== this.lastflipY && (this.lastflipY = a, this._scale.y = -this._scale.y, this.scaleFlag = 1 !== this._scale.x || 1 !== this._scale.y)
        }, scale: function (a, b) {
            var c = a, d = "undefined" == typeof b ? a : b;
            c > 0 && (this._scale.x = this._scale.x < 0 ? -c : c), d > 0 && (this._scale.y = this._scale.y < 0 ? -d : d), this.scaleFlag = 1 !== this._scale.x || 1 !== this._scale.y
        }, scaleV: function (a) {
            this.scale(a.x, a.y)
        }, update: function (a) {
            return this.flickering ? (this.flickerDuration -= a, this.flickerDuration < 0 && (this.flickercb && this.flickercb(), this.flicker(-1)), !0) : !1
        }, draw: function (a) {
            if (!this.flickering || (this.flickerState = !this.flickerState, this.flickerState)) {
                a.save(), a.setGlobalAlpha(a.globalAlpha() * this.getOpacity());
                var b = ~~this.pos.x, c = ~~this.pos.y, d = this.width, e = this.height, f = this.angle + this._sourceAngle;
                if (this.scaleFlag || 0 !== f) {
                    var g = d * this.anchorPoint.x, h = e * this.anchorPoint.y;
                    a.translate(b + g, c + h), this.scaleFlag && a.scale(this._scale.x, this._scale.y), 0 !== f && a.rotate(f), 0 !== this._sourceAngle ? (d = this.height, e = this.width, b = -h, c = -g) : (b = -g, c = -h)
                }
                a.drawImage(this.image, this.offset.x, this.offset.y, d, e, b, c, d, e), a.restore()
            }
        }, destroy: function () {
            this.onDestroyEvent.apply(this, arguments)
        }, onDestroyEvent: function () {
        }
    })
}(), function () {
    me.AnimationSheet = me.Sprite.extend({
        init: function (a, b, c) {
            this.spacing = 0, this.margin = 0, this.animationpause = !1, this.animationspeed = 100, this.anim = {}, this.resetAnim = null, this.current = null, this.animationspeed = 100, this.spacing = c.spacing || 0, this.margin = c.margin || 0;
            var d = c.region || c.image;
            me.Sprite.prototype.init.apply(this, [a, b, c.image, c.spritewidth, c.spriteheight, this.spacing, this.margin]), this.textureAtlas = null, this.atlasIndices = null, this.buildLocalAtlas(c.atlas, c.atlasIndices, d), this.addAnimation("default", null), this.setCurrentAnimation("default")
        }, buildLocalAtlas: function (a, b, c) {
            if ((null === c || "undefined" == typeof c) && (c = this.image), "undefined" != typeof a)this.textureAtlas = a, this.atlasIndices = b; else {
                if (this.textureAtlas = [], (c.width - this.margin) % (this.width + this.spacing) !== 0 || (c.height - this.margin) % (this.height + this.spacing) !== 0)throw new me.Renderable.Error("Animation sheet for image: " + c.src + " is not divisible by " + (this.width + this.spacing) + "x" + (this.height + this.spacing));
                var d = new me.Vector2d(~~((c.width - this.margin) / (this.width + this.spacing)), ~~((c.height - this.margin) / (this.height + this.spacing))), e = 0, f = 0;
                c.offset && (e = c.offset.x, f = c.offset.y);
                for (var g = 0, h = d.x * d.y; h > g; g++)this.textureAtlas[g] = {
                    name: "" + g,
                    offset: new me.Vector2d(this.margin + (this.spacing + this.width) * (g % d.x) + e, this.margin + (this.spacing + this.height) * ~~(g / d.x) + f),
                    width: this.width,
                    height: this.height,
                    hWidth: this.width / 2,
                    hHeight: this.height / 2,
                    angle: 0
                }
            }
        }, addAnimation: function (a, b, c) {
            if (this.anim[a] = {
                    name: a,
                    frame: [],
                    idx: 0,
                    length: 0,
                    animationspeed: c || this.animationspeed,
                    nextFrame: 0
                }, null == b) {
                b = [];
                var d = 0;
                this.textureAtlas.forEach(function () {
                    b[d] = d++
                })
            }
            for (var e = 0, f = b.length; f > e; e++)if ("number" == typeof b[e])this.anim[a].frame[e] = this.textureAtlas[b[e]]; else {
                if (null === this.atlasIndices)throw new me.Renderable.Error("string parameters for addAnimation are only allowed for TextureAtlas");
                this.anim[a].frame[e] = this.textureAtlas[this.atlasIndices[b[e]]]
            }
            this.anim[a].length = this.anim[a].frame.length
        }, setCurrentAnimation: function (a, b) {
            if (!this.anim[a])throw new me.Renderable.Error("animation id '" + a + "' not defined");
            this.current = this.anim[a], this.resetAnim = b || null, this.setAnimationFrame(this.current.idx), this.current.nextFrame = this.current.animationspeed
        }, isCurrentAnimation: function (a) {
            return this.current.name === a
        }, setAnimationFrame: function (a) {
            this.current.idx = (a || 0) % this.current.length;
            var b = this.current.frame[this.current.idx];
            this.offset = b.offset, this.width = b.width, this.height = b.height, this.hWidth = b.hWidth, this.hHeight = b.hHeight, this._sourceAngle = b.angle
        }, getCurrentAnimationFrame: function () {
            return this.current.idx
        }, update: function (a) {
            if (!this.animationpause && this.current.length > 1 && (this.current.nextFrame -= a, this.current.nextFrame <= 0)) {
                if (this.setAnimationFrame(++this.current.idx), 0 === this.current.idx && this.resetAnim)if ("string" == typeof this.resetAnim)this.setCurrentAnimation(this.resetAnim); else if ("function" == typeof this.resetAnim && this.resetAnim() === !1)return this.current.idx = this.current.length - 1, this.setAnimationFrame(this.current.idx), me.Sprite.prototype.update.apply(this, [a]), !1;
                return this.current.nextFrame = this.current.animationspeed, me.Sprite.prototype.update.apply(this, [a]) || !0
            }
            return me.Sprite.prototype.update.apply(this, [a])
        }
    })
}(), function () {
    var a = -(Math.PI / 2);
    me.TextureAtlas = Object.extend({
        init: function (a, b) {
            if (this.format = null, this.texture = b || null, this.atlas = a || null, a && a.meta) {
                if (a.meta.app.contains("texturepacker"))if (this.format = "texturepacker", "undefined" == typeof b) {
                    var c = me.utils.getBasename(a.meta.image);
                    if (this.texture = me.loader.getImage(c), null === this.texture)throw new me.TextureAtlas.Error("Atlas texture '" + c + "' not found")
                } else this.texture = b;
                if (a.meta.app.contains("ShoeBox")) {
                    if (!a.meta.exporter || !a.meta.exporter.contains("melonJS"))throw new me.TextureAtlas.Error("ShoeBox requires the JSON exporter : https://github.com/melonjs/melonJS/tree/master/media/shoebox_JSON_export.sbx");
                    this.format = "ShoeBox", this.texture = b
                }
                this.atlas = this.initFromTexturePacker(a)
            }
            if (null === this.atlas)throw new me.TextureAtlas.Error("texture atlas format not supported")
        }, initFromTexturePacker: function (a) {
            var b = {};
            return a.frames.forEach(function (a) {
                a.hasOwnProperty("filename") && (b[a.filename] = {
                    frame: new me.Rect(a.frame.x, a.frame.y, a.frame.w, a.frame.h),
                    source: new me.Rect(a.spriteSourceSize.x, a.spriteSourceSize.y, a.spriteSourceSize.w, a.spriteSourceSize.h),
                    rotated: a.rotated === !0,
                    trimmed: a.trimmed === !0
                })
            }), b
        }, getTexture: function () {
            return this.texture
        }, getRegion: function (b) {
            var c = this.atlas[b];
            return c ? {
                name: b,
                pos: c.source.pos.clone(),
                offset: c.frame.pos.clone(),
                width: c.frame.width,
                height: c.frame.height,
                hWidth: c.frame.width / 2,
                hHeight: c.frame.height / 2,
                angle: c.rotated === !0 ? a : 0
            } : null
        }, createSpriteFromName: function (a) {
            var b = this.getRegion(a);
            if (b) {
                var c = new me.Sprite(0, 0, this.getTexture(), b.width, b.height);
                return c.offset.setV(b.offset), c._sourceAngle = b.angle, c
            }
            throw new me.TextureAtlas.Error("TextureAtlas - region for " + a + " not found")
        }, createAnimationFromName: function (a) {
            for (var b = [], c = {}, d = 0; d < a.length; ++d)if (b[d] = this.getRegion(a[d]), c[a[d]] = d, null == b[d])throw new me.TextureAtlas.Error("TextureAtlas - region for " + a[d] + " not found");
            return new me.AnimationSheet(0, 0, {
                image: this.texture,
                spritewidth: 0,
                spriteheight: 0,
                margin: 0,
                spacing: 0,
                atlas: b,
                atlasIndices: c
            })
        }
    }), me.TextureAtlas.Error = me.Error.extend({
        init: function (a) {
            me.Error.prototype.init.apply(this, [a]), this.name = "me.TextureAtlas.Error"
        }
    })
}(), function () {
    var a = Math.min, b = Math.max;
    me.Viewport = me.Renderable.extend({
        init: function (a, b, c, d) {
            this.AXIS = {
                NONE: 0,
                HORIZONTAL: 1,
                VERTICAL: 2,
                BOTH: 3
            }, this.bounds = null, this.deadzone = null, this.target = null, this.follow_axis = 0, this._shake = null, this._fadeIn = null, this._fadeOut = null, this.screenX = 0, this.screenY = 0, me.Renderable.prototype.init.apply(this, [a, b, c - a, d - b]), this.bounds = new me.Rect(-1 / 0, -1 / 0, 1 / 0, 1 / 0), this.offset = new me.Vector2d, this.target = null, this.follow_axis = this.AXIS.NONE, this._shake = {
                intensity: 0,
                duration: 0,
                axis: this.AXIS.BOTH,
                onComplete: null
            }, this._fadeOut = {color: null, duration: 0, tween: null}, this._fadeIn = {
                color: null,
                duration: 0,
                tween: null
            }, this.setDeadzone(this.width / 6, this.height / 6)
        }, _followH: function (c) {
            var d = this.pos.x;
            return c.x - this.pos.x > this.deadzone.right ? this.pos.x = ~~a(c.x - this.deadzone.right, this.bounds.width - this.width) : c.x - this.pos.x < this.deadzone.pos.x && (this.pos.x = ~~b(c.x - this.deadzone.pos.x, this.bounds.pos.x)), d !== this.pos.x
        }, _followV: function (c) {
            var d = this.pos.y;
            return c.y - this.pos.y > this.deadzone.bottom ? this.pos.y = ~~a(c.y - this.deadzone.bottom, this.bounds.height - this.height) : c.y - this.pos.y < this.deadzone.pos.y && (this.pos.y = ~~b(c.y - this.deadzone.pos.y, this.bounds.pos.y)), d !== this.pos.y
        }, reset: function (a, b) {
            this.pos.x = a || 0, this.pos.y = b || 0, this.target = null, this.follow_axis = null
        }, setDeadzone: function (a, b) {
            null === this.deadzone && (this.deadzone = new me.Rect(0, 0, 0, 0)), this.deadzone.pos.set(~~((this.width - a) / 2), ~~((this.height - b) / 2 - .25 * b)), this.deadzone.resize(a, b), this.updateTarget()
        }, setBounds: function (a, b, c, d) {
            this.bounds.pos.set(a, b), this.bounds.resize(c, d)
        }, follow: function (a, b) {
            if (a instanceof me.Entity)this.target = a.pos; else {
                if (!(a instanceof me.Vector2d))throw new me.Renderable.Error("invalid target for viewport.follow");
                this.target = a
            }
            this.follow_axis = "undefined" == typeof b ? this.AXIS.BOTH : b, this.updateTarget()
        }, move: function (a, b) {
            this.moveTo(~~(this.pos.x + a), ~~(this.pos.y + b))
        }, moveTo: function (a, b) {
            this.pos.x = (~~a).clamp(this.bounds.pos.x, this.bounds.width - this.width), this.pos.y = (~~b).clamp(this.bounds.pos.y, this.bounds.height - this.height), me.event.publish(me.event.VIEWPORT_ONCHANGE, [this.pos])
        }, updateTarget: function () {
            var a = !1;
            if (this.target)switch (this.follow_axis) {
                case this.AXIS.NONE:
                    break;
                case this.AXIS.HORIZONTAL:
                    a = this._followH(this.target);
                    break;
                case this.AXIS.VERTICAL:
                    a = this._followV(this.target);
                    break;
                case this.AXIS.BOTH:
                    a = this._followH(this.target), a = this._followV(this.target) || a
            }
            return a
        }, update: function (a) {
            var b = this.updateTarget();
            return this._shake.duration > 0 && (this._shake.duration -= a, this._shake.duration <= 0 ? (this._shake.duration = 0, this.offset.setZero(), "function" == typeof this._shake.onComplete && this._shake.onComplete()) : ((this._shake.axis === this.AXIS.BOTH || this._shake.axis === this.AXIS.HORIZONTAL) && (this.offset.x = (Math.random() - .5) * this._shake.intensity), (this._shake.axis === this.AXIS.BOTH || this._shake.axis === this.AXIS.VERTICAL) && (this.offset.y = (Math.random() - .5) * this._shake.intensity)), b = !0), b === !0 && me.event.publish(me.event.VIEWPORT_ONCHANGE, [this.pos]), (null != this._fadeIn.tween || null != this._fadeOut.tween) && (b = !0), b
        }, shake: function (a, b, c, d) {
            this._shake.duration > 0 || (this._shake = {
                intensity: a,
                duration: b,
                axis: c || this.AXIS.BOTH,
                onComplete: d
            })
        }, fadeOut: function (a, b, c) {
            this._fadeOut.color = me.pool.pull("me.Color").copy(a), this._fadeOut.color.alpha = 1, this._fadeOut.duration = b || 1e3, this._fadeOut.tween = me.pool.pull("me.Tween", this._fadeOut.color).to({alpha: 0}, this._fadeOut.duration).onComplete(c || null), this._fadeOut.tween.start()
        }, fadeIn: function (a, b, c) {
            this._fadeIn.color = me.pool.pull("me.Color").copy(a), this._fadeIn.color.alpha = 0, this._fadeIn.duration = b || 1e3, this._fadeIn.tween = me.pool.pull("me.Tween", this._fadeIn.color).to({alpha: 1}, this._fadeIn.duration).onComplete(c || null), this._fadeIn.tween.start()
        }, getWidth: function () {
            return this.width
        }, getHeight: function () {
            return this.height
        }, focusOn: function (a) {
            var b = a.getBounds();
            this.moveTo(a.pos.x + b.pos.x + b.width / 2, a.pos.y + b.pos.y + b.height / 2)
        }, isVisible: function (a) {
            return a.overlaps(this)
        }, localToWorld: function (a, b, c) {
            return c = c || new me.Vector2d, c.set(a, b).add(this.pos).sub(me.game.currentLevel.pos)
        }, worldToLocal: function (a, b, c) {
            return c = c || new me.Vector2d, c.set(a, b).sub(this.pos).add(me.game.currentLevel.pos)
        }, draw: function () {
            this._fadeIn.tween && (me.video.renderer.clearSurface(null, this._fadeIn.color), 1 === this._fadeIn.color.alpha && (this._fadeIn.tween = null, me.pool.push(this._fadeIn.color), this._fadeIn.color = null)), this._fadeOut.tween && (me.video.renderer.clearSurface(null, this._fadeOut.color), 0 === this._fadeOut.color.alpha && (this._fadeOut.tween = null, me.pool.push(this._fadeOut.color), this._fadeOut.color = null))
        }
    })
}(), function () {
    me.GUI_Object = me.Sprite.extend({
        init: function (a, b, c) {
            this.isClickable = !0, this.holdThreshold = 250, this.isHoldable = !1, this.holdTimeout = null, this.updated = !1, this.released = !0, me.Sprite.prototype.init.apply(this, [a, b, "string" == typeof c.image ? me.loader.getImage(c.image) : c.image, c.spritewidth, c.spriteheight]), this.floating = !0, me.input.registerPointerEvent("pointerdown", this, this.clicked.bind(this)), me.input.registerPointerEvent("pointerup", this, this.release.bind(this))
        }, update: function () {
            return this.updated ? (this.released || (this.updated = !1), !0) : !1
        }, clicked: function (a) {
            return this.isClickable ? (this.updated = !0, this.isHoldable && (null !== this.holdTimeout && me.timer.clearTimeout(this.holdTimeout), this.holdTimeout = me.timer.setTimeout(this.hold.bind(this), this.holdThreshold, !1), this.released = !1), this.onClick(a)) : void 0
        }, onClick: function () {
            return !1
        }, release: function (a) {
            return this.released = !0, me.timer.clearTimeout(this.holdTimeout), this.onRelease(a)
        }, onRelease: function () {
            return !1
        }, hold: function () {
            me.timer.clearTimeout(this.holdTimeout), this.released || this.onHold()
        }, onHold: function () {
        }, onDestroyEvent: function () {
            me.input.releasePointerEvent("pointerdown", this), me.input.releasePointerEvent("pointerup", this), me.timer.clearTimeout(this.holdTimeout)
        }
    })
}(), function () {
    var a = function (a, b) {
        a.ancestor && a.ancestor.removeChildNow(a, b)
    }, b = new me.Rect(0, 0, 0, 0), c = 0;
    me.Container = me.Renderable.extend({
        init: function (a, b, c, d) {
            this.pendingSort = null, this.transform = new me.Matrix2d, me.Renderable.prototype.init.apply(this, [a, b, c || 1 / 0, d || 1 / 0]), this.bounds = void 0, this.children = [], this.sortOn = me.game.sortOn, this.autoSort = !0, this.transform.identity(), this.drawCount = 0
        }, addChild: function (a, b) {
            return "undefined" != typeof a.ancestor ? a.ancestor.removeChildNow(a) : a.isRenderable && (a.GUID = me.utils.createGUID()), "number" == typeof b && (a.z = b), ("undefined" == typeof a.z || a.z !== a.z) && (a.z = this.children.length), a.ancestor = this, this.children.push(a), this.autoSort === !0 && this.sort(), "function" == typeof a.onActivateEvent && a.onActivateEvent(), a
        }, addChildAt: function (a, b) {
            if (b >= 0 && b < this.children.length)return "undefined" != typeof a.ancestor ? a.ancestor.removeChildNow(a) : a.isRenderable && (a.GUID = me.utils.createGUID()), a.ancestor = this, this.children.splice(b, 0, a), "function" == typeof a.onActivateEvent && a.onActivateEvent(), a;
            throw new me.Container.Error("Index (" + b + ") Out Of Bounds for addChildAt()")
        }, swapChildren: function (a, b) {
            var c = this.getChildIndex(a), d = this.getChildIndex(b);
            if (-1 === c || -1 === d)throw new me.Container.Error(a + " Both the supplied childs must be a child of the caller " + this);
            var e = a.z;
            a.z = b.z, b.z = e, this.children[c] = b, this.children[d] = a
        }, getChildAt: function (a) {
            if (a >= 0 && a < this.children.length)return this.children[a];
            throw new me.Container.Error("Index (" + a + ") Out Of Bounds for getChildAt()")
        }, getChildIndex: function (a) {
            return this.children.indexOf(a)
        }, hasChild: function (a) {
            return this === a.ancestor
        }, getChildByProp: function (a, b) {
            function c(a, c) {
                "string" == typeof a[c] ? a[c].match(e) && d.push(a) : a[c] === b && d.push(a)
            }

            for (var d = [], e = new RegExp(b, "i"), f = this.children.length - 1; f >= 0; f--) {
                var g = this.children[f];
                g instanceof me.Container ? (c(g, a), d = d.concat(g.getChildByProp(a, b))) : c(g, a)
            }
            return d
        }, getChildByName: function (a) {
            return this.getChildByProp("name", a)
        }, getChildByGUID: function (a) {
            var b = this.getChildByProp("GUID", a);
            return b.length > 0 ? b[0] : null
        }, getBounds: function () {
            this.bounds ? (this.bounds.pos.set(1 / 0, 1 / 0), this.bounds.resize(-1 / 0, -1 / 0)) : this.bounds = new me.Rect(1 / 0, 1 / 0, -1 / 0, -1 / 0);
            for (var a, b, c = this.children.length; c--, b = this.children[c];)b.isRenderable && (a = b.getBounds(), null !== a && this.bounds.union(a));
            return this.bounds
        }, removeChild: function (b, c) {
            b.ancestor && a.defer(this, b, c)
        }, removeChildNow: function (a, b) {
            if (!this.hasChild(a))throw new me.Container.Error(a + " The supplied child must be a child of the caller " + this);
            a.ancestor = void 0, "function" == typeof a.onDeactivateEvent && a.onDeactivateEvent(), b || ("function" == typeof a.destroy && a.destroy(), me.pool.push(a)), this.children.splice(this.getChildIndex(a), 1)
        }, setChildsProperty: function (a, b, c) {
            for (var d = this.children.length; d >= 0; d--) {
                var e = this.children[d];
                c === !0 && e instanceof me.Container && e.setChildsProperty(a, b, c), e[a] = b
            }
        }, moveUp: function (a) {
            var b = this.getChildIndex(a);
            b - 1 >= 0 && this.swapChildren(a, this.getChildAt(b - 1))
        }, moveDown: function (a) {
            var b = this.getChildIndex(a);
            b + 1 < this.children.length && this.swapChildren(a, this.getChildAt(b + 1))
        }, moveToTop: function (a) {
            var b = this.getChildIndex(a);
            b > 0 && (this.children.splice(0, 0, this.children.splice(b, 1)[0]), a.z = this.children[1].z + 1)
        }, moveToBottom: function (a) {
            var b = this.getChildIndex(a);
            b < this.children.length - 1 && (this.children.splice(this.children.length - 1, 0, this.children.splice(b, 1)[0]), a.z = this.children[this.children.length - 2].z - 1)
        }, sort: function (a) {
            if (null === this.pendingSort) {
                if (a === !0)for (var b, c = this.children.length; c--, b = this.children[c];)b instanceof me.Container && b.sort(a);
                this.pendingSort = function (a) {
                    a.children.sort(a["_sort" + a.sortOn.toUpperCase()]), a.pendingSort = null, me.game.repaint()
                }.defer(this, this)
            }
        }, _sortZ: function (a, b) {
            return b.z - a.z
        }, _sortX: function (a, b) {
            var c = b.z - a.z;
            return c ? c : (b.pos && b.pos.x) - (a.pos && a.pos.x) || 0
        }, _sortY: function (a, b) {
            var c = b.z - a.z;
            return c ? c : (b.pos && b.pos.y) - (a.pos && a.pos.y) || 0
        }, destroy: function () {
            this.pendingSort && (clearTimeout(this.pendingSort), this.pendingSort = null);
            for (var a, b = this.children.length; b--, a = this.children[b];)a.isPersistent || this.removeChildNow(a);
            this.transform.identity()
        }, update: function (a) {
            for (var d, e = !1, f = !1, g = me.state.isPaused(), h = !1, i = !1, j = [], k = 0, l = 0, m = 0, n = me.game.viewport, o = this.children.length; o--, d = this.children[o];)(!g || d.updateWhenPaused) && (d.isRenderable ? (f = c > 0 || d.floating, f && c++, h = !f, h && (k = d.pos.x, l = d.pos.y, m = Math.abs(k + l + d.width + d.height), (m !== m || 1 / 0 === m) && (i = !0, j.push(b.clone())), b.translateV(d.pos), b.resize(d.width, d.height)), d.inViewport = f || n.isVisible(b), e = (d.inViewport || d.alwaysUpdate) && d.update(a) || e, h && (i ? (i = !1, b.copy(j.pop())) : b.translate(-k, -l)), c > 0 && c--) : e = d.update(a) || e);
            return e
        }, draw: function (a, b) {
            var c = me.game.viewport, d = !1;
            this.drawCount = 0, a.save(), a.transform.apply(a, this.transform.val), a.setGlobalAlpha(a.globalAlpha() * this.getOpacity()), a.translate(this.pos.x, this.pos.y);
            for (var e, f = this.children.length; f--, e = this.children[f];)d = e.floating, (e.inViewport || d) && e.isRenderable && (d === !0 && a.translate(c.screenX - this.pos.x, c.screenY - this.pos.y), e.draw(a, b), d === !0 && a.translate(this.pos.x - c.screenX, this.pos.y - c.screenY), this.drawCount++);
            a.restore()
        }
    }), me.Container.Error = me.Renderable.Error.extend({
        init: function (a) {
            me.Renderable.Error.prototype.init.apply(this, [a]), this.name = "me.Container.Error"
        }
    })
}(), function () {
    me.Entity = me.Renderable.extend({
        init: function (a, b, c) {
            if (this.renderable = null, this.bounds = void 0, "number" != typeof c.width || "number" != typeof c.height)throw new me.Entity.Error("height and width properties are mandatory when passing settings parameters to an object entity");
            if (me.Renderable.prototype.init.apply(this, [a, b, c.width, c.height]), c.image) {
                var d = "object" == typeof c.image ? c.image : me.loader.getImage(c.image);
                this.renderable = new me.AnimationSheet(0, 0, {
                    image: d,
                    spritewidth: ~~(c.spritewidth || c.width),
                    spriteheight: ~~(c.spriteheight || c.height),
                    spacing: ~~c.spacing,
                    margin: ~~c.margin
                }), c.transparent_color && this.renderable.setTransparency(c.transparent_color)
            }
            if (this.name = c.name ? c.name.toLowerCase() : "", this.type = c.type, this.alive = !0, this.body = new me.Body(this, "function" == typeof c.getTMXShapes ? c.getTMXShapes() : []), this.body.updateBounds(), 0 === this.width && 0 === this.height && this.resize(this.body.width, this.body.height), "undefined" != typeof c.collisionMask && this.body.setCollisionMask(c.collisionMask), "undefined" != typeof c.collisionType) {
                if ("undefined" == typeof me.collision.types[c.collisionType])throw new me.Entity.Error("Invalid value for the collisionType property");
                this.body.collisionType = me.collision.types[c.collisionType]
            }
        }, getBounds: function () {
            return this.bounds
        }, updateBounds: function () {
            return this.bounds || (this.bounds = new me.Rect(0, 0, 0, 0)), this.bounds.pos.setV(this.pos).add(this.body.pos), this.bounds.resize(this.body.width, this.body.height), this.bounds
        }, distanceTo: function (a) {
            var b = this.pos.x + this.width / 2 - (a.pos.x + a.width / 2), c = this.pos.y + this.height / 2 - (a.pos.y + a.height / 2);
            return Math.sqrt(b * b + c * c)
        }, distanceToPoint: function (a) {
            var b = this.pos.x + this.width / 2 - a.x, c = this.pos.y + this.height / 2 - a.y;
            return Math.sqrt(b * b + c * c)
        }, angleTo: function (a) {
            var b = this.getBounds(), c = a.getBounds(), d = c.pos.x + c.width / 2 - (b.pos.x + b.width / 2), e = c.pos.y + c.height / 2 - (b.pos.y + b.height / 2);
            return Math.atan2(e, d)
        }, angleToPoint: function (a) {
            var b = this.getBounds(), c = a.x - (b.pos.x + b.width / 2), d = a.y - (b.pos.y + b.height / 2);
            return Math.atan2(d, c)
        }, update: function (a) {
            return this.renderable ? this.renderable.update(a) : !1
        }, draw: function (a) {
            if (this.renderable) {
                var b = this.getBounds(), c = ~~(.5 + b.pos.x + this.anchorPoint.x * (b.width - this.renderable.width)), d = ~~(.5 + b.pos.y + this.anchorPoint.y * (b.height - this.renderable.height));
                a.translate(c, d), this.renderable.draw(a), a.translate(-c, -d)
            }
        }, destroy: function () {
            this.renderable && (this.renderable.destroy.apply(this.renderable, arguments), this.renderable = null), this.body.destroy.apply(this.body, arguments), this.body = null
        }, onDestroyEvent: function () {
        }, onCollision: function () {
            return !1
        }
    }), me.CollectableEntity = me.Entity.extend({
        init: function (a, b, c) {
            me.Entity.prototype.init.apply(this, [a, b, c]), this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT
        }
    }), me.LevelEntity = me.Entity.extend({
        init: function (a, b, c) {
            me.Entity.prototype.init.apply(this, [a, b, c]), this.nextlevel = c.to, this.fade = c.fade, this.duration = c.duration, this.fading = !1, this.name = "levelEntity", this.gotolevel = c.to, this.body.collisionType = me.collision.types.ACTION_OBJECT
        }, onFadeComplete: function () {
            me.levelDirector.loadLevel(this.gotolevel), me.game.viewport.fadeOut(this.fade, this.duration)
        }, goTo: function (a) {
            this.gotolevel = a || this.nextlevel, this.fade && this.duration ? this.fading || (this.fading = !0, me.game.viewport.fadeIn(this.fade, this.duration, this.onFadeComplete.bind(this))) : me.levelDirector.loadLevel(this.gotolevel)
        }, onCollision: function () {
            return "levelEntity" === this.name && this.goTo(), !1
        }
    }), me.Entity.Error = me.Renderable.Error.extend({
        init: function (a) {
            me.Renderable.Error.prototype.init.apply(this, [a]), this.name = "me.Entity.Error"
        }
    })
}(), function () {
    me.ScreenObject = Object.extend({
        init: function () {
        }, reset: function () {
            me.game.reset(), this.onResetEvent.apply(this, arguments)
        }, destroy: function () {
            this.onDestroyEvent.apply(this, arguments)
        }, onResetEvent: function () {
        }, onDestroyEvent: function () {
        }
    }), function () {
        var a = 0, b = 1e3 / 60, c = me.agent.prefixed("requestAnimationFrame"), d = me.agent.prefixed("cancelAnimationFrame") || me.agent.prefixed("cancelRequestAnimationFrame");
        c && d || (c = function (c) {
            var d = window.performance.now(), e = Math.max(0, b - (d - a)), f = window.setTimeout(function () {
                c(d + e)
            }, e);
            return a = d + e, f
        }, d = function (a) {
            window.clearTimeout(a)
        }), window.requestAnimationFrame = c, window.cancelAnimationFrame = d
    }(), me.state = function () {
        function a() {
            -1 === i && -1 !== h && (me.timer.reset(), i = window.requestAnimationFrame(d))
        }

        function b() {
            j && -1 !== h && (me.timer.reset(), j = !1)
        }

        function c() {
            j = !0
        }

        function d(a) {
            me.game.update(a), me.game.draw(), -1 !== i && (i = window.requestAnimationFrame(d))
        }

        function e() {
            window.cancelAnimationFrame(i), i = -1
        }

        function f(b) {
            e(), k[h] && k[h].screen.destroy(), k[b] && (h = b, k[h].screen.reset.apply(k[h].screen, n), a(), m && m(), me.game.repaint())
        }

        var g = {}, h = -1, i = -1, j = !1, k = {}, l = {color: "", duration: 0}, m = null, n = null, o = 0;
        return g.LOADING = 0, g.MENU = 1, g.READY = 2, g.PLAY = 3, g.GAMEOVER = 4, g.GAME_END = 5, g.SCORE = 6, g.CREDITS = 7, g.SETTINGS = 8, g.USER = 100, g.onPause = null, g.onResume = null, g.onStop = null, g.onRestart = null, g.init = function () {
            g.set(g.LOADING, new me.DefaultLoadingScreen)
        }, g.stop = function (a) {
            h !== g.LOADING && g.isRunning() && (e(), a === !0 && me.audio.pauseTrack(), o = window.performance.now(), me.event.publish(me.event.STATE_STOP), "function" == typeof g.onStop && g.onStop())
        }, g.pause = function (a) {
            h === g.LOADING || g.isPaused() || (c(), a === !0 && me.audio.pauseTrack(), o = window.performance.now(), me.event.publish(me.event.STATE_PAUSE), "function" == typeof g.onPause && g.onPause())
        }, g.restart = function (b) {
            g.isRunning() || (a(), b === !0 && me.audio.resumeTrack(), o = window.performance.now() - o, me.game.repaint(), me.event.publish(me.event.STATE_RESTART, [o]), "function" == typeof g.onRestart && g.onRestart())
        }, g.resume = function (a) {
            g.isPaused() && (b(), a === !0 && me.audio.resumeTrack(), o = window.performance.now() - o, me.event.publish(me.event.STATE_RESUME, [o]), "function" == typeof g.onResume && g.onResume())
        }, g.isRunning = function () {
            return -1 !== i
        }, g.isPaused = function () {
            return j
        }, g.set = function (a, b) {
            k[a] = {}, k[a].screen = b, k[a].transition = !0
        }, g.current = function () {
            return k[h].screen
        }, g.transition = function (a, b, c) {
            "fade" === a && (l.color = b, l.duration = c)
        }, g.setTransition = function (a, b) {
            k[a].transition = b
        }, g.change = function (a) {
            if ("undefined" == typeof k[a])throw new me.Error("Undefined ScreenObject for state '" + a + "'");
            n = null, arguments.length > 1 && (n = Array.prototype.slice.call(arguments, 1)), l.duration && k[a].transition ? (m = function () {
                me.game.viewport.fadeOut(l.color, l.duration)
            }, me.game.viewport.fadeIn(l.color, l.duration, function () {
                f.defer(this, a)
            })) : f.defer(this, a)
        }, g.isCurrent = function (a) {
            return h === a
        }, g
    }()
}(), function () {
    var a = me.Renderable.extend({
        init: function (a, b, c) {
            me.Renderable.prototype.init.apply(this, [a.x, a.y, b, c]), this.invalidate = !1, this.barHeight = 4, this.progress = 0
        }, onProgressUpdate: function (a) {
            this.progress = ~~(a * this.width), this.invalidate = !0
        }, update: function () {
            return this.invalidate === !0 ? (this.invalidate = !1, !0) : !1
        }, draw: function (a) {
            a.setColor("#000000"), a.fillRect(0, this.height / 2 - this.barHeight / 2, this.width, this.barHeight), a.setColor("#55aa00"), a.fillRect(2, this.height / 2 - this.barHeight / 2, this.progress, this.barHeight)
        }
    }), b = me.Renderable.extend({
        init: function (a, b, c) {
            me.Renderable.prototype.init.apply(this, [b, c, 100, 85]), this.iconCanvas = a;
            var d = me.CanvasRenderer.getContext2d(this.iconCanvas);
            d.translate(this.pos.x, this.pos.y), d.beginPath(), d.moveTo(.7, 48.9), d.bezierCurveTo(10.8, 68.9, 38.4, 75.8, 62.2, 64.5), d.bezierCurveTo(86.1, 53.1, 97.2, 27.7, 87, 7.7), d.lineTo(87, 7.7), d.bezierCurveTo(89.9, 15.4, 73.9, 30.2, 50.5, 41.4), d.bezierCurveTo(27.1, 52.5, 5.2, 55.8, .7, 48.9), d.lineTo(.7, 48.9), d.lineTo(.7, 48.9), d.closePath(), d.fillStyle = "rgb(255, 255, 255)", d.fill(), d.beginPath(), d.moveTo(84, 7), d.bezierCurveTo(87.6, 14.7, 72.5, 30.2, 50.2, 41.6), d.bezierCurveTo(27.9, 53, 6.9, 55.9, 3.2, 48.2), d.bezierCurveTo(-.5, 40.4, 14.6, 24.9, 36.9, 13.5), d.bezierCurveTo(59.2, 2.2, 80.3, -.8, 84, 7), d.lineTo(84, 7), d.closePath(), d.lineWidth = 5.3, d.strokeStyle = "rgb(255, 255, 255)", d.lineJoin = "miter", d.miterLimit = 4, d.stroke()
        }, draw: function (a) {
            a.drawImage(this.iconCanvas, 0, 0)
        }
    }), c = me.Renderable.extend({
        init: function (a, b) {
            me.Renderable.prototype.init.apply(this, [0, 0, a, b]), this.logo1 = new me.Font("century gothic", 32, "white", "middle"), this.logo2 = new me.Font("century gothic", 32, "#55aa00", "middle"), this.logo2.bold(), this.logo1.textBaseline = this.logo2.textBaseline = "alphabetic"
        }, draw: function (a) {
            var b = a.measureText(this.logo1, "melon").width, c = (this.width - b - a.measureText(this.logo2, "JS").width) / 2, d = this.height / 2 + a.measureText(this.logo2, "melon").height;
            a.drawFont(this.logo1, "melon", c, d), c += b, a.drawFont(this.logo2, "JS", c, d)
        }
    });
    me.DefaultLoadingScreen = me.ScreenObject.extend({
        onResetEvent: function () {
            me.game.reset(), me.game.world.addChild(new me.ColorLayer("background", "#202020", 0));
            var d = new a(new me.Vector2d, me.video.renderer.getWidth(), me.video.renderer.getHeight());
            this.handle = me.event.subscribe(me.event.LOADER_PROGRESS, d.onProgressUpdate.bind(d)), me.game.world.addChild(d, 1), this.iconCanvas = me.video.createCanvas(me.game.viewport.width, me.game.viewport.height, !1);
            var e = new b(this.iconCanvas, (me.video.renderer.getWidth() - 100) / 2, me.video.renderer.getHeight() / 2 - d.barHeight / 2 - 90);
            me.game.world.addChild(e, 1), me.game.world.addChild(new c(me.video.renderer.getWidth(), me.video.renderer.getHeight()), 1)
        }, onDestroyEvent: function () {
            this.handle && (me.event.unsubscribe(this.handle), this.handle = null)
        }
    })
}(), function () {
    me.loader = function () {
        function a() {
            l === k ? f.onload ? (clearTimeout(m), setTimeout(function () {
                f.onload(), me.event.publish(me.event.LOADER_COMPLETE)
            }, 300)) : console.error("no load callback defined") : m = setTimeout(a, 100)
        }

        function b(a, b, c) {
            g[a.name] = new Image, g[a.name].onload = b, g[a.name].onerror = c, g[a.name].src = a.src + f.nocache
        }

        function c(a, b, c) {
            function d(b, c) {
                h[a.name] = {data: b, isTMX: "tmx" === a.type, format: c}
            }

            if ("tmx" === a.type && me.levelDirector.addTMXLevel(a.name), a.data)return d(a.data, a.format), void b();
            var e = new XMLHttpRequest, g = me.utils.getFileExtension(a.src).toLowerCase();
            e.overrideMimeType && e.overrideMimeType("json" === g ? "application/json" : "text/xml"), e.open("GET", a.src + f.nocache, !0), e.ontimeout = c, e.onreadystatechange = function () {
                if (4 === e.readyState)if (200 === e.status || 0 === e.status && e.responseText) {
                    var a = null;
                    switch (g) {
                        case"xml":
                        case"tmx":
                        case"tsx":
                            a = me.device.ua.match(/msie/i) || !e.responseXML ? (new DOMParser).parseFromString(e.responseText, "text/xml") : e.responseXML, a = me.TMXUtils.parse(a), "tmx" === g && (a = a.map), g = "json";
                            break;
                        case"json":
                            a = JSON.parse(e.responseText);
                            break;
                        default:
                            throw new f.Error("TMX file format " + g + "not supported !")
                    }
                    d(a, g), b()
                } else c()
            }, e.send(null)
        }

        function d(a, b, c) {
            var d = new XMLHttpRequest;
            d.overrideMimeType && d.overrideMimeType("application/json"), d.open("GET", a.src + f.nocache, !0), d.ontimeout = c, d.onreadystatechange = function () {
                4 === d.readyState && (200 === d.status || 0 === d.status && d.responseText ? (j[a.name] = JSON.parse(d.responseText), b()) : c())
            }, d.send(null)
        }

        function e(a, b, c) {
            var d = new XMLHttpRequest;
            d.open("GET", a.src + f.nocache, !0), d.responseType = "arraybuffer", d.onerror = c, d.onload = function () {
                var c = d.response;
                if (c) {
                    for (var e = new Uint8Array(c), f = [], g = 0; g < e.byteLength; g++)f[g] = String.fromCharCode(e[g]);
                    i[a.name] = f.join(""), b()
                }
            }, d.send()
        }

        var f = {}, g = {}, h = {}, i = {}, j = {}, k = 0, l = 0, m = 0;
        return f.nocache = "", f.onload = void 0, f.onProgress = void 0, f.Error = me.Error.extend({
            init: function (a) {
                me.Error.prototype.init.apply(this, [a]), this.name = "me.loader.Error"
            }
        }), f.onResourceLoaded = function (a) {
            l++;
            var b = f.getLoadProgress();
            f.onProgress && f.onProgress(b, a), me.event.publish(me.event.LOADER_PROGRESS, [b, a])
        }, f.onLoadingError = function (a) {
            throw new f.Error("Failed loading resource " + a.src)
        }, f.setNocache = function (a) {
            f.nocache = a ? "?" + ~~(1e7 * Math.random()) : ""
        }, f.preload = function (b) {
            for (var c = 0; c < b.length; c++)k += f.load(b[c], f.onResourceLoaded.bind(f, b[c]), f.onLoadingError.bind(f, b[c]));
            a()
        }, f.load = function (a, g, h) {
            switch (a.name = a.name.toLowerCase(), a.type) {
                case"binary":
                    return e.call(this, a, g, h), 1;
                case"image":
                    return b.call(this, a, g, h), 1;
                case"json":
                    return d.call(this, a, g, h), 1;
                case"tmx":
                case"tsx":
                    return c.call(this, a, g, h), 1;
                case"audio":
                    return me.audio.load(a, g, h), 1;
                default:
                    throw new f.Error("load : unknown or invalid resource type : " + a.type)
            }
        }, f.unload = function (a) {
            switch (a.name = a.name.toLowerCase(), a.type) {
                case"binary":
                    return a.name in i ? (delete i[a.name], !0) : !1;
                case"image":
                    return a.name in g ? ("function" == typeof g[a.name].dispose && g[a.name].dispose(), delete g[a.name], !0) : !1;
                case"json":
                    return a.name in j ? (delete j[a.name], !0) : !1;
                case"tmx":
                case"tsx":
                    return a.name in h ? (delete h[a.name], !0) : !1;
                case"audio":
                    return me.audio.unload(a.name);
                default:
                    throw new f.Error("unload : unknown or invalid resource type : " + a.type)
            }
        }, f.unloadAll = function () {
            var a;
            for (a in i)i.hasOwnProperty(a) && f.unload({name: a, type: "binary"});
            for (a in g)g.hasOwnProperty(a) && f.unload({name: a, type: "image"});
            for (a in h)h.hasOwnProperty(a) && f.unload({name: a, type: "tmx"});
            for (a in j)j.hasOwnProperty(a) && f.unload({name: a, type: "json"});
            me.audio.unloadAll()
        }, f.getTMX = function (a) {
            return a = "" + a, a = a.toLowerCase(), a in h ? h[a].data : null
        }, f.getBinary = function (a) {
            return a = "" + a, a = a.toLowerCase(), a in i ? i[a] : null
        }, f.getImage = function (a) {
            return a = "" + a, a = a.toLowerCase(), a in g ? g[a] : null
        }, f.getJSON = function (a) {
            return a = "" + a, a = a.toLowerCase(), a in j ? j[a] : null
        }, f.getLoadProgress = function () {
            return l / k
        }, f
    }()
}(), function () {
    me.Font = me.Renderable.extend({
        init: function (a, b, c, d) {
            this.fontSize = new me.Vector2d, this.fillStyle = c || "#000000", this.strokeStyle = "#000000", this.lineWidth = 1, this.textAlign = d || "left", this.textBaseline = "top", this.lineHeight = 1, this.setFont(a, b, c, d), this.pos = new me.Vector2d(0, 0), me.Renderable.prototype.init.apply(this, [this.pos.x, this.pos.y, 0, this.fontSize.y]), this.gid || (this.gid = me.utils.createGUID())
        }, bold: function () {
            this.font = "bold " + this.font
        }, italic: function () {
            this.font = "italic " + this.font
        }, setFont: function (a, b, c, d) {
            var e = a.split(",").map(function (a) {
                return a = a.trim(), /(^".*"$)|(^'.*'$)/.test(a) ? a : '"' + a + '"'
            });
            this.fontSize.y = +b, this.height = this.fontSize.y, "number" == typeof b && (b += "px"), this.font = b + " " + e.join(","), this.fillStyle = c, d && (this.textAlign = d)
        }, measureText: function (a, b) {
            a.font = this.font, a.fillStyle = this.fillStyle, a.textAlign = this.textAlign, a.textBaseline = this.textBaseline, this.height = this.width = 0;
            for (var c = ("" + b).split("\n"), d = 0; d < c.length; d++)this.width = Math.max(a.measureText(c[d].trimRight()).width, this.width), this.height += this.fontSize.y * this.lineHeight;
            return {width: this.width, height: this.height}
        }, draw: function (a, b, c, d) {
            c = ~~c, d = ~~d;
            var e = a.globalAlpha;
            a.globalAlpha *= this.getOpacity(), this.pos.set(c, d), a.font = this.font, a.fillStyle = this.fillStyle, a.textAlign = this.textAlign, a.textBaseline = this.textBaseline;
            for (var f = ("" + b).split("\n"), g = 0; g < f.length; g++)a.fillText(f[g].trimRight(), c, d), d += this.fontSize.y * this.lineHeight;
            a.globalAlpha = e
        }, drawStroke: function (a, b, c, d) {
            c = ~~c, d = ~~d;
            var e = a.globalAlpha;
            a.globalAlpha *= this.getOpacity(), this.pos.set(c, d), a.font = this.font, a.fillStyle = this.fillStyle, a.strokeStyle = this.strokeStyle, a.lineWidth = this.lineWidth, a.textAlign = this.textAlign, a.textBaseline = this.textBaseline;
            for (var f = ("" + b).split("\n"), g = 0; g < f.length; g++) {
                var h = f[g].trimRight();
                a.strokeText(h, c, d), a.fillText(h, c, d), d += this.fontSize.y * this.lineHeight
            }
            a.globalAlpha = e
        }
    })
}(), function () {
    me.BitmapFont = me.Font.extend({
        init: function (a, b, c, d) {
            this.sSize = new me.Vector2d, this.firstChar = 32, this.charCount = 0, me.Font.prototype.init.apply(this, [a, null, null]), this.firstChar = d || 32, this.loadFontMetrics(a, b), this.textAlign = "left", this.textBaseline = "top", c && this.resize(c)
        }, loadFontMetrics: function (a, b) {
            this.font = me.loader.getImage(a), this.fontSize.x = b.x || b, this.fontSize.y = b.y || this.font.height, this.sSize.copy(this.fontSize), this.height = this.sSize.y, this.charCount = ~~(this.font.width / this.fontSize.x)
        }, set: function (a, b) {
            this.textAlign = a, b && this.resize(b)
        }, resize: function (a) {
            this.sSize.setV(this.fontSize), this.sSize.x *= a, this.sSize.y *= a, this.height = this.sSize.y
        }, measureText: function (a, b) {
            var c = ("" + b).split("\n");
            this.height = this.width = 0;
            for (var d = 0; d < c.length; d++)this.width = Math.max(c[d].trimRight().length * this.sSize.x, this.width), this.height += this.sSize.y * this.lineHeight;
            return {width: this.width, height: this.height}
        }, draw: function (a, b, c, d) {
            var e = ("" + b).split("\n"), f = c, g = this.sSize.y * this.lineHeight, h = a.globalAlpha();
            a.setGlobalAlpha(h * this.getOpacity()), this.pos.set(c, d);
            for (var i = 0; i < e.length; i++) {
                c = f;
                var j = e[i].trimRight(), k = j.length * this.sSize.x;
                switch (this.textAlign) {
                    case"right":
                        c -= k;
                        break;
                    case"center":
                        c -= .5 * k
                }
                switch (this.textBaseline) {
                    case"middle":
                        d -= .5 * g;
                        break;
                    case"ideographic":
                    case"alphabetic":
                    case"bottom":
                        d -= g
                }
                for (var l = 0, m = j.length; m > l; l++) {
                    var n = j.charCodeAt(l) - this.firstChar;
                    n >= 0 && a.drawImage(this.font, this.fontSize.x * (n % this.charCount), this.fontSize.y * ~~(n / this.charCount), this.fontSize.x, this.fontSize.y, ~~c, ~~d, this.sSize.x, this.sSize.y), c += this.sSize.x
                }
                d += g
            }
            a.setGlobalAlpha(h)
        }
    })
}(), function () {
    me.audio = function () {
        function a(a, d) {
            if (e++ > 3) {
                var f = "melonJS: failed loading " + a;
                if (me.sys.stopOnAudioError !== !1)throw new b.Error(f);
                me.audio.disable(), d && d(), console.log(f + ", disabling audio")
            } else c[a].load()
        }

        var b = {}, c = {}, d = null, e = 0;
        return b.Error = me.Error.extend({
            init: function (a) {
                me.Error.prototype.init.apply(this, [a]), this.name = "me.audio.Error"
            }
        }), b.init = function (a) {
            if (!me.initialized)throw new b.Error("me.audio.init() called before engine initialization.");
            return a = "string" == typeof a ? a : "mp3", this.audioFormats = a.split(","), !Howler.noAudio
        }, b.enable = function () {
            this.unmuteAll()
        }, b.disable = function () {
            this.muteAll()
        }, b.load = function (d, f, g) {
            var h = [];
            if ("undefined" == typeof this.audioFormats || 0 === this.audioFormats.length)throw new b.Error("target audio extension(s) should be set through me.audio.init() before calling the preloader.");
            for (var i = 0; i < this.audioFormats.length; i++)h.push(d.src + d.name + "." + this.audioFormats[i] + me.loader.nocache);
            return c[d.name] = new Howl({
                src: h, volume: Howler.volume(), onloaderror: function () {
                    c[d.name] = this, a.call(me.audio, d.name, g)
                }, onload: function () {
                    c[d.name] = this, e = 0, f && f()
                }
            }), 1
        }, b.play = function (a, b, d, e) {
            var f = c[a.toLowerCase()];
            if (f && "undefined" != typeof f) {
                var g = f.play();
                return "boolean" == typeof b && f.loop(b, g), f.volume("number" == typeof e ? e.clamp(0, 1) : Howler.volume(), g), "function" == typeof d && (b === !0 ? f.on("end", d, g) : f.once("end", d, g)), g
            }
        }, b.fade = function (a, b, d, e, f) {
            var g = c[a.toLowerCase()];
            g && "undefined" != typeof g && g.fade(b, d, e, f)
        }, b.stop = function (a, b) {
            var d = c[a.toLowerCase()];
            d && "undefined" != typeof d && (d.stop(b), d.off("end", b))
        }, b.pause = function (a, b) {
            var d = c[a.toLowerCase()];
            d && "undefined" != typeof d && d.pause(b)
        }, b.playTrack = function (a, b) {
            return d = a.toLowerCase(), me.audio.play(d, !0, null, b)
        }, b.stopTrack = function () {
            null !== d && (c[d].stop(), d = null)
        }, b.pauseTrack = function () {
            null !== d && c[d].pause()
        }, b.resumeTrack = function () {
            null !== d && c[d].play()
        }, b.getCurrentTrack = function () {
            return d
        }, b.setVolume = function (a) {
            Howler.volume(a)
        }, b.getVolume = function () {
            return Howler.volume()
        }, b.mute = function (a, b, d) {
            d = "undefined" == typeof d ? !0 : !!d;
            var e = c[a.toLowerCase()];
            e && "undefined" != typeof e && e.mute(d, b)
        }, b.unmute = function (a, c) {
            b.mute(a, c, !1)
        }, b.muteAll = function () {
            Howler.mute(!0)
        }, b.unmuteAll = function () {
            Howler.mute(!1)
        }, b.unload = function (a) {
            return a = a.toLowerCase(), a in c ? (c[a].unload(), delete c[a], !0) : !1
        }, b.unloadAll = function () {
            for (var a in c)c.hasOwnProperty(a) && b.unload(a)
        }, b
    }()
}(), function () {
    me.CanvasRenderer = function () {
        var a = {}, b = null, c = null, d = null, e = null, f = null, g = null, h = [], i = 0, j = 0;
        return a.init = function (h, k, l, m, n, o) {
            return b = h, c = this.getContext2d(b), d = m, d ? (e = me.video.createCanvas(k, l, !1), f = this.getContext2d(e)) : (e = b, f = c), j = n, i = o, g = new me.Color(255, 255, 255, 1), a.setColor(g), this
        }, a.applyRGBFilter = function (b, c, d) {
            var e, f, g = a.getContext2d(me.video.createCanvas(b.width, b.height, !1)), h = me.utils.getPixels(b), i = h.data;
            switch (c) {
                case"b&w":
                    for (e = 0, f = i.length; f > e; e += 4) {
                        var j = 3 * i[e] + 4 * i[e + 1] + i[e + 2] >>> 3;
                        i[e] = j, i[e + 1] = j, i[e + 2] = j
                    }
                    break;
                case"brightness":
                    var k = Math.abs(d).clamp(0, 1);
                    for (e = 0, f = i.length; f > e; e += 4)i[e] *= k, i[e + 1] *= k, i[e + 2] *= k;
                    break;
                case"transparent":
                    var l = me.pool.pull("me.Color").parseCSS(d), m = me.pool.pull("me.Color");
                    for (e = 0, f = i.length; f > e; e += 4)m.setColor(i[e], i[e + 1], i[e + 2]), m.equals(l) && (i[e + 3] = 0);
                    me.pool.push(l), me.pool.push(m);
                    break;
                default:
                    return null
            }
            return g.putImageData(h, 0, 0), g
        }, a.blitSurface = function () {
            a.blitSurface = d ? function () {
                c.drawImage(e, 0, 0, e.width, e.height, 0, 0, j, i)
            } : function () {
            }, a.blitSurface()
        }, a.clearSurface = function (a, b) {
            a || (a = f);
            var c = a.canvas;
            a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.fillStyle = b instanceof me.Color ? b.toRGBA() : b, a.fillRect(0, 0, c.width, c.height), a.restore()
        }, a.drawFont = function (a, b, c, d) {
            a.draw(f, b, c, d)
        }, a.drawLine = function (a, b, c, d) {
            f.translate(a, b), f.beginPath(), f.moveTo(0, 0), f.lineTo(c, d), f.stroke(), f.closePath(), f.translate(-a, -b)
        }, a.drawImage = function () {
            f.drawImage.apply(f, arguments)
        }, a.fillArc = function (a, b, c, d, e, g) {
            f.save(), f.beginPath(), f.translate(a + c, b + c), f.arc(0, 0, c, d, e, g || !1), f.fill(), f.closePath(), f.restore()
        }, a.fillRect = function (a, b, c, d) {
            f.fillRect(a, b, c, d)
        }, a.getScreenCanvas = function () {
            return b
        }, a.getScreenContext = function () {
            return c
        }, a.getContext2d = function (a) {
            if ("undefined" == typeof a || null === a)throw new me.video.Error("You must pass a canvas element in order to create a 2d context");
            if ("undefined" == typeof a.getContext)throw new me.video.Error("Your browser does not support HTML5 canvas.");
            var b;
            return b = navigator.isCocoonJS ? a.getContext("2d", {antialias: me.sys.scalingInterpolation}) : a.getContext("2d"), b.canvas || (b.canvas = a), this.setImageSmoothing(b, me.sys.scalingInterpolation), b
        }, a.getCanvas = function () {
            return e
        }, a.getColor = function () {
            return g.clone()
        }, a.getContext = function () {
            return f
        }, a.getWidth = function () {
            return e.width
        }, a.getHeight = function () {
            return e.height
        }, a.globalAlpha = function () {
            return g.alpha
        }, a.measureText = function (a, b) {
            return a.measureText(f, b)
        }, a.resetTransform = function () {
            f.setTransform(1, 0, 0, 1, 0, 0)
        }, a.resize = function (a, d) {
            b.width = j = e.width * a, b.height = i = e.height * d, me.device.getPixelRatio() > 1 && (b.style.width = b.width / me.device.getPixelRatio() + "px", b.style.height = b.height / me.device.getPixelRatio() + "px"), this.setImageSmoothing(c, me.sys.scalingInterpolation), this.blitSurface()
        }, a.save = function () {
            h.push(a.getColor()), f.save()
        }, a.restore = function () {
            var b = h.pop();
            me.pool.push("me.Color", b), f.restore(), a.setColor(b)
        }, a.rotate = function (a) {
            f.rotate(a)
        }, a.scale = function (a, b) {
            f.scale(a, b)
        }, a.setAlpha = function (a) {
            f.globalCompositeOperation = a ? "source-over" : "copy"
        }, a.setColor = function (a) {
            g.copy(a), f.strokeStyle = f.fillStyle = g.toRGBA()
        }, a.setGlobalAlpha = function (a) {
            g.setColor(g.r, g.g, g.b, a), f.globalAlpha = a
        }, a.setImageSmoothing = function (a, b) {
            me.agent.setPrefixed("imageSmoothingEnabled", b === !0, a)
        }, a.setLineWidth = function (a) {
            f.lineWidth = a
        }, a.strokeArc = function (a, b, c, d, e, g) {
            f.beginPath(), f.translate(a + c, b + c), f.arc(0, 0, c, d, e, g || !1), f.stroke(), f.closePath()
        }, a.strokeEllipse = function (a, b, d, e) {
            c.beginPath();
            var g = d, h = e, i = a - g, j = a + g, k = b - h, l = b + h, m = .551784 * g, n = .551784 * h, o = a - m, p = a + m, q = b - n, r = b + n;
            f.moveTo(a, k), f.bezierCurveTo(p, k, j, q, j, b), f.bezierCurveTo(j, r, p, l, a, l), f.bezierCurveTo(o, l, i, r, i, b), f.bezierCurveTo(i, q, o, k, a, k), f.stroke()
        }, a.strokeLine = function (a, b, d, e) {
            c.beginPath(), c.moveTo(a, b), c.lineTo(d, e), c.stroke()
        }, a.strokePolygon = function (a) {
            f.translate(a.pos.x, a.pos.y), f.beginPath(), f.moveTo(a.points[0].x, a.points[0].y);
            for (var b, c = 1; c < a.points.length; c++)b = a.points[c], f.lineTo(b.x, b.y);
            f.lineTo(a.points[0].x, a.points[0].y), f.stroke(), f.closePath(), f.translate(-a.pos.x, -a.pos.y)
        }, a.strokeRect = function (a, b, c, d) {
            f.strokeRect(a, b, c, d)
        }, a.drawShape = function (b) {
            b instanceof me.Rect ? a.strokeRect(b.left, b.top, b.width, b.height) : b instanceof me.Line || b instanceof me.Polygon ? (a.save(), a.strokePolygon(b), a.restore()) : b instanceof me.Ellipse && (a.save(), b.radiusV.x === b.radiusV.y ? a.strokeArc(b.pos.x - b.radius, b.pos.y - b.radius, b.radius, 0, 2 * Math.PI) : a.strokeEllipse(b.pos.x, b.pos.y, b.radiusV.x, b.radiusV.y), a.restore())
        }, a.transform = function () {
            f.transform(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        }, a.translate = function (a, b) {
            f.translate(a, b)
        }, a
    }()
}(), function () {
    me.video = function () {
        function a() {
            try {
                return me.WebGLRenderer.init.apply(me.WebGLRenderer, arguments)
            } catch (a) {
                return me.CanvasRenderer.init.apply(me.CanvasRenderer, arguments)
            }
        }

        var b = {}, c = null, d = null, e = -1, f = !1, g = !1, h = !0, i = 1 / 0, j = 1 / 0;
        return b.Error = me.Error.extend({
            init: function (a) {
                me.Error.prototype.init.apply(this, [a]), this.name = "me.video.Error"
            }
        }), b.CANVAS = 0, b.WEBGL = 1, b.AUTO = 2, b.init = function (e, i, j, k, l, m, n) {
            if (!me.initialized)throw new b.Error("me.video.init() called before engine initialization.");
            f = l || !1, g = "auto" === m || !1, h = "undefined" != typeof n ? n : !0, m = g ? 1 : +m || 1, me.sys.scale = new me.Vector2d(m, m), (g || 1 !== m) && (f = !0);
            var o = j * me.sys.scale.x, p = k * me.sys.scale.y;
            if (window.addEventListener("resize", throttle(100, !1, function (a) {
                    me.event.publish(me.event.WINDOW_ONRESIZE, [a])
                }), !1), window.addEventListener("orientationchange", function (a) {
                    me.event.publish(me.event.WINDOW_ONORIENTATION_CHANGE, [a])
                }, !1), me.event.subscribe(me.event.WINDOW_ONRESIZE, me.video.onresize.bind(me.video)), me.event.subscribe(me.event.WINDOW_ONORIENTATION_CHANGE, me.video.onresize.bind(me.video)), c = b.createCanvas(o, p, !0), e && (d = document.getElementById(e)), d || (d = document.body), d.appendChild(c), !c.getContext)return !1;
            switch (i) {
                case b.WEBGL:
                    this.renderer = me.WebGLRenderer.init(c, j, k);
                    break;
                case b.AUTO:
                    this.renderer = a(c, j, k, f, o, p);
                    break;
                default:
                    this.renderer = me.CanvasRenderer.init(c, j, k, f, o, p)
            }
            var q = me.device.getPixelRatio();
            if (q > 1 && (c.style.width = c.width / q + "px", c.style.height = c.height / q + "px"), window.getComputedStyle) {
                var r = window.getComputedStyle(c, null);
                me.video.setMaxSize(parseInt(r.maxWidth, 10), parseInt(r.maxHeight, 10))
            }
            return me.video.onresize(), me.game.init(), !0
        }, b.getPos = function (a) {
            return a = a || this.renderer.getScreenCanvas(), a.getBoundingClientRect ? a.getBoundingClientRect() : {
                left: 0,
                top: 0
            }
        }, b.setMaxSize = function (a, b) {
            i = a || 1 / 0, j = b || 1 / 0
        }, b.createCanvas = function (a, d, e) {
            if (0 === a || 0 === d)throw new b.Error("width or height was zero, Canvas could not be initialized !");
            var f = document.createElement("canvas");
            return e === !0 && navigator.isCocoonJS && me.device.android2 !== !0 && (f.screencanvas = !0), f.width = a || c.width, f.height = d || c.height, f
        }, b.getWrapper = function () {
            return d
        }, b.onresize = function () {
            var a = 1, b = 1;
            if (me.device.orientation = "undefined" != typeof window.orientation ? window.orientation : window.outerWidth > window.outerHeight ? 90 : 0, g) {
                var c = me.video.renderer.getScreenCanvas().parentNode, d = Math.min(i, c.width || window.innerWidth), f = Math.min(j, c.height || window.innerHeight);
                if (h) {
                    var k = me.video.renderer.getWidth() / me.video.renderer.getHeight(), l = d / f;
                    a = b = k > l ? d / me.video.renderer.getWidth() : f / me.video.renderer.getHeight()
                } else a = d / me.video.renderer.getWidth(), b = f / me.video.renderer.getHeight();
                if (a *= me.device.getPixelRatio(), b *= me.device.getPixelRatio(), 1 !== a || 1 !== b)return e >= 0 && clearTimeout(e), void(e = me.video.updateDisplaySize.defer(this, a, b))
            }
            me.input._offset = me.video.getPos()
        }, b.updateDisplaySize = function (a, b) {
            me.sys.scale.set(a, b), this.renderer.resize(a, b), me.input._offset = me.video.getPos(), e = -1
        }, b.setAlpha = function (a) {
            this.renderer.setAlpha(a)
        }, b
    }()
}(), function () {
    me.video.shader = function () {
        function a(a, b, c) {
            var d = a.createShader(b);
            if (a.shaderSource(d, c), a.compileShader(d), !a.getShaderParameter(d, a.COMPILE_STATUS))throw new me.video.Error(a.getShaderInfoLog(d));
            return d
        }

        var b = {
            attributes: {},
            uniforms: {},
            handle: null
        }, c = "precision mediump float;\nvarying vec2 vTexCoord;\nuniform vec4 uColor;\nuniform sampler2D texture;\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vec2(vTexCoord.s, vTexCoord.t)) * uColor;\n}\n", d = "attribute vec2 aPosition;\nattribute vec2 aTexture;\nuniform mat3 uMatrix;\nuniform mat3 pMatrix;\nvarying vec2 vTexCoord;\nvoid main(void) {\n   gl_Position = vec4((pMatrix * (uMatrix * vec3(aPosition, 1))).xy, 0, 1);\n   vTexCoord = aTexture;\n}\n";
        return b.bind = function () {
        }, b.createShader = function (e) {
            var f = b.handle = e.createProgram();
            if (e.attachShader(f, a(e, e.VERTEX_SHADER, d)), e.attachShader(f, a(e, e.FRAGMENT_SHADER, c)), e.linkProgram(f), !e.getProgramParameter(f, e.LINK_STATUS))throw new me.video.Error("Could not initialize shaders");
            e.useProgram(f);
            var g = {}, h = {};
            ["aPosition", "aTexture"].forEach(function (a) {
                h[a] = {location: e.getAttribLocation(f, a)}, e.enableVertexAttribArray(h[a].location), g[a] = {
                    get: function (a) {
                        return function () {
                            return h[a]
                        }
                    }(a)
                }
            }), Object.defineProperties(b.attributes, g);
            var i = {}, j = {};
            return ["pMatrix", "uMatrix", "uColor", "texture"].forEach(function (a) {
                j[a] = {location: e.getUniformLocation(f, a)}, i[a] = {
                    get: function (a) {
                        return function () {
                            return j[a]
                        }
                    }(a), set: function (a) {
                        return "uColor" === a ? function (b) {
                            e.uniform4fv(j[a].location, b)
                        } : "texture" === a ? function () {
                            e.uniform1i(j[a].location, 0)
                        } : function (b) {
                            e.uniformMatrix3fv(j[a].location, !1, b)
                        }
                    }(a)
                }
            }), Object.defineProperties(b.uniforms, i), b
        }, b.gltexture2d = function (a, b) {
            var c = a.createTexture(), d = me.sys.scalingInterpolation ? a.LINEAR : a.NEAREST;
            return c.bind = function () {
                return a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, c), c
            }, c.bind(), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, d), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, d), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b), c
        }, b
    }()
}(), function () {
    me.WebGLRenderer = function () {
        var a = {}, b = null, c = [], d = null, e = {}, f = null, g = null, h = null, i = null, j = new Float32Array(8), k = new Float32Array(8), l = [], m = null, n = null, o = null, p = new Float32Array(12), q = null, r = new Float32Array(12), s = null;
        return a.init = function (a, c, e) {
            return b = a, h = this.getContextGL(a), h.FALSE = !1, h.TRUE = !0, d = {
                width: c,
                height: e
            }, this.uniformMatrix = new me.Matrix3d, this.projection = new me.Matrix3d({val: new Float32Array([2 / c, 0, 0, 0, -2 / e, 0, -1, 1, 1])}), this.createShader(), n.bind(), h.enableVertexAttribArray(n.attributes.aTexture.location), h.enableVertexAttribArray(n.attributes.aPosition.location), i = new me.Color(255, 255, 255, 1), f = me.video.createCanvas(c, e, !1), g = me.CanvasRenderer.getContext2d(f), s = h.createTexture(), h.bindTexture(h.TEXTURE_2D, s), h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, 1, 1, 0, h.RGBA, h.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255])), this.createBuffers(), h.clearColor(0, 0, 0, 1), h.enable(h.BLEND), h.blendFunc(h.SRC_ALPHA, h.ONE_MINUS_SRC_ALPHA), q = h.getUniformLocation(n.handle, "texture"), this.resize(1, 1), this
        }, a.applyProjection = function () {
            n.uniforms.pMatrix = this.projection.val
        }, a.bindTexture = function (a) {
            var b = a.width, c = a.height;
            a.texture = me.video.shader.gltexture2d(h, a), a.vb = h.createBuffer(), h.bindBuffer(h.ARRAY_BUFFER, a.vb), h.bufferData(h.ARRAY_BUFFER, new Float32Array([0, 0, b, 0, 0, c, b, c]), h.STATIC_DRAW), a.t = {};
            var d = "0,0," + b + "," + c;
            this.cacheTextureCoords(a, d, 0, 0, b, c), a.ib = h.createBuffer(), h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, a.ib), h.bufferData(h.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 2, 1, 3]), h.STATIC_DRAW)
        }, a.bindTextureCoords = function (a, b, c, d, e) {
            var f = b + "," + c + "," + d + "," + e;
            f in a.t ? h.bindBuffer(h.ARRAY_BUFFER, a.t[f]) : this.cacheTextureCoords(a, f, b, c, d, e)
        }, a.cacheTextureCoords = function (a, b, c, d, e, f) {
            e = (c + e) / a.width, f = (d + f) / a.height, c /= a.width, d /= a.height, a.t[b] = h.createBuffer(), h.bindBuffer(h.ARRAY_BUFFER, a.t[b]), h.bufferData(h.ARRAY_BUFFER, new Float32Array([c, d, e, d, c, f, e, f]), h.STATIC_DRAW)
        }, a.blitSurface = function () {
        }, a.clearSurface = function (a, d) {
            a || (a = h), c.push(this.getColor()), this.setColor(d), this.fillRect(0, 0, b.width, b.height), this.setColor(c.pop())
        }, a.createBuffers = function () {
            o = h.createBuffer(), m = h.createBuffer()
        }, a.createShader = function () {
            n = me.video.shader.createShader(h)
        }, a.drawFont = function (a, c, d, h) {
            var i, j = a.gid;
            if (e[j]) {
                var k = e[j];
                if (a.font !== k.font || a.fontSize !== k.fontSize || a.fillStyle !== k.fillStyle || a.textAlign !== k.textAlign || a.textBaseline !== k.textBaseline || a.lineHeight !== k.lineHeight || c !== k.text) {
                    switch (k.font = a.font, k.fontSize = a.fontSize, k.fillStyle = a.fillStyle, k.textAlign = a.textAlign, k.textBaseline = a.textBaseline, k.lineHeight = a.lineHeight, k.text = c, a.draw(g, c, d, h), i = a.measureText(g, c), k.yOffset = 0, k.textBaseline) {
                        case"alphabetic":
                        case"ideographic":
                        case"bottom":
                            k.yOffset = i.height;
                            break;
                        case"middle":
                            k.yOffset = i.height / 2
                    }
                    k.width = i.width, k.height = 1.2 * i.height, k.image = g.getImageData(0, 0, f.width, f.height), g.clearRect(0, 0, b.width, b.height)
                }
            } else {
                switch (a.draw(g, c, d, h), i = a.measureText(g, c), e[j] = {
                    font: a.font,
                    fontSize: a.fontSize,
                    fillStyle: a.fillStyle,
                    textAlign: a.textAlign,
                    textBaseline: a.textBaseline,
                    lineHeight: a.lineHeight,
                    text: a.text,
                    image: g.getImageData(0, 0, f.width, f.height),
                    width: i.width,
                    height: 1.2 * i.height,
                    yOffset: 0
                }, a.textBaseline) {
                    case"alphabetic":
                    case"ideographic":
                    case"bottom":
                        e[j].yOffset = i.height;
                        break;
                    case"middle":
                        e[j].yOffset = i.height / 2
                }
                g.clearRect(0, 0, b.width, b.height)
            }
            h -= e[j].yOffset, this.drawImage(e[j].image, d, h, e[j].width, e[j].height, d, h, e[j].width, e[j].height)
        }, a.drawLine = function () {
        }, a.drawImage = function (a, b, c, d, e, f, g, j, k) {
            "undefined" == typeof a.texture && this.bindTexture(a), "undefined" == typeof d ? (d = j = a.width, e = k = a.height, f = b, g = c, b = 0, c = 0) : "undefined" == typeof f && (f = b, g = c, j = d, k = e, d = a.width, e = a.height, b = 0, c = 0), l.push(this.uniformMatrix.clone()), this.uniformMatrix.translate(~~f, ~~g), this.uniformMatrix.scale(j / a.width, k / a.height), h.bindBuffer(h.ARRAY_BUFFER, a.vb), h.vertexAttribPointer(n.attributes.aPosition.location, 2, h.FLOAT, !1, 0, 0), this.bindTextureCoords(a, ~~b, ~~c, ~~d, ~~e), h.vertexAttribPointer(n.attributes.aTexture.location, 2, h.FLOAT, !1, 0, 0), n.uniforms.texture = a.texture.bind(), n.uniforms.uMatrix = this.uniformMatrix.val, n.uniforms.uColor = i.toGL(), h.drawElements(h.TRIANGLES, 6, h.UNSIGNED_SHORT, 0), this.uniformMatrix.copy(l.pop())
        }, a.fillRect = function (a, b, c, d) {
            var e = a, f = b, g = a + c, j = b + d;
            r[0] = e, r[1] = f, r[2] = g, r[3] = f, r[4] = e, r[5] = j, r[6] = e, r[7] = j, r[8] = g, r[9] = f, r[10] = g, r[11] = j, h.bindBuffer(h.ARRAY_BUFFER, m), h.bufferData(h.ARRAY_BUFFER, r, h.STATIC_DRAW), h.vertexAttribPointer(n.attributes.aPosition.location, 2, h.FLOAT, !1, 0, 0), p[0] = 0, p[1] = 0, p[2] = 1, p[3] = 0, p[4] = 0, p[5] = 1, p[6] = 0, p[7] = 1, p[8] = 1, p[9] = 0, p[10] = 1, p[11] = 1, h.activeTexture(h.TEXTURE0), h.bindTexture(h.TEXTURE_2D, s), h.bindBuffer(h.ARRAY_BUFFER, o), h.bufferData(h.ARRAY_BUFFER, p, h.STATIC_DRAW), h.vertexAttribPointer(n.attributes.aTexture.location, 2, h.FLOAT, !1, 0, 0), h.uniform1i(q, 0), n.uniforms.uMatrix = this.uniformMatrix.val, n.uniforms.uColor = i.toGL(), h.drawArrays(h.TRIANGLES, 0, 6)
        }, a.getScreenCanvas = function () {
            return b
        }, a.getScreenContext = function () {
            return h
        }, a.getContextGL = function (a) {
            if ("undefined" == typeof a || null === a)throw new me.video.Error("You must pass a canvas element in order to create a GL context");
            if ("undefined" == typeof a.getContext)throw new me.video.Error("Your browser does not support WebGL.");
            var b = {antialias: me.sys.scalingInterpolation};
            return a.getContext("webgl", b) || a.getContext("experimental-webgl", b)
        }, a.getCanvas = function () {
            return b
        }, a.getColor = function () {
            return i.clone()
        }, a.getContext = function () {
            return h
        }, a.getWidth = function () {
            return h.canvas.width
        }, a.getHeight = function () {
            return h.canvas.height
        }, a.globalAlpha = function () {
            return i.alpha
        }, a.measureText = function (a, b) {
            return a.measureText(g, b)
        }, a.resetTransform = function () {
            this.uniformMatrix.identity()
        }, a.resize = function (a, c) {
            b.width = d.width, b.height = d.height;
            var e = d.width * a, f = d.height * c;
            me.device.getPixelRatio() > 1 ? (b.style.width = e / me.device.getPixelRatio() + "px", b.style.height = f / me.device.getPixelRatio() + "px") : (b.style.width = e + "px", b.style.height = f + "px"), h.viewport(0, 0, d.width, d.height), this.setProjection(), this.applyProjection()
        }, a.restore = function () {
            var a = c.pop();
            me.pool.push("me.Color", a), i.copy(a), this.uniformMatrix.copy(l.pop())
        }, a.rotate = function (a) {
            this.uniformMatrix.rotate(a)
        }, a.save = function () {
            c.push(this.getColor()), l.push(this.uniformMatrix.clone())
        }, a.scale = function (a, b) {
            this.uniformMatrix.scale(a, b)
        }, a.setAlpha = function () {
        }, a.setProjection = function () {
            this.projection.set(2 / b.width, 0, 0, 0, -2 / b.height, 0, -1, 1, 1)
        }, a.setImageSmoothing = function () {
        }, a.setGlobalAlpha = function (a) {
            i.setColor(i.r, i.g, i.b, a)
        }, a.setColor = function (a) {
            i.copy(a)
        }, a.setLineWidth = function () {
        }, a.strokeArc = function () {
        }, a.strokeEllipse = function () {
        }, a.strokeLine = function () {
        }, a.strokePolygon = function () {
        }, a.strokeRect = function (a, b, c, d) {
            var e = a, f = b, g = a + c, l = b + d;
            k[0] = e, k[1] = f, k[2] = g, k[3] = f, k[4] = g, k[5] = l, k[6] = e, k[7] = l, h.bindBuffer(h.ARRAY_BUFFER, m), h.bufferData(h.ARRAY_BUFFER, k, h.STATIC_DRAW), h.vertexAttribPointer(n.attributes.aPosition.location, 2, h.FLOAT, !1, 0, 0), j[0] = 0, j[1] = 0, j[2] = 1, j[3] = 0, j[4] = 1, j[5] = 1, j[6] = 0, j[7] = 1, h.activeTexture(h.TEXTURE0), h.bindTexture(h.TEXTURE_2D, s), h.bindBuffer(h.ARRAY_BUFFER, o), h.bufferData(h.ARRAY_BUFFER, j, h.STATIC_DRAW), h.vertexAttribPointer(n.attributes.aTexture.location, 2, h.FLOAT, !1, 0, 0), h.uniform1i(q, 0), n.uniforms.uMatrix = this.uniformMatrix.val, n.uniforms.uColor = i.toGL(), h.drawArrays(h.LINE_LOOP, 0, 4)
        }, a.drawShape = function (b) {
            b instanceof me.Rect ? a.strokeRect(b.left, b.top, b.width, b.height) : b instanceof me.Line || b instanceof me.Polygon ? (a.save(), a.strokePolygon(b), a.restore()) : b instanceof me.Ellipse && (a.save(), b.radiusV.x === b.radiusV.y ? a.strokeArc(b.pos.x - b.radius, b.pos.y - b.radius, b.radius, 0, 2 * Math.PI) : a.strokeEllipse(b.pos.x, b.pos.y, b.radiusV.x, b.radiusV.y), a.restore())
        }, a.transform = function () {
            var a = new Float32Array(9);
            a[0] = arguments[0], a[1] = arguments[1], a[2] = 0, a[3] = arguments[2], a[4] = arguments[3], a[5] = 0, a[6] = arguments[4], a[7] = arguments[5], a[8] = 1, this.uniformMatrix.multiplyArray(a)
        }, a.translate = function (a, b) {
            this.uniformMatrix.translate(a, b)
        }, a
    }()
}(), function () {
    me.input = function () {
        var a = {};
        return a._preventDefault = function (a) {
            return a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0, a.preventDefault ? a.preventDefault() : a.returnValue = !1, !1
        }, a.preventDefault = !0, a
    }()
}(), function () {
    var a = me.input;
    a._KeyBinding = {};
    var b = {}, c = {}, d = {}, e = {}, f = {}, g = !1;
    a._enableKeyboardEvent = function () {
        g || (window.addEventListener("keydown", a._keydown, !1), window.addEventListener("keyup", a._keyup, !1), g = !0)
    }, a._keydown = function (c, g, h) {
        g = g || c.keyCode || c.which;
        var i = a._KeyBinding[g];
        if (me.event.publish(me.event.KEYDOWN, [i, g, i ? !d[i] : !0]), i) {
            if (!d[i]) {
                var j = h ? h : g;
                e[i][j] || (b[i]++, e[i][j] = !0)
            }
            return f[g] ? a._preventDefault(c) : !0
        }
        return !0
    }, a._keyup = function (c, g, h) {
        g = g || c.keyCode || c.which;
        var i = a._KeyBinding[g];
        if (me.event.publish(me.event.KEYUP, [i, g]), i) {
            var j = h ? h : g;
            return e[i][j] = void 0, b[i] > 0 && b[i]--, d[i] = !1, f[g] ? a._preventDefault(c) : !0
        }
        return !0
    }, a.KEY = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PRINT_SCREEN: 42,
        INSERT: 45,
        DELETE: 46,
        NUM0: 48,
        NUM1: 49,
        NUM2: 50,
        NUM3: 51,
        NUM4: 52,
        NUM5: 53,
        NUM6: 54,
        NUM7: 55,
        NUM8: 56,
        NUM9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        WINDOW_KEY: 91,
        NUMPAD0: 96,
        NUMPAD1: 97,
        NUMPAD2: 98,
        NUMPAD3: 99,
        NUMPAD4: 100,
        NUMPAD5: 101,
        NUMPAD6: 102,
        NUMPAD7: 103,
        NUMPAD8: 104,
        NUMPAD9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBSTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUM_LOCK: 144,
        SCROLL_LOCK: 145,
        SEMICOLON: 186,
        PLUS: 187,
        COMMA: 188,
        MINUS: 189,
        PERIOD: 190,
        FORWAND_SLASH: 191,
        GRAVE_ACCENT: 192,
        OPEN_BRACKET: 219,
        BACK_SLASH: 220,
        CLOSE_BRACKET: 221,
        SINGLE_QUOTE: 222
    }, a.isKeyPressed = function (a) {
        return b[a] && !d[a] ? (c[a] && (d[a] = !0), !0) : !1
    }, a.keyStatus = function (a) {
        return b[a] > 0
    }, a.triggerKeyEvent = function (b, c) {
        c ? a._keydown({}, b) : a._keyup({}, b)
    }, a.bindKey = function (g, h, i, j) {
        a._enableKeyboardEvent(), "boolean" != typeof j && (j = a.preventDefault), a._KeyBinding[g] = h, f[g] = j, b[h] = 0, c[h] = i ? i : !1, d[h] = !1, e[h] = {}
    }, a.unlockKey = function (a) {
        d[a] = !1
    }, a.unbindKey = function (d) {
        var g = a._KeyBinding[d];
        b[g] = 0, c[g] = !1, e[g] = {}, a._KeyBinding[d] = null, f[d] = null
    }
}(), function () {
    function a(a, b) {
        for (var c = 2; c < a.length; ++c)"undefined" != typeof a[c] && me.video.renderer.getScreenCanvas().addEventListener(a[c], b, !1)
    }

    function b() {
        j || (w.push({
            x: 0,
            y: 0
        }), h.mouse.pos = new me.Vector2d(0, 0), h._offset = me.video.getPos(), window.addEventListener("scroll", throttle(100, !1, function (a) {
            h._offset = me.video.getPos(), me.event.publish(me.event.WINDOW_ONSCROLL, [a])
        }), !1), m = navigator.pointerEnabled ? n : navigator.msPointerEnabled ? o : me.device.touch ? q : p, a(m, g), k = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel", window.addEventListener(k, e, !1), "undefined" == typeof h.throttlingInterval && (h.throttlingInterval = ~~(1e3 / me.sys.fps)), h.throttlingInterval < 17 ? me.video.renderer.getScreenCanvas().addEventListener(m[r], f, !1) : me.video.renderer.getScreenCanvas().addEventListener(m[r], throttle(h.throttlingInterval, !1, function (a) {
            f(a)
        }), !1), j = !0)
    }

    function c(a) {
        var b = !1, c = i[a.type];
        if (c || (c = m.indexOf(a.type) === u ? i[m[t]] : i[a.type]), c) {
            me.game.viewport.localToWorld(0, 0, v);
            for (var d = 0, e = w.length; e > d; d++) {
                if ("undefined" != typeof a.timeStamp) {
                    if (a.timeStamp < l)continue;
                    l = a.timeStamp
                }
                me.device.pointerEnabled || (a.pointerId = w[d].id), a.gameScreenX = w[d].x, a.gameScreenY = w[d].y, a.gameWorldX = a.gameScreenX + v.x, a.gameWorldY = a.gameScreenY + v.y;
                for (var f, g = c.length; g--, f = c[g];)if (f.floating === !0 ? (a.gameX = a.gameScreenX, a.gameY = a.gameScreenY) : (a.gameX = a.gameWorldX, a.gameY = a.gameWorldY), f.rect.getBounds().containsPoint(a.gameX, a.gameY) && f.cb(a) === !1) {
                    b = !0;
                    break
                }
            }
        }
        return b
    }

    function d(a) {
        var b;
        if (w.length = 0, a.touches)for (var c = 0, d = a.changedTouches.length; d > c; c++) {
            var e = a.changedTouches[c];
            b = h.globalToLocal(e.clientX, e.clientY), b.id = e.identifier, w.push(b)
        } else b = h.globalToLocal(a.clientX, a.clientY), b.id = a.pointerId || 1, w.push(b);
        a.isPrimary !== !1 && h.mouse.pos.set(w[0].x, w[0].y)
    }

    function e(a) {
        if (a.target === me.video.renderer.getScreenCanvas()) {
            var b = {deltaMode: 1, type: "mousewheel", deltaX: a.deltaX, deltaY: a.deltaY, deltaZ: a.deltaZ};
            if ("mousewheel" === k && (b.deltaY = -1 / 40 * a.wheelDelta, a.wheelDeltaX && (b.deltaX = -1 / 40 * a.wheelDeltaX)), c(b))return h._preventDefault(a)
        }
        return !0
    }

    function f(a) {
        return d(a), c(a) ? h._preventDefault(a) : !0
    }

    function g(a) {
        if (d(a), c(a))return h._preventDefault(a);
        var b = a.button || 0, e = h.mouse.bind[b];
        return e ? a.type === m[s] ? h._keydown(a, e, b + 1) : h._keyup(a, e, b + 1) : !0
    }

    var h = me.input, i = {}, j = !1, k = "mousewheel", l = 0, m = null, n = ["mousewheel", "pointermove", "pointerdown", "pointerup", "pointercancel", void 0, void 0], o = ["mousewheel", "MSPointerMove", "MSPointerDown", "MSPointerUp", "MSPointerCancel", void 0, void 0], p = ["mousewheel", "mousemove", "mousedown", "mouseup", void 0, void 0, void 0], q = [void 0, "touchmove", "touchstart", "touchend", "touchcancel", void 0, void 0], r = 1, s = 2, t = 3, u = 4, v = new me.Vector2d, w = [];
    h._offset = null, h.mouse = {
        pos: null,
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2,
        bind: [0, 0, 0]
    }, h.throttlingInterval = void 0, h.globalToLocal = function (a, b) {
        var c = h._offset, d = me.device.getPixelRatio();
        a -= c.left, b -= c.top;
        var e = me.sys.scale;
        return (1 !== e.x || 1 !== e.y) && (a /= e.x, b /= e.y), new me.Vector2d(a * d, b * d)
    }, h.bindPointer = function () {
        var a = arguments.length < 2 ? h.mouse.LEFT : arguments[0], c = arguments.length < 2 ? arguments[0] : arguments[1];
        if (b(), !h._KeyBinding[c])throw new me.Error("no action defined for keycode " + c);
        h.mouse.bind[a] = c
    }, h.unbindPointer = function (a) {
        h.mouse.bind["undefined" == typeof a ? me.input.mouse.LEFT : a] = null
    }, h.registerPointerEvent = function (a, c, d, e) {
        if (b(), -1 === n.indexOf(a))throw new me.Error("invalid event type : " + a);
        n !== m && (a = m[n.indexOf(a)]), i[a] || (i[a] = []);
        var f = c.floating === !0 ? !0 : !1;
        e && (f = e === !0 ? !0 : !1), i[a].push({rect: c, cb: d, floating: f})
    }, h.releasePointerEvent = function (a, b) {
        if (-1 === n.indexOf(a))throw new me.Error("invalid event type : " + a);
        n !== m && (a = m[n.indexOf(a)]), i[a] || (i[a] = []);
        var c = i[a];
        if (c)for (var d, e = c.length; e--, d = c[e];)d.rect === b && (d.rect = d.cb = d.floating = null, i[a].splice(e, 1))
    }, h._translatePointerEvents = function () {
        h.registerPointerEvent("pointermove", me.game.viewport, function (a) {
            return me.event.publish(me.event.MOUSEMOVE, [a]), !1
        })
    }
}(), function () {
    var a = function () {
        var a = {}, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        return a.decode = function (a) {
            if (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""), me.device.nativeBase64)return window.atob(a);
            for (var c, d, e, f, g, h, i, j = [], k = 0; k < a.length;)f = b.indexOf(a.charAt(k++)), g = b.indexOf(a.charAt(k++)), h = b.indexOf(a.charAt(k++)), i = b.indexOf(a.charAt(k++)), c = f << 2 | g >> 4, d = (15 & g) << 4 | h >> 2, e = (3 & h) << 6 | i, j.push(String.fromCharCode(c)), 64 !== h && j.push(String.fromCharCode(d)), 64 !== i && j.push(String.fromCharCode(e));
            return j = j.join("")
        }, a.encode = function (a) {
            if (a = a.replace(/\r\n/g, "\n"), me.device.nativeBase64)return window.btoa(a);
            for (var c, d, e, f, g, h, i, j = [], k = 0; k < a.length;)c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), f = c >> 2, g = (3 & c) << 4 | d >> 4, h = (15 & d) << 2 | e >> 6, i = 63 & e, isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64), j.push(b.charAt(f)), j.push(b.charAt(g)), j.push(b.charAt(h)), j.push(b.charAt(i));
            return j = j.join("")
        }, a
    }();
    me.utils = function () {
        var b = {}, c = "", d = 0, e = /^.*(\\|\/|\:)/, f = /\.[^\.]*$/;
        return b.decodeBase64 = function (b) {
            return a.decode(b)
        }, b.encodeBase64 = function (b) {
            return a.encode(b)
        }, b.decodeBase64AsArray = function (b, c) {
            c = c || 1;
            var d, e, f, g = a.decode(b), h = new Uint32Array(g.length / c);
            for (d = 0, f = g.length / c; f > d; d++)for (h[d] = 0, e = c - 1; e >= 0; --e)h[d] += g.charCodeAt(d * c + e) << (e << 3);
            return h
        }, b.decompress = function () {
            throw new me.Error("GZIP/ZLIB compressed TMX Tile Map not supported!")
        }, b.decodeCSV = function (a, b) {
            a = a.trim().split("\n");
            for (var c = [], d = 0; d < a.length; d++)for (var e = a[d].split(",", b), f = 0; f < e.length; f++)c.push(+e[f]);
            return c
        }, b.getBasename = function (a) {
            return a.replace(e, "").replace(f, "")
        }, b.getFileExtension = function (a) {
            return a.substring(a.lastIndexOf(".") + 1, a.length)
        }, b.getPixels = function (a) {
            if (a instanceof HTMLImageElement) {
                var b = me.CanvasRenderer.getContext2d(me.video.createCanvas(a.width, a.height));
                return b.drawImage(a, 0, 0), b.getImageData(0, 0, a.width, a.height)
            }
            return a.getContext("2d").getImageData(0, 0, a.width, a.height)
        }, b.resetGUID = function (a) {
            c = a.toString().toUpperCase().toHex(), d = 0
        }, b.createGUID = function () {
            return c + "-" + d++
        }, b.applyFriction = function (a, b) {
            return 0 > a + b ? a + b * me.timer.tick : a - b > 0 ? a - b * me.timer.tick : 0
        }, b
    }()
}(), function () {
    var a = {
        black: [0, 0, 0],
        silver: [192, 192, 129],
        gray: [128, 128, 128],
        white: [255, 255, 255],
        maroon: [128, 0, 0],
        red: [255, 0, 0],
        purple: [128, 0, 128],
        fuchsia: [255, 0, 255],
        green: [0, 128, 0],
        lime: [0, 255, 0],
        olive: [128, 128, 0],
        yellow: [255, 255, 0],
        navy: [0, 0, 128],
        blue: [0, 0, 255],
        teal: [0, 128, 128],
        aqua: [0, 255, 255],
        orange: [255, 165, 0],
        aliceblue: [240, 248, 245],
        antiquewhite: [250, 235, 215],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        blanchedalmond: [255, 235, 205],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 35],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        "darkgray[*]": [169, 169, 169],
        darkgreen: [0, 100, 0],
        "darkgrey[*]": [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        oldlace: [253, 245, 230],
        olivedrab: [107, 142, 35],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        whitesmoke: [245, 245, 245],
        yellowgreen: [154, 205, 50]
    };
    me.Color = Object.extend({
        init: function (a, b, c, d) {
            return this.r = 0, this.g = 0, this.b = 0, this.alpha = 1, this.glArray = new Float32Array([0, 0, 0, 1]), this.setColor(a, b, c, d)
        }, onResetEvent: function (a, b, c, d) {
            return this.setColor(a, b, c, d)
        }, setColor: function (a, b, c, d) {
            return this.r = (~~a || 0).clamp(0, 255), this.g = (~~b || 0).clamp(0, 255), this.b = (~~c || 0).clamp(0, 255), this.alpha = "undefined" == typeof d ? 1 : (+d).clamp(0, 1), this.glArray[0] = this.r / 255, this.glArray[1] = this.g / 255, this.glArray[2] = this.b / 255, this.glArray[3] = this.alpha, this
        }, clone: function () {
            return me.pool.pull("me.Color", this.r, this.g, this.b, this.alpha)
        }, copy: function (a) {
            return a instanceof me.Color ? this.setColor(a.r, a.g, a.b, a.alpha) : this.parseCSS(a)
        }, add: function (a) {
            return this.setColor(this.r + a.r, this.g + a.g, this.b + a.b, (this.alpha + a.alpha) / 2)
        }, darken: function (a) {
            return a = a.clamp(0, 1), this.setColor(this.r * a, this.g * a, this.b * a, this.alpha)
        }, lighten: function (a) {
            return a = a.clamp(0, 1), this.setColor(this.r + (255 - this.r) * a, this.g + (255 - this.g) * a, this.b + (255 - this.b) * a, this.alpha)
        }, random: function () {
            return this.setColor(256 * Math.random(), 256 * Math.random(), 256 * Math.random(), this.alpha)
        }, equals: function (a) {
            return this.r === a.r && this.g === a.g && this.b === a.b && this.alpha === a.alpha
        }, parseCSS: function (b) {
            return b in a ? this.setColor.apply(this, a[b]) : this.parseRGB(b)
        }, parseRGB: function (a) {
            if ("string" == typeof a) {
                var b;
                if ("rgba" === a.substring(0, 4))b = 5; else {
                    if ("rgb" !== a.substring(0, 3))return this.parseHex(a);
                    b = 4
                }
                var c = a.slice(b, -1).split(/\s*,\s*/);
                return this.setColor.apply(this, c)
            }
            throw new me.Color.Error("invalid parameter (not a string)")
        }, parseHex: function (a) {
            if ("string" == typeof a) {
                "#" === a.charAt(0) && (a = a.substring(1, a.length));
                var b, c, d;
                return a.length < 6 ? (b = parseInt(a.charAt(0) + a.charAt(0), 16), c = parseInt(a.charAt(1) + a.charAt(1), 16), d = parseInt(a.charAt(2) + a.charAt(2), 16)) : (b = parseInt(a.substring(0, 2), 16), c = parseInt(a.substring(2, 4), 16), d = parseInt(a.substring(4, 6), 16)), this.setColor(b, c, d)
            }
            throw new me.Color.Error("invalid parameter (not a string)")
        }, toGL: function () {
            return this.glArray
        }, toHex: function () {
            return "#" + this.r.toHex() + this.g.toHex() + this.b.toHex()
        }, toRGB: function () {
            return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
        }, toRGBA: function () {
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.alpha + ")"
        }
    }), me.Color.Error = me.Error.extend({
        init: function (a) {
            me.Error.prototype.init.apply(this, [a]), this.name = "me.Color.Error"
        }
    })
}(), function () {
    me.save = function () {
        function a(a) {
            return "add" === a || "remove" === a
        }

        var b = {}, c = {
            _init: function () {
                if (me.device.localStorage === !0) {
                    var a = JSON.parse(localStorage.getItem("me.save")) || [];
                    a.forEach(function (a) {
                        b[a] = JSON.parse(localStorage.getItem("me.save." + a))
                    })
                }
            }, add: function (d) {
                Object.keys(d).forEach(function (e) {
                    a(e) || (!function (a) {
                        Object.defineProperty(c, a, {
                            configurable: !0, enumerable: !0, get: function () {
                                return b[a]
                            }, set: function (c) {
                                b[a] = c, me.device.localStorage === !0 && localStorage.setItem("me.save." + a, JSON.stringify(c))
                            }
                        })
                    }(e), e in b || (c[e] = d[e]))
                }), me.device.localStorage === !0 && localStorage.setItem("me.save", JSON.stringify(Object.keys(b)))
            }, remove: function (c) {
                a(c) || "undefined" != typeof b[c] && (delete b[c], me.device.localStorage === !0 && (localStorage.removeItem("me.save." + c), localStorage.setItem("me.save", JSON.stringify(Object.keys(b)))))
            }
        };
        return c
    }()
}(), function () {
    me.TMXConstants = {
        COLLISION_GROUP: "collision",
        TMX_TAG_MAP: "map",
        TMX_TAG_NAME: "name",
        TMX_TAG_VALUE: "value",
        TMX_TAG_VERSION: "version",
        TMX_TAG_ORIENTATION: "orientation",
        TMX_TAG_WIDTH: "width",
        TMX_TAG_HEIGHT: "height",
        TMX_TAG_TYPE: "type",
        TMX_TAG_OPACITY: "opacity",
        TMX_TAG_TRANS: "trans",
        TMX_TAG_TILEWIDTH: "tilewidth",
        TMX_TAG_TILEHEIGHT: "tileheight",
        TMX_TAG_TILEOFFSET: "tileoffset",
        TMX_TAG_FIRSTGID: "firstgid",
        TMX_TAG_GID: "gid",
        TMX_TAG_TILE: "tile",
        TMX_TAG_ID: "id",
        TMX_TAG_DATA: "data",
        TMX_TAG_COMPRESSION: "compression",
        TMX_TAG_GZIP: "gzip",
        TMX_TAG_ZLIB: "zlib",
        TMX_TAG_ENCODING: "encoding",
        TMX_TAG_ATTR_BASE64: "base64",
        TMX_TAG_CSV: "csv",
        TMX_TAG_SPACING: "spacing",
        TMX_TAG_MARGIN: "margin",
        TMX_TAG_PROPERTIES: "properties",
        TMX_TAG_PROPERTY: "property",
        TMX_TAG_IMAGE: "image",
        TMX_TAG_SOURCE: "source",
        TMX_TAG_VISIBLE: "visible",
        TMX_TAG_TILESET: "tileset",
        TMX_TAG_LAYER: "layer",
        TMX_TAG_TILE_LAYER: "tilelayer",
        TMX_TAG_IMAGE_LAYER: "imagelayer",
        TMX_TAG_OBJECTGROUP: "objectgroup",
        TMX_TAG_OBJECT: "object",
        TMX_TAG_X: "x",
        TMX_TAG_Y: "y",
        TMX_TAG_POLYGON: "polygon",
        TMX_TAG_POLYLINE: "polyline",
        TMX_TAG_ELLIPSE: "ellipse",
        TMX_TAG_POINTS: "points",
        TMX_BACKGROUND_COLOR: "backgroundcolor",
        TMX_ROTATION: "rotation"
    }
}(), function (a) {
    me.TMXUtils = function () {
        function b(a) {
            if (!a || a.isBoolean())a = a ? "true" === a : !0; else if (a.isNumeric())a = Number(a); else if (a.match(/^json:/i)) {
                var b = a.split(/^json:/i)[1];
                try {
                    a = JSON.parse(b)
                } catch (c) {
                    throw new me.Error("Unable to parse JSON: " + b)
                }
            }
            return a
        }

        var c = {}, d = function (a, c) {
            if (c.attributes && c.attributes.length > 0)for (var d = 0; d < c.attributes.length; d++) {
                var e = c.attributes.item(d);
                "undefined" != typeof e.name ? a[e.name] = b(e.value) : a[e.nodeName] = b(e.nodeValue)
            }
        };
        return c.parse = function (a, b) {
            var c = {}, e = "";
            if (b = b || 1, 1 === a.nodeType && d(c, a), a.hasChildNodes()) {
                for (var f = 0; f < a.childNodes.length; f++) {
                    var g = a.childNodes.item(f), h = g.nodeName;
                    if ("undefined" == typeof c[h])if (3 === g.nodeType) {
                        var i = g.nodeValue.trim();
                        i && i.length > 0 && (e += i)
                    } else 1 === g.nodeType && (c[h] = me.TMXUtils.parse(g, b), c[h]._draworder = b++); else Array.isArray(c[h]) === !1 && (c[h] = [c[h]]), c[h].push(me.TMXUtils.parse(g, b)), c[h][c[h].length - 1]._draworder = b++
                }
                e.length > 0 && (c.value = e, e = "")
            }
            return c
        }, c.applyTMXProperties = function (c, d) {
            var e = d[a.TMX_TAG_PROPERTIES];
            if ("undefined" != typeof e)if ("undefined" != typeof e.property) {
                var f = e.property;
                Array.isArray(f) === !0 ? f.forEach(function (a) {
                    c[a.name] = a.value
                }) : c[f.name] = f.value
            } else for (var g in e)e.hasOwnProperty(g) && (c[g] = b(e[g]))
        }, c
    }()
}(me.TMXConstants), function (a) {
    me.TMXObjectGroup = Object.extend({
        init: function (b, c, d, e, f) {
            this.name = b, this.width = c[a.TMX_TAG_WIDTH], this.height = c[a.TMX_TAG_HEIGHT], this.z = f, this.objects = [];
            var g = "undefined" != typeof c[a.TMX_TAG_VISIBLE] ? c[a.TMX_TAG_VISIBLE] : !0;
            this.opacity = g === !0 ? (+c[a.TMX_TAG_OPACITY] || 1).clamp(0, 1) : 0, me.TMXUtils.applyTMXProperties(this, c);
            var h = c.objects || c.object, i = this;
            Array.isArray(h) === !0 ? h.forEach(function (a) {
                i.objects.push(new me.TMXObject(a, d, e, f))
            }) : h && i.objects.push(new me.TMXObject(h, d, e, f))
        }, destroy: function () {
            this.objects = null
        }, getObjectCount: function () {
            return this.objects.length
        }, getObjectByIndex: function (a) {
            return this.objects[a]
        }
    }), me.TMXObject = Object.extend({
        init: function (b, c, d, e) {
            if (this.points = void 0, this.name = b[a.TMX_TAG_NAME], this.x = +b[a.TMX_TAG_X], this.y = +b[a.TMX_TAG_Y], this.z = +e, this.width = +b[a.TMX_TAG_WIDTH] || 0, this.height = +b[a.TMX_TAG_HEIGHT] || 0, this.gid = +b[a.TMX_TAG_GID] || null, this.type = b[a.TMX_TAG_TYPE], this.rotation = Number.prototype.degToRad(+(b[a.TMX_ROTATION] || 0)), this.orientation = c, this.isEllipse = !1, this.isPolygon = !1, this.isPolyLine = !1, "number" == typeof this.gid)this.setImage(this.gid, d); else if ("undefined" != typeof b[a.TMX_TAG_ELLIPSE])this.isEllipse = !0; else {
                var f = b[a.TMX_TAG_POLYGON];
                if ("undefined" != typeof f ? this.isPolygon = !0 : (f = b[a.TMX_TAG_POLYLINE], "undefined" != typeof f && (this.isPolyLine = !0)), "undefined" != typeof f)if (this.points = [], "undefined" != typeof f.points) {
                    f = f.points.split(" ");
                    for (var g, h = 0; h < f.length; h++)g = f[h].split(","), this.points.push(new me.Vector2d(+g[0], +g[1]))
                } else {
                    var i = this;
                    f.forEach(function (a) {
                        i.points.push(new me.Vector2d(+a.x, +a.y))
                    })
                }
            }
            me.game.tmxRenderer.adjustPosition(this), me.TMXUtils.applyTMXProperties(this, b)
        }, setImage: function (a, b) {
            var c = b.getTilesetByGid(this.gid);
            this.width = c.tilewidth, this.height = c.tileheight, this.spritewidth = this.width;
            var d = new me.Tile(this.x, this.y, c.tilewidth, c.tileheight, this.gid);
            this.image = c.getTileImage(d), "undefined" == typeof this.name && (this.name = "TileObject")
        }, getTMXShapes: function () {
            var a = 0, b = [];
            if (this.isEllipse === !0)b.push(new me.Ellipse(this.width / 2, this.height / 2, this.width, this.height).rotate(this.rotation)); else if (this.isPolygon === !0)b.push(new me.Polygon(0, 0, this.points).rotate(this.rotation)); else if (this.isPolyLine === !0) {
                var c, d, e = this.points, f = e.length - 1;
                for (a = 0; f > a; a++)c = e[a], d = e[a + 1].clone(), 0 !== this.rotation && (c = c.rotate(this.rotation), d = d.rotate(this.rotation)), b.push(new me.Line(0, 0, [c, d]))
            } else b.push(new me.Polygon(0, 0, [new me.Vector2d, new me.Vector2d(this.width, 0), new me.Vector2d(this.width, this.height), new me.Vector2d(0, this.height)]).rotate(this.rotation));
            if ("isometric" === this.orientation)for (a = 0; a < b.length; a++)b[a].rotate(Math.PI / 4).scale(Math.SQRT2, Math.SQRT1_2);
            return b
        }, getObjectPropertyByName: function (a) {
            return this[a]
        }
    })
}(me.TMXConstants), function (a) {
    var b = 2147483648, c = 1073741824, d = 536870912;
    me.Tile = me.Rect.extend({
        init: function (a, e, f, g, h) {
            this.tileset = null, this.transform = null, me.Rect.prototype.init.apply(this, [a * f, e * g, f, g]), this.col = a, this.row = e, this.tileId = h, this.flippedX = 0 !== (this.tileId & b), this.flippedY = 0 !== (this.tileId & c), this.flippedAD = 0 !== (this.tileId & d), this.flipped = this.flippedX || this.flippedY || this.flippedAD, this.flipped === !0 && this.createTransform(), this.tileId &= ~(b | c | d)
        }, createTransform: function () {
            null === this.transform && (this.transform = new me.Matrix2d), this.transform.identity();
            var a = this.transform.val;
            this.flippedAD && (this.transform.set(0, 1, 1, 0, a[4], a[5]), this.transform.translate(0, this.height - this.width)), this.flippedX && (a[0] *= -1, a[2] *= -1, this.transform.translate(this.flippedAD ? this.height : this.width, 0)), this.flippedY && (a[1] *= -1, a[3] *= -1, this.transform.translate(0, this.flippedAD ? this.width : this.height))
        }
    }), me.TMXTileset = Object.extend({
        init: function (b) {
            var c = 0;
            this.TileProperties = [], this.tileXOffset = [], this.tileYOffset = [], this.firstgid = this.lastgid = +b[a.TMX_TAG_FIRSTGID];
            var d = b[a.TMX_TAG_SOURCE];
            if (d && "tsx" === me.utils.getFileExtension(d).toLowerCase() && (d = me.utils.getBasename(d), b = me.loader.getTMX(d).tileset, !b))throw new me.Error(d + " TSX tileset not found");
            this.name = b[a.TMX_TAG_NAME], this.tilewidth = +b[a.TMX_TAG_TILEWIDTH], this.tileheight = +b[a.TMX_TAG_TILEHEIGHT], this.spacing = +b[a.TMX_TAG_SPACING] || 0, this.margin = +b[a.TMX_TAG_MARGIN] || 0, this.tileoffset = new me.Vector2d(0, 0), this.isAnimated = !1, this.animations = {};
            var e = b.tiles;
            if ("undefined" != typeof e)for (c in e)e.hasOwnProperty(c) && "animation" in e[c] && (this.isAnimated = !0, this.animations[+c + this.firstgid] = {
                dt: 0,
                idx: 0,
                frames: e[c].animation,
                cur: e[c].animation[0]
            });
            var f = b[a.TMX_TAG_TILEOFFSET];
            f && (this.tileoffset.x = +f[a.TMX_TAG_X], this.tileoffset.y = +f[a.TMX_TAG_Y]);
            var g = b.tileproperties;
            if (g)for (c in g)g.hasOwnProperty(c) && this.setTileProperty(c + this.firstgid, g[c]); else if (b[a.TMX_TAG_TILE])for (g = b[a.TMX_TAG_TILE], Array.isArray(g) || (g = [g]), c = 0; c < g.length; c++) {
                var h = +g[c][a.TMX_TAG_ID] + this.firstgid, i = {};
                me.TMXUtils.applyTMXProperties(i, g[c]), this.setTileProperty(h, i), "animation" in g[c] && (this.isAnimated = !0, this.animations[h] = {
                    dt: 0,
                    idx: 0,
                    frames: g[c].animation.frame,
                    cur: g[c].animation.frame[0]
                })
            }
            var j = "string" == typeof b[a.TMX_TAG_IMAGE] ? b[a.TMX_TAG_IMAGE] : b[a.TMX_TAG_IMAGE].source;
            if (j = me.utils.getBasename(j), this.image = j ? me.loader.getImage(j) : null, this.image) {
                this.hTileCount = ~~((this.image.width - this.margin) / (this.tilewidth + this.spacing)), this.vTileCount = ~~((this.image.height - this.margin) / (this.tileheight + this.spacing)), this.lastgid = this.firstgid + (this.hTileCount * this.vTileCount - 1 || 0);
                var k = b[a.TMX_TAG_TRANS] || b[a.TMX_TAG_IMAGE][a.TMX_TAG_TRANS];
                "undefined" != typeof k && (this.image = me.video.renderer.applyRGBFilter(this.image, "transparent", k.toUpperCase()).canvas)
            } else console.log("melonJS: '" + j + "' file for tileset '" + this.name + "' not found!")
        }, setTileProperty: function (a, b) {
            this.TileProperties[a] = b
        }, contains: function (a) {
            return a >= this.firstgid && a <= this.lastgid
        }, getTileImage: function (a) {
            var b = me.CanvasRenderer.getContext2d(me.video.createCanvas(this.tilewidth, this.tileheight));
            return this.drawTile(b, 0, 0, a), b.canvas
        }, getTileProperties: function (a) {
            return this.TileProperties[a]
        }, getTileOffsetX: function (a) {
            var b = this.tileXOffset[a];
            return "undefined" == typeof b && (b = this.tileXOffset[a] = this.margin + (this.spacing + this.tilewidth) * (a % this.hTileCount)), b
        }, getTileOffsetY: function (a) {
            var b = this.tileYOffset[a];
            return "undefined" == typeof b && (b = this.tileYOffset[a] = this.margin + (this.spacing + this.tileheight) * ~~(a / this.hTileCount)), b
        }, update: function (a) {
            var b = null, c = 0, d = !1;
            for (var e in this.animations)this.animations.hasOwnProperty(e) && (b = this.animations[e], b.dt += a, c = b.cur.duration, b.dt >= c && (b.dt -= c, b.idx = (b.idx + 1) % b.frames.length, b.cur = b.frames[b.idx], d = !0));
            return d
        }, drawTile: function (a, b, c, d) {
            var e = d.tileId;
            if (d.flipped) {
                a.save();
                var f = d.transform.val;
                a.transform(f[0], f[1], f[2], f[3], f[4] + b, f[5] + c), b = c = 0
            }
            e in this.animations ? e = this.animations[e].cur.tileid : e -= this.firstgid, a.drawImage(this.image, this.getTileOffsetX(e), this.getTileOffsetY(e), this.tilewidth, this.tileheight, b, c, this.tilewidth, this.tileheight), d.flipped && a.restore()
        }
    }), me.TMXTilesetGroup = Object.extend({
        init: function () {
            this.tilesets = []
        }, add: function (a) {
            this.tilesets.push(a)
        }, getTilesetByIndex: function (a) {
            return this.tilesets[a]
        }, getTilesetByGid: function (a) {
            for (var b = -1, c = 0, d = this.tilesets.length; d > c; c++) {
                if (this.tilesets[c].contains(a))return this.tilesets[c];
                this.tilesets[c].firstgid === this.tilesets[c].lastgid && a >= this.tilesets[c].firstgid && (b = c)
            }
            if (-1 !== b)return this.tilesets[b];
            throw new me.Error("no matching tileset found for gid " + a)
        }
    })
}(me.TMXConstants), function () {
    me.TMXOrthogonalRenderer = Object.extend({
        init: function (a, b, c, d) {
            this.cols = a, this.rows = b, this.tilewidth = c, this.tileheight = d
        }, canRender: function (a) {
            return "orthogonal" === a.orientation && this.cols === a.cols && this.rows === a.rows && this.tilewidth === a.tilewidth && this.tileheight === a.tileheight
        }, pixelToTileCoords: function (a, b) {
            return new me.Vector2d(this.pixelToTileX(a), this.pixelToTileY(b))
        }, pixelToTileX: function (a) {
            return a / this.tilewidth
        }, pixelToTileY: function (a) {
            return a / this.tileheight
        }, tileToPixelCoords: function (a, b) {
            return new me.Vector2d(a * this.tilewidth, b * this.tileheight)
        }, adjustPosition: function (a) {
            "number" == typeof a.gid && (a.y -= a.height)
        }, drawTile: function (a, b, c, d, e) {
            e.drawTile(a, e.tileoffset.x + b * this.tilewidth, e.tileoffset.y + (c + 1) * this.tileheight - e.tileheight, d)
        }, drawTileLayer: function (a, b, c) {
            var d = this.pixelToTileCoords(c.pos.x, c.pos.y).floorSelf(), e = this.pixelToTileCoords(c.pos.x + c.width + this.tilewidth, c.pos.y + c.height + this.tileheight).ceilSelf();
            e.x = e.x > this.cols ? this.cols : e.x, e.y = e.y > this.rows ? this.rows : e.y;
            for (var f = d.y; f < e.y; f++)for (var g = d.x; g < e.x; g++) {
                var h = b.layerData[g][f];
                h && this.drawTile(a, g, f, h, h.tileset)
            }
        }
    }), me.TMXIsometricRenderer = Object.extend({
        init: function (a, b, c, d) {
            this.cols = a, this.rows = b, this.tilewidth = c, this.tileheight = d, this.hTilewidth = c / 2, this.hTileheight = d / 2, this.originX = this.rows * this.hTilewidth
        }, canRender: function (a) {
            return "isometric" === a.orientation && this.cols === a.cols && this.rows === a.rows && this.tilewidth === a.tilewidth && this.tileheight === a.tileheight
        }, pixelToTileCoords: function (a, b) {
            return new me.Vector2d(this.pixelToTileX(a, b), this.pixelToTileY(b, a))
        }, pixelToTileX: function (a, b) {
            return b / this.tileheight + (a - this.originX) / this.tilewidth
        }, pixelToTileY: function (a, b) {
            return a / this.tileheight - (b - this.originX) / this.tilewidth
        }, tileToPixelCoords: function (a, b) {
            return new me.Vector2d((a - b) * this.hTilewidth + this.originX, (a + b) * this.hTileheight)
        }, adjustPosition: function (a) {
            var b = a.x / this.hTilewidth, c = a.y / this.tileheight, d = this.tileToPixelCoords(b, c);
            a.x = d.x, a.y = d.y
        }, drawTile: function (a, b, c, d, e) {
            e.drawTile(a, (this.cols - 1) * e.tilewidth + (b - c) * e.tilewidth >> 1, -e.tilewidth + (b + c) * e.tileheight >> 2, d)
        }, drawTileLayer: function (a, b, c) {
            var d = b.tileset, e = d.tileoffset, f = this.pixelToTileCoords(c.pos.x - d.tilewidth, c.pos.y - d.tileheight).floorSelf(), g = this.pixelToTileCoords(c.pos.x + c.width + d.tilewidth, c.pos.y + c.height + d.tileheight).ceilSelf(), h = this.tileToPixelCoords(g.x, g.y), i = this.tileToPixelCoords(f.x, f.y);
            i.x -= this.hTilewidth, i.y += this.tileheight;
            var j = i.y - c.pos.y > this.hTileheight, k = c.pos.x - i.x < this.hTilewidth;
            j && (k ? (f.x--, i.x -= this.hTilewidth) : (f.y--, i.x += this.hTilewidth), i.y -= this.hTileheight);
            for (var l = j ^ k, m = f.clone(), n = i.y; n - this.tileheight < h.y; n += this.hTileheight) {
                m.setV(f);
                for (var o = i.x; o < h.x; o += this.tilewidth) {
                    if (m.x >= 0 && m.y >= 0 && m.x < this.cols && m.y < this.rows) {
                        var p = b.layerData[m.x][m.y];
                        p && (d = p.tileset, e = d.tileoffset, d.drawTile(a, e.x + o, e.y + n - d.tileheight, p))
                    }
                    m.x++, m.y--
                }
                l ? (f.y++, i.x -= this.hTilewidth, l = !1) : (f.x++, i.x += this.hTilewidth, l = !0)
            }
        }
    })
}(), function (a) {
    me.ColorLayer = me.Renderable.extend({
        init: function (a, b, c) {
            me.Renderable.prototype.init.apply(this, [0, 0, 1 / 0, 1 / 0]), this.name = a, this.color = b, this.z = c, this.floating = !0
        }, draw: function (a, b) {
            var c = a.globalAlpha();
            a.setGlobalAlpha(c * this.getOpacity());
            var d = me.game.viewport.pos, e = a.getColor();
            a.setColor(this.color), a.fillRect(b.left - d.x, b.top - d.y, b.width, b.height), a.setColor(e), a.setGlobalAlpha(c)
        }
    }), me.ImageLayer = me.Renderable.extend({
        init: function (a, b, c, d, e, f) {
            if (this.name = a, this.image = d ? me.loader.getImage(me.utils.getBasename(d)) : null, !this.image)throw new me.Error("'" + d + "' file for Image Layer '" + this.name + "' not found!");
            this.imagewidth = this.image.width, this.imageheight = this.image.height;
            var g = me.game.viewport;
            b = b ? Math.min(g.width, b) : g.width, c = c ? Math.min(g.height, c) : g.height, me.Renderable.prototype.init.apply(this, [0, 0, b, c]), this.z = e, this.ratio = new me.Vector2d(1, 1), "undefined" != typeof f && ("number" == typeof f ? this.ratio.set(f, f) : this.ratio.setV(f)), this.lastpos = g.pos.clone(), this.floating = !0, this._repeat = "repeat", this.repeatX = !0, this.repeatY = !0, Object.defineProperty(this, "repeat", {
                get: function () {
                    return this._repeat
                }, set: function (a) {
                    switch (this._repeat = a, this._repeat) {
                        case"no-repeat":
                            this.repeatX = !1, this.repeatY = !1;
                            break;
                        case"repeat-x":
                            this.repeatX = !0, this.repeatY = !1;
                            break;
                        case"repeat-y":
                            this.repeatX = !1, this.repeatY = !0;
                            break;
                        default:
                            this.repeatX = !0, this.repeatY = !0
                    }
                }
            }), this.anchorPoint.set(0, 0), this.handle = me.event.subscribe(me.event.VIEWPORT_ONCHANGE, this.updateLayer.bind(this))
        }, updateLayer: function (a) {
            (0 !== this.ratio.x || 0 !== this.ratio.y) && (this.repeatX || this.repeatY ? (this.pos.x += (a.x - this.lastpos.x) * this.ratio.x % this.imagewidth, this.pos.x = (this.imagewidth + this.pos.x) % this.imagewidth, this.pos.y += (a.y - this.lastpos.y) * this.ratio.y % this.imageheight, this.pos.y = (this.imageheight + this.pos.y) % this.imageheight) : (this.pos.x += (a.x - this.lastpos.x) * this.ratio.x, this.pos.y += (a.y - this.lastpos.y) * this.ratio.y), this.lastpos.setV(a))
        }, draw: function (a, b) {
            var c = me.game.viewport, d = 0 !== this.anchorPoint.y || 0 !== this.anchorPoint.x, e = ~~(this.anchorPoint.x * (c.width - this.imagewidth)), f = ~~(this.anchorPoint.y * (c.height - this.imageheight));
            d && a.translate(e, f), a.setGlobalAlpha(a.globalAlpha() * this.getOpacity());
            var g, h;
            if (0 === this.ratio.x && 0 === this.ratio.y)g = Math.min(b.width, this.imagewidth), h = Math.min(b.height, this.imageheight), a.drawImage(this.image, b.left, b.top, g, h, b.left, b.top, g, h); else {
                var i = ~~this.pos.x, j = ~~this.pos.y, k = 0, l = 0;
                for (g = Math.min(this.imagewidth - i, this.width), h = Math.min(this.imageheight - j, this.height); ;) {
                    do a.drawImage(this.image, i, j, g, h, k, l, g, h), j = 0, l += h, h = Math.min(this.imageheight, this.height - l); while (this.repeatY && l < this.height);
                    if (k += g, !this.repeatX || k >= this.width)break;
                    i = 0, g = Math.min(this.imagewidth, this.width - k), j = ~~this.pos.y, l = 0, h = Math.min(this.imageheight - ~~this.pos.y, this.height)
                }
            }
            d && a.translate(-e, -f)
        }, destroy: function () {
            this.handle && (me.event.unsubscribe(this.handle), this.handle = null), this.image = null, this.lastpos = null
        }
    }), me.TMXLayer = me.Renderable.extend({
        init: function (a, b, c, d, e) {
            if (me.Renderable.prototype.init.apply(this, [0, 0, 0, 0]), this.tilewidth = a, this.tileheight = b, this.orientation = c, this.tilesets = d, this.tileset = this.tilesets ? this.tilesets.getTilesetByIndex(0) : null, this.animatedTilesets = [], this.tilesets)for (var f = this.tilesets.tilesets, g = 0; g < f.length; g++)f[g].isAnimated && (f[g].isAnimated = !1, this.animatedTilesets.push(f[g]));
            this.isAnimated = this.animatedTilesets.length > 0, this.isAnimated && (this.preRender = !1), this.z = e
        }, initFromJSON: function (b) {
            this.name = b[a.TMX_TAG_NAME], this.cols = +b[a.TMX_TAG_WIDTH], this.rows = +b[a.TMX_TAG_HEIGHT];
            var c = "undefined" != typeof b[a.TMX_TAG_VISIBLE] ? b[a.TMX_TAG_VISIBLE] : !0;
            this.setOpacity(c ? +b[a.TMX_TAG_OPACITY] : 0), "isometric" === this.orientation ? (this.width = (this.cols + this.rows) * (this.tilewidth / 2), this.height = (this.cols + this.rows) * (this.tileheight / 2)) : (this.width = this.cols * this.tilewidth, this.height = this.rows * this.tileheight), me.TMXUtils.applyTMXProperties(this, b), "undefined" == typeof this.preRender && (this.preRender = me.sys.preRender), this.preRender === !0 && (this.layerCanvas = me.video.createCanvas(this.cols * this.tilewidth, this.rows * this.tileheight), this.layerSurface = me.CanvasRenderer.getContext2d(this.layerCanvas)), this.initArray(this.cols, this.rows)
        }, destroy: function () {
            this.preRender && (this.layerCanvas = null, this.layerSurface = null), this.renderer = null, this.layerData = null, this.tileset = null, this.tilesets = null, this.animatedTilesets = null
        }, setRenderer: function (a) {
            this.renderer = a
        }, initArray: function (a, b) {
            this.layerData = [];
            for (var c = 0; a > c; c++) {
                this.layerData[c] = [];
                for (var d = 0; b > d; d++)this.layerData[c][d] = null
            }
        }, getTileId: function (a, b) {
            var c = this.getTile(a, b);
            return c ? c.tileId : null
        }, getTile: function (a, b) {
            return this.layerData[~~this.renderer.pixelToTileX(a, b)][~~this.renderer.pixelToTileY(b, a)]
        }, setTile: function (a, b, c) {
            var d = new me.Tile(a, b, this.tilewidth, this.tileheight, c);
            return d.tileset = this.tileset.contains(d.tileId) ? this.tileset : this.tileset = this.tilesets.getTilesetByGid(d.tileId), this.layerData[a][b] = d, d
        }, clearTile: function (a, b) {
            this.layerData[a][b] = null, this.preRender && this.layerSurface.clearRect(a * this.tilewidth, b * this.tileheight, this.tilewidth, this.tileheight)
        }, update: function (a) {
            if (this.isAnimated) {
                for (var b = !1, c = 0; c < this.animatedTilesets.length; c++)b = this.animatedTilesets[c].update(a) || b;
                return b
            }
            return !1
        }, draw: function (a, b) {
            if (this.preRender) {
                var c = Math.min(b.width, this.width), d = Math.min(b.height, this.height);
                this.layerSurface.globalAlpha = a.globalAlpha() * this.getOpacity(), this.layerSurface.globalAlpha > 0 && a.drawImage(this.layerCanvas, b.pos.x, b.pos.y, c, d, b.pos.x, b.pos.y, c, d)
            } else {
                var e = a.globalAlpha();
                a.setGlobalAlpha(a.globalAlpha() * this.getOpacity()), a.globalAlpha() > 0 && this.renderer.drawTileLayer(a, this, b), a.setGlobalAlpha(e)
            }
        }
    })
}(me.TMXConstants), function () {
    me.TMXTileMap = me.Renderable.extend({
        init: function (a) {
            this.levelId = a, this.z = 0, this.name = null, this.cols = 0, this.rows = 0, this.tilewidth = 0, this.tileheight = 0, this.tilesets = null, this.mapLayers = [], this.objectGroups = [], this.version = "", this.orientation = "", this.tilesets = null, this.initialized = !1, me.Renderable.prototype.init.apply(this, [0, 0, 0, 0])
        }, setDefaultPosition: function (a, b) {
            if (this.width < a || this.height < b) {
                var c = ~~((a - this.width) / 2), d = ~~((b - this.height) / 2);
                this.pos.set(c > 0 ? c : 0, d > 0 ? d : 0)
            }
        }, getObjectGroupByName: function (a) {
            var b = null;
            a = a.trim().toLowerCase();
            for (var c = this.objectGroups.length; c--;)if (this.objectGroups[c].name.toLowerCase().contains(a)) {
                b = this.objectGroups[c];
                break
            }
            return b
        }, getObjectGroups: function () {
            return this.objectGroups
        }, getLayers: function () {
            return this.mapLayers
        }, getLayerByName: function (a) {
            var b = null;
            a = a.trim().toLowerCase();
            for (var c = this.mapLayers.length; c--;)if (this.mapLayers[c].name.toLowerCase().contains(a)) {
                b = this.mapLayers[c];
                break
            }
            return b
        }, clearTile: function (a, b) {
            for (var c = this.mapLayers.length; c--;)this.mapLayers[c] instanceof me.TMXLayer && this.mapLayers[c].clearTile(a, b)
        }, destroy: function () {
            var a;
            if (this.initialized === !0) {
                for (a = this.mapLayers.length; a--;)this.mapLayers[a] = null;
                for (a = this.objectGroups.length; a--;)this.objectGroups[a].destroy(), this.objectGroups[a] = null;
                this.tilesets = null, this.mapLayers.length = 0, this.objectGroups.length = 0, this.pos.set(0, 0), this.initialized = !1
            }
        }
    })
}(), function (a) {
    me.TMXMapReader = Object.extend({
        init: function () {
        }, readMap: function (b, c) {
            if (b.initialized !== !0) {
                var d = 0, e = this;
                b.version = c[a.TMX_TAG_VERSION], b.orientation = c[a.TMX_TAG_ORIENTATION], b.cols = +c[a.TMX_TAG_WIDTH], b.rows = +c[a.TMX_TAG_HEIGHT], b.tilewidth = +c[a.TMX_TAG_TILEWIDTH], b.tileheight = +c[a.TMX_TAG_TILEHEIGHT], "isometric" === b.orientation ? (b.width = (b.cols + b.rows) * (b.tilewidth / 2), b.height = (b.cols + b.rows) * (b.tileheight / 2)) : (b.width = b.cols * b.tilewidth, b.height = b.rows * b.tileheight), b.backgroundcolor = c[a.TMX_BACKGROUND_COLOR], b.z = d++, me.TMXUtils.applyTMXProperties(b, c), b.backgroundcolor && b.mapLayers.push(new me.ColorLayer("background_color", b.backgroundcolor, d++)), b.background_image && b.mapLayers.push(new me.ImageLayer("background_image", b.width, b.height, b.background_image, d++)), null !== me.game.tmxRenderer && me.game.tmxRenderer.canRender(b) || (me.game.tmxRenderer = this.getNewDefaultRenderer(b)), b.tilesets || (b.tilesets = new me.TMXTilesetGroup);
                var f = c.tilesets || c.tileset;
                if (Array.isArray(f) === !0 ? f.forEach(function (a) {
                        b.tilesets.add(e.readTileset(a))
                    }) : b.tilesets.add(e.readTileset(f)), "undefined" != typeof c.layers)c.layers.forEach(function (c) {
                    switch (c.type) {
                        case a.TMX_TAG_IMAGE_LAYER:
                            b.mapLayers.push(e.readImageLayer(b, c, d++));
                            break;
                        case a.TMX_TAG_TILE_LAYER:
                            b.mapLayers.push(e.readLayer(b, c, d++));
                            break;
                        case a.TMX_TAG_OBJECTGROUP:
                            b.objectGroups.push(e.readObjectGroup(b, c, d++))
                    }
                }); else if ("undefined" != typeof c.layer) {
                    var g = c.layer;
                    if (Array.isArray(g) === !0 ? g.forEach(function (a) {
                            b.mapLayers.push(e.readLayer(b, a, a._draworder))
                        }) : b.mapLayers.push(e.readLayer(b, g, g._draworder)), "undefined" != typeof c[a.TMX_TAG_OBJECTGROUP]) {
                        var h = c[a.TMX_TAG_OBJECTGROUP];
                        Array.isArray(h) === !0 ? h.forEach(function (a) {
                            b.objectGroups.push(e.readObjectGroup(b, a, a._draworder))
                        }) : b.objectGroups.push(e.readObjectGroup(b, h, h._draworder))
                    }
                    if ("undefined" != typeof c[a.TMX_TAG_IMAGE_LAYER]) {
                        var i = c[a.TMX_TAG_IMAGE_LAYER];
                        Array.isArray(i) === !0 ? i.forEach(function (a) {
                            b.mapLayers.push(e.readImageLayer(b, a, a._draworder))
                        }) : b.mapLayers.push(e.readImageLayer(b, i, i._draworder))
                    }
                }
                b.initialized = !0
            }
        }, getNewDefaultRenderer: function (a) {
            switch (a.orientation) {
                case"orthogonal":
                    return new me.TMXOrthogonalRenderer(a.cols, a.rows, a.tilewidth, a.tileheight);
                case"isometric":
                    return new me.TMXIsometricRenderer(a.cols, a.rows, a.tilewidth, a.tileheight);
                default:
                    throw new me.Error(a.orientation + " type TMX Tile Map not supported!")
            }
        }, setLayerData: function (b, c, d, e) {
            var f = Array.isArray(c) === !0 ? c : c.value;
            switch (d) {
                case"json":
                    f = c;
                    break;
                case a.TMX_TAG_CSV:
                case a.TMX_TAG_ATTR_BASE64:
                    d === a.TMX_TAG_CSV ? f = me.utils.decodeCSV(f, b.cols) : (f = me.utils.decodeBase64AsArray(f, 4), null !== e && (f = me.utils.decompress(f, e)));
                    break;
                default:
                    throw new me.Error("TMX Tile Map " + d + " encoding not supported!")
            }
            for (var g = 0, h = 0; h < b.rows; h++)for (var i = 0; i < b.cols; i++) {
                var j = null == d ? this.TMXParser.getIntAttribute(f[g++], a.TMX_TAG_GID) : f[g++];
                if (0 !== j) {
                    var k = b.setTile(i, h, j);
                    b.preRender && b.renderer.drawTile(b.layerSurface, i, h, k, k.tileset)
                }
            }
        }, readLayer: function (b, c, d) {
            var e = new me.TMXLayer(b.tilewidth, b.tileheight, b.orientation, b.tilesets, d);
            e.initFromJSON(c), e.setRenderer(me.game.tmxRenderer.canRender(e) ? me.game.tmxRenderer : me.mapReader.getNewDefaultRenderer(e));
            var f = Array.isArray(c[a.TMX_TAG_DATA]) ? c[a.TMX_TAG_ENCODING] : c[a.TMX_TAG_DATA][a.TMX_TAG_ENCODING];
            return this.setLayerData(e, c[a.TMX_TAG_DATA], f || "json", null), e
        }, readImageLayer: function (b, c, d) {
            var e = c[a.TMX_TAG_NAME], f = +c[a.TMX_TAG_WIDTH], g = +c[a.TMX_TAG_HEIGHT], h = "string" != typeof c[a.TMX_TAG_IMAGE] ? c[a.TMX_TAG_IMAGE].source : c[a.TMX_TAG_IMAGE], i = new me.ImageLayer(e, f * b.tilewidth, g * b.tileheight, h, d), j = "undefined" != typeof c[a.TMX_TAG_VISIBLE] ? c[a.TMX_TAG_VISIBLE] : !0;
            if (i.setOpacity(j === !0 ? (+c[a.TMX_TAG_OPACITY] || 1).clamp(0, 1) : 0), me.TMXUtils.applyTMXProperties(i, c), "number" == typeof i.ratio) {
                var k = i.ratio;
                i.ratio = new me.Vector2d(k, k)
            }
            return i
        }, readTileset: function (a) {
            return new me.TMXTileset(a)
        }, readObjectGroup: function (b, c, d) {
            return new me.TMXObjectGroup(c[a.TMX_TAG_NAME], c, b.orientation, b.tilesets, d)
        }
    })
}(me.TMXConstants), function () {
    me.levelDirector = function () {
        var a = {}, b = {}, c = [], d = 0, e = function (a, b) {
            b.autoSort = !1, me.game.currentLevel = a, me.game.viewport.setBounds(0, 0, Math.max(a.width, me.game.viewport.width), Math.max(a.height, me.game.viewport.height)), a.setDefaultPosition(me.game.viewport.width, me.game.viewport.height);
            for (var c = a.getLayers(), d = c.length; d--;)b.addChild(c[d]);
            for (var e = b, f = !1, g = a.getObjectGroups(), h = 0; h < g.length; h++) {
                var i = g[h];
                f = i.name.toLowerCase().contains(me.TMXConstants.COLLISION_GROUP), me.game.mergeGroup === !1 && (e = new me.Container, e.name = i.name, e.z = i.z, e.setOpacity(i.opacity), e.autoSort = !1);
                for (var j = 0; j < i.objects.length; j++) {
                    var k, l = i.objects[j];
                    f === !1 ? k = me.pool.pull(l.name, l.x, l.y, "TileObject" === l.name ? l.image : l) : (k = me.pool.pull("me.Entity", l.x, l.y, l), k.body.collisionType = me.collision.types.WORLD_SHAPE), k && (k.z = i.z, me.game.mergeGroup === !0 && k.isRenderable === !0 && (k.setOpacity(k.getOpacity() * i.opacity), k.renderable instanceof me.Renderable && k.renderable.setOpacity(k.renderable.getOpacity() * i.opacity)), e.addChild(k))
                }
                me.game.mergeGroup === !1 && (b.addChild(e), e.autoSort = !0)
            }
            b.sort(!0), b.autoSort = !0, me.game.world.transform.translateV(me.game.currentLevel.pos), me.game.world.resize(me.game.currentLevel.width, me.game.currentLevel.height), me.game.onLevelLoaded && me.game.onLevelLoaded.call(me.game.onLevelLoaded, a.name), me.event.publish(me.event.LEVEL_LOADED, [a.name])
        };
        return a.reset = function () {
        }, a.addLevel = function () {
            throw new me.Error("no level loader defined")
        }, a.addTMXLevel = function (a, d) {
            return null != b[a] ? !1 : (b[a] = new me.TMXTileMap(a), b[a].name = a, c.push(a), d && d(), !0)
        }, a.loadLevel = function (f) {
            if (f = f.toString().toLowerCase(), "undefined" == typeof b[f])throw new me.Error("level " + f + " not found");
            if (!(b[f] instanceof me.TMXTileMap))throw new me.Error("no level loader defined");
            var g = me.state.isRunning();
            return g && me.state.stop(), me.game.reset(), me.utils.resetGUID(f), b[a.getCurrentLevelId()] && b[a.getCurrentLevelId()].destroy(), me.mapReader.readMap(b[f], me.loader.getTMX(f)), d = c.indexOf(f), e(b[f], me.game.world), g && me.state.restart.defer(this), !0
        }, a.getCurrentLevelId = function () {
            return c[d]
        }, a.reloadLevel = function () {
            return a.loadLevel(a.getCurrentLevelId())
        }, a.nextLevel = function () {
            return d + 1 < c.length ? a.loadLevel(c[d + 1]) : !1
        }, a.previousLevel = function () {
            return d - 1 >= 0 ? a.loadLevel(c[d - 1]) : !1
        }, a.levelCount = function () {
            return c.length
        }, a
    }()
}(), /**
 * @preserve Tween JS
 * https://github.com/sole/Tween.js
 */
    function () {
        me.Tween = function (a) {
            var b = a, c = {}, d = {}, e = {}, f = 1e3, g = 0, h = !1, i = !1, j = 0, k = null, l = me.Tween.Easing.Linear.None, m = me.Tween.Interpolation.Linear, n = [], o = null, p = !1, q = null, r = null;
            for (var s in a)"object" != typeof a && (c[s] = parseFloat(a[s], 10));
            this.onResetEvent = function (a) {
                b = a, c = {}, d = {}, e = {}, l = me.Tween.Easing.Linear.None, m = me.Tween.Interpolation.Linear, h = !1, i = !1, f = 1e3, j = 0, o = null, p = !1, q = null, r = null
            }, this.to = function (a, b) {
                return void 0 !== b && (f = b), d = a, this
            }, this.start = function (a) {
                p = !1, me.game.world.addChild(this), k = ("undefined" == typeof a ? me.timer.getTime() : a) + j;
                for (var f in d) {
                    if (d[f] instanceof Array) {
                        if (0 === d[f].length)continue;
                        d[f] = [b[f]].concat(d[f])
                    }
                    c[f] = b[f], c[f] instanceof Array == !1 && (c[f] *= 1), e[f] = c[f] || 0
                }
                return this
            }, this.stop = function () {
                return me.game.world.hasChild(this) && me.game.world.removeChildNow(this), this
            }, this.delay = function (a) {
                return j = a, this
            }, me.event.subscribe(me.event.STATE_RESUME, function (a) {
                k && (k += a)
            }), this.repeat = function (a) {
                return g = a, this
            }, this.yoyo = function (a) {
                return h = a, this
            }, this.easing = function (a) {
                if ("function" != typeof a)throw new me.Tween.Error("invalid easing function for me.Tween.easing()");
                return l = a, this
            }, this.interpolation = function (a) {
                return m = a, this
            }, this.chain = function () {
                return n = arguments, this
            }, this.onStart = function (a) {
                return o = a, this
            }, this.onUpdate = function (a) {
                return q = a, this
            }, this.onComplete = function (a) {
                return r = a, this
            }, this.update = function () {
                var a, s = me.timer.getTime();
                if (k > s)return !0;
                p === !1 && (null !== o && o.call(b), p = !0);
                var t = (s - k) / f;
                t = t > 1 ? 1 : t;
                var u = l(t);
                for (a in d) {
                    var v = c[a] || 0, w = d[a];
                    w instanceof Array ? b[a] = m(w, u) : ("string" == typeof w && (w = v + parseFloat(w, 10)), "number" == typeof w && (b[a] = v + (w - v) * u))
                }
                if (null !== q && q.call(b, u), 1 === t) {
                    if (g > 0) {
                        isFinite(g) && g--;
                        for (a in e) {
                            if ("string" == typeof d[a] && (e[a] = e[a] + parseFloat(d[a], 10)), h) {
                                var x = e[a];
                                e[a] = d[a], d[a] = x
                            }
                            c[a] = e[a]
                        }
                        return h && (i = !i), k = s + j, !0
                    }
                    me.game.world.removeChildNow(this), null !== r && r.call(b);
                    for (var y = 0, z = n.length; z > y; y++)n[y].start(s);
                    return !1
                }
                return !0
            }
        }, me.Tween.Easing = {
            Linear: {
                None: function (a) {
                    return a
                }
            }, Quadratic: {
                In: function (a) {
                    return a * a
                }, Out: function (a) {
                    return a * (2 - a)
                }, InOut: function (a) {
                    return (a *= 2) < 1 ? .5 * a * a : -.5 * (--a * (a - 2) - 1)
                }
            }, Cubic: {
                In: function (a) {
                    return a * a * a
                }, Out: function (a) {
                    return --a * a * a + 1
                }, InOut: function (a) {
                    return (a *= 2) < 1 ? .5 * a * a * a : .5 * ((a -= 2) * a * a + 2)
                }
            }, Quartic: {
                In: function (a) {
                    return a * a * a * a
                }, Out: function (a) {
                    return 1 - --a * a * a * a
                }, InOut: function (a) {
                    return (a *= 2) < 1 ? .5 * a * a * a * a : -.5 * ((a -= 2) * a * a * a - 2)
                }
            }, Quintic: {
                In: function (a) {
                    return a * a * a * a * a
                }, Out: function (a) {
                    return --a * a * a * a * a + 1
                }, InOut: function (a) {
                    return (a *= 2) < 1 ? .5 * a * a * a * a * a : .5 * ((a -= 2) * a * a * a * a + 2)
                }
            }, Sinusoidal: {
                In: function (a) {
                    return 1 - Math.cos(a * Math.PI / 2)
                }, Out: function (a) {
                    return Math.sin(a * Math.PI / 2)
                }, InOut: function (a) {
                    return .5 * (1 - Math.cos(Math.PI * a))
                }
            }, Exponential: {
                In: function (a) {
                    return 0 === a ? 0 : Math.pow(1024, a - 1)
                }, Out: function (a) {
                    return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
                }, InOut: function (a) {
                    return 0 === a ? 0 : 1 === a ? 1 : (a *= 2) < 1 ? .5 * Math.pow(1024, a - 1) : .5 * (-Math.pow(2, -10 * (a - 1)) + 2)
                }
            }, Circular: {
                In: function (a) {
                    return 1 - Math.sqrt(1 - a * a)
                }, Out: function (a) {
                    return Math.sqrt(1 - --a * a)
                }, InOut: function (a) {
                    return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
                }
            }, Elastic: {
                In: function (a) {
                    var b, c = .1, d = .4;
                    return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1, b = d / 4) : b = d * Math.asin(1 / c) / (2 * Math.PI), -(c * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / d)))
                }, Out: function (a) {
                    var b, c = .1, d = .4;
                    return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1, b = d / 4) : b = d * Math.asin(1 / c) / (2 * Math.PI), c * Math.pow(2, -10 * a) * Math.sin(2 * (a - b) * Math.PI / d) + 1)
                }, InOut: function (a) {
                    var b, c = .1, d = .4;
                    return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1, b = d / 4) : b = d * Math.asin(1 / c) / (2 * Math.PI), (a *= 2) < 1 ? -.5 * c * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / d) : c * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / d) * .5 + 1)
                }
            }, Back: {
                In: function (a) {
                    var b = 1.70158;
                    return a * a * ((b + 1) * a - b)
                }, Out: function (a) {
                    var b = 1.70158;
                    return --a * a * ((b + 1) * a + b) + 1
                }, InOut: function (a) {
                    var b = 2.5949095;
                    return (a *= 2) < 1 ? .5 * a * a * ((b + 1) * a - b) : .5 * ((a -= 2) * a * ((b + 1) * a + b) + 2)
                }
            }, Bounce: {
                In: function (a) {
                    return 1 - me.Tween.Easing.Bounce.Out(1 - a)
                }, Out: function (a) {
                    return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                }, InOut: function (a) {
                    return .5 > a ? .5 * me.Tween.Easing.Bounce.In(2 * a) : .5 * me.Tween.Easing.Bounce.Out(2 * a - 1) + .5
                }
            }
        }, me.Tween.Interpolation = {
            Linear: function (a, b) {
                var c = a.length - 1, d = c * b, e = Math.floor(d), f = me.Tween.Interpolation.Utils.Linear;
                return 0 > b ? f(a[0], a[1], d) : b > 1 ? f(a[c], a[c - 1], c - d) : f(a[e], a[e + 1 > c ? c : e + 1], d - e)
            }, Bezier: function (a, b) {
                var c, d = 0, e = a.length - 1, f = Math.pow, g = me.Tween.Interpolation.Utils.Bernstein;
                for (c = 0; e >= c; c++)d += f(1 - b, e - c) * f(b, c) * a[c] * g(e, c);
                return d
            }, CatmullRom: function (a, b) {
                var c = a.length - 1, d = c * b, e = Math.floor(d), f = me.Tween.Interpolation.Utils.CatmullRom;
                return a[0] === a[c] ? (0 > b && (e = Math.floor(d = c * (1 + b))), f(a[(e - 1 + c) % c], a[e], a[(e + 1) % c], a[(e + 2) % c], d - e)) : 0 > b ? a[0] - (f(a[0], a[0], a[1], a[1], -d) - a[0]) : b > 1 ? a[c] - (f(a[c], a[c], a[c - 1], a[c - 1], d - c) - a[c]) : f(a[e ? e - 1 : 0], a[e], a[e + 1 > c ? c : e + 1], a[e + 2 > c ? c : e + 2], d - e)
            }, Utils: {
                Linear: function (a, b, c) {
                    return (b - a) * c + a
                }, Bernstein: function (a, b) {
                    var c = me.Tween.Interpolation.Utils.Factorial;
                    return c(a) / c(b) / c(a - b)
                }, Factorial: function () {
                    var a = [1];
                    return function (b) {
                        var c, d = 1;
                        if (a[b])return a[b];
                        for (c = b; c > 1; c--)d *= c;
                        return a[b] = d
                    }
                }(), CatmullRom: function (a, b, c, d, e) {
                    var f = .5 * (c - a), g = .5 * (d - b), h = e * e, i = e * h;
                    return (2 * b - 2 * c + f + g) * i + (-3 * b + 3 * c - 2 * f - g) * h + f * e + b
                }
            }
        }, me.Tween.Error = me.Error.extend({
            init: function (a) {
                me.Error.prototype.init.apply(this, [a]), this.name = "me.Tween.Error"
            }
        })
    }(), /**
 * @preserve MinPubSub
 * a micro publish/subscribe messaging framework
 * @see https://github.com/daniellmb/MinPubSub
 * @author Daniel Lamb <daniellmb.com>
 *
 * Released under the MIT License
 */
    function () {
        me.event = function () {
            var a = {}, b = {};
            return a.STATE_PAUSE = "me.state.onPause", a.STATE_RESUME = "me.state.onResume", a.STATE_STOP = "me.state.onStop", a.STATE_RESTART = "me.state.onRestart", a.GAME_INIT = "me.game.onInit", a.LEVEL_LOADED = "me.game.onLevelLoaded", a.LOADER_COMPLETE = "me.loader.onload", a.LOADER_PROGRESS = "me.loader.onProgress", a.KEYDOWN = "me.input.keydown", a.KEYUP = "me.input.keyup", a.MOUSEMOVE = "me.game.pointermove", a.DRAGSTART = "me.game.dragstart", a.DRAGEND = "me.game.dragend", a.WINDOW_ONRESIZE = "window.onresize", a.WINDOW_ONORIENTATION_CHANGE = "window.orientationchange", a.WINDOW_ONSCROLL = "window.onscroll", a.VIEWPORT_ONCHANGE = "viewport.onchange", a.publish = function (a, c) {
                for (var d = b[a], e = d ? d.length : 0; e--;)d[e].apply(window, c || [])
            }, a.subscribe = function (a, c) {
                return b[a] || (b[a] = []), b[a].push(c), [a, c]
            }, a.unsubscribe = function (a, c) {
                var d = b[c ? a : a[0]], e = d ? d.length : 0;
                for (c = c || a[1]; e--;)d[e] === c && d.splice(e, 1)
            }, a
        }()
    }(), /*!
 *  howler.js v2.0.0-beta
 *  howlerjs.com
 *
 *  (c) 2013-2014, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
    function () {
        "use strict";
        function a() {
            try {
                "undefined" != typeof AudioContext ? b = new AudioContext : "undefined" != typeof webkitAudioContext ? b = new webkitAudioContext : c = !1
            } catch (a) {
                c = !1
            }
            if (!c)if ("undefined" != typeof Audio)try {
                new Audio
            } catch (a) {
                d = !0
            } else d = !0
        }

        var b = null, c = !0, d = !1;
        if (a(), c) {
            var e = "undefined" == typeof b.createGain ? b.createGainNode() : b.createGain();
            e.gain.value = 1, e.connect(b.destination)
        }
        var f = function () {
            this.init()
        };
        f.prototype = {
            init: function () {
                var a = this || g;
                return a._codecs = {}, a._howls = [], a._muted = !1, a._volume = 1, a.iOSAutoEnable = !0, a.noAudio = d, a.usingWebAudio = c, a.ctx = b, d || a._setupCodecs(), a
            }, volume: function (a) {
                var b = this || g;
                if (a = parseFloat(a), "undefined" != typeof a && a >= 0 && 1 >= a) {
                    b._volume = a, c && (e.gain.value = a);
                    for (var d = 0; d < b._howls.length; d++)if (!b._howls[d]._webAudio)for (var f = b._howls[d]._getSoundIds(), h = 0; h < f.length; h++) {
                        var i = b._howls[d]._soundById(f[h]);
                        i && i._node && (i._node.volume = i._volume * a)
                    }
                    return b
                }
                return b._volume
            }, mute: function (a) {
                var b = this || g;
                b._muted = a, c && (e.gain.value = a ? 0 : b._volume);
                for (var d = 0; d < b._howls.length; d++)if (!b._howls[d]._webAudio)for (var f = b._howls[d]._getSoundIds(), h = 0; h < f.length; h++) {
                    var i = b._howls[d]._soundById(f[h]);
                    i && i._node && (i._node.muted = a ? !0 : i._muted)
                }
                return b
            }, codecs: function (a) {
                return (this || g)._codecs[a]
            }, _setupCodecs: function () {
                var a = this || g, b = new Audio;
                return a._codecs = {
                    mp3: !!b.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                    opus: !!b.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                    ogg: !!b.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    wav: !!b.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                    aac: !!b.canPlayType("audio/aac;").replace(/^no$/, ""),
                    m4a: !!(b.canPlayType("audio/x-m4a;") || b.canPlayType("audio/m4a;") || b.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    mp4: !!(b.canPlayType("audio/x-mp4;") || b.canPlayType("audio/mp4;") || b.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    weba: !!b.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                    webm: !!b.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
                }, a
            }, _enableiOSAudio: function () {
                var a = this || g;
                if (!b || !a._iOSEnabled && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    a._iOSEnabled = !1;
                    var c = function () {
                        var d = b.createBuffer(1, 1, 22050), e = b.createBufferSource();
                        e.buffer = d, e.connect(b.destination), "undefined" == typeof e.start ? e.noteOn(0) : e.start(0), setTimeout(function () {
                            (e.playbackState === e.PLAYING_STATE || e.playbackState === e.FINISHED_STATE) && (a._iOSEnabled = !0, a.iOSAutoEnable = !1, window.removeEventListener("touchstart", c, !1))
                        }, 0)
                    };
                    return window.addEventListener("touchstart", c, !1), a
                }
            }
        };
        var g = new f, h = function (a) {
            var b = this;
            return a.src ? void b.init(a) : void console.error("An array of source files must be passed with any new Howl.")
        };
        h.prototype = {
            init: function (a) {
                var d = this;
                return d._autoplay = a.autoplay || !1, d._ext = a.ext || null, d._html5 = a.html5 || !1, d._muted = a.mute || !1, d._loop = a.loop || !1, d._pool = a.pool || 5, d._preload = "boolean" == typeof a.preload ? a.preload : !0, d._rate = a.rate || 1, d._sprite = a.sprite || {}, d._src = "string" != typeof a.src ? a.src : [a.src], d._volume = void 0 !== a.volume ? a.volume : 1, d._duration = 0, d._loaded = !1, d._sounds = [], d._endTimers = {}, d._onend = a.onend ? [{fn: a.onend}] : [], d._onfaded = a.onfaded ? [{fn: a.onfaded}] : [], d._onload = a.onload ? [{fn: a.onload}] : [], d._onloaderror = a.onloaderror ? [{fn: a.onloaderror}] : [], d._onpause = a.onpause ? [{fn: a.onpause}] : [], d._onplay = a.onplay ? [{fn: a.onplay}] : [], d._webAudio = c && !d._html5, "undefined" != typeof b && b && g.iOSAutoEnable && g._enableiOSAudio(), g._howls.push(d), d._preload && d.load(), d
            }, load: function () {
                var a = this, b = null;
                if (d)return void a._emit("loaderror");
                "string" == typeof a._src && (a._src = [a._src]);
                for (var c = 0; c < a._src.length; c++) {
                    var e, f;
                    if (a._ext && a._ext[c] ? e = a._ext[c] : (f = a._src[c], e = /^data:audio\/([^;,]+);/i.exec(f), e || (e = /\.([^.]+)$/.exec(f.split("?", 1)[0])), e && (e = e[1].toLowerCase())), g.codecs(e)) {
                        b = a._src[c];
                        break
                    }
                }
                return b ? (a._src = b, new i(a), a._webAudio && k(a), a) : void a._emit("loaderror")
            }, play: function (a) {
                var c = this, d = null;
                if ("number" == typeof a)d = a, a = null; else if ("undefined" == typeof a) {
                    a = "__default";
                    for (var e = 0, f = 0; f < c._sounds.length; f++)c._sounds[f]._paused && !c._sounds[f]._ended && (e++, d = c._sounds[f]._id);
                    1 === e ? a = null : d = null
                }
                var h = d ? c._soundById(d) : c._inactiveSound();
                if (d && !a && (a = h._sprite || "__default"), !h)return null;
                if (!c._loaded && !c._sprite[a])return c.once("load", function () {
                    c.play(c._soundById(h._id) ? h._id : void 0)
                }), h._id;
                if (d && !h._paused)return h._id;
                var i = h._seek > 0 ? h._seek : c._sprite[a][0] / 1e3, j = (c._sprite[a][0] + c._sprite[a][1]) / 1e3 - i, k = function () {
                    var d = !(!h._loop && !c._sprite[a][2]);
                    c._emit("end", h._id), !c._webAudio && d && c.stop(h._id).play(h._id), c._webAudio && d && (c._emit("play", h._id), h._seek = h._start || 0, h._playStart = b.currentTime, c._endTimers[h._id] = setTimeout(k, 1e3 * (h._stop - h._start) / Math.abs(c._rate))), c._webAudio && !d && (h._paused = !0, h._ended = !0, h._seek = h._start || 0, c._clearTimer(h._id), h._node.bufferSource = null), c._webAudio || d || c.stop(h._id)
                };
                c._endTimers[h._id] = setTimeout(k, 1e3 * j / Math.abs(c._rate)), h._paused = !1, h._ended = !1, h._sprite = a, h._seek = i, h._start = c._sprite[a][0] / 1e3, h._stop = (c._sprite[a][0] + c._sprite[a][1]) / 1e3, h._loop = !(!h._loop && !c._sprite[a][2]);
                var l = h._node;
                if (c._webAudio) {
                    var m = function () {
                        c._refreshBuffer(h);
                        var a = h._muted || c._muted ? 0 : h._volume * g.volume();
                        l.gain.setValueAtTime(a, b.currentTime), h._playStart = b.currentTime, "undefined" == typeof l.bufferSource.start ? l.bufferSource.noteGrainOn(0, i, j) : l.bufferSource.start(0, i, j), c._endTimers[h._id] || (c._endTimers[h._id] = setTimeout(k, 1e3 * j / Math.abs(c._rate))), setTimeout(function () {
                            c._emit("play", h._id)
                        }, 0)
                    };
                    c._loaded ? m() : (c.once("load", m), c._clearTimer(h._id))
                } else {
                    var n = function () {
                        l.currentTime = i, l.muted = h._muted || c._muted || g._muted || l.muted, l.volume = h._volume * g.volume(), l.playbackRate = c._rate, setTimeout(function () {
                            l.play(), c._emit("play", h._id)
                        }, 0)
                    };
                    if (4 === l.readyState || !l.readyState && navigator.isCocoonJS)n(); else {
                        var o = function () {
                            c._endTimers[h._id] = setTimeout(k, 1e3 * j / Math.abs(c._rate)), n(), l.removeEventListener("canplaythrough", o, !1)
                        };
                        l.addEventListener("canplaythrough", o, !1), c._clearTimer(h._id)
                    }
                }
                return h._id
            }, pause: function (a) {
                var b = this;
                if (!b._loaded)return b.once("play", function () {
                    b.pause(a)
                }), b;
                for (var c = b._getSoundIds(a), d = 0; d < c.length; d++) {
                    b._clearTimer(c[d]);
                    var e = b._soundById(c[d]);
                    if (e && !e._paused) {
                        if (e._seek = b.seek(c[d]), e._paused = !0, b._webAudio) {
                            if (!e._node.bufferSource)return b;
                            "undefined" == typeof e._node.bufferSource.stop ? e._node.bufferSource.noteOff(0) : e._node.bufferSource.stop(0), e._node.bufferSource = null
                        } else isNaN(e._node.duration) || e._node.pause();
                        arguments[1] || b._emit("pause", e._id)
                    }
                }
                return b
            }, stop: function (a) {
                var b = this;
                if (!b._loaded)return "undefined" != typeof b._sounds[0]._sprite && b.once("play", function () {
                    b.stop(a)
                }), b;
                for (var c = b._getSoundIds(a), d = 0; d < c.length; d++) {
                    b._clearTimer(c[d]);
                    var e = b._soundById(c[d]);
                    if (e && !e._paused)if (e._seek = e._start || 0, e._paused = !0, e._ended = !0, b._webAudio) {
                        if (!e._node.bufferSource)return b;
                        "undefined" == typeof e._node.bufferSource.stop ? e._node.bufferSource.noteOff(0) : e._node.bufferSource.stop(0), e._node.bufferSource = null
                    } else isNaN(e._node.duration) || (e._node.pause(), e._node.currentTime = e._start || 0)
                }
                return b
            }, mute: function (a, c) {
                var d = this;
                if (!d._loaded)return d.once("play", function () {
                    d.mute(a, c)
                }), d;
                if ("undefined" == typeof c) {
                    if ("boolean" != typeof a)return d._muted;
                    d._muted = a
                }
                for (var e = d._getSoundIds(c), f = 0; f < e.length; f++) {
                    var h = d._soundById(e[f]);
                    h && (h._muted = a, d._webAudio && h._node ? h._node.gain.setValueAtTime(a ? 0 : h._volume * g.volume(), b.currentTime) : h._node && (h._node.muted = g._muted ? !0 : a))
                }
                return d
            }, volume: function () {
                var a, c, d = this, e = arguments;
                if (0 === e.length)return d._volume;
                if (1 === e.length) {
                    var f = d._getSoundIds(), h = f.indexOf(e[0]);
                    h >= 0 ? c = parseInt(e[0], 10) : a = parseFloat(e[0])
                } else 2 === e.length && (a = parseFloat(e[0]), c = parseInt(e[1], 10));
                var i;
                if (!("undefined" != typeof a && a >= 0 && 1 >= a))return i = c ? d._soundById(c) : d._sounds[0], i ? i._volume : 0;
                if (!d._loaded)return d.once("play", function () {
                    d.volume.apply(d, e)
                }), d;
                "undefined" == typeof c && (d._volume = a), c = d._getSoundIds(c);
                for (var j = 0; j < c.length; j++)i = d._soundById(c[j]), i && (i._volume = a, d._webAudio && i._node ? i._node.gain.setValueAtTime(a * g.volume(), b.currentTime) : i._node && (i._node.volume = a * g.volume()));
                return d
            }, fade: function (a, c, d, e) {
                var f = this;
                if (!f._loaded)return f.once("play", function () {
                    f.fade(a, c, d, e)
                }), f;
                f.volume(a, e);
                for (var g = f._getSoundIds(e), h = 0; h < g.length; h++) {
                    var i = f._soundById(g[h]);
                    if (i)if (f._webAudio) {
                        var j = b.currentTime, k = j + d / 1e3;
                        i._volume = a, i._node.gain.setValueAtTime(a, j), i._node.gain.linearRampToValueAtTime(c, k), setTimeout(function (a, d) {
                            setTimeout(function () {
                                d._volume = c, f._emit("faded", a)
                            }, k - b.currentTime > 0 ? Math.ceil(1e3 * (k - b.currentTime)) : 0)
                        }.bind(f, g[h], i), d)
                    } else {
                        var l = Math.abs(a - c), m = a > c ? "out" : "in", n = l / .01, o = d / n;
                        !function () {
                            var b = a, d = setInterval(function (a) {
                                b += "in" === m ? .01 : -.01, b = Math.max(0, b), b = Math.min(1, b), b = Math.round(100 * b) / 100, f.volume(b, a), b === c && (clearInterval(d), f._emit("faded", a))
                            }.bind(f, g[h]), o)
                        }()
                    }
                }
                return f
            }, loop: function () {
                var a, b, c, d = this, e = arguments;
                if (0 === e.length)return d._loop;
                if (1 === e.length) {
                    if ("boolean" != typeof e[0])return c = d._soundById(parseInt(e[0], 10)), c ? c._loop : !1;
                    a = e[0], d._loop = a
                } else 2 === e.length && (a = e[0], b = parseInt(e[1], 10));
                for (var f = d._getSoundIds(b), g = 0; g < f.length; g++)c = d._soundById(f[g]), c && (c._loop = a, d._webAudio && c._node && (c._node.bufferSource.loop = a));
                return d
            }, seek: function () {
                var a, c, d = this, e = arguments;
                if (0 === e.length)c = d._sounds[0]._id; else if (1 === e.length) {
                    var f = d._getSoundIds(), g = f.indexOf(e[0]);
                    g >= 0 ? c = parseInt(e[0], 10) : (c = d._sounds[0]._id, a = parseFloat(e[0]))
                } else 2 === e.length && (a = parseFloat(e[0]), c = parseInt(e[1], 10));
                if ("undefined" == typeof c)return d;
                if (!d._loaded)return d.once("load", function () {
                    d.seek.apply(d, e)
                }), d;
                var h = d._soundById(c);
                if (h) {
                    if (!(a >= 0))return d._webAudio ? h._seek + (b.currentTime - h._playStart) : h._node.currentTime;
                    var i = d.playing(c);
                    i && d.pause(c, !0), h._seek = a, d._clearTimer(c), i && d.play(c)
                }
                return d
            }, playing: function (a) {
                var b = this, c = b._soundById(a) || b._sounds[0];
                return c ? !c._paused : !1
            }, duration: function () {
                return this._duration
            }, unload: function () {
                for (var a = this, b = a._sounds, c = 0; c < b.length; c++) {
                    b[c]._paused || (a.stop(b[c]._id), a._emit("end", b[c]._id)), a._webAudio || (b[c]._node.src = "", b[c]._node.removeEventListener("error", b[c]._errorFn, !1), b[c]._node.removeEventListener("canplaythrough", b[c]._loadFn, !1)), delete b[c]._node, a._clearTimer(b[c]._id);
                    var d = g._howls.indexOf(a);
                    d >= 0 && g._howls.splice(d, 1)
                }
                return j && delete j[a._src], a = null, null
            }, on: function (a, b, c) {
                var d = this, e = d["_on" + a];
                return "function" == typeof b && e.push({id: c, fn: b}), d
            }, off: function (a, b, c) {
                var d = this, e = d["_on" + a];
                if (b) {
                    for (var f = 0; f < e.length; f++)if (b === e[f].fn && c === e[f].id) {
                        e.splice(f, 1);
                        break
                    }
                } else e = [];
                return d
            }, once: function (a, b, c) {
                var d = this, e = function () {
                    b.apply(d, arguments), d.off(a, e, c)
                };
                return d.on(a, e, c), d
            }, _emit: function (a, b, c) {
                for (var d = this, e = d["_on" + a], f = 0; f < e.length; f++)e[f].id && e[f].id !== b || setTimeout(function (a) {
                    a.call(this, b, c)
                }.bind(d, e[f].fn), 0);
                return d
            }, _clearTimer: function (a) {
                var b = this;
                return b._endTimers[a] && (clearTimeout(b._endTimers[a]), delete b._endTimers[a]), b
            }, _soundById: function (a) {
                for (var b = this, c = 0; c < b._sounds.length; c++)if (a === b._sounds[c]._id)return b._sounds[c];
                return null
            }, _inactiveSound: function () {
                var a = this;
                a._drain();
                for (var b = 0; b < a._sounds.length; b++)if (a._sounds[b]._ended)return a._sounds[b].reset();
                return new i(a)
            }, _drain: function () {
                var a = this, b = a._pool, c = 0, d = 0;
                if (!(a._sounds.length < b)) {
                    for (d = 0; d < a._sounds.length; d++)a._sounds[d]._ended && c++;
                    for (d = a._sounds.length - 1; d >= 0; d--) {
                        if (b >= c)return;
                        a._sounds[d]._ended && (a._webAudio && a._sounds[d]._node && a._sounds[d]._node.disconnect(0), a._sounds.splice(d, 1), c--)
                    }
                }
            }, _getSoundIds: function (a) {
                var b = this;
                if ("undefined" == typeof a) {
                    for (var c = [], d = 0; d < b._sounds.length; d++)c.push(b._sounds[d]._id);
                    return c
                }
                return [a]
            }, _refreshBuffer: function (a) {
                var c = this;
                return a._node.bufferSource = b.createBufferSource(), a._node.bufferSource.buffer = j[c._src], a._node.bufferSource.connect(a._panner ? a._panner : a._node), a._node.bufferSource.loop = a._loop, a._loop && (a._node.bufferSource.loopStart = a._start || 0, a._node.bufferSource.loopEnd = a._stop), a._node.bufferSource.playbackRate.value = c._rate, c
            }
        };
        var i = function (a) {
            this._parent = a, this.init()
        };
        if (i.prototype = {
                init: function () {
                    var a = this, b = a._parent;
                    return a._muted = b._muted, a._loop = b._loop, a._volume = b._volume, a._muted = b._muted, a._seek = 0, a._paused = !0, a._ended = !0, a._id = Math.round(Date.now() * Math.random()), b._sounds.push(a), a.create(), a
                }, create: function () {
                    var a = this, c = a._parent, d = g._muted || a._muted || a._parent._muted ? 0 : a._volume * g.volume();
                    return c._webAudio ? (a._node = "undefined" == typeof b.createGain ? b.createGainNode() : b.createGain(), a._node.gain.setValueAtTime(d, b.currentTime), a._node.paused = !0, a._node.connect(e)) : (a._node = new Audio, a._errorFn = a._errorListener.bind(a), a._node.addEventListener("error", a._errorFn, !1), a._loadFn = a._loadListener.bind(a), a._node.addEventListener("canplaythrough", a._loadFn, !1), a._node.src = c._src, a._node.preload = "auto", a._node.volume = d, a._node.load()), a
                }, reset: function () {
                    var a = this, b = a._parent;
                    return a._muted = b._muted, a._loop = b._loop, a._volume = b._volume, a._muted = b._muted, a._seek = 0, a._paused = !0, a._ended = !0, a._sprite = null, a._id = Math.round(Date.now() * Math.random()), a
                }, _errorListener: function () {
                    var a = this;
                    a._node.error && 4 === a._node.error.code && (g.noAudio = !0), a._parent._emit("loaderror", a._id, a._node.error ? a._node.error.code : 0), a._node.removeEventListener("error", a._errorListener, !1)
                }, _loadListener: function () {
                    var a = this, b = a._parent;
                    b._duration = Math.ceil(10 * a._node.duration) / 10, 0 === Object.keys(b._sprite).length && (b._sprite = {__default: [0, 1e3 * b._duration]}), b._loaded || (b._loaded = !0, b._emit("load")), b._autoplay && b.play(), a._node.removeEventListener("canplaythrough", a._loadListener, !1)
                }
            }, c)var j = {}, k = function (a) {
            var b = a._src;
            if (j[b])return a._duration = j[b].duration, void n(a);
            if (/^data:[^;]+;base64,/.test(b)) {
                for (var c = atob(b.split(",")[1]), d = new Uint8Array(c.length), e = 0; e < c.length; ++e)d[e] = c.charCodeAt(e);
                m(d.buffer, a)
            } else {
                var f = new XMLHttpRequest;
                f.open("GET", b, !0), f.responseType = "arraybuffer", f.onload = function () {
                    m(f.response, a)
                }, f.onerror = function () {
                    a._webAudio && (a._html5 = !0, a._webAudio = !1, a._sounds = [], delete j[b], a.load())
                }, l(f)
            }
        }, l = function (a) {
            try {
                a.send()
            } catch (b) {
                a.onerror()
            }
        }, m = function (a, c) {
            b.decodeAudioData(a, function (a) {
                a && (j[c._src] = a, n(c, a))
            }, function () {
                c._emit("loaderror")
            })
        }, n = function (a, b) {
            b && !a._duration && (a._duration = b.duration), 0 === Object.keys(a._sprite).length && (a._sprite = {__default: [0, 1e3 * a._duration]}), a._loaded || (a._loaded = !0, a._emit("load")), a._autoplay && a.play()
        };
        "function" == typeof define && define.amd && define("howler", function () {
            return {Howler: g, Howl: h}
        }), "undefined" != typeof exports && (exports.Howler = g, exports.Howl = h), "undefined" != typeof window && (window.HowlerGlobal = f, window.Howler = g, window.Howl = h, window.Sound = i)
    }(), function () {
    me.plugin = function () {
        var a = {};
        return a.Base = Object.extend({
            init: function () {
                this.version = "2.0.2"
            }
        }), a.patch = function (a, b, c) {
            if ("undefined" != typeof a.prototype && (a = a.prototype), "function" == typeof a[b]) {
                var d = a[b];
                Object.defineProperty(a, b, {
                    configurable: !0, value: function (a, b) {
                        return function () {
                            this._patched = d;
                            var a = b.apply(this, arguments);
                            return this._patched = null, a
                        }
                    }(b, c)
                })
            } else console.error(b + " is not an existing function")
        }, a.register = function (a, b) {
            me.plugin[b] && console.error("plugin " + b + " already registered");
            var c = [];
            if (arguments.length > 2 && (c = Array.prototype.slice.call(arguments, 1)), c[0] = a, me.plugin[b] = new (a.bind.apply(a, c)), !(me.plugin[b] && me.plugin[b] instanceof me.plugin.Base))throw new me.Error("Plugin should extend the me.plugin.Base Class !");
            if (me.sys.checkVersion(me.plugin[b].version) > 0)throw new me.Error("Plugin version mismatch, expected: " + me.plugin[b].version + ", got: " + me.version)
        }, a
    }()
}(), me.DraggableEntity = function (a, b, c, d) {
    "use strict";
    return a.extend({
        init: function (c, e, f) {
            a.prototype.init.apply(this, [c, e, f]), this.dragging = !1, this.dragId = null, this.grabOffset = new d(0, 0), this.onPointerEvent = b.registerPointerEvent, this.removePointerEvent = b.releasePointerEvent, this.initEvents()
        }, initEvents: function () {
            var a = this;
            this.mouseDown = function (a) {
                this.translatePointerEvent(a, c.DRAGSTART)
            }, this.mouseUp = function (a) {
                this.translatePointerEvent(a, c.DRAGEND)
            }, this.onPointerEvent("pointerdown", this, this.mouseDown.bind(this)), this.onPointerEvent("pointerup", this, this.mouseUp.bind(this)), c.subscribe(c.MOUSEMOVE, this.dragMove.bind(this)), c.subscribe(c.DRAGSTART, function (b, c) {
                c === a && a.dragStart(b)
            }), c.subscribe(c.DRAGEND, function (b, c) {
                c === a && a.dragEnd(b)
            })
        }, translatePointerEvent: function (a, b) {
            c.publish(b, [a, this])
        }, dragStart: function (a) {
            return this.dragging === !1 ? (this.dragging = !0, this.dragId = a.pointerId, this.grabOffset.set(a.gameX, a.gameY), this.grabOffset.sub(this.pos), !1) : void 0
        }, dragMove: function (a) {
            this.dragging === !0 && this.dragId === a.pointerId && (this.pos.set(a.gameX, a.gameY), this.pos.sub(this.grabOffset))
        }, dragEnd: function () {
            return this.dragging === !0 ? (this.pointerId = void 0, this.dragging = !1, !1) : void 0
        }, destroy: function () {
            c.unsubscribe(c.MOUSEMOVE, this.dragMove), c.unsubscribe(c.DRAGSTART, this.dragStart), c.unsubscribe(c.DRAGEND, this.dragEnd), this.removePointerEvent("pointerdown", this), this.removePointerEvent("pointerup", this)
        }
    })
}(me.Entity, me.input, me.event, me.Vector2d), me.DroptargetEntity = function (a, b) {
    "use strict";
    return a.extend({
        init: function (c, d, e) {
            this.CHECKMETHOD_OVERLAP = "overlaps", this.CHECKMETHOD_CONTAINS = "contains", this.checkMethod = null, a.prototype.init.apply(this, [c, d, e]), b.subscribe(b.DRAGEND, this.checkOnMe.bind(this)), this.checkMethod = this[this.CHECKMETHOD_OVERLAP]
        }, setCheckMethod: function (a) {
            "undefined" != typeof this[a] && (this.checkMethod = this[a])
        }, checkOnMe: function (a, b) {
            b && this.checkMethod(b.getBounds().translateV(b.pos)) && this.drop(b)
        }, drop: function () {
        }, destroy: function () {
            b.unsubscribe(b.DRAGEND, this.checkOnMe)
        }
    })
}(me.Entity, me.event), function () {
    var a = function () {
        var a = me.video.createCanvas(1, 1), b = me.CanvasRenderer.getContext2d(a);
        return b.fillStyle = "#fff", b.fillRect(0, 0, 1, 1), a
    }();
    me.ParticleEmitterSettings = {
        width: 0,
        height: 0,
        image: a,
        totalParticles: 50,
        angle: Math.PI / 2,
        angleVariation: 0,
        minLife: 1e3,
        maxLife: 3e3,
        speed: 2,
        speedVariation: 1,
        minRotation: 0,
        maxRotation: 0,
        minStartScale: 1,
        maxStartScale: 1,
        minEndScale: 0,
        maxEndScale: 0,
        gravity: 0,
        wind: 0,
        followTrajectory: !1,
        textureAdditive: !1,
        onlyInViewport: !0,
        floating: !1,
        maxParticles: 10,
        frequency: 100,
        duration: 1 / 0,
        framesToSkip: 0
    }, me.ParticleEmitter = me.Rect.extend({
        init: function (a, b, c) {
            this._stream = !1, this._frequencyTimer = 0, this._durationTimer = 0, this._enabled = !1, this.isRenderable = !1, me.Rect.prototype.init.apply(this, [a, b, 1 / 0, 1 / 0]), this.autoSort = !1, this.container = new me.ParticleContainer(this), Object.defineProperty(this, "z", {
                get: function () {
                    return this.container.z
                }, set: function (a) {
                    this.container.z = a
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(this, "floating", {
                get: function () {
                    return this.container.floating
                }, set: function (a) {
                    this.container.floating = a
                }, enumerable: !0, configurable: !0
            }), this.reset(c)
        }, destroy: function () {
            this.reset()
        }, getRandomPoint: function () {
            var a = this.pos.clone();
            return a.x += 0..randomFloat(this.width), a.y += 0..randomFloat(this.height), a
        }, reset: function (a) {
            a = a || {};
            var b = me.ParticleEmitterSettings, c = "number" == typeof a.width ? a.width : b.width, d = "number" == typeof a.height ? a.height : b.height;
            this.resize(c, d), this.image = a.image || b.image, this.totalParticles = "number" == typeof a.totalParticles ? a.totalParticles : b.totalParticles, this.angle = "number" == typeof a.angle ? a.angle : b.angle, this.angleVariation = "number" == typeof a.angleVariation ? a.angleVariation : b.angleVariation, this.minLife = "number" == typeof a.minLife ? a.minLife : b.minLife, this.maxLife = "number" == typeof a.maxLife ? a.maxLife : b.maxLife, this.speed = "number" == typeof a.speed ? a.speed : b.speed, this.speedVariation = "number" == typeof a.speedVariation ? a.speedVariation : b.speedVariation, this.minRotation = "number" == typeof a.minRotation ? a.minRotation : b.minRotation, this.maxRotation = "number" == typeof a.maxRotation ? a.maxRotation : b.maxRotation, this.minStartScale = "number" == typeof a.minStartScale ? a.minStartScale : b.minStartScale, this.maxStartScale = "number" == typeof a.maxStartScale ? a.maxStartScale : b.maxStartScale, this.minEndScale = "number" == typeof a.minEndScale ? a.minEndScale : b.minEndScale, this.maxEndScale = "number" == typeof a.maxEndScale ? a.maxEndScale : b.maxEndScale, this.gravity = "number" == typeof a.gravity ? a.gravity : b.gravity, this.wind = "number" == typeof a.wind ? a.wind : b.wind, this.followTrajectory = "boolean" == typeof a.followTrajectory ? a.followTrajectory : b.followTrajectory, this.textureAdditive = "boolean" == typeof a.textureAdditive ? a.textureAdditive : b.textureAdditive, this.onlyInViewport = "boolean" == typeof a.onlyInViewport ? a.onlyInViewport : b.onlyInViewport, this.floating = "boolean" == typeof a.floating ? a.floating : b.floating, this.maxParticles = "number" == typeof a.maxParticles ? a.maxParticles : b.maxParticles, this.frequency = "number" == typeof a.frequency ? a.frequency : b.frequency, this.duration = "number" == typeof a.duration ? a.duration : b.duration, this.framesToSkip = "number" == typeof a.framesToSkip ? a.framesToSkip : b.framesToSkip, this.container.destroy()
        }, addParticles: function (a) {
            for (var b = 0; ~~a > b; b++) {
                var c = me.pool.pull("me.Particle", this);
                this.container.addChild(c)
            }
        }, isRunning: function () {
            return this._enabled && this._stream
        }, streamParticles: function (a) {
            this._enabled = !0, this._stream = !0, this.frequency = Math.max(this.frequency, 1), this._durationTimer = "number" == typeof a ? a : this.duration
        }, stopStream: function () {
            this._enabled = !1
        }, burstParticles: function (a) {
            this._enabled = !0, this._stream = !1, this.addParticles("number" == typeof a ? a : this.totalParticles), this._enabled = !1
        }, update: function (a) {
            if (this._enabled && this._stream) {
                if (1 / 0 !== this._durationTimer && (this._durationTimer -= a, this._durationTimer <= 0))return this.stopStream(), !1;
                this._frequencyTimer += a;
                var b = this.container.children.length;
                b < this.totalParticles && this._frequencyTimer >= this.frequency && (this.addParticles(b + this.maxParticles <= this.totalParticles ? this.maxParticles : this.totalParticles - b), this._frequencyTimer = 0)
            }
            return !0
        }
    })
}(), function () {
    me.ParticleContainer = me.Container.extend({
        init: function (a) {
            me.Container.prototype.init.apply(this), this.autoSort = !1, this._updateCount = 0, this._dt = 0, this._emitter = a, this.bounds = me.game.viewport
        }, getBounds: function () {
            return this.bounds
        }, update: function (a) {
            if (++this._updateCount > this._emitter.framesToSkip && (this._updateCount = 0), this._updateCount > 0)return this._dt += a, !1;
            a += this._dt, this._dt = 0;
            for (var b = me.game.viewport, c = this.children.length - 1; c >= 0; --c) {
                var d = this.children[c];
                d.isRenderable = !0, d.inViewport = this.floating || d.pos.x < b.pos.x + b.width && b.pos.x < d.pos.x + d.width && d.pos.y < b.pos.y + b.height && b.pos.y < d.pos.y + d.height, d.update(a) || this.removeChildNow(d)
            }
            return !0
        }, draw: function (a, b) {
            if (this.children.length > 0) {
                var c;
                this._emitter.textureAdditive && (c = a.globalCompositeOperation, a.globalCompositeOperation = "lighter"), me.Container.prototype.draw.apply(this, [a, b]), this._emitter.textureAdditive && (a.globalCompositeOperation = c)
            }
        }
    })
}(), function () {
    me.Particle = me.Renderable.extend({
        init: function (a) {
            var b = a.getRandomPoint();
            me.Renderable.prototype.init.apply(this, [b.x, b.y, a.image.width, a.image.height]), this.alwaysUpdate = !0, this.isRenderable = !1, this.image = a.image;
            var c = a.angle + (a.angleVariation > 0 ? (-1).random(2) * a.angleVariation : 0), d = a.speed + (a.speedVariation > 0 ? (-1).random(2) * a.speedVariation : 0);
            this.vel = new me.Vector2d(d * Math.cos(c), -d * Math.sin(c)), this.life = a.minLife.random(a.maxLife), this.startLife = this.life, this.startScale = a.minStartScale.randomFloat(a.maxStartScale).clamp(a.minStartScale, a.maxStartScale), this.endScale = a.minEndScale.randomFloat(a.maxEndScale).clamp(a.minEndScale, a.maxEndScale), this.gravity = a.gravity, this.wind = a.wind, this.followTrajectory = a.followTrajectory, this.onlyInViewport = a.onlyInViewport, this.z = a.z, this._deltaInv = me.sys.fps / 1e3, this.transform = new me.Matrix2d, a.followTrajectory || (this.angle = a.minRotation.randomFloat(a.maxRotation))
        }, update: function (a) {
            var b = a * this._deltaInv;
            this.life = this.life > a ? this.life - a : 0;
            var c = this.life / this.startLife, d = this.startScale;
            this.startScale > this.endScale ? (d *= c, d = d < this.endScale ? this.endScale : d) : this.startScale < this.endScale && (d /= c, d = d > this.endScale ? this.endScale : d), this.alpha = c, this.vel.x += this.wind * b, this.vel.y += this.gravity * b;
            var e = this.followTrajectory ? Math.atan2(this.vel.y, this.vel.x) : this.angle;
            return this.transform.set(d, 0, 0, d, 0, 0).rotate(e), this.pos.x += this.vel.x * b, this.pos.y += this.vel.y * b, (this.inViewport || !this.onlyInViewport) && this.life > 0
        }, draw: function (a) {
            a.save(), a.setGlobalAlpha(a.globalAlpha() * this.alpha);
            var b = this.transform.val;
            a.transform(b[0], b[1], b[2], b[3], ~~this.pos.x, ~~this.pos.y);
            var c = this.width, d = this.height;
            a.drawImage(this.image, 0, 0, c, d, -c / 2, -d / 2, c, d), a.restore()
        }
    })
}(window);