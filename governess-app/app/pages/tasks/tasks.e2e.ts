
describe('TasksPage', () => {

  beforeEach(() => {
    browser.get('');
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(350); // wait for the animation
      element(by.tagName('ion-menu'))
      .all(by.css('.item')).then((items) => {
        items[2].click().then(() => {
          browser.driver.sleep(350);
        });
      });
    });
  });

  it('has correct title', () => {
    expect(browser.getTitle()).toEqual('Tasks');
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

  it('has search element for tasks', () => {
    expect(element(by.css('ion-searchbar'))
    .isPresent()).toEqual(true);
  });

  it('has a list with at least one task', () => {
    expect(element(by.css('.task-list'))
    .all(by.tagName('ion-item-sliding'))
    .count()).not.toBeLessThan(1);
  });

  it('opens task-details when clicking on a task', () => {
    element(by.css('.task-list'))
    .all(by.tagName('ion-item-sliding'))
    .first().click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      expect(browser.getTitle())
      .toEqual('Reflow Lead-Free');
    });
  });

});
