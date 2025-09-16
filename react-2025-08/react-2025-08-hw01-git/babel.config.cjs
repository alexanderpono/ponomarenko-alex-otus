module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                },
                debug: false,
                useBuiltIns: 'entry',
                corejs: '2.6.11'
            }
        ]
    ],
    plugins: [],
    env: {
        production: {
            plugins: []
        },
        development: {
            plugins: []
        }
    }
};
