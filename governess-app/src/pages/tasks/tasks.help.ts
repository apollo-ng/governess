////////////////////////////////////////////////////////////////////////
// Help
////////////////////////////////////////////////////////////////////////

import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'tasks.help.html',
})

export class TasksHelp {

  public viewCtrl: ViewController;

  constructor( viewCtrl: ViewController ) {
    this.viewCtrl = viewCtrl;
  }

  private dismissModal(): void {
    this.viewCtrl.dismiss();
  }
}
