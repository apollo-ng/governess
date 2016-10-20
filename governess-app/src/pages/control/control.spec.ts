import { ComponentFixture,
         TestBed,
         async }                      from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { ControlPage }                from './control';

let fixture: ComponentFixture<ControlPage> = null;
let instance: any = null;

describe('Pages: ControlPage', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([ControlPage]);
    fixture = TestBed.createComponent(ControlPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create ControlPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
