'use strict';

import { Component } from '@angular/core';
import { NavController, Toast } from 'ionic-angular';
import { ConfigService } from '../../providers/config/config';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'build/pages/settings/settings.html',
})

////////////////////////////////////////////////////////////////////////
//
//

export class SettingsPage {

  private nav: NavController;
  public configService: ConfigService;

  public config: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

    nav: NavController,
    configService: ConfigService

  ) {

    this.config = {};
    this.nav = nav;
    this.configService = configService;

    configService.getConfig().then(config => {
      // console.log('got a config', config);
      this.config = config;
    });

  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  };

  public updateConfig(): any {
    this.configService.update(this.config);

  }

  // Full Client Profile/Device/Settings Config-Reset (Factory Reset)

  public resetCPD(): void {

    this.configService.reset();

    let toast: any = Toast.create({
      message: 'GovernessApp configuration has been reset',
      duration: 3000,
    });

    this.nav.present(toast);
  }

}
