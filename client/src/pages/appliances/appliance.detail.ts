import { Component }                from '@angular/core';
import { NavParams,
         NavController,
         AlertController,
         ModalController,
         PopoverController,
         ActionSheetController }    from 'ionic-angular';

import { ApplianceService }         from '../../providers/appliances/appliances';

import { AddPluginModal }           from './appliance.detail.addplugin';
import { EditPluginModal }          from './appliance.detail.editplugin';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector:                         'appliance-detail-page',
  templateUrl:                      'appliance.detail.html',
})

/*******************************************************************************
 *
 *   ApplianceDetailPage
 *
 */

export class ApplianceDetailPage {

  public appliance:                   any;
  public platforms:                   any;
  public data:                        any;
  public view:                        string = 'settings';
  public navParams:                   NavParams;

  public alertCtrl:                   AlertController;
  public modalCtrl:                   ModalController;
  public navCtrl:                     NavController;
  public popoverCtrl:                 PopoverController;
  public actionSheetCtrl:             ActionSheetController;
  public applianceService:            ApplianceService;

  /*****************************************************************************
   * constructor
   */

  constructor(

    alertCtrl:                        AlertController,
    modalCtrl:                        ModalController,
    navCtrl:                          NavController,
    popoverCtrl:                      PopoverController,
    actionSheetCtrl:                  ActionSheetController,
    navParams:                        NavParams,
    applianceService:                 ApplianceService,

  ) {

    this.alertCtrl =                  alertCtrl;
    this.modalCtrl =                  modalCtrl;
    this.navCtrl =                    navCtrl;
    this.popoverCtrl =                popoverCtrl;
    this.actionSheetCtrl =            actionSheetCtrl;
    this.navParams =                  navParams;
    this.applianceService =           applianceService;

    this.appliance =                  this.navParams.data;
    this.data =                       this.appliance.data;
    this.platforms =                  this.applianceService.getHostPlatforms();

  }

  /*****************************************************************************
   * updateAppliance
   */

  public updateAppliance(): void {
    console.log('FIXME: Do something here like saving...');
  }

  /*****************************************************************************
   * renameAppliance
   * @param {event} appliance
   */

  public renameAppliance(appliance: any): void {
    let alert: any = this.alertCtrl.create();
    alert.setTitle('Name of this Appliance');
    alert.addInput({ type: 'text', name: 'appName', value: appliance.name });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Save',
      handler: data => {
        if (data !== undefined) {
          // console.log(data);
          this.appliance.name = data.appName;
          this.applianceService.updateD();
        }
      },
    });
    alert.present();
  }

  /*****************************************************************************
   * removeAppliance
   * @param
   */

  public removeAppliance(index: number, name: string): void {
    let confirm: any = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Do you really want to remove the appliance<br/>' + name + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { /* */ },
        },
        {
          text: 'Yes',
          handler: () => {
            this.applianceService.delete(index);
            this.navCtrl.pop();
          },
        },
      ],
    });
    confirm.present();
  }

  /*****************************************************************************
   * addPluginModal
   * @param
   */

  public addPlugin(aid: string, type: string): void {
    let addPluginModal: any = this.modalCtrl.create ( AddPluginModal, {
      'aid': aid,
      'type': type,
    });

    addPluginModal.onDidDismiss((item) => {
      if (item) {
        // Do something here...
      }
    });

    addPluginModal.present();
  }

  /*****************************************************************************
   * editPlugin
   * @param
   */

  public editPlugin(aid: string, type: string, pidx: number): void {
    let editPluginModal: any = this.modalCtrl.create ( EditPluginModal, {
      'aid': aid,
      'type': type,
      'pidx': pidx,
    });

    editPluginModal.onDidDismiss( (item) => {
      if (item) {
        // Do something here...
      }
    });

    editPluginModal.present();
  }

  /*****************************************************************************
   * setAppView
   * @param
   */

  public setAppView(_view: string): void {
    this.view = _view;
  }

}
