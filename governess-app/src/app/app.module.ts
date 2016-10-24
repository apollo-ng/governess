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
import { TaskDetailPage }         from '../pages/tasks/task.detail';

import { ControlHelp }            from '../pages/control/control.help';
import { SettingsHelp }           from '../pages/settings/settings.help';
import { TasksHelp }              from '../pages/tasks/tasks.help';

import { WebSocketService }       from '../providers/websocket/websocket';
import { StorageService }         from '../providers/storage/storage';
import { ConfigService }          from '../providers/config/config';
import { StatusService }          from '../providers/status/status';
import { TaskService }            from '../providers/tasks/tasks';

import { ChartsModule }           from 'ng2-charts/components/charts/charts';

import { TimeformatSelector }     from '../components/timeformat-selector';

@NgModule({
  declarations: [
    GovernessApp,
    AboutPage,
    AppliancePage,
    ControlPage,
    ControlHelp,
    HelpPage,
    LogsPage,
    SettingsPage,
    SettingsHelp,
    TasksPage,
    TasksHelp,
    TaskDetailPage,
    TimeformatSelector,
  ],
  imports: [
    ChartsModule,
    IonicModule.forRoot(GovernessApp)
  ],
  exports: [
    TimeformatSelector
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GovernessApp,
    AboutPage,
    AppliancePage,
    ControlPage,
    ControlHelp,
    HelpPage,
    LogsPage,
    SettingsPage,
    SettingsHelp,
    TasksPage,
    TasksHelp,
    TaskDetailPage,
    TimeformatSelector,
  ],
  providers: [
    Storage,
    StorageService,
    ConfigService,
    StatusService,
    TaskService,
    WebSocketService,
  ]
})

export class AppModule {}
