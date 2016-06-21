'use strict';

import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaskService } from '../../providers/tasks/tasks';
import { TaskDetailPage } from '../tasks/task-detail';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'build/pages/tasks/tasks.html',
  providers: [ TaskService ],
})

////////////////////////////////////////////////////////////////////////
//
//

export class TasksPage {

  @Input() public searchTasks: string;

  private nav: NavController;
  private searchQuery: string;

  public taskService: TaskService;
  public tasks: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

    nav: NavController,
    taskService: TaskService

  ) {

    this.nav = nav;
    this.searchQuery = '';

    taskService.getTasks().then( tasks => {
      // console.log('got a config', config);
      this.tasks = tasks;
    });

  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  };

  public goToTaskDetail(task: any): any {
    console.log('Go to task detail:', task);
    this.nav.push(TaskDetailPage, task);
  }

}
