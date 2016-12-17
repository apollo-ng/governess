import { browser, element, by } from 'protractor';

describe('AppliancesPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(500); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[1].click();
        browser.driver.sleep(500); // wait for the animation
        expect(browser.getTitle()).toEqual('Appliances');
        return items[1];
      });
    });
  });

  it('has correct header title', () => {
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Appliances');
  });

  it('has <nav>', () => {
    expect(element(by.css('ion-navbar'))
    .isPresent()).toEqual(true);
  });

  it('has a list of appliances', () => {
    expect(element(by.css('ion-list')).isPresent()).toEqual(true);
  });

});
