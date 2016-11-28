import { Injectable }             from '@angular/core';
import { ShortID }                from '../crypto/shortid';
import { StorageService }         from '../storage/storage';
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
  private shortID: ShortID;

  /*****************************************************************************
   * constructor
   */

  constructor(

    storage: StorageService,
    shortID: ShortID

  ) {

    this.storage = storage;
    this.shortID = shortID;
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
        console.log('Got NO Storage Data - creating from Mock:');
        let initAppConfig: any = appConfigMock;
        initAppConfig.cid = this.shortID.create();
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
    console.log('Updating config...');
    this.config = config;
    this.storage.set('config', JSON.stringify(config));
  }

  public updateD(): void {
    console.log('UpdatingD config...');
    this.storage.set('config', JSON.stringify(this.config));
  }

}
