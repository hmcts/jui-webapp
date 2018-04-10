Feature('CCD login logout & feedback functionality');

Before(function* (I) {

  I.amOnPage('/');
  browser.ignoreSynchronization = true;
  browser.waitForAngular();
  browser.sleep(500);
  I.wait(10);


});


Scenario("ccd signin", function* (I) {
    I.signin();

});


Scenario("Invalid Signin", function* (I) {
    I.invalidsignin();

});


Scenario("feedback", function* (I) {
    I.feedback();

});


Scenario("signout", function* (I) {

    I.signout();
});



Scenario("search ccd cases", function* (I){

  I.search();


});
