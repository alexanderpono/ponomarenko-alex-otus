const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackRules = require('./webpackRules');

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
        path: path.join(__dirname, '/ui-dist'),
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
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
