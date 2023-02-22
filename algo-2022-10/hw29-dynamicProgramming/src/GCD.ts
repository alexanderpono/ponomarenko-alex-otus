export const GCD = (a: number, b: number): number => {
    if (a === b) {
        return a;
    }

    if (a > b) {
        return GCD(a - b, b);
    } else {
        return GCD(a, b - a);
    }
};
