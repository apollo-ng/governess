////////////////////////////////////////////////////////////////////////
// Help
////////////////////////////////////////////////////////////////////////

import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'control.help.html',
})

export class ControlHelp {

  public viewCtrl: ViewController;

  constructor( viewCtrl: ViewController ) {
    this.viewCtrl = viewCtrl;
  }

  private dismissModal(): void {
    this.viewCtrl.dismiss();
  }
}
