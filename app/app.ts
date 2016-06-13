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

/*

*/

@Component({
  templateUrl: 'build/app.html',
})

export class GovernessUIApp {

  @ViewChild(Nav) private nav: Nav;

  private rootPage: Type;
  private pages: Array<{title: string, component: Type}>;

  public platform: Platform;
  public menu: MenuController;

  constructor( platform: Platform,
               menu: MenuController
  ) {

    this.platform = platform;
    this.menu = menu;

    this.rootPage = HelpPage;

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Appliance', component: AppliancePage },
      { title: 'Profiles', component: ProfilesPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Help', component: HelpPage },
      { title: 'About', component: AboutPage },
    ];

  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  public openPage(page: any): void {
    console.log(page);
    console.log(this.menu);
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/

ionicBootstrap(GovernessUIApp, null, {
  modalEnter: 'modal-ease-in',
  modalLeave: 'modal-slide-out',
  tabbarPlacement: 'top',
  pageTransition: 'ease-in',
  prodMode: 'false'}
);
