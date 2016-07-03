'use strict';

/* FIXME */
/* tslint:disable:no-bitwise */
/* tslint:disable:no-unused-variable */

import { Component, Input }         from '@angular/core';
import { NgClass }                  from '@angular/common';
import { ViewController,
         NavController,
         NavParams,
         Modal }                    from 'ionic-angular';
import { TaskService }              from '../../providers/tasks/tasks';
import { CHART_DIRECTIVES }         from 'ng2-charts';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/pages/tasks/task-detail.html',
  directives: [ CHART_DIRECTIVES ],
  providers: [ TaskService ],
})

export class TaskDetailPage {

  private nav: NavController;
  public navParams: NavParams;

  public task: any;
  public data: any;
  public chartHeight: number;
  public chartHeightAct: number;
  public lineChartData: Array<any>;
  public lineChartColours: Array<any>;
  public moduleView: number;

  constructor(

    nav: NavController,
    navParams: NavParams

  ) {

    this.nav = nav;
    this.navParams = navParams;
    this.task = this.navParams.data;
    this.data = this.task.data;
    this.moduleView = 0;
    this.chartHeight = 200;
    this.lineChartData = [{ data: [], label: 'Data' }];
    this.updateChart();
    console.log(this.task);
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

  public openHelp(): void {
    let modal: any = Modal.create(HelpModal);
    this.nav.present(modal);
  }

}

////////////////////////////////////////////////////////////////////////
// HELP
////////////////////////////////////////////////////////////////////////

@Component({
  template: `
  <ion-header>
    <ion-navbar dark>
      <ion-title>Task Editor Help</ion-title>
      <ion-buttons end>
        <button primary (click)="dismissModal()">
          <ion-icon name="close"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>
  </ion-header>
  <ion-content>
    <div class="help-content">
      FIXME and add some more helping text here...
    </div>
  </ion-content>`,
})

class HelpModal {

  private viewCtrl: ViewController;

  constructor( viewCtrl: ViewController ) {
    this.viewCtrl = viewCtrl;
  }

  private dismissModal(): void {
    this.viewCtrl.dismiss();
  }
}
