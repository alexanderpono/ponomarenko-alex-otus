import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { GraphFromLesson } from './GraphFromLesson';
import { Graph, SILENT } from '@ui-src/Graph';

export default {
    title: 'GraphFromLesson',
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
    console.log(
        '\nadjacencyMatrix=',
        JSON.stringify(Graph.create().initFromAdjacencyString(adjacencyMatrix).getMatrix())
    );

    console.log(Graph.create().initFromAdjacencyString(adjacencyMatrix).calcEdges().printEdges());

    const g = Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .calcVertices()
        .calcVerticesCost(6, 0, SILENT)
        .calcCheapestPath(6, 0);

    return <GraphFromLesson graph={g} />;
};
