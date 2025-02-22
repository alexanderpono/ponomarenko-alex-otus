import { GameController } from './GameController';
import { GameControllerBuilder } from './GameControllerBuilder';
import { level1 } from './assets/level1';
import { level1Grass } from './assets/level1Grass';
import { level1Hills } from './assets/level1Hills';
import { level1Road } from './assets/level1Road';
import { level1Town } from './assets/level1Town';
import { level1Water } from './assets/level1Water';
import { Point2D } from './game/LevelMap';

interface AppConfig {
    name: string;
    target: string;
    level: string;
    calculatePath: boolean;
    pathSrc: Point2D;
    pathDest: Point2D;
    showVertices: boolean;
    showEdges: boolean;
    showVerticesCost: boolean;
    showEdgesCost: boolean;
    showCurVertex: boolean;
    showPath: boolean;
    showPathControls: boolean;
    pathControlsTarget: string;
    maxCalcStep: number;
}
const defaultAppConfig: AppConfig = {
    name: '',
    target: '',
    level: '',
    calculatePath: false,
    pathSrc: { x: 0, y: 0 },
    pathDest: { x: 0, y: 0 },
    showVertices: false,
    showEdges: false,
    showVerticesCost: false,
    showEdgesCost: false,
    showCurVertex: false,
    showPath: false,
    showPathControls: false,
    pathControlsTarget: '',
    maxCalcStep: 1000
};

console.log('warlords inner main!');
class WarlordsRunner {
    private slides: GameController[] = [];

    runWarl = (config: AppConfig) => {
        this.slides[config.name] = new GameController(
            new GameControllerBuilder()
                .setTarget(config.target)
                .setCanvasW(720)
                .setCanvasH(320)
                .setCanvasId('w-canvas')
                .setLevel(config.level)
                .setCalculatePath(config.calculatePath)
                .setPathSrc(config.pathSrc)
                .setPathDest(config.pathDest)
                .setShowVertices(config.showVertices)
                .setShowEdges(config.showEdges)
                .setShowVerticesCost(config.showVerticesCost)
                .setShowEdgesCost(config.showEdgesCost)
                .setShowCurVertex(config.showCurVertex)
                .setShowPath(config.showPath)
                .setShowPathControls(config.showPathControls)
                .setPathControlsTarget(config.pathControlsTarget)
                .setMaxCalcStep(config.maxCalcStep)
        );
        this.slides[config.name].run();
    };
}

const war = new WarlordsRunner();
window['war'] = war;
if (window['demo'] === true) {
    console.log('demo === true!');
} else {
    console.log('demo !== true!');
    war.runWarl({
        ...defaultAppConfig,
        name: 'grass',
        target: 'w-grass',
        level: level1Grass
    });
    war.runWarl({
        ...defaultAppConfig,
        name: 'hills',
        target: 'w-hills',
        level: level1Hills
    });
    war.runWarl({
        ...defaultAppConfig,
        name: 'water',
        target: 'w-water',
        level: level1Water
    });
    war.runWarl({
        ...defaultAppConfig,
        name: 'town',
        target: 'w-town',
        level: level1Town
    });
    war.runWarl({
        ...defaultAppConfig,
        name: 'road',
        target: 'w-road',
        level: level1Road
    });
    war.runWarl({
        ...defaultAppConfig,
        name: 'building',
        target: 'w-building',
        level: level1
    });
    war.runWarl({
        ...defaultAppConfig,
        name: 'grid',
        target: 'w-grid',
        level: level1,
        showEdges: true
    });
    war.runWarl({
        ...defaultAppConfig,
        name: 'edgesCosts',
        target: 'w-edgesCosts',
        level: level1,
        showEdges: false,
        showEdgesCost: true
    });
    war.runWarl({
        ...defaultAppConfig,
        name: 'path',
        target: 'w-path',
        level: level1,
        showEdges: false,
        showEdgesCost: false,
        showCurVertex: false,
        calculatePath: true,
        pathSrc: { x: 10, y: 4 },
        pathDest: { x: 3, y: 4 },
        showPath: true
    });
    war.runWarl({
        ...defaultAppConfig,
        name: 'path-progress',
        target: 'w-path-progress',
        level: level1,
        showEdges: false,
        showEdgesCost: false,
        showCurVertex: true,
        calculatePath: true,
        pathSrc: { x: 10, y: 4 },
        pathDest: { x: 3, y: 4 },
        showPath: true,
        showVerticesCost: true,
        showPathControls: true,
        pathControlsTarget: 'w-path-progress-controls',
        maxCalcStep: 0
    });
}
