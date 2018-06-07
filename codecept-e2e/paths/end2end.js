'use strict';

Feature('CCD login logout & feedback functionality');

Before(function* (I)  {
    I.amOnPage('/');
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(500);
    I.wait(30);
    browser.waitForAngularEnabled(false);
    browser.get("https://idam.dev.ccidam.reform.hmcts.net/login?response_type=code&client_id=ccd_gateway&redirect_uri=https%3A%2F%2Fcase-worker-web.dev.ccd.reform.hmcts.net%2Foauth2redirect");

});

Scenario("sign in",function *(I){
  I.signIn();
});


Scenario("Invalid Signin", function *(I){
  I.invalidSignIn();

});


Scenario("feedback", function *(I) {
  I.yourFeedback();

});


Scenario("signout", function *(I){
  I.signOut();
});



Scenario("search ccd cases", function *(I){
  I.invalidSearch();


});






