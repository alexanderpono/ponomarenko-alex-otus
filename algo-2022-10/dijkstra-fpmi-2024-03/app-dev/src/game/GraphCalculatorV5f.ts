import { Point2D } from './GameField';
import { GraphCalculatorV5e } from './GraphCalculatorV5e';

export class GraphCalculatorV5f extends GraphCalculatorV5e {
    protected heuristic = (v0Index: number, targetIndex: number) => {
        const v0: Point2D = this.gameField.vertexIndexToCoords(v0Index, this.gameField.getWidth());
        const v1: Point2D = this.gameField.vertexIndexToCoords(
            targetIndex,
            this.gameField.getWidth()
        );
        const h = Math.abs(v0.x - v1.x) + Math.abs(v0.y - v1.y);
        const d = this.getDistance(this.A, this.B, this.C, v0);
        return 5 * (h * 4 + d);
    };
}
