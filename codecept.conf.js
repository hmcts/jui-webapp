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
          // "driver":"browserstack",
          // 'host': 'ondemand.saucelabs.com',
          // 'port': 80,
          // 'user': 'rramisetty',
          // 'key': 'c0a3c627-27d3-4ee8-a9e2-3388d25bfa59',

          // 'capabilities':{
          //   'tunnelIdentifier': 'saucelab-tunnel-ramisetty',
          //   'browserName': 'firefox',
          //   'name': 'WIN_CHROME_LATEST',
          //   'platform': 'Windows 10',
          //   'version': 'latest'
          //
          // }

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
