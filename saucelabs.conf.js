const supportedBrowsers = require('../crossbrowser/supportedBrowsers.js');
const browser = process.env.SAUCELABS_BROWSER || 'chrome';
const tunnelName = process.env.TUNNEL_IDENTIFIER || 'saucelabs-overnight-tunnel';

const setupConfig = {
  'tests': './paths/*.js',
  'output': './output',
  'timeout': 20000,
  'helpers': {
    "Protractor": {
      url: process.env.E2E_FRONTEND_URL || "https://case-worker-web.dev.ccd.reform.hmcts.net",
      browser: supportedBrowsers[browser].browserName,
      waitforTimeout: 60000,
      cssSelectorsEnabled: 'true',
      windowSize: '1600x900',
      timeouts: {
        script: 60000,
        'page load': 60000,
        "implicit": 20000,
        "show": true,
        "smartWait": 5000,
        "restart": false,
      },
      'host': 'ondemand.saucelabs.com',
      'port': 80,
      'user': process.env.SAUCE_USERNAME,
      'key': process.env.SAUCE_ACCESS_KEY,
      desiredCapabilities: getDesiredCapabilities()
    },
  },
  'include': {
    'I': './pages/steps.js'
  },
  'mocha': {
    'reporterOptions': {
      'reportDir': process.env.E2E_CROSSBROWSER_OUTPUT_DIR || './output',
      'reportName': browser + '_report',
      'reportTitle': 'Crossbrowser results for: ' + browser.toUpperCase(),
      'inlineAssets': true
    }
  },
  'name': 'frontEnd Tests'
};

function getDesiredCapabilities() {
  let desiredCapability = supportedBrowsers[browser];
  desiredCapability.tunnelIdentifier = tunnelName;
  desiredCapability.tags = ['Jui'];
  return desiredCapability;
}

exports.config = setupConfig;
