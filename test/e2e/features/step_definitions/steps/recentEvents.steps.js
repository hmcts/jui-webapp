/**
 * @author Vamshi Muniganti
 */

'use strict';

const timelinePage = require('../../pages/timelinePage');
const {defineSupportCode} = require('cucumber');
const { SHORT_DELAY, MID_DELAY , LONG_DELAY } = require('../../../support/constants');


defineSupportCode(function ({Given, When, Then}) {

    Then(/^I see the timeline link$/, async function () {
        browser.sleep(SHORT_DELAY);
        await expect(timelinePage.timelineLink.isDisplayed()).to.eventually.be.true;
    });

    Then(/^I click on timeline should see the recent events$/, async function () {
         await timelinePage.timelineLink.click();
         browser.sleep(SHORT_DELAY);
         await expect(timelinePage.timeline_header.isDisplayed()).to.eventually.be.true;
         await expect(timelinePage.timeline_eventname.first().isDisplayed()).to.eventually.be.true;
         await expect(timelinePage.timeline_by.first().isDisplayed()).to.eventually.be.true;
         await expect(timelinePage.timeline_date.first().isDisplayed()).to.eventually.be.true;
    });

    Then(/^I see the recent events with all details displayed$/, async function () {
        browser.sleep(SHORT_DELAY);
        // await expect(timelinePage.recent_events.isDisplayed()).to.eventually.be.true;
        await expect(timelinePage.timeline_eventname.first().isDisplayed()).to.eventually.be.true;
        await expect(timelinePage.timeline_by.first().isDisplayed()).to.eventually.be.true;
        await expect(timelinePage.timeline_date.first().isDisplayed()).to.eventually.be.true;
    });

    Then(/^I see the latest three events showing$/, async function () {
        browser.sleep(SHORT_DELAY);
       await timelinePage.all_recent_events.count().then(function(count){
           if (count>3)
               fail();
           else
               console.log('Number of Recent Events Showing: ' + count);
        });
    });

    When(/^I click on view all events it should take to timeline page$/, async function () {
        await expect(timelinePage.view_recent_events.isDisplayed()).to.eventually.be.true;
        timelinePage.view_recent_events.click();
        browser.sleep(SHORT_DELAY);
        await expect(timelinePage.timeline_header.isDisplayed()).to.eventually.be.true;
    });

    Then(/^I see the Judge Panel Details$/, async function () {
        browser.sleep(SHORT_DELAY);
        await expect(timelinePage.panel_members.isDisplayed()).to.eventually.be.true;
        await expect(timelinePage.panel_table.isDisplayed()).to.eventually.be.true;
    });

});


