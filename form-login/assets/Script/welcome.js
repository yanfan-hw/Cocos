cc.Class({
    extends: cc.Component,

    properties: {
        registerForm: cc.Node,
        loadingBar: cc.Node,
        // listViewUser: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.showRegisterForm();
        this.hideLoadingBar();
    },

    showRegisterForm() {
        this.registerForm.active = true;
    },
    hideRegisterForm() {
        this.registerForm.active = false;
    },
    showLoadingBar() {
        this.loadingBar.active = true;
    },
    hideLoadingBar() {
        this.loadingBar.active = false;
    },
    // showRegisterForm() {

    // },
    // hideRegisterForm() {

    // },
    start () {

    },

    // update (dt) {},
});
