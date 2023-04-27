const path = require('path');

const webpackRules = require('./webpackRules');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './ui-src/index.tsx',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            types: path.resolve(__dirname, 'src/types')
        }
    },
    output: {
        path: path.join(__dirname, '/ui-dist/ui-dist'),
        filename: 'index.js'
    },
    module: {
        rules: [...webpackRules]
    },
    devServer: {
        historyApiFallback: true,
        open: false,
        port: 8888,
        contentBase: './public'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public/sprite.png', to: path.join(__dirname, '/ui-dist/sprite.png') },
                { from: 'bundled/index.html', to: path.join(__dirname, '/ui-dist/index.html') },
                { from: 'bundled/shower', to: path.join(__dirname, '/ui-dist/shower') }
            ]
        })
    ]
};
