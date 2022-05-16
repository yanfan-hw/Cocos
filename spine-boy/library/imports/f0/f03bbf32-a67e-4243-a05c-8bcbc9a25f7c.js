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
        var _this = this;

        this.node.active = false;
        this._initCharacter();
        // this._eventHandler();

        this.direction = 0;
        this.velocityMax = 150;
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.walkForce = 10000;
        this.jumpForce = 110000;
        this.onTheGround = false;
        this.actionSpeed = cc.callFunc(function () {
            _this.walkForce = 15000;
        });
    },
    start: function start() {},
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (selfCollider.tag === 1) {
            this.onTheGround = true;
        }
    },
    _initCharacter: function _initCharacter() {
        var _this2 = this;

        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(function () {
            _this2.spineBoy.addAnimation(0, 'idle', true);
            _this2._eventHandler();
        });
    },
    _eventHandler: function _eventHandler() {
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
    _setAnimationRun: function _setAnimationRun() {
        this.spineBoy.setMix('walk', 'run', 0.8);
        this.spineBoy.setAnimation(0, 'walk', false);
        this.spineBoy.addAnimation(0, 'run', true);
    },
    moveLeft: function moveLeft() {
        this.direction = -1;
        this.node.scaleX = -0.1;
        this.node.runAction(cc.sequence(cc.delayTime(1), this.actionSpeed));
    },
    moveRight: function moveRight() {
        this.direction = 1;
        this.node.scaleX = 0.1;
        this.node.runAction(cc.sequence(cc.delayTime(1), this.actionSpeed));
    },
    moveJump: function moveJump() {
        if (this.onTheGround) {
            this.Rigid_Body.applyForceToCenter(cc.v2(0, this.jumpForce), true);
            this.onTheGround = false;
        }
    },
    downKeyDown: function downKeyDown() {
        // console.log('DownKey down');
    },
    _setAnimationIdle: function _setAnimationIdle() {
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    leftUp: function leftUp() {
        this.direction = 0;
        this.velocityMax = 150;
    },
    rightUp: function rightUp() {
        this.direction = 0;
        this.velocityMax = 150;
    },
    upKeyUp: function upKeyUp() {
        // this.canJump = true;
    },
    downKeyUp: function downKeyUp() {},
    update: function update(dt) {
        if (this.direction > 0 && this.Rigid_Body.linearVelocity.x < this.velocityMax || this.direction < 0 && this.Rigid_Body.linearVelocity.x > -this.velocityMax) {
            this.Rigid_Body.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true);
        }
    }
});

cc._RF.pop();