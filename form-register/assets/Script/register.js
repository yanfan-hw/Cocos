const Emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        userName: cc.EditBox,
        userEmail: cc.EditBox,
        userPassword: cc.EditBox,
        registerButton: cc.Button,
        welcome: require("welcome"),
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

        // cc.log(user);
        // this.userList.users.push(user);
        this.onHideRegisterForm();
        Emitter.instance.emit('showLoadingBar');
        Emitter.instance.emit('addUser', user);
        // this.userList.addChildUser(user);

        this.resetInput();
        // this.welcome.hideRegisterForm();
        // this.welcome.showLoadingBar();
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
