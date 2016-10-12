////////////////////////////////////////////////////////////////////////
// Help
////////////////////////////////////////////////////////////////////////

import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'settings.help.html',
})

export class SettingsHelp {

  public viewCtrl: ViewController;

  constructor( viewCtrl: ViewController ) {
    this.viewCtrl = viewCtrl;
  }

  private dismissModal(): void {
    this.viewCtrl.dismiss();
  }
}
