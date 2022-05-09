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
            type: User,
        },
        userPrefab: cc.Prefab,
        welcome: require("welcome"),
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
        this.users.push(data);
        user.getComponent("userTemplate").init({
            id: data.id,
            userName: data.userName
        });
    },
    handleSlider(Slider) {
        let value = Slider.progress;
        if(value == 0) return

        for(let i = 0; i < this.users.length; i++) {
            let labelUserName = this.node.children[i].children[0].getComponent(cc.Label);
            labelUserName.fontSize = (8 * value + 10);
            // labelUserName.onRestore();
            // size = 8 / value + 10 (10->18)
        }
    },
    onClickBackBtn() {
        this.welcome.hideListViewUser();
        this.welcome.showRegisterForm();

        // let idUsersSelect = require("idUsersSelect");
        // idUsersSelect.splice(0, idUsersSelect.length);
    },
    onClickDeleteBtn() {
        let idUsersSelect = require("idUsersSelect");
        if (idUsersSelect.length == 0) return;
        cc.log(idUsersSelect)

        for (let i = 0; i < idUsersSelect.length; i++) {
            let index = this.users.findIndex(user => user.id == idUsersSelect[i])
            this.node.removeChild(this.node.children[index]);
            this.users.splice(index, 1);
        }
        //* Reset idUsersSelect = []
        idUsersSelect.splice(0, idUsersSelect.length);
    },

    start() {
    },

    // update (dt) {},
});
