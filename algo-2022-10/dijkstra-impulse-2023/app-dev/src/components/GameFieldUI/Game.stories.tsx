import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Game } from './Game';
import { GraphFromField } from '@src/game/GraphFromField';
import { GraphCalculator } from '@src/game/GraphCalculator';
import { GraphCalculatorV2 } from '@src/game/GraphCalculatorV2';
import { GraphFromFieldV2 } from '@src/game/GraphFromFieldV2';
import { GraphCalculatorV3 } from '@src/game/GraphCalculatorV3';

export default {
    title: 'Game',
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
    nodesShortCost: false,
    map: true,
    highlightCells: []
};

export const CalcWrong = () => {
    return (
        <Game
            options={options}
            id="GameFieldUI"
            title="GameFieldUI"
            map={map}
            calcCost={GraphFromField.getEdgeAdvancedCost}
            calculator={GraphCalculator}
        />
    );
};

export const CalcRight = () => {
    return (
        <Game
            options={options}
            id="GameFieldUI"
            title="GameFieldUI"
            map={map}
            calcCost={GraphFromField.getEdgeAdvancedCost}
            calculator={GraphCalculatorV2}
        />
    );
};

export const CalcRightLines = () => {
    return (
        <Game
            options={{
                nodes: false,
                lines: true,
                path: false,
                nodesCost: false,
                nodesShortCost: false,
                map: true,
                highlightCells: []
            }}
            id="GameFieldUI"
            title="GameFieldUI"
            map={map}
            calcCost={GraphFromField.getEdgeAdvancedCost}
            calculator={GraphCalculatorV2}
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
    return (
        <Game
            options={{
                nodes: false,
                lines: true,
                path: false,
                nodesCost: false,
                nodesShortCost: false,
                map: true,
                highlightCells: [
                    { x: 4, y: 0 },
                    { x: 4, y: 1 }
                ]
            }}
            id="GameFieldUI"
            title="GameFieldUI"
            map={map3}
            calcCost={GraphFromFieldV2.getEdgeAdvancedCost}
            calculator={GraphCalculatorV3}
        />
    );
};

export const AdvancedGraphPath = () => {
    return (
        <Game
            options={{
                nodes: false,
                lines: false,
                path: true,
                nodesCost: false,
                nodesShortCost: false,
                map: true,
                highlightCells: []
            }}
            id="GameFieldUI"
            title="GameFieldUI"
            map={map3}
            calcCost={GraphFromFieldV2.getEdgeAdvancedCost}
            calculator={GraphCalculatorV3}
        />
    );
};
