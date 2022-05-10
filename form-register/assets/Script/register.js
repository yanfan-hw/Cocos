const Emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        userName: cc.EditBox,
        userEmail: cc.EditBox,
        userPassword: cc.EditBox,
        registerButton: cc.Button,
        userList: require("userList")
    },

    onLoad() {
        if (!this.userName.string && !this.userEmail.string && !this.userPassword.string) {
            // this.registerButton.interactable = false;
        }
    },
    onClickRegister() {
        let user = {
            id: this.userList.users.length,
            userName: this.userName.string,
            userEmail: this.userEmail.string,
            userPassword: this.userPassword.string
        }
        if (!user.userName || !user.userName || !user.userPassword) return

        this.onHideRegisterForm();
        Emitter.instance.emit('showLoadingBar');
        Emitter.instance.emit('addUser', user);

        this.resetInput();
    },
    resetInput() {
        this.userName.string = "";
        this.userEmail.string = "";
        this.userPassword.string = "";
    },
    onShowRegisterForm() {
        this.node.active = true;
    },
    onHideRegisterForm() {
        this.node.active = false;
    }
    // called every frame
    // update (dt) {
    // },
});
