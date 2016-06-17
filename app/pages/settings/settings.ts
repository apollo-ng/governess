'use strict';

import { Component } from '@angular/core';
import { NavController, Toast } from 'ionic-angular';
import { LocalStorageService, LocalStorage} from 'ng2-webstorage';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'build/pages/settings/settings.html',
})

////////////////////////////////////////////////////////////////////////
//
//

export class SettingsPage {

  @LocalStorage() public config: any;

  public nav: NavController;
  private storage: LocalStorageService;

  //////////////////////////////////////////////////////////////////////

  constructor (

    nav: NavController,
    storage: LocalStorageService

  ) {
    this.nav = nav;
    this.storage = storage;
    this.config.lastView = SettingsPage;
    this.storage.store('config', this.config);
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
