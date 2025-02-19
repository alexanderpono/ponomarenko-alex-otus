import ImgSprite from '@src/assets/sprite.png';
import { LevelMap } from './game/LevelMap';
import { GameControllerBuilder } from './GameControllerBuilder';
import { ImageBuilder } from './ports/ImageBuilder';
import { GridFromMap } from './path/GridFromMap';
import { Grid } from './path/path.types';
import { MapView } from './views/MapView';
import { VerticesView } from './views/VerticesView';
import { EdgesView } from './views/EdgesView';
import { EdgesCostView } from './views/EdgesCostView';
import { VerticesCostView } from './views/VerticesCostView';

export class GameController {
    picLoaded: boolean;
    levelMap: LevelMap = null;
    pic: InstanceType<typeof Image> = new Image();
    grid: Grid = null;

    constructor(private builder: GameControllerBuilder) {}

    run() {
        console.log('run() this.builder.level=', this.builder.level);
        this.levelMap = LevelMap.create().initFromText(this.builder.level);
        console.log('run() this.levelMap=', this.levelMap);

        this.loadPic().then(() => {
            this.picLoaded = true;
            this.calculatePath();
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
            graph = new MapView().render(graph, this.levelMap);
            graph = new EdgesView().render(graph, this.levelMap, this.grid);
            graph = new VerticesView().render(graph, this.levelMap, this.grid);
            // graph = new EdgesCostView().render(graph, this.levelMap, this.grid);
            // graph = new VerticesCostView().render(graph, this.levelMap, this.grid);

            graph.printActions(145).buildImage(); //.printActions()
        });

        return this;
    }

    calculatePath = () => {
        const gridBuilder = new GridFromMap();
        this.grid = gridBuilder.gridFromMap(this.levelMap);
        console.log('calculatePath() this.grid=', this.grid);
        // const mIndex = this.levelMap.coordToVertexIndex(this.manFieldXY);
        // const dIndex = this.levelMap.coordToVertexIndex(this.man.manFieldXY);
        // grid = this.pathCalculator.calculateGraph(
        //     grid,
        //     mIndex,
        //     dIndex,
        //     SILENT,
        //     ALL_NODES,
        //     this.levelMap
        // );
        // this.grid = grid;
    };
}
