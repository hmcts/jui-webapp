'use strict';

var signInPage = require('../../pages/signInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');
const conf = require('../../config/conf').config;

var expect = require('chai').expect;
var assert = require('assert');
var assert = require('assert').strict;
var {defineSupportCode} = require('cucumber');
var chai = require('chai');
chai.use(require('chai-smoothie'));


defineSupportCode(function ({Given, When, Then}) {

    Then(/^I should see (.*), (.*), (.*)$/, function (next) {


    });

    Then(/^I should see (.*), (.*), (.*)$/, function (next) {

    });

});
