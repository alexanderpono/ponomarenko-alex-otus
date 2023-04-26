import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { LRGameField } from './LRGameField';
import { GameField } from '@ui-src/GameField';
import { Graph } from '@ui-src/Graph';

export default {
    title: 'LRGameField',
    decorators: [withKnobs]
};

export const Static = () => {
    const field = GameField.create();
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
    const field2 = GameField.create().initFromText(fieldS2);
    const graph2 = Graph.create().initFromField(field2, Graph.create().getEdgeAdvancedCost);

    const options = {
        nodes: false,
        lines: false,
        path: false,
        nodesCost: false,
        map: true
    };
    return (
        <LRGameField
            field={field}
            graph={graph2}
            render={options}
            id="LRGameField"
            title="LRGameField"
        />
    );
};
