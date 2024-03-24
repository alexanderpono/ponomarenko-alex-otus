export enum Cell {
    wall = '▓',
    stairs = '╡',
    man = 'M',
    gold = '$',
    teleport = '1',
    space = ' ',
    coin = 'c'
}

export interface Point2D {
    x: number;
    y: number;
}
export const defaultPoint2D: Point2D = {
    x: 0,
    y: 0
};

export class GameField {
    field: Cell[][] = [];

    initFromText = (text: string) => {
        const lines = text.trim().split('\n');
        const fieldWidth = lines.reduce(
            (width: number, line) => (line.length < width ? width : line.length),
            0
        );
        const cells = new Set(Object.values(Cell));

        this.field = lines.map((line: string): Cell[] => {
            const fieldLine = Array(fieldWidth).fill(Cell.space);
            line.split('').forEach((char: string, index) => {
                if (cells.has(char as Cell)) {
                    fieldLine[index] = char;
                } else {
                    fieldLine[index] = Cell.space;
                }
            });
            return fieldLine;
        });
        return this;
    };

    getWidth = () => this.field[0].length;

    vertexIndexToCoords = (vertexIndex: number, w: number): Point2D => {
        const x = vertexIndex % w;
        const y = Math.floor(vertexIndex / w);
        return { x, y };
    };

    coordsToCell = (point: Point2D): Cell => {
        const h = this.field.length;
        if (point.y < 0 || point.y >= h) {
            return Cell.wall;
        }
        return this.field[point.y][point.x];
    };

    static create = (): GameField => {
        return new GameField();
    };
}
