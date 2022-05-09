let idUsersSelect = require("idUsersSelect");

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        userName: cc.Label,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init(user) {
        this.id = user.id;
        this.userName.string = user.userName;
        // this.userName.fontSize = 10;
        // cc.log(this.userName.fontSize);
    },
    resizeFontSizeLabel(size) {
        this.userName.fontSize = size;
    },
    onSelectUser(toggle) {
        if (toggle.isChecked) {
            idUsersSelect.push(this.id);
        } else {
            let index = idUsersSelect.indexOf(this.id)
            idUsersSelect.splice(index, 1);
        }
        // cc.log(idUsersSelect);
    },

    start() {

    },

    // update (dt) {},
});
