'use strict';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'build/pages/about/about.html',
})

////////////////////////////////////////////////////////////////////////
//
//

export class AboutPage {

  public nav: NavController;

  //////////////////////////////////////////////////////////////////////

  constructor (

    nav: NavController

  ) {
    this.nav = nav;
  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  };

}