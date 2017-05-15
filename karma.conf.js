var webpackConfig = require('./webpack.config.js');
// config.entry = {};

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/client/**/*_test.js',
    ],

    preprocessors: {
      'app/js/client.js': ['webpack'],
      'test/**/*_test.js': ['webpack']
    },

    browsers: ['Chrome'],
    singleRun: true,
    webpack: webpackConfig,
  });
};