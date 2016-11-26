import { Injectable } from '@angular/core';

////////////////////////////////////////////////////////////////////////////////

@Injectable(

)

/*******************************************************************************
 *
 *   ShortID
 *
 */

export class ShortID {

  private alphabet: string;
  private idSize: number;

  /*****************************************************************************
   * constructor
   */

  constructor() {

    this.idSize   = 12;
    this.alphabet = '0123456789'
                  + 'abcdefghijklmnopqrstuvwxyz'
                  + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  }

  /*****************************************************************************
   * create - returns a new shortid
   * FIXME: Reduce collision risk by using WebCrypto API when available
   * @param: size: number (optional)
   * @return id: string
   */

  public create(size: number = this.idSize): string {
    let chars: string = this.alphabet;
    let id: string = '';
    for (let i: number = 0; i < size; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    console.log(id);
    return id;
  }

}
