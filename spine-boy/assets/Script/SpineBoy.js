import Emitter from 'mEmitter';

cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.node.active = false;
        this._initCharacter();
        // this._eventHandler();

        this.direction = 0;
        this.velocityMax = 150;
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.walkForce = 10000;
        this.jumpForce = 110000;
        this.onTheGround = false;
        this.actionSpeed = cc.callFunc(() => {
            this.walkForce = 15000;
        });

    },

    start() {

    },
    onBeginContact(contact, selfCollider, otherCollider) {
        if (selfCollider.tag === 1) {
            this.onTheGround = true;
        }
    },
    _initCharacter() {
        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(() => {
            this.spineBoy.addAnimation(0, 'idle', true);
            this._eventHandler();
        })
    },
    _eventHandler() {
        // Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('leftDown', this.moveLeft.bind(this));
        Emitter.instance.registerEvent('rightDown', this.moveRight.bind(this));
        Emitter.instance.registerEvent('upKeyDown', this.moveJump.bind(this));
        Emitter.instance.registerEvent('downKeyDown', this.downKeyDown.bind(this));

        Emitter.instance.registerEvent('leftUp', this.leftUp.bind(this));
        Emitter.instance.registerEvent('rightUp', this.rightUp.bind(this));
        Emitter.instance.registerEvent('upKeyUp', this.upKeyUp.bind(this));
        Emitter.instance.registerEvent('downKeyUp', this.downKeyUp.bind(this));
    },
    _setAnimationRun() {
        this.spineBoy.setMix('walk', 'run', 0.8);
        this.spineBoy.setAnimation(0, 'walk', false);
        this.spineBoy.addAnimation(0, 'run', true);
    },
    moveLeft() {
        this.direction = -1;
        this.node.scaleX = -0.1;
        this.node.runAction(cc.sequence(cc.delayTime(1), this.actionSpeed));
    },
    moveRight() {
        this.direction = 1;
        this.node.scaleX = 0.1;
        this.node.runAction(cc.sequence(cc.delayTime(1), this.actionSpeed));
    },
    moveJump() {
        if (this.onTheGround) {
            this.Rigid_Body.applyForceToCenter(cc.v2(0, this.jumpForce), true);
            this.onTheGround = false;
        }
    },
    downKeyDown() {
        // console.log('DownKey down');
    },

    _setAnimationIdle() {
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    leftUp() {
        this.direction = 0;
        this.velocityMax = 150;
    },
    rightUp() {
        this.direction = 0;
        this.velocityMax = 150;
    },
    upKeyUp() {
        // this.canJump = true;
    },
    downKeyUp() {

    },

    update(dt) {
        if ((this.direction > 0 && this.Rigid_Body.linearVelocity.x < this.velocityMax) ||
            (this.direction < 0 && this.Rigid_Body.linearVelocity.x > -this.velocityMax)) {
            this.Rigid_Body.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true);
        }
    },
});
