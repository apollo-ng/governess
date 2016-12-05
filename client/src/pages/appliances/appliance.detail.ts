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
    let alert: any = this.alertCtrl.create();
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

  public popAddPluginModal(aid: string, type: string): void {
    let addPluginModal: any = this.modalCtrl.create ( AddPluginModal, {
      'aid': aid,
      'type': type,
    });
    addPluginModal.present();
  }

  public popEditPluginModal(aid: string, type: string, pidx: number): void {
    let editPluginModal: any = this.modalCtrl.create ( EditPluginModal, {
      'aid': aid,
      'type': type,
      'pidx': pidx,
    });
    editPluginModal.present();
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
  public groupFilter: string = 'All';
  public type: string;
  public aid: string;

  public viewCtrl: ViewController;
  public pluginService: PluginService;
  public applianceService: ApplianceService;
  public params: NavParams;

  constructor(

    viewCtrl: ViewController,
    pluginService: PluginService,
    applianceService: ApplianceService,
    params: NavParams

  ) {

    this.viewCtrl = viewCtrl;
    this.pluginService = pluginService;
    this.applianceService = applianceService;
    this.type = params.get('type');
    this.aid = params.get('aid');
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

/*******************************************************************************
 *
 *     EditPluginModal
 *
 */

@Component({
  selector: 'appliance-detail-editplugin',
  templateUrl: 'appliance.detail.editplugin.html',
})

////////////////////////////////////////////////////////////////////////////////

export class EditPluginModal {

  public viewCtrl: ViewController;
  public applianceService: ApplianceService;
  public params: NavParams;
  public plugin: any;
  public type: string;
  public aid: string;
  public pidx: number;

  constructor(

    viewCtrl: ViewController,
    applianceService: ApplianceService,
    params: NavParams

  ) {

    this.viewCtrl = viewCtrl;
    this.applianceService = applianceService;
    this.type = params.get('type');
    this.aid = params.get('aid');
    this.pidx = params.get('pidx');

    // Find the designated appliance for this plugin
    let appliance: any = this.applianceService.appliances.filter((_appliance) => {
      return (_appliance.aid.indexOf(this.aid) > -1);
    });

    // Roll it out
    this.plugin = appliance[0].plugins[this.type][this.pidx];

  }

  public removePlugin(aid: string, type: string, pidx: any): void {
    this.applianceService.removePlugin(aid, type, pidx);
    this.dismissModal();
  }

  public dismissModal(): void {
    this.viewCtrl.dismiss();
  }

}
