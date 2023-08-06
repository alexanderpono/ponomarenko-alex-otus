import { GameField } from '@src/game/GameField';
import React from 'react';
import { AbstractGraph } from '@src/game/Graph.types';
import ImgSprite from './sprite.png';
import { GameFieldController, GameFieldUI } from './GameFieldUI';

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
interface GameProps {
    field: GameField;
    graph: AbstractGraph;
    render: RenderOptions;
    id: string;
    title: string;
    canvasW?: number;
    canvasH?: number;
    showControls?: boolean;
}

export const GameApp: React.FC<GameProps> = ({
    field,
    graph,
    render: startRender,
    id,
    title,
    canvasW,
    canvasH,
    showControls
}) => {
    const [game, setGameState] = React.useState({
        nodesChecked: startRender.nodes,
        linesChecked: startRender.lines,
        pathChecked: startRender.path,
        nodesCostChecked: startRender.nodesCost,
        mapChecked: startRender.map,
        picLoaded: false,
        showControls: typeof showControls === 'boolean' ? showControls : true,
        pic: new Image(),
        canvas: null
    });

    React.useEffect(() => {
        const pic = game.pic;
        pic.src = ImgSprite;

        pic.onload = function () {
            setGameState({ ...game, picLoaded: true });
        };
        setGameState({ ...game, pic });
    }, []);

    const canvasRef = React.createRef<HTMLCanvasElement>();
    const [canvas, setCanvas] = React.useState(null);
    React.useEffect(() => {
        setCanvas(canvasRef.current);
    }, [canvasRef.current]);
    const ctrl: GameFieldController = {
        nodesClicked: () => setGameState({ ...game, nodesChecked: !game.nodesChecked }),
        linesClicked: () => setGameState({ ...game, linesChecked: !game.linesChecked }),
        pathClicked: () => setGameState({ ...game, pathChecked: !game.pathChecked }),
        nodesCostClicked: () => setGameState({ ...game, nodesCostChecked: !game.nodesCostChecked }),
        mapClicked: () => setGameState({ ...game, mapChecked: !game.mapChecked })
    };
    const w = typeof canvasW === 'number' ? canvasW : 720;
    const h = typeof canvasH === 'number' ? canvasH : 320;
    return (
        <GameFieldUI
            field={field}
            graph={graph}
            id={id}
            title={title}
            canvasW={w}
            canvasH={h}
            ref={canvasRef}
            canvas={canvas}
            ctrl={ctrl}
            gameState={game}
        />
    );
};
