import { Injectable }             from '@angular/core';
import { ShortID }                from '../crypto/shortid';
import { StorageService }         from '../storage/storage';
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

  public plugins: PluginModel;
  public storage: StorageService;
  private shortID: ShortID;

  /*****************************************************************************
   * constructor
   */

  constructor (

    storage: StorageService,
    shortID: ShortID

  ) {

    this.storage = storage;
    this.shortID = shortID;
    this.init().then(data => {
      this.plugins = data;
    });

  }

  /*****************************************************************************
   * init
   * @return {Appliance} Object Promise
   */

  private init(): Promise<{}> {
    console.log('Initializing Plugin Service');

    return this.storage.get('plugins').then((data: string) => {
      if (!data) {
        console.log('Got NO Storage Data - creating from Mock:');
        let initPlugins: any = pluginMock;
        this.write(initPlugins);
        this.plugins = initPlugins;
        return initPlugins;
      }
      // console.log('Got Storage Data:', data);
      this.plugins = JSON.parse(data);
      return JSON.parse(data);
    });
  }

  /*****************************************************************************
   * get
   * @return
   */

  public get(): Promise<{}> {
    return this.storage.get('plugins');
  }

  /*****************************************************************************
   * pull
   */

  public pull(): any {
    this.get().then((data: string) => {
      this.plugins = JSON.parse(data);
    });
  }

  /*****************************************************************************
   * getDistinctGroups - Returns distinct plugin groups by given type
   * @param type: string [input, control, output]
   * @return groups: Array <string>
   */

  public getDistinctGroups(type: string): Array<string> {

    // Set up local compare & store scaffolds
    let groups: Array<string> = [];
    let lookup: Object = {};

    // Loop through all available plugins of given type
    for (let plugin of this.plugins[type]) {
      if (!(plugin.group in lookup)) {
        lookup[plugin.group] = true;
        groups.push(plugin.group);
      }
    }

    return groups;
  }

  /*****************************************************************************
   * reset
   */

  public reset(): void {
    console.log('Resetting plugins...');
    this.write(pluginMock);
  }

  /*****************************************************************************
   * write
   * @param
   */

  private write(plugins: Object): void {
    console.log('Writing Plugins to LocalStorage', plugins);
    this.storage.set('plugins', JSON.stringify(plugins));
  }

}
