
import { Component }                from '@angular/core';
import { NavParams,
         ViewController }           from 'ionic-angular';

import { ApplianceService }         from '../../providers/appliances/appliances';
import { PluginService,
         pluginMock }               from '../../providers/plugins/';

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
  public nameFilter:                string;
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
    this.pluginService.getAll().then( (_plugins: any) => {
      let plugins: any
      if (_plugins) {
        plugins = JSON.parse(_plugins);

      } else {
        // FIXME: this is due to #21, it would be better if the async resolution
        // would just work instead of this hack
        plugins = pluginMock;
      }
      this.plugins = plugins[this.type];
      this.filteredPlugins = this.plugins;
      this.pluginGroups = this.getDistinctPluginGroups();

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
    this.filterPlugins();
  }

  /*****************************************************************************
   * filterPluginsByName - Populate filteredPlugins by name search
   * @param
   */

  public filterPluginsByName(event: any): void {

    if (event.target.value) {
      this.nameFilter = event.target.value.trim();
      this.filterPlugins();
    } else {
      this.clearNameFilter(event);
    }

  }

  /*****************************************************************************
   * filterPlugins - Run the actual filtering
   */

  public filterPlugins(): void {

    let plugins: any;

    // Filter by Group first
    if (this.groupFilter === 'All') {
      plugins = this.plugins;
    } else {
      plugins = this.plugins.filter( (_plugin: any) => {
        return (_plugin.group.indexOf(this.groupFilter.trim()) > -1);
      });
    }

    // Apply name filter to group filtered list
    if (!this.nameFilter || this.nameFilter.length === 0) {
      this.filteredPlugins = plugins;
    } else {
      this.filteredPlugins = plugins.filter( (_plugin: any) => {
        return (
          _plugin.name.toLowerCase().
          indexOf(this.nameFilter.toLowerCase()) > -1
        );
      });
    }

  }

  /*****************************************************************************
   * clearNameFilter - Disengage the Name Filter and show the full list again
   * @param event Object
   */

  public clearNameFilter(event: any): void {
    event.stopPropagation();
    this.nameFilter = '';
    this.filterPlugins();
  }

  /*****************************************************************************
   * dismissModal
   */

  public dismissModal(): void {
    this.viewCtrl.dismiss();
  }

}
