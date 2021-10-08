const path = require('path');

module.exports = {
    plugins: [],
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
        ]
    }
}