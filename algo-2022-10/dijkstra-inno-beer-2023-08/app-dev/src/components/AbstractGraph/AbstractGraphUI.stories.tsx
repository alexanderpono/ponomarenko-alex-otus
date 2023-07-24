import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { AbstractGraphUI } from './AbstractGraphUI';
import { GraphCalculator, SILENT } from './GraphCalculator';
import { Vertex2D } from './2D.types';

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
    console.log(
        '\nadjacencyMatrix=',
        JSON.stringify(
            GraphCalculator.create().initFromAdjacencyString(adjacencyMatrix).getMatrix()
        )
    );

    console.log(
        GraphCalculator.create().initFromAdjacencyString(adjacencyMatrix).calcEdges().printEdges()
    );

    const g = GraphCalculator.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .calcVertices()
        .calcVerticesCost(6, 0, SILENT, 10)
        .calcCheapestPath(6, 0);

    return (
        <AbstractGraphUI graph={g} caption={'caption'} showBestPath={true} vertices2D={vertices} />
    );
};
