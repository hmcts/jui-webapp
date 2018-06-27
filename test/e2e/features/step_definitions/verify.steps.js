const {Given, When, Then} = require('cucumber');

Then(/^I (?:can|should) see "(.*)" at least "(\d+)" times?$/, {retry: 2}, function (selector, count) {
    // selector = this.getSelector(selector);
    // const result = this.client.elements(selector);
    // this.expect(result.value.length).to.be.at.least(parseInt(count, 10));
});

Then(/^I (?:can|should) see "(.*)" exactly "(\d+)" times?$/, {retry: 2}, function (selector, count) {
    // selector = this.getSelector(selector);
    // const result = this.client.elements(selector);
    // this.expect(result.value.length).to.equal(parseInt(count, 10));
});

Then(/^I (?:can|should) expect "(.*)" text to( not)? "(.*)" "(.*)"$/, {retry: 2}, function (selector, not, matchers, text) {
    // selector = this.getSelector(selector);
    // matchers = matchers.split(',');
    // const operator = matchers[0];
    // const modifier = matchers[1] || '';
    //
    // const elementText = this.client.getText(selector);
    // if (operator === 'match') {
    //     text = new RegExp(text, modifier);
    // }
    // let expect = this.expect(elementText).to;
    // if (not) {
    //     expect = expect.not;
    // }
    // expect[operator](text);
});

const invert = (should, not) => not ? should.not : should;

Then(/^I (?:can|should) wait for the url to( not)? "(.*)" "(.*)"$/, function (not, matchers, text) {
    // matchers = matchers.split(',');
    // const operator = matchers[0];
    // const modifier = matchers[1] || '';
    //
    // this.client.waitUntil(() => {
    //     try {
    //         const url = this.client.getUrl();
    //         if (operator === 'match') {
    //             text = new RegExp(text, modifier);
    //         }
    //         invert(this.expect(url).to, not)[operator](text);
    //         return true;
    //     } catch (err) {
    //         return false;
    //     }
    // }, this.EXPECTATION_TIMEOUT, `Browser url did not ${matchers} ${text} after ${this.EXPECTATION_TIMEOUT} ms`);
});

Then(/^I (?:can|should) expect the url to( not)? "(.*)" "(.*)"$/, function (not, matchers, text) {
    // matchers = matchers.split(',');
    // const operator = matchers[0];
    // var modifier = matchers[1] || '';
    // const url = this.client.getUrl();
    // if (operator === 'match') {
    //     text = new RegExp(text, modifier);
    // }
    // invert(this.expect(url).to, not)[operator](text);
});

Then(/^I should expect the title to( not)? "(.*)" "(.*)"$/, {retry: 2}, function (not, matchers, text) {
    // matchers = matchers.split(',');
    // const operator = matchers[0];
    // const modifier = matchers[1] || '';
    // const titleText = this.client.getTitle();
    // if (operator === 'match') {
    //     text = new RegExp(text, modifier);
    // }
    // let expect = this.expect(titleText).to;
    // if (not) {
    //     expect = expect.not;
    // }
    // expect[operator](text);
});

Then(/^I should expect "(.*)" to( not)? be visible$/, {retry: 2}, async function (selector, not) {
    await browser.wait(async () => {
        const present = await $(this.getSelector('jui-header')).isPresent();
        if(not){
            expect(present).toBeTruthy();
        }
        else {
            expect(present).toBeFalsy();
        }
    }, 5000);
});

Then(/^I should expect "(.*)" to( not)? be visible within viewport$/, {retry: 2}, function (selector, not) {
    // selector = this.getSelector(selector);
    //
    // const isExisting = this.client.isExisting(selector);
    // if (!isExisting && not) {
    //     return this.expect(1).to.equal(1);
    // }
    // else if (isExisting) {
    //     const isVisible = this.client.isVisibleWithinViewport(selector);
    //     return this.expect(isVisible).to.equal(!not);
    // }
    // else {
    //     return this.assert(true === false, 'Expected element to exist but it does not.');
    // }
});

Then(/^I should expect "(.*)" to( not)? exist$/, {retry: 4}, function (selector, not) {
    // selector = this.getSelector(selector);
    // const isExisting = this.client.isExisting(selector);
    // this.expect(isExisting).to.equal(!not);
});

Then(/^I should expect "(.*)" checkboxes to( not)? be checked$/, {retry: 2}, function (selector, not) {
    // let selectorCheckboxes = this.getSelector(selector) + ' input[type=checkbox]';
    //
    // if (not) {
    //     selectorCheckboxes = selector + ':not(:checked)'
    // } else {
    //     selectorCheckboxes = selector + ':checked'
    // }
    //
    // let checkboxSelectorResultsFound = this.client.elements(selectorCheckboxes).value.length;
    // let nbElements = this.client.elements(selectorCheckboxes).value.length;
    //
    // if (not) {
    //     this.expect(checkboxSelectorResultsFound).to.equal(0);
    // } else {
    //     this.expect(checkboxSelectorResultsFound).to.equal(nbElements);
    // }
});

