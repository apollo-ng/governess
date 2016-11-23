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

    this.alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.idSize = 12;

  }

  /*****************************************************************************
   * new - returns a new shortid
   * FIXME: Make this crypto more reliable by using WebCrypto API when available
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
