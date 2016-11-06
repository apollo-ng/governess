import { Component }                from '@angular/core';
import { NavParams,
         NavController,
         AlertController,
         ModalController,
         PopoverController,
         ActionSheetController }    from 'ionic-angular';

import { ApplianceService }         from '../../providers/appliance/appliance';
import { TimeformatSelector }       from '../../components/timeformat-selector';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'appliance-detail-page',
  templateUrl: 'appliance.detail.html',
})

/*******************************************************************************
 *
 *     ApplianceDetailPage
 *
 */

export class ApplianceDetailPage {

  public appliance: any;
  public data: any;

  public alertCtrl: AlertController;
  public modalCtrl: ModalController;
  public navCtrl: NavController;
  public popoverCtrl: PopoverController;
  public actionSheetCtrl: ActionSheetController;
  public navParams: NavParams;
  public applianceService: ApplianceService;

  constructor(

    alertCtrl: AlertController,
    modalCtrl: ModalController,
    navCtrl: NavController,
    popoverCtrl: PopoverController,
    actionSheetCtrl: ActionSheetController,
    navParams: NavParams,
    applianceService: ApplianceService,

  ) {

    this.alertCtrl = alertCtrl;
    this.modalCtrl = modalCtrl;
    this.navCtrl = navCtrl;
    this.popoverCtrl = popoverCtrl;
    this.actionSheetCtrl = actionSheetCtrl;
    this.navParams = navParams;
    this.applianceService = applianceService;

    this.appliance = this.navParams.data;
    this.data = this.appliance.data;
    console.log('appliancedetail init coming up with:', this.appliance);

  }
/*
  public taskActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'More Task options',
      buttons: [
        {
          text: 'Rename',
          icon: 'create',
          handler: () => {
           console.log('Rename clicked');
           this.renameTask(this.task);
          }
        },
        {
          text: 'Constraint',
          icon: 'flash',
          handler: () => {
           console.log('Constraint clicked');
           this.constraintTask(this.task);
          }
        },
        {
          text: 'Clone',
          icon: 'copy',
          handler: () => {
           console.log('FIXME: Clone clicked');
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
           console.log('FIXME: Delete clicked');
          }
        },
        {
          text: 'Help',
          icon: 'buoy',
          handler: () => {
           console.log('FIXME: Help clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
           console.log('FIXME: Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
*/
  /*****************************************************************************
   * renameAppliance
   * @param {event} appliance
   */

  public renameAppliance(appliance: any): void {
    let alert: any =  this.alertCtrl.create();
    alert.setTitle('Name of this Appliance');
    alert.addInput({ type: 'text', name: 'appName', value: appliance.name });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Save',
      handler: data => {
        if (data !== undefined) {
          console.log(data);
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
   * presentPopover
   * @param
   */

  public presentPopover(myEvent: any): void {
    let popover: any = this.popoverCtrl.create(TimeformatSelector);
    popover.present({
      ev: myEvent,
    });
  }

  /*****************************************************************************
   * editInputPlug
   * @param
   */

  public editInputPlug(modid: any, plugid: any): any {
    console.log('Edit Input-Plug:' + modid + plugid);
//    let modal: any = this.modalCtrl.create(ModalsContentPage);
//    modal.present(modal);
  }

  /*****************************************************************************
   * editOutputPlug
   * @param
   */

  public editOutputPlug(modid: any, plugid: any): any {
    console.log('Edit Output-Plug:' + modid + plugid);
  }

}
