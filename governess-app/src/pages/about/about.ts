import { Component }      from '@angular/core';
import { NavController }  from 'ionic-angular';

////////////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'about.html',
})

/*******************************************************************************
 *
 *   AboutPage
 *
 */

export class AboutPage {

  public navCtrl: NavController;

  /*****************************************************************************
   * constructor
   */

  constructor (

    navCtrl: NavController

  ) {
    this.navCtrl = navCtrl;
  }

}
