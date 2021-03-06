(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Controller.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'Controller', __filename);
// Script/Controller.js

'use strict';

var _mEmitter = require('mEmitter');

var _mEmitter2 = _interopRequireDefault(_mEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        var physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;
        physics_manager.gravity = cc.v2(0, -2000);

        _mEmitter2.default.instance = new _mEmitter2.default();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                _mEmitter2.default.instance.emit('leftDown');
                break;
            case cc.macro.KEY.right:
                _mEmitter2.default.instance.emit('rightDown');
                break;
            case cc.macro.KEY.a:
                _mEmitter2.default.instance.emit('leftDown');
                break;
            case cc.macro.KEY.d:
                _mEmitter2.default.instance.emit('rightDown');
                break;
            case cc.macro.KEY.up:
                _mEmitter2.default.instance.emit('upKeyDown');
                break;
            case cc.macro.KEY.w:
                _mEmitter2.default.instance.emit('upKeyDown');
                break;
            case cc.macro.KEY.s:
                _mEmitter2.default.instance.emit('sKeyDown');
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                _mEmitter2.default.instance.emit('leftUp');
                break;
            case cc.macro.KEY.right:
                _mEmitter2.default.instance.emit('rightUp');
                break;
            case cc.macro.KEY.a:
                _mEmitter2.default.instance.emit('leftUp');
                break;
            case cc.macro.KEY.d:
                _mEmitter2.default.instance.emit('rightUp');
                break;
            case cc.macro.KEY.up:
                _mEmitter2.default.instance.emit('upKeyUp');
                break;
            case cc.macro.KEY.w:
                _mEmitter2.default.instance.emit('upKeyUp');
                break;
            case cc.macro.KEY.s:
                _mEmitter2.default.instance.emit('sKeyUp');
                break;
        }
    },

    // called every frame
    update: function update(dt) {},
    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Controller.js.map
        