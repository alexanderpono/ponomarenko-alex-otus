export enum Cell {
    grass = ' ',
    town = 'T',
    road = 'r',
    water = 'w',
    hill = 'h',
    forest = 'f',
    largeBuilding = 'B'
}

export interface Point2D {
    x: number;
    y: number;
}
export const defaultPoint2D: Point2D = {
    x: 0,
    y: 0
};

export interface DynamicObject {
    point: Point2D;
    type: Cell;
}

export class LevelMap {
    field: Cell[][] = [];
    private text: string = '';
    private w: number = 0;

    initFromText = (text: string) => {
        this.text = text;
        const lines = text.split('\n');
        const fieldWidth = lines.reduce(
            (width: number, line) => (line.length < width ? width : line.length),
            0
        );
        const cells = new Set(Object.values(Cell));

        this.field = lines.map((line: string): Cell[] => {
            const fieldLine = Array(fieldWidth).fill(Cell.grass);
            line.split('').forEach((char: string, index) => {
                if (cells.has(char as Cell)) {
                    fieldLine[index] = char;
                } else {
                    fieldLine[index] = Cell.grass;
                }
            });
            return fieldLine;
        });

        this.w = this.field[0].length;
        return this;
    };

    getWidth = () => this.field[0].length;
    getHeight = () => this.field.length;

    vertexIndexToCoords = (vertexIndex: number): Point2D => {
        const x = vertexIndex % this.w;
        const y = Math.floor(vertexIndex / this.w);
        return { x, y };
    };

    coordsToCell = (point: Point2D): Cell => {
        const h = this.field.length;
        if (point.y < 0 || point.y >= h) {
            return Cell.water;
        }
        return this.field[point.y][point.x];
    };

    getVertexIndex = (char: string): number => {
        const s = this.text.trim().split('\n').join('');
        return s.indexOf(char);
    };

    coordToVertexIndex = (point: Point2D): number => {
        return point.y * this.w + point.x;
    };

    charToCoords = (char: string): Point2D => {
        return this.vertexIndexToCoords(this.getVertexIndex(char));
    };

    static create = (): LevelMap => {
        return new LevelMap();
    };
}
