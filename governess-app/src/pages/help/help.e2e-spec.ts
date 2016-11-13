import { browser, element, by } from 'protractor';

describe('HelpsPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(500); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[3].click();
        browser.driver.sleep(500); // wait for the animation
        expect(browser.getTitle()).toEqual('Help');
        return items[3];
      });
    });
  });

  it('has correct header title', () => {
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Help');
  });

  it('has <nav>', () => {
    expect(element(by.css('ion-navbar'))
    .isPresent()).toEqual(true);
  });

});
