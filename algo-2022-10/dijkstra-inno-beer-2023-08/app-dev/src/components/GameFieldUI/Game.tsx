import { GameField } from '@src/game/GameField';
import React from 'react';
import ImgSprite from './sprite.png';
import { GameFieldUI } from './GameFieldUI';
import { GameFieldController } from './Game.types';
import { GraphFromField } from '@src/game/GraphFromField';
import { ALL_NODES, GraphCalculator, SILENT } from '@src/game/GraphCalculator';

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
    options: RenderOptions;
    id: string;
    title: string;
    canvasW?: number;
    canvasH?: number;
    showControls?: boolean;
    map: string;
    calcCost;
    calculator: typeof GraphCalculator;
}

export const Game: React.FC<GameProps> = ({
    options: startRender,
    id,
    title,
    canvasW,
    canvasH,
    showControls,
    map,
    calcCost,
    calculator
}) => {
    const [graph, setGraph] = React.useState(null);
    const [gameField, setGameField] = React.useState(GameField.create());
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

    React.useEffect(() => {
        const gameField = GameField.create().initFromText(map);
        let graph = new GraphFromField().graphFromField(gameField, calcCost);
        const mIndex = GraphFromField.getVertexIndex(map, 'M');
        const dIndex = GraphFromField.getVertexIndex(map, '$');
        graph = new calculator().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);
        setGraph(graph);
        setGameField(gameField);
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
        mapClicked: () => setGameState({ ...game, mapChecked: !game.mapChecked }),
        onBtStartClick: () => {},
        onBtClearClick: () => {}
    };
    const w = typeof canvasW === 'number' ? canvasW : 720;
    const h = typeof canvasH === 'number' ? canvasH : 320;
    return (
        <GameFieldUI
            field={gameField}
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
