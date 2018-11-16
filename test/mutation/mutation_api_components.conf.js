const strykerConfiguration = config => {
    config.set({
        coverageAnalysis: 'perTest',
        testFramework: 'jasmine',
        testRunner: 'jasmine',
        mutator: 'typescript',
        transpilers: ['typescript'],
        tsconfigFile: 'tsconfig.json',
        reporter:
            [
                'clear-text',
                'progress',
                'html'
            ],
        htmlReporter: { baseDir: 'rep' },
        mutate:
            [
                // 'src/app/shared/components/**/*.ts'
                // 'src/app/shared/components/document-viewer/*.ts'
                'src/app/shared/components/data-list/*.spec.ts'
                // 'api/questions/*.spec.js'
            ],

        files: [ 'src/app/shared/components/data-list/*.ts'],
        maxConcurrentTestRunners: 2,
        symlinkNodeModules: false,
        logLevel: 'debug',
        plugins:
            [
                'stryker-jasmine-runner',
                'stryker-jasmine',
                'stryker-typescript',
                'stryker-html-reporter'
            ]
    });
};

module.exports = strykerConfiguration;
