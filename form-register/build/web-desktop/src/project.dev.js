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
  loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d9ddf5NULJBa4AU5tgPrgZ7", "loading");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        progressBar: cc.ProgressBar
      },
      onLoad: function onLoad() {
        this.progressBar.progress = 0;
        Emitter.instance.registerEvent("showLoadingBar", this.onShowLoadingBar.bind(this));
      },
      onShowLoadingBar: function onShowLoadingBar() {
        var _this = this;
        cc.tween(this.progressBar).to(1.5, {
          progress: 1
        }).call(function() {
          _this.onHideLoadingBar();
          Emitter.instance.emit("showListViewUser");
        }).start();
      },
      onDisable: function onDisable() {
        this.progressBar.progress = 0;
      },
      onHideLoadingBar: function onHideLoadingBar() {
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  mEmitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "22e9fjSFuxGKropjoqOz1/7", "mEmitter");
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
  } ],
  register: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "register");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        userName: cc.EditBox,
        userEmail: cc.EditBox,
        userPassword: cc.EditBox,
        registerButton: cc.Button,
        userList: require("userList")
      },
      onLoad: function onLoad() {
        !this.userName.string && !this.userEmail.string && !this.userPassword.string;
      },
      onClickRegister: function onClickRegister() {
        var user = {
          id: this.userList.users.length,
          userName: this.userName.string,
          userEmail: this.userEmail.string,
          userPassword: this.userPassword.string
        };
        if (!user.userName || !user.userName || !user.userPassword) return;
        this.onHideRegisterForm();
        Emitter.instance.emit("showLoadingBar");
        Emitter.instance.emit("addUser", user);
        this.resetInput();
      },
      resetInput: function resetInput() {
        this.userName.string = "";
        this.userEmail.string = "";
        this.userPassword.string = "";
      },
      onShowRegisterForm: function onShowRegisterForm() {
        this.node.active = true;
      },
      onHideRegisterForm: function onHideRegisterForm() {
        this.node.active = false;
      }
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter",
    userList: "userList"
  } ],
  userList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b60e6KPo5JOgKX+utrBvYsh", "userList");
    "use strict";
    var Emitter = require("mEmitter");
    var idUserSelect = [];
    var User = cc.Class({
      name: "User",
      properties: {
        id: 0,
        userName: "",
        userEmail: "",
        userPassword: ""
      }
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        users: {
          default: [],
          type: User
        },
        userPrefab: cc.Prefab
      },
      onLoad: function onLoad() {
        Emitter.instance.registerEvent("addUser", this.addChildUser.bind(this));
        Emitter.instance.registerEvent("onSelectUser", this.onSelectUser.bind(this));
      },
      addChildUser: function addChildUser(data) {
        var user = cc.instantiate(this.userPrefab);
        this.node.addChild(user);
        this.users.push(data);
        user.getComponent("userTemplate").init({
          id: data.id,
          userName: data.userName
        });
      },
      onSelectUser: function onSelectUser(data) {
        if (data.isChecked) idUserSelect.push(data.id); else {
          var index = idUserSelect.indexOf(data.id);
          idUserSelect.splice(index, 1);
        }
      },
      handleSlider: function handleSlider(Slider) {
        if (0 == Slider.progress) return;
        fontSize = 8 * Slider.progress + 10;
        for (var i = 0; i < this.users.length; i++) Emitter.instance.emit("resizeFontSizeLabel", value);
      },
      onClickBackBtn: function onClickBackBtn() {
        Emitter.instance.emit("hideListViewUser");
        Emitter.instance.emit("showRegisterForm");
      },
      onClickDeleteBtn: function onClickDeleteBtn() {
        var _this = this;
        if (0 == idUserSelect.length) return;
        var _loop = function _loop(i) {
          var index = _this.users.findIndex(function(user) {
            return user.id == idUserSelect[i];
          });
          _this.node.removeChild(_this.node.children[index]);
          _this.users.splice(index, 1);
        };
        for (var i = 0; i < idUserSelect.length; i++) _loop(i);
        idUserSelect.splice(0, idUserSelect.length);
        cc.log(idUserSelect);
      }
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  userTemplate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dcd73uu9oNKtI2/c3jiRwEK", "userTemplate");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        id: 0,
        userName: cc.Label
      },
      onLoad: function onLoad() {
        Emitter.instance.registerEvent("resizeFontSizeLabel", this.resizeFontSizeLabel.bind(this));
      },
      init: function init(data) {
        this.id = data.id;
        this.userName.string = data.userName;
      },
      resizeFontSizeLabel: function resizeFontSizeLabel(size) {
        this.userName.fontSize = size;
      },
      onSelectUser: function onSelectUser(toggle) {
        var data = {
          isChecked: toggle.isChecked,
          id: this.id
        };
        Emitter.instance.emit("onSelectUser", data);
        console.log(data);
      }
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  welcome: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "269e8WHut9KpJhIL3EcZm7S", "welcome");
    "use strict";
    var Emitter = require("mEmitter");
    cc.Class({
      extends: cc.Component,
      properties: {
        registerForm: cc.Node,
        loadingBar: cc.Node,
        listViewUser: cc.Node
      },
      onLoad: function onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("showRegisterForm", this.showRegisterForm.bind(this));
        Emitter.instance.registerEvent("hideRegisterForm", this.hideRegisterForm.bind(this));
        Emitter.instance.registerEvent("showLoadingBar", this.showLoadingBar.bind(this));
        Emitter.instance.registerEvent("hideLoadingBar", this.hideLoadingBar.bind(this));
        Emitter.instance.registerEvent("showListViewUser", this.showListViewUser.bind(this));
        Emitter.instance.registerEvent("hideListViewUser", this.hideListViewUser.bind(this));
      },
      showRegisterForm: function showRegisterForm() {
        this.registerForm.active = true;
      },
      hideRegisterForm: function hideRegisterForm() {
        this.registerForm.active = false;
      },
      showLoadingBar: function showLoadingBar() {
        this.loadingBar.active = true;
      },
      hideLoadingBar: function hideLoadingBar() {
        this.loadingBar.active = false;
      },
      showListViewUser: function showListViewUser() {
        this.listViewUser.active = true;
      },
      hideListViewUser: function hideListViewUser() {
        this.listViewUser.active = false;
      },
      start: function start() {
        this.showRegisterForm();
        this.hideLoadingBar();
        this.hideListViewUser();
      }
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ]
}, {}, [ "loading", "mEmitter", "register", "userList", "userTemplate", "welcome" ]);