import { ADDITIONAL_TEST_BROWSER_PROVIDERS, TEST_BROWSER_STATIC_PLATFORM_PROVIDERS } from '@angular/platform-browser/testing/browser_static';
import { BROWSER_APP_DYNAMIC_PROVIDERS }                from '@angular/platform-browser-dynamic';
import { resetBaseTestProviders, setBaseTestProviders } from '@angular/core/testing';
import { GovernessUIApp }                                   from './app';
import { HelpPage }                                        from './pages/help/help';

resetBaseTestProviders();

setBaseTestProviders(
  TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
  [
    BROWSER_APP_DYNAMIC_PROVIDERS,
    ADDITIONAL_TEST_BROWSER_PROVIDERS,
  ]
);

let governessUIApp: GovernessUIApp = null;

class MockClass {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }

  public close(): any {
    return true;
  }

  public setRoot(): any {
    return true;
  }
}

describe('GovernessUIApp', () => {

  beforeEach(() => {
    let mockClass: any = (<any>new MockClass());
    governessUIApp = new GovernessUIApp(mockClass,mockClass,mockClass);
  });

  it('initializes with 5 possible pages', () => {
    expect(governessUIApp['pages'].length).toEqual(5);
  });

  it('initializes with a root page', () => {
    expect(governessUIApp['rootPage']).not.toBe(null);
  });

  it('initializes with an app', () => {
    expect(governessUIApp['app']).not.toBe(null);
  });

  it('opens a page', () => {
    spyOn(governessUIApp['menu'], 'close');
    // cant be bothered to set up DOM testing for app.ts to get access to @ViewChild (Nav)
    governessUIApp['nav'] = (<any>governessUIApp['menu']);
    spyOn(governessUIApp['nav'], 'setRoot');
    governessUIApp.openPage(governessUIApp['pages'][3]);
    expect(governessUIApp['menu']['close']).toHaveBeenCalled();
    expect(governessUIApp['nav'].setRoot).toHaveBeenCalledWith(HelpPage);
  });
});
