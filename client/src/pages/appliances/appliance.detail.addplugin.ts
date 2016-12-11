
import { Component }                from '@angular/core';
import { NavParams,
         ViewController }           from 'ionic-angular';

import { ApplianceService }         from '../../providers/appliances/appliances';
import { PluginService }            from '../../providers/plugins/plugins';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector:                         'appliance-detail-addplugin',
  templateUrl:                      'appliance.detail.addplugin.html',
})

/*******************************************************************************
 *
 *   AddPluginModal
 *
 */

export class AddPluginModal {

  public plugins:                   any;
  public filteredPlugins:           any;
  public pluginGroups:              any;
  public groupFilter:               string = 'All';
  public nameFilter:                boolean = false;
  public type:                      string;
  public aid:                       string;

  public params:                    NavParams;
  public viewCtrl:                  ViewController;
  public pluginService:             PluginService;
  public applianceService:          ApplianceService;

  /*****************************************************************************
   * constructor
   */

  constructor(

    params:                         NavParams,
    viewCtrl:                       ViewController,
    pluginService:                  PluginService,
    applianceService:               ApplianceService

  ) {

    this.viewCtrl =                 viewCtrl;
    this.pluginService =            pluginService;
    this.applianceService =         applianceService;
    this.type =                     params.get('type');
    this.aid =                      params.get('aid');

    this.init();

  }

  /*****************************************************************************
   * init
   */

  private init(): void {

    // Get all plugin data
    this.pluginService.getAll().then( (_plugins: any) => {
      if (_plugins) {
        let plugins: any = JSON.parse(_plugins);
        this.plugins = plugins[this.type];
        this.filteredPlugins = this.plugins;
        this.pluginGroups = this.getDistinctPluginGroups();
      }
    });

  }

  /*****************************************************************************
   * getDistinctGroups - Return distinct plugin groups of a given type
   * @return groups: Array <string>
   */

  public getDistinctPluginGroups(): any {

    // Set up local compare & store scaffolds
    let groups: Array<string> = [];
    let lookup: Object = {};

    // Loop through all available plugins of given type
    for (let plugin of this.plugins) {
      if (!(plugin.group in lookup)) {
        lookup[plugin.group] = true;
        groups.push(plugin.group);
      }
    }

    return groups;

  }

  /*****************************************************************************
   * filterPluginsByGroup - Populate filteredPlugins by group filtering
   */

  public filterPluginsByGroup(): void {

    if (this.groupFilter === 'All') {
      this.filteredPlugins = this.plugins;
    } else {
      this.filteredPlugins = this.plugins.filter( (_plugin: any) => {
        return (_plugin.group.indexOf(this.groupFilter) > -1);
      });
    }

  }

  /*****************************************************************************
   * filterPluginsByName - Populate filteredPlugins by name search
   * @param
   */

  public filterPluginsByName(event: any): void {

    let searchString: string = event.target.value;

    if (!searchString || searchString.trim().length === 0) {
      this.filteredPlugins = this.plugins;
    } else {
      this.nameFilter = true;
      this.filteredPlugins = this.plugins.filter( (_plugin: any) => {
        return (
          _plugin.name.toLowerCase().
          indexOf(searchString.toLowerCase()) > -1
        );
      });
    }

  }

  /*****************************************************************************
   * clearNameFilter - Disengage the Name Filter and show the full list again
   * @param event Object
   */

  public clearNameFilter(event: any): void {
    this.filteredPlugins = this.plugins;
    this.nameFilter = false;
    event.stopPropagation();
  }

  /*****************************************************************************
   * dismissModal
   */

  public dismissModal(): void {
    this.viewCtrl.dismiss();
  }

}
