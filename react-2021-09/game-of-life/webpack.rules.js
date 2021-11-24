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
];
