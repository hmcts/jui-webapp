exports.config = {
  'tests': './paths/*.js',
  'output': './output',
  "timeout": 20000,


  "helpers": {
    "WebdriverIO" : {
      "url": "",
      "browser": "chrome",
      "show": true,
      "smartWait": 5000,
      "restart": false,
      "driver":'sauce',
      'host': 'ondemand.saucelabs.com',
      'port': 80,
      'user': process.env.SAUCE_USERNAME,
      'key': process.env.SAUCE_ACCESS_KEY,


      Capabilities: [{
        browserName: 'chrome',
        version: 'latest',
        platform: 'Windows 7',
        name: "webio-tests",
        // shardTestFiles: true,
        // maxInstances: 1,
        "tunnel-identifier": 'saucelabs'
      }],

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
