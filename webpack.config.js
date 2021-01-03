const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
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
        plugins: [new TsconfigPathsPlugin({ configFile: "./examples/tsconfig.test.json" })],
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        publicPath: "public",
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
};