import { GameField } from '@src/game/GameField';
import React from 'react';
import { GRField } from '@src/ports/GRField';
import { GRGraph } from '@src/ports/GRGraph';
import { AbstractGraph } from '@src/game/Graph.types';

export interface RenderOptions {
    nodes: boolean;
    lines: boolean;
    path: boolean;
    nodesCost: boolean;
    map: boolean;
}
export const defaultRenderOptions: RenderOptions = {
    nodes: false,
    lines: false,
    path: false,
    nodesCost: false,
    map: false
};

interface GameFieldUIProps {
    field: GameField;
    graph: AbstractGraph;
    id: string;
    title: string;
    canvasW?: number;
    canvasH?: number;
    canvas: HTMLCanvasElement;
    ctrl: GameFieldController;
    gameState: GameState;
}

export interface GameFieldController {
    nodesClicked: () => void;
    linesClicked: () => void;
    pathClicked: () => void;
    nodesCostClicked: () => void;
    mapClicked: () => void;
}
export interface GameState {
    nodesChecked: boolean;
    linesChecked: boolean;
    pathChecked: boolean;
    nodesCostChecked: boolean;
    mapChecked: boolean;
    picLoaded: boolean;
    showControls: boolean;
    pic: InstanceType<typeof Image>;
}
export const defaultGameState: GameState = {
    nodesChecked: false,
    linesChecked: false,
    pathChecked: false,
    nodesCostChecked: false,
    mapChecked: false,
    picLoaded: false,
    showControls: false,
    pic: null
};

export const GameFieldUI = React.forwardRef<HTMLCanvasElement, GameFieldUIProps>(
    ({ field, graph, id, title, canvasW, canvasH, canvas, ctrl, gameState }, canvasRef) => {
        React.useEffect(() => {
            if (!gameState.picLoaded) {
                return;
            }

            if (canvas === null) {
                return;
            }
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            context.fillStyle = 'orange';
            context.strokeStyle = '#FF0000';
            context.lineWidth = 3;
            context.strokeRect(0, 0, canvas.width, canvas.height);

            if (canvas === null || context === null) {
                return;
            }

            const options: RenderOptions = {
                nodes: gameState.nodesChecked,
                lines: gameState.linesChecked,
                path: gameState.pathChecked,
                nodesCost: gameState.nodesCostChecked,
                map: gameState.mapChecked
            };

            GRField.create(context, field, gameState.pic, options).draw();
            GRGraph.create(context, field, graph, options).draw();
        }, [gameState, canvas]);

        return (
            <div style={{ width: '720px' }}>
                <h3>{title}</h3>
                <canvas height={canvasH} width={canvasW} id="GraphUI" ref={canvasRef}></canvas>
                {gameState.showControls && (
                    <div>
                        {Label(gameState.nodesChecked, ctrl.nodesClicked, `${id}-nodes`, 'Узлы')}
                        {Label(gameState.linesChecked, ctrl.linesClicked, `${id}-lines`, 'Ребра')}
                        {Label(gameState.pathChecked, ctrl.pathClicked, `${id}-path`, 'Траектория')}
                        {Label(
                            gameState.nodesCostChecked,
                            ctrl.nodesCostClicked,
                            `${id}-nodesCost`,
                            'Стоимость узлов'
                        )}
                        {Label(gameState.mapChecked, ctrl.mapClicked, `${id}-map`, 'Карта')}
                    </div>
                )}
            </div>
        );
    }
);

export function Label(val: boolean, setter: () => void, id: string, caption: string) {
    return (
        <label htmlFor={id}>
            <input type="checkbox" checked={val} onChange={setter} id={id} />
            {caption}
        </label>
    );
}
