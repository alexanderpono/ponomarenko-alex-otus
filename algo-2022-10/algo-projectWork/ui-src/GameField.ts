export enum Cell {
    man = 3,
    wall = 2,
    stairs = 1,
    space = 0,
    gold = 4
}
enum FieldChars {
    wall = '▓',
    stairs = '╡',
    man = 'M',
    gold = '$'
}

export interface Point2D {
    x: number;
    y: number;
}
export class GameField {
    field: Cell[][] = [];

    initFromText = (text: string) => {
        const lines = text.trim().split('\n');
        const fieldWidth = lines.reduce(
            (width: number, line) => (line.length < width ? width : line.length),
            0
        );

        this.field = lines.map((line: string): Cell[] => {
            const fieldLine = Array(fieldWidth).fill(Cell.space);
            line.split('').forEach((char: string, index) => {
                switch (char) {
                    case FieldChars.wall:
                        fieldLine[index] = Cell.wall;
                        break;

                    case FieldChars.stairs:
                        fieldLine[index] = Cell.stairs;
                        break;

                    case FieldChars.man:
                        fieldLine[index] = Cell.man;
                        break;

                    case FieldChars.gold:
                        fieldLine[index] = Cell.gold;
                        break;

                    default:
                        fieldLine[index] = Cell.space;
                }
            });
            return fieldLine;
        });
    };

    vertexIndexToCoords = (vertexIndex: number, w: number): Point2D => {
        const x = vertexIndex % w;
        const y = Math.floor(vertexIndex / w);
        return { x, y };
    };

    coordsToCell = (point: Point2D): Cell => {
        return this.field[point.y][point.x];
    };

    getEdgeSimpleCost = (): number => 1;

    getEdgeAdvancedCost = (v0Index: number, v1Index: number): number => {
        const COST_WALL = 100;
        const COST_SPACE = 1;
        const w = this.field[0].length;
        const cell0 = this.coordsToCell(this.vertexIndexToCoords(v0Index, w));
        const cell1 = this.coordsToCell(this.vertexIndexToCoords(v1Index, w));
        const cost = cell0 === Cell.wall || cell1 === Cell.wall ? COST_WALL : COST_SPACE;
        return cost;
    };

    static create = (): GameField => {
        return new GameField();
    };
}
