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
        this.velocityMax = 250;
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.walkForce = 3000;
        this.jumpForce = 140000;
        this.onTheGround = false;
        this.actionSpeed = cc.callFunc(() => {
            this.walkForce = 15000;
        });
        this.isStanding = true;

    },

    start() {

    },
    onBeginContact(contact, selfCollider, otherCollider) {
        if (selfCollider.tag === 1) {
            this.onTheGround = true;
        }
        if (otherCollider.tag == 2) {
            this.updateScore();
        }
    },
    _initCharacter() {
        this.node.active = true;
        this.spineBoy.addAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(() => {
            // this.spineBoy.addAnimation(0, 'idle', true);
            this._eventHandler();
        })
        this.score = 0;
    },
    _eventHandler() {
        // Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('leftDown', this.moveLeft.bind(this));
        Emitter.instance.registerEvent('rightDown', this.moveRight.bind(this));
        Emitter.instance.registerEvent('upKeyDown', this.moveJump.bind(this));
        Emitter.instance.registerEvent('sKeyDown', this.sKeyDown.bind(this));

        Emitter.instance.registerEvent('leftUp', this.leftUp.bind(this));
        Emitter.instance.registerEvent('rightUp', this.rightUp.bind(this));
        Emitter.instance.registerEvent('upKeyUp', this.upKeyUp.bind(this));
        Emitter.instance.registerEvent('sKeyUp', this.sKeyUp.bind(this));
    },
    _setAnimationRun() {
        // this.spineBoy.setMix('walk', 'run', 0.8);
        // this.spineBoy.setAnimation(0, 'walk', false);
        this.spineBoy.setAnimation(0, 'run', true);
    },
    moveLeft() {
        if (this.isStanding) {
            this.direction = -1;
            this.node.scaleX = -0.1;
            // this.node.runAction(cc.sequence(cc.delayTime(1), this.actionSpeed));
            this._setAnimationRun();
            this.isStanding = false;
        }
    },
    moveRight() {
        if (this.isStanding) {
            this.direction = 1;
            this.node.scaleX = 0.1;
            // this.node.runAction(cc.sequence(cc.delayTime(1), this.actionSpeed));
            this._setAnimationRun();
            this.isStanding = false;
        }
    },
    moveJump() {
        if (this.onTheGround) {
            this.Rigid_Body.applyForceToCenter(cc.v2(0, this.jumpForce), true);
            this.onTheGround = false;
        }
    },
    sKeyDown() {
        // console.log('DownKey down');
    },

    _setAnimationIdle() {
        this.spineBoy.setAnimation(0, 'idle', true);
    },
    leftUp() {
        this.direction = 0;
        this.velocityMax = 150;
        this.isStanding = true;
        this._setAnimationIdle();
    },
    rightUp() {
        this.direction = 0;
        this.velocityMax = 150;
        this.isStanding = true;
        this._setAnimationIdle();
    },
    upKeyUp() {
    },

    sKeyUp() {

    },

    update(dt) {

        if ((this.direction > 0 && this.Rigid_Body.linearVelocity.x < this.velocityMax) ||
            (this.direction < 0 && this.Rigid_Body.linearVelocity.x > -this.velocityMax)) {
            this.Rigid_Body.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true);
        }

        if (this.spineBoy.node.y < -180) {
            cc.log("Lose");
            this.spineBoy.node.y = 0;
            this.spineBoy.node.setPosition(cc.v2(-330, 0));
            return
        }
    },
});
