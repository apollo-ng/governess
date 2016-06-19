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
import { TasksPage }                from './tasks';
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

let tasksPage: TasksPage = null;
let tasksPageFixture: ComponentFixture<TasksPage> = null;

describe('TasksPage', () => {

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
      .createAsync(TasksPage)
      .then((componentFixture: ComponentFixture<TasksPage>) => {
        tasksPageFixture = componentFixture;
        tasksPage = componentFixture.componentInstance;
        tasksPageFixture.detectChanges();
      })
      .catch(Utils.promiseCatchHandler);
  }));

  it('initialises', () => {
    expect(tasksPage).not.toBeNull();
    expect(tasksPageFixture).not.toBeNull();
  });
});
