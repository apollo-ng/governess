
import { Component,
         OnInit,
         ViewChild }                from '@angular/core';

import { Platform,
         Nav }                      from 'ionic-angular';

import { Splashscreen,
         StatusBar }                from 'ionic-native';

// Providers ///////////////////////////////////////////////////////////////////

import { TranslateService }         from 'ng2-translate';
import { ConfigService }            from '../providers/config/config';

// Pages ///////////////////////////////////////////////////////////////////////

import { AboutPage }                from '../pages/about/about';
import { AppliancesPage }           from '../pages/appliances/appliances';
import { ControlPage }              from '../pages/control/control';
import { HelpPage }                 from '../pages/help/help';
import { LogsPage }                 from '../pages/logs/logs';
import { SettingsPage }             from '../pages/settings/settings';
import { TasksPage }                from '../pages/tasks/tasks';

////////////////////////////////////////////////////////////////////////////////

export interface PageInterface {
  title: string; // Page Title
  cmp: any;      // Component
  idx: number;   // Index Number (defines order)
  icon: string;  // Icon for Menu/Header
}

////////////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'app.html',
})

/*******************************************************************************
 *
 *    GovernessApp
 *
 */

export class GovernessApp implements OnInit {

  @ViewChild(Nav) public nav: Nav;

  public configService: ConfigService;
  public translate: TranslateService;
  public config: any = {};
  public pages: PageInterface[];
  public rootPage: any;

  private platform: Platform;

  /*****************************************************************************
   * constructor
   */

  constructor(

    platform: Platform,
    configService: ConfigService,
    translate: TranslateService

  ) {

    this.platform = platform;
    this.translate = translate;
    this.configService = configService;

    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.initializeApp();

  }

  /*****************************************************************************
   * ngOnInit
   */

  public ngOnInit(): void {

    // Wrapping into configService.init to make sure that we have a config
    // FIXME: This seems kinda messy, isn't there a more elegant way?
    this.configService.init().then( (_data) => {

      this.config = _data;
      this.translate.use(this.config.userLang);

      // Populate the side menu
      this.pages = [
        { title: 'CONTROL',    cmp: ControlPage,    idx: 0, icon: 'speedometer' },
        { title: 'APPLIANCES', cmp: AppliancesPage, idx: 1, icon: 'logo-buffer' },
        { title: 'TASKS',      cmp: TasksPage,      idx: 2, icon: 'cube' },
        { title: 'LOGS',       cmp: LogsPage,       idx: 3, icon: 'filing' },
        { title: 'SETTINGS',   cmp: SettingsPage,   idx: 4, icon: 'settings' },
        { title: 'HELP',       cmp: HelpPage,       idx: 5, icon: 'help-buoy' },
        { title: 'ABOUT',      cmp: AboutPage,      idx: 6, icon: 'information-circle' },
      ];

      // Define which page the app should show by default
      if (this.config.viewPref === 'last') {

        if (this.config.lastView) {

          // Set last viewed page, if not null
          this.rootPage = this.pages.filter (
            page => page.title.includes(this.config.lastView)
          )[0].cmp;

        } else {

          // Fallback to ControlPage
          this.rootPage = this.pages.filter (
            page => page.title.includes('CONTROL')
          )[0].cmp;
        }

      } else {

        // Set selected value from config
        this.rootPage = this.pages.filter(
          page => page.title.includes(this.config.viewPref)
        )[0].cmp;

      }

    });
  }

  /*****************************************************************************
   * initializeApp
   */

  private initializeApp(): void {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  /*****************************************************************************
   * openPage
   * @param {Page Object}
   */

  public openPage(page: any): void {

    // Store as lastView in config, if enabled
    if (this.config.viewPref === 'last') {
      this.config.lastView = page.title;
      this.configService.update(this.config);
    }

    // Navigate to the new page, if it is not the current page
    this.nav.setRoot(page.cmp);

  }

}
