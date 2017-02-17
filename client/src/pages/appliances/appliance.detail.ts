import { Component }                from '@angular/core';
import { NavParams,
         NavController,
         AlertController,
         ModalController,
         ActionSheetController }    from 'ionic-angular';

import { ApplianceService }         from '../../providers/appliances';
import { PlatformService }          from '../../providers/platforms';

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
  public actionSheetCtrl:             ActionSheetController;
  public applianceService:            ApplianceService;
  public platformService:             PlatformService;

  /*****************************************************************************
   * constructor
   */

  constructor(

    navParams:                        NavParams,
    navCtrl:                          NavController,
    alertCtrl:                        AlertController,
    modalCtrl:                        ModalController,
    actionSheetCtrl:                  ActionSheetController,
    applianceService:                 ApplianceService,
    platformService:                  PlatformService,

  ) {

    this.alertCtrl =                  alertCtrl;
    this.modalCtrl =                  modalCtrl;
    this.navCtrl =                    navCtrl;
    this.actionSheetCtrl =            actionSheetCtrl;
    this.applianceService =           applianceService;
    this.platformService =            platformService;

    // Get appliance data by aid
    let appliance: any = this.applianceService.appliances.filter (
      (_appliance) => {
        return (_appliance.aid.indexOf(navParams.data) > -1);
      }
    );

    // Roll it out
    this.appliance =                  appliance[0];
    this.platforms =                  this.platformService.getHostPlatforms();

  }

  /*****************************************************************************
   * updateAppliance
   */

  public updateAppliance(): void {
    this.applianceService.updateD();
  }

  /*****************************************************************************
   * copyAppliance
   */

  public copyAppliance(aid: string): void {
    console.log('FIXME: Do something here like cloning ', aid);
  }

  /*****************************************************************************
   * deleteAppliance - Open an alert to verify and delete it when confirmed
   * @param
   */

  public deleteAppliance(aid: string, name: string): void {

    let confirm: any = this.alertCtrl.create({
      title: 'Please confirm',
      message: 'Do you really want to delete <br/><b>' + name + '</b>?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { /* */ },
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('FIXME: Do something here like deleting ', aid);
            this.navCtrl.pop();
          },
        },
      ],
    });

    confirm.present();

  }

  /*****************************************************************************
   * addPlugin - Open a Modal to add a new plugin to the appliance
   * @param
   */

  public addPlugin(aid: string, type: string): void {

    let addPluginModal: any = this.modalCtrl.create (
      AddPluginModal,
      {
        'aid': aid,
        'type': type,
      }
    );

    addPluginModal.onDidDismiss( (_data: any) => {
      if (_data) {
        // console.log('Post addpluginmodal data', _data);
      }
    });

    addPluginModal.present();

  }

  /*****************************************************************************
   * editPlugin - Open a Modal to edit the configuration of a plugin
   * @param
   */

  public editPlugin(aid: string, type: string, pidx: number): void {

    let editPluginModal: any = this.modalCtrl.create (
      EditPluginModal,
      {
        'aid': aid,
        'type': type,
        'pidx': pidx,
      }
    );

    editPluginModal.onDidDismiss( (_data) => {
      if (_data) {
        // console.log('Post editpluginmodal data', _data);
      }
    });

    editPluginModal.present();

  }

  /*****************************************************************************
   * applianceActions - Open actionsheet with general appliance actions
   * @param
   */

  public applianceActions(): void {
    let actionSheet: any = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Copy',
          icon: 'copy',
          handler: () => {
            this.copyAppliance(this.appliance.aid);
          },
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            this.deleteAppliance(this.appliance.aid, this.appliance.name);
          },
        },
        {
          text: 'Help',
          icon: 'help-buoy',
          handler: () => {
            console.log('FIXME: Help clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log('FIXME: Cancel clicked');
          },
        },
      ],
    });

    actionSheet.present();

  }

  /*****************************************************************************
   * setAppView
   * @param
   */

  public setAppView(view: string): void {
    this.view = view;
  }

  public tsNow(): number {
    return Math.round(new Date().getTime());
  }

}
