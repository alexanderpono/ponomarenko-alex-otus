import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { GameApp } from './Game';
import { GameField } from '@src/game/GameField';
import { GraphFromField } from '@src/game/GraphFromField';
import { ALL_NODES, GraphCalculator, SILENT } from '@src/game/GraphCalculator';
import { GraphCalculatorV2 } from '@src/game/GraphCalculatorV2';
import { GraphFromFieldV2 } from '@src/game/GraphFromFieldV2';
import { GraphCalculatorV3 } from '@src/game/GraphCalculatorV3';

export default {
    title: 'GameApp',
    decorators: [withKnobs]
};

const map = `
▓ M              ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

const options = {
    nodes: false,
    lines: false,
    path: true,
    nodesCost: false,
    map: true
};

export const CalcWrong = () => {
    const gameField = GameField.create().initFromText(map);
    let graph = new GraphFromField().graphFromField(gameField, GraphFromField.getEdgeAdvancedCost);

    const mIndex = GraphFromField.getVertexIndex(map, 'M');
    const dIndex = GraphFromField.getVertexIndex(map, '$');
    graph = new GraphCalculator().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);

    return (
        <GameApp
            field={gameField}
            graph={graph}
            render={options}
            id="GameFieldUI"
            title="GameFieldUI"
        />
    );
};

export const CalcRight = () => {
    const gameField = GameField.create().initFromText(map);
    let graph = new GraphFromField().graphFromField(gameField, GraphFromField.getEdgeAdvancedCost);

    const mIndex = GraphFromField.getVertexIndex(map, 'M');
    const dIndex = GraphFromField.getVertexIndex(map, '$');
    graph = new GraphCalculatorV2().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);

    return (
        <GameApp
            field={gameField}
            graph={graph}
            render={options}
            id="GameFieldUI"
            title="GameFieldUI"
        />
    );
};

export const CalcRightLines = () => {
    const gameField = GameField.create().initFromText(map);
    let graph = new GraphFromField().graphFromField(gameField, GraphFromField.getEdgeAdvancedCost);

    const mIndex = GraphFromField.getVertexIndex(map, 'M');
    const dIndex = GraphFromField.getVertexIndex(map, '$');
    graph = new GraphCalculatorV2().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);

    return (
        <GameApp
            field={gameField}
            graph={graph}
            render={{
                nodes: false,
                lines: true,
                path: false,
                nodesCost: false,
                map: true
            }}
            id="GameFieldUI"
            title="GameFieldUI"
        />
    );
};

const map3 = `
▓ M              ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

export const AdvancedGraphLines = () => {
    const gameField = GameField.create().initFromText(map3);
    let graph = new GraphFromField().graphFromField(
        gameField,
        GraphFromFieldV2.getEdgeAdvancedCost
    );

    const mIndex = GraphFromField.getVertexIndex(map3, 'M');
    const dIndex = GraphFromField.getVertexIndex(map3, '$');
    graph = new GraphCalculatorV3().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);

    return (
        <GameApp
            field={gameField}
            graph={graph}
            render={{
                nodes: false,
                lines: true,
                path: false,
                nodesCost: false,
                map: true
            }}
            id="GameFieldUI"
            title="GameFieldUI"
        />
    );
};

export const AdvancedGraphPath = () => {
    const gameField = GameField.create().initFromText(map3);
    let graph = new GraphFromField().graphFromField(
        gameField,
        GraphFromFieldV2.getEdgeAdvancedCost
    );

    const mIndex = GraphFromField.getVertexIndex(map3, 'M');
    const dIndex = GraphFromField.getVertexIndex(map3, '$');
    graph = new GraphCalculatorV3().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);

    return (
        <GameApp
            field={gameField}
            graph={graph}
            render={{
                nodes: false,
                lines: false,
                path: true,
                nodesCost: false,
                map: true
            }}
            id="GameFieldUI"
            title="GameFieldUI"
        />
    );
};
