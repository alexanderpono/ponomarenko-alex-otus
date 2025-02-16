import ImgSprite from '@src/assets/sprite.png';
import { Cell, LevelMap } from './game/LevelMap';
import { GameControllerBuilder } from './GameControllerBuilder';
import { ImageBuilder } from './ports/ImageBuilder';
import { getSpriteXY } from './views/getSpriteXY';

export class GameController {
    picLoaded: boolean;
    levelMap: LevelMap = null;
    pic: InstanceType<typeof Image> = new Image();

    constructor(private builder: GameControllerBuilder) {}

    run() {
        console.log('run() this.builder.level=', this.builder.level);
        this.levelMap = LevelMap.create().initFromText(this.builder.level);
        console.log('run() this.levelMap=', this.levelMap);

        this.loadPic().then(() => {
            this.picLoaded = true;
            this.renderScene();
        });
    }
    loadPic = () => {
        return new Promise((resolve) => {
            this.pic.src = ImgSprite;
            this.pic.onload = function () {
                resolve(true);
            };
        });
    };

    renderScene() {
        let graph = ImageBuilder.create()
            .setDomTarget(this.builder.target)
            .setSize(this.builder.canvasW, this.builder.canvasH)
            .createContext()
            .lineColor('black')
            .lineWidth(1)
            .border()
            .font('bold 15px sans-serif');

        graph.loadPic(ImgSprite, 'sprite').then(() => {
            this.levelMap.field.forEach((line: Cell[], y: number) => {
                line.forEach((cell: Cell, x: number) => {
                    const sprite = getSpriteXY(this.levelMap, x, y, cell);
                    graph.drawSprite('sprite', sprite.x, sprite.y, x * 40, y * 40, 40, 40);
                });
            });

            graph.buildImage(); //.printActions()
        });

        return this;
    }
}
