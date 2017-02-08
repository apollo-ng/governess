
import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';

import { DynamicCpModule,
         ColorPickerDirective }  from './color-picker.directive';
import { ColorPickerService }    from './color-picker.service';

////////////////////////////////////////////////////////////////////////////////

/*******************************************************************************
 *
 *   NgModule for ColorPicker
 *
 */

@NgModule({
  imports: [
    CommonModule,
    DynamicCpModule,
  ],
  providers: [ ColorPickerService ],
  declarations: [ ColorPickerDirective ],
  exports: [ ColorPickerDirective ],
})

export class ColorPickerModule {}

export * from './color-picker.component';
export * from './color-picker.component';
export * from './color-picker.directive';
export * from './color-picker.service';
