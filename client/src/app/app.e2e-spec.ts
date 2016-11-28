import { browser, element, by } from 'protractor';

describe('GovernessApp', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(500); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[0].click();
        browser.driver.sleep(500); // wait for the animation
        expect(browser.getTitle()).toEqual('EKA KF412 offline');
        return items[0];
      });
    });
  });

  it('has working {nav}', () => {
    expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
  });

  it('has correct header title', () => {
    expect(element(by.css('ion-navbar:first-child')).getText()).toContain('EKA KF412 idle');
  });

  it('has correct navbar title', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(500); // wait for the animation
        expect(element.all(by.css('.toolbar-title')).first().getText()).toEqual('Governess');
      }
    );
  });

  it('has left menu first link with title Control', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(500); // wait for the animation
        expect(element.all(by.css('ion-label')).first().getText()).toEqual('Control');
      }
    );
  });

  it('has left menu last link with title About', () => {
    element(by.css('.bar-button-menutoggle')).click()
      .then(() => {
        browser.driver.sleep(2000); // wait for the animation
        expect(element.all(by.css('ion-label')).last().getText()).toEqual('About');
      }
    );
  });
});
