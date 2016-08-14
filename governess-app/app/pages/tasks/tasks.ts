'use strict';

import { Component, Input } from '@angular/core';
import { ItemSliding,
         NavController,
         AlertController } from 'ionic-angular';
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
  public alertCtrl: AlertController;
  public taskService: TaskService;
  public tasks: any;

  private searchQuery: string;

  //////////////////////////////////////////////////////////////////////

  constructor (

    navCtrl: NavController,
    alertCtrl: AlertController,
    taskService: TaskService

  ) {

    this.navCtrl = navCtrl;
    this.alertCtrl = alertCtrl;
    this.searchQuery = '';

    this.taskService = taskService;
    this.tasks = this.taskService.get();

  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  };

  public goToTaskDetail(task: any): void {
    console.log('Go to task detail:', task);
    this.navCtrl.push(TaskDetailPage, task);
  }

  public removeTask(slidingItem: ItemSliding, task: any): void {
      let confirm: any = this.alertCtrl.create({
        title: 'Please confirm:',
        message: 'Would you like to remove this task?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              // 
            },
          },
          {
            text: 'Remove',
            handler: () => {
              console.log('FIXME: Delete task via TaskService', task);
            },
          },
        ],
      });
      confirm.present();
    }

}
