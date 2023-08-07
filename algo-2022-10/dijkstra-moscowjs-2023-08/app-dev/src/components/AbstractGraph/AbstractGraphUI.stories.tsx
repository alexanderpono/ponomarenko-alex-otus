import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { AbstractGraphUI } from './AbstractGraphUI';
import { ALL_NODES, GraphCalculator, SILENT } from '@src/game/GraphCalculator';
import { GraphFromAdjString } from '@src/game/GraphFromAdjString';
import { renderEdges2D, renderVertices } from './AbstractGraph.const';

export default {
    title: 'AbstractGraphUI',
    decorators: [withKnobs]
};

export const Static = () => {
    const adjacencyMatrix = `
  AABBCCDDEEFFGG
AA..020306......
BB02..04..09....
CC0304..010706..
DD06..01....04..
EE..0907....0105
FF....060401..08
GG........0508..
`;

    console.log('adjacencyMatrix=', adjacencyMatrix);

    let graph = new GraphFromAdjString().graphFromAdjacencyString(adjacencyMatrix);
    graph = new GraphCalculator().calculateGraph(graph, 6, 0, SILENT, ALL_NODES);

    return (
        <AbstractGraphUI
            graph={graph}
            caption={'caption'}
            showBestPath={true}
            vertices2D={renderVertices}
            edges2D={renderEdges2D}
        />
    );
};
