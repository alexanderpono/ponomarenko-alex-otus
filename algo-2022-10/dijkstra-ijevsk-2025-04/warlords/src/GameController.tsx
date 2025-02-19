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
import { ALL_NODES, PathCalculator, SILENT, VERBOSE } from './path/PathCalculator';
import { CurVertexView } from './views/CurVertexView';
import { PathView } from './views/PathView';

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
            // graph = new VerticesView().render(graph, this.levelMap, this.grid);
            // graph = new EdgesCostView().render(graph, this.levelMap, this.grid);
            graph = new VerticesCostView().render(graph, this.levelMap, this.grid);
            graph = new CurVertexView().render(graph, this.levelMap, this.grid);
            graph = new PathView().render(graph, this.levelMap, this.grid);

            graph.buildImage(); //.printActions(145)
        });

        return this;
    }

    calculatePath = () => {
        const gridBuilder = new GridFromMap();
        this.grid = gridBuilder.gridFromMap(this.levelMap);

        const srcIndex = this.levelMap.coordToVertexIndex({ x: 10, y: 4 });
        const destIndex = this.levelMap.coordToVertexIndex({ x: 3, y: 4 });
        this.grid = new PathCalculator().calculateGraph(
            this.grid,
            srcIndex,
            destIndex,
            SILENT,
            // 55,
            ALL_NODES,
            this.levelMap
        );
    };
}
