module.exports = [
    {
        test: /\.(ts)x?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    },
    {
        test: /\.scss$/,
        use: [
            {
                loader: 'style-loader',
                options: {
                    esModule: false,
                },
            },
            {
                loader: 'dts-css-modules-loader',
                options: {
                    namedExport: true,
                },
            },
            {
                loader: 'css-loader',
                options: {
                    // options for the v5 of css-loader
                    modules: {
                        exportLocalsConvention: 'camelCaseOnly',
                        localIdentName: '[local]',
                    },
                },
            },
            'sass-loader',
        ],
    },
];
