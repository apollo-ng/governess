import { ComponentFixture,
         TestBed,
         async }                      from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { AboutPage }                  from './about';

let fixture: ComponentFixture<AboutPage> = null;
let instance: any = null;

describe('Pages: AboutPage', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([AboutPage]);
    fixture = TestBed.createComponent(AboutPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create AboutPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
