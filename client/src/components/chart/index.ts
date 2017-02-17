
import { NgModule }       from '@angular/core';
import { ChartComponent } from './chart.component';

////////////////////////////////////////////////////////////////////////////////

/*******************************************************************************
 *
 *   NgModule for Chart
 *
 */

@NgModule({
  declarations: [ ChartComponent ],
  exports: [ ChartComponent ],
})

export class ChartModule {}

export * from './chart.component';
export * from './chart.options';
