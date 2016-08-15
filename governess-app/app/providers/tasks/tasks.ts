'use strict';

import { Injectable }             from '@angular/core';
import { TASKMODEL }              from './task-model.ts';
import { UUID }                   from 'angular2-uuid';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class TaskService {

  public tasks: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

  ) {

    let tasks: string = localStorage.getItem('tasks');

    if (!tasks) {
      console.log('No tasks in DB - Initiate from TASKMODEL', TASKMODEL);
      localStorage.setItem('tasks', JSON.stringify(TASKMODEL));
      this.tasks = TASKMODEL;
    } else {
      console.log('Returning user - Load tasks from DB', tasks);
      this.tasks = JSON.parse(tasks);
    }

  }

  //////////////////////////////////////////////////////////////////////

  public get(): any {
    return this.tasks;
  }

  public copy(index: number): void {
    let copy: any = this.tasks[index];
    copy.name = copy.name + ' Copy';
    copy.id = UUID.UUID();
    copy.created = Math.round(new Date().getTime());
    console.log('New task', copy);
    this.tasks.push(copy);
    this.update(this.tasks);
  }

  public delete(index: number): void {
    this.tasks.splice(index, 1);
    this.update(this.tasks);
  }

  public update(tasks: Object): any {
    console.log('Updating tasks...');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public reset(): any {
    console.log('Resetting tasks...');
    localStorage.setItem('tasks', JSON.stringify(TASKMODEL));
  }



}
