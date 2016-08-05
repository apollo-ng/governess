'use strict';

import { Component }        from '@angular/core';
import { NavController,
         ToastController }  from 'ionic-angular';
import { ConfigService }    from '../../providers/config/config';
import { TaskService }    from '../../providers/tasks/tasks';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [ TaskService ],
})

////////////////////////////////////////////////////////////////////////
//
//

export class SettingsPage {

  private nav:              NavController;
  public toastCtrl:         ToastController;
  public taskService:       TaskService;
  public configService:     ConfigService;
  public config:            Object;

  //////////////////////////////////////////////////////////////////////

  constructor (
    nav:                    NavController,
    toastCtrl:              ToastController,
    configService:          ConfigService,
    taskService:            TaskService
  ) {
    this.nav =              nav;
    this.toastCtrl =        toastCtrl;
    this.configService =    configService;
    this.taskService =      taskService;
    this.config =           this.configService.get();
  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    console.log('help tapped - FIXME: Add proper help');
  }

  public updateConfig(): any {
    this.configService.update(this.config);
  }

  // Full Client Profile/Device/Settings Config-Reset (Factory Reset)

  public resetCPD(e: any): void {

    this.configService.reset();
    this.taskService.reset();

    let toast: any = this.toastCtrl.create({
      message: 'GovernessApp configuration has been reset',
      duration: 3000,
    });

    toast.present(toast);
  }

}
