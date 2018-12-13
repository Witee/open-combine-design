const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: { 'index.js': 'src/libs/index.js' },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        // include: [path.resolve(__dirname, 'src/libs')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      moment: 'moment',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
    modules: ['./', 'node_modules'],
  },


  devtool: 'source-map',

  context: __dirname,

  externals: ['react', 'react-dom', nodeExternals()],
};
