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
import { AboutPage }                from './about';
import { Utils }                from '../../services/utils';
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

let aboutPage: AboutPage = null;
let aboutPageFixture: ComponentFixture<AboutPage> = null;

describe('AboutPage', () => {

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
      .createAsync(AboutPage)
      .then((componentFixture: ComponentFixture<AboutPage>) => {
        aboutPageFixture = componentFixture;
        aboutPage = componentFixture.componentInstance;
        aboutPageFixture.detectChanges();
      })
      .catch(Utils.promiseCatchHandler);
  }));

  it('initialises', () => {
    expect(aboutPage).not.toBeNull();
    expect(aboutPageFixture).not.toBeNull();
  });
});
