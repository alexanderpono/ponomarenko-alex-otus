import { Edge2D, Vertex2D } from '@src/ports/2D.types';

export const renderEdges2D: Edge2D[] = [
    {
        costDx: -20,
        costDy: -10
    },
    {
        costDx: 0,
        costDy: -10
    },
    {
        costDx: 0,
        costDy: -5
    },
    {
        costDx: 7,
        costDy: 0
    },
    {
        costDx: 0,
        costDy: -6
    },
    {
        costDx: 12,
        costDy: 6
    },
    {
        costDx: -16,
        costDy: -6
    },
    {
        costDx: 0,
        costDy: -5
    },
    {
        costDx: -10,
        costDy: -10
    },
    {
        costDx: 7,
        costDy: 0
    },
    {
        costDx: 10,
        costDy: 0
    },
    {
        costDx: -20,
        costDy: -10
    }
];

export const renderVertices: Vertex2D[] = [
    {
        x: 90,
        y: 170,
        letter: 'А',
        costDx: -92,
        costDy: 10
    },
    {
        x: 200,
        y: 50,
        letter: 'Б',
        costDx: -28,
        costDy: -28
    },
    {
        x: 270,
        y: 170,
        letter: 'В',
        costDx: 25,
        costDy: 5
    },
    {
        x: 210,
        y: 290,
        letter: 'Г',
        costDx: -28,
        costDy: 50
    },
    {
        x: 410,
        y: 50,
        letter: 'Д',
        costDx: -19,
        costDy: -28
    },
    {
        x: 470,
        y: 290,
        letter: 'Е',
        costDx: -19,
        costDy: 50
    },
    {
        x: 600,
        y: 140,
        letter: 'Ё',
        costDx: 25,
        costDy: 10
    }
];

export const adjacencyMatrix = `
AABBCCDDEEFFGG
AA..030306......
BB03..04..09....
CC0304..010707..
DD06..01....04..
EE..0907....0105
FF....070401..08
GG........0508..
`;
