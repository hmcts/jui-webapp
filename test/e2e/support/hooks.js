'use strict';
const Cucumber = require('cucumber');
const { defineSupportCode } = require('cucumber');
const fs = require('fs');
const mkdirp = require('mkdirp');
const conf = require('../config/conf').config;
const reporter = require('cucumber-html-reporter');

const jsonReports = `${process.cwd()}/reports/json`;
const htmlReports = `${process.cwd()}/reports/html`;
const targetJson = `${jsonReports}/cucumber_report.json`;

// defineSupportCode(({ registerHandler, After, registerListener }) => {
// registerHandler('BeforeFeature', { timeout: 120 * 1000 }, () => browser.get(conf.baseUrl));
//
// After(function(scenario) {
//     if (scenario.isFailed()) {
//         const attach = this.attach; // cucumber's world object has attach function which should be used
//         return browser.takeScreenshot().then(png => {
//             const decodedImage = new Buffer(png, 'base64');
//             return attach(decodedImage, 'image/png');
//         });
//     }
// });
//
//
// const logFn = string => {
//     if (!fs.existsSync(jsonReports)) {
//         mkdirp.sync(jsonReports);
//     }
//     try {
//         fs.writeFileSync(targetJson, string);
//         reporter.generate(cucumberReporteroptions); // invoke cucumber-html-reporter
//         report
//             .create(cucumberReportOptions)
//             .then(() => {
//                 // invoke cucumber-html-report
//                 // creating two reports(optional) here, cucumber-html-report gives directory already exists as cucumber-html-reporter already creates the html dir!
//                 // suggestion- use either one of the reports based on your needs
//                 console.log('cucumber_report.html created successfully!');
//             })
//             .catch(err => {
//                 if (err) {
//                     console.error(err);
//                 }
//             });
//     } catch (err) {
//         if (err) {
//             console.log('Failed to save cucumber test results to json file.');
//             console.log(err);
//         }
//     }
// };
// const jsonformatter = new Cucumber.JsonFormatter({ log: logFn });
// registerListener(jsonformatter);
// });
