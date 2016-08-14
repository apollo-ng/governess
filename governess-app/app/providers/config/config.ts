'use strict';

import { Injectable }             from '@angular/core';
import { CONFIGMODEL }            from './config.mock.ts';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class ConfigService {

  public config:   any;

  //////////////////////////////////////////////////////////////////////

  constructor (

  ) {
    let config: string = localStorage.getItem('config');

    if (!config) {
      console.log('No config in DB - Initiate from CONFIGMODEL', CONFIGMODEL);
      localStorage.setItem('config', JSON.stringify(CONFIGMODEL));
      this.config = CONFIGMODEL;
    } else {
      console.log('Returning user - Load config from DB', config);
      this.config = JSON.parse(config);
    }
  }

  //////////////////////////////////////////////////////////////////////

  public get(): Promise<{}> {
    return this.config;
  }

  public reset(): any {
    console.log('Resetting config...');
    localStorage.setItem('config', JSON.stringify(CONFIGMODEL));
  }

  public update(config: Object): any {
    console.log('Updating config...');
    localStorage.setItem('config', JSON.stringify(config));
  }

}
