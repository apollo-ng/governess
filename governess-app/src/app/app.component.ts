import { Component,
         Type,
         OnInit,
         ViewChild }                from '@angular/core';

import { Platform,
         Nav }                      from 'ionic-angular';

import { Splashscreen,
         StatusBar }                from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { AboutPage } from '../pages/about/about';
import { AppliancePage } from '../pages/appliance/appliance';
import { HelpPage } from '../pages/help/help';
import { LogsPage } from '../pages/logs/logs';
import { SettingsPage } from '../pages/settings/settings';
import { TasksPage } from '../pages/tasks/tasks';

import { ConfigService }            from '../providers/config/config';
import { TaskService }            from '../providers/tasks/tasks';

////////////////////////////////////////////////////////////////////////

interface PageObj {
  title: string;
  component: any;
  idx?: number;
  icon: string;
}

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'app.html'
})

////////////////////////////////////////////////////////////////////////
//
//

export class GovernessApp implements OnInit {

  @ViewChild(Nav) nav: Nav;

  public platform:        Platform;
  public configService:   ConfigService;

  private rootPage:       any;
  private config:         any;

  // Populate side menu
  private pages: PageObj[]= [
    { title: 'Control',   component: Page1,   idx: 0, icon: 'speedometer' },
    { title: 'Appliance', component: AppliancePage, idx: 1, icon: 'logo-buffer' },
    { title: 'Tasks',     component: TasksPage,     idx: 2, icon: 'cube' },
    { title: 'Logs',      component: LogsPage,      idx: 3, icon: 'filing' },
    { title: 'Settings',  component: SettingsPage,  idx: 4, icon: 'settings' },
    { title: 'Help',      component: HelpPage,      idx: 5, icon: 'help-buoy' },
    { title: 'About',     component: AboutPage,     idx: 6, icon: 'information-circle' },
  ];

  //////////////////////////////////////////////////////////////////////

  constructor(
    platform:               Platform,
    configService:          ConfigService
  ) {

    this.platform =         platform;
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
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  //////////////////////////////////////////////////////////////////////

  public openPage(page: any): void {
    // Store as lastView in config, if enabled
    if (this.config.viewPref === 'last') {
      this.config.lastView = page.title;
      this.configService.update(this.config);
    }

    // Navigate to the new page, if it is not the current page
    this.nav.setRoot(page.component);
  }
}
