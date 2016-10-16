import { NgModule }               from '@angular/core';
import { IonicApp,
         IonicModule }            from 'ionic-angular';
import { Storage }                from '@ionic/storage';

import { GovernessApp }           from './app.component';

import { AboutPage }              from '../pages/about/about';
import { AppliancePage }          from '../pages/appliance/appliance';
import { ControlPage }            from '../pages/control/control';
import { HelpPage }               from '../pages/help/help';
import { LogsPage }               from '../pages/logs/logs';
import { SettingsPage }           from '../pages/settings/settings';
import { TasksPage }              from '../pages/tasks/tasks';
import { TaskDetailPage }         from '../pages/tasks/task-detail';

import { SettingsHelp }           from '../pages/settings/settings.help';

import { $WebSocket }             from '../providers/websocket/websocket';
import { StorageService }         from '../providers/storage/storage';
import { ConfigService }          from '../providers/config/config';
import { StatusService }          from '../providers/status/status';
import { TaskService }            from '../providers/tasks/tasks';


import { ChartsModule }           from 'ng2-charts/components/charts/charts';

@NgModule({
  declarations: [
    GovernessApp,
    AboutPage,
    AppliancePage,
    ControlPage,
    HelpPage,
    LogsPage,
    SettingsPage,
    SettingsHelp,
    TasksPage,
    TaskDetailPage,
  ],
  imports: [
    ChartsModule,
    IonicModule.forRoot(GovernessApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GovernessApp,
    AboutPage,
    AppliancePage,
    ControlPage,
    HelpPage,
    LogsPage,
    SettingsPage,
    SettingsHelp,
    TasksPage,
    TaskDetailPage,
  ],
  providers: [
    Storage,
    $WebSocket,
    StorageService,
    ConfigService,
    StatusService,
    TaskService
  ]
})

export class AppModule {}
