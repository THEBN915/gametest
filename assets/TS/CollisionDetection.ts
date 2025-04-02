import { _decorator, Component, Node, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CollisionDetection')
export class CollisionDetection extends Component {
    private bulletEmitter: Node | null = null;

    start() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        // 假设 BulletEmitter 节点名为 "BulletEmitterNode"
        this.bulletEmitter = this.node.scene.getChildByName("BulletEmitter");
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (selfCollider.node.name === 'Airplane' && otherCollider.node.name === 'Bullet') {
            const airplane = selfCollider.node;
            const bullet = otherCollider.node;
            const airplaneController = airplane.getComponent('AirplaneController') as any;
            const bulletMovement = bullet.getComponent('BulletMovement') as any;
            if (airplaneController) {
                airplaneController.pause();
            }
            if (bulletMovement) {
                bulletMovement.pause();
            }
            // 停止子弹生成
            if (this.bulletEmitter) {
                const bulletEmitterScript = this.bulletEmitter.getComponent('BulletEmitter') as any;
                if (bulletEmitterScript) {
                    bulletEmitterScript.stopEmitting();
                }
            }
            console.log('Game Over');
        }
    }
}