'use strict';

const requireDirectory = require('require-directory');
  const steps = requireDirectory(module);

module.exports = function () {

  return actor({

    //signin
    signIn: steps.signin.signIn,

    //invalid signin
   invalidSignIn: steps.signin.invalidSignIn,

    //signout
   signOut: steps.signout.signOut,

    //feedback
    yourFeedback: steps.feedback.yourFeedback,


    //search
    invalidSearch: steps.search.invalidSearch,


  });
};
