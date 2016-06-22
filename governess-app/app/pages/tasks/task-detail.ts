'use strict';

/* FIXME */
/* tslint:disable:no-bitwise */
/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CHART_DIRECTIVES } from 'ng2-charts';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/pages/tasks/task-detail.html',
  directives: [ CHART_DIRECTIVES ],
})

export class TaskDetailPage {

  private nav: NavController;
  public navParams: NavParams;

  public task: any;
  public data: any;

  constructor(

    nav: NavController,
    navParams: NavParams

  ) {

    this.nav = nav;
    this.navParams = navParams;
    this.task = this.navParams.data;
    this.data = this.task.data;
  }

  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'},
  ];

  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(255,255,255,0.15)',
        },
        ticks: {
          beginAtZero: false,
          fontColor: '#FFFFFF',
        },
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(255,255,255,0.15)',
        },
        ticks: {
          beginAtZero: false,
          fontColor: '#FFFFFF',
        },
      }],
    },
  };

  public lineChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255, 152, 0, 0.2)',
      borderColor: 'rgb(255, 152, 0)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      backgroundColor: 'rgba(162, 48, 22, 0.2)',
      borderColor: 'rgb(162, 48, 22)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      backgroundColor: 'rgba(109, 128, 6, 0.2)',
      borderColor: 'rgb(109, 128, 6)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i: number = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j: number = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
