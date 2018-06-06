'use strict';

Feature('CCD login logout & feedback functionality');

Before((I)=> {
  I.amOnPage('/');
});

// Scenario("sign in",(I)=> {
//   I.signIn();
// });


Scenario("Invalid Signin", (I)=> {
  I.invalidSignIn();

});


// Scenario("feedback", (I)=> {
//   I.yourFeedback();
//
// });
//
//
// Scenario("signout", (I)=> {
//   I.signOut();
// });
//
//
//
// Scenario("search ccd cases", (I)=>{
//   I.invalidSearch();
//
//
// });


After(() => {
});




