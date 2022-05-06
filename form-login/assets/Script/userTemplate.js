cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        userName: cc.Label,
        userSelect: cc.Toggle
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init(user) {
        this.id = user.id;
        this.userName.string = user.userName;
    },

    start () {

    },

    // update (dt) {},
});
