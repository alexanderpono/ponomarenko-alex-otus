module.exports = [
    {
        test: /\.(ts)x?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
    },
];
