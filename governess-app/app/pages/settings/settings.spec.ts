import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  injectAsync,
  it,
}                        from '@angular/core/testing';

import {
  ComponentFixture,
  TestComponentBuilder,
}                        from '@angular/compiler/testing';

import { provide }              from '@angular/core';
import { SettingsPage }                from './settings';
import { Utils }                from '../../components/utils/utils';

import {
  Config,
  Form,
  App,
  NavController,
  NavParams,
  Platform,
}                               from 'ionic-angular';

import {ConfigService} from '../../providers/config/config';

class MockClass {
  public get(): any {
    return {};
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 42;
  }
}

let settingsPage: SettingsPage = null;
let settingsPageFixture: ComponentFixture<SettingsPage> = null;

describe('SettingsPage', () => {

  beforeEachProviders(() => [
    Form,
    provide(NavController, {useClass: MockClass}),
    provide(NavParams, {useClass: MockClass}),
    provide(Config, {useClass: MockClass}),
    provide(App, {useClass: MockClass}),
    provide(Platform, {useClass: MockClass}),
    provide(ConfigService, {useClass: MockClass}),
  ]);

  beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      .createAsync(SettingsPage)
      .then((componentFixture: ComponentFixture<SettingsPage>) => {
        settingsPageFixture = componentFixture;
        settingsPage = componentFixture.componentInstance;
        settingsPageFixture.detectChanges();
      })
      .catch(Utils.promiseCatchHandler);
  }));

  it('initialises', () => {
    expect(settingsPage).not.toBeNull();
    expect(settingsPageFixture).not.toBeNull();
  });
});
