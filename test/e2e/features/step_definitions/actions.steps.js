var dashBoardPage = require('../pages/dashBoardPage');
var caseSummaryPage = require('../pages/caseSummaryPage');
const {Given, When, Then} = require('cucumber');

Given(/^I click( the)? "([^"]*)"$/, {retry: 15}, async function (ignore, selector) {
    selector = this.getSelector(selector);
    await browser.wait(function() {
        return $(selector).isPresent();
    }, 5000);

    $(selector).click();
});

 When('I click case {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
     dashBoardPage.select_a_case(string);
});

 When('I scroll to the bottom of the page', async function () {
//        await browser.executeScript('window.scrollTo(0,10000);').then(async function () {
//        console.log('++++++SCROLLED Down+++++');
//        expect(caseSummaryPage.caseSummary_header_text.isDisplayed()).to.eventually.be.true;
//             });

//     await browser.executeScript('window.scrollTo(0,4000)').then(async function () {
       await browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(async function(){
        expect(caseSummaryPage.caseSummary_header_text.isDisplayed()).to.eventually.be.true;
     })
});

