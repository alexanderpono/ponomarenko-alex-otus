import { Cell, DynamicObject, LevelMap, Point2D, defaultPoint2D } from '@src/game/LevelMap';
import { GRMan } from './GRMan';
import { GRMap } from './GRMap';
import { SPRITE_HEIGHT, SPRITE_WIDTH } from './GR.types';
import { Man } from '@src/game/Man';
import { GRGold } from './GRGold';
import { Grid } from '@src/path/path.types';
import { GRPath } from './GRPath';
import { Eater } from '@src/game/Eater';
import { GREater } from './GREater';
import { UIState } from '@src/types/UIState';

export class GRScene {
    render(
        picLoaded: boolean,
        levelMap: LevelMap,
        pic: InstanceType<typeof Image>,
        man: Man,
        dObjects: DynamicObject[],
        grid: Grid,
        eater: Eater,
        uiState: UIState,
        canvasId: string
    ): CanvasRenderingContext2D {
        if (!picLoaded) {
            console.log('!picLoaded');
            return null;
        }

        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        if (canvas === null) {
            console.log('canvas === null');
            return null;
        }
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.fillStyle = 'orange';
        context.strokeStyle = '#FF0000';
        context.lineWidth = 3;
        context.strokeRect(0, 0, canvas.width, canvas.height);

        if (canvas === null || context === null) {
            console.log('graph === null');
            return;
        }

        GRMap.create(context, levelMap, pic).draw(uiState);
        let manTargetScreenXY: Point2D = { ...defaultPoint2D };
        const golds = dObjects.filter((obj: DynamicObject) => obj.type === Cell.gold);
        golds.forEach((gold: DynamicObject) => {
            GRGold.create(context, gold.point, pic).draw();
        });

        GRMan.create(
            context,
            calcManScreenPos(man.manFieldXY, man.nextManFieldXY, man.miniCounter),
            manTargetScreenXY,
            man.manAni,
            pic,
            man.miniCounter
        ).draw();

        GRPath.create(context, levelMap, grid, uiState).draw();
        GREater.create(
            context,
            calcManScreenPos(eater.manFieldXY, eater.nextManFieldXY, eater.miniCounter),
            eater.manAni,
            pic,
            eater.miniCounter
        ).draw();

        return context;
    }

    static create = (): GRScene => new GRScene();
}

function calcManScreenPos(manFieldXY: Point2D, nextManFieldXY: Point2D, miniCounter: number) {
    const deltaX = nextManFieldXY.x - manFieldXY.x;
    const deltaY = nextManFieldXY.y - manFieldXY.y;
    const manScreenXY = {
        x: (manFieldXY.x + (deltaX / 10) * (miniCounter % 10)) * SPRITE_WIDTH,
        y: (manFieldXY.y + (deltaY / 10) * (miniCounter % 10)) * SPRITE_HEIGHT
    };
    return manScreenXY;
}
