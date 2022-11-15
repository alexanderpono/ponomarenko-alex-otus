//итеративный O(N) алгоритм возведения числа в степень.
export function powIterative(base: number, N: number): number {
    if (N === 0) {
        return 1;
    }
    let result = base;
    for (let i = 2; i <= N; i++) {
        result *= base;
    }
    return result;
}

// алгоритм возведения в степень через домножение O(N/2+LogN) = O(N)
export function powAddMult(base: number, N: number): number {
    if (N === 0) {
        return 1;
    }
    let curPower = 1;
    let nextPower = curPower * 2;
    let result = base;
    while (nextPower <= N) {
        curPower = nextPower;
        nextPower = curPower * 2;
        result = result * result;
    }

    const restPower = N - curPower;
    for (let i = 0; i < restPower; i++) {
        result = result * base;
    }
    return result;
}

//алгоритм возведения в степень через двоичное разложение показателя степени O(2LogN) = O(LogN)
export function powMultBinary(base: number, N: number): number {
    if (N === 0) {
        return 1;
    }
    let d = base;
    let result = 1;
    let curN = N;
    while (curN >= 1) {
        if (curN % 2 > 0) {
            result = result * d;
        }
        d = d * d;
        curN = Math.floor(curN / 2);
    }
    return result;
}
