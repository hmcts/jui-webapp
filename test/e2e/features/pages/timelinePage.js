/**
 * @author Vamshi Muniganti
 */

'use strict';

function timelinePage() {
    // this.timelineLink = element(by.css('.hmcts-sub-navigation__list .hmcts-sub-navigation__item:nth-of-type(4) .hmcts-sub-navigation__link'));
    this.timelineLink = element(by.xpath('//a[contains(text(),"Timeline")]'));
    this.timeline_header = element(by.css(('[data-selector ="heading"]')));
    this.timeline_eventname = element.all(by.css(('[data-selector ="timeline-event-name"]')));
    this.timeline_by = element.all(by.css(('[data-selector ="timeline-by"]')));
    this.timeline_date = element.all(by.css(('[data-selector ="timeline-date"]')));

    this.recent_events = element(by.xpath('//*[@id="content"]/app-case-viewer/app-summary-panel/div/div[2]/h2'));
    this.all_recent_events = element.all(by.css(('[data-selector ="timeline-item"]')));
    this.view_recent_events = element(by.xpath("//a[@role='link']"));

    this.panel_members = element(by.xpath(("//*[@id='content']/app-case-viewer/app-summary-panel/div/div[1]/app-data-list[2]/div/h2")));
    this.panel_table = element(by.xpath('//*[@id="content"]/app-case-viewer/app-summary-panel/div/div[1]/app-data-list[2]/div'));
    this.make_decision = element.all(by.xpath("//a[@class='govuk-button hmcts-page-heading__button']"));
    this.draft_button = element(by.id('approveDraftConsent-2'));
    this.button_continue = element(by.css("input[type='submit'][value='Continue']"));
    this.select_reason_not_to_approve = element(by.css('#item.control'));
    this.annotate_continue = element(by.css('#includeAnnotatedVersionDraftConsOrder-2'));
    this.check_decision = element(by.css('h1.govuk-heading-xl'));
}

module.exports = new timelinePage();
