'use strict';
const { defineSupportCode } = require('cucumber');
const fs = require('fs');
const mkdirp = require('mkdirp');
const conf = require('../config/conf').config;
const reporter = require('cucumber-html-reporter');
const report = require('cucumber-html-report');

const jsonReports = `${process.cwd()}/reports/json`;
const htmlReports = `${process.cwd()}/reports/html`;
// var xmlReports = process.cwd() + "/reports/xml";
const targetJson = `${jsonReports}/cucumber_report.json`;
// var targetXML = xmlReports + "/cucumber_report.xml";
const fse = require('fs-extra');
const screenshotDir = './reports/screenshots/';
const config = require('../config/conf.js');
const { SHORT_DELAY, MID_DELAY , LONG_DELAY } = require('../support/constants');


// Before And After hooks used while feature executes

const JsonFormatter = require('cucumber').JsonFormatter;

// defineSupportCode(function({registerHandler}) {
//     registerHandler('BeforeFeatures', function () {
//         browser.get(config.config.baseUrl);
//         browser.driver.manage().deleteAllCookies();
//         browser.refresh();
//         browser.sleep(SHORT_DELAY);
//     });
// });

defineSupportCode(function({setDefaultTimeout}) {
    setDefaultTimeout(10 * 60 * 1000);
});



// defineSupportCode(({After, registerListener}) => {
//
//     After(function(scenario, done) {
//         let world = this;
//         if (scenario.isFailed()) {
//             browser.takeScreenshot()
//                 .then(function(png) {
//                     const decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
//                     writeScreenshotToFile(decodedImage);
//                     world.attach(decodedImage, 'image/png');
//                     done();
//                 }, function(err) {
//                     done(err);
//                 });
//         } else {
//             done();
//         }
//
//     });
//
//     var writeScreenshotToFile = function(image) {
//
//         if (!fse.existsSync(screenshotDir)) {
//             fse.mkdirSync(screenshotDir);
//         }
//        var date = new Date();
//         var timestamp = date.getTime();
//         var filename = "error_"+timestamp+".png";
//         var stream = fse.createWriteStream(screenshotDir + filename);
//         stream.write(image);
//         stream.end();
//     };
//
//     const jsonFormatter = new JsonFormatter;
//     jsonFormatter.log = function(string) {
//         if (!fse.existsSync(outputDir)) {
//             fse.mkdirSync(outputDir);
//         }
//
//         fse.writeFile(targetJson, string, function(err) {
//             if (err) {
//                 console.log('Failed to save cucumber test results to json file.');
//                 console.log(err);
//             } else {
//                 createHtmlReport(targetJson);
//             }
//         });
//     };
//
//     registerListener(JsonFormatter);
// });
//
//



defineSupportCode(({ After }) => {
    After(function(scenario, done) {
        const world = this;
        if (scenario.result.status === 'failed') {
            browser.takeScreenshot().then(stream => {
                const decodedImage = new Buffer(stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
                world.attach(decodedImage, 'image/png');
            })
                .then(() => {
                    done();
                });
        } else {
            done();
        }
    });
});
