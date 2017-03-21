/* tslint:disable:use-strict */

import { NgModule,
         ErrorHandler }           from '@angular/core';
import { Http }                   from '@angular/http';

import { IonicApp,
         IonicModule,
         IonicErrorHandler }      from 'ionic-angular';

import { IonicStorageModule }     from '@ionic/storage';

import { StatusBar }              from '@ionic-native/status-bar';
import { SplashScreen }           from '@ionic-native/splash-screen';

// Root Component //////////////////////////////////////////////////////////////

import { GovernessApp }           from './app.component';

// Translation /////////////////////////////////////////////////////////////////

import { TranslateModule,
         TranslateLoader }        from '@ngx-translate/core';
import { TranslateHttpLoader}     from '@ngx-translate/http-loader';

// Charting ////////////////////////////////////////////////////////////////////

import { ChartModule }            from '../components/chart';

// ColorPicker /////////////////////////////////////////////////////////////////

import { ColorPickerModule,
         ColorPickerService }     from '../components/color-picker';

// Dashboard ///////////////////////////////////////////////////////////////////

import { Dashboard }              from '../pages/dashboard/dashboard';

// Pages ///////////////////////////////////////////////////////////////////////

import { AboutPage }              from '../pages/about/about';
import { AppliancesPage }         from '../pages/appliances/appliances';
import { ApplianceDetailPage }    from '../pages/appliances/appliance.detail';
import { AddPluginModal }         from '../pages/appliances/appliance.detail.addplugin';
import { EditPluginModal }        from '../pages/appliances/appliance.detail.editplugin';
import { HelpPage }               from '../pages/help/help';
import { LogsPage }               from '../pages/logs/logs';
import { SettingsPage }           from '../pages/settings/settings';
import { TasksPage }              from '../pages/tasks/tasks';
import { TaskDetailPage }         from '../pages/tasks/task.detail';

// Help ////////////////////////////////////////////////////////////////////////

import { DashboardHelp }          from '../pages/dashboard/dashboard.help';
import { AppliancesHelp }         from '../pages/appliances/appliances.help';
import { SettingsHelp }           from '../pages/settings/settings.help';
import { TasksHelp }              from '../pages/tasks/tasks.help';

// Providers ///////////////////////////////////////////////////////////////////

import { WebSocketService }       from '../providers/websocket';
import { ConfigService }          from '../providers/config';
import { StatusService }          from '../providers/status';
import { ApplianceService }       from '../providers/appliances';
import { PlatformService }        from '../providers/platforms';
import { PluginService }          from '../providers/plugins';
import { TaskService }            from '../providers/tasks';
import { HashID }                 from '../providers/crypto';

// Pipes ///////////////////////////////////////////////////////////////////////

import { ReversePipe,
         TemperaturePipe }        from '../pipes';

////////////////////////////////////////////////////////////////////////////////

/*******************************************************************************
 * createTranslateLoader - Set up static asset pipeline for i18n loading
 * @param {http Object}
 * @return {TranslateStaticLoader Object}
 */

export function createTranslateLoader(http: Http): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/*******************************************************************************
 * declarations
 */

export const declarations: any = [
  GovernessApp,
  AboutPage,
  AppliancesPage,
  AppliancesHelp,
  ApplianceDetailPage,
  AddPluginModal,
  EditPluginModal,
  Dashboard,
  DashboardHelp,
  HelpPage,
  LogsPage,
  SettingsPage,
  SettingsHelp,
  TasksPage,
  TasksHelp,
  TaskDetailPage,
  ReversePipe,
  TemperaturePipe,
];

/*******************************************************************************
 * pages
 */

export const pages: any = [
  GovernessApp,
  AboutPage,
  AppliancesPage,
  AppliancesHelp,
  ApplianceDetailPage,
  AddPluginModal,
  EditPluginModal,
  Dashboard,
  DashboardHelp,
  HelpPage,
  LogsPage,
  SettingsPage,
  SettingsHelp,
  TasksPage,
  TasksHelp,
  TaskDetailPage,
];

/*******************************************************************************
 * providers
 */

export function providers(): any {
  return [
    HashID,
    ColorPickerService,
    ConfigService,
    ApplianceService,
    PlatformService,
    PluginService,
    StatusService,
    TaskService,
    WebSocketService,
    // Ionic native components
    StatusBar,
    SplashScreen,
    // Enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ];
}

/*******************************************************************************
 * imports
 */

export let imports: any = [
  ChartModule,
  ColorPickerModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [ Http ],
    },
  }),
  IonicStorageModule.forRoot({
    name: 'governessdb',
    storeName: 'governessdata',
    driverOrder: ['indexeddb', 'sqlite', 'websql'],
  }),
  IonicModule.forRoot(GovernessApp, {
    mode: 'md',
    menuType: 'overlay',
    activator: 'ripple',
  }),
];

/*******************************************************************************
 *
 *    NgModule
 *
 */

@NgModule({
  declarations: declarations,
  imports: imports,
  bootstrap: [ IonicApp ],
  entryComponents: pages,
  providers: providers(),
})

export class AppModule {}
