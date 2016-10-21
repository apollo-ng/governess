import { Component }            from '@angular/core';
import { NgClass }              from '@angular/common';
import { ActionSheetController,
         ModalController,
         ViewController,
         NavController }        from 'ionic-angular';

import { ConfigService }        from '../../providers/config/config';
import { StatusService }        from '../../providers/status/status';
import { TaskService }          from '../../providers/tasks/tasks';

import { TaskDetailPage }       from '../tasks/task.detail';

import { ControlHelp }          from './control.help';

/******************************************************************************/

/******************************************************************************/

@Component({
  selector:                     'control-page',
  templateUrl:                  'control.html'
})

/*******************************************************************************
 *
 *    ControlPage
 *
 ******************************************************************************/

export class ControlPage {

  public config:                any;
  public tasks:                 any;
  public task:                  any;
  public status:                any;
  public statusSub:             any;

  public lineChartData:         Array<any>;
  public lineChartColours:      Array<any>;
  public lineChartType:         string = 'line';

  /*****************************************************************************
  * constructor
  *****************************************************************************/

  constructor (

    public navCtrl:             NavController,
    public modalCtrl:           ModalController,
    public configService:       ConfigService,
    public taskService:         TaskService,
    public statusService:       StatusService

  ) {

    this.navCtrl =              navCtrl;
    this.modalCtrl =            modalCtrl;
    this.configService =        configService;
    this.taskService =          taskService;
    this.statusService =        statusService;
    this.lineChartData =        [{ data: [], label: 'Data' }];

    this.config =               {};
    this.task =                 {};

    this.status = {
      'status': 'offline',
      'temperature': 25.0
    };

    // This seems to work to get all the async promis/observable stuff
    // going without throwing undefined foo...
    this.initConfig().then(data => {
      this.taskService.pull     ();
      this.tasks =              this.taskService.tasks;
      this.task = this.tasks.filter(
        task => task.tid.includes(
          this.config.taskActive
        )
      )[0];

      this.updateChart          ();
    });

    // Subscribe and assign the websocket data handlers
    this.statusService.statusSocketRX().subscribe( (data) => {
      this.statusUpdate         (data);
    });

  }

  /*****************************************************************************
  * initConfig
  *
  * @param {event} task
  * @return boolean
  */

  public initConfig(): Promise<void> {
    return this.configService.get().then((data: string) => {
      this.config = JSON.parse(data);
    });
  }

  /*****************************************************************************
  * ionViewWillEnter
  *
  * @param {event} task
  * @return boolean
  */

  public ionViewWillEnter(): void {
    console.log('ControlPage ionViewWillEnter called');
  }

  /*****************************************************************************
  * ionViewDidLoad
  *
  * @param {event} task
  * @return boolean
  */

  public ionViewDidLoad(): void {
    console.log('ControlPage ionViewDidLoad called');
  }

  /*****************************************************************************
  * Returns boolean, whether websocket was FORCEFULLY closed.
  *
  * @param {event} task
  * @return boolean
  */

  public ionViewWillLeave(): void {
    console.log('ControlPage ionViewWillLeave called');
    //this.statusSub.unsubscribe();
    //this.statusService.disconnect();
  }

  /*****************************************************************************
   * openHelp
   */

  public openHelp(): void {
    let modal: any = this.modalCtrl.create(ControlHelp);
    modal.present(modal);
  }

  /*****************************************************************************
  * triggerUpdate
  *
  * @param {event} task
  * @return boolean
  */

  public triggerUpdate(data) {
    this.config = data;
    this.configService.update(this.config);

    this.task = this.tasks.filter(
      task => task.tid.includes(this.config.taskActive)
    )[0];;

    this.updateChart();
  }

  /*****************************************************************************
  * statusUpdate
  *
  * @param {event} task
  * @return boolean
  */

  public statusUpdate(data: any): void {
    this.status = JSON.parse(data);
    let temp: Array<any> = this.status.temperature.toString().split('.');
    this.status.temperature_major = temp[0];
    if (temp[1] > 1) {
      this.status.temperature_minor = temp[1];
    } else {
      this.status.temperature_minor = "0";
    }
  }

