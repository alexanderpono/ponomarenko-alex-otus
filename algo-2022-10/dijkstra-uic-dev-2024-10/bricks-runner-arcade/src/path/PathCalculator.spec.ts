import { Cell, LevelMap } from '@src/game/LevelMap';
import { GridFromMap } from './GridFromMap';
import { Edge, Grid } from './path.types';
import { ALL_NODES, PathCalculator, SILENT } from './PathCalculator';
import { cases } from './PathCalculator.cases';

type CanvasCell = string;
const defaultCanvasCell: CanvasCell = '';

const gridToString = (grid: Grid, map: LevelMap): string => {
    const canvasLine: CanvasCell[] = [];
    new Array(map.getWidth()).fill('').map(() => {
        canvasLine.push(defaultCanvasCell);
    });

    const canvas: CanvasCell[][] = [];
    new Array(map.getHeight()).fill('').map(() => {
        canvas.push(JSON.parse(JSON.stringify(canvasLine)));
    });

    const drawEdge = (edge: Edge) => {
        const w = map.getWidth();
        const v0x = edge.vertex0 % w;
        const v0y = Math.floor(edge.vertex0 / w);
        const v1x = edge.vertex1 % w;
        const v1y = Math.floor(edge.vertex1 / w);

        const v0 = map.coordsToCell({ x: v0x, y: v0y });
        const v1 = map.coordsToCell({ x: v1x, y: v1y });
        if (v0 !== Cell.guard) {
            canvas[v0y][v0x] = '*';
        }
        if (v1 !== Cell.guard) {
            canvas[v1y][v1x] = '*';
        }
    };

    const renderPath = () => {
        grid.cheapestPath.forEach((edgeIndex: number) => drawEdge(grid.edges[edgeIndex]));
    };

    const canvasToString = () => {
        const lines = canvas.map((canvasLine: CanvasCell[]): string => {
            const line = canvasLine.map((cell: CanvasCell): string => {
                const cellS = cell;
                switch (cellS) {
                    case '*':
                        return '*';
                    case '':
                        return '.';
                    default:
                        return '?';
                }
            });
            return line.join('');
        });
        return lines.join('\n');
    };

    renderPath();
    const result = canvasToString();

    return result;
};

describe('PathCalculator', () => {
    test.each`
        level             | expected
        ${'▓M E▓'}        | ${'.**..'}
        ${cases.c2.level} | ${cases.c2.expected}
        ${cases.c3.level} | ${cases.c3.expected}
        ${cases.c4.level} | ${cases.c4.expected}
    `('returns $expected from $level', ({ level, expected }) => {
        const map = LevelMap.create().initFromText(level);
        const builder = new GridFromMap();
        let grid: Grid = builder.gridFromMap(map);
        const eIndex = map.coordToVertexIndex(map.charToCoords('E'));
        const mIndex = map.coordToVertexIndex(map.charToCoords('M'));
        const pathCalculator = new PathCalculator();
        grid = pathCalculator.calculateGraph(grid, eIndex, mIndex, SILENT, ALL_NODES, map);

        const gridS = gridToString(grid, map);
        expect(gridS).toBe(expected.trim());
    });
});
