import { browser, element, by } from 'protractor';

describe('AboutPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(500); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[6].click();
        browser.driver.sleep(500); // wait for the animation
        expect(browser.getTitle()).toEqual('About');
        return items[6];
      });
    });
  });

  it('has correct header title', () => {
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('About');
  });

  it('has <nav>', () => {
    expect(element(by.css('ion-navbar'))
    .isPresent()).toEqual(true);
  });

});
