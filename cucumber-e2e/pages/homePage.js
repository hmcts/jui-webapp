"use strict";

function homePage() {
  this.hmctsLogo = element(by.css("a#logo.content"));
  this.juiLink = element(by.css('a#proposition-name'));
  this.signOutLink = element(by.css('ul#proposition-links'));
  this.phaseTag = element(by.css("strong.phase-tag"));
  this.content = element(by.css("span.heading-small"));
  this.openGovtLicenceLink = element(by.xpath("//*[@id='footer']/div/div/div[1]/div/p[2]/a"));
  this.licenceLogoHolderImg = element(by.css('#licence-logo-holder >img'));





}
module.exports = new homePage();
