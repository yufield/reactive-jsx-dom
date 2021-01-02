const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    devServer: {
        publicPath: "/",
        contentBase: "./public",
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        publicPath: "public",
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
};