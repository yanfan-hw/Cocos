"use strict";
cc._RF.push(module, '17d91eFbHtFN5dLg4laeQXx', 'Bg Control');
// Script/Bg Control.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    update: function update(dt) {
        var currentSpineBoyPosition = this.spineBoy.getPosition();
        var currentBgPosition = this.node.getPosition();

        if (currentSpineBoyPosition.x > 0 && currentSpineBoyPosition.x < 2952 * 2) {
            currentBgPosition.x = cc.misc.clampf(currentSpineBoyPosition.x, 3392 * 2, 0);
            this.node.setPosition(currentBgPosition);
        }
    }
});

cc._RF.pop();