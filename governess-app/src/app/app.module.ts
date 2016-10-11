import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { GovernessApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { AboutPage } from '../pages/about/about';
import { HelpPage } from '../pages/help/help';
import { LogsPage } from '../pages/logs/logs';
import { SettingsPage } from '../pages/settings/settings';

import { ConfigService }            from '../providers/config/config';
import { TaskService }            from '../providers/tasks/tasks';

@NgModule({
  declarations: [
    GovernessApp,
    Page1,
    Page2,
    AboutPage,
    HelpPage,
    LogsPage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(GovernessApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GovernessApp,
    Page1,
    Page2,
    AboutPage,
    HelpPage,
    LogsPage,
    SettingsPage
  ],
  providers: [ConfigService, TaskService]
})

export class AppModule {}
