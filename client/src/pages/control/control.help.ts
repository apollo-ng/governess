import { Component }      from '@angular/core';
import { ViewController } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'control.help.html',
})

/*******************************************************************************
 *
 *   ControlHelp
 *
 */

export class ControlHelp {

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
