"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'Controller');
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
            case cc.macro.KEY.up:
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
                _mEmitter2.default.instance.emit('rightDown');
                break;
            case cc.macro.KEY.up:
                _mEmitter2.default.instance.emit('upKeyDown');
                break;
            case cc.macro.KEY.down:
                _mEmitter2.default.instance.emit('downKeyDown');
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