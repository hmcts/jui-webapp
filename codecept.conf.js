//const testConfig = require("./config.js");

exports.config = {
    'tests': './paths/*.js',
    'output': './output',
    "timeout": 10000,

    "helpers": {
        "Protractor" : {
            "url": "https://case-worker-web.dev.ccd.reform.hmcts.net",
            "browser": "chrome",
             "show": true,
            "smartWait": 5000,
            "restart": false,
          "driver":"sauce",
          'host': 'ondemand.saucelabs.com',
          'port': 80,
          'user':  process.env.SAUCE_USERNAME,
          'key': process.env.SAUCE_ACCESS_KEY,

          'capabilities':{
            'tunnelIdentifier': '',
            'browserName': 'firefox',
            'name': 'WIN_CHROME_LATEST',
            'platform': 'Windows 10',
            'version': 'latest'

          }

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
