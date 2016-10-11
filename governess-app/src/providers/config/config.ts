import { Injectable }             from '@angular/core';
import { UUID }                   from 'angular2-uuid';
import { CONFIGMODEL }            from './config.mock.ts';

////////////////////////////////////////////////////////////////////////

export interface AppConfig {
  clientID:   string;
  userLang:   string;
  theme:      string;
  audio:      boolean;
  ctrlMode:   string;
  viewPref:   string;
  lastView?:  string;
  manOverr:   boolean;
  keepOn:     boolean;
}

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
      this.init();
    } else {
      console.log('Returning user - Load config from DB', config);
      this.config = JSON.parse(config);
    }
  }

  //////////////////////////////////////////////////////////////////////

  public init(): any {
    console.log('Initializing config...');
    let configMock: AppConfig = CONFIGMODEL;
    configMock.clientID = UUID.UUID();
    localStorage.setItem('config', JSON.stringify(configMock));
    this.config = configMock;
  }

  public get(): Promise<{}> {
    return this.config;
  }

  public update(config: Object): any {
    console.log('Updating config...');
    localStorage.setItem('config', JSON.stringify(config));
  }

}
