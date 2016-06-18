'use strict';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UUID }       from 'angular2-uuid';
import { INITIALCONFIG } from './init.ts';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class ConfigService {

  public config: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

  ) {

    if (!this.config) { this.init(); }
    let uuid: string = UUID.UUID();
    console.log(uuid);
  }

  //////////////////////////////////////////////////////////////////////

  public init(): any {
      this.config = INITIALCONFIG;
      console.log('Setting up initial Config', this.config);
  };

  public get(): any {
    return Observable.create(observer => {
      observer.next(this.config);
      observer.complete();
    });
  }

}
