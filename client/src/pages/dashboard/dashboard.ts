import { Component, ViewChild } from '@angular/core';
import { ModalController,
         NavController }        from 'ionic-angular';

import { ConfigService }        from '../../providers/config/config';
import { StatusService }        from '../../providers/status/status';
import { TaskService }          from '../../providers/tasks/tasks';

import { TaskDetailPage }       from '../tasks/task.detail';

import { DashboardHelp }        from './dashboard.help';

import { ChartComponent }       from 'angular2-chartjs';
import { lineChartGlobals }     from '../../components/chart-globals';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector:                     'dashboard',
  templateUrl:                  'dashboard.html',
  host:                         { '(window:resize)': 'onResize($event)' },
})

/*******************************************************************************
 *
 *    Dashboard
 *
 */

export class Dashboard {

  @ViewChild(ChartComponent) public chartc: ChartComponent;

  public config:                any;
  public tasks:                 any;
  public task:                  any;
  public status:                any;
  public statusSub:             any;

  public lineChartData:         any;
  public lineChartOptions:      any;
  public lineChartColours:      any;
  public chartHeight:           number;
  public chartHeightAct:        number;

  public navCtrl:               NavController;
  public modalCtrl:             ModalController;
  public configService:         ConfigService;
  public taskService:           TaskService;
  public statusService:         StatusService;

  /*****************************************************************************
   * constructor
   */

  constructor (

    navCtrl:                    NavController,
    modalCtrl:                  ModalController,
    configService:              ConfigService,
    taskService:                TaskService,
    statusService:              StatusService,

  ) {

    this.navCtrl =              navCtrl;
    this.modalCtrl =            modalCtrl;
    this.configService =        configService;
    this.taskService =          taskService;
    this.statusService =        statusService;

    this.chartHeight =          Math.floor(window.innerHeight - 210);
    this.lineChartData =        { datasets: [] };
    this.lineChartOptions =     lineChartGlobals;

    this.config =               {};
    this.task =                 {};

    this.status = {
      'status': 'offline',
      'temperature': 25.0,
    };

    // This seems to work to get all the async promis/observable stuff
    // going without throwing undefined foo...

    this.configService.init().then( () => {
      this.config = this.configService.config;
      this.taskService.init().then( () => {
        this.tasks = this.taskService.tasks;
        this.task = this.tasks.filter(
          task => task.tid.includes(
            this.config.taskActive
          )
        )[0];

        // Crude hack to prevent exception during init with no app/task selected
        if (this.task) {
          this.updateChart();
        }
      });
    });

    // Subscribe and assign the websocket data handlers
    this.statusService.statusSocketRX().subscribe( (data: any) => {
      this.statusUpdate(data);
    });

  }

  /*****************************************************************************
   * ionViewWillEnter
   */

  public ionViewWillEnter(): void {
    console.log('Dashboard ionViewWillEnter called');
  }

  /*****************************************************************************
   * ionViewDidLoad
   */

  public ionViewDidLoad(): void {
    console.log('Dashboard ionViewDidLoad called');
  }

  /*****************************************************************************
   * ionViewWillLeave
   */

  public ionViewWillLeave(): void {
    console.log('Dashboard ionViewWillLeave called');
    // this.statusSub.unsubscribe();
    // this.statusService.disconnect();
  }

  /*****************************************************************************
   * onResize
   */

  public onResize(event: any): void {
    this.chartHeight = Math.floor(event.target.innerHeight - 210);
  }

  /*****************************************************************************
   * openHelp
   */

  public openHelp(): void {
    let modal: any = this.modalCtrl.create(DashboardHelp);
    modal.present(modal);
  }

  /*****************************************************************************
   * triggerUpdate
   * @param {event} task
   */

  public triggerUpdate(_config: any): void {
    this.config = _config;
    this.configService.update(this.config);

    this.task = this.tasks.filter(
      task => task.tid.includes(this.config.taskActive)
    )[0];

    this.updateChart();
  }

  /*****************************************************************************
   * statusUpdate
   * @param {event} task
   */

  public statusUpdate(_status: any): void {
    this.status = JSON.parse(_status);
    let temp: Array<any> = this.status.temperature.toString().split('.');
    this.status.temperature_major = temp[0];
    if (temp[1] > 1) {
      this.status.temperature_minor = temp[1];
    } else {
      this.status.temperature_minor = '0';
    }
  }

  /*****************************************************************************
   * updateChart
   * @param {event} task
   */

  public updateChart(): void {

    // Update the datapoints (y axis)
    let _lineChartData: any = new Array();
    for (let i: number = 0; i < this.task.data.length; i++) {
      if (this.task.data[i].show === true) {
        _lineChartData[i] = {
          label: this.task.data[i].control,
          lineTension: 0,
          yAxisID: this.task.data[i].options.yAxisID,
          fill: this.task.data[i].options.fill,
          backgroundColor: this.setColorAlpha(this.task.data[i].options.color, 0.15),
          borderColor: this.task.data[i].options.color,
          borderWidth: this.task.data[i].options.strokeWidth,
          pointRadius: this.task.data[i].options.pointRadius,
          pointBorderWidth: this.task.data[i].options.pointBorderWidth,
          pointBackgroundColor: '#fff',
          pointBorderColor: this.task.data[i].options.color,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          data: new Array(this.task.data[i].points.length),
        };
        for (let j: number = 0; j < this.task.data[i].points.length; j++) {
          _lineChartData[i].data[j] = {
            'x': this.task.data[i].points[j][0],
            'y': this.task.data[i].points[j][1],
          };
        }
      }
    }

    this.lineChartData.datasets = _lineChartData;
    console.log('Updated chart:', this.lineChartData);
    if (this.chartc) this.chartc.chart.update();
  }

  /*****************************************************************************
   * setColorAlpha
   */

  public setColorAlpha(color: string, alpha: number): any {
    const rgbaParser: any = {
      re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
    };
    let colors: any = rgbaParser.re.exec(color);
    return ('rgba(' + colors[2] + ',' + colors[3] + ',' + colors[4] + ',' + alpha + ')');
  }

  /*****************************************************************************
   * playSound
   * @param {event} task
   */

  public playSound(file: string): void {
    let audio: any = new Audio();
    audio.src = 'assets/audio/' + file;
    audio.load();
    audio.play();
  }

  /*****************************************************************************
   * setMode
   * @param {event} task
   */

  public setMode(mode: string): void {
    this.config.ctrlMode = mode;
    this.configService.update(this.config);
  }

  /*****************************************************************************
   * editTask
   */

  public editTask(): void {
    if (this.task) this.navCtrl.push(TaskDetailPage, this.task);
  }

  /*****************************************************************************
   * startTask
   */

  public startTask(): void {
    if (this.config.audio) this.playSound('run.mp3');
    console.log('Start Task');
    this.status = 'running';
  }

  /*****************************************************************************
   * pauseTask
   */

  public pauseTask(): void {
    if (this.config.audio) this.playSound('float.mp3');
    console.log('Pause Task');
    this.status = 'paused';
  }

  /*****************************************************************************
   * restartTask
   */

  public restartTask(): void {
    if (this.config.audio) this.playSound('float.mp3');
    console.log('Restart Task');
    this.status = 'running';
  }

  /*****************************************************************************
   * stopTask
   */

  public stopTask(): void {
    if (this.config.audio) this.playSound('stop.mp3');
    console.log('Stop Task');
    this.status = 'idle';
  }

}
