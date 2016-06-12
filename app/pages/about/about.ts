'use strict';

import {NavController, Page} from 'ionic-angular';

/*

*/

@Page({
  templateUrl: 'build/pages/about/about.html'
})

export class AboutPage {

  public nav: NavController;

  constructor(nav: NavController) {
    this.nav = nav;
  }

}
