(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SpineBoy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f03bb8ypn5CQ6Bci8vJol98', 'SpineBoy', __filename);
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
        this.actionRight = cc.moveBy(10, cc.v2(3000, 0));
        this.actionLeft = cc.moveBy(10, cc.v2(-3000, 0));
        this.actionUp = cc.sequence(cc.moveBy(0.5, 0, 100), cc.moveBy(0.5, 0, -100));
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
            this.node.runAction(this.actionLeft);
            this.spineBoy.setAnimation(0, 'run', true);
        }
    },
    rightDown: function rightDown() {
        if (this.check) {
            this.check = false;
            this.node.scaleX = 0.1;
            this.node.runAction(this.actionRight);
            this.spineBoy.setAnimation(0, 'run', true);
        }
    },
    upKeyDown: function upKeyDown() {
        this.spineBoy.setAnimation(0, 'jump', false);
    },
    downKeyDown: function downKeyDown() {
        console.log('DownKey down');
    },
    leftUp: function leftUp() {
        this.check = true;
        this.node.stopAction(this.actionLeft);
        // this.spineBoy.clearTrack();
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    rightUp: function rightUp() {
        this.check = true;
        this.node.stopAction(this.actionRight);
        // this.spineBoy.clearTrack();
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    upKeyUp: function upKeyUp() {
        // this.spineBoy.clearTrack();
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    downKeyUp: function downKeyUp() {
        console.log('DownKey up');
    }
}

// update(dt) {},
);

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
        //# sourceMappingURL=SpineBoy.js.map
        