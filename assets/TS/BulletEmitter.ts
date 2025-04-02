import { _decorator, Component, Node, instantiate, Prefab, Vec3, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletEmitter')
export class BulletEmitter extends Component {
    @property(Prefab)
    bulletPrefab: Prefab | null = null;
    private emitSchedule: any;

    start() {
        this.emitSchedule = this.schedule(this.emitBullet, 0.5);
    }

    emitBullet() {
        if (this.bulletPrefab) {
            const bullet = instantiate(this.bulletPrefab);
            const startPos = this.getRandomOutsidePosition();
            const endPos = this.getRandomOutsidePosition();
            bullet.setPosition(startPos);
            this.node.addChild(bullet);

            const bulletMovement = bullet.getComponent('BulletMovement') as any;
            if (bulletMovement) {
                bulletMovement.setStartAndEndPositions(startPos, endPos);
            }
        }
    }

    getRandomOutsidePosition() {
        const randomSide = math.randomRangeInt(0, 4);
        let pos: Vec3;
        switch (randomSide) {
            case 0: // 上方
                pos = new Vec3(math.randomRange(-360, 360), 640 + math.randomRange(0, 100), 0);
                break;
            case 1: // 下方
                pos = new Vec3(math.randomRange(-360, 360), -640 - math.randomRange(0, 100), 0);
                break;
            case 2: // 左方
                pos = new Vec3(-360 - math.randomRange(0, 100), math.randomRange(-640, 640), 0);
                break;
            case 3: // 右方
                pos = new Vec3(360 + math.randomRange(0, 100), math.randomRange(-640, 640), 0);
                break;
            default:
                pos = new Vec3(0, 0, 0);
        }
        return pos;
    }

    stopEmitting() {
        console.log('Bullet emission stopped');
        if (this.emitSchedule) {
            this.unschedule(this.emitBullet);
        }
    }
}    