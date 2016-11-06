import { Component }                from '@angular/core';
import { ActionSheetController,
         AlertController,
         ModalController,
         NavController,
         reorderArray }             from 'ionic-angular';

import { ConfigService }            from '../../providers/config/config';
import { ApplianceService }         from '../../providers/appliance/appliance';
import { ApplianceDetailPage }      from '../appliance/appliance.detail';

////////////////////////////////////////////////////////////////////////////////

@Component ({
  selector: 'appliance-page',
  templateUrl: 'appliance.html',
})

/*******************************************************************************
 *
 *   AppliancePage
 *
 */

export class AppliancePage {

  public appliances: any = [];
  public config: any = {};

  public navCtrl: NavController;
  public modalCtrl: ModalController;
  public actionSheetCtrl: ActionSheetController;
  public alertCtrl: AlertController;
  public configService: ConfigService;
  public applianceService: ApplianceService;

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

  ) {

    this.navCtrl = navCtrl;
    this.modalCtrl = modalCtrl;
    this.actionSheetCtrl = actionSheetCtrl;
    this.alertCtrl = alertCtrl;
    this.configService = configService;
    this.applianceService = applianceService;

    this.initConfig().then(() => {
      this.applianceService.pull();
      this.appliances = this.applianceService.appliances;
    });

  }

  /*****************************************************************************
   * initConfig
   * @return
   */

  public initConfig(): Promise<void> {
    return this.configService.get().then((data: string) => {
      // console.log('settings ngoninit configdata', data);
      this.config = JSON.parse(data);
      // console.log(this.config);
    });
  }

  /*****************************************************************************
   * goToApplianceDetail
   * @param
   */

  public goToApplianceDetail(appliance: any): void {
    console.log('Go to appliance detail:', appliance);
    this.navCtrl.push(ApplianceDetailPage, appliance);
  }

  /*****************************************************************************
   * FIXME: addAppliance
   */

  public addAppliance(): void {
    console.log('FIXME: Add a new empty appliance');
  }

  /*****************************************************************************
   * copyAppliance
   * @param
   */

  public copyAppliance(index: number): void {
    console.log('Duplicate Appliance:', index);
    this.applianceService.copy(index);
    this.appliances = this.applianceService.appliances;
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

  public searchInput(event: any): void {
    this.appliances = this.applianceService.appliances;
    let val: string = event.target.value;
    if (val && val.trim() !== '') {
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

  public searchClear(event: any): void {
    this.appliances = this.applianceService.appliances;
    event.stopPropagation();
  }

  /*****************************************************************************
   * openHelp
   */

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  }

}
