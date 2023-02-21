const x5 = 0;
const x55 = 1;
const x8 = 2;
const x88 = 3;
const defaultWorkLine = [0, 0, 0, 0];

export class Solve5x8 {
    getWorkTable = (N: number): number[][] => {
        console.log('Solve5x8::getWorkTable() N=', N);
        const workTable: number[][] = Array(N)
            .fill(0)
            .map((_) => [...defaultWorkLine]);
        console.log('Solve5x8::getWorkTable() workTable=', workTable);

        workTable[0][x5] = 1;
        workTable[0][x55] = 0;
        workTable[0][x8] = 1;
        workTable[0][x88] = 0;

        for (let n = 1; n < N; n++) {
            workTable[n][x55] += workTable[n - 1][x5];
            workTable[n][x8] += workTable[n - 1][x5];
            workTable[n][x8] += workTable[n - 1][x55];
            workTable[n][x5] += workTable[n - 1][x8];
            workTable[n][x88] += workTable[n - 1][x8];
            workTable[n][x5] += workTable[n - 1][x88];
        }
        console.log('Solve5x8::getWorkTable() workTable=', workTable);
        return workTable;
    };

    getResultsTable = (workTable: number[][]) => {
        const resultTable = workTable.map(
            (line: number[]) => line[x5] + line[x55] + line[x8] + line[x88]
        );
        console.log('Solve5x8::getResultsTable() resultTable=', resultTable);
        return resultTable;
    };
    countNumbers = (resultsTable: number[], N: number): number => {
        return resultsTable[N - 1];
    };
}
