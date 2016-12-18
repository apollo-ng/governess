import { NgModule,
         ErrorHandler }           from '@angular/core';
import { Http }                   from '@angular/http';

import { IonicApp,
         IonicModule,
         IonicErrorHandler }      from 'ionic-angular';

import { Storage }                from '@ionic/storage';

import { ChartModule }            from 'angular2-chartjs';

// Translation /////////////////////////////////////////////////////////////////

import { TranslateModule,
         TranslateLoader,
         TranslateStaticLoader }  from 'ng2-translate/ng2-translate';

// Root Component //////////////////////////////////////////////////////////////

import { GovernessApp }           from './app.component';

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
import { PluginService }          from '../providers/plugins/plugins';
import { TaskService }            from '../providers/tasks/tasks';
import { HashID }                 from '../providers/crypto/hashid';

// Pipes ///////////////////////////////////////////////////////////////////////

import { TemperaturePipe }        from '../pipes/temperature';

////////////////////////////////////////////////////////////////////////////////

export function createTranslateLoader(http: Http): any {
  'use strict';
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

////////////////////////////////////////////////////////////////////////////////

@NgModule({
  declarations: [
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
  ],
  imports: [
    ChartModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http],
    }),
    IonicModule.forRoot(GovernessApp, {
      mode: 'md',
      menuType: 'overlay',
      activator: 'ripple',
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
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
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    HashID,
    StorageService,
    ConfigService,
    ApplianceService,
    PlatformService,
    PluginService,
    StatusService,
    TaskService,
    WebSocketService,
  ],
})

export class AppModule {}
