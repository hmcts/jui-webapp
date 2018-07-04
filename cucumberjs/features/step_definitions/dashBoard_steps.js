'use strict';

var logInPage = require('../../pages/logInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');

var expect = require('chai').expect;
var assert = require('assert');
var conf = require('../../config/conf').config;
var {defineSupportCode} = require('cucumber');
var chai = require('chai');
chai.use(require('chai-smoothie'));
//var chaiAsPromised = require('chai-as-promised');


defineSupportCode(function ({Given, When, Then}) {

    Given(/^I am logged in as a Judge$/, async function () {
        await logInPage.email.sendKeys('test@test.com');
        await logInPage.password.sendKeys('123');
        await logInPage.signin_btn.click();

    });

    When(/^I am on the dashboard page$/, async function () {
        var dashboard_header_text = dashBoardPage.dashboard_header;
        await expect(dashboard_header_text).to.be.present;
    });


    When(/^one or more cases are displayed$/, async function () {
        await dashBoardPage.table.isPresent();


        var num_rows = dashBoardPage.number_of_rows.count().then(function (rowCount) {
            console.log('Count:' + rowCount)

        });

        var num_case_links = dashBoardPage.case_number_links.count().then(function (linkCount) {
            console.log('Count:' + linkCount)
        });

        expect(num_rows).to.eventually.equal(num_case_links);

    });


    When(/^all case numbers are hyperlinked$/, async function () {
        var case_nums = dashBoardPage.case_number_links;
        case_nums.getAttribute('href').isPresent();


        //await expect(case_nums.first().getAttribute('href')).to.eventually.equal(`${conf.baseUrl}/viewcase/${first_case_num}/summary/`);
       // var regexString = 'http:\\/\\/localhost:3000\\/viewcase\\/(\\d+)\\/summary';
       // var  str = 'http://localhost:3000/viewcase/1530617412130963/summary';
       //  var regex = RegExp(regexString);
       //  await console.log(regex.test(str));
    });



    //     var link_text = case_nums.first().getAttribute('href').then(async function (href) {
    //         console.log(href);
    //         return link_text;
    //     });
    //     expect(link_text).to.eventually.equal(conf.baseUrl /+/viewcase/+/{href}/+/summary/);
    // });




    When(/^I select a case reference$/,async function () {
         await dashBoardPage.case_number_links.first().click();
         });



    Then(/^I will be redirected to the Case Summary page for that case$/, async function () {
        var case_summary_header_text = caseSummaryPage.caseDetails_header_text;
        await expect(case_summary_header_text.first()).to.be.present;
        });

});
