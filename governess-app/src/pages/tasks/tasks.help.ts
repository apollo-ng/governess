import { Component }      from '@angular/core';
import { ViewController } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'tasks.help.html',
})

/*******************************************************************************
 *
 *   TasksHelp
 *
 */

export class TasksHelp {

  public viewCtrl: ViewController;

  constructor(
    viewCtrl: ViewController
  ) {

    this.viewCtrl = viewCtrl;

  }

  public dismissModal(): void {
    this.viewCtrl.dismiss();
  }

}
