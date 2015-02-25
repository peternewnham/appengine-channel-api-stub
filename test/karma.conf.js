module.exports = function (config) {

    // toggle for coverage
    // current bug with code coverage minifies js files before error reporting
    // so all traces come back to the same line
    var doCoverage = true;

    var params = {
        basePath: '',
        dieOnError: false,
        files: [],
        exclude: [],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-htmlfile-reporter'
        ],
        reporters: ['spec', 'coverage', 'html'],
        htmlReporter: {
            outputFile: 'results/unit-tests.html'
        }
    };

    if (doCoverage) {

        params.preprocessors = {
            '../src/channel-api.js': 'coverage'
        };

        params.coverageReporter = {
            type: 'html',
            dir: 'coverage/'
        };

    }

    config.set(params);
};
