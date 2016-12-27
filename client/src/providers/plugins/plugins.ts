
import { Injectable }             from '@angular/core';
import { Storage }                from '@ionic/storage';
import { PluginModel,
         pluginMock }             from './index';

////////////////////////////////////////////////////////////////////////////////

@Injectable (

)

/*******************************************************************************
 *
 *   PluginService
 *
 */

export class PluginService {

  private storage: Storage;

  /*****************************************************************************
   * constructor
   */

  constructor (

    storage: Storage

  ) {

    this.storage = storage;
    this.init();

  }

  /*****************************************************************************
   * init
   */

  private init(): void {

    this.storage.get('plugins').then( (_plugins: string) => {
      if (!_plugins || _plugins.trim().length === 0) {
        this.storage.set('plugins', JSON.stringify(pluginMock));
      }
    });
  }

  /*****************************************************************************
   * reset
   */

  public reset(): void {
    this.write(pluginMock);
  }

  /*****************************************************************************
   * getAll
   * @return Promise
   */

  public getAll(): any {
    return this.storage.get('plugins');
  }

  /*****************************************************************************
   * write
   * @param Plugins Object
   */

  private write(plugins: PluginModel): void {
    this.storage.set('plugins', JSON.stringify(plugins));
  }

}
