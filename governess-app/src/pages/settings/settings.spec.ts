import { ComponentFixture,
         TestBed,
         async }                      from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { SettingsPage }               from './settings';

let fixture: ComponentFixture<SettingsPage> = null;
let instance: any = null;

describe('Pages: SettingsPage', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([SettingsPage]);
    fixture = TestBed.createComponent(SettingsPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create SettingsPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
