const Emitter = require("mEmitter");

let idUserSelect = [];

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
        userPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance.registerEvent('addUser', this.addChildUser.bind(this));
        Emitter.instance.registerEvent('onSelectUser', this.onSelectUser.bind(this));
    },
    addChildUser(data) {
        let user = cc.instantiate(this.userPrefab);
        this.node.addChild(user);
        // Emitter.instance.emit('initUser', data);
        this.users.push(data);
        user.getComponent("userTemplate").init({
            id: data.id,
            userName: data.userName
        });
    },
    onSelectUser(data) {
        if (data.isChecked) {
            idUserSelect.push(data.id);
        } else {
            let index = idUserSelect.indexOf(data.id)
            idUserSelect.splice(index, 1);
        }
    },
    handleSlider(Slider) {
        if (Slider.progress == 0) return
        fontSize = (8 * Slider.progress + 10)

        for (let i = 0; i < this.users.length; i++) {
            Emitter.instance.emit('resizeFontSizeLabel', value);
        }
    },
    onClickBackBtn() {
        Emitter.instance.emit('hideListViewUser');
        Emitter.instance.emit('showRegisterForm');
    },
    onClickDeleteBtn() {
        if (idUserSelect.length == 0) return;

        for (let i = 0; i < idUserSelect.length; i++) {
            let index = this.users.findIndex(user => user.id == idUserSelect[i])
            this.node.removeChild(this.node.children[index]);
            this.users.splice(index, 1);
        }
        //* Reset idUsersSelect = []
        idUserSelect.splice(0, idUserSelect.length);
        cc.log(idUserSelect)
    },

    // start() {},
    // update (dt) {},
});
