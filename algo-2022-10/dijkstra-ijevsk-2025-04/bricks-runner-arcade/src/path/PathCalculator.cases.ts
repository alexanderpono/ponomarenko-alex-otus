const c2 = {
    level: `
▓   E  ▓
▓▓╡▓▓▓▓▓
▓ ╡  M ▓
▓▓▓▓▓▓▓▓
    `,
    expected: `
..**....
..*.....
..****..
........
                `
};

const c3 = {
    level: `
▓M~~ E▓
▓╡   ▓▓
▓▓▓▓▓▓▓
    `,
    expected: `
.*..*..
.****..
.......
                    `
};

const c4 = {
    level: `
▓M~ ~E▓
▓╡   ▓▓
▓▓▓▓▓▓▓
    `,
    expected: `
.*.**..
.***...
.......
                    `
};
export const cases = {
    c2,
    c3,
    c4
};
