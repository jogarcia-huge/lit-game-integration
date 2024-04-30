const { resolve } = require('path');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: {
        game: ['./game-area.js'],
      },
      plugins: [],
      output: {
        filename: '[name].bundle.min.js',
        path: resolve(__dirname, 'dist'),
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: resolve('src/js'),
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(jpg|png)$/,
            use: {
              loader: 'url-loader',
            },
          },
          {
            test: /\.(js|jsx|ts|tsx)$/,
            use: [
              {
                loader: 'minify-html-literals-loader',
              },
            ],
          },
        ],
      },
}