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

  public nav: NavController;
  public configService: ConfigService;

  public config: any;

  //////////////////////////////////////////////////////////////////////

  constructor (

    nav: NavController,
    configService: ConfigService

  ) {

    this.nav = nav;
    this.configService = configService;

    this.configService.getConfig().then(config => {
      this.config = config;
      console.log('got a config', config);
    });

/*
    this.configService.get().subscribe(
      data => this.config = data
    );
  */
  }

  // Full Client Profile/Device/Settings Config-Reset (Factory Reset)

  public resetCPD(): void {

    let toast: any = Toast.create({
      message: 'User was added successfully',
      duration: 3000,
    });
    this.configService.reset();
    this.nav.present(toast);
  }

}
