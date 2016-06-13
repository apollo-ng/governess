'use strict';

import {NavController, Page, Toast} from 'ionic-angular';
import {ConfigService} from '../../providers/config-service/config-service';

/*

*/

@Page({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [ConfigService],
})

export class SettingsPage {

  public config: any;
  public nav: NavController;
  public configService: ConfigService;

  constructor(nav: NavController,
              configService: ConfigService
  ) {
    this.nav = nav;
    this.loadConfig();
  }

  public loadConfig(): void {
    this.configService.load()
    .then(data => {
      this.config = data;
    });
  }

  // Full Client Profile/Device/Settings Config-Reset (Factory Reset)

  public resetCPD(): void {

    let toast: any = Toast.create({
    message: 'User was added successfully',
    duration: 3000,
    });

    this.nav.present(toast);
  }

}
