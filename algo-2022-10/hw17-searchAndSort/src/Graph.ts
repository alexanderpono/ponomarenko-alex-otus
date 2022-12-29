const NULL = -1;
const MAX_VERTEX_COUNT = 100;

export class Graph {
    matrix: number[][] = [];
    constructor() {}

    initFromAdjacencyString = (s: string) => {
        const trimmed = s.trim();
        const lines = trimmed.split('\n');
        const matrix: number[][] = lines.reduce((result: number[][], line: string) => {
            const lineAr = line.split('').map((char: string) => (char === '1' ? 1 : 0));
            return [...result, lineAr];
        }, []);
        this.matrix = matrix;
        return this;
    };

    getMatrix = () => this.matrix;

    getColumnsSumma = (): number[] => {
        let summa = new Array(this.matrix[0].length).fill(0);
        for (let lineIndex = 0; lineIndex < this.matrix.length; lineIndex++) {
            const line = this.matrix[lineIndex];
            summa = this.addVector(summa, line);
        }
        return summa;
    };

    addVector = (a: number[], b: number[]): number[] => {
        const result = [...a];
        for (let i = 0; i < a.length; i++) {
            result[i] += b[i];
        }
        return result;
    };

    getZeroedVertices = (summa: number[]): number[] => {
        const result = summa.reduce((result: number[], item: number, index: number) => {
            if (item === 0) {
                return [...result, index];
            }
            return result;
        }, []);
        return result;
    };

    sortDemucron = () => {
        let summa = this.getColumnsSumma();
        console.log('sort() summa=', JSON.stringify(summa));

        const levels: number[][] = [];
        for (let levelIndex = 0; levelIndex < MAX_VERTEX_COUNT; levelIndex++) {
            const curLevel = this.getZeroedVertices(summa);
            console.log('sort() curLevel=', JSON.stringify(curLevel));
            if (curLevel.length === 0) {
                break;
            }
            for (let i = 0; i < curLevel.length; i++) {
                const vertexIndex = curLevel[i];
                summa = this.minusVector(summa, this.matrix[vertexIndex]);
                summa[vertexIndex] = NULL;
            }
            console.log(`sort() summa(${levelIndex + 1})=`, JSON.stringify(summa));
            levels.push(curLevel);
        }
        return levels;
    };

    minusVector = (a: number[], b: number[]): number[] => {
        const result = [...a];
        for (let i = 0; i < a.length; i++) {
            if (result[i] !== NULL) {
                result[i] -= b[i];
            }
        }
        return result;
    };

    static create(): Graph {
        return new Graph();
    }
}
