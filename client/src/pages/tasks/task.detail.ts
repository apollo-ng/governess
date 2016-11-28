import { Component, ViewChild }     from '@angular/core';

import { Content,
         NavParams,
         NavController,
         AlertController,
         ModalController,
         PopoverController,
         ActionSheetController }    from 'ionic-angular';

import { ChartComponent }           from 'angular2-chartjs';

import { TaskService }              from '../../providers/tasks/tasks';
import { lineChartGlobals }         from '../../components/chart-globals';

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

  @ViewChild(ChartComponent) public chartc: ChartComponent;
  @ViewChild(Content) public content: Content;

  public task: any;
  public data: any;
  public chartHeight: number;
  public chartHeightAct: number;
  public lineChartData: any;
  public lineChartOptions: any;
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
    this.lineChartData = { datasets: [] };
    this.lineChartOptions = lineChartGlobals;

    console.log(this.lineChartOptions);
    /*
    this.lineChartOptions.scales.xAxes[0].ticks.callback = function(value: number, t: any, p: any, task: any = this.task): any {
      console.log(task);
      return value;
    },*/

    this.updateChart();
    console.log(this.chartHeight);
    this.newPointData = {
      time: '',
      target: '',
      note: '',
    };
  }

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
    if (this.chartc) this.chartc.chart.resize();
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

    // Update the datapoints (y axis)
    let _lineChartData: any = new Array();
    for (let i: number = 0; i < this.data.length; i++) {
      if (this.data[i].show === true) {
        _lineChartData[i] = {
          label: this.data[i].control,
          lineTension: 0,
          yAxisID: this.data[i].options.yAxisID,
          fill: this.data[i].options.fill,
          backgroundColor: this.convertRGBA(this.data[i].options.color, 0.15),
          borderColor: this.data[i].options.color,
          borderWidth: this.data[i].options.strokeWidth,
          pointRadius: this.data[i].options.pointRadius,
          pointBorderWidth: this.data[i].options.pointBorderWidth,
          pointBackgroundColor: '#fff',
          pointBorderColor: this.data[i].options.color,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          data: new Array(this.data[i].points.length),
        };
        for (let j: number = 0; j < this.data[i].points.length; j++) {
          _lineChartData[i].data[j] = {
            'x': this.data[i].points[j][0],
            'y': this.data[i].points[j][1],
          };
        }
      }
    }

    this.lineChartData.datasets = _lineChartData;
    console.log('Updated chart:', this.lineChartData);
    if (this.chartc) this.chartc.chart.update();
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
   * displayTimeFormat
   * @param seconds: number
   * @return formatedTime: string
   */

  public displayTimeFormat(seconds: number): any {
    if (this.task.timeFormat === 'auto') {
      return seconds;
    } else {
      return seconds * 1000;
    }

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

  /*****************************************************************************
   * dropPoint
   * @param points: any, point: number
   */

  public dropPoint(points: any, point: number): void {
    console.log('FIXME: I should drop the point ', points, point);
  }

  /*****************************************************************************
   * addPoint
   * @param points: any
   */

  public addPoint(): void {
    console.log('FIXME: I should add the point ');
  }

}
