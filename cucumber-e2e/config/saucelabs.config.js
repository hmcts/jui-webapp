

exports.config = {

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  specs: ["../features/*.feature"],

  exclude: [],
  allScriptsTimeout: 110000,
  restartBrowserBetweenTests: true,
  untrackOutstandingTimeouts: true,

  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  multiCapabilities: [{
    browserName: 'chrome',
    version: 'latest',
    platform: 'Windows 7',
    name: "chrome-tests",
    shardTestFiles: true,
    maxInstances: 1,
    "tunnel-identifier": 'test-saucelabs'
  }],

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  useAllAngular2AppRoots: true,
};






