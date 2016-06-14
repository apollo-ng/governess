'use strict';

import {NavController, Page, Toast} from 'ionic-angular';

/*

*/

@Page({
  templateUrl: 'build/pages/settings/settings.html',
})

export class SettingsPage {

  public config: any;
  public nav: NavController;

  constructor(
    nav: NavController
  ) {
    this.nav = nav;
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
