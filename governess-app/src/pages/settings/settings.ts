import { Component }        from '@angular/core';
import { NavController,
         ViewController,
         ModalController,
         ToastController,
         AlertController }  from 'ionic-angular';
import { Vibration }        from 'ionic-native';
import { ConfigService }    from '../../providers/config/config';
import { TaskService }      from '../../providers/tasks/tasks';

import { SettingsHelp }     from './settings.help';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'settings.html'
})

////////////////////////////////////////////////////////////////////////
//
//

export class SettingsPage {

  public navCtrl:              NavController;
  public toastCtrl:         ToastController;
  public modalCtrl:         ModalController;
  public alertCtrl:         AlertController;
  public taskService:       TaskService;
  public configService:     ConfigService;
  public config:            Object;

  //////////////////////////////////////////////////////////////////////

  constructor (
    navCtrl:                NavController,
    toastCtrl:              ToastController,
    modalCtrl:              ModalController,
    alertCtrl:              AlertController,
    configService:          ConfigService,
    taskService:            TaskService
  ) {
    this.navCtrl =          navCtrl;
    this.toastCtrl =        toastCtrl;
    this.modalCtrl =        modalCtrl;
    this.alertCtrl =        alertCtrl;
    this.configService =    configService;
    this.taskService =      taskService;
    this.config =           this.configService.get();
  }

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    let modal: any = this.modalCtrl.create(SettingsHelp);
    modal.present(modal);
  }

  public updateConfig(): any {
    this.configService.update(this.config);
  }

  // Full Client Profile/Device/Settings Config-Reset (Factory Reset)

  public resetCPD(e: any): void {
    Vibration.vibrate(400);
    let confirm: any = this.alertCtrl.create({
      title: 'Please confirm:',
      message: 'Do you really want me to wipe all of your custom settings?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // console.log('resetCPD aborted');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.configService.init();
            this.taskService.reset();

            let toast: any = this.toastCtrl.create({
              message: 'GovernessApp configuration has been reset',
              duration: 3000,
            });

            toast.present(toast);
          },
        },
      ],
    });
    confirm.present();
  }

}
