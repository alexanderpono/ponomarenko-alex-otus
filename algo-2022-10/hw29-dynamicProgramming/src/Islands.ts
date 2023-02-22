export class Islands {
    getMatrixFromString = (s: string): number[][] => {
        console.log('Islands::getMatrixFromString() s=', s);
        const islandsMatrix = s
            .split('\n')
            .filter((line: string) => line.trim() !== '')
            .map((lineS: string) => lineS.split(' '))
            .map((lineArS: string[]): number[] =>
                lineArS.map((numberS: string) => parseInt(numberS))
            );
        return islandsMatrix;
    };

    countIslands = (srcIslandsMatrix: number[][]): number => {
        let islandsMatrix = srcIslandsMatrix.map((line: number[]) => line.concat());

        const N = islandsMatrix.length;
        let count = 0;
        console.log(
            'Islands::countIslands() islandsMatrix=',
            this.matrixToPrintable(islandsMatrix)
        );

        for (let y = 0; y < N; y++) {
            for (let x = 0; x < N; x++) {
                if (islandsMatrix[y][x] === 1) {
                    count++;
                    this.deleteIsland(islandsMatrix, y, x);
                    console.log(
                        'Islands::countIslands() after del islandsMatrix=',
                        this.matrixToPrintable(islandsMatrix)
                    );
                }
            }
        }
        return count;
    };

    deleteIsland = (islandsMatrix: number[][], y: number, x: number) => {
        const N = islandsMatrix.length;
        if (y >= 0 && x >= 0 && y < N && x < N && islandsMatrix[y][x] === 1) {
            islandsMatrix[y][x] = 0;
            this.deleteIsland(islandsMatrix, y - 1, x);
            this.deleteIsland(islandsMatrix, y, x - 1);
            this.deleteIsland(islandsMatrix, y, x + 1);
            this.deleteIsland(islandsMatrix, y + 1, x);
        }
    };

    matrixToPrintable = (islandsMatrix: number[][]): string => {
        return '\n' + islandsMatrix.map((lineAr: number[]) => lineAr.join(' ')).join('\n');
    };
}
