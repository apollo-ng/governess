import Chart from 'chart.js';

import { Component,
         Input,
         ElementRef,
         OnInit,
         OnChanges,
         SimpleChanges } from '@angular/core';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'chart',
  template: '<canvas></canvas>',
  styles: [':host { display: block; }'],
})

/*******************************************************************************
 *
 *   ChartComponent
 *
 */

export class ChartComponent implements OnInit, OnChanges {

  @Input() public type: string;
  @Input() public data: any;
  @Input() public options: any = {};

  public chart: any;
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  public ngOnInit(): void {
    this.createChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('ChartComponent ngOnChanges fired', changes);
  }

  public createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(
      this.element.nativeElement.querySelector('canvas'), {
        type: this.type,
        data: this.data,
        options: this.options,
      }
    );
  }

}
