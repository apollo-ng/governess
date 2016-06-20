import { ElementFinder } from 'protractor';

let message: ElementFinder = element(by.className('message'));

describe('HelpPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[5].click();
        expect(browser.getTitle()).toEqual('Help');
      });
    });
  });

  it('has <nav>', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[5].click();
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
      });
    });
  });

  it('has a menu button that displays the left menu', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[5].click();
        expect(element.all(by.css('.toolbar-title')).first().getText()).toEqual('Governess');
      });
    });
  });

});