Then(/^I should expect "(.*)" to have a selected checkbox containing "(.*)"$/, {retry: 2}, function (selector, content) {
    // selector = this.getSelector(selector) + ' input[type=checkbox]:checked';
    // const elementId = this.client.elements(selector).getAttribute('id');
    // this.expect(elementId).to.contain(content);
});

Then(/^I should expect search results for "(.*)" to contain "(.*)"$/, {retry: 15}, function (selector, content) {
    // const searchResultsElements = this.getSelector(selector) + ' li span';
    // const searchResults = this.client.elements(searchResultsElements);
    // const searchResultsMatching = searchResults.value
    //     .map(e => e.getText().toString().toLowerCase())
    //     .filter(v => v.indexOf(content.toLowerCase()) > -1);
    //
    // this.expect(searchResultsMatching).to.have.length.above(0);
});

Then(/^I should wait for "(.*)" to( not)? be visible$/, {retry: 4}, function (selector, not) {
    // selector = this.getSelector(selector);
    // const element = $(selector);
    // this.client.waitForVisible(selector, this.EXPECTATION_TIMEOUT, !!not);
});

Then(/^I should wait for "(.*)" to( not)? exist$/, {retry: 2}, function (selector, not) {
    // selector = this.getSelector(selector);
    // this.client.waitForExist(selector, this.EXPECTATION_TIMEOUT, !!not);
});

Then(/^I wait for the grid to load$/, {retry: 2}, function () {
    // const dataGridLoadingSelector = '[data-selector~="data-grid"] [data-selector~="disable-overlay"]';
    // this.client.waitForExist(dataGridLoadingSelector, this.EXPECTATION_TIMEOUT, true);
});

Then(/^I wait for update to finish$/, {retry: 2}, function () {
    // const overlaySelector = '[data-selector~="disable-overlay"]';
    // this.client.waitForExist(overlaySelector, this.EXPECTATION_TIMEOUT, true);
});

// const distinct = (result, value) =>
//     (result[result.length - 1] !== value) ? result.concat([value]) : result;
// const numericSort = (a, b) =>
//     a.sortField - b.sortField;
// const textSort = (a, b) =>
//     (a.sortField === b.sortField ? 0 : (a.sortField > b.sortField ? 1 : -1));

Then(/^I should expect "(.*)" to be sorted by "(.*)" in "(.*)" "(.*)" order$/, {retry: 2}, function (rows, key, direction, type) {

    // const cellSelector = this.getSelector(`${rows}|${key}`);
    // const cells = this.client.elements(cellSelector).value;
    // const actual = [cells[0], cells[cells.length - 1]]
    //     .map(cell => cell.getText().toString())
    //     .filter(value => value !== '')
    //     .reduce(distinct, []);
    // const expected = actual.slice().map(text => ({
    //     text,
    //     sortField: type === 'numeric' ? +text.replace(/[^\d.]/g, '') : text.toLowerCase()
    // }));
    //
    // expected.sort(type === 'numeric' ? numericSort : textSort);
    //
    // if (direction === 'desc') {
    //     expected.reverse();
    // }
    //
    // this.expect(actual).to.deep.equal(expected.map(item => item.text));
});

Then(/^I should expect "(.*)" to be ordered:$/, {retry: 2}, function (selector, data) {
    // const elementIds = this.client
    //     .elements(this.getSelector(selector))
    //     .value.map((element) => element.ELEMENT);
    // const targetIds = data.rawTable
    //     .map((row) =>
    //         this.client
    //             .element(this.getSelector(row[0])).value.ELEMENT);
    // this.expect(elementIds.filter((id) => targetIds.includes(id))).to.deep.equal(targetIds);
});

Then(/^I should expect "(.*)" to match:$/, {retry: 2}, function (selector, data) {
    // const elementIds = this.client
    //     .elements(this.getSelector(selector))
    //     .value.map((element) => element.ELEMENT);
    // const targetIds = data.rawTable
    //     .map((row) =>
    //         this.client
    //             .element(this.getSelector(row[0])).value.ELEMENT);
    // this.expect(elementIds).to.deep.equal(targetIds);
});

Then(/^I should expect "(.*)" to( not)? be enabled$/, {retry: 2}, function (selector, not) {
    // selector = this.getSelector(selector);
    // const ariaDisabled = this.client.getAttribute(selector, 'aria-disabled')
    // if (ariaDisabled != null) {
    //     const isEnabled = ariaDisabled !== 'true';
    //     this.expect(isEnabled).to.equal(!not);
    // } else {
    //     this.expect(this.client.isEnabled(selector)).to.equal(!not);
    // }
});
