'use strict';

/* FIXME */
/* tslint:disable:no-bitwise */
/* tslint:disable:no-unused-variable */

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CHART_DIRECTIVES} from '../../services/charts';
import {LocalStorageService, LocalStorage} from 'ng2-webstorage';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [CHART_DIRECTIVES],
})

////////////////////////////////////////////////////////////////////////
//
//

export class HomePage {

  @LocalStorage() public config: any;

  public nav: NavController;
  private storage: LocalStorageService;

  //////////////////////////////////////////////////////////////////////

  constructor (

    nav: NavController,
    storage: LocalStorageService

  ) {

    this.nav = nav;
    this.storage = storage;
    this.lineChartColours = this.getColours(['#FF9800', '#a23016', '#6d8006']);

  }

  //////////////////////////////////////////////////////////////////////

  private lineChartData: Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [18, 48, 77, 9, 100, 27, 40],
  ];

  private lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  private lineChartSeries: Array<any> = ['Series A', 'Series B', 'Series C'];
  private lineChartOptions: any = {
    animation: true,
    responsive: true,
    maintainAspectRatio: false,
    fontColor: '#a23016',
    scales: {
      xAxes: [{
        type: 'time',
        color: '#fff',
      }],
    },
    multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>',
  };

  private lineChartColours: Array<any>;
  private lineChartLegend: boolean = true;
  private lineChartType: string = 'Line';

  private randomize(): any {
    let _lineChartData: Array<any> = [];
    for (let i: any = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = [];
      for (let j: any = 0; j < this.lineChartData[i].length; j++) {
        _lineChartData[i].push(Math.floor((Math.random() * 100) + 1));

      }
    }
    this.lineChartData = _lineChartData;
  }

  //////////////////////////////////////////////////////////////////////

  public rgba (colour: any, alpha: any): any {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
  }

  public hexToRgb (hex: any): Array<any> {
    let bigint: any = parseInt(hex.substr(1), 16),
    r: any = (bigint >> 16) & 255,
    g: any = (bigint >> 8) & 255,
    b: any = bigint & 255;
    return [r, g, b];
  }

  public convertColour (colour: any): any {
    if (typeof colour === 'object' && colour !== null) return colour;
    if (typeof colour === 'string' && colour[0] === '#')
      return this.getColour(this.hexToRgb(colour.substr(1)));
  }

  public getColour (colour: any): any {
    return {
      fillColor: this.rgba(colour, 0.2),
      strokeColor: this.rgba(colour, 1),
      pointColor: this.rgba(colour, 1),
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: this.rgba(colour, 0.8),
    };
  }

  public getColours (colours: any): any {
    let _clrs: Array<any> = [];
    colours.forEach(
      color => {
        _clrs.push(this.getColour(this.hexToRgb(color)));
      }
    );
    return _clrs;
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public setMode(mode: string): void {
    console.log('pressed ', mode);
    this.config.ctrlMode = mode;
    this.storage.store('config', this.config);
  }

}
