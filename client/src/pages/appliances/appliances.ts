import { Component }                from '@angular/core';
import { ActionSheetController,
         AlertController,
         ModalController,
         NavController,
         reorderArray }             from 'ionic-angular';

// Providers ///////////////////////////////////////////////////////////////////

import { ConfigService }            from '../../providers/config/config';
import { ApplianceService }         from '../../providers/appliances/appliances';
import { HashID }                   from '../../providers/crypto/hashid';

// Sub-Pages/Modals ////////////////////////////////////////////////////////////

import { ApplianceDetailPage }      from './appliance.detail';
import { AppliancesHelp }           from './appliances.help';

////////////////////////////////////////////////////////////////////////////////

@Component ({
  selector: 'appliances-page',
  templateUrl: 'appliances.html',
})

/*******************************************************************************
 *
 *   AppliancesPage
 *
 */

export class AppliancesPage {

  public appliances: any = [];
  public config: any = {};
  public filteredList: boolean = false;
  public isSending: boolean = false;

  public navCtrl: NavController;
  public modalCtrl: ModalController;
  public actionSheetCtrl: ActionSheetController;
  public alertCtrl: AlertController;
  public configService: ConfigService;
  public applianceService: ApplianceService;

  private hashID: HashID;

  /*****************************************************************************
   * constructor
   */

  constructor (

    navCtrl: NavController,
    modalCtrl: ModalController,
    actionSheetCtrl: ActionSheetController,
    alertCtrl: AlertController,
    configService: ConfigService,
    applianceService: ApplianceService,
    hashID: HashID,

  ) {

    this.navCtrl = navCtrl;
    this.modalCtrl = modalCtrl;
    this.actionSheetCtrl = actionSheetCtrl;
    this.alertCtrl = alertCtrl;
    this.configService = configService;
    this.applianceService = applianceService;
    this.hashID = hashID;

    this.configService.init().then( () => {
      this.config = this.configService.config;
      this.applianceService.init().then( () => {
        this.appliances = this.applianceService.appliances;
      });
    });

  }

  /*****************************************************************************
   * activateTask
   * @param
   */

  public activateAppliance(aid: string): void {
    console.log('Activate appliance:', aid);
    let constraintAlert: any = this.alertCtrl.create({
      title: 'constraintAlert!',
      subTitle: 'This Appliance cannot be activated since not all constraints are met',
      buttons: ['OK'],
    });
    constraintAlert.present();
    /*
    this.config.applianceActive = aid;
    this.configService.update(this.config);
    console.log(this.config);
    */
  }

  /*****************************************************************************
   * FIXME: addAppliance
   */

  public addAppliance(): void {
    // console.log('FIXME: Add a new empty appliance');
    // this.isSending = !this.isSending;
    this.applianceService.add();
    this.appliances = this.applianceService.appliances;
  }

  /*****************************************************************************
   * copyAppliance
   * @param
   */

  public copyAppliance(index: number): void {

    // FIXME: Crude hack to copy the array after lodash deepClone refused
    //        to work. Isn't there a better lightweight alternative?
    let copy: any = JSON.parse(JSON.stringify(this.appliances[index]));

    // create a fresh set of metadata for this copy
    copy.name = copy.name + ' Copy';
    copy.aid = this.hashID.create();
    copy.ctime = Math.round(new Date().getTime());

    this.appliances.push(copy);
    this.applianceService.updateD();

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
        { text: 'No', role: 'cancel', handler: () => { /* */ } },
        { text: 'Yes',
          handler: () => {
            this.applianceService.delete(index);
            this.appliances = this.applianceService.appliances;
          },
        },
      ],
    });
    confirm.present();
  }

  /*****************************************************************************
   * reorderAppliances
   * @param
   */

  public reorderAppliances(move: any): void {
    this.appliances = reorderArray(this.appliances, move);
    this.applianceService.update(this.appliances);
  }

  /*****************************************************************************
   * searchInput
   * @param
   */

  public filterAppliances(event: any): void {
    this.appliances = this.applianceService.appliances;
    let val: string = event.target.value;
    if (val && val.trim() !== '') {
      this.filteredList = true;
      this.appliances = this.appliances.filter((appliance) => {
        return (
          appliance.name.toLowerCase().
          indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  /*****************************************************************************
   * searchClear - Disengage Search Filter
   * @param
   */

  public clearFilter(event: any): void {
    this.appliances = this.applianceService.appliances;
    this.filteredList = false;
    event.stopPropagation();
  }

  /*****************************************************************************
   * goToApplianceDetail
   * @param
   */

  public goToApplianceDetail(appliance: any): void {
    this.navCtrl.push(ApplianceDetailPage, appliance);
  }

  /*****************************************************************************
   * openHelp
   */

  public openHelp(): void {
    let modal: any = this.modalCtrl.create(AppliancesHelp);
    modal.present(modal);
  }

}
