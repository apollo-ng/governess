import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { GovernessApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { AboutPage } from '../pages/about/about';

import { ConfigService }            from '../providers/config/config';

@NgModule({
  declarations: [
    GovernessApp,
    Page1,
    Page2,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(GovernessApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GovernessApp,
    Page1,
    Page2,
    AboutPage
  ],
  providers: [ConfigService]
})

export class AppModule {}
