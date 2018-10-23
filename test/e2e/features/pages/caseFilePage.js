'use strict';

function caseFilePage() {

    this.case_file_header = element(by.css('[data-selector="heading"]'));
    this.sub_nav_link = element(by.css('[data-selector="sub-nav-link"][aria-current="page"]'));

}

module.exports = new caseFilePage;
