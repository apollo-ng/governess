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
import { ProfilesPage }                from './profiles';
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

let profilesPage: ProfilesPage = null;
let profilesPageFixture: ComponentFixture<ProfilesPage> = null;

describe('ProfilesPage', () => {

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
      .createAsync(ProfilesPage)
      .then((componentFixture: ComponentFixture<ProfilesPage>) => {
        profilesPageFixture = componentFixture;
        profilesPage = componentFixture.componentInstance;
        profilesPageFixture.detectChanges();
      })
      .catch(Utils.promiseCatchHandler);
  }));

  it('initialises', () => {
    expect(profilesPage).not.toBeNull();
    expect(profilesPageFixture).not.toBeNull();
  });
});
