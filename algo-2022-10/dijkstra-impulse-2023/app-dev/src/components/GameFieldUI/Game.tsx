import { GameField, Point2D, defaultPoint2D } from '@src/game/GameField';
import React from 'react';
import ImgSprite from './sprite.png';
import { GameFieldUI } from './GameFieldUI';
import { GameFieldController } from './Game.types';
import { GraphFromField } from '@src/game/GraphFromField';
import { ALL_NODES, GraphCalculator, SILENT } from '@src/game/GraphCalculator';
import { ManAni, SPRITE_HEIGHT, SPRITE_WIDTH } from '@src/ports/GR.types';

export interface RenderOptions {
    nodes: boolean;
    lines: boolean;
    path: boolean;
    nodesCost: boolean;
    nodesShortCost: boolean;
    map: boolean;
    highlightCells: Point2D[];
}
export const defaultRenderOptions: RenderOptions = {
    nodes: false,
    lines: false,
    path: false,
    nodesCost: false,
    nodesShortCost: true,
    map: false,
    highlightCells: []
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
    const [emptyField, setEmptyField] = React.useState(GameField.create());
    const [manVIndex, setManVIndex] = React.useState(-1);
    const [nextManVIndex, setNextManVIndex] = React.useState(-1);
    const [manFieldXY, setManFieldXY] = React.useState({ ...defaultPoint2D });
    const [nextManFieldXY, setNextManFieldXY] = React.useState({ ...defaultPoint2D });
    const [picLoaded, setPicLoaded] = React.useState(false);

    const [game, setGameState] = React.useState({
        nodesChecked: startRender.nodes,
        linesChecked: startRender.lines,
        pathChecked: startRender.path,
        nodesCostChecked: startRender.nodesCost,
        nodesShortCost: startRender.nodesShortCost,
        mapChecked: startRender.map,
        showControls: typeof showControls === 'boolean' ? showControls : true,
        pic: new Image(),
        canvas: null,
        goldScreenXY: { ...defaultPoint2D },
        manScreenXY: { ...defaultPoint2D },
        manFieldXY: { ...defaultPoint2D },
        miniCounter: 0,
        manAni: ManAni.STAND,
        highlightCells: startRender.highlightCells,
        showBtMap: false
    });

    React.useEffect(() => {
        const pic = game.pic;
        pic.src = ImgSprite;

        pic.onload = () => {
            setPicLoaded(true);
        };
        setGameState({ ...game, pic });
    }, []);

    const getEmptyMap = (s: string): string => {
        let s2 = s.replace('$', ' ');
        s2 = s2.replace('M', ' ');
        return s2;
    };
    const calcManScreenPos = (
        manFieldXY: Point2D,
        nextManFieldXY: Point2D,
        miniCounter: number
    ) => {
        const deltaX = nextManFieldXY.x - manFieldXY.x;
        const deltaY = nextManFieldXY.y - manFieldXY.y;
        const manScreenXY = {
            x: (manFieldXY.x + (deltaX / 10) * (miniCounter % 10)) * SPRITE_WIDTH,
            y: (manFieldXY.y + (deltaY / 10) * (miniCounter % 10)) * SPRITE_HEIGHT
        };
        return manScreenXY;
    };

    const onBtStartClick = React.useCallback(() => {
        const mIndex = GraphFromField.getVertexIndex(map, 'M');
        const dIndex = GraphFromField.getVertexIndex(map, '$');
        const nextManVIndex = mIndex;
        setManVIndex(mIndex);
        setNextManVIndex(nextManVIndex);
        let graph = new GraphFromField().graphFromField(emptyField, calcCost);
        graph = new calculator().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);
        setGraph(graph);
        const w = emptyField.getWidth();
        const manFieldXY = gameField.vertexIndexToCoords(mIndex, w);
        const nextManFieldXY = gameField.vertexIndexToCoords(nextManVIndex, w);
        setManFieldXY(manFieldXY);
        setNextManFieldXY(nextManFieldXY);
    }, [map, gameField, emptyField]);

    React.useEffect(() => {
        const emptyMap = getEmptyMap(map);
        const field = GameField.create().initFromText(emptyMap);
        setEmptyField(field);

        const gameField = GameField.create().initFromText(map);
        let graph = new GraphFromField().graphFromField(gameField, calcCost);
        const mIndex = GraphFromField.getVertexIndex(map, 'M');
        const dIndex = GraphFromField.getVertexIndex(map, '$');
        graph = new calculator().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);
        const w = gameField.getWidth();
        const goldScreenXY = gameField.vertexIndexToCoords(dIndex, w);
        const manFieldXY = gameField.vertexIndexToCoords(mIndex, w);
        const manScreenXY = calcManScreenPos(manFieldXY, nextManFieldXY, game.miniCounter);
        console.log('manFieldXY=', manFieldXY);
        console.log('goldScreenXY=', goldScreenXY);
        console.log('manScreenXY=', manScreenXY);

        setGraph(graph);
        setGameField(gameField);
        setGameState({ ...game, goldScreenXY, manFieldXY, manScreenXY });
        // setTimeout(() => {
        // onBtStartClick();
        // }, 1000);
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
        onBtStartClick,
        onBtClearClick: () => {}
    };
    const w = typeof canvasW === 'number' ? canvasW : 720;
    const h = typeof canvasH === 'number' ? canvasH : 320;
    return (
        <GameFieldUI
            field={gameField}
            emptyField={emptyField}
            graph={graph}
            id={id}
            title={title}
            canvasW={w}
            canvasH={h}
            ref={canvasRef}
            canvas={canvas}
            ctrl={ctrl}
            gameState={game}
            picLoaded={picLoaded}
        />
    );
};
