import { PathCalculator } from "./path/PathCalculator";

export class GameControllerBuilder {
    target: string = '';
    canvasW: number = 0;
    canvasH: number = 0;
    calculator: PathCalculator;
    canvasId: string;

    setTarget = (target: string) => {
        this.target = target;
        return this;
    };

    setCanvasW = (canvasW: number) => {
        this.canvasW = canvasW;
        return this;
    };

    setCanvasH = (canvasH: number) => {
        this.canvasH = canvasH;
        return this;
    };

    setCalculator = (calculator: PathCalculator) => {
        this.calculator = calculator;
        return this;
    }

    setCanvasId = (canvasId: string) => {
        this.canvasId = canvasId;
        return this;
    };
}
