import { ImageBuilder } from '@src/ports/ImageBuilder';
import { getUnitSpriteXY } from './getSpriteXY';
import { Unit } from '@src/GameController.types';

export class UnitView {
    render = (srcGraph: ImageBuilder, unit: Unit): ImageBuilder => {
        let graph = srcGraph;

        const sprite = getUnitSpriteXY(unit.id);
        graph = graph.drawSprite('sprite', sprite.x, sprite.y, unit.x * 40, unit.y * 40, 40, 40);

        return graph;
    };
}
