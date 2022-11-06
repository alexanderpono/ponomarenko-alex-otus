console.log('aaa');

// let count = 0;
const solveRec = (N: number) => {
    var count = 0;
    solveI(N, 0, 0);

    return count;

    function solveI(remainingN: number, sumA: number, sumB: number) {
        if (remainingN === 0) {
            if (sumA === sumB) {
                count++;
            }
            return;
        }

        for (var a = 0; a <= 9; a++) {
            for (var b = 0; b <= 9; b++) {
                solveI(remainingN - 1, sumA + a, sumB + b);
            }
        }
    }

    //n - половина количества цифр
};

for (var n = 1; n <= 4; n++) {
    console.log(solveRec(n));
}

