cc.Class({
    extends: cc.Component,

    properties: {
        userName: cc.EditBox,
        userEmail: cc.EditBox,
        userPassword: cc.EditBox,
        registerButton: cc.Button,
        welcome: require("welcome")
    },

    // use this for initialization
    onLoad() {
        if (!this.userName.string && !this.userEmail.string && !this.userPassword.string) {
            // this.registerButton.interactable = false;
        }
    },
    onClickRegister() {
        let user = {
            name: this.userName.string,
            email: this.userEmail.string,
            password: this.userPassword.string
        }
        if (!user.name || !user.email || !user.password) return
        cc.log(user);

        this.resetInput();

        this.welcome.hideRegisterForm();
        this.welcome.showLoadingBar();
    },
    resetInput() {
        this.userName.string = "";
        this.userEmail.string = "";
        this.userPassword.string = "";
    }

    // called every frame
    // update (dt) {
    // },
});
