import { Injectable }             from '@angular/core';
import { StorageService }         from '../storage/storage';
import { HashID }                 from '../crypto/hashid';
import { appConfigMock }          from './config.mock';

////////////////////////////////////////////////////////////////////////////////

@Injectable (

)

/*******************************************************************************
 *
 *   ConfigService
 *
 */

export class ConfigService {

  public config:  any;
  public storage: StorageService;
  private hashID: HashID;

  /*****************************************************************************
   * constructor
   */

  constructor(

    storage: StorageService,
    hashID: HashID

  ) {

    this.storage = storage;
    this.hashID = hashID;
    this.init().then( () => {
      // console.log('All promises returned', data)
    });
  }

  /*****************************************************************************
   * init
   * @return Promise
   */

  public init(): Promise<{}> {
    console.log('Initializing Storage');

    return this.storage.get('config').then((data: any) => {
      if (!data) {
        // console.log('Got NO Storage Data - creating from Mock:');
        let initAppConfig: any = appConfigMock;
        initAppConfig.cid = this.hashID.create();
        this.storage.set('config', JSON.stringify(initAppConfig));
        return initAppConfig;
      }
      // console.log('Got Storage Data:', data);
      return JSON.parse(data);
    });
  }

  /*****************************************************************************
   * get
   * @return Promise
   */

  public get(): Promise<{}> {
    return this.storage.get('config');
  }

  /*****************************************************************************
   * update
   * @param {config object}
   */

  public update(config: Object): void {
    // console.log('Updating config...');
    this.config = config;
    this.storage.set('config', JSON.stringify(config));
  }

  public updateD(): void {
    // console.log('UpdatingD config...');
    this.storage.set('config', JSON.stringify(this.config));
  }

}
