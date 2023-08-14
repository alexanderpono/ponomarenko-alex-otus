import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { AbstractGraphUI } from './AbstractGraphUI';
import { ALL_NODES, GraphCalculator, SILENT } from '@src/game/GraphCalculator';
import { GraphFromAdjString } from '@src/game/GraphFromAdjString';
import { adjacencyMatrix, renderEdges2D, renderVertices } from './AbstractGraph.const';

export default {
    title: 'AbstractGraphUI',
    decorators: [withKnobs]
};

export const Static = () => {
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
