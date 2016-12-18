import { Component }      from '@angular/core';
import { NavController }  from 'ionic-angular';
// import { appTag }          from '../../app/tag.ts';

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
  // public tag: string = appTag;

  /*****************************************************************************
   * constructor
   */

  constructor (

    navCtrl: NavController

  ) {

    this.navCtrl = navCtrl;

  }
}
