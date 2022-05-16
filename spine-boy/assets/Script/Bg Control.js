cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    update(dt) {
        let currentSpineBoyPosition = this.spineBoy.getPosition();
        let currentBgPosition = this.node.getPosition();

        if (currentSpineBoyPosition.x > 0 && currentSpineBoyPosition.x < (2952 * 2)) {
            currentBgPosition.x = cc.misc.clampf(currentSpineBoyPosition.x, (3392*2), 0);
            this.node.setPosition(currentBgPosition);
        }
    },
});
