"use strict";

function caseListPage(){

  this.caselist_header = element(by.css('h1'));
  this.search_btn = element(by.css('#search'));
  this.header_dropdwn =element(by.css('#header-wrapper > header > div.dropdown'));
  this.signout_btn = element(by.css('#header-wrapper > header > div.dropdown > div > a'));



}

module.exports = new caseListPage;


