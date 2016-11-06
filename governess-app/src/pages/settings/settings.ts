import { Component }        from '@angular/core';
import { NavController,
         ModalController,
         ToastController,
         AlertController }  from 'ionic-angular';
import { Vibration }        from 'ionic-native';

import { ConfigService }    from '../../providers/config/config';
import { TaskService }      from '../../providers/tasks/tasks';

import { SettingsHelp }     from './settings.help';

////////////////////////////////////////////////////////////////////////////////

@Component ({
  selector: 'settings-page',
  templateUrl: 'settings.html',
})

/*******************************************************************************
 *
 *   SettingsPage
 *
 */

export class SettingsPage {

  public navCtrl:         NavController;
  public toastCtrl:       ToastController;
  public modalCtrl:       ModalController;
  public alertCtrl:       AlertController;
  public configService:   ConfigService;
  public taskService:     TaskService;

  public config: any;

  /*****************************************************************************
   * constructor
   */

  constructor (

    navCtrl:         NavController,
    toastCtrl:       ToastController,
    modalCtrl:       ModalController,
    alertCtrl:       AlertController,
    configService:   ConfigService,
    taskService:     TaskService

  ) {

    this.navCtrl = navCtrl;
    this.toastCtrl = toastCtrl;
    this.modalCtrl = modalCtrl;
    this.alertCtrl = alertCtrl;
    this.configService = configService;
    this.taskService = taskService;

    this.config = {};

    this.init().then( () => {
      // console.log('I seem to be needed to get the promise');
    });

  }

  /*****************************************************************************
   * init
   * @return {Appliance} Object Promise
   */

  public init(): Promise<void> {
    return this.configService.get().then((data: string) => {
      console.log('settings ngoninit configdata', data);
      this.config = JSON.parse(data);
      // console.log(this.config);
    });
  }

  /*****************************************************************************
   * openHelp
   */

  public openHelp(): void {
    let modal: any = this.modalCtrl.create(SettingsHelp);
    modal.present(modal);
  }

  /*****************************************************************************
   * updateConfig
   */

  public updateConfig(): any {
    this.configService.update(this.config);
    this.config = this.configService.config;
  }

  /*****************************************************************************
   * Full Client Profile/Device/Settings Config-Reset (Factory Reset)
   */

  public resetCPD(): void {
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
            // this.config = this.configService.init();
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
