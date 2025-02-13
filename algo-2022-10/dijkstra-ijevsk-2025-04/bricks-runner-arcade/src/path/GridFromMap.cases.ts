const c2 = {
    level: `
▓ ▓
▓ ▓
    `,
    expected: `
▓╷▓
▓▓▓
            `
};

const c3 = {
    level: `
▓  ▓
▓  ▓
▓▓▓▓
        `,
    expected: `
▓╷╷▓
▓╶╴▓
▓▓▓▓
`
};

const c4 = {
    level: `
▓  ▓
▓ ╡▓
▓▓▓▓
        `,
    expected: `
▓╷┐▓
▓╶┘▓
▓▓▓▓
`
};

const c5 = {
    level: `
▓   ▓
▓▓╡▓▓
▓ ╡ ▓
▓▓▓▓▓
            `,
    expected: `
▓╶┬╴▓
▓▓│▓▓
▓╶┴╴▓
▓▓▓▓▓
    `
};

const c6 = {
    level: `
▓   ▓
▓▓╡▓▓
▓ ╡ ▓
▓ ╡ ▓
▓▓▓▓▓
            `,
    expected: `
▓╶┬╴▓
▓▓│▓▓
▓╷┼╷▓
▓╶┴╴▓
▓▓▓▓▓
    `
};

const c7 = {
    level: `
▓ ~~ ▓
▓╡  ▓▓
▓▓▓▓▓▓
      `,
    expected: `
▓┌┬┬╴▓
▓└─╴▓▓
▓▓▓▓▓▓
        `
};

const c8 = {
    level: `
▓▓▓▓▓▓
▓ ~~ ▓
▓╡  ▓▓
▓▓▓▓▓▓
      `,
    expected: `
▓▓▓▓▓▓
▓┌┬┬╴▓
▓└─╴▓▓
▓▓▓▓▓▓
        `
};

export const cases = {
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c8
};
