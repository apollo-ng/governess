import { Injectable }             from '@angular/core';
import { UUID }                   from 'angular2-uuid';
import { StorageService }         from '../storage/storage';
import { TaskModel }              from './task.model';
import { TaskMock }               from './task.mock';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class TaskService {

  public storage: StorageService;
  public tasks: any;

  //////////////////////////////////////////////////////////////////////

  constructor (
    storage: StorageService
  ) {

    this.storage = storage;
    this.tasks = [];
    this.init().then(data => {
      //console.log('All promises returned', data)
      this.tasks = data;
    });


    /*let tasks: string = localStorage.getItem('tasks');

    if (!tasks) {
      console.log('No tasks in DB - Initiate from TASKMODEL', TaskMock);
      localStorage.setItem('tasks', JSON.stringify(TaskMock));
      this.tasks = TaskMock;
    } else {
      console.log('Returning user - Load tasks from DB', tasks);
      this.tasks = JSON.parse(tasks);
    }
*/
  }

  //////////////////////////////////////////////////////////////////////


  public init(): Promise<{}> {
    console.log('Initializing Task Service');

    return this.storage.get('tasks').then((data: string) => {
      if (!data) {
        console.log('Got NO Storage Data - creating from Mock:');
        let initTask: any = TaskMock;
        this.storage.set('tasks', JSON.stringify(TaskMock));
        this.tasks = TaskMock;
        return TaskMock;
      }
      //console.log('Got Storage Data:', data);
      this.tasks = JSON.parse(data);
      return JSON.parse(data);
    });
  }

  public get(): Promise<{}> {
    return this.storage.get('tasks')
  }

  public pull(): any {
    this.get().then((data: string) => {
      this.tasks = JSON.parse(data);
    });
  }

  public copy(index: number): void {
    console.log('copy called to clone', this.tasks);
    // crude hack to copy the array after lodash deepClone refused to work
    let copy: any = JSON.parse(JSON.stringify(this.tasks[index]));
    copy.name = copy.name + ' Copy';
    copy.id = UUID.UUID();
    copy.created = Math.round(new Date().getTime());
    this.tasks.push(copy);
    this.update(this.tasks);
  }

  public delete(index: number): void {
    this.tasks.splice(index, 1);
    this.update(this.tasks);
  }

  public update(tasks: Object): any {
    console.log('Updating tasks...');
    this.storage.set('tasks', JSON.stringify(tasks));
  }

  public reset(): any {
    console.log('Resetting tasks...');
    this.storage.set('tasks', JSON.stringify(TaskMock));
  }

}
