export function getCountOfSummasForNumber(nDigits: number): number {
    return nDigits * 9 + 1;
}

export function createTableLine(size: number): number[] {
    return Array.apply(null, Array(size)).map(() => 0);
}

export function get10eN(n: number): number {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= 10;
    }
    return result;
}

export function getSummasCount(digitsCount: number): Record<string, number> {
    const lastN = get10eN(digitsCount);
    const summasCount = {};
    for (let i = 0; i < lastN; i += 10) {
        const digits = i
            .toString()
            .split('')
            .map((s: string) => Number(s));

        const summa = digits.reduce((prev, cur) => prev + cur, 0);
        summasCount[summa] = typeof summasCount[summa] === 'undefined' ? 1 : summasCount[summa] + 1;
    }
    return summasCount;
}

export function putSummasCountIntoVector(
    target: number[],
    summasCount: Record<string, number>
): number[] {
    const result = [...target];
    Object.entries(summasCount).forEach((entry) => {
        const summa = parseInt(entry[0]);
        const count = entry[1];
        result[summa] = count;
    });
    return result;
}

export function createMatrixFromLine(line0: number[]): number[][] {
    const matrixWidth = line0.length;
    const emptyLine = createTableLine(matrixWidth);
    const result2DAr: number[][] = [];
    result2DAr[0] = [...line0];
    const countToCopy = matrixWidth - 9;
    for (let i = 1; i < 10; i++) {
        const srcLine = result2DAr[i - 1];
        const newLine = [...emptyLine];
        const lastTargetIndexToCopy = i + countToCopy;
        for (let j = i; j < lastTargetIndexToCopy; j++) {
            newLine[j] = srcLine[j - 1];
        }
        result2DAr[i] = newLine;
    }

    return result2DAr;
}

export function getSummaOfEachColumn(ar: number[][]): number[] {
    const matrixWidth = ar[0].length;
    const summasInColumns = createTableLine(matrixWidth);
    for (let column = 0; column < matrixWidth; column++) {
        let columnSumma = 0;
        for (let line = 0; line < 10; line++) {
            columnSumma += ar[line][column];
        }
        summasInColumns[column] = columnSumma;
    }
    return summasInColumns;
}

export function getSquares(ar: number[]): number[] {
    return ar.map((n: number) => n * n);
}

export function getVectorSumma(ar: number[]): number {
    return ar.reduce((prev, cur) => prev + cur, 0);
}

export function getCountOfLuckyNumbers(N: number): number {
    const summasCount = getSummasCount(N);
    const line = createTableLine(getCountOfSummasForNumber(N));
    const line0 = putSummasCountIntoVector(line, summasCount);
    const matrix = createMatrixFromLine(line0);
    const summas = getSummaOfEachColumn(matrix);
    const squares = getSquares(summas);
    const result = getVectorSumma(squares);

    return result;
}
