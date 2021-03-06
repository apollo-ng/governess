
import { Injectable }             from '@angular/core';
import { Storage }                from '@ionic/storage';
import { PluginModel,
         pluginMock }             from '.';

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
    this.storage.ready().then(() => {
      this.init();
    });

  }

  /*****************************************************************************
   * init
   */

  private init(): void {

    this.storage.get('plugins').then( (_plugins: string) => {
      if (!_plugins || _plugins.trim().length === 0) {
        // FIXME: Pull & update latest plugin list via websocket from server
        //
        // If no server list is available (i.e. test/offline), init from Mock
        this.initFromMock();
      }
    });
  }

  /*****************************************************************************
   * reset
   */

  public initFromMock(): void {
    this.write(pluginMock);
  }

  /*****************************************************************************
   * getAll
   * @return Storage Promise
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
