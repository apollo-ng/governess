import { Injectable }             from '@angular/core';
import { Storage }                from '@ionic/storage';
import { Events,
         ToastController }        from 'ionic-angular';
import { HashID }                 from '../crypto/hashid';
import { applianceMock }          from './appliance.mock';

////////////////////////////////////////////////////////////////////////////////

@Injectable (

)

/*******************************************************************************
 *
 *   ApplianceService
 *
 */

export class ApplianceService {

  public appliances: any = [];
  public events: Events;
  public toastCtrl: ToastController;

  private storage: Storage;
  private hashID: HashID;

  /*****************************************************************************
   * constructor
   */

  constructor (

    events: Events,
    storage: Storage,
    hashID: HashID,
    toastCtrl: ToastController,

  ) {

    this.events = events;
    this.storage = storage;
    this.toastCtrl = toastCtrl;
    this.hashID = hashID;
    this.storage.ready().then( () => {
      this.init();
    });

  }

  /*****************************************************************************
   * init
   */

  public init(): any {

    // FIXME: Pull & update latest appliances list via websocket from server

    return this.storage.get('appliances').then( (_appliances: string) => {
      if (!_appliances || _appliances.trim().length === 0) {
        // If no local tasks are available (i.e. test/offline), init from Mock
        this.initFromMock();
      } else {
        this.appliances = JSON.parse(_appliances);
      }
    });

  }

  /*****************************************************************************
   * copy
   * @param
   */

  public copy(index: number): void {

    // crude hack to copy the array after lodash deepClone refused to work
    let copy: any = JSON.parse(JSON.stringify(this.appliances[index]));

    // create a fresh set of metadata for this copy
    copy.name = copy.name + ' Copy';
    copy.aid = this.hashID.create();
    copy.ctime = Math.round(new Date().getTime());

    // roll it out
    this.appliances.push(copy);
    this.updateD();
  }

  /*****************************************************************************
   * add
   */

  public add(): any {

    // crude hack to copy the array after lodash deepClone refused to work
    let _appliance: any = JSON.parse(JSON.stringify(applianceMock[0]));

    // create a fresh set of metadata for this copy
    _appliance.name = 'New Appliance';
    _appliance.desc = '';
    _appliance.aid = this.hashID.create();
    _appliance.ctime = Math.round(new Date().getTime());

    // roll it out
    this.appliances.push(_appliance);
    this.updateD();

  }

  /*****************************************************************************
   * delete
   * @param
   */

  public delete(index: number): void {
    this.appliances.splice(index, 1);
    this.updateD();
  }

  /*****************************************************************************
   * update
   * @param
   */

  public update(appliances: Object): any {
    this.appliances = appliances;
    this.write(this.appliances);
  }

  /*****************************************************************************
   * updateD
   */

  public updateD(): void {
    this.write(this.appliances);
    this.events.publish('applianceUpdated');
  }

  /*****************************************************************************
   * addPlugin
   */

  public addPlugin(aid: string, type: string, plugin: any): void {

    // Find the designated appliance for this plugin
    let appliance: any = this.appliances.filter((_appliance) => {
      return (_appliance.aid.indexOf(aid) > -1);
    });

    // Roll it out
    appliance[0].plugins[type].push(plugin);
    this.updateD();

    // Give feedback to user
    let msg: string = 'Plugin ' + plugin.name + ' added to ' + appliance[0].name;
    let toast: any = this.toastCtrl.create({ message: msg, duration: 3000 });
    toast.present();
  }

  /*****************************************************************************
   * removePlugin
   */

  public removePlugin(aid: string, type: string, pidx: any): void {

    // Find the designated appliance for this plugin
    let appliance: any = this.appliances.filter( (_appliance) => {
      return (_appliance.aid.indexOf(aid) > -1);
    });

    // Roll it out
    appliance[0].plugins[type].splice(pidx, 1);
    this.updateD();

  }

  /*****************************************************************************
   * reset
   */

  public reset(): void {
    this.write(applianceMock);
  }

  /*****************************************************************************
   * initFromMock
   */

  private initFromMock(): void {
    let initAppliance: any = applianceMock;
    initAppliance.id = this.hashID.create();
    initAppliance.ctime = Math.round(new Date().getTime());
    this.write(initAppliance);
    this.appliances = initAppliance;
  }

  /*****************************************************************************
   * write
   * @param
   */

  private write(appliances: Object): void {
    this.storage.set('appliances', JSON.stringify(appliances));
  }

}
