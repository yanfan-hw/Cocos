import Emitter from 'mEmitter';

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('leftDown', this.leftDown.bind(this));
        Emitter.instance.registerEvent('rightDown', this.rightDown.bind(this));
        Emitter.instance.registerEvent('upKeyDown', this.upKeyDown.bind(this));
        Emitter.instance.registerEvent('downKeyDown', this.downKeyDown.bind(this));

        Emitter.instance.registerEvent('leftUp', this.leftUp.bind(this));
        Emitter.instance.registerEvent('rightUp', this.rightUp.bind(this));
        Emitter.instance.registerEvent('upKeyUp', this.upKeyUp.bind(this));
        Emitter.instance.registerEvent('downKeyUp', this.downKeyUp.bind(this));
    },

    start() {

    },
    leftDown() {
        console.log('Left Down');
    },
    rightDown() {
        console.log('Right Down');
    },
    upKeyDown() {
        console.log('UpKey Down');
    },
    downKeyDown() {
        console.log('DownKey Down');
    },

    leftUp() {
        console.log('Left Up');
    },
    rightUp() {
        console.log('Right Up');
    },
    upKeyUp() {
        console.log('UpKey Up');
    },
    downKeyUp() {
        console.log('DownKey Up');
    }
    // update (dt) {},
});
