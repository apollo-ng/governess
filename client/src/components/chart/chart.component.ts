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

  public chart: any;

  @Input() public type: string;
  @Input() public data: any;
  @Input() public options: any;

  constructor(private elementRef: ElementRef) { }

  public ngOnInit(): void {
    this.chart = new Chart(
      this.elementRef.nativeElement.querySelector('canvas'), {
        type: this.type,
        data: this.data,
        options: this.options,
      }
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && changes['data']) {
      let currentValue: any = changes['data'].currentValue;
      ['datasets', 'labels', 'xLabels', 'yLabels'].forEach(property => {
        this.chart.data[property] = currentValue[property];
      });
      this.chart.update();
    }
  }

}
