import { browser, element, by } from 'protractor';

describe('SettingsPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(500); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[4].click();
        browser.driver.sleep(500); // wait for the animation
        expect(browser.getTitle()).toEqual('Settings');
        return items[4];
      });
    });
  });

  it('has correct header title', () => {
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Settings');
  });

  it('has a navbar', () => {
    expect(element(by.css('ion-navbar'))
    .isPresent()).toEqual(true);
  });

  it('has a list of settings', () => {
    expect(element(by.css('ion-list')).isPresent()).toEqual(true);
  });

});
