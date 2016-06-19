/* tslint:disable:no-unused-variable */

import { ElementFinder } from 'protractor';

let searchField: ElementFinder = element(by.css('.text-input'));

describe('ProfilesPage', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('should switch into ProfilesPage from menu', () => {
    element(by.css('.bar-button-menutoggle')).click();
    expect(element.all(by.css('.toolbar-title')).last().getText()).toEqual('Profiles');
  });

  it('has a searchbar to filter Profiles', () => {
    expect(element(by.css('.searchbar-input')).isPresent()).toEqual(true);
  });

});
