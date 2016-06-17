import { Injectable } from '@angular/core';
import { INITIALCONFIG } from './init.ts';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class ConfigService {

  public findAll(): any {
    return Observable.create(observer => {
      observer.next(INITIALCONFIG);
      observer.complete();
    });
  }

  public findById(id: any): any {
    return Observable.create(observer => {
      observer.next(INITIALCONFIG[id - 1]);
      observer.complete();
    });
  }

}
