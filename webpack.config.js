var htmlLoader = require('html-loader');

module.exports = {
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
