'use strict';

import { Component }            from '@angular/core';
import { NavController, Toast } from 'ionic-angular';
import { ConfigService }        from '../../providers/config/config';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'build/pages/settings/settings.html',
})

////////////////////////////////////////////////////////////////////////
//
//

export class SettingsPage {

  private nav:              NavController;
  public configService:     ConfigService;
  public config:            Object;

  //////////////////////////////////////////////////////////////////////

  constructor (

    nav:                    NavController,
    configService:          ConfigService

  ) {

    this.nav = nav;
    this.configService = configService;
    this.config = this.configService.get();

  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    console.log('help tapped - FIXME: Add proper help');
  }

  public updateConfig(): any {
    this.configService.update(this.config);
  }

  // Full Client Profile/Device/Settings Config-Reset (Factory Reset)

  public resetCPD(e: any): void {

    this.configService.reset();

    let toast: any = Toast.create({
      message: 'GovernessApp configuration has been reset',
      duration: 3000,
    });

    this.nav.present(toast);
  }

}
