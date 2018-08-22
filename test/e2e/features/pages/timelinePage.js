/**
 * @author Vamshi Muniganti
 */

'use strict';

function timelinePage() {
    this.timelineLink = element(by.css('.jui-secondary-nav__list .jui-secondary-nav__item:nth-of-type(4) .jui-secondary-nav__link'));
    this.timeline_header = element(by.css(('[data-selector ="heading"]')));
    this.timeline_eventname = element.all(by.css(('[data-selector ="timeline-event-name"]')));
    this.timeline_by = element.all(by.css(('[data-selector ="timeline-by"]')));
    this.timeline_date = element.all(by.css(('[data-selector ="timeline-date"]')));

    this.recent_events = element(by.xpath('//*[@id="content"]/app-case-viewer/app-summary-panel/div/div[2]/h2'));
    this.all_recent_events = element.all(by.css(('[data-selector ="timeline-item"]')));
    this.view_recent_events = element(by.xpath("//*[@id='content']/app-case-viewer/app-summary-panel/div/div[2]/p/a"));

    this.panel_members = element(by.xpath(("//*[@id='content']/app-case-viewer/app-summary-panel/div/div[1]/app-data-list[2]/div/h2")));
    this.panel_table = element(by.xpath('//*[@id="content"]/app-case-viewer/app-summary-panel/div/div[1]/app-data-list[2]/div'));
}

module.exports = new timelinePage;
