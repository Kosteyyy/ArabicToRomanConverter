const path = require("path");

module.exports = {
    entry: "./public/App.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devtool: "source-map", // Add this option for source mapping
    module: {
        rules: [{ test: /\.js$/, exclude:
            /node_modules/, loader: "babel-loader" }]
    }
};