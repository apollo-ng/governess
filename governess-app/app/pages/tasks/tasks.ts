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

  public navCtrl: NavController;
  public taskService: TaskService;
  public tasks: any;

  private searchQuery: string;

  //////////////////////////////////////////////////////////////////////

  constructor (

    navCtrl: NavController,
    taskService: TaskService

  ) {

    this.navCtrl = navCtrl;
    this.searchQuery = '';

    this.taskService = taskService;
    this.tasks = this.taskService.get();

  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  };

  public goToTaskDetail(task: any): any {
    console.log('Go to task detail:', task);
    this.navCtrl.push(TaskDetailPage, task);
  }

}
