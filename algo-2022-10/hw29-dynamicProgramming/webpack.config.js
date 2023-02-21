const path = require('path');

module.exports = {
    mode: 'development',
    plugins: [
    ],
    resolve: {
        extensions: ['.js', '.ts']
    },
    entry: './src/app.ts',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/,
                loader: require.resolve('babel-loader'),
                exclude: /node_modules/
            }
        ]
    },
    target: 'node'
};
