import { Injectable }             from '@angular/core';
import { ShortID }                from '../crypto/shortid';
import { StorageService }         from '../storage/storage';
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
  public storage: StorageService;
  private shortID: ShortID;

  /*****************************************************************************
   * constructor
   */

  constructor (

    storage: StorageService,
    shortID: ShortID

  ) {

    this.storage = storage;
    this.shortID = shortID;
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
    copy.aid = this.shortID.create();
    copy.created = Math.round(new Date().getTime());

    // roll it out
    this.appliances.push(copy);
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
    this.write(appliances);
  }

  /*****************************************************************************
   * updateD
   */

  public updateD(): void {
    console.log('Updating appliances...');
    this.write(this.appliances);
  }

  /*****************************************************************************
   * addPlugin
   */

  public addPlugin(aid: string, type: string, plugin: any): void {
    console.log('Add new plugin to appliance', aid, type, plugin);
    let appliance = this.appliances.filter((appliance) => {
      return (appliance.aid.indexOf(aid) > -1);
    });
    //appliance.plugins[type].push(plugin);
    console.log(appliance);
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
