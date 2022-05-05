cc.Class({
    extends: cc.Component,

    properties: {
        userName: cc.EditBox,
        userEmail: cc.EditBox,
        userPassword: cc.EditBox
    },

    // use this for initialization
    onLoad() {
        if (!this.userName.string && !this.userEmail.string && !this.userPassword.string) {
            cc.log("User null");
        }
    },

    onClickRegister(btn) {
        cc.warn(btn);
        // cc.log(this.userName.string);
        // cc.log(this.userEmail.string);
        // cc.log(this.userPassword.string);
    },

    // called every frame
    // update (dt) {
    // },
});
