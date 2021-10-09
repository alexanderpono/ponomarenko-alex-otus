const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackRules = require('./webpack.rules');

module.exports = {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    entry: './src/app.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        open: true,
        port: 8081
    },
    module: {
        rules: [
            ...webpackRules,
        ]
    }
};
