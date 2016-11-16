import { NgModule }               from '@angular/core';
import { IonicApp,
         IonicModule }            from 'ionic-angular';
import { Storage }                from '@ionic/storage';

import { ChartsModule }           from 'ng2-charts/components/charts/charts';
import { ChartModule }            from 'angular2-chartjs';

import { Http }                   from '@angular/http';
import { TranslateModule,
         TranslateLoader,
         TranslateStaticLoader }  from 'ng2-translate/ng2-translate';

import { GovernessApp }           from './app.component';

import { AboutPage }              from '../pages/about/about';
import { AppliancePage }          from '../pages/appliance/appliance';
import { ApplianceDetailPage }    from '../pages/appliance/appliance.detail';
import { ControlPage }            from '../pages/control/control';
import { HelpPage }               from '../pages/help/help';
import { LogsPage }               from '../pages/logs/logs';
import { SettingsPage }           from '../pages/settings/settings';
import { TasksPage }              from '../pages/tasks/tasks';
import { TaskDetailPage }         from '../pages/tasks/task.detail';

import { ControlHelp }            from '../pages/control/control.help';
import { SettingsHelp }           from '../pages/settings/settings.help';
import { TasksHelp }              from '../pages/tasks/tasks.help';

import { WebSocketService }       from '../providers/websocket/websocket';
import { StorageService }         from '../providers/storage/storage';
import { ConfigService }          from '../providers/config/config';
import { StatusService }          from '../providers/status/status';
import { ApplianceService }       from '../providers/appliance/appliance';
import { TaskService }            from '../providers/tasks/tasks';

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
    AppliancePage,
    ApplianceDetailPage,
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
    AppliancePage,
    ApplianceDetailPage,
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
    Storage,
    StorageService,
    ConfigService,
    ApplianceService,
    StatusService,
    TaskService,
    WebSocketService,
  ],
})

export class AppModule {}
