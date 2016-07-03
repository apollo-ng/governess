
describe('HomePage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('has correct title', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[0].click().then(() => {
          browser.driver.sleep(1000);
          expect(browser.getTitle()).toEqual('EKA KF412 idle');
        });
      });
    });
  });

  it('has <nav>', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[0].click().then(() => {
          browser.driver.sleep(1000);
          expect(element(by.css('ion-navbar')).isPresent()).toEqual(true);
        });
      });
    });
  });

  it('has a menu button that displays the left menu', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[0].click().then(() => {
          browser.driver.sleep(1000);
          expect(element.all(by.css('.toolbar-title')).first().getText()).toEqual('Governess');
        });
      });
    });
  });

  it('has segment buttons', () => {
    element(by.css('.bar-button-menutoggle')).click().then(() => {
      browser.driver.sleep(1000); // wait for the animation
      element.all(by.className('input-wrapper')).then((items) => {
        items[0].click().then(() => {
          browser.driver.sleep(1000);
          expect(element(by.css('.home-segment')).isPresent()).toEqual(true);
        });
      });
    });
  });

});
