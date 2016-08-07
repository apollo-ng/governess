'use strict';

/* FIXME? */
/* tslint:disable:no-unused-variable */

import { Component }        from '@angular/core';
import { NavController,
         ViewController,
         ModalController,
         ToastController }  from 'ionic-angular';
import { ConfigService }    from '../../providers/config/config';
import { TaskService }      from '../../providers/tasks/tasks';

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
  public modalCtrl:         ModalController;
  public taskService:       TaskService;
  public configService:     ConfigService;
  public config:            Object;

  //////////////////////////////////////////////////////////////////////

  constructor (
    nav:                    NavController,
    toastCtrl:              ToastController,
    modalCtrl:              ModalController,
    configService:          ConfigService,
    taskService:            TaskService
  ) {
    this.nav =              nav;
    this.toastCtrl =        toastCtrl;
    this.modalCtrl =        modalCtrl;
    this.configService =    configService;
    this.taskService =      taskService;
    this.config =           this.configService.get();
  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    let modal: any = this.modalCtrl.create(HelpModal);
    modal.present(modal);
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

////////////////////////////////////////////////////////////////////////
// Help
////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/pages/settings/settings.help.html',
})

class HelpModal {

  private viewCtrl: ViewController;

  constructor( viewCtrl: ViewController ) {
    this.viewCtrl = viewCtrl;
  }

  private dismissModal(): void {
    this.viewCtrl.dismiss();
  }
}
