import { ComponentFixture,
         TestBed,
         async }                      from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { HelpPage }                  from './help';

let fixture: ComponentFixture<HelpPage> = null;
let instance: any = null;

describe('Pages: HelpPage', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([HelpPage]);
    fixture = TestBed.createComponent(HelpPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create HelpPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
