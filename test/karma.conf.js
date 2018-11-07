// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const karmaJasmine = require('karma-jasmine');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaPhantomjsLauncher = require('karma-phantomjs-launcher');
const karmaJasmineHtmlReporter = require('karma-jasmine-html-reporter');
const karmaCoverageIstanbulReporter = require('karma-coverage-istanbul-reporter');
const generated = require('@angular-devkit/build-angular/plugins/karma');

module.exports = config => {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            karmaJasmine,
            karmaChromeLauncher,
            karmaPhantomjsLauncher,
            karmaJasmineHtmlReporter,
            karmaCoverageIstanbulReporter,
            generated
        ],
        client: { clearContext: false },
        coverageIstanbulReporter: {
            dir: './reports/tests/coverage/ng',
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true,
            thresholds: {
                statements: 80,
                lines: 80,
                branches: 0,
                functions: 60
            }
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true
    });
};
