Feature('CCD login logout & feedback functionality');

Before(function* (I) {

  I.amOnPage('/');
  browser.ignoreSynchronization = true;
  browser.waitForAngular();
  browser.sleep(500);
  I.wait(10);


});


Scenario("ccd signin", function* (I) {
    I.signIn();

});


Scenario("Invalid Signin", function* (I) {
    I.invalidSignIn();

});


Scenario("feedback", function* (I) {
    I.yourFeedback();

});


Scenario("signout", function* (I) {
  I.signOut();
});



Scenario("search ccd cases", function* (I){
  I.invalidSearch();


});
