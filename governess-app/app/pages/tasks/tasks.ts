'use strict';

import { Component, Input }   from '@angular/core';
import { ItemSliding,
         reorderArray,
         NavController,
         AlertController }    from 'ionic-angular';
import { TaskService }        from '../../providers/tasks/tasks';
import { TaskDetailPage }     from '../tasks/task-detail';

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

  public navCtrl: NavController;
  public alertCtrl: AlertController;
  public taskService: TaskService;
  public tasks: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

    navCtrl: NavController,
    alertCtrl: AlertController,
    taskService: TaskService

  ) {

    this.navCtrl = navCtrl;
    this.alertCtrl = alertCtrl;

    this.taskService = taskService;
    this.tasks = this.taskService.get();

  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  }

  public goToTaskDetail(task: any): void {
    // console.log('Go to task detail:', task);
    this.navCtrl.push(TaskDetailPage, task);
  }

  public copyTask(index: number): void {
    // console.log('Duplicate task:', index);
    this.taskService.copy(index);
  }

  public removeTask(index: number, name: string): void {
    let confirm: any = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Do you really want to remove the task<br/>'+ name +'?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.taskService.delete(index);
          },
        },
      ],
    });
    confirm.present();
  }

  public reorderTasks(index: any): void {
    console.log('index', index);
    this.tasks = reorderArray(this.tasks, index);
    this.taskService.update(this.tasks);
  }

  public searchClear(event: any): void {
    this.tasks = this.taskService.get();
    event.stopPropagation();
  }

  public searchInput(event: any): void {
    this.tasks = this.taskService.get();
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.tasks = this.tasks.filter((task) => {
        return (
          task.name.toLowerCase().
          indexOf(val.toLowerCase()) > -1
        );
      })
    }
  }

}
