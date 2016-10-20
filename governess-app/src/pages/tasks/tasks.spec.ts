import { ComponentFixture,
         TestBed,
         async }                      from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { TasksPage }                  from './tasks';

let fixture: ComponentFixture<TasksPage> = null;
let instance: any = null;

describe('Pages: TasksPage', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([TasksPage]);
    fixture = TestBed.createComponent(TasksPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create TasksPage', async(() => {
    expect(instance).toBeTruthy();
  }));
});
