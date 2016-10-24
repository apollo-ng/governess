import { Injectable }             from '@angular/core';
import { UUID }                   from 'angular2-uuid';
import { StorageService }         from '../storage/storage';
import { AppConfigMock }          from './config.mock';

/******************************************************************************/

/******************************************************************************/

@Injectable (

)

/*******************************************************************************
 *
 *     ConfigService
 */

export class ConfigService {

  public config:  any;

  /****************************************************************************/

  constructor(

    public storage: StorageService

  ) {

    this.init().then(data => {
      //console.log('All promises returned', data)
    });
  }

  /*****************************************************************************
  * init
  *
  * @return Promise
  */

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

  /*****************************************************************************
  * get
  *
  * @return Promise
  */

  public get(): Promise<{}> {
    return this.storage.get('config')
  }

  /*****************************************************************************
  * update
  *
  * @param {config object}
  */

  public update(config: Object): void {
    console.log('Updating config...');
    this.config = config;
    this.storage.set('config', JSON.stringify(config));
  }

}
