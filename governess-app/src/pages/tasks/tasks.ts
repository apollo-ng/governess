import { Component }          from '@angular/core';
import { reorderArray,
         NavController,
         AlertController,
         ModalController }    from 'ionic-angular';
import { ConfigService }      from '../../providers/config/config';
import { TaskService }        from '../../providers/tasks/tasks';
import { TasksHelp }          from './tasks.help';
import { TaskDetailPage }     from '../tasks/task.detail';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  selector: 'tasks-page',
  templateUrl: 'tasks.html'
})

////////////////////////////////////////////////////////////////////////
//
//  TasksPage

export class TasksPage {

  public navCtrl: NavController;
  public alertCtrl: AlertController;
  public modalCtrl: ModalController;
  public taskService: TaskService;
  public tasks: any;
  public configService: ConfigService;
  public config: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

    navCtrl: NavController,
    alertCtrl: AlertController,
    modalCtrl: ModalController,
    taskService: TaskService,
    configService: ConfigService

  ) {

    this.navCtrl = navCtrl;
    this.alertCtrl = alertCtrl;
    this.modalCtrl = modalCtrl;

    this.taskService = taskService;


    this.configService = configService;
    this.config = {};

    this.initConfig().then(data => {
      this.taskService.pull();
      this.tasks = this.taskService.tasks;
      console.log(this.tasks);
    });

  }

  //////////////////////////////////////////////////////////////////////

  /*****************************************************************************
   * initConfig - as init is async separate logic here so it's testable
   * @param {event} task
   */

  public initConfig(): Promise<void> {
    return this.configService.get().then((data: string) => {
      //console.log('settings ngoninit configdata', data);
      this.config = JSON.parse(data);
      //console.log(this.config);
    });
  }

  /*****************************************************************************
   * initTasks - Create Task List Search Functionality
   * @param {event} task
   */

  public initTasks(): Promise<void> {
    return this.taskService.get().then((data: string) => {
      //console.log('settings ngoninit configdata', data);
      //this.tasks = JSON.parse(data);
      //console.log(this.config);
    });
  }

  /*****************************************************************************
   * openHelp - Create Task List Search Functionality
   * @param {event} task
   */

  public openHelp(): void {
    let modal: any = this.modalCtrl.create(TasksHelp);
    modal.present(modal);
  }

  /*****************************************************************************
   * activateTask - Create Task List Search Functionality
   * @param {event} task
   */

  public activateTask(task: any): void {
    console.log('Activate task:', task.tid);
    this.config.taskActive = task.tid;
    this.configService.update(this.config);
    console.log(this.config);
  }

  /*****************************************************************************
   * addTask - Create Task List Search Functionality
   * @param {event} task
   */

  public addTask(): void {
    console.log('FIXME: Add a new empty task');
  }

  /*****************************************************************************
   * goToTaskDetail - Create Task List Search Functionality
   * @param {event} task
   */

  public goToTaskDetail(task: any): void {
    // console.log('Go to task detail:', task);
    this.navCtrl.push(TaskDetailPage, task);
  }

  /*****************************************************************************
   * copyTask - Create Task List Search Functionality
   * @param {event} task
   */

  public copyTask(index: number): void {
    console.log('Duplicate task:', index);
    this.taskService.copy(index);
    this.tasks = this.taskService.tasks;
  }

  /*****************************************************************************
   * removeTask - Create Task List Search Functionality
   * @param {event} task
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
   * reorderTasks - Create Task List Search Functionality
   * @param {event} task
   */

  public reorderTasks(move: any): void {
    this.tasks = reorderArray(this.tasks, move);
    this.taskService.update(this.tasks);
  }

  /*****************************************************************************
   * searchInput - Create Task List Search Functionality
   * @param {event} task
   */

  public searchInput(event: any): void {
    this.tasks = this.taskService.tasks;
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

  /*****************************************************************************
   * searchClear - Disengage Search Filter
   * @param {event} task
   */

  public searchClear(event: any): void {
    this.tasks = this.taskService.tasks;
    event.stopPropagation();
  }

  /*****************************************************************************
   * calculateRuntime - Iterate over all profiles to find the farthest timepoint
   * @param {Object} task
   * @return number
   */

  public calculateRuntime(task: any): number {
    let seconds: number = 0;
    for ( let data of task.data ) {
      if ( data.points[data.points.length-1][0] > seconds ) {
        seconds = data.points[data.points.length-1][0];
      }
    }
    return seconds;
  }

}
