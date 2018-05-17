exports.config = {
  'tests': './paths/*.js',
  'output': './output',
  "timeout": 20000,


  "helpers": {
    "Protractor" : {
      "url": "",
      "browser": "chrome",
      "show": true,
      "smartWait": 5000,
      "restart": false,
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
