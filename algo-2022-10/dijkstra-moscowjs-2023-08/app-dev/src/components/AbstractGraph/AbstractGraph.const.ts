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
        x: 80,
        y: 170,
        letter: 'А',
        costDx: -68,
        costDy: 10
    },
    {
        x: 190,
        y: 50,
        letter: 'Б',
        costDx: -25,
        costDy: -28
    },
    {
        x: 260,
        y: 170,
        letter: 'В',
        costDx: 25,
        costDy: 10
    },
    {
        x: 200,
        y: 290,
        letter: 'Г',
        costDx: -20,
        costDy: 50
    },
    {
        x: 400,
        y: 50,
        letter: 'Д',
        costDx: -10,
        costDy: -28
    },
    {
        x: 460,
        y: 290,
        letter: 'Е',
        costDx: -10,
        costDy: 50
    },
    {
        x: 590,
        y: 140,
        letter: 'Ё',
        costDx: 30,
        costDy: 10
    }
];
