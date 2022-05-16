(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Bg Control.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '17d91eFbHtFN5dLg4laeQXx', 'Bg Control', __filename);
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
            // currentBgPosition.y = cc.misc.clampf(currentSpineBoyPosition.y, 0, 230);
            currentBgPosition.x = cc.misc.clampf(currentSpineBoyPosition.x, 3392 * 2, 0);
            // currentBgPosition.lerp(currentSpineBoyPosition, 0.1, currentBgPosition);
            this.node.setPosition(currentBgPosition);
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Bg Control.js.map
        