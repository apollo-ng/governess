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
import { HomePage }                from './home';
import { Utils }                from '../../components/utils/utils';

import {
  Config,
  Form,
  App,
  NavController,
  NavParams,
  Platform,
}                               from 'ionic-angular';

import {CHART_DIRECTIVES} from 'ng2-charts';
import { ConfigService }            from '../../providers/config/config';

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

let homePage: HomePage = null;
let homePageFixture: ComponentFixture<HomePage> = null;

describe('HomePage', () => {

  beforeEachProviders(() => [
    Form,
    provide(NavController, {useClass: MockClass}),
    provide(NavParams, {useClass: MockClass}),
    provide(Config, {useClass: MockClass}),
    provide(App, {useClass: MockClass}),
    provide(Platform, {useClass: MockClass}),
    provide(CHART_DIRECTIVES, {useClass: MockClass}),
    provide(ConfigService, {useClass: MockClass}),

  ]);

  beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      .createAsync(HomePage)
      .then((componentFixture: ComponentFixture<HomePage>) => {
        homePageFixture = componentFixture;
        homePage = componentFixture.componentInstance;
        homePageFixture.detectChanges();
      })
      .catch(Utils.promiseCatchHandler);
  }));

  it('initialises', () => {
    expect(homePage).not.toBeNull();
    expect(homePageFixture).not.toBeNull();
  });
});
