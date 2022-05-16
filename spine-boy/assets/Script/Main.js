import Emitter from 'mEmitter';

cc.Class({
    extends: cc.Component,

    properties: {
        background: cc.Node,
        spineBoy: cc.Node,
        score: cc.Node,
        playBtn: cc.Node
    },
    onLoad () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, -3000);

        Emitter.instance = new Emitter();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.background.opacity = 50;
        this.spineBoy.active = false;
        this.score.active = false;
    },
    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                Emitter.instance.emit('leftDown');
                break;
            case cc.macro.KEY.right:
                Emitter.instance.emit('rightDown');
                break;
            case cc.macro.KEY.a:
                Emitter.instance.emit('leftDown');
                break;
            case cc.macro.KEY.d:
                Emitter.instance.emit('rightDown');
                break;
            case cc.macro.KEY.up:
                Emitter.instance.emit('upKeyDown');
                break;
            case cc.macro.KEY.w:
                Emitter.instance.emit('upKeyDown');
                break;
            case cc.macro.KEY.down:
                Emitter.instance.emit('downKeyDown');
                break;
        }
    },
    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                Emitter.instance.emit('leftUp');
                break;
            case cc.macro.KEY.right:
                Emitter.instance.emit('rightUp');
                break;
            case cc.macro.KEY.a:
                Emitter.instance.emit('leftUp');
                break;
            case cc.macro.KEY.d:
                Emitter.instance.emit('rightUp');
                break;
            case cc.macro.KEY.up:
                Emitter.instance.emit('upKeyUp');
                break;
            case cc.macro.KEY.w:
                Emitter.instance.emit('upKeyUp');
                break;
            case cc.macro.KEY.down:
                Emitter.instance.emit('downKeyUp');
                break;
        }
    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onClickPlayBtn() {
        this.playBtn.active = false;
        this.background.opacity = 255;
        this.spineBoy.active = true;
        this.score.active = true;
    }
    // start () {
    // },
    // update (dt) {},
});
