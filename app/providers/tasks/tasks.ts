'use strict';

import { Injectable }             from '@angular/core';
import { Storage, SqlStorage }    from 'ionic-angular';
import { TASKMODEL }              from './task-model.ts';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class TaskService {

  private tasks: any;
  private storage: Storage;

  //////////////////////////////////////////////////////////////////////

  constructor (

  ) {

    this.storage = new Storage (SqlStorage, { name: 'governess'});

  }

  public load(): any {

    if (this.tasks) {
      console.log('Tasks already loaded');
      return Promise.resolve(this.tasks);
    }

    return new Promise(resolve => {
      this.storage.get('tasks').then( (tasks) => {
        if (!tasks) {
          console.log('No tasks in DB - Initiate from TASKMODEL', TASKMODEL);
          this.storage.set('tasks', JSON.stringify(TASKMODEL));
          tasks = TASKMODEL;
        } else {
          console.log('Returning user - Load tasks from DB', tasks);
          tasks = JSON.parse(tasks);
        }
        resolve(tasks);
      });
    });

  }

  public reset(): any {
    console.log('resetting...');
    this.storage.set('config', JSON.stringify(TASKMODEL));
  }

  public getTasks(): any {
    return this.load().then(tasks => {
      console.log('getTasks called', tasks);
      return tasks;
    });
  }

  public update(config: Object): any {
    this.storage.set('config', JSON.stringify(config));
  }

}
