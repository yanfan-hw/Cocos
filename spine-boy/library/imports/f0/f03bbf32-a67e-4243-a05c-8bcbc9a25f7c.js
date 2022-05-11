"use strict";
cc._RF.push(module, 'f03bb8ypn5CQ6Bci8vJol98', 'Player');
// Script/Player.js

'use strict';

var _mEmitter = require('mEmitter');

var _mEmitter2 = _interopRequireDefault(_mEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var direction = 0,
    isPressKey = true;

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

        this.actionRight = cc.moveBy(20, 480, 0);
        this.actionLeft = cc.moveBy(20, -480, 0);
    },
    start: function start() {},
    initCharacter: function initCharacter() {
        var _this = this;

        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(function () {
            _this.spineBoy.setAnimation(0, 'idle', true);
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
        direction = -1;
        this.node.scaleX = this.node.scaleX * direction;
        if (isPressKey) {
            isPressKey = false;
            this.spineBoy.setAnimation(0, 'run', true);
            this.node.runAction(this.actionLeft);
        }
        // cc.log(this.node.x);
    },
    rightDown: function rightDown() {
        direction = 1;
        this.node.scaleX = this.node.scaleX * direction;
        if (isPressKey) {
            isPressKey = false;
            this.spineBoy.setAnimation(0, 'run', true);
            this.node.runAction(this.actionLeft);
        }
        // cc.log(this.node.x);
    },
    upKeyDown: function upKeyDown() {
        console.log('UpKey down');
    },
    downKeyDown: function downKeyDown() {
        console.log('DownKey down');
    },
    leftUp: function leftUp() {
        if (this.node.x == -480) return;
        isPressKey = true;
        this.node.stopAction(this.actionLeft);
        // this.node.x -= 0.5;
        // console.log('Left Up');
    },
    rightUp: function rightUp() {
        if (this.node.x == 480) return;
        isPressKey = true;
        this.node.stopAction(this.actionRight);
        // this.node.stopAction(this.moveSpineBoy());
        // this.node.x += 0.5;
        // console.log('Right Up');
    },
    upKeyUp: function upKeyUp() {
        console.log('UpKey up');
    },
    downKeyUp: function downKeyUp() {
        console.log('DownKey up');
    }
    // update (dt) {},

});

cc._RF.pop();