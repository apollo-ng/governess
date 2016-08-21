'use strict';

import { Component,
         Type,
         OnInit,
         ViewChild }                from '@angular/core';

import { Platform,
         ionicBootstrap,
         MenuController,
         Nav }                      from 'ionic-angular';

import { Splashscreen,
         StatusBar }                from 'ionic-native';

import { ConfigService }            from './providers/config/config';

import { ControlPage }              from './pages/control/control';
import { AppliancePage }            from './pages/appliance/appliance';
import { TasksPage }                from './pages/tasks/tasks';
import { LogsPage }                 from './pages/logs/logs';
import { SettingsPage }             from './pages/settings/settings';
import { HelpPage }                 from './pages/help/help';
import { AboutPage }                from './pages/about/about';

////////////////////////////////////////////////////////////////////////

interface PageObj {
  title: string;
  component: any;
  idx?: number;
  icon: string;
}

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/app.html',
})

////////////////////////////////////////////////////////////////////////
//
//

export class GovernessApp implements OnInit {

  @ViewChild(Nav) private nav: Nav;

  private menu:           MenuController;
  private config:         any;
  private rootPage:       Type;

  public configService:   ConfigService;
  public platform:        Platform;

  // Populate side menu
  private pages: PageObj[]= [
    { title: 'Control',   component: ControlPage,   idx: 0, icon: 'speedometer' },
    { title: 'Appliance', component: AppliancePage, idx: 1, icon: 'logo-buffer' },
    { title: 'Tasks',     component: TasksPage,     idx: 2, icon: 'cube' },
    { title: 'Logs',      component: LogsPage,      idx: 3, icon: 'filing' },
    { title: 'Settings',  component: SettingsPage,  idx: 4, icon: 'settings' },
    { title: 'Help',      component: HelpPage,      idx: 5, icon: 'help-buoy' },
    { title: 'About',     component: AboutPage,     idx: 6, icon: 'information-circle' },
  ];

  //////////////////////////////////////////////////////////////////////

  constructor (

    menu:                   MenuController,
    platform:               Platform,
    configService:          ConfigService

  ) {

    this.platform =         platform;
    this.menu =             menu;
    this.configService =    configService;
    this.config =           {};

    this.initializeApp();

  }

  //////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {

    console.log('App ngOnInit');
    this.config = this.configService.get();

    // Define which page the app should show by default
    if (this.config.viewPref === 'last') {

      if (this.config.lastView) {

        // Set last viewed page, if not null
        this.rootPage = this.pages.filter (
          page => page.title.includes(this.config.lastView)
        )[0].component;

      } else {

        // Fallback to ControlPage
        this.rootPage = this.pages.filter (
          page => page.title.includes('Control')
        )[0].component;
      }

    } else {

      // Set selected value from config
      this.rootPage = this.pages.filter(
        page => page.title.includes(this.config.viewPref)
      )[0].component;

    }

  }

  //////////////////////////////////////////////////////////////////////

  private initializeApp(): void {

    this.platform.ready().then (
      () => {
        // Okay, so the platform is ready and our plugins are available.
        // Here we can do any higher level native things we might need.
        StatusBar.hide();
        Splashscreen.hide();
        if (Splashscreen) {
          setTimeout(() => {
          console.log('Hiding Splash');
          Splashscreen.hide();
          }, 100);
        }
      }
    );

  }

  //////////////////////////////////////////////////////////////////////

  public openPage(page: any): void {

    // Close the menu when clicking a link from the menu
    this.menu.close();

    // Store as lastView in config, if enabled
    if (this.config.viewPref === 'last') {
      this.config.lastView = page.title;
      this.configService.update(this.config);
    }

    // Navigate to the new page, if it is not the current page
    this.nav.setRoot(page.component);
  }

}

////////////////////////////////////////////////////////////////////////
// Bootstrap GovernessApp Main
////////////////////////////////////////////////////////////////////////

ionicBootstrap(
  GovernessApp,
  [ ConfigService ],
  {
    tabbarPlacement: 'top',
    mode: 'md',     // override ios/wd platform style with MD
    iconMode: 'md', // override ios/wd platform icons with MD
    prodMode: false,
  }
);
