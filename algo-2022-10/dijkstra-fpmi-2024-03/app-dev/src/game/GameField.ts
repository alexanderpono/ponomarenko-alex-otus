export enum Cell {
    man = 3,
    wall = 2,
    stairs = 1,
    space = 0,
    gold = 4,
    teleport = 5
}
enum FieldChars {
    wall = '▓',
    stairs = '╡',
    man = 'M',
    gold = '$',
    teleport = '1'
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
        // console.log('initFromText() text=', text);
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

                    case FieldChars.teleport:
                        fieldLine[index] = Cell.teleport;
                        break;

                    default:
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
