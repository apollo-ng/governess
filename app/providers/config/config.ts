'use strict';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService, LocalStorage } from 'ng2-webstorage';
import { INITIALCONFIG } from './init.ts';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class ConfigService {

  @LocalStorage() public config: any;
  private storage: LocalStorageService;

  //////////////////////////////////////////////////////////////////////

  constructor (

    storage: LocalStorageService

  ) {

    this.storage = storage;
    console.log('ConfigService constructed');
    console.log('ConfigService in LS: ', this.config);

    if (!this.config) {
      console.log('Virgin Run - Setting up initial Config');
      this.storage.store('config', INITIALCONFIG);
    }

  }

  //////////////////////////////////////////////////////////////////////

  public findAll(): any {
    return Observable.create(observer => {
      observer.next(this.config);
      observer.complete();
    });
  }

  public updateConfig(data: Object): void {
    console.log('Updating:', data);
    this.storage.store('config', data);
  }

}
