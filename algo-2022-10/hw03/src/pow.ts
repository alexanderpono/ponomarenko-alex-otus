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
