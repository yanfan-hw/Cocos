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

        this.canMove = true;
        this.canJump = true;
        this.actionRight = cc.moveBy(10, cc.v2(3000, 0));
        this.actionLeft = cc.moveBy(10, cc.v2(-3000, 0));
        this.actionJump = cc.jumpBy(1, cc.v2(0, 0), 100, 1);
    },

    start() {

    },
    initCharacter() {
        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        // this.spineBoy.setCompleteListener(() => {
        //     this.spineBoy.addAnimation(0, 'idle', true);
        // })
    },
    eventHandler() {
        // Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('leftDown', this.moveLeft.bind(this));
        Emitter.instance.registerEvent('rightDown', this.moveRight.bind(this));
        Emitter.instance.registerEvent('upKeyDown', this.moveJump.bind(this));
        Emitter.instance.registerEvent('downKeyDown', this.downKeyDown.bind(this));

        Emitter.instance.registerEvent('leftUp', this.leftUp.bind(this));
        Emitter.instance.registerEvent('rightUp', this.rightUp.bind(this));
        Emitter.instance.registerEvent('upKeyUp', this.upKeyUp.bind(this));
        Emitter.instance.registerEvent('downKeyUp', this.downKeyUp.bind(this));
    },

    moveLeft() {
        if (this.canMove) {
            this.canMove = false;
            this.node.scaleX = -0.1;
            this.node.runAction(this.actionLeft);
            this.spineBoy.setAnimation(0, 'run', true);
        }
    },
    moveRight() {
        if (this.canMove) {
            this.canMove = false;
            this.node.scaleX = 0.1;
            this.node.runAction(this.actionRight);
            this.spineBoy.setAnimation(0, 'run', true);
        }
    },
    moveJump() {
        if (this.canJump) {
            let resetCanJump = cc.callFunc(() => {
                this.canJump = true;
            }, this);
            let action = cc.sequence(this.actionJump, resetCanJump);
            this.node.runAction(action);

            this.canJump = false;
        }
    },
    downKeyDown() {
        console.log('DownKey down');
    },

    leftUp() {
        this.canMove = true;
        this.node.stopAction(this.actionLeft);
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    rightUp() {
        this.canMove = true;
        this.node.stopAction(this.actionRight);
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    upKeyUp() {
        // this.node.stopAction(this.actionJump);
        // this.spineBoy.setAnimation(0, 'idle', true);
    },
    downKeyUp() {
        console.log('DownKey up');
    },

    // update(dt) {},
});
