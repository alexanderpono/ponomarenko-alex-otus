const path = require('path');

module.exports = {
    mode: 'development',
    plugins: [],
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    }
}