'use strict';

import { Component } from '@angular/core';
import { NavController, Toast } from 'ionic-angular';

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

  //////////////////////////////////////////////////////////////////////

  constructor (

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