  /*****************************************************************************
  * lineChartOptions
  *
  * @param {event} task
  * @return boolean
  */

  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'second',
            unitStepSize: 15,
            displayFormats: {
              second: 'HH:mm:ss',
            },
          },
          gridLines: {
            color: 'rgba(255,255,255,0.15)',
            drawTicks: false,
          },
          ticks: {
            beginAtZero: false,
            fontColor: '#d8d3c5',
            fontFamily: 'DIN',
          },
        },
      ],
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          position: 'left',
          gridLines: {
            color: 'rgba(255,255,255,0.15)',
            drawTicks: false,
          },
          ticks: {
            beginAtZero: false,
            fontColor: '#d8d3c5',
            fontFamily: 'DIN',
            maxTicksLimit: 8,
          },
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          position: 'right',
          gridLines: {
            color: 'rgba(255,255,255,0.15)',
            drawTicks: false,
          },
          ticks: {
            beginAtZero: false,
            fontColor: '#d8d3c5',
            fontFamily: 'DIN',
            maxTicksLimit: 2,
          },
        },
      ],
    },
  };

  /*****************************************************************************
  * updateChart
  *
  * @param {event} task
  * @return boolean
  */

  public updateChart(): void {

    // Update the view parameters
    let _lineChartColours: Array<any> = new Array();
    for (let i: number = 0; i < this.task.data.length; i++) {
      _lineChartColours[i] = {
        backgroundColor: this.convertRGBA(this.task.data[i].options.color, 0.15),
        borderColor: this.task.data[i].options.color,
        borderWidth: this.task.data[i].options.strokeWidth,
        pointRadius: this.task.data[i].options.pointRadius,
        pointBorderWidth: this.task.data[i].options.pointBorderWidth,
        pointBackgroundColor: '#fff',
        pointBorderColor: this.task.data[i].options.color,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      };
    }

    // Update the datapoints (y axis)
    let _lineChartData: Array<any> = new Array();
    for (let i: number = 0; i < this.task.data.length; i++) {
      _lineChartData[i] = {
        data: new Array(this.task.data[i].points.length),
        label: this.task.data[i].control,
        lineTension: 0,
        yAxisID: this.task.data[i].options.yAxisID,
        fill: this.task.data[i].options.fill,
      };
      for (let j: number = 0; j < this.task.data[i].points.length; j++) {
        _lineChartData[i].data[j] = {
          'x': new Date(this.task.data[i].points[j][0] * 1000).toISOString(),
          'y': this.task.data[i].points[j][1],
        };
      }
    }
    this.lineChartData = _lineChartData;
    this.lineChartColours = _lineChartColours;
  }

  /*****************************************************************************
  * convertRGBA
  *
  * @param {event} task
  * @return boolean
  */

  public convertRGBA(color: string, alpha: number): string {
    let _color: string = color;
    if (color.match(/rgb\(/i)) {
      _color = color.replace(/rgb\(/i, 'rgba(');
      _color = _color.replace(/\)/i, ',' + alpha + ')');
    } else {
      _color = _color.replace(/\d*(\.\d+)?\)/i, ',' + alpha + ')');
    }
    return _color;
  }

  /*****************************************************************************
  * chartClicked
  *
  * @param {event} task
  * @return boolean
  */

  public chartClicked(e: any): void {
    console.log(e);
  }

  /*****************************************************************************
  * chartHovered
  *
  * @param {event} task
  * @return boolean
  */

  public chartHovered(e: any): void {
    console.log(e);
  }

  /*****************************************************************************
  * playSound
  *
  * @param {event} task
  * @return boolean
  */

  public playSound(file: string): void {
    let audio: any = new Audio();
    audio.src = 'assets/audio/' + file;
    audio.load();
    audio.play();
  }

  /*****************************************************************************
  * setMode
  *
  * @param {event} task
  * @return boolean
  */

  public setMode(mode: string): void {
    this.config.ctrlMode = mode;
    this.configService.update(this.config);
  }

  /*****************************************************************************
  * editTask
  *
  * @param {event} task
  * @return boolean
  */

  public editTask(): void {
    if (this.task) this.navCtrl.push(TaskDetailPage, this.task);
  }

  /*****************************************************************************
  * startTask
  *
  * @param {event} task
  * @return boolean
  */

  public startTask(): void {
    if (this.config.audio) this.playSound('run.mp3');
    console.log('Start Task');
    this.status = 'running';
  }

  /*****************************************************************************
  * pauseTask
  *
  * @param {event} task
  * @return boolean
  */

  public pauseTask(): void {
    if (this.config.audio) this.playSound('float.mp3');
    console.log('Pause Task');
    this.status = 'paused';
  }

  /*****************************************************************************
  * restartTask
  *
  * @param {event} task
  * @return boolean
  */

  public restartTask(): void {
    if (this.config.audio) this.playSound('float.mp3');
    console.log('Restart Task');
    this.status = 'running';
  }

  /*****************************************************************************
  * stopTask
  *
  * @param {event} task
  * @return boolean
  */

  public stopTask(): void {
    if (this.config.audio) this.playSound('stop.mp3');
    console.log('Stop Task');
    this.status = 'idle';
  }

}
