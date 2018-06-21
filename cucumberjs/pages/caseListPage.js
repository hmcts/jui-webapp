'use strict';

function caseListPage() {
    this.caselist_header = element(by.css('h1'));
    this.search_btn = element(by.css('#search'));
    this.header_dropdwn = element(by.css('button.dropbtn'));
    this.signout_btn = element(by.css('#global-header > div > div.header-proposition > div > div > div > a'));
}

module.exports = new caseListPage();
