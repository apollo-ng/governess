import { Injectable }             from '@angular/core';
import { UUID }                   from 'angular2-uuid';
import { StorageService }         from '../storage/storage';
import { AppConfigModel }         from './config.model';
import { AppConfigMock }          from './config.mock';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class ConfigService {

  public storage: StorageService;
  public config:  any;

  //////////////////////////////////////////////////////////////////////

  constructor(
    storage: StorageService
  ) {

    //console.log('ConfigService Provider is being constructed');
    this.storage = storage;
    this.init().then(data => {
      //console.log('All promises returned', data)
      //this.config = data;
    });
  }

  public init(): Promise<{}> {
    console.log('Initializing Storage');

    return this.storage.get('config').then((data: any) => {
      if (!data) {
        console.log('Got NO Storage Data - creating from Mock:');
        let initAppConfig: any = AppConfigMock;
        initAppConfig.clientID = UUID.UUID();
        this.storage.set('config', JSON.stringify(initAppConfig));
        return initAppConfig;
      }
      //console.log('Got Storage Data:', data);
      return JSON.parse(data);
    });
  }

  public get(): Promise<{}> {
    return this.storage.get('config')
  }

  public update(config: Object): void {
    console.log('Updating config...');
    this.storage.set('config', JSON.stringify(config));
  }

}
