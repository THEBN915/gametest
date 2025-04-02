import { _decorator, Component, Node, Input, input, EventTouch, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AirplaneController')
export class AirplaneController extends Component {
    private isPaused = false;

    start() {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        if (!this.isPaused) {
            const delta = event.getDelta();
            const position = this.node.position;
            this.node.setPosition(new Vec3(position.x + delta.x, position.y + delta.y, 0));
        }
    }

    pause() {
        this.isPaused = true;
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }
}