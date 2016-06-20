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
import { AppliancePage }                from './appliance';
import { Utils }                from '../../components/utils/utils';

import {
  Config,
  Form,
  App,
  NavController,
  NavParams,
  Platform,
}                               from 'ionic-angular';

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

let appliancePage: AppliancePage = null;
let appliancePageFixture: ComponentFixture<AppliancePage> = null;

describe('AppliancePage', () => {

  beforeEachProviders(() => [
    Form,
    provide(NavController, {useClass: MockClass}),
    provide(NavParams, {useClass: MockClass}),
    provide(Config, {useClass: MockClass}),
    provide(App, {useClass: MockClass}),
    provide(Platform, {useClass: MockClass}),
  ]);

  beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      .createAsync(AppliancePage)
      .then((componentFixture: ComponentFixture<AppliancePage>) => {
        appliancePageFixture = componentFixture;
        appliancePage = componentFixture.componentInstance;
        appliancePageFixture.detectChanges();
      })
      .catch(Utils.promiseCatchHandler);
  }));

  it('initialises', () => {
    expect(appliancePage).not.toBeNull();
    expect(appliancePageFixture).not.toBeNull();
  });
});
