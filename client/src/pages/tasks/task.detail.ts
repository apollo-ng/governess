import { Component,
         ViewChild }                from '@angular/core';

import { Events,
         Content,
         NavParams,
         NavController,
         AlertController,
         ModalController,
         PopoverController,
         ActionSheetController }    from 'ionic-angular';

import { ChartComponent,
         lineChartOptions }         from '../../components/chart';

import { TaskService }              from '../../providers/tasks';

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

  public events: Events;
  public alertCtrl: AlertController;
  public modalCtrl: ModalController;
  public navCtrl: NavController;
  public popoverCtrl: PopoverController;
  public actionSheetCtrl: ActionSheetController;
  public navParams: NavParams;
  public taskService: TaskService;
  public cpPresetColors: Array<Object>;

  /*****************************************************************************
   * constructor
   */

  constructor(

    events: Events,
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
    this.chartHeight = Math.floor(window.innerHeight / 1.61 / 1.61);
    this.lineChartData = { datasets: [] };
    this.lineChartOptions = lineChartOptions;

    console.log(this.lineChartOptions);
    // console.log(this.chartHeight);

    this.updateChart();

    this.newPointData = {
      time: '',
      target: '',
      note: '',
    };

    // FIXME: Verify if there isn't a better way. This hack was needed
    //        to update the chart's colors from the colorPicker reliably.
    //        The publishing event is in components/color-picker.directive
    //        Without this event updateCharts would not be fired, even though
    //        the data in the model obviusly changed in the template itself.
    //        The timeout was needed because the charts color would always lack
    //        behind on click, creating undesirable color discrepancies in the UX.
    events.subscribe('colorChanged', () => {
      setTimeout( () => { this.updateChart(); }, 60 );
    });

  }

  /*****************************************************************************
   * chartClicked
   */

  public chartClicked(e: any): void {
    console.log(e);
  }

  /*****************************************************************************
   * chartHovered
   */

  public chartHovered(e: any): void {
    console.log(e);
  }

  /*****************************************************************************
   * dragSplitbar
   */

  public dragSplitbar(e: any): void {
    let newHeight: number = this.chartHeight + e.deltaY;
    if (newHeight < 150) newHeight = 150;
    if (newHeight > 800) newHeight = 800;
    this.chartHeight = newHeight;
    // console.log(this.chartHeight);
    if (this.chartc) this.chartc.chart.resize();
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
   * taskActionSheet
   */

  public updateChart(): void {

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

        this.lineChartOptions.scales.yAxes[i].scaleLabel.fontColor = this.task.data[i].options.color;
        this.lineChartOptions.scales.yAxes[i].ticks.fontColor = this.task.data[i].options.color;

      }
    }

    this.lineChartData.datasets = _lineChartData;
    if (this.chartc) {
      //this.chartc.chart.update();
      // This hack was neccessary to update options/scales as well. Technically,
      // as of chart.js 2.5.0, a regular update should also call the new updateConfig
      // but it has had no effect so far.
      this.chartc.createChart();
    }
  }

  /*****************************************************************************
   * taskActionSheet
   */

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
        ( d[p][0] - d[p - 1][0] ) * 10
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
