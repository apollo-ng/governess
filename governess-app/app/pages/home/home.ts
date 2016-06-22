'use strict';

/* FIXME */
/* tslint:disable:no-bitwise */
/* tslint:disable:no-unused-variable */

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CHART_DIRECTIVES} from 'ng2-charts';

import {ConfigService} from '../../providers/config/config';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [ CHART_DIRECTIVES ],
})

////////////////////////////////////////////////////////////////////////
//
//

export class HomePage {

  public nav: NavController;
  public configService: ConfigService;

  public config: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

    nav: NavController,
    configService: ConfigService

  ) {

    this.nav = nav;

    this.config = {};
    this.configService = configService;

    configService.getConfig().then (
      config => this.config = config
    );

  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  };

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', lineTension: '0' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', lineTension: '0' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C', lineTension: '0' },
  ];

  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    lineTension: '0.1',
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
          maxTicksLimit: 8,
        },
      }],
    },
  };

  public lineChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255, 152, 0, 0.2)',
      borderColor: 'rgb(255, 152, 0)',
      pointRadius: '3',
      pointBorderWidth: '2',
      pointBackgroundColor: '#fff',
      pointBorderColor: 'rgb(255, 152, 0)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      backgroundColor: 'rgba(162, 48, 22, 0.2)',
      borderColor: 'rgb(162, 48, 22)',
      pointRadius: '3',
      pointBorderWidth: '2',
      pointBackgroundColor: '#fff',
      pointBorderColor:  'rgb(162, 48, 22)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      backgroundColor: 'rgba(109, 128, 6, 0.2)',
      borderColor: 'rgb(109, 128, 6)',
      pointRadius: '3',
      pointBorderWidth: '2',
      pointBackgroundColor: '#fff',
      pointBorderColor: 'rgb(109, 128, 6)',
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

  public setMode(mode: string): void {
    console.log('pre-update conf ', this.config);
    console.log('pressed ', mode);
    let cn: any = this.config;
    cn.ctrlMode = mode;
    this.config = cn;
    this.configService.update(this.config);
  }

}
