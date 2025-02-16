const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/assets/index-dev.html'
        }),
        new CompressionWebpackPlugin(),
        new MiniCssExtractPlugin({
            chunkFilename: '[name].[chunkhash].css'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
        alias: {
            '@src': 'src'
        }
    },
    entry: {
        warlords: './src/main.tsx'
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        assetModuleFilename: '[path][name]-[hash:8][ext]',
        sourceMapFilename: '[file].map',
        path: path.resolve(__dirname, 'temp/ui-dist'),
        clean: true
    },
    devServer: {
        open: true,
        port: 8707,
        historyApiFallback: true,
        client: {
            progress: true
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-modules-typescript-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]-[hash:8]'
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset/resource'
            }
        ]
    },
    devtool: 'source-map',
    target: ['web', 'es6'],
    optimization: {
        minimizer: ['...', new CssMinimizerWebpackPlugin()]
    }
};
