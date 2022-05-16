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
  "Bg Control": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17d91eFbHtFN5dLg4laeQXx", "Bg Control");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        spineBoy: cc.Node
      },
      start: function start() {},
      update: function update(dt) {
        var currentSpineBoyPosition = this.spineBoy.getPosition();
        var currentBgPosition = this.node.getPosition();
        if (currentSpineBoyPosition.x > 0 && currentSpineBoyPosition.x < 5904) {
          currentBgPosition.x = cc.misc.clampf(currentSpineBoyPosition.x, 6784, 0);
          this.node.setPosition(currentBgPosition);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
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

         case cc.macro.KEY.s:
          _mEmitter2.default.instance.emit("sKeyDown");
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

         case cc.macro.KEY.s:
          _mEmitter2.default.instance.emit("sKeyUp");
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
  Main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fcb90C4F7dAbYndVW2hAyMK", "Main");
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
        background: cc.Node,
        spineBoy: cc.Node,
        score: cc.Node,
        playBtn: cc.Node
      },
      onLoad: function onLoad() {
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, -3e3);
        _mEmitter2.default.instance = new _mEmitter2.default();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.background.opacity = 50;
        this.spineBoy.active = false;
        this.score.active = false;
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
      onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      },
      onClickPlayBtn: function onClickPlayBtn() {
        this.playBtn.active = false;
        this.background.opacity = 255;
        this.spineBoy.active = true;
        this.score.active = true;
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
        var _this = this;
        this.node.active = false;
        this._initCharacter();
        this.direction = 0;
        this.velocityMax = 250;
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.walkForce = 3e3;
        this.jumpForce = 14e4;
        this.onTheGround = false;
        this.actionSpeed = cc.callFunc(function() {
          _this.walkForce = 15e3;
        });
        this.isStanding = true;
      },
      start: function start() {},
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        1 === selfCollider.tag && (this.onTheGround = true);
        2 == otherCollider.tag && this.updateScore();
      },
      _initCharacter: function _initCharacter() {
        var _this2 = this;
        this.node.active = true;
        this.spineBoy.addAnimation(0, "portal", false);
        this.spineBoy.setCompleteListener(function() {
          _this2._eventHandler();
        });
        this.score = 0;
      },
      _eventHandler: function _eventHandler() {
        _mEmitter2.default.instance.registerEvent("leftDown", this.moveLeft.bind(this));
        _mEmitter2.default.instance.registerEvent("rightDown", this.moveRight.bind(this));
        _mEmitter2.default.instance.registerEvent("upKeyDown", this.moveJump.bind(this));
        _mEmitter2.default.instance.registerEvent("sKeyDown", this.sKeyDown.bind(this));
        _mEmitter2.default.instance.registerEvent("leftUp", this.leftUp.bind(this));
        _mEmitter2.default.instance.registerEvent("rightUp", this.rightUp.bind(this));
        _mEmitter2.default.instance.registerEvent("upKeyUp", this.upKeyUp.bind(this));
        _mEmitter2.default.instance.registerEvent("sKeyUp", this.sKeyUp.bind(this));
      },
      _setAnimationRun: function _setAnimationRun() {
        this.spineBoy.setAnimation(0, "run", true);
      },
      moveLeft: function moveLeft() {
        if (this.isStanding) {
          this.direction = -1;
          this.node.scaleX = -.1;
          this._setAnimationRun();
          this.isStanding = false;
        }
      },
      moveRight: function moveRight() {
        if (this.isStanding) {
          this.direction = 1;
          this.node.scaleX = .1;
          this._setAnimationRun();
          this.isStanding = false;
        }
      },
      moveJump: function moveJump() {
        if (this.onTheGround) {
          this.Rigid_Body.applyForceToCenter(cc.v2(0, this.jumpForce), true);
          this.onTheGround = false;
        }
      },
      sKeyDown: function sKeyDown() {},
      _setAnimationIdle: function _setAnimationIdle() {
        this.spineBoy.setAnimation(0, "idle", true);
      },
      leftUp: function leftUp() {
        this.direction = 0;
        this.velocityMax = 150;
        this.isStanding = true;
        this._setAnimationIdle();
      },
      rightUp: function rightUp() {
        this.direction = 0;
        this.velocityMax = 150;
        this.isStanding = true;
        this._setAnimationIdle();
      },
      upKeyUp: function upKeyUp() {},
      sKeyUp: function sKeyUp() {},
      update: function update(dt) {
        (this.direction > 0 && this.Rigid_Body.linearVelocity.x < this.velocityMax || this.direction < 0 && this.Rigid_Body.linearVelocity.x > -this.velocityMax) && this.Rigid_Body.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true);
        if (this.spineBoy.node.y < -180) {
          cc.log("Lose");
          this.spineBoy.node.y = 0;
          this.spineBoy.node.setPosition(cc.v2(-330, 0));
          return;
        }
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
}, {}, [ "Bg Control", "Controller", "Main", "SpineBoy", "mEmitter" ]);