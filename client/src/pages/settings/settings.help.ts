import { Component }      from '@angular/core';
import { ViewController } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'settings.help.html',
})

/*******************************************************************************
 *
 *   SettingsHelp
 *
 */

export class SettingsHelp {

  public viewCtrl: ViewController;

  constructor(
    viewCtrl: ViewController
  ) {

    this.viewCtrl = viewCtrl;

  }

  public dismissModal(): void {
    this.viewCtrl.dismiss();
  }

}
