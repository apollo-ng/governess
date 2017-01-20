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

  public config: any = {};

  private storage: Storage;
  private hashID: HashID;

  /*****************************************************************************
   * constructor
   */

  constructor(

    storage: Storage,
    hashID: HashID

  ) {

    this.hashID = hashID;
    this.storage = storage;

    this.storage.ready().then( () => {
      this.init();
    });

  }

  /*****************************************************************************
   * init
   */

  public init(): any {

    return this.storage.get('config').then( (_config: string) => {
      if (!_config || _config.trim().length === 0) {
        // If no local config is available (i.e. test/offline), init from Mock
        this.initFromMock();
        console.log('Init from Mock');
      } else {
        this.config = JSON.parse(_config);
        console.log('Load config', this.config );
      }
    });

  }

  /*****************************************************************************
   * initFromMock
   */

  private initFromMock(): void {
    let initAppConfig: any = appConfigMock;
    initAppConfig.cid = this.hashID.create();
    this.write(initAppConfig);
    this.config = initAppConfig;
  }

  /*****************************************************************************
   * write
   * @param {Config} Object
   */

  private write(config: Object): void {
    this.storage.set('config', JSON.stringify(config));
  }

  /*****************************************************************************
   * update
   * @param {Config} Object
   */

  public update(config: Object): void {
    this.write(config);
  }

  /*****************************************************************************
   * updateD
   */

  public updateD(): void {
    this.write(this.config);
  }

}
