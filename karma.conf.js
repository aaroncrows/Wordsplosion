var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/client/test_app.js',
      'test/client/**/*_test.js',
    ],

    preprocessors: {
      'test/client/test_app.js': ['webpack'],
      'test/**/*_test.js': ['webpack']
    },

    browsers: ['Chrome'],
    singleRun: true,
    webpack: webpackConfig,
  });
};