const path = require('path');

module.exports = function () {
    return getDefaultConfig();
};

function getDefaultConfig() {
    return {
        plugins: [],
        entry: './src/client.js',
        output: {
            filename: 'client.js',
            path: path.resolve(__dirname, 'www')
        },
        devServer: {
            contentBase: './www',
            open: true,
            watchContentBase: true,
            port: 8082
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
    };
}
