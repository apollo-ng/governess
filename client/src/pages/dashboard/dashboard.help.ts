import { Component }      from '@angular/core';
import { ViewController } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'dashboard.help.html',
})

/*******************************************************************************
 *
 *   DashboardHelp
 *
 */

export class DashboardHelp {

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
