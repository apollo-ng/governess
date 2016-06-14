'use strict';

import { Component,
         Type,
         ViewChild }                from '@angular/core';

import { Platform,
         ionicBootstrap,
         MenuController,
         Nav }                      from 'ionic-angular';

import { StatusBar }                from 'ionic-native';

import { ProfilesPage }             from './pages/profiles/profiles';
import { AppliancePage }            from './pages/appliance/appliance';
import { SettingsPage }             from './pages/settings/settings';
import { HelpPage }                 from './pages/help/help';
import { AboutPage }                from './pages/about/about';

import { NG2_WEBSTORAGE }           from 'ng2-webstorage';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/app.html',
})

////////////////////////////////////////////////////////////////////////
//
//

export class GovernessUIApp {

  @ViewChild(Nav) private nav: Nav;

  private rootPage: Type;
  private pages: Array<{title: string, component: Type}>;

  public platform: Platform;
  public menu: MenuController;

  //////////////////////////////////////////////////////////////////////

  constructor (

    platform: Platform,
    menu: MenuController

  ) {

    this.platform = platform;
    this.menu = menu;

    // Define which page the app should show by default
    this.rootPage = HelpPage;

    // Set up pages of side menu
    this.pages = [
      { title: 'Appliance', component: AppliancePage },
      { title: 'Profiles', component: ProfilesPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Help', component: HelpPage },
      { title: 'About', component: AboutPage },
    ];

    this.initializeApp();
  }

  //////////////////////////////////////////////////////////////////////

  private initializeApp(): void {
    this.platform.ready().then (
      () => {
        // Okay, so the platform is ready and our plugins are available.
        // Here we can do any higher level native things we might need.
        StatusBar.styleDefault();
      }
    );
  }

  //////////////////////////////////////////////////////////////////////

  public openPage(page: any): void {
    console.log(page);
    console.log(this.menu);
    // Close the menu when clicking a link from the menu
    this.menu.close();
    // Navigate to the new page, if it is not the current page
    this.nav.setRoot(page.component);
  }

}

////////////////////////////////////////////////////////////////////////
// Bootstrap Governess Main App
////////////////////////////////////////////////////////////////////////
// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/

ionicBootstrap(GovernessUIApp, [ NG2_WEBSTORAGE ], {
  modalEnter: 'modal-ease-in',
  modalLeave: 'modal-slide-out',
  tabbarPlacement: 'top',
  pageTransition: 'ease-in',
  prodMode: 'false'}
);
