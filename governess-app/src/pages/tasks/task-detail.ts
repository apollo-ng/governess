import { Component, Input }         from '@angular/core';
import { NgClass }                  from '@angular/common';
import { NavParams,
         NavController,
         ViewController,
         ModalController,
         PopoverController }        from 'ionic-angular';
import { TaskService }              from '../../providers/tasks/tasks';
//import { CHART_DIRECTIVES }         from 'ng2-charts';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'task-detail.html',
  //directives: [ CHART_DIRECTIVES ],
  //providers: [ TaskService ],
})

export class TaskDetailPage {

  public navCtrl: NavController;
  public modalCtrl: ModalController;
  public popoverCtrl: PopoverController;
  public navParams: NavParams;

  public task: any;
  public data: any;
  public chartHeight: number;
  public chartHeightAct: number;
  public lineChartData: Array<any>;
  public lineChartColours: Array<any>;
  public moduleView: number;

  constructor(

    modalCtrl: ModalController,
    popoverCtrl: PopoverController,
    navCtrl: NavController,
    navParams: NavParams

  ) {

    this.navCtrl = navCtrl;
    this.navParams = navParams;
    this.modalCtrl = modalCtrl;
    this.popoverCtrl = popoverCtrl;
    this.task = this.navParams.data;
    this.data = this.task.data;
    this.moduleView = 0;
    this.chartHeight = 200;
    this.lineChartData = [{ data: [], label: 'Data' }];
    this.updateChart();
    // console.log(this.task);
  }

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

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public dragSplitbar(e: any): void {
    this.chartHeightAct = this.chartHeight + e.deltaY;
    if (e.isFinal) {
      this.chartHeight = this.chartHeightAct;
      this.updateChart();
    }
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
    let _lineChartColours: Array<any> = new Array();
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
    let _lineChartData: Array<any> = new Array();
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
  }

  public setModuleView(view: number): void {
    this.moduleView = view;
    console.log('modview', this.moduleView);
  }

  public taskActionPopover(ev: any): void {
    let popover: any = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: ev,
    });
  }

}

////////////////////////////////////////////////////////////////////////
// Popover
////////////////////////////////////////////////////////////////////////

@Component({
  template: `
    <ion-list>
      <ion-list-header>Task Actions</ion-list-header>
      <ion-item (click)="close('FIXME: duplicateTask')">
       <ion-icon name="copy" item-left></ion-icon>
       Duplicate
      </ion-item>
      <ion-item (click)="close('FIXME: deleteTask')">
       <ion-icon name="trash" item-left></ion-icon>
       Delete
      </ion-item>
      <ion-item (click)="close('FIXME: commentTask')">
       <ion-icon name="book" item-left></ion-icon>
       Notes
      </ion-item>
      <ion-item (click)="openHelp()">
       <ion-icon name="help-buoy" item-left></ion-icon>
       Help
      </ion-item>
    </ion-list>
  `,
})

export class PopoverPage {

  private viewCtrl: ViewController;
  private modalCtrl: ModalController;

  constructor(
    viewCtrl: ViewController,
    modalCtrl: ModalController
  ) {
    this.viewCtrl = viewCtrl;
    this.modalCtrl = modalCtrl;
  }

  private close(enote: string): void {
    console.log(enote);
    this.viewCtrl.dismiss();
  }

  public duplicateTask(event: any): void {
    console.log('FIXME: duplicateTask action');
  }

  public deleteTask(event: any): void {
    console.log('FIXME: deleteTask action');
  }

  public commentTask(event: any): void {
    console.log('FIXME: commentTask action');
  }

  public openHelp(event: any): void {
    let modal: any = this.modalCtrl.create(HelpModal);
    modal.present(modal);
  }

}

////////////////////////////////////////////////////////////////////////
// HELP
////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/pages/tasks/task-detail.help.html',
})

export class HelpModal {

  private viewCtrl: ViewController;

  constructor( viewCtrl: ViewController ) {
    this.viewCtrl = viewCtrl;
  }

  private dismissModal(): void {
    this.viewCtrl.dismiss();
  }
}
