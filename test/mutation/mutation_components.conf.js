const strykerConfiguration = config => {
    config.set({

        coverageAnalysis: 'perTest',
        testFramework: 'jasmine',
        testRunner: 'jasmine',
        // jasmineConfigFile: 'spec/support/jasmine.json',
        mutator: 'javascript',

        transpilers: [],
        // babelrcFile: '.babelrc',

        reporter:
            [
                'clear-text',
                // 'progress',
                'html', 'progress'
            ],

        // mutate:
        //     [
        //         //'src/app/shared/components/**/*.ts'
        //         // 'src/app/shared/components/document-viewer/*.ts',
        //         'api/questions/*.spec.js'
        //         //'!app/assets/**/*.test.js'
        //     ],

        mutate: [
            'api/questions/*.js',
            '!api/questions/*.spec.js'
        ],
        files: ['**/*'],
        maxConcurrentTestRunners: 2,
        symlinkNodeModules: false,
        htmlReporter: { baseDir: './rep/' },

        // mochaOptions: {
        //     timeout: 3000,
        //     require: [ 'babel-register'],
        //     asyncOnly: false,
        //     files:
        //         [
        //             // 'src/app/shared/components/**/*.spec.ts'
        //             'api/auth/*.spec.js'
        //         ],
        //     timeout: 8000
        // },

        logLevel: 'debug',
        plugins:
            [
                // 'stryker-mocha-runner',
                'stryker-jasmine-runner',
                'stryker-jasmine',
                // 'stryker-mocha-framework',
                'stryker-javascript-mutator',
                'stryker-html-reporter'
            ]
    });
};

module.exports = strykerConfiguration;
