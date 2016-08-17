
describe('GovernessApp', () => {

  beforeEach(() => {
    browser.get('');
    browser.driver.sleep(350);
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('EKA KF412 idle');
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

  it('has correct navbar title', () => {
    expect(element(by.css('ion-navbar:first-child'))
    .getText()).toContain('EKA KF412');
  });

  it('has left menu first link with title Control', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(500); // wait for the animation
      expect(element(by.css('ion-menu'))
      .all(by.css('ion-label')).first()
      .getText()).toEqual('Control');
    });
  });

  it('has left menu last link with title About', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(500); // wait for the animation
      expect(element(by.css('ion-menu'))
      .all(by.css('ion-label')).last()
      .getText()).toEqual('About');
    });
  });

});
