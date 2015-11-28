var istanbul = require('browserify-istanbul');

module.exports = function (config) {

    // toggle for coverage
    // current bug with code coverage minifies js files before error reporting
    // so all traces come back to the same line
    var doCoverage = true;

    var params = {
        basePath: '',
        dieOnError: false,
        files: [
          'unit/ChannelApi.spec.js'
        ],
        logLevel: config.LOG_INFO,
        exclude: [],
        autoWatch: true,
        frameworks: ['jasmine', 'browserify'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-browserify',
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-htmlfile-reporter'
        ],
        reporters: ['spec', 'coverage'],
        preprocessors: {
            'unit/ChannelApi.spec.js': ['browserify']
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        },
        browserify: {
            transform: [istanbul({
                ignore: ['**/node_modules/**', '**/test/**']
            })]
        }
    };

    config.set(params);
};
