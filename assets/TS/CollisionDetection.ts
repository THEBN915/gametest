import { _decorator, Component, Node, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CollisionDetection')
export class CollisionDetection extends Component {
    private bulletEmitter: Node | null = null;
    private hasStarted = false; // 添加标记变量

    start() {
        if (this.hasStarted) {
            return; // 如果已经执行过 start 方法，直接返回
        }
        this.hasStarted = true; // 标记 start 方法已经执行

        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            console.log('Collision detection event listener added');
        }
        const canvas = this.node.scene.getChildByName('Canvas');
        if (canvas) {
            this.bulletEmitter = canvas.getChildByName('BulletEmitter');
        }
        console.log(`BulletEmitter node found: ${this.bulletEmitter!== null}`);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log(`Self collider node name: ${selfCollider.node.name}`);
        console.log(`Other collider node name: ${otherCollider.node.name}`);
        if (selfCollider.node.name === 'Airplane' && otherCollider.node.name === 'Bullet') {
            const airplane = selfCollider.node;
            const bullet = otherCollider.node;
            const airplaneController = airplane.getComponent('AirplaneController') as any;
            const bulletMovement = bullet.getComponent('BulletMovement') as any;
            console.log(`AirplaneController component found: ${airplaneController!== null}`);
            console.log(`BulletMovement component found: ${bulletMovement!== null}`);
            if (airplaneController) {
                airplaneController.pause();
            }
            if (bulletMovement) {
                bulletMovement.pause();
            }
            if (this.bulletEmitter) {
                const bulletEmitterScript = this.bulletEmitter.getComponent('BulletEmitter') as any;
                console.log(`BulletEmitter component found: ${bulletEmitterScript!== null}`);
                if (bulletEmitterScript) {
                    bulletEmitterScript.stopEmitting();
                }
            }
            console.log('Game Over');
        }
    }
}    