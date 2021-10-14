const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".ts", ".json"],
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [],
};
