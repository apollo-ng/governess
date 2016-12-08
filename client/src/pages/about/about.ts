import { Component, ViewChild }      from '@angular/core';
import { NavController }  from 'ionic-angular';
import { ChartComponent } from 'angular2-chartjs';
// import { appTag }          from '../../app/tag.ts';

////////////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'about.html',
})

/*******************************************************************************
 *
 *   AboutPage
 *
 */

export class AboutPage {

  @ViewChild(ChartComponent) public chartc: ChartComponent;

  public navCtrl: NavController;
  // public tag: string = appTag;
  public data: any = { datasets: [] };
  public options: any;
  public mock: any = { datasets: [] };

  /*****************************************************************************
   * constructor
   */

  constructor (

    navCtrl: NavController

  ) {

    this.navCtrl = navCtrl;

    this.mock.datasets = [{

        label: 'My First dataset',
        yAxisID: 'y-axis-1',
        showLine: true,
        lineTension: 0,
        steppedLine: false,
        // backgroundColor: 'rgba(255, 152, 0, 0.15)',
        borderColor: 'rgb(255, 152, 0)',
        borderWidth: 2,
        borderDash: 0,
        borderDashOffset: 0,
        pointStyle: 'circle',
        pointRadius: 3,
        pointHitRadius: 5,
        pointBorderWidth: 2,
        pointBackgroundColor: '#000',
        pointBorderColor: 'rgb(255, 152, 0)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        data: [
          {
            x: 0,
            y: 25,
          }, {
            x: 30,
            y: 150,
          }, {
            x: 90,
            y: 180,
          }, {
            x: 110,
            y: 230,
          }, {
            x: 130,
            y: 180,
          }, {
            x: 180,
            y: 25,
          },
        ],

      }, {

        label: 'My 2ns dataset',
        yAxisID: 'y-axis-2',
        showLine: true,
        lineTension: 0,
        steppedLine: false,
        backgroundColor: 'rgba(109, 128, 6, 0.15)',
        borderColor: 'rgb(109, 128, 6)',
        borderWidth: 2,
        borderDash: 0,
        borderDashOffset: 0,
        pointStyle: 'rectRot',
        pointRadius: 3,
        pointHitRadius: 5,
        pointBorderWidth: 2,
        pointBorderColor: 'rgb(109, 128, 6)',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        data: [
          {
            x: 0,
            y: 1,
          }, {
            x: 100,
            y: 1,
          }, {
            x: 100,
            y: 0,
          }, {
            x: 120,
            y: 0,
          }, {
            x: 120,
            y: 1,
          }, {
            x: 180,
            y: 1,
          },
        ],
      },
    ];

    this.options = {
      // animation: true,
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      tooltips: { enabled: false },
      scales: {
        xAxes: [
          {
            type: 'linear',
            position: 'bottom',
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
              maxTicksLimit: 8,
            },
          },
        ],
      },
    };

  }

  public logchart(): void {
    console.log(this.chartc);
  }

  public updateviadir(): void {
    this.data = this.mock;
  }

  public updateviacmp(): void {
    console.log('cmp');
    this.chartc.data = this.mock;
    this.chartc.chart.update();
    this.chartc.chart.updateDatasets();
    this.chartc.chart.draw();
  }

}
