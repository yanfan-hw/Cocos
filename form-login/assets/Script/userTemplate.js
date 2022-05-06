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
        this.isSelected = user.isSelected;

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
