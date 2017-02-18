
import { Injectable, Pipe } from '@angular/core';

////////////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////////////

@Pipe(
  {
    name: 'temperature',
  }
)

/*******************************************************************************
 *
 *   TemperaturePipe
 *
 */

export class TemperaturePipe {

  public transform(value: string, args: any): string {
    let c: number = Math.round(parseInt(value, 10) - 273.15);
    let f: number = Math.round(parseInt(value, 10) * 9 / 5 - 459.67);
    return args === 'c' ? `${c} °C` : `${f} °F`;
  }

}
