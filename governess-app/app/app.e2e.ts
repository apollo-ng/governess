describe('GovernessApp', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('OPS');
  });

  it('should have <nav>', () => {
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
  });

  it('should have correct nav text for Home', () => {
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('OPS');
  });

  it('has a menu button that displays the left menu', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(1000); // wait for the animation
        expect(element.all(by.css('.toolbar-title')).first().getText()).toEqual('Governess');
      });
  });

  it('the left menu first link with title Home', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(1000); // wait for the animation
        expect(element.all(by.css('ion-label')).first().getText()).toEqual('Home');
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
