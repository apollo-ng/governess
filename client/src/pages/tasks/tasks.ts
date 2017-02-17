import { Component }          from '@angular/core';
import { reorderArray,
         NavController,
         AlertController,
         ModalController }    from 'ionic-angular';

import { ConfigService }      from '../../providers/config';
import { ApplianceService }   from '../../providers/appliances';
import { TaskService }        from '../../providers/tasks';
import { TasksHelp }          from './tasks.help';
import { TaskDetailPage }     from './task.detail';

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
  public appliances: any = [];
  public filteredTasks: any;
  public applianceFilter: string = 'All';
  public nameFilter: string;

  public navCtrl: NavController;
  public alertCtrl: AlertController;
  public modalCtrl: ModalController;
  public taskService: TaskService;
  public configService: ConfigService;
  public applianceService: ApplianceService;

  /*****************************************************************************
   * constructor
   */

  constructor (

    navCtrl: NavController,
    alertCtrl: AlertController,
    modalCtrl: ModalController,
    taskService: TaskService,
    configService: ConfigService,
    applianceService: ApplianceService,

  ) {

    this.navCtrl = navCtrl;
    this.alertCtrl = alertCtrl;
    this.modalCtrl = modalCtrl;
    this.taskService = taskService;
    this.configService = configService;
    this.applianceService = applianceService;

    this.configService.init().then( () => {
      this.config = this.configService.config;
      this.taskService.init().then( () => {
        this.tasks = this.taskService.tasks;
        this.filteredTasks = this.tasks;
      });
      this.applianceService.init().then( () => {
        this.appliances = this.applianceService.appliances;

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
   * filterPluginsByGroup - Populate filteredPlugins by group filtering
   */

  public filterTasksByAppliance(): void {
    this.filterTasks();
  }

  /*****************************************************************************
   * filterPluginsByName - Populate filteredPlugins by name search
   * @param
   */

  public filterTasksByName(event: any): void {

    if (event.target.value) {
      this.nameFilter = event.target.value.trim();
      this.filterTasks();
    } else {
      this.clearNameFilter(event);
    }

  }

  /*****************************************************************************
   * filterPlugins - Run the actual filtering
   */

  public filterTasks(): void {

    let tasks: any;

    // Filter by Group first
    if (this.applianceFilter === 'All') {
      tasks = this.tasks;
    } else {
      tasks = this.tasks.filter( (_task: any) => {
        return (_task.aid.indexOf(this.applianceFilter.trim()) > -1);
      });
    }

    // Apply name filter to group filtered list
    if (!this.nameFilter || this.nameFilter.length === 0) {
      this.filteredTasks = tasks;
    } else {
      this.filteredTasks = tasks.filter( (_task: any) => {
        return (
          _task.name.toLowerCase().
          indexOf(this.nameFilter.toLowerCase()) > -1
        );
      });
    }

  }

  /*****************************************************************************
   * clearNameFilter - Disengage the Name Filter and show the full list again
   * @param event Object
   */

  public clearNameFilter(event: any): void {
    event.stopPropagation();
    this.nameFilter = '';
    this.filterTasks();
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
