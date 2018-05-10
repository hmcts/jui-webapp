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

      //"driver":"sauce",
     // "proxy":'no_proxy',   // proxy issue with WebIO
      //'host': 'ondemand.saucelabs.com',
      //'port': 80,
      //sauceSeleniumAddress: 'localhost:4445/wd/hub',
      //'sauceUser': process.env.SAUCE_USERNAME,
      //
      //
      // 'sauceKey': process.env.SAUCE_ACCESS_KEY,

  //     multiCapabilities: [{
  //       browserName: 'chrome',
  //       version: 'latest',
  //       platform: 'Windows 7',
  //       name: "chrome-tests",
  //       shardTestFiles: true,
  //       maxInstances: 1,
  //       "tunnel-identifier": 'saucelabs'
  //     }],
  //
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

