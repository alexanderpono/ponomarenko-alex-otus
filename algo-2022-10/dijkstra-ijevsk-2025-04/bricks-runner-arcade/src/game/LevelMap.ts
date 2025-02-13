export enum Cell {
    wall = '▓',
    stairs = '╡',
    man = 'M',
    gold = '$',
    teleport = '1',
    space = ' ',
    coin = 'c',
    guard = 'E',
    pipe = '~'
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
            return Cell.wall;
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

    getDynanicObjects = (): DynamicObject[] => {
        const dynamicTypes = [Cell.gold, Cell.man, Cell.coin];
        const h = this.field.length;
        const w = this.field[0].length;
        const result: DynamicObject[] = [];
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const cell = this.field[y][x];
                const pos = dynamicTypes.findIndex((type) => type === cell);
                if (pos >= 0) {
                    result.push({ point: { x, y }, type: cell });
                }
            }
        }
        return result;
    };

    static create = (): LevelMap => {
        return new LevelMap();
    };
}
