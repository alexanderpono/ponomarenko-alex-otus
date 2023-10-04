import React from 'react';
import { GameFieldController, GameState } from './Game.types';
import parse from 'html-react-parser';

interface GameFieldUIProps {
    id: string;
    title: string;
    canvasW?: number;
    canvasH?: number;
    ctrl: GameFieldController;
    gameState: GameState;
}

export const GameControls = React.forwardRef<HTMLCanvasElement, GameFieldUIProps>(
    ({ id, title, canvasW, canvasH, ctrl, gameState }, canvasRef) => {
        return (
            <>
                {title && <h3>{parse(title)}</h3>}
                <div className="canvas">
                    <canvas height={canvasH} width={canvasW} id="GraphUI" ref={canvasRef}></canvas>
                </div>
                {gameState.showControls && (
                    <div className="controls">
                        {gameState.showBtNodes &&
                            Label(gameState.nodesChecked, ctrl.nodesClicked, `${id}-nodes`, 'Узлы')}
                        {gameState.showBtEdges &&
                            Label(
                                gameState.linesChecked,
                                ctrl.linesClicked,
                                `${id}-lines`,
                                'Ребра'
                            )}
                        {gameState.showBtPath &&
                            Label(gameState.pathChecked, ctrl.pathClicked, `${id}-path`, 'Путь')}
                        {gameState.showBtCost &&
                            Label(
                                gameState.nodesCostChecked,
                                ctrl.nodesCostClicked,
                                `${id}-nodesCost`,
                                'Стоимость'
                            )}
                        {gameState.showBtMap &&
                            Label(gameState.mapChecked, ctrl.mapClicked, `${id}-map`, 'Карта')}
                        {gameState.showBtStartStop && (
                            <>
                                <button onClick={ctrl.onBtStartClick} className="appButton">
                                    Старт
                                </button>
                                <button onClick={ctrl.onBtClearClick} className="appButton">
                                    Стоп
                                </button>
                            </>
                        )}
                        {gameState.showProgress && (
                            <>
                                <button onClick={ctrl.onBtToStartClick} className="appButton">
                                    |&lt;
                                </button>
                                <button onClick={ctrl.onBtPrevClick} className="appButton">
                                    &lt;
                                </button>
                                <button onClick={ctrl.onBtNextClick} className="appButton">
                                    &gt;
                                </button>
                                <button onClick={ctrl.onBtNextJumpClick} className="appButton">
                                    &gt;&gt;
                                </button>
                                <button onClick={ctrl.onBtToFinishClick} className="appButton">
                                    &gt;|
                                </button>
                                <label>
                                    {gameState.maxCalcStep}
                                    <input
                                        type="range"
                                        name="volume"
                                        min="0"
                                        max="200"
                                        value={gameState.maxCalcStep}
                                        onChange={ctrl.onMaxStepChange}
                                    />
                                </label>
                            </>
                        )}
                    </div>
                )}
            </>
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
