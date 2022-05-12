"use strict";
cc._RF.push(module, 'f03bb8ypn5CQ6Bci8vJol98', 'SpineBoy');
// Script/SpineBoy.js

'use strict';

var _mEmitter = require('mEmitter');

var _mEmitter2 = _interopRequireDefault(_mEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        this.node.active = false;
        this.initCharacter();
        this.eventHandler();

        this.check = true;
        this.checkJump = true;
        this.actionRight = cc.moveBy(10, 3000, 0);
        this.actionLeft = cc.moveBy(10, -3000, 0);
        this.actionUp = cc.sequence(cc.moveBy(0.5, 0, 100), cc.moveBy(0.5, 0, -100));
    },
    start: function start() {},
    initCharacter: function initCharacter() {
        var _this = this;

        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(function () {
            _this.spineBoy.addAnimation(1, 'idle', true);
        });
    },
    eventHandler: function eventHandler() {
        // Emitter.instance = new Emitter();
        _mEmitter2.default.instance.registerEvent('leftDown', this.leftDown.bind(this));
        _mEmitter2.default.instance.registerEvent('rightDown', this.rightDown.bind(this));
        _mEmitter2.default.instance.registerEvent('upKeyDown', this.upKeyDown.bind(this));
        _mEmitter2.default.instance.registerEvent('downKeyDown', this.downKeyDown.bind(this));

        _mEmitter2.default.instance.registerEvent('leftUp', this.leftUp.bind(this));
        _mEmitter2.default.instance.registerEvent('rightUp', this.rightUp.bind(this));
        _mEmitter2.default.instance.registerEvent('upKeyUp', this.upKeyUp.bind(this));
        _mEmitter2.default.instance.registerEvent('downKeyUp', this.downKeyUp.bind(this));
    },
    leftDown: function leftDown() {
        if (this.check) {
            this.check = false;
            this.node.scaleX = -0.1;
            this.spineBoy.setAnimation(0, 'run', true);
            this.node.runAction(this.actionLeft);
        }
    },
    rightDown: function rightDown() {
        if (this.check) {
            this.check = false;
            this.node.scaleX = 0.1;
            // this.spineBoy.clearTracks();
            this.spineBoy.setAnimation(0, 'run', true);
            this.node.runAction(this.actionRight);
        }
    },
    upKeyDown: function upKeyDown() {
        this.spineBoy.setAnimation(1, 'jump', false);
    },
    downKeyDown: function downKeyDown() {
        console.log('DownKey down');
    },
    leftUp: function leftUp() {
        var _this2 = this;

        this.check = true;
        this.node.stopAction(this.actionLeft);
        this.spineBoy.setToSetupPose(function () {
            _this2.spineBoy.setAnimation(0, 'idle', true);
        });
    },
    rightUp: function rightUp() {
        var _this3 = this;

        this.check = true;
        this.node.stopAction(this.actionRight);
        this.spineBoy.setToSetupPose(function () {
            _this3.spineBoy.setAnimation(0, 'idle', true);
        });
    },
    upKeyUp: function upKeyUp() {
        var _this4 = this;

        this.spineBoy.setToSetupPose(function () {
            _this4.spineBoy.clearTracks();
            _this4.spineBoy.setAnimation(0, 'idle', true);
        });
    },
    downKeyUp: function downKeyUp() {
        console.log('DownKey up');
    }
}

// update(dt) {},
);

cc._RF.pop();