import React from 'react';
import { render } from 'react-dom';
import { App } from './components';
import { Graph, SILENT, VERBOSE } from './Graph';

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

console.log(
    Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .calcVertices()
        .printVertices('vertices after init')
);

console.log(
    Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .calcVertices()
        .calcVerticesCost(6, 0, VERBOSE)
        .calcCheapestPath(6, 0)
        .printEdgesInCheapestPath(6, 0)
);

const g = Graph.create()
    .initFromAdjacencyString(adjacencyMatrix)
    .calcEdges()
    .calcVertices()
    .calcVerticesCost(6, 0, SILENT)
    .calcCheapestPath(6, 0);
console.log(g.printPathFromTo(6, 0));

render([<App key="1" graph={g} />], document.getElementById('root'));
