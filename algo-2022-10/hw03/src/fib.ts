export function fibRecursive(N: number): number {
    if (N === 0 || N === 1) {
        return N;
    }

    return fibRecursive(N - 2) + fibRecursive(N - 1);
}

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
