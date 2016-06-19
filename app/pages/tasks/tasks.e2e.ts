/* tslint:disable:no-unused-variable */

import { ElementFinder } from 'protractor';

let searchField: ElementFinder = element(by.css('.text-input'));

describe('TasksPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(2000); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[2].click();
        expect(browser.getTitle()).toEqual('Tasks');
      });
    });
  });

  it('has <nav>', () => {
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
  });

  it('has a menu button that displays the left menu', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(1000); // wait for the animation
        expect(element.all(by.css('.toolbar-title')).first().getText()).toEqual('Governess');
      });
  });

});
