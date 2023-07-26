import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { GameFieldUI } from './GameFieldUI';
import { GameField } from '@src/game/GameField';
import { GraphFromField } from '@src/game/GraphFromField';

export default {
    title: 'GameFieldUI',
    decorators: [withKnobs]
};

export const Static2 = () => {
    const fieldS2 = `
▓ M              ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;
    const gameField = GameField.create().initFromText(fieldS2);
    const getEdgeSimpleCost = (): number => 1;
    const graph = new GraphFromField().graphFromField(gameField, getEdgeSimpleCost);

    const options = {
        nodes: false,
        lines: false,
        path: false,
        nodesCost: false,
        map: true
    };
    return (
        <GameFieldUI
            field={gameField}
            graph={graph}
            render={options}
            id="GameFieldUI"
            title="GameFieldUI"
        />
    );
};
