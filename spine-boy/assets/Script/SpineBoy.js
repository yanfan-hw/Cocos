import Emitter from 'mEmitter';

cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.node.active = false;
        this.initCharacter();
        this.eventHandler();

        this.check = true;
        this.checkJump = true;
        this.actionRight = cc.moveBy(10, 3000, 0);
        this.actionLeft = cc.moveBy(10, -3000, 0);
        this.actionUp = cc.sequence(cc.moveBy(0.5, 0, 100), cc.moveBy(0.5, 0, -100));
    },

    start() {

    },
    initCharacter() {
        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(() => {
            this.spineBoy.addAnimation(1, 'idle', true);
        })
    },
    eventHandler() {
        // Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('leftDown', this.leftDown.bind(this));
        Emitter.instance.registerEvent('rightDown', this.rightDown.bind(this));
        Emitter.instance.registerEvent('upKeyDown', this.upKeyDown.bind(this));
        Emitter.instance.registerEvent('downKeyDown', this.downKeyDown.bind(this));

        Emitter.instance.registerEvent('leftUp', this.leftUp.bind(this));
        Emitter.instance.registerEvent('rightUp', this.rightUp.bind(this));
        Emitter.instance.registerEvent('upKeyUp', this.upKeyUp.bind(this));
        Emitter.instance.registerEvent('downKeyUp', this.downKeyUp.bind(this));
    },

    leftDown() {
        if (this.check) {
            this.check = false;
            this.node.scaleX = -0.1;
            this.spineBoy.setAnimation(0, 'run', true);
            this.node.runAction(this.actionLeft);
        }
    },
    rightDown() {
        if (this.check) {
            this.check = false;
            this.node.scaleX = 0.1;
            // this.spineBoy.clearTracks();
            this.spineBoy.setAnimation(0, 'run', true);
            this.node.runAction(this.actionRight);
        }
    },
    upKeyDown() {
        this.spineBoy.setAnimation(1, 'jump', false);
    },
    downKeyDown() {
        console.log('DownKey down');
    },

    leftUp() {
        this.check = true;
        this.node.stopAction(this.actionLeft);
        this.spineBoy.setToSetupPose(() => {
            this.spineBoy.setAnimation(0, 'idle', true);
        });
    },
    rightUp() {
        this.check = true;
        this.node.stopAction(this.actionRight);
        this.spineBoy.setToSetupPose(() => {
            this.spineBoy.setAnimation(0, 'idle', true);
        });
    },
    upKeyUp() {
        this.spineBoy.setToSetupPose(() => {
            this.spineBoy.clearTracks();
            this.spineBoy.setAnimation(0, 'idle', true);
        });
    },
    downKeyUp() {
        console.log('DownKey up');
    },

    // update(dt) {},
});
