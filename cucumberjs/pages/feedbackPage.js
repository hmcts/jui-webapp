'use strict';

function feedbackPage() {
// this.feedback_link = element(by.css('#content > div.phase-banner-beta > p > span > a'));
    this.header_text = element(by.css('h1'));
    this.choose_money_claim = element(by.css('input#o540869344974458'));
    this.fill_in_feeback = element(by.css('textarea#t44943949'));
    this.submit = element(by.css('input#cmdGo'));
    this.message_after_feedback = element(by.css('h2'));
}

module.exports = new feedbackPage();
