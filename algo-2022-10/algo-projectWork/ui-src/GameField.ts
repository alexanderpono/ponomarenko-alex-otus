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

    static create = (): GameField => {
        return new GameField();
    };
}
