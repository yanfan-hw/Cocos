(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fcb90C4F7dAbYndVW2hAyMK', 'Main', __filename);
// Script/Main.js

'use strict';

var _mEmitter = require('mEmitter');

var _mEmitter2 = _interopRequireDefault(_mEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        physicsManager.gravity = cc.v2(0, -3000);

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
            case cc.macro.KEY.down:
                _mEmitter2.default.instance.emit('downKeyDown');
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
            case cc.macro.KEY.down:
                _mEmitter2.default.instance.emit('downKeyUp');
                break;
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
    // start () {
    // },
    // update (dt) {},

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
        //# sourceMappingURL=Main.js.map
        