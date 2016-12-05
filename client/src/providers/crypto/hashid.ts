import { Injectable } from '@angular/core';

////////////////////////////////////////////////////////////////////////////////

@Injectable(

)

/*******************************************************************************
 *
 *   HashID
 *   +--> Based on https://github.com/AndyMeps/ng2-hashids
 *        +--> Based on https://github.com/ivanakimov/hashids.js
 */

export class HashID {

  private seps: string;
  private minLength: number;
  private salt: string;
  private alphabet: string;
  private guards: string;

  /*****************************************************************************
   * constructor
   */

  constructor(

  ) {

    const salt: string = 'governess';
    const minLength: number = 12;
    const alphabet: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const minAlphabetLength: number = 56;
    const sepDiv: number = 3.5;
    const guardDiv: number = 12;
    const errorAlphabetLength: string = 'error: alphabet must contain at least X unique characters';
    const errorAlphabetSpace: string = 'error: alphabet cannot contain spaces';

    let uniqueAlphabet: string = '';
    let sepsLength: number;
    let diff: number;

    // Try to avoid generating most common English curse words by generating
    // ids that never have the following letters next to each other:
    this.seps = 'cfhistuCFHISTU';

    this.minLength = parseInt(minLength.toString(), 10) > 0 ? minLength : 0;
    this.salt = (typeof salt === 'string') ? salt : '';

    if (typeof alphabet === 'string') {
      this.alphabet = alphabet;
    }

    for (let i: number = 0; i !== this.alphabet.length; i++) {
      if (uniqueAlphabet.indexOf(this.alphabet.charAt(i)) === -1) {
        uniqueAlphabet += this.alphabet.charAt(i);
      }
    }

    this.alphabet = uniqueAlphabet;

    if (this.alphabet.length < minAlphabetLength) {
      throw errorAlphabetLength.replace('X', minAlphabetLength.toString());
    }

    if (this.alphabet.search(' ') !== -1) {
      throw errorAlphabetSpace;
    }

    for (let i: number = 0; i !== this.seps.length; i++) {

      const j: number = this.alphabet.indexOf(this.seps.charAt(i));

      if (j === -1) {
        this.seps = this.seps.substr(0, i) + ' ' + this.seps.substr(i + 1);
      } else {
        this.alphabet = this.alphabet.substr(0, j) + ' ' + this.alphabet.substr(j + 1);
      }

    }

    this.alphabet = this.alphabet.replace(/ /g, '');
    this.seps = this.seps.replace(/ /g, '');
    this.seps = this._shuffle(this.seps, this.salt);

    if (!this.seps.length || (this.alphabet.length / this.seps.length) > sepDiv) {

      sepsLength = Math.ceil(this.alphabet.length / sepDiv);

      if (sepsLength > this.seps.length) {

        diff = sepsLength - this.seps.length;
        this.seps += this.alphabet.substr(0, diff);
        this.alphabet = this.alphabet.substr(diff);

      }

    }

    this.alphabet = this._shuffle(this.alphabet, this.salt);
    const guardCount: number = Math.ceil(this.alphabet.length / guardDiv);

    if (this.alphabet.length < 3) {
      this.guards = this.seps.substr(0, guardCount);
      this.seps = this.seps.substr(guardCount);
    } else {
      this.guards = this.alphabet.substr(0, guardCount);
      this.alphabet = this.alphabet.substr(guardCount);
    }

  }

  /*****************************************************************************
   * create
   */

  public create(): string {
    return this.encode(Date.now());
  }

  /*****************************************************************************
   * encode
   */

  public encode(...numbers: any[]): any {

    const ret: string = '';

    if (!numbers.length) {
      return ret;
    }

    if (numbers[0] && numbers[0].constructor === Array) {
      numbers = numbers[0];
      if (!numbers.length) {
        return ret;
      }
    }

    for (let i: number = 0; i !== numbers.length; i++) {
      numbers[i] = parseInt(numbers[i], 10);
      if (numbers[i] >= 0) {
        continue;
      } else {
        return ret;
      }
    }

    return this._encode(numbers);

  }

  /*****************************************************************************
   * _encode
   */

  private _encode(numbers: number[]): string {

    let ret: any,
        alphabet: string = this.alphabet,
        numbersIdInt: number = 0;

    for (let i: number = 0; i !== numbers.length; i++) {
      numbersIdInt += (numbers[i] % (i + 100));
    }

    ret = alphabet.charAt(numbersIdInt % alphabet.length);
    const lottery: any = ret;

    for (let i: number = 0; i !== numbers.length; i++) {

      let num: any = numbers[i];
      const buffer: any = lottery + this.salt + alphabet;
      alphabet = this._shuffle(alphabet, buffer.substr(0, alphabet.length));
      const last: any = this._toAlphabet(num, alphabet);
      ret += last;

      if (i + 1 < numbers.length) {
        num %= (last.charCodeAt(0) + i);
        const sepsIndex: any = num % this.seps.length;
        ret += this.seps.charAt(sepsIndex);
      }

    }

    if (ret.length < this.minLength) {

      let guardIndex: any = (numbersIdInt + ret[0].charCodeAt(0)) % this.guards.length;
      let guard: any = this.guards[guardIndex];
      ret = guard + ret;

      if (ret.length < this.minLength) {
        guardIndex = (numbersIdInt + ret[2].charCodeAt(0)) % this.guards.length;
        guard = this.guards[guardIndex];
        ret += guard;
      }

    }

    const halfLength: number = parseInt((alphabet.length / 2).toString(), 10);

    while (ret.length < this.minLength) {

      alphabet = this._shuffle(alphabet, alphabet);
      ret = alphabet.substr(halfLength) + ret + alphabet.substr(0, halfLength);
      const excess: number = ret.length - this.minLength;

      if (excess > 0) {
        ret = ret.substr(excess / 2, this.minLength);
      }

    }

    return ret;

  }

  /*****************************************************************************
   * _shuffle
   */

  private _shuffle(alphabet: string, salt: string): string {

    let integer: number;

    if (!salt.length) {
      return alphabet;
    }

    for (let i: number = alphabet.length - 1, v: number = 0, p: number = 0, j: number = 0; i > 0; i--, v++) {
      v %= salt.length;
      p += integer = salt.charAt(v).charCodeAt(0);
      j = (integer + v + p) % i;
      const tmp: any = alphabet[j];
      alphabet = alphabet.substr(0, j) + alphabet.charAt(i) + alphabet.substr(j + 1);
      alphabet = alphabet.substr(0, i) + tmp + alphabet.substr(i + 1);
    }

    return alphabet;

  }

  /*****************************************************************************
   * _toAlphabet
   */

  private _toAlphabet(input: any, alphabet: any): string {

    let id: string = '';

    do {
      id = alphabet.charAt(input % alphabet.length) + id;
      input = parseInt((input / alphabet.length).toString(), 10);
    } while (input);

    return id;

  }

}
