'use strict';

import {NavController, Page} from 'ionic-angular';

/*

*/

@Page({
  templateUrl: 'build/pages/settings/settings.html'
})

export class SettingsPage {

  public nav: NavController;

  constructor(nav: NavController) {
    this.nav = nav;
  }

  // Full Client Profile/Device/Settings Config-Reset (Factory Reset)
  /*
  private resetCPD(event) {

    let toast = Toast.create({
    message: 'User was added successfully',
    duration: 3000,
  });

      //event.preventDefault();
      this.nav.present(toast);
  }
  * */

}
