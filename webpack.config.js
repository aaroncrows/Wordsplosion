module.exports = {
  entry: ['webpack/hot/dev-server', __dirname + '/app/js/client.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build/'
  },
  resolve: {
    extensions: ['', '.js']
  }
}