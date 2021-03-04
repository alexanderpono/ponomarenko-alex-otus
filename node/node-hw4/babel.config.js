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
    plugins: [
        ['@babel/plugin-proposal-class-properties'],
        ['module-alias', { src: './ui-src', expose: '@ui-src' }]
    ],
    env: {
        production: {
            plugins: []
        },
        development: {
            plugins: []
        }
    }
};
