
describe('GovernessApp', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    browser.driver.sleep(500);
    expect(browser.getTitle()).toEqual('EKA KF412 idle');
  });

  it('should have <nav>', () => {
    browser.driver.sleep(500);
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Home', () => {
    browser.driver.sleep(500);
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('EKA KF412');
  });

  it('has a menu button that displays the left menu', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(500); // wait for the animation
        expect(element.all(by.css('.toolbar-title')).first().getText()).toEqual('GOVERNESS');
      });
  });

  it('the left menu first link with title Control', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(500); // wait for the animation
        expect(element(by.css('ion-menu')).all(by.css('ion-label')).first().getText()).toEqual('Control');
      });
  });

  it('the left menu has a link with title About', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(500); // wait for the animation
        expect(element(by.css('ion-menu')).all(by.css('ion-label')).last().getText()).toEqual('About');
      });
  });
});
