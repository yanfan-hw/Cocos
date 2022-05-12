window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  1: [ function(require, module, exports) {
    function EventEmitter() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || void 0;
    }
    module.exports = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
      this._maxListeners = n;
      return this;
    };
    EventEmitter.prototype.emit = function(type) {
      var er, handler, len, args, i, listeners;
      this._events || (this._events = {});
      if ("error" === type && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) throw er;
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
        err.context = er;
        throw err;
      }
      handler = this._events[type];
      if (isUndefined(handler)) return false;
      if (isFunction(handler)) switch (arguments.length) {
       case 1:
        handler.call(this);
        break;

       case 2:
        handler.call(this, arguments[1]);
        break;

       case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;

       default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
      } else if (isObject(handler)) {
        args = Array.prototype.slice.call(arguments, 1);
        listeners = handler.slice();
        len = listeners.length;
        for (i = 0; i < len; i++) listeners[i].apply(this, args);
      }
      return true;
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      var m;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      this._events || (this._events = {});
      this._events.newListener && this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
      this._events[type] ? isObject(this._events[type]) ? this._events[type].push(listener) : this._events[type] = [ this._events[type], listener ] : this._events[type] = listener;
      if (isObject(this._events[type]) && !this._events[type].warned) {
        m = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners;
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
          "function" === typeof console.trace && console.trace();
        }
      }
      return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(type, listener) {
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      var fired = false;
      function g() {
        this.removeListener(type, g);
        if (!fired) {
          fired = true;
          listener.apply(this, arguments);
        }
      }
      g.listener = listener;
      this.on(type, g);
      return this;
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
      var list, position, length, i;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      if (!this._events || !this._events[type]) return this;
      list = this._events[type];
      length = list.length;
      position = -1;
      if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        this._events.removeListener && this.emit("removeListener", type, listener);
      } else if (isObject(list)) {
        for (i = length; i-- > 0; ) if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          position = i;
          break;
        }
        if (position < 0) return this;
        if (1 === list.length) {
          list.length = 0;
          delete this._events[type];
        } else list.splice(position, 1);
        this._events.removeListener && this.emit("removeListener", type, listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      var key, listeners;
      if (!this._events) return this;
      if (!this._events.removeListener) {
        0 === arguments.length ? this._events = {} : this._events[type] && delete this._events[type];
        return this;
      }
      if (0 === arguments.length) {
        for (key in this._events) {
          if ("removeListener" === key) continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = {};
        return this;
      }
      listeners = this._events[type];
      if (isFunction(listeners)) this.removeListener(type, listeners); else if (listeners) while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
      delete this._events[type];
      return this;
    };
    EventEmitter.prototype.listeners = function(type) {
      var ret;
      ret = this._events && this._events[type] ? isFunction(this._events[type]) ? [ this._events[type] ] : this._events[type].slice() : [];
      return ret;
    };
    EventEmitter.prototype.listenerCount = function(type) {
      if (this._events) {
        var evlistener = this._events[type];
        if (isFunction(evlistener)) return 1;
        if (evlistener) return evlistener.length;
      }
      return 0;
    };
    EventEmitter.listenerCount = function(emitter, type) {
      return emitter.listenerCount(type);
    };
    function isFunction(arg) {
      return "function" === typeof arg;
    }
    function isNumber(arg) {
      return "number" === typeof arg;
    }
    function isObject(arg) {
      return "object" === typeof arg && null !== arg;
    }
    function isUndefined(arg) {
      return void 0 === arg;
    }
  }, {} ],
  Controller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "Controller");
    "use strict";
    var _mEmitter = require("mEmitter");
    var _mEmitter2 = _interopRequireDefault(_mEmitter);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;
        physics_manager.gravity = cc.v2(0, -2e3);
        _mEmitter2.default.instance = new _mEmitter2.default();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.left:
          _mEmitter2.default.instance.emit("leftDown");
          break;

         case cc.macro.KEY.right:
          _mEmitter2.default.instance.emit("rightDown");
          break;

         case cc.macro.KEY.a:
          _mEmitter2.default.instance.emit("leftDown");
          break;

         case cc.macro.KEY.d:
          _mEmitter2.default.instance.emit("rightDown");
          break;

         case cc.macro.KEY.up:
         case cc.macro.KEY.w:
          _mEmitter2.default.instance.emit("upKeyDown");
          break;

         case cc.macro.KEY.down:
          _mEmitter2.default.instance.emit("downKeyDown");
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.left:
          _mEmitter2.default.instance.emit("leftUp");
          break;

         case cc.macro.KEY.right:
          _mEmitter2.default.instance.emit("rightUp");
          break;

         case cc.macro.KEY.a:
          _mEmitter2.default.instance.emit("leftUp");
          break;

         case cc.macro.KEY.d:
          _mEmitter2.default.instance.emit("rightUp");
          break;

         case cc.macro.KEY.up:
         case cc.macro.KEY.w:
          _mEmitter2.default.instance.emit("upKeyUp");
          break;

         case cc.macro.KEY.down:
          _mEmitter2.default.instance.emit("downKeyUp");
        }
      },
      update: function update(dt) {},
      onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      }
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  SpineBoy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f03bb8ypn5CQ6Bci8vJol98", "SpineBoy");
    "use strict";
    var _mEmitter = require("mEmitter");
    var _mEmitter2 = _interopRequireDefault(_mEmitter);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        spineBoy: sp.Skeleton
      },
      onLoad: function onLoad() {
        this.node.active = false;
        this.initCharacter();
        this.eventHandler();
        this.canMove = true;
        this.canJump = true;
        this.actionRight = cc.moveBy(10, cc.v2(3e3, 0));
        this.actionLeft = cc.moveBy(10, cc.v2(-3e3, 0));
        this.actionJump = cc.jumpBy(1, cc.v2(0, 0), 100, 1);
      },
      start: function start() {},
      initCharacter: function initCharacter() {
        this.node.active = true;
        this.spineBoy.addAnimation(0, "portal", false);
      },
      eventHandler: function eventHandler() {
        _mEmitter2.default.instance.registerEvent("leftDown", this.moveLeft.bind(this));
        _mEmitter2.default.instance.registerEvent("rightDown", this.moveRight.bind(this));
        _mEmitter2.default.instance.registerEvent("upKeyDown", this.moveJump.bind(this));
        _mEmitter2.default.instance.registerEvent("downKeyDown", this.downKeyDown.bind(this));
        _mEmitter2.default.instance.registerEvent("leftUp", this.leftUp.bind(this));
        _mEmitter2.default.instance.registerEvent("rightUp", this.rightUp.bind(this));
        _mEmitter2.default.instance.registerEvent("upKeyUp", this.upKeyUp.bind(this));
        _mEmitter2.default.instance.registerEvent("downKeyUp", this.downKeyUp.bind(this));
      },
      moveLeft: function moveLeft() {
        if (this.canMove) {
          this.canMove = false;
          this.node.scaleX = -.1;
          this.node.runAction(this.actionLeft);
          this.spineBoy.setAnimation(0, "run", true);
        }
      },
      moveRight: function moveRight() {
        if (this.canMove) {
          this.canMove = false;
          this.node.scaleX = .1;
          this.node.runAction(this.actionRight);
          this.spineBoy.setAnimation(0, "run", true);
        }
      },
      moveJump: function moveJump() {
        var _this = this;
        if (this.canJump) {
          var resetCanJump = cc.callFunc(function() {
            _this.canJump = true;
          }, this);
          var action = cc.sequence(this.actionJump, resetCanJump);
          this.node.runAction(action);
          this.canJump = false;
        }
      },
      downKeyDown: function downKeyDown() {
        console.log("DownKey down");
      },
      leftUp: function leftUp() {
        this.canMove = true;
        this.node.stopAction(this.actionLeft);
        this.spineBoy.setAnimation(0, "idle", true);
      },
      rightUp: function rightUp() {
        this.canMove = true;
        this.node.stopAction(this.actionRight);
        this.spineBoy.setAnimation(0, "idle", true);
      },
      upKeyUp: function upKeyUp() {},
      downKeyUp: function downKeyUp() {
        console.log("DownKey up");
      }
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  mEmitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bbb00tC2mVLYbZhdqEaGpWT", "mEmitter");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _events = require("events");
    var _events2 = _interopRequireDefault(_events);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var mEmitter = function() {
      function mEmitter() {
        _classCallCheck(this, mEmitter);
        this._emiter = new _events2.default();
        this._emiter.setMaxListeners(100);
      }
      _createClass(mEmitter, [ {
        key: "emit",
        value: function emit() {
          var _emiter;
          (_emiter = this._emiter).emit.apply(_emiter, arguments);
        }
      }, {
        key: "registerEvent",
        value: function registerEvent(event, listener) {
          this._emiter.on(event, listener);
        }
      }, {
        key: "registerOnce",
        value: function registerOnce(event, listener) {
          this._emiter.once(event, listener);
        }
      }, {
        key: "removeEvent",
        value: function removeEvent(event, listener) {
          this._emiter.removeListener(event, listener);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._emiter.removeAllListeners();
          this._emiter = null;
          mEmitter.instance = null;
        }
      } ]);
      return mEmitter;
    }();
    mEmitter.instance = null;
    exports.default = mEmitter;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    events: 1
  } ]
}, {}, [ "Controller", "SpineBoy", "mEmitter" ]);