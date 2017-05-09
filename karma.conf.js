var webpackConfig = require('./webpack.config.js');
// config.entry = {};

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      // all files ending in "_test"
      {pattern: 'test/client/**/*_test.js', watched: false}
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/**/*_test.js': ['webpack']
    },

    browsers: ['Chrome'],
    singleRun: true,
    webpack: webpackConfig,
  });
};