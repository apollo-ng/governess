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
import { HelpPage }                from './help';
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

let helpPage: HelpPage = null;
let helpPageFixture: ComponentFixture<HelpPage> = null;

describe('HelpPage', () => {

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
      .createAsync(HelpPage)
      .then((componentFixture: ComponentFixture<HelpPage>) => {
        helpPageFixture = componentFixture;
        helpPage = componentFixture.componentInstance;
        helpPageFixture.detectChanges();
      })
      .catch(Utils.promiseCatchHandler);
  }));

  it('initialises', () => {
    expect(helpPage).not.toBeNull();
    expect(helpPageFixture).not.toBeNull();
  });
});
