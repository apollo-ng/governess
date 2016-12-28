/* tslint:disable:use-strict */

import { NgModule,
         ErrorHandler }           from '@angular/core';
import { Http }                   from '@angular/http';

import { IonicApp,
         IonicModule,
         IonicErrorHandler }      from 'ionic-angular';

import { Storage }                from '@ionic/storage';

// Root Component //////////////////////////////////////////////////////////////

import { GovernessApp }           from './app.component';

// Translation /////////////////////////////////////////////////////////////////

import { TranslateModule,
         TranslateLoader,
         TranslateStaticLoader }  from 'ng2-translate/ng2-translate';

// Charting ////////////////////////////////////////////////////////////////////

import { ChartModule }            from 'angular2-chartjs';

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

import { WebSocketService }       from '../providers/websocket/websocket';
import { StorageService }         from '../providers/storage/storage';
import { ConfigService }          from '../providers/config/config';
import { StatusService }          from '../providers/status/status';
import { ApplianceService }       from '../providers/appliances/appliances';
import { PlatformService }        from '../providers/platforms/platforms';
import { PluginService }          from '../providers/plugins/';
import { TaskService }            from '../providers/tasks/tasks';
import { HashID }                 from '../providers/crypto/hashid';

// Pipes ///////////////////////////////////////////////////////////////////////

import { TemperaturePipe }        from '../pipes/temperature';

////////////////////////////////////////////////////////////////////////////////

/*******************************************************************************
 * createTranslateLoader - Set up static asset pipeline for i18n loading
 * @param {http Object}
 * @return {TranslateStaticLoader Object}
 */

export function createTranslateLoader(http: Http): any {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

/*******************************************************************************
 * provideStorage - Set up & configure app storage provider
 * @return {Storage Object}
 */

export function provideStorage(): any {
  return new Storage(
    [
      'sqlite',
      'indexeddb',
      'websql',
      'localstorage',
    ],
    {
      name: 'governessdb',
      storeName: 'governessdata',
    }
  );
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
    StorageService,
    ConfigService,
    ApplianceService,
    PlatformService,
    PluginService,
    StatusService,
    TaskService,
    WebSocketService,
    // Enable Ionic's storage engine
    { provide: Storage, useFactory: provideStorage },
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
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [ Http ],
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
