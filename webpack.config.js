const path = require('path');

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, 'js/client/main.js')
        ],
        vendor: ['phaser']
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build',
        chunkFilename: '[id].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src/'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
    }
}
