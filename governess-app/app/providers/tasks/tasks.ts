'use strict';

import { Injectable }             from '@angular/core';
import { TASKMODEL }              from './task-model.ts';

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

  public update(tasks: Object): any {
    console.log('Updating tasks...');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}
