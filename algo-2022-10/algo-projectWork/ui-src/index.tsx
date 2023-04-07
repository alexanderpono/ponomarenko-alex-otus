import React from 'react';
import { render } from 'react-dom';
import { Graph, SILENT, VERBOSE } from './Graph';
import { GameField } from './GameField';
import { GraphFromLesson } from './components/GraphFromLesson';
import { LRGameField } from './components/LRGameField';

// renderGraphFromLesson();

const field0 = `
▓ M             ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓
▓       ╡       ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓
▓           ╡   ▓
▓▓▓╡▓▓▓▓▓▓▓▓▓▓▓▓▓
▓  ╡         $  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
`;

enum CostAlgorithm {
    simple = 'simple',
    advanced = 'advanced'
}

// renderLRField(field0, CostAlgorithm.simple, 'field0');
// renderLRField(field0, CostAlgorithm.advanced, 'field1');

const field2 = `
▓ M             ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓
▓       ╡       ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓
▓           ╡   ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓
▓  ╡     ╡   $╡ ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
`;

renderLRField(field2, CostAlgorithm.advanced, 'field2');

function renderGraphFromLesson() {
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

    const g = Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .calcVertices()
        .calcVerticesCost(6, 0, SILENT)
        .calcCheapestPath(6, 0);
    console.log(g.printPathFromTo(6, 0));

    render([<GraphFromLesson graph={g} />], document.getElementById('GraphFromLesson'));
}

function renderLRField(fieldString: string, algo: CostAlgorithm, target: string) {
    const field = GameField.create();
    field.initFromText(fieldString);

    const algorithm =
        algo === CostAlgorithm.simple ? field.getEdgeSimpleCost : field.getEdgeAdvancedCost;

    const g2 = Graph.create().initFromField(field, algorithm);
    const mIndex = g2.getVertexIndex(fieldString, 'M');
    const dIndex = g2.getVertexIndex(fieldString, '$');
    g2.calcVerticesCost(mIndex, dIndex, SILENT).calcCheapestPath(mIndex, dIndex);
    console.log(g2.printPathFromTo(mIndex, dIndex));
    render(
        [
            <LRGameField
                field={field}
                graph={g2}
                render={{ nodes: false, lines: false, path: false, nodesCost: true }}
            />
        ],
        document.getElementById(target)
    );
}
