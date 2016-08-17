
describe('SettingsPage', () => {

  beforeEach(() => {
    browser.get('');
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(350); // wait for the animation
      element(by.tagName('ion-menu'))
      .all(by.css('.item')).then((items) => {
        items[4].click().then(() => {
          browser.driver.sleep(350);
        });
      });
    });
  });

  it('has correct title', () => {
    expect(browser.getTitle()).toEqual('Settings');
  });

  it('has <nav>', () => {
    expect(element(by.css('ion-navbar'))
    .isPresent()).toEqual(true);
  });

  it('has a menu button which opens the left menu', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(500); // wait for the animation
      expect(element(by.tagName('ion-menu'))
      .all(by.css('.toolbar-title')).first()
      .getText()).toEqual('GOVERNESS');
    });
  });

});
