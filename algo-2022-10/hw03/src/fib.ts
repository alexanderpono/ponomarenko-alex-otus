import { powIterative } from './pow';

// рекурсивный O(2^N) алгоритм поиска чисел Фибоначчи.
export function fibRecursive(N: number): number {
    if (N === 0 || N === 1) {
        return N;
    }

    return fibRecursive(N - 2) + fibRecursive(N - 1);
}

// итеративный O(N) алгоритм поиска чисел Фибоначчи.
export function fibIterative(N: number): number {
    let a: number = 0;
    let b: number = 1;
    let c: number = N;
    for (let i = 2; i <= N; i++) {
        c = a + b;
        a = b;
        b = c;
    }

    return c;
}

//алгоритм поиска чисел Фибоначчи по формуле золотого сечения.
export function fibGoldenSection(N: number): number {
    let sqrt5 = Math.sqrt(5);
    let phi = (1 + sqrt5) / 2;
    let fib = Math.floor(powIterative(phi, N) / sqrt5 + 0.5);
    return fib;
}

// (a, b)
// (c, d)
export interface Matrix2x2 {
    a: number;
    b: number;
    c: number;
    d: number;
}

export function mult2x2(m1: Matrix2x2, m2: Matrix2x2): Matrix2x2 {
    return {
        a: m1.a * m2.a + m1.b * m2.c,
        b: m1.a * m2.b + m1.b * m2.d,
        c: m1.c * m2.a + m1.d * m2.c,
        d: m1.c * m2.b + m1.d * m2.d
    };
}

export function fibMultMatrix(N: number): number {
    if (N === 0 || N === 1) {
        return N;
    }
    const BASE_MATRIX: Matrix2x2 = { a: 1, b: 1, c: 1, d: 0 };
    let resultMatrix = { ...BASE_MATRIX };
    for (let i = 2; i < N; i++) {
        resultMatrix = mult2x2(resultMatrix, BASE_MATRIX);
    }
    return resultMatrix.a;
}

// O(LogN) алгоритм возведения матрицы в степень через двоичное разложение показателя степени
export function powMatrix2x2(m: Matrix2x2, N: number): Matrix2x2 {
    if (N <= 1) {
        return m;
    }
    let d = { ...m };
    let result = { ...m };
    let curN = N - 1;
    while (curN >= 1) {
        if (curN % 2 > 0) {
            result = mult2x2(result, d);
        }
        d = mult2x2(d, d);
        curN = Math.floor(curN / 2);
    }
    return result;
}

// алгоритм поиска чисел Фибоначчи O(LogN) через умножение матриц
export function fibMatrixBinaryDecompositionOfPower(N: number): number {
    const BASE_MATRIX: Matrix2x2 = { a: 1, b: 1, c: 1, d: 0 };

    if (N === 0) {
        return 0;
    }
    const result = powMatrix2x2(BASE_MATRIX, N - 1);
    return result.a;
}
