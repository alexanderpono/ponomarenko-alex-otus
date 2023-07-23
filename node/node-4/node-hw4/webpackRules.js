module.exports = [
    {
        test: /\.(js|ts)x?$/,
        use: {
            loader: 'babel-loader'
        },
        exclude: /node_modules/
    }
];
