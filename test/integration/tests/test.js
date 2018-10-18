const Mocha = require('mocha');

const mocha = new Mocha({ui: 'tdd',
    // reporter: 'spec',
    bail: 'yes',
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'reports',
        reportName: 'JUI_API_Integration_tests'
    }});
mocha.addFile('get_jui_cases.js');
mocha.addFile('get_jui_case_details.js');
//mocha.addFile('get_jui_case_fields.js');
mocha.addFile('get_jui_case_summary.js');
mocha.run();
