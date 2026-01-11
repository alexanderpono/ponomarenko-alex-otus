const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = 2233;
const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');
const host = 'localhost';

module.exports = (_, args) => {
    return {
        devtool: 'source-map',
        context: src,
        devServer: {
            open: true,
            port,
            hot: true,
            historyApiFallback: true,
            host
        },
        resolve: {
            modules: [src, 'node_modules'],
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
                src
            }
        },

        entry: './index.tsx',
        output: {
            path: dist,
            publicPath:
                args.mode === 'development'
                    ? `http://${host}:${port}/`
                    : undefined /* <- прописать данные своего github */,
            filename: `js/[name].js`,
            chunkFilename: `js/[name].js`
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    loader: require.resolve('babel-loader'),
                    exclude: /node_modules/
                },
                {
                    test: /\.svg/,
                    type: 'asset/inline'
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
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                favicon: './favicon.svg'
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].css'
            }),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    configFile: path.join(__dirname, 'tsconfig.json')
                }
            })
        ]
    };
};
