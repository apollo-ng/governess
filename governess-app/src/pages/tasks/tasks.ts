import { Component }          from '@angular/core';
import { reorderArray,
         NavController,
         AlertController }    from 'ionic-angular';
import { ConfigService }      from '../../providers/config/config';
import { TaskService }        from '../../providers/tasks/tasks';
import { TaskDetailPage }     from '../tasks/task-detail';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  selector: 'tasks-page',
  templateUrl: 'tasks.html'
})

////////////////////////////////////////////////////////////////////////
//
//

export class TasksPage {

  public navCtrl: NavController;
  public alertCtrl: AlertController;
  public taskService: TaskService;
  public tasks: any;
  public configService: ConfigService;
  public config: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

    navCtrl: NavController,
    alertCtrl: AlertController,
    taskService: TaskService,
    configService: ConfigService

  ) {

    this.navCtrl = navCtrl;
    this.alertCtrl = alertCtrl;

    this.taskService = taskService;
    this.taskService.pull();

    this.configService = configService;
    this.config = {};

    this.initConfig().then(data => {

      this.tasks = this.taskService.tasks;
    });

  }

  //////////////////////////////////////////////////////////////////////

  // as init is async separate logic here so it's testable
  public initConfig(): Promise<void> {
    return this.configService.get().then((data: string) => {
      //console.log('settings ngoninit configdata', data);
      this.config = JSON.parse(data);
      //console.log(this.config);
    });
  }

  public initTasks(): Promise<void> {
    return this.taskService.get().then((data: string) => {
      //console.log('settings ngoninit configdata', data);
      //this.tasks = JSON.parse(data);
      //console.log(this.config);
    });
  }

  public openHelp(): void {
    console.log('FIXME: Add proper help');
  }

  public activateTask(task: any): void {
    console.log('Activate task:', task);
    this.config.taskActive = task;
    this.configService.update(this.config);
    console.log(this.config);
  }

  public addTask(): void {
    console.log('FIXME: Add a new empty task');
  }

  public goToTaskDetail(task: any): void {
    // console.log('Go to task detail:', task);
    this.navCtrl.push(TaskDetailPage, task);
  }

  public copyTask(index: number): void {
    console.log('Duplicate task:', index);
    this.taskService.copy(index);
  }

  public removeTask(index: number, name: string): void {
    let confirm: any = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Do you really want to remove the task<br/>' + name + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { /* */ },
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

  public reorderTasks(move: any): void {
    this.tasks = reorderArray(this.tasks, move);
    this.taskService.update(this.tasks);
  }

  public searchClear(event: any): void {
    this.tasks = this.taskService.get();
    event.stopPropagation();
  }

  public searchInput(event: any): void {
    this.tasks = this.taskService.get();
    let val: string = event.target.value;
    if (val && val.trim() !== '') {
      this.tasks = this.tasks.filter((task) => {
        return (
          task.name.toLowerCase().
          indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

}
