import { Point2D } from './GameField';
import { GraphCalculatorV5c } from './GraphCalculatorV5c';

export class GraphCalculatorV5d extends GraphCalculatorV5c {
    protected heuristic = (v0Index: number, v1Index: number) => {
        const v0: Point2D = this.gameField.vertexIndexToCoords(v0Index, this.gameField.getWidth());
        const v1: Point2D = this.gameField.vertexIndexToCoords(v1Index, this.gameField.getWidth());
        const h = Math.abs(v0.x - v1.x) + Math.abs(v0.y - v1.y);
        return h * 2;
    };
}
