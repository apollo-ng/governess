import { Injectable }             from '@angular/core';
import { Storage }                from '@ionic/storage';
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

  private storage: Storage;
  private hashID: HashID;

  /*****************************************************************************
   * constructor
   */

  constructor(

    storage: Storage,
    hashID: HashID

  ) {

    this.storage = storage;
    this.hashID = hashID;
    this.storage.ready().then( () => {
      this.init();
    });

  }

  /*****************************************************************************
   * init
   * @return Promise
   */

  public init(): Promise<{}> {

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

  /*****************************************************************************
   * updateD
   */

  public updateD(): void {
    // console.log('UpdatingD config...');
    this.storage.set('config', JSON.stringify(this.config));
  }

}
