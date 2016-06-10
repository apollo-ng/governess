import {Pipe} from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class Truncate {
  transform(value: string, arg: string) : string {
    let limit = parseInt(arg);
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
