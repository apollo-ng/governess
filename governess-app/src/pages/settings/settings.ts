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

/******************************************************************************/

/******************************************************************************/

@Component ({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})

/*******************************************************************************
 *
 *     SettingsPage
 */

export class SettingsPage {

  public config:            any;

  //////////////////////////////////////////////////////////////////////

  constructor (

    public navCtrl:         NavController,
    public toastCtrl:       ToastController,
    public modalCtrl:       ModalController,
    public alertCtrl:       AlertController,
    public configService:   ConfigService,
    public taskService:     TaskService

  ) { /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

    this.config = {};

    this.init().then(data => {
      //console.log('I seem to be needed to get the promise')
    });

  }

  //////////////////////////////////////////////////////////////////////

  // as init is async separate logic here so it's testable
  public init(): Promise<void> {
    return this.configService.get().then((data: string) => {
      //console.log('settings ngoninit configdata', data);
      this.config = JSON.parse(data);
      //console.log(this.config);
    });
  }

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
            //this.config = this.configService.init();
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
