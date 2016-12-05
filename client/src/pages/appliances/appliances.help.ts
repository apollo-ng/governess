import { Component }      from '@angular/core';
import { ViewController } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'appliances.help.html',
})

/*******************************************************************************
 *
 *   AppliancesHelp
 *
 */

export class AppliancesHelp {

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
