//const testConfig = require("test/config.js");

exports.config = {
    'tests': './paths/*.js',
    'output': './output',
    "timeout": 10000,

    "helpers": {
        "Protractor" : {
            "url": "https://case-worker-web.dev.ccd.reform.hmcts.net",
            "browser": "chrome",
            "smartWait": 5000,
            "restart": false,
          "useAllAngular2AppRoots": true

        }
    },

    'include': {
        'I': './pages/steps.js'
    },

    "bootstrap": false,

    'mocha': {
        'reporterOptions': {
            'codeceptjs-cli-reporter': {
                'stdout': '-',
                'options': {
                    'steps': true
                }
            },

            'mochawesome': {
                'stdout': './output/console.log',
                'options': {
                    'reportDir': './output',
                    'reportName': 'index',
                    'inlineAssets': true
                }
            }
        }
    },

    'name': 'Codecept Tests'
};
