import Emitter from 'mEmitter';

let direction = 0, isPressKey = true;

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

        this.actionRight = cc.moveBy(20, 480, 0);
        this.actionLeft = cc.moveBy(20, -480, 0);
    },

    start() {

    },
    initCharacter() {
        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(() => {
            this.spineBoy.setAnimation(0, 'idle', true);
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
        direction = -1;
        this.node.scaleX = this.node.scaleX * direction;
        if (isPressKey) {
            isPressKey = false;
            this.spineBoy.setAnimation(0, 'run', true);
            this.node.runAction(this.actionLeft);
        }
        // cc.log(this.node.x);
    },
    rightDown() {
        direction = 1;
        this.node.scaleX = this.node.scaleX * direction;
        if (isPressKey) {
            isPressKey = false;
            this.spineBoy.setAnimation(0, 'run', true);
            this.node.runAction(this.actionLeft);
        }
        // cc.log(this.node.x);
    },
    upKeyDown() {
        console.log('UpKey down');
    },
    downKeyDown() {
        console.log('DownKey down');
    },

    leftUp() {
        if (this.node.x == - 480) return
        isPressKey = true;
        this.node.stopAction(this.actionLeft);
        // this.node.x -= 0.5;
        // console.log('Left Up');
    },
    rightUp() {
        if (this.node.x == 480) return
        isPressKey = true;
        this.node.stopAction(this.actionRight);
        // this.node.stopAction(this.moveSpineBoy());
        // this.node.x += 0.5;
        // console.log('Right Up');
    },
    upKeyUp() {
        console.log('UpKey up');
    },
    downKeyUp() {
        console.log('DownKey up');
    }
    // update (dt) {},
});
