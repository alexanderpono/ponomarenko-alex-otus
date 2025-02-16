import { GameController } from './GameController';
import { GameControllerBuilder } from './GameControllerBuilder';
import { level1 } from './assets/level1';

console.log('warlords inner main!');
class WarlordsRunner {
    private warl1 = null;

    runWarl = () => {
        this.warl1 = new GameController(
            new GameControllerBuilder()
                .setTarget('w-ui')
                .setCanvasW(720)
                .setCanvasH(320)
                .setCanvasId('w-canvas')
                .setLevel(level1)
        );
        this.warl1.run();
    };
}

const war = new WarlordsRunner();
window['war'] = war;
if (window['demo'] === true) {
    console.log('demo === true!');
} else {
    console.log('demo !== true!');
    war.runWarl();
}
