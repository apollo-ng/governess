'use strict';

import { Injectable }             from '@angular/core';
import { Storage, SqlStorage }    from 'ionic-angular';
import { CONFIGMODEL }            from './config-model.ts';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class ConfigService {

  private config: any;
  private storage: Storage;

  //////////////////////////////////////////////////////////////////////

  constructor (

  ) {

    this.storage = new Storage (SqlStorage, { name: 'governess'});

  }

  public load(): any {

    if (this.config) {
      console.log('Data already loaded');
      return Promise.resolve(this.config);
    }

    return new Promise(resolve => {
      this.storage.get('config').then( (config) => {
        if (!config) {
          console.log('No config in DB - Initiate from CONFIGMODEL', CONFIGMODEL);
          this.storage.set('config', JSON.stringify(CONFIGMODEL));
          config = CONFIGMODEL;
        } else {
          console.log('Returning user - Load config from DB', config);
          config = JSON.parse(config);
        }
        resolve(config);
      });
    });

  }

  public reset(): any {
    console.log('resetting...');
    this.storage.set('config', JSON.stringify(CONFIGMODEL));
  }

  public getConfig(): any {
    return this.load().then(config => {
      console.log('getConfig called', config);
      return config;
    });
  }

  public update(config: Object): any {
    this.storage.set('config', JSON.stringify(config));
  }

}
