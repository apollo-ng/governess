
describe('AppliancePage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element(by.tagName('ion-menu')).all(by.css('.item')).then((items) => {
        items[1].click();
        browser.driver.sleep(1000);
        expect(browser.getTitle()).toEqual('Appliance');
      });
    });
  });

  it('has <nav>', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element(by.tagName('ion-menu')).all(by.css('.item')).then((items) => {
        items[1].click();
        browser.driver.sleep(1000);
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
      });
    });
  });

  it('has a menu button that opens the left menu', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element(by.tagName('ion-menu')).all(by.css('.item')).then((items) => {
        items[1].click();
        browser.driver.sleep(1000);
        expect(element.all(by.css('.toolbar-title')).first().getText()).toEqual('GOVERNESS');
      });
    });
  });

});
