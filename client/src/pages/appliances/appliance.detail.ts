import { Component }                from '@angular/core';
import { NavParams,
         NavController,
         ViewController,
         AlertController,
         ModalController,
         PopoverController,
         ActionSheetController }    from 'ionic-angular';

import { ApplianceService }         from '../../providers/appliances/appliances';
import { PluginService }            from '../../providers/plugins/plugins';

/*******************************************************************************
 *
 *     ApplianceDetailPage
 *
 */

@Component({
  selector: 'appliance-detail-page',
  templateUrl: 'appliance.detail.html',
})

////////////////////////////////////////////////////////////////////////////////

export class ApplianceDetailPage {

  public appliance: any;
  public data: any;
  public view: string = 'settings';

  public alertCtrl: AlertController;
  public modalCtrl: ModalController;
  public navCtrl: NavController;
  public popoverCtrl: PopoverController;
  public actionSheetCtrl: ActionSheetController;
  public navParams: NavParams;
  public applianceService: ApplianceService;
  public pluginService: PluginService;

  constructor(

    alertCtrl: AlertController,
    modalCtrl: ModalController,
    navCtrl: NavController,
    popoverCtrl: PopoverController,
    actionSheetCtrl: ActionSheetController,
    navParams: NavParams,
    applianceService: ApplianceService,
    pluginService: PluginService,

  ) {

    this.alertCtrl = alertCtrl;
    this.modalCtrl = modalCtrl;
    this.navCtrl = navCtrl;
    this.popoverCtrl = popoverCtrl;
    this.actionSheetCtrl = actionSheetCtrl;
    this.navParams = navParams;
    this.applianceService = applianceService;
    this.pluginService = pluginService;

    this.appliance = this.navParams.data;
    this.data = this.appliance.data;
    console.log('appliancedetail init coming up with:', this.appliance);

  }

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

  public popAddPluginModal(type: string): void {
    let addPluginModal: any = this.modalCtrl.create (
      AddPluginModal,
      { 'type': type }
    );
    addPluginModal.present();
  }

  public setAppView(_view: string): void {
    this.view = _view;
  }

}

/*******************************************************************************
 *
 *     AddPluginModal
 *
 */

@Component({
  selector: 'appliance-detail-addplugin',
  templateUrl: 'appliance.detail.addplugin.html',
})

////////////////////////////////////////////////////////////////////////////////

export class AddPluginModal {

  public plugins: any;
  public groups: any;
  public nameFilter: boolean = false;
  public groupFilter: string = "All";
  public type: string;

  constructor(

    public viewCtrl: ViewController,
    public pluginService: PluginService,
    public params: NavParams

  ) {

    this.pluginService = pluginService;
    this.type = params.get('type');
    this.plugins = this.pluginService.plugins[this.type];
    this.groups = pluginService.getDistinctGroups(this.type);

  }

  public dismissModal(): void {
    this.viewCtrl.dismiss();
  }

  /*****************************************************************************
   * filterPluginsByName
   * @param
   */

  public filterPluginsByName(event: any): void {
    this.plugins = this.pluginService.plugins[this.type];
    let val: string = event.target.value;
    if (val && val.trim() !== '') {
      this.nameFilter = true;
      this.plugins = this.plugins.filter((plugin) => {
        return (
          plugin.name.toLowerCase().
          indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }

  /*****************************************************************************
   * filterPluginsByGroup
   */

  public filterPluginsByGroup(): void {
    this.plugins = this.pluginService.plugins[this.type];
    if (this.groupFilter !== 'All') {
      this.plugins = this.plugins.filter((plugin) => {
        return (plugin.group.indexOf(this.groupFilter) > -1);
      });
    }
  }

  /*****************************************************************************
   * clearNameFilter - Disengage Search Filter
   * @param
   */

  public clearNameFilter(event: any): void {
    this.plugins = this.pluginService.plugins[this.type];
    this.nameFilter = false;
    event.stopPropagation();
  }

}
