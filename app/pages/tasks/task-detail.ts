'use strict';

import {Component} from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: 'build/pages/tasks/task-detail.html',
})

export class TaskDetailPage {

  private nav: NavController;
  public navParams: NavParams;

  public task: any;

  constructor(

    nav: NavController,
    navParams: NavParams

  ) {

    this.nav = nav;
    this.navParams = navParams;
    this.task = this.navParams.data;

  }

}
