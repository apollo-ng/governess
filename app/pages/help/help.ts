'use strict';

import {NavController, Page} from 'ionic-angular';

/*

*/

@Page({
  templateUrl: 'build/pages/help/help.html',
})

export class HelpPage {

  public nav: NavController;

  constructor(nav: NavController) {
    this.nav = nav;
  }

}
