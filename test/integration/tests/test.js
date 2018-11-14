const Mocha = require('mocha');

const mocha = new Mocha({ui: 'tdd',
    // reporter: 'spec',
    bail: 'yes',
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'reports/tests/api_functional/',
        reportName: 'JUI_API_Integration_tests'
    }});

mocha.addFile('test/integration/tests/get_jui_cases.js');
mocha.addFile('test/integration/tests/get_jui_case_details.js');
mocha.addFile('test/integration/tests/get_jui_case_fields.js');
// mocha.addFile('test/integration/tests/get_jui_case_summary.js');
mocha.run();
