const Emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        registerForm: cc.Node,
        loadingBar: cc.Node,
        listViewUser: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('showRegisterForm', this.showRegisterForm.bind(this));
        Emitter.instance.registerEvent('hideRegisterForm', this.hideRegisterForm.bind(this));

        Emitter.instance.registerEvent('showLoadingBar', this.showLoadingBar.bind(this));
        Emitter.instance.registerEvent('hideLoadingBar', this.hideLoadingBar.bind(this));

        Emitter.instance.registerEvent('showListViewUser', this.showListViewUser.bind(this));
        Emitter.instance.registerEvent('hideListViewUser', this.hideListViewUser.bind(this));
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
    showListViewUser() {
        this.listViewUser.active = true;
    },
    hideListViewUser() {
        this.listViewUser.active = false;
    },

    start() {
        this.showRegisterForm();
        this.hideLoadingBar();
        this.hideListViewUser();
    },

    // update (dt) {},
});
