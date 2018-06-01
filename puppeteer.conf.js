exports.config = {
  'tests': './paths/*.js',
  'output': './output',
  "timeout": 20000,


  "helpers": {
    Puppeteer: {
      url: 'http://localhost:30000',
      waitForTimeout,
      waitForAction,
      show: false,
      chrome: {
        ignoreHTTPSErrors: true,

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
    }
    },

    'name': 'Codecept Tests'
  };

