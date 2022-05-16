import Emitter from 'mEmitter';

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        let physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;
        physics_manager.gravity = cc.v2(0, -2000);

        Emitter.instance = new Emitter();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
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
            case cc.macro.KEY.s:
                Emitter.instance.emit('sKeyDown');
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
            case cc.macro.KEY.s:
                Emitter.instance.emit('sKeyUp');
                break;
        }
    },
    // called every frame
    update: function (dt) {

    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
});
