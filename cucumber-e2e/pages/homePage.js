"use strict";

function homePage() {
  this.hmctsLogo = element(by.css("a#logo.content"));
  this.juiLink = element(by.css('a#proposition-name'));
  this.signOutLink = element(by.css('ul#proposition-links'));
  this.mainContent = element(by.xpath("//*[@id=\'content\']/div[2]/p/span/text[1]"));
  this.openGovtLicenceLink = element(by.xpath("//*[@id='footer']/div/div/div[1]/div/p[2]/a"));
  this.licenceLogoHolderImg = element(by.css('#licence-logo-holder >img'));





}
module.exports = new homePage();
