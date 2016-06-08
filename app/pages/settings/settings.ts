import {Page, NavController, Toast} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  constructor(public nav: NavController) {
this.nav = nav;
  }

  // Full Client Profile/Device/Settings Config-Reset (Factory Reset)
  resetCPD(event) {

    let toast = Toast.create({
    message: 'User was added successfully',
    duration: 3000
  });

      event.preventDefault();
      this.nav.present(toast);
  }
}
