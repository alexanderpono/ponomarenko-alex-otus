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
            open: false,
            watchContentBase: true,
            port: 8082,
            setup: function (app, server) {
                app.get('/worker.js', function (req, res) {
                    res.status(200).type('text/javascript');
                    res.sendFile(__dirname + '/www/worker.js');
                });
            }
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
