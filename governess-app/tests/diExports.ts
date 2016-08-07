import { provide, Type }          from '@angular/core';
import { ComponentFixture,
         TestComponentBuilder }   from '@angular/compiler/testing';
import { inject, async }          from '@angular/core/testing';
import { Control }                from '@angular/common';
import { App,
         Config,
         Form,
         NavController,
         ModalController,
         ToastController,
         ActionSheetController,
         Platform }               from 'ionic-angular';
import { ConfigMock, NavMock }    from './mocks';
import { Utils }                  from '../app/components/utils/utils';
import { ConfigService }          from '../app/providers/config/config';
export { TestUtils }              from './testUtils';

export let providers: Array<any> = [
  Form,
  provide(Config, {useClass: ConfigMock}),
  provide(App, {useClass: ConfigMock}),
  provide(NavController, {useClass: NavMock}),
  provide(ModalController, {useClass: NavMock}),
  provide(ToastController, {useClass: NavMock}),
  provide(ActionSheetController, {useClass: NavMock}),
  provide(ConfigService, {useClass: ConfigMock}),
  provide(Platform, {useClass: ConfigMock}),
];

export let injectAsyncWrapper: Function = ((callback) => async(inject([TestComponentBuilder], callback)));

export let asyncCallbackFactory: Function = ((component, testSpec, detectChanges, beforeEachFn) => {
  return ((tcb: TestComponentBuilder) => {
    return tcb.createAsync(component)
      .then((fixture: ComponentFixture<Type>) => {
        testSpec.fixture = fixture;
        testSpec.instance = fixture.componentInstance;
        testSpec.instance.control = new Control('');
        if (detectChanges) fixture.detectChanges();
        if (beforeEachFn) beforeEachFn(testSpec);
      })
      .catch(Utils.promiseCatchHandler);
  });
});
