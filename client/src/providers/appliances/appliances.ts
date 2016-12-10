import { Injectable }             from '@angular/core';
import { ToastController }        from 'ionic-angular';
import { HashID }                 from '../crypto/hashid';
import { StorageService }         from '../storage/storage';
import { applianceMock }          from './appliance.mock';
import { hostPlatforms }          from './platforms';

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
  public storage: StorageService;
  public toastCtrl: ToastController;
  private hashID: HashID;

  /*****************************************************************************
   * constructor
   */

  constructor (

    storage: StorageService,
    toastCtrl: ToastController,
    hashID: HashID,

  ) {

    this.storage = storage;
    this.toastCtrl = toastCtrl;
    this.hashID = hashID;
    this.init().then(data => {
      this.appliances = data;
    });

  }

  /*****************************************************************************
   * init
   * @return {Appliance} Object Promise
   */

  private init(): Promise<{}> {
    console.log('Initializing Appliance Service');

    return this.storage.get('appliances').then((data: string) => {
      if (!data) {
        console.log('Got NO Storage Data - creating from Mock:');
        let initAppliance: any = applianceMock;
        this.write(initAppliance);
        this.appliances = initAppliance;
        return initAppliance;
      }
      // console.log('Got Storage Data:', data);
      this.appliances = JSON.parse(data);
      return JSON.parse(data);
    });
  }

  /*****************************************************************************
   * get
   * @return
   */

  public get(): Promise<{}> {
    return this.storage.get('appliances');
  }

  /*****************************************************************************
   * pull
   */

  public pull(): any {
    this.get().then((data: string) => {
      this.appliances = JSON.parse(data);
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
    copy.created = Math.round(new Date().getTime());

    // roll it out
    this.appliances.push(copy);
    this.updateD();
  }

  /*****************************************************************************
   * pull
   */

  public add(): any {

    // crude hack to copy the array after lodash deepClone refused to work
    let _appliance: any = JSON.parse(JSON.stringify(applianceMock[0]));

    // create a fresh set of metadata for this copy
    _appliance.name = 'New Appliance';
    _appliance.desc = '';
    _appliance.aid = this.hashID.create();
    _appliance.created = Math.round(new Date().getTime());

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
    console.log('Updating appliances...');
    this.appliances = appliances;
    this.write(this.appliances);
  }

  /*****************************************************************************
   * updateD
   */

  public updateD(): void {
    console.log('Updating appliances...');
    this.write(this.appliances);
  }

  /*****************************************************************************
   * getHostPlatforms
   */

  public getHostPlatforms(): any {
    return hostPlatforms;
  }

  /*****************************************************************************
   * getHostHeaders
   */

  public getHostHeaders(hid: string): any {

    // FIXME: There must be a better way to get this data with ng2/map tools.
    //        Couldn't figure it out, so this crude loop does it for now.
    // console.log('HID:', hid);
    let combined: any = [];

    // Query platform data with hid
    let platform: any = hostPlatforms.filter((_platform) => {
      return (_platform.hid.indexOf(hid) > -1);
    });

    for (let header of platform[0].headers) {
      combined.push(header);
    }

    return combined;

  }

  /*****************************************************************************
   * getHostGPIOs
   */

  public getHostGPIOs(hid: string): any {

    // FIXME: There must be a better way to get this data with ng2/map tools.
    //        Couldn't figure it out, so this crude loop does it for now.
    console.log('HID:', hid);
    let combined: any = [];

    // Query platform data with hid
    let platform: any = hostPlatforms.filter((_platform) => {
      return (_platform.hid.indexOf(hid) > -1);
    });

    // Assemble all pins from all available headers in one array
    for (let header of platform[0].headers) {
      for (let pin of header.pins) {
        // Isolate only GPIOs
        if (pin.GRP === 'GPIO') {
          combined.push(pin);
        }
      }
    }

    // FIXME: Remove already assigned pins from this list

    return combined;

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
    let appliance: any = this.appliances.filter((_appliance) => {
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
    console.log('Resetting appliances...');
    this.write(applianceMock);
  }

  /*****************************************************************************
   * write
   * @param
   */

  private write(appliances: Object): void {
    console.log('Writing Appliances to LocalStorage', appliances);
    this.storage.set('appliances', JSON.stringify(appliances));
  }

}
