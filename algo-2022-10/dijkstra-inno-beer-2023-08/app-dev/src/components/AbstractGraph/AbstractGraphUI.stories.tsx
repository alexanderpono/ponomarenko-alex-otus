import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { AbstractGraphUI } from './AbstractGraphUI';
import { ALL_NODES, GraphCalculator, SILENT } from './GraphCalculator';
import { Vertex2D } from './2D.types';
import { GraphFromAdjString } from './GraphFromAdjString';

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

    const vertices: Vertex2D[] = [
        {
            x: 70,
            y: 170,
            letter: 'А'
        },
        {
            x: 190,
            y: 30,
            letter: 'Б'
        },
        {
            x: 260,
            y: 170,
            letter: 'В'
        },
        {
            x: 200,
            y: 320,
            letter: 'Г'
        },
        {
            x: 400,
            y: 50,
            letter: 'Д'
        },
        {
            x: 460,
            y: 280,
            letter: 'Е'
        },
        {
            x: 590,
            y: 140,
            letter: 'Ё'
        }
    ];

    console.log('adjacencyMatrix=', adjacencyMatrix);

    let graph = new GraphFromAdjString().graphFromAdjacencyString(adjacencyMatrix);
    graph = new GraphCalculator().calculateGraph(graph, 6, 0, SILENT, ALL_NODES);

    return (
        <AbstractGraphUI
            graph={graph}
            caption={'caption'}
            showBestPath={true}
            vertices2D={vertices}
        />
    );
};
