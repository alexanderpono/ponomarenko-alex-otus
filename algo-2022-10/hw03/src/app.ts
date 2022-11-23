function pow2(N: number) {
    let k = 1;
    while (k * 2 <= N) {
        k = k * 2;
    }
    return k;
}

for (let i = 0; i < 10; i++) {
    console.log(`pow2(${i})=`, `${pow2(i)} + ${i - pow2(i)}`);
}
