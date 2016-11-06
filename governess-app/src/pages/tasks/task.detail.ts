import { Component }                from '@angular/core';

import { NavParams,
         NavController,
         AlertController,
         ModalController,
         PopoverController,
         ActionSheetController }    from 'ionic-angular';

import { TaskService }              from '../../providers/tasks/tasks';
import { TimeformatSelector }       from '../../components/timeformat-selector';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'task-detail-page',
  templateUrl: 'task.detail.html',
})

/*******************************************************************************
 *
 *   TaskDetailPage
 *
 */

export class TaskDetailPage {

  public task: any;
  public data: any;
  public chartHeight: number;
  public chartHeightAct: number;
  public lineChartData: any;
  public lineChartColours: any;
  public moduleView: number;
  public showMiniBar: boolean;
  public newPointData: any;

  public alertCtrl: AlertController;
  public modalCtrl: ModalController;
  public navCtrl: NavController;
  public popoverCtrl: PopoverController;
  public actionSheetCtrl: ActionSheetController;
  public navParams: NavParams;
  public taskService: TaskService;

  constructor(

    alertCtrl: AlertController,
    modalCtrl: ModalController,
    navCtrl: NavController,
    popoverCtrl: PopoverController,
    actionSheetCtrl: ActionSheetController,
    navParams: NavParams,
    taskService: TaskService,

  ) {

    this.alertCtrl = alertCtrl;
    this.modalCtrl = modalCtrl;
    this.navCtrl = navCtrl;
    this.popoverCtrl = popoverCtrl;
    this.actionSheetCtrl = actionSheetCtrl;
    this.navParams = navParams;
    this.taskService = taskService;

    this.task = this.navParams.data;
    this.data = this.task.data;
    this.moduleView = 0;
    this.showMiniBar = false;
    this.chartHeight = Math.floor(window.innerHeight / 2);
    this.lineChartData = [{ data: [], label: 'Data' }];
    this.updateChart();
    console.log(this.chartHeight);
    this.newPointData = {
      time: '',
      target: '',
      note: '',
    };
  }

  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'second',
            unitStepSize: 30,
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
            fontSize: 14,
            fontFamily: 'DIN',
            padding: 0,
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

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public dragSplitbar(e: any): void {
    let newHeight: number = this.chartHeight + e.deltaY;
    if (newHeight < 150) newHeight = 150;
    if (newHeight > 800) newHeight = 800;
    this.chartHeight = newHeight;
    console.log(this.chartHeight);
/*
    this.lineChartData = this.lineChartData.slice();
    if (e.isFinal) {
      this.chartHeight = this.chartHeightAct;
      //this.updateChart();
      this.lineChartData = this.lineChartData.slice();
    }
    */
  }

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

  public updateChart(): void {

    // Update the view parameters
    let _lineChartColours: any = new Array();
    for (let i: number = 0; i < this.data.length; i++) {
      _lineChartColours[i] = {
        backgroundColor: this.convertRGBA(this.data[i].options.color, 0.15),
        borderColor: this.data[i].options.color,
        borderWidth: this.data[i].options.strokeWidth,
        pointRadius: this.data[i].options.pointRadius,
        pointBorderWidth: this.data[i].options.pointBorderWidth,
        pointBackgroundColor: '#fff',
        pointBorderColor: this.data[i].options.color,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      };
    }

    // Update the datapoints (y axis)
    let _lineChartData: any = new Array();
    for (let i: number = 0; i < this.data.length; i++) {
      _lineChartData[i] = {
        data: new Array(this.data[i].points.length),
        label: this.data[i].control,
        lineTension: 0,
        yAxisID: this.data[i].options.yAxisID,
        fill: this.data[i].options.fill,
      };
      for (let j: number = 0; j < this.data[i].points.length; j++) {
        _lineChartData[i].data[j] = {
          'x': new Date(this.data[i].points[j][0] * 1000).toISOString(),
          'y': this.data[i].points[j][1],
        };
      }
    }
    this.lineChartData = _lineChartData;
    this.lineChartColours = _lineChartColours;
    this.lineChartData = this.lineChartData.slice();
  }

  public setModuleView(view: number): void {
    this.moduleView = view;
    console.log('modview', this.moduleView);
  }

  public taskActionSheet(): void {
    let actionSheet: any = this.actionSheetCtrl.create({
      title: 'More Task options',
      buttons: [
        {
          text: 'Rename',
          icon: 'create',
          handler: () => {
            console.log('Rename clicked');
            this.renameTask(this.task);
          },
        },
        {
          text: 'Constraint',
          icon: 'flash',
          handler: () => {
            console.log('Constraint clicked');
            this.constraintTask(this.task);
          },
        },
        {
          text: 'Clone',
          icon: 'copy',
          handler: () => {
            console.log('FIXME: Clone clicked');
          },
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            console.log('FIXME: Delete clicked');
          },
        },
        {
          text: 'Help',
          icon: 'buoy',
          handler: () => {
            console.log('FIXME: Help clicked');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('FIXME: Cancel clicked');
          },
        },
      ],
    });
    actionSheet.present();
  }

  /*****************************************************************************
   * renameTask - Create Task List Search Functionality
   * @param {event} task
   */

  public renameTask(task: any): void {
    let alert: any = this.alertCtrl.create();
    alert.setTitle('Name of this Task');
    alert.addInput({ type: 'text', name: 'taskName', value: task.name });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Save',
      handler: data => {
        if (data !== undefined) {
          console.log(data);
          this.task.name = data.taskName;
          this.taskService.updateD();
        }
      },
    });
    alert.present();
  }

  /*****************************************************************************
   * constraintTask - Create Task List Search Functionality
   * @param {event} task
   */

  public constraintTask(task: any): void {
    let alert: any = this.alertCtrl.create();
    alert.setTitle('Task Constrained?');
    alert.addInput({ type: 'checkbox', label: 'Constraint Check OK',
                    value: true, checked: task.constraints});
    alert.addButton('Cancel');
    alert.addButton({
      text   : 'Save',
      handler: data => {
        if (data[0] === true) {
          this.task.constraints = true;
        } else {
          this.task.constraints = false;
        }
        this.taskService.updateD();
      },
    });
    alert.present();
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
            this.navCtrl.pop();
          },
        },
      ],
    });
    confirm.present();
  }

  /*****************************************************************************
   * changeTimeFormat
   * @param {event} ?
   */

  public changeTimeFormat(myEvent: any): void {
    let popover: any = this.popoverCtrl.create(TimeformatSelector);
    popover.present({
      ev: myEvent,
    });
  }

  /*****************************************************************************
   * calcSlope - Calculate and return the slope between two points
   * @param {event} ?
   * @return slope
   */

  public calcSlope(p: number, d: any): string {
    let slope: string = '-';
    let deltaT: number = 0;

    // Skip 0, since there is no slope yet
    if (p > 0) {

      deltaT = Math.round(
        ( d[p][1] - d[p - 1][1] ) /
        ( d[p][0] - d[p - 1][0]) * 10
      ) / 10;

      if (deltaT > 0) {
        slope = '+' + deltaT;
      } else if (deltaT === 0) {
        slope = '' + 0;
      } else {
        slope = '' + deltaT;
      }
    }
    return slope;
  }

  public dropPoint(points: any, point: number): void {
    console.log('FIXME: I should drop the point ', points, point);
  }

  public addPoint(): void {
    console.log('FIXME: I should add the point ');
  }

}
