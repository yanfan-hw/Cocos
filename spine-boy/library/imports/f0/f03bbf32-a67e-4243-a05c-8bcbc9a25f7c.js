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
        this.velocityMax = 250;
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.walkForce = 3000;
        this.jumpForce = 140000;
        this.onTheGround = false;
        this.actionSpeed = cc.callFunc(function () {
            _this.walkForce = 15000;
        });
        this.isStanding = true;
    },
    start: function start() {},
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (selfCollider.tag === 1) {
            this.onTheGround = true;
        }
        if (otherCollider.tag == 1) {
            cc.log(100);
        }
    },
    _initCharacter: function _initCharacter() {
        var _this2 = this;

        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(function () {
            // this.spineBoy.addAnimation(0, 'idle', true);
            _this2._eventHandler();
        });
        this.score = 0;
    },
    _eventHandler: function _eventHandler() {
        // Emitter.instance = new Emitter();
        _mEmitter2.default.instance.registerEvent('leftDown', this.moveLeft.bind(this));
        _mEmitter2.default.instance.registerEvent('rightDown', this.moveRight.bind(this));
        _mEmitter2.default.instance.registerEvent('upKeyDown', this.moveJump.bind(this));
        _mEmitter2.default.instance.registerEvent('sKeyDown', this.sKeyDown.bind(this));

        _mEmitter2.default.instance.registerEvent('leftUp', this.leftUp.bind(this));
        _mEmitter2.default.instance.registerEvent('rightUp', this.rightUp.bind(this));
        _mEmitter2.default.instance.registerEvent('upKeyUp', this.upKeyUp.bind(this));
        _mEmitter2.default.instance.registerEvent('sKeyUp', this.sKeyUp.bind(this));
    },
    _setAnimationRun: function _setAnimationRun() {
        // this.spineBoy.setMix('walk', 'run', 0.8);
        // this.spineBoy.setAnimation(0, 'walk', false);
        this.spineBoy.setAnimation(0, 'run', true);
    },
    moveLeft: function moveLeft() {
        if (this.isStanding) {
            this.direction = -1;
            this.node.scaleX = -0.1;
            // this.node.runAction(cc.sequence(cc.delayTime(1), this.actionSpeed));
            this._setAnimationRun();
            this.isStanding = false;
        }
    },
    moveRight: function moveRight() {
        if (this.isStanding) {
            this.direction = 1;
            this.node.scaleX = 0.1;
            // this.node.runAction(cc.sequence(cc.delayTime(1), this.actionSpeed));
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
    sKeyDown: function sKeyDown() {
        // console.log('DownKey down');
    },
    _setAnimationIdle: function _setAnimationIdle() {
        this.spineBoy.setAnimation(0, 'idle', true);
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

        if (this.direction > 0 && this.Rigid_Body.linearVelocity.x < this.velocityMax || this.direction < 0 && this.Rigid_Body.linearVelocity.x > -this.velocityMax) {
            this.Rigid_Body.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true);
        }

        if (this.spineBoy.node.y < -180) {
            cc.log("Lose");
            this.spineBoy.node.y = 0;
            this.spineBoy.node.setPosition(cc.v2(-330, 0));
            return;
        }
    }
});

cc._RF.pop();