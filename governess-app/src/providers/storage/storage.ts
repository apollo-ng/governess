import { Injectable } from '@angular/core';
import { Storage }    from '@ionic/storage';

////////////////////////////////////////////////////////////////////////////////

@Injectable(

)

/*******************************************************************************
 *
 *   StorageService
 *
 */

export class StorageService {

  private storage: Storage;

  /*****************************************************************************
   * constructor
   */

  constructor() {
    this.storage = StorageService.initStorage();
  }

  /*****************************************************************************
   * initStorage
   * @param
   */

  public static initStorage(): Storage {
    console.log('Connecting to local storage...');
    return new Storage();
  }

  /*****************************************************************************
   * get
   * @param
   */

  public get(key: string): Promise<{}> {
    return this.storage.get(key);
  }

  /*****************************************************************************
   * set
   * @param
   */

  public set(key: string, value: string): Promise<{}> {
    return this.storage.set(key, value);
  }

  /*****************************************************************************
   * remove
   * @param
   */

  public remove(key: string): Promise<{}> {
    return this.storage.remove(key);
  }

}
