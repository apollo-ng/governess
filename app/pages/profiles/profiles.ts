'use strict';

import {NavController, Page} from 'ionic-angular';

/**
 * @ngdoc function
 * @name governess.controller:listProfiles
 * @description
 * # listProfiles
 */

@Page({
  templateUrl: 'build/pages/profiles/profiles.html'
})

export class ProfilesPage {

  public nav: NavController;
  private searchQuery: string;
  private profiles: any;

  constructor(nav: NavController) {
    this.nav = nav;
    this.searchQuery = '';

    this.profiles = [{
      'id': '123',
      'dev-id': 'xyz',
      'name': 'Reflow Lead-Free',
      'icon': '',
      'created': Math.round(new Date().getTime()/1000),
      'notes': '',
      'type': 'profile',
      'data': [{
          'control': 'Temperature',
          'active': true,
          'show': true,
          'options': {
              'axis': 0,
              'color': '#CA8512',
              'drawPoints': true,
              'pointSize': 4,
              'strokeWidth': 2
          },
          'points': [
              [0, 25],
              [82, 151],
              [162, 185],
              [197, 225],
              [202, 225],
              [233, 175],
              [300, 50]
          ]
      }, {
          'control': 'Circulator',
          'active': true,
          'show': true,
          'options': {
              'axis': 1,
              'color': '#614FCA',
              'drawPoints': false,
              'pointSize': 4,
              'strokeWidth': 1,
              'stepPlot': true
          },
          'points': [
              [0, 1],
              [180, 0],
              [215, 1],
              [300, 0]
          ]
      }]
      }
    ];

  }

}
