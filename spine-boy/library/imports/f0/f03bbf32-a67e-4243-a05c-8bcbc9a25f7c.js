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

        this.canMove = true;
        this.canJump = true;
        this.actionRight = cc.moveBy(10, cc.v2(3000, 0));
        this.actionLeft = cc.moveBy(10, cc.v2(-3000, 0));
        this.actionJump = cc.jumpBy(1, cc.v2(0, 0), 100, 1);
    },
    start: function start() {},
    initCharacter: function initCharacter() {
        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        // this.spineBoy.setCompleteListener(() => {
        //     this.spineBoy.addAnimation(0, 'idle', true);
        // })
    },
    eventHandler: function eventHandler() {
        // Emitter.instance = new Emitter();
        _mEmitter2.default.instance.registerEvent('leftDown', this.moveLeft.bind(this));
        _mEmitter2.default.instance.registerEvent('rightDown', this.moveRight.bind(this));
        _mEmitter2.default.instance.registerEvent('upKeyDown', this.moveJump.bind(this));
        _mEmitter2.default.instance.registerEvent('downKeyDown', this.downKeyDown.bind(this));

        _mEmitter2.default.instance.registerEvent('leftUp', this.leftUp.bind(this));
        _mEmitter2.default.instance.registerEvent('rightUp', this.rightUp.bind(this));
        _mEmitter2.default.instance.registerEvent('upKeyUp', this.upKeyUp.bind(this));
        _mEmitter2.default.instance.registerEvent('downKeyUp', this.downKeyUp.bind(this));
    },
    moveLeft: function moveLeft() {
        if (this.canMove) {
            this.canMove = false;
            this.node.scaleX = -0.1;
            this.node.runAction(this.actionLeft);
            this.spineBoy.setAnimation(0, 'run', true);
        }
    },
    moveRight: function moveRight() {
        if (this.canMove) {
            this.canMove = false;
            this.node.scaleX = 0.1;
            this.node.runAction(this.actionRight);
            this.spineBoy.setAnimation(0, 'run', true);
        }
    },
    moveJump: function moveJump() {
        var _this = this;

        if (this.canJump) {
            var resetCanJump = cc.callFunc(function () {
                _this.canJump = true;
            }, this);
            var action = cc.sequence(this.actionJump, resetCanJump);
            this.node.runAction(action);

            this.canJump = false;
        }
    },
    downKeyDown: function downKeyDown() {
        console.log('DownKey down');
    },
    leftUp: function leftUp() {
        this.canMove = true;
        this.node.stopAction(this.actionLeft);
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    rightUp: function rightUp() {
        this.canMove = true;
        this.node.stopAction(this.actionRight);
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    upKeyUp: function upKeyUp() {
        // this.node.stopAction(this.actionJump);
        // this.spineBoy.setAnimation(0, 'idle', true);
    },
    downKeyUp: function downKeyUp() {
        console.log('DownKey up');
    }
}

// update(dt) {},
);

cc._RF.pop();