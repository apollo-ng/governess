'use strict';

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
 *     AddPluginModal
 *
 */

export class AddPluginModal {

  public plugins:                   any;
  public filteredPlugins:           any;
  public groups:                    any;
  public nameFilter:                boolean = false;
  public groupFilter:               string = 'All';
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
   * getPluginData
   */

  public init(): void {

    this.pluginService.getAllPlugins().then( (_plugins) => {
      if (_plugins) {
        let plugins: any = JSON.parse(_plugins);
        this.plugins = plugins[this.type];
        this.filteredPlugins = this.plugins;
        this.groups = this.getDistinctGroups();
      }
    });

  }

  /*****************************************************************************
   * getDistinctGroups - Returns distinct plugin groups by given type
   * @return groups: Array <string>
   */

  public getDistinctGroups(): any {

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
   * filterPluginsByName
   * @param
   */

  public filterPluginsByName(event: any): void {
    this.filteredPlugins = this.plugins;
    let val: string = event.target.value;
    if (val && val.trim() !== '') {
      this.nameFilter = true;
      this.filteredPlugins = this.plugins.filter((plugin) => {
        return (
          plugin.name.toLowerCase().
          indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  /*****************************************************************************
   * filterPluginsByGroup
   */

  public filterPluginsByGroup(): void {
    this.filteredPlugins = this.plugins;
    if (this.groupFilter !== 'All') {
      this.filteredPlugins = this.plugins.filter((plugin) => {
        return (plugin.group.indexOf(this.groupFilter) > -1);
      });
    }
  }

  /*****************************************************************************
   * clearNameFilter - Disengage Search Filter
   * @param
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
