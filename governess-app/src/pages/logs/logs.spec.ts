import { ComponentFixture,
         TestBed,
         async }                      from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { LogsPage }                  from './logs';

let fixture: ComponentFixture<LogsPage> = null;
let instance: any = null;

describe('Pages: LogsPage', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([LogsPage]);
    fixture = TestBed.createComponent(LogsPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create LogsPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
