module.exports = [
    {
        test: /\.(js|ts)x?$/,
        use: {
            loader: 'babel-loader'
        },
        exclude: /node_modules/
    },
    {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader?name=./images/[name].[ext]'
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    }
];
