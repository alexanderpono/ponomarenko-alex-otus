const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackRules = require('./webpackRules');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    console.log('argv=', argv);
    const mypath =
        argv.app === 'present0'
            ? path.join(__dirname, '/ui-dist')
            : path.join(__dirname, '/ui-dist/ui-dist');
    const plugins =
        argv.app === 'present0'
            ? [
                  new HtmlWebpackPlugin({
                      template: './public/index.html'
                  }),
                  new CopyPlugin({
                      patterns: [{ from: 'public/sprite.png' }]
                  })
              ]
            : [
                  new CopyPlugin({
                      patterns: [
                          {
                              from: 'public/sprite.png',
                              to: path.join(__dirname, '/ui-dist/sprite.png')
                          },
                          {
                              from: 'bundled/index.html',
                              to: path.join(__dirname, '/ui-dist/index.html')
                          },
                          { from: 'bundled/shower', to: path.join(__dirname, '/ui-dist/shower') },
                          { from: 'bundled/ok.png', to: path.join(__dirname, '/ui-dist/ok.png') }
                      ]
                  })
              ];

    const config = {
        entry: './ui-src/index.tsx',
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
                types: path.resolve(__dirname, 'src/types')
            }
        },
        output: {
            path: mypath,
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
        plugins
    };

    return config;
};

