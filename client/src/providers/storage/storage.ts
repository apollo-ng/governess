'use strict';

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
   * @return Storage Object
   */

  public static initStorage(): Storage {
    return new Storage();
  }

  /*****************************************************************************
   * get
   * @param key: string
   * @return
   */

  public get(key: string): Promise<{}> {
    return this.storage.get(key);
  }

  /*****************************************************************************
   * set
   * @param key: string
   * @return
   */

  public set(key: string, value: string): Promise<{}> {
    return this.storage.set(key, value);
  }

  /*****************************************************************************
   * remove
   * @param key: string
   * @return
   */

  public remove(key: string): Promise<{}> {
    return this.storage.remove(key);
  }

}
