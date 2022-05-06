let User = cc.Class({
    name: 'User',
    properties: {
        id: 0,
        userName: "",
        userEmail: "",
        userPassword: ""
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        users: {
            default: [],
            type: User
        },
        userPrefab: cc.Prefab,
        backButton: cc.Button,
        welcome: require("welcome")

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // cc.log(this.node)
        // for (let i = 0; i < this.users.length; i++) {
        //     let user = cc.instantiate(this.userPrefab);
        //     let data = this.users[i];
        //     this.node.addChild(user);
        //     user.getComponent("userTemplate").init({
        //         id: data.id,
        //         userName: data.userName
        //     });
        // }
    },
    addChildUser(data) {
        let user = cc.instantiate(this.userPrefab);
        this.node.addChild(user);
        user.getComponent("userTemplate").init({
            id: data.id,
            userName: data.userName
        });
    },
    onClickBackBtn() {
        this.welcome.hideListViewUser();
        this.welcome.showRegisterForm();
    },

    start() {
    },

    // update (dt) {},
});
