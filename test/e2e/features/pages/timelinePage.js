/**
 * @author Vamshi Muniganti
 */

'use strict';

function timelinePage() {
    this.timelineLink = element(by.css('.hmcts-sub-navigation__list .hmcts-sub-navigation__item:nth-of-type(4) .hmcts-sub-navigation__link'));
    this.timeline_header = element(by.css(('[data-selector ="heading"]')));
    this.timeline_eventname = element.all(by.css(('[data-selector ="timeline-event-name"]')));
    this.timeline_by = element.all(by.css(('[data-selector ="timeline-by"]')));
    this.timeline_date = element.all(by.css(('[data-selector ="timeline-date"]')));

    this.recent_events = element(by.xpath('//*[@id="content"]/app-case-viewer/app-summary-panel/div/div[2]/h2'));
    this.all_recent_events = element.all(by.css(('[data-selector ="timeline-item"]')));
    this.view_recent_events = element(by.xpath("//*[@id='content']/app-case-viewer/app-summary-panel/div/div[2]/p/a"));

    this.panel_members = element(by.xpath(("//*[@id='content']/app-case-viewer/app-summary-panel/div/div[1]/app-data-list[2]/div/h2")));
    this.panel_table = element(by.xpath('//*[@id="content"]/app-case-viewer/app-summary-panel/div/div[1]/app-data-list[2]/div'));
    this.make_decision = element.all(by.css('a.govuk-button.hmcts-page-heading__button'));
    this.draft_button = element(by.css('input#create-2'));
    this.button_continue = element(by.css("input[type='submit'][value='Continue']"));
    this.annotate_continue = element(by.css('input#reject-reasons-2'));
    this.check_decision = element(by.css('h1.govuk-heading-xl'));
}

module.exports = new timelinePage();
