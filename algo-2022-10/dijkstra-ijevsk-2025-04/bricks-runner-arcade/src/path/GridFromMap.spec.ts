import { LevelMap, Point2D } from '@src/game/LevelMap';
import { GridFromMap } from './GridFromMap';
import { Edge, Grid, UNDEFINED_COST } from './path.types';
import { COST_SPACE } from './PathCalculator';
import { cases } from './GridFromMap.cases';

interface CanvasCell {
    u: number;
    d: number;
    l: number;
    r: number;
}
const defaultCanvasCell: CanvasCell = {
    u: 0,
    d: 0,
    l: 0,
    r: 0
};
const gridToString = (grid: Grid, map: LevelMap): string => {
    const canvasLine: CanvasCell[] = [];
    new Array(map.getWidth()).fill('').map(() => {
        canvasLine.push({ ...defaultCanvasCell });
    });

    const canvas: CanvasCell[][] = [];
    new Array(map.getHeight()).fill('').map(() => {
        canvas.push(JSON.parse(JSON.stringify(canvasLine)));
    });

    const line = (v0: Point2D, v1: Point2D, color: string) => {
        if (color === 'red') {
            return;
        }
        console.log(`line(${v0.x}, ${v0.y}), (${v1.x}, ${v1.y}), ${color}`);
        if (v0.y === v1.y && v0.x < v1.x) {
            if (Math.floor(v0.x) === v0.x) {
                canvas[v0.y][v0.x].r = 1;
            }
            if (Math.floor(v1.x) === v1.x) {
                canvas[v1.y][v1.x].l = 1;
            }
        }
        if (v0.x === v1.x && v0.y < v1.y) {
            if (Math.floor(v0.y) === v0.y) {
                canvas[v0.y][v0.x].d = 1;
            }
            if (Math.floor(v1.y) === v1.y) {
                canvas[v1.y][v1.x].u = 1;
            }
        }
        console.log('line canvas=', canvas);
    };

    const drawEdge = (edge: Edge, index: number) => {
        const w = map.getWidth();
        const v0x = edge.vertex0 % w;
        const v0y = Math.floor(edge.vertex0 / w);
        const v1x = edge.vertex1 % w;
        const v1y = Math.floor(edge.vertex1 / w);

        let color: string;
        const midX = (v0x + v1x) / 2;
        const midY = (v0y + v1y) / 2;
        if (edge.cost.v0v1Cost !== UNDEFINED_COST) {
            color = edge.cost.v0v1Cost === COST_SPACE ? 'green' : 'red';
            line({ x: v0x, y: v0y }, { x: midX, y: midY }, color);

            color = edge.cost.v1v0Cost === COST_SPACE ? 'green' : 'red';
        } else {
            color = 'green';
        }
        console.log(`drawEdge(${index}) color=`, color);
        line({ x: midX, y: midY }, { x: v1x, y: v1y }, color);
    };

    const renderLines = () => {
        grid.edges.forEach((edge: Edge, index: number) => {
            drawEdge(edge, index);
        });
    };

    const canvasToString = () => {
        const lines = canvas.map((canvasLine: CanvasCell[]): string => {
            const line = canvasLine.map((cell: CanvasCell): string => {
                const cellS = `${cell.u ? 'u' : ''}${cell.d ? 'd' : ''}${cell.l ? 'l' : ''}${
                    cell.r ? 'r' : ''
                }`;
                console.log('cellS=', JSON.stringify(cellS));
                switch (cellS) {
                    case 'r':
                        return '╶';
                    case 'l':
                        return '╴';
                    case 'd':
                        return '╷';
                    case 'u':
                        return '╵';
                    case '':
                        return '▓';
                    case 'dl':
                        return '┐';
                    case 'dr':
                        return '┌';
                    case 'ul':
                        return '┘';
                    case 'ur':
                        return '└';
                    case 'dlr':
                        return '┬';
                    case 'ulr':
                        return '┴';
                    case 'udlr':
                        return '┼';
                    case 'ud':
                        return '│';
                    case 'lr':
                        return '─';
                    default:
                        return '?';
                }
            });
            console.log('line=', line.join(''));
            return line.join('');
        });
        return lines.join('\n');
    };

    renderLines();
    console.log('gridToString() canvas2=', JSON.stringify(canvas));
    const result = canvasToString();

    return result;
};

describe('GridFromMap', () => {
    describe('gridFromMap()', () => {
        test.each`
            level             | projection | expected
            ${'▓  ▓'}         | ${null}    | ${'▓╶╴▓'}
            ${cases.c2.level} | ${null}    | ${cases.c2.expected}
            ${cases.c3.level} | ${null}    | ${cases.c3.expected}
            ${cases.c4.level} | ${null}    | ${cases.c4.expected}
            ${cases.c5.level} | ${null}    | ${cases.c5.expected}
            ${cases.c6.level} | ${null}    | ${cases.c6.expected}
            ${cases.c7.level} | ${null}    | ${cases.c7.expected}
            ${cases.c8.level} | ${null}    | ${cases.c8.expected}
        `('returns $expected from $level', ({ level, expected }) => {
            const map = LevelMap.create().initFromText(level);
            console.log('gridToString() map=', JSON.stringify(map));
            const builder = new GridFromMap();
            const grid = builder.gridFromMap(map);
            console.log('gridToString() grid=', JSON.stringify(grid.edges));
            const gridS = gridToString(grid, map);
            expect(gridS).toBe(expected.trim());
        });
    });
});
