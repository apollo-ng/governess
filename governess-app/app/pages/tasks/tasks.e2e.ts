
describe('TasksPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element(by.tagName('ion-menu')).all(by.css('.item')).then((items) => {
        items[2].click();
        browser.driver.sleep(1000); // wait for the animation
        expect(browser.getTitle()).toEqual('Tasks');
      });
    });
  });

  it('has <nav>', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element(by.tagName('ion-menu')).all(by.css('.item')).then((items) => {
        items[2].click();
        browser.driver.sleep(1000); // wait for the animation
        expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
      });
    });
  });

  it('has a menu button that opens the left menu', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element(by.tagName('ion-menu')).all(by.css('.item')).then((items) => {
        items[2].click();
        browser.driver.sleep(1000); // wait for the animation
        expect(element.all(by.css('.toolbar-title')).first().getText()).toEqual('GOVERNESS');
      });
    });
  });

  it('has search element for tasks', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element(by.tagName('ion-menu')).all(by.css('.item')).then((items) => {
        items[2].click();
        browser.driver.sleep(1000); // wait for the animation
        expect(element(by.css('ion-searchbar')).isPresent()).toEqual(true);
      });
    });
  });

  it('has at least one task in the list', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element(by.tagName('ion-menu')).all(by.css('.item')).then((items) => {
        items[2].click();
        browser.driver.sleep(1000); // wait for the animation
        expect(element(by.tagName('ion-list')).all(by.tagName('h2')).first().getText()).toEqual('Reflow Lead-Free');
      });
    });
  });

});
