import { _decorator, Component, Node, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletMovement')
export class BulletMovement extends Component {
    private startPos: Vec3 = new Vec3();
    private endPos: Vec3 = new Vec3();
    private bulletTween: any;
    private isPaused = false;

    setStartAndEndPositions(start: Vec3, end: Vec3) {
        this.startPos = start;
        this.endPos = end;
        this.moveBullet();
    }

    moveBullet() {
        const distance = Vec3.distance(this.startPos, this.endPos);
        const speed = 300; // 子弹移动速度
        const duration = distance / speed;

        this.bulletTween = tween(this.node)
           .to(duration, { position: this.endPos })
           .call(() => {
                if (!this.isPaused) {
                    this.node.destroy();
                }
            })
           .start();
    }

    pause() {
        this.isPaused = true;
        if (this.bulletTween) {
            this.bulletTween.stop();
        }
    }
}