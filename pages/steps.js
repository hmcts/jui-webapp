'use strict';

const requireDirectory = require('require-directory'),
  steps = requireDirectory(module);

     module.exports = function () {

    return actor({

        //signin

        signin: steps.signin.signin,

        // invalid signin
        invalidsignin: steps.signin.invalidsignin,

        //signout
        signout: steps.signout.signout,

        //feedback
        feedback: steps.feedback.feedback,


       // search
      search: steps.search.search,


    });
};
