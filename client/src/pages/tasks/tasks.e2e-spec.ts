
import { browser, element, by } from 'protractor';

describe('TasksPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(500); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[2].click();
        browser.driver.sleep(500); // wait for the animation
        expect(browser.getTitle()).toEqual('Tasks');
        return items[2];
      });
    });
  });

  it('has correct header title', () => {
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('Tasks');
  });

  it('has a navbar', () => {
    expect(element(by.css('ion-navbar'))
    .isPresent()).toEqual(true);
  });

  it('has a search box to filter tasks', () => {
    expect(element(by.css('.searchbar-input')).isPresent()).toEqual(true);
  });

  it('has a list of tasks', () => {
    expect(element(by.css('ion-list')).isPresent()).toEqual(true);
  });

  it('opens TaskDetailsPage', () => {
    element.all(by.className('task-list-item')).then((tasks) => {
      tasks[0].click();
      browser.driver.sleep(5000); // wait for the animation
      expect(element(by.css('ion-title')).getText()).toContain('Reflow Lead-Free');
    });
  });

});
