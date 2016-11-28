import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'help.html',
})

/*******************************************************************************
 *
 *   HelpPage
 *
 */

export class HelpPage {

  public navCtrl: NavController;

  constructor (

    navCtrl: NavController

  ) {
    this.navCtrl = navCtrl;
  }

}
