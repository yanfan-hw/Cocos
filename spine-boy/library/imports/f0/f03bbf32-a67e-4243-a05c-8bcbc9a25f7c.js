"use strict";
cc._RF.push(module, 'f03bb8ypn5CQ6Bci8vJol98', 'Player');
// Script/Player.js

'use strict';

var _mEmitter = require('mEmitter');

var _mEmitter2 = _interopRequireDefault(_mEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        _mEmitter2.default.instance = new _mEmitter2.default();
        _mEmitter2.default.instance.registerEvent('leftDown', this.leftDown.bind(this));
        _mEmitter2.default.instance.registerEvent('rightDown', this.rightDown.bind(this));
        _mEmitter2.default.instance.registerEvent('upKeyDown', this.upKeyDown.bind(this));
        _mEmitter2.default.instance.registerEvent('downKeyDown', this.downKeyDown.bind(this));

        _mEmitter2.default.instance.registerEvent('leftUp', this.leftUp.bind(this));
        _mEmitter2.default.instance.registerEvent('rightUp', this.rightUp.bind(this));
        _mEmitter2.default.instance.registerEvent('upKeyUp', this.upKeyUp.bind(this));
        _mEmitter2.default.instance.registerEvent('downKeyUp', this.downKeyUp.bind(this));
    },
    start: function start() {},
    leftDown: function leftDown() {
        console.log('Left Down');
    },
    rightDown: function rightDown() {
        console.log('Right Down');
    },
    upKeyDown: function upKeyDown() {
        console.log('UpKey Down');
    },
    downKeyDown: function downKeyDown() {
        console.log('DownKey Down');
    },
    leftUp: function leftUp() {
        console.log('Left Up');
    },
    rightUp: function rightUp() {
        console.log('Right Up');
    },
    upKeyUp: function upKeyUp() {
        console.log('UpKey Up');
    },
    downKeyUp: function downKeyUp() {
        console.log('DownKey Up');
    }
    // update (dt) {},

});

cc._RF.pop();