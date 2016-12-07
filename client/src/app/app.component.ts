import { Component,
         OnInit,
         ViewChild }                from '@angular/core';

import { Platform,
         Nav }                      from 'ionic-angular';

import { Splashscreen,
         StatusBar }                from 'ionic-native';

import { TranslateService }         from 'ng2-translate';

import { ConfigService }            from '../providers/config/config';

import { AboutPage }                from '../pages/about/about';
import { AppliancesPage }           from '../pages/appliances/appliances';
import { ControlPage }              from '../pages/control/control';
import { HelpPage }                 from '../pages/help/help';
import { LogsPage }                 from '../pages/logs/logs';
import { SettingsPage }             from '../pages/settings/settings';
import { TasksPage }                from '../pages/tasks/tasks';

////////////////////////////////////////////////////////////////////////////////

export interface PageInterface {
  title: string;
  component: any;
  idx?: number;
  icon: string;
}

////////////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'app.html',
})

/*******************************************************************************
 *
 *   GovernessApp
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

    // Initialize translations
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
    this.configService.init().then((data) => {
      this.config = data;
      console.log('userLang', this.config.userLang);
      this.translate.use(this.config.userLang);

      // Populate the side menu
      this.pages = [
        { title: 'Control',    component: ControlPage,    idx: 0, icon: 'speedometer' },
        { title: 'Appliances', component: AppliancesPage, idx: 1, icon: 'logo-buffer' },
        { title: 'Tasks',      component: TasksPage,      idx: 2, icon: 'cube' },
        { title: 'Logs',       component: LogsPage,       idx: 3, icon: 'filing' },
        { title: 'Settings',   component: SettingsPage,   idx: 4, icon: 'settings' },
        { title: this.translate.instant('Help'),      component: HelpPage,      idx: 5, icon: 'help-buoy' },
        { title: 'About',      component: AboutPage,      idx: 6, icon: 'information-circle' },
      ];

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
    });
  }

  /*****************************************************************************
   * initializeApp
   */

  private initializeApp(): void {
    this.platform.ready().then(() => {
      console.log('initializeApp called');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
    this.nav.setRoot(page.component);
  }

}