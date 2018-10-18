const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: `${__dirname}/main.html`,
    //         filename: 'main.html',
    //         inject: 'body',
    //     })
    // ],
    devtool: "eval-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist")
    }
    
}