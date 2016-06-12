import { ElementFinder } from 'protractor';

let message: ElementFinder = element(by.className('message'));

describe('AboutPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('should have correct text when Goodbye Ionic is selected', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(2000); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[1].click();
        expect(message.getText()).toEqual('Bye!');
      });
    });
  });

});
