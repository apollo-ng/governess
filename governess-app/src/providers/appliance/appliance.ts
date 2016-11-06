import { Injectable }             from '@angular/core';
import { UUID }                   from 'angular2-uuid';
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

  /*****************************************************************************
   * constructor
   */

  constructor (

    storage: StorageService

  ) {

    this.storage = storage;
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
    copy.aid = UUID.UUID();
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
