import { ComponentFixture,
         TestBed,
         async }                      from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { AppliancePage }              from './appliance';

let fixture: ComponentFixture<AppliancePage> = null;
let instance: any = null;

describe('Pages: AppliancePage', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([AppliancePage]);
    fixture = TestBed.createComponent(AppliancePage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create AppliancePage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
