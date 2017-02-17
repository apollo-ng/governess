
import { Pipe,
         PipeTransform } from '@angular/core';

////////////////////////////////////////////////////////////////////////////////

@Pipe(
  {
    name: 'reverse',
  }
)

/*******************************************************************************
*
*   ReversePipe
*
*/

export class ReversePipe implements PipeTransform {

  public transform(input: any): any {

    if (this.isString(input)) {
      return input.split('').reverse().join('');
    }

    return Array.isArray(input) ? input.reverse() : input;
  }

  private isString(value: any): any {
    return typeof value === 'string';
  }

}
