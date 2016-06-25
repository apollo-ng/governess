
import { ADDITIONAL_TEST_BROWSER_PROVIDERS, TEST_BROWSER_STATIC_PLATFORM_PROVIDERS } from '@angular/platform-browser/testing/browser_static';
import { BROWSER_APP_DYNAMIC_PROVIDERS }                from '@angular/platform-browser-dynamic';
import { resetBaseTestProviders,
         setBaseTestProviders,
         beforeEachProviders } from '@angular/core/testing';
import { provide }              from '@angular/core';
import { ConfigService }            from './providers/config/config';
import { GovernessApp }                                   from './app';
import { HelpPage }                                        from './pages/help/help';

resetBaseTestProviders();

setBaseTestProviders (
  TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
  [
    BROWSER_APP_DYNAMIC_PROVIDERS,
    ADDITIONAL_TEST_BROWSER_PROVIDERS,
  ]
);

let governessApp: GovernessApp = null;

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

  public load(): any {
    return true;
  }

  public openPage(): any {
    return true;
  }
}

describe('GovernessApp', () => {

  beforeEachProviders(() => [
    provide(ConfigService, {useClass: MockClass}),
  ]);

  beforeEach(() => {
    let mockClass: any = (<any>new MockClass());
    governessApp = new GovernessApp(mockClass, mockClass, mockClass);
  });

  it('initializes with 7 possible pages', () => {
    expect(governessApp['pages'].length).toEqual(7);
  });

  it('initializes with a root page', () => {
    expect(governessApp['rootPage']).not.toBe(null);
  });

  it('initializes with an app', () => {
    expect(governessApp['app']).not.toBe(null);
  });

  it('opens a page', () => {
    spyOn(governessApp['menu'], 'close');
    // cant be bothered to set up DOM testing for app.ts to get access to @ViewChild (Nav)
    governessApp['nav'] = (<any>governessApp['menu']);
    spyOn(governessApp['nav'], 'setRoot');
    governessApp.openPage(governessApp['pages'][5]);
    expect(governessApp['menu']['close']).toHaveBeenCalled();
    expect(governessApp['nav'].setRoot).toHaveBeenCalledWith(HelpPage);
  });
});
