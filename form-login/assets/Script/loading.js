cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: cc.ProgressBar,
        welcome: require("welcome")
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.progressBar.progress = 0.1;
        // cc.log(this.progressBar.progress);
    },

    update(dt) {
        let progress = this.progressBar.progress;
        if (progress > 0) {
            progress += dt * 1;
        }
        else {
            progress = 1;
        }
        this.progressBar.progress = progress;
        if (progress >= 1) {
            cc.log("Finish")
            this.start();
            this.welcome.hideLoadingBar();
            this.welcome.showListViewUser();
        }
    },
});
