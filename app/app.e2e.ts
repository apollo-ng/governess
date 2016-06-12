describe('GovernessUIApp', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Help');
  });

  it('should have <nav>', () => {
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Help', () => {
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Help');
  });

  it('has a menu button that displays the left menu', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(1000); // wait for the animation
        expect(element.all(by.css('.toolbar-title')).first().getText()).toEqual('Menu');
      });
  });

  it('the left menu has a link with title Appliance', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(1000); // wait for the animation
        expect(element.all(by.css('ion-label')).first().getText()).toEqual('Appliance');
      });
  });

  it('the left menu has a link with title About', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(1000); // wait for the animation
        expect(element.all(by.css('ion-label')).last().getText()).toEqual('About');
      });
  });
});
