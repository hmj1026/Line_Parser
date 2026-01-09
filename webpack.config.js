const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/i,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'dist/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ],
    devtool: 'eval-source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        hot: true,
        historyApiFallback: true,
        port: 8080
    }
};