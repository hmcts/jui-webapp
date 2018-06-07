'use strict';


 function invalidSearch() {
  const I = this;



  I.fillField("#username", "");
  I.fillField("#password", '');
  I.click('Sign in');
  I.wait(15);
  I.see('Search','#search');
  I.click('Search');
  I.seeInCurrentUrl('');
  I.wait(15);
  I.seeElement('#caseReference');
  I.fillField('#caseReference', '01');
  I.see('Apply','form > button');
  I.click('Apply');
  I.wait(20);
  I.see(' No cases found. Try using different filters.', 'ccd-search-result > div');


}

module.exports = invalidSearch;
