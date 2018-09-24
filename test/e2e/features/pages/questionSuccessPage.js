'use strict';

function questionSuccessPage() {
    this.question_added_succes_alert = element(by.css('.jui-alert.jui-alert--success'));
    this.question_added_success_alert_text = element(by.css('.jui-alert__text'));
}

module.exports = new questionSuccessPage();
