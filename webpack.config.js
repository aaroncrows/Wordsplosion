var config = {
  entry: [__dirname + '/app/js/client.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build/'
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: 'style!css!sass'},
      { test: /[\/]angular\.js$/, loader: "exports?angular" },
      { test: /\.html$/, loader: 'html' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['node_modules']
  }
};

if (process.env.NODE_ENV === 'production') {
  var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
  var CompressionPlugin = require('compression-webpack-plugin');

  config.plugins = [
    new UglifyJsPlugin(),
    new CompressionPlugin()
  ]
}

module.exports = config;

