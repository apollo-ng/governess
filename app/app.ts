'use strict';

import { Component,
         Type,
         ViewChild }                from '@angular/core';

import { Platform,
         ionicBootstrap,
         MenuController,
         Nav }                      from 'ionic-angular';

import { StatusBar }                from 'ionic-native';

import { ConfigService }            from './providers/config/config';

import { HomePage }                 from './pages/home/home';
import { AppliancePage }            from './pages/appliance/appliance';
import { TasksPage }                from './pages/tasks/tasks';
import { LogPage }                  from './pages/log/log';
import { SettingsPage }             from './pages/settings/settings';
import { HelpPage }                 from './pages/help/help';
import { AboutPage }                from './pages/about/about';

////////////////////////////////////////////////////////////////////////

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/app.html',
})

////////////////////////////////////////////////////////////////////////
//
//

export class GovernessApp {

  @ViewChild(Nav) private nav: Nav;

  private menu: MenuController;

  public platform: Platform;
  public configService: ConfigService;

  // Define which page the app should show by default
  public rootPage: Type = HomePage;

  // Set up pages of side menu
  public pages: PageObj[]= [
    { title: 'Home',        component: HomePage,        index: 0, icon: 'home' },
    { title: 'Appliance',   component: AppliancePage,   index: 1, icon: 'cube' },
    { title: 'Tasks',       component: TasksPage,       index: 2, icon: 'map' },
    { title: 'Log',         component: LogPage,         index: 3, icon: 'filing' },
    { title: 'Settings',    component: SettingsPage,    index: 4, icon: 'settings' },
    { title: 'Help',        component: HelpPage,        index: 5, icon: 'help-buoy' },
    { title: 'About',       component: AboutPage,       index: 6, icon: 'information-circle' },
  ];

  //////////////////////////////////////////////////////////////////////

  constructor (

    menu: MenuController,
    platform: Platform,
    configService: ConfigService

  ) {

    this.platform = platform;
    this.menu = menu;
    this.configService = configService;

    // load the config data
    configService.load();

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

ionicBootstrap(GovernessApp, [ ConfigService ], {
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabbarPlacement: 'top',
  pageTransition: 'ease',
  prodMode: 'false'}
);
