const Emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        userName: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        Emitter.instance.registerEvent('resizeFontSizeLabel', this.resizeFontSizeLabel.bind(this));
    },
    init(data) {
        this.id = data.id;
        this.userName.string = data.userName;
    },
    resizeFontSizeLabel(size) {
        this.userName.fontSize = size;
    },
    onSelectUser(toggle) {
        let data = {
            isChecked: toggle.isChecked,
            id: this.id
        };
        Emitter.instance.emit('onSelectUser', data);
        console.log(data);
    },
    // start() {},
    // update (dt) {},
});
