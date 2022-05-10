const Emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: cc.ProgressBar
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.progressBar.progress = 0;
        Emitter.instance.registerEvent('showLoadingBar', this.onShowLoadingBar.bind(this));
    },
    onShowLoadingBar() {
        cc.tween(this.progressBar)
            .to(1.5, { progress: 1 })
            .call(() => {
                this.onHideLoadingBar();
                Emitter.instance.emit('showListViewUser');
            })
            .start()
    },
    onDisable() {
        this.progressBar.progress = 0;
    },

    onHideLoadingBar() {
        this.node.active = false;
    },
    // start() {},
    // update(dt) {},
});
