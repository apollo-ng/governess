import {Pipe} from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class Truncate {
  transform(value: string, args: string) : string {
      let limit = parseInt(args);
      console.log('Truncate called:' + value + 'args:' + args + 'limit:' + limit);
      return value.length > limit ? value.substring(0, limit) + '...' : value;
    }
}
