
import { Injectable }             from '@angular/core';
import { hostPlatforms }          from './platforms.mock';

////////////////////////////////////////////////////////////////////////////////

@Injectable (

)

/*******************************************************************************
 *
 *   PlatformService
 *
 */

export class PlatformService {

  public platforms: any = [];

  /*****************************************************************************
   * constructor
   */

  constructor (

  ) {

    this.platforms = hostPlatforms;

  }

  public get(): any {
    return this.platforms;
  }

  /*****************************************************************************
   * getHostPlatforms
   */

  public getHostPlatforms(): any {
    return this.platforms;
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
    let platform: any = this.platforms.filter((_platform) => {
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
    let platform: any = this.platforms.filter((_platform) => {
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

}
