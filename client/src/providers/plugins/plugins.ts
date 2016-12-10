
import { Injectable }             from '@angular/core';
import { Storage }                from '@ionic/storage';
import { PluginModel }            from './plugins.model';
import { pluginMock }             from './plugins.mock';

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
   * @return {Appliance} Object Promise
   */

  private init(): void {

    this.storage.get('plugins').then( (plugins: string) => {
      if (!plugins) {
        this.write(pluginMock);
      }
    });

  }

  /*****************************************************************************
   * get
   * @return
   */

  public getAllPlugins(): any {
    return this.storage.get('plugins');
  }

  /*****************************************************************************
   * reset
   */

  public reset(): void {
    this.write(pluginMock);
  }

  /*****************************************************************************
   * write
   * @param
   */

  private write(plugins: PluginModel): void {
    this.storage.set('plugins', JSON.stringify(plugins));
  }

}
