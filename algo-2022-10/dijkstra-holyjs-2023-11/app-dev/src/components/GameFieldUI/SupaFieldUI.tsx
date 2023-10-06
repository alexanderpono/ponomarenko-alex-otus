import { GameField, Point2D } from '@src/game/GameField';
import React from 'react';
import { GRField } from '@src/ports/GRField';
import { GRGraph } from '@src/ports/GRGraph';
import { AbstractGraph } from '@src/game/Graph.types';
import { GameFieldController, GameState, RenderOptions } from './Game.types';
import { GRGold } from '@src/ports/GRGold';
import { GRSelect } from '@src/ports/GRSelect';
import { GameControls } from './GameControls';
import { GREater } from '@src/ports/GREater';

interface SupaFieldUIProps {
    field: GameField;
    emptyField: GameField;
    graph: AbstractGraph;
    id: string;
    title: string;
    canvasW?: number;
    canvasH?: number;
    canvas: HTMLCanvasElement;
    ctrl: GameFieldController;
    gameState: GameState;
    picLoaded: boolean;
}

export const SupaFieldUI = React.forwardRef<HTMLCanvasElement, SupaFieldUIProps>(
    (
        {
            field,
            graph,
            id,
            title,
            canvasW,
            canvasH,
            canvas,
            ctrl,
            gameState,
            emptyField,
            picLoaded
        },
        canvasRef
    ) => {
        React.useEffect(() => {
            if (!picLoaded) {
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

            if (canvas === null || context === null || graph === null) {
                return;
            }

            const options: RenderOptions = {
                nodes: gameState.nodesChecked,
                lines: gameState.linesChecked,
                path: gameState.pathChecked,
                nodesCost: gameState.nodesCostChecked,
                nodesShortCost: gameState.nodesShortCost,
                map: gameState.mapChecked,
                showBtMap: gameState.showBtMap,
                showBtNodes: gameState.showBtNodes,
                showBtEdges: gameState.showBtEdges,
                showBtStartStop: gameState.showBtStartStop,
                highlightCells: gameState.highlightCells,
                showBtPath: gameState.showBtPath,
                showBtCost: gameState.showBtCost,
                showProgress: gameState.showProgress,
                curVertexIndex: gameState.curVertexIndex
            };

            GRField.create(context, emptyField, gameState.pic, options).draw();
            GRGold.create(context, gameState.goldScreenXY, gameState.pic).draw();
            GRGraph.create(context, field, graph, options).draw();
            GREater.create(
                context,
                gameState.manScreenXY,
                gameState.manAni,
                gameState.pic,
                gameState.miniCounter
            ).draw();
            gameState.highlightCells.forEach((point: Point2D) => {
                GRSelect.create(context, point, gameState.pic).draw();
            });
        }, [gameState, canvas, graph, picLoaded]);

        return (
            <GameControls
                id={id}
                title={title}
                canvasW={canvasW}
                canvasH={canvasH}
                ref={canvasRef}
                ctrl={ctrl}
                gameState={gameState}
            />
        );
    }
);
