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
        ],
        '@babel/preset-typescript',
        '@babel/preset-react'
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
        production: {
            plugins: []
        },
        development: {
            plugins: []
        }
    }
};
