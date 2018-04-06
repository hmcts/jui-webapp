'use strict';

module.exports = function () {
  const I = this;

  I.fillField("#username", "nybgul@gmail.com");
  I.fillField("#password", 'Monday01');
  I.click('Sign in');
  I.wait(2);
  I.see('Search','#search');
  I.click('Search');
  I.amOnPage('https://case-worker-web.dev.ccd.reform.hmcts.net/search');
  I.wait(5);
  I.seeElement('#caseReference');
  I.fillField('#caseReference', '01');
  I.see('Apply','form > button');
  I.click('Apply');
  I.wait(10);
  I.see(' No cases found. Try using different filters.', 'ccd-search-result > div');


};
