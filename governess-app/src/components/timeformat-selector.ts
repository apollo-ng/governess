import { Component, Injectable } from '@angular/core';
import { ViewController }    from 'ionic-angular';

////////////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'timeformat-selector.html',
})

/*******************************************************************************
 *
 *   TimeformatSelector
 *
 */

export class TimeformatSelector {

  public timeFormat: any;
  public viewCtrl: ViewController;

  /*****************************************************************************
   * constructor
   */

  constructor(
    viewCtrl: ViewController
  ) {
    this.viewCtrl = viewCtrl;
    this.timeFormat = '';
  }

  public dismissPopover(): void {
    this.viewCtrl.dismiss();
  }

}
