export class GameControllerBuilder {
    target: string = '';
    canvasW: number = 0;
    canvasH: number = 0;
    canvasId: string;
    level: string;

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

    setCanvasId = (canvasId: string) => {
        this.canvasId = canvasId;
        return this;
    };

    setLevel = (level: string) => {
        this.level = level;
        return this;
    };
}
