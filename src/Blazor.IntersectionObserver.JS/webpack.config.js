const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: 'production',
    resolve: {
        extensions: [".ts"]
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader"
            }
        ]
    },
    entry: {
        "blazor.intersection-observer": "./src"
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name].js"
    }
};
