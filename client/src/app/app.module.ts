import { NgModule,
         ErrorHandler }           from '@angular/core';
import { Http }                   from '@angular/http';

import { IonicApp,
         IonicModule,
         IonicErrorHandler }      from 'ionic-angular';

import { Storage }                from '@ionic/storage';

import { ChartsModule }           from 'ng2-charts/components/charts/charts';
import { ChartModule }            from 'angular2-chartjs';

// Translation /////////////////////////////////////////////////////////////////

import { TranslateModule,
         TranslateLoader,
         TranslateStaticLoader }  from 'ng2-translate/ng2-translate';

// Root Component //////////////////////////////////////////////////////////////

import { GovernessApp }           from './app.component';

// Pages ///////////////////////////////////////////////////////////////////////

import { AboutPage }              from '../pages/about/about';
import { AppliancesPage }         from '../pages/appliances/appliances';
import { ApplianceDetailPage,
         AddPluginModal,
         EditPluginModal }        from '../pages/appliances/appliance.detail';
import { ControlPage }            from '../pages/control/control';
import { HelpPage }               from '../pages/help/help';
import { LogsPage }               from '../pages/logs/logs';
import { SettingsPage }           from '../pages/settings/settings';
import { TasksPage }              from '../pages/tasks/tasks';
import { TaskDetailPage }         from '../pages/tasks/task.detail';

// Help ////////////////////////////////////////////////////////////////////////

import { AppliancesHelp }         from '../pages/appliances/appliances.help';
import { ControlHelp }            from '../pages/control/control.help';
import { SettingsHelp }           from '../pages/settings/settings.help';
import { TasksHelp }              from '../pages/tasks/tasks.help';

// Providers ///////////////////////////////////////////////////////////////////

import { WebSocketService }       from '../providers/websocket/websocket';
import { StorageService }         from '../providers/storage/storage';
import { ConfigService }          from '../providers/config/config';
import { StatusService }          from '../providers/status/status';
import { ApplianceService }       from '../providers/appliances/appliances';
import { PluginService }          from '../providers/plugins/plugins';
import { TaskService }            from '../providers/tasks/tasks';
import { ShortID }                from '../providers/crypto/shortid';
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
    ControlPage,
    ControlHelp,
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
    ChartsModule,
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
    ControlPage,
    ControlHelp,
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
    ShortID,
    HashID,
    StorageService,
    ConfigService,
    ApplianceService,
    PluginService,
    StatusService,
    TaskService,
    WebSocketService,
  ],
})

export class AppModule {}