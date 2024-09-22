import { RenderOptions } from '@src/components/GameFieldUI/Game.types';
import { GraphFromField } from './GraphFromField';
import { GraphCalculator } from './GraphCalculator';

export class GameControllerBuilder {
    title: string = '';
    map: string = '';
    target: string = '';
    options: RenderOptions = null;
    graphBuilder: GraphFromField = null;
    calculator: typeof GraphCalculator = null;
    verbose: boolean = false;
    maxStepNo: number = 0;
    canvasW: number = 0;
    canvasH: number = 0;

    setTitle = (title: string) => {
        this.title = title;
        return this;
    };

    setMap = (map: string) => {
        this.map = map;
        return this;
    };

    setTarget = (target: string) => {
        this.target = target;
        return this;
    };

    setOptions = (options: RenderOptions) => {
        this.options = options;
        return this;
    };

    setGraphBuilder = (graphBuilder: GraphFromField) => {
        this.graphBuilder = graphBuilder;
        return this;
    };

    setCalculator = (calculator: typeof GraphCalculator) => {
        this.calculator = calculator;
        return this;
    };

    setVerbose = (verbose: boolean) => {
        this.verbose = verbose;
        return this;
    };

    setMaxStepNo = (maxStepNo: number) => {
        this.maxStepNo = maxStepNo;
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
}
