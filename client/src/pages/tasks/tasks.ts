import { Component }          from '@angular/core';
import { reorderArray,
         NavController,
         AlertController,
         ModalController }    from 'ionic-angular';

import { ConfigService }      from '../../providers/config/config';
import { TaskService }        from '../../providers/tasks/tasks';
import { TasksHelp }          from './tasks.help';
import { TaskDetailPage }     from '../tasks/task.detail';

////////////////////////////////////////////////////////////////////////////////

@Component ({
  selector: 'tasks-page',
  templateUrl: 'tasks.html',
})

/*******************************************************************************
 *
 *   TasksPage
 *
 */

export class TasksPage {

  public tasks: any = [];
  public config: any = {};
  public filteredList: boolean = false;

  public navCtrl: NavController;
  public alertCtrl: AlertController;
  public modalCtrl: ModalController;
  public taskService: TaskService;
  public configService: ConfigService;

  /*****************************************************************************
   * constructor
   */

  constructor (

    navCtrl: NavController,
    alertCtrl: AlertController,
    modalCtrl: ModalController,
    taskService: TaskService,
    configService: ConfigService,

  ) {

    this.navCtrl = navCtrl;
    this.alertCtrl = alertCtrl;
    this.modalCtrl = modalCtrl;
    this.taskService = taskService;
    this.configService = configService;

    this.configService.init().then( () => {
      this.config = this.configService.config;
      this.taskService.init().then( () => {
        this.tasks = this.taskService.tasks;
      });
    });
  }

  /*****************************************************************************
   * openHelp
   */

  public openHelp(): void {
    let modal: any = this.modalCtrl.create(TasksHelp);
    modal.present(modal);
  }

  /*****************************************************************************
   * activateTask
   * @param
   */

  public activateTask(tid: string): void {
    this.config.taskActive = tid;
    this.configService.updateD();
  }

  /*****************************************************************************
   * FIXME: addTask
   */

  public addTask(): void {
    console.log('FIXME: Add a new empty task');
  }

  /*****************************************************************************
   * goToTaskDetail
   * @param
   */

  public goToTaskDetail(task: any): void {
    this.navCtrl.push(TaskDetailPage, task);
  }

  /*****************************************************************************
   * copyTask
   * @param
   */

  public copyTask(index: number): void {
    this.taskService.copy(index);
  }

  /*****************************************************************************
   * removeTask
   * @param
   */

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

  /*****************************************************************************
   * reorderTasks
   * @param
   */

  public reorderTasks(move: any): void {
    this.tasks = reorderArray(this.tasks, move);
    this.taskService.updateD();
  }

  /*****************************************************************************
   * filterTasks
   * @param
   */

  public filterTasks(name: any): void {
    this.tasks = this.taskService.tasks;
    let val: string = name.target.value;
    if (val && val.trim() !== '') {
      this.filteredList = true;
      this.tasks = this.tasks.filter( (task) => {
        return (
          task.name.toLowerCase().
          indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  /*****************************************************************************
   * clearFilter - Disengage Search Filter
   * @param
   */

  public clearFilter(event: any): void {
    this.filteredList = false;
    this.tasks = this.taskService.tasks;
    event.stopPropagation();
  }

  /*****************************************************************************
   * calculateRuntime - Iterate over all profiles to find the farthest timepoint
   * @param
   * @return number
   */

  public calculateRuntime(task: any): number {
    let seconds: number = 0;
    for ( let data of task.data ) {
      if ( data.points[ data.points.length - 1 ][0] > seconds ) {
        seconds = data.points[ data.points.length - 1 ][0];
      }
    }
    return seconds;
  }

}
