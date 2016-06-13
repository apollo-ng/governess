'use strict';

import {NavController, Page} from 'ionic-angular';

/*
  Generated class for the AppliancePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Page({
  templateUrl: 'build/pages/appliance/appliance.html',
})

export class AppliancePage {

  public nav: NavController;
  private appliance: Object;

  constructor(nav: NavController) {
    this.nav = nav;
    this.appliance = {

      'name': 'Reflow-Oven',
      'desc': 'A full Reflow-Oven Implementation',
      'modules': [
        {
          'name': 'PID Temperature Governor',
          'icon': 'thermometer',
          'control': {
            'name': 'PID Temp Full',
            'icon': 'thermometer',
            'driver': 'drv/ctrl-pid-temp',
            'inputs': [
              {
                'type': 'float',
                'unit': '°C',
              },
            ],
            'outputs': [
              {
                'type': 'binary',
              },
              {
                'type': 'binary',
              },
            ],
            'conf': [
              {
                'name': 'Max tRun',
                'val': '300s',
              },
              {
                'name': 'Max °C',
                'val': '250',
              },
              {
                'name': 'Min °C',
                'val': '0',
              },
              {
                'name': 'Kp',
                'val': '30.2',
              },
              {
                'name': 'Ki',
                'val': '0.77',
              },
              {
                'name': 'Kd',
                'val': '30.2',
              },
            ],
          },
          'inputs': [
            {
              'name': 'K-Type Probe',
              'color': '#c70000',
              'icon': 'thermometer',
              'type': 'float',
              'driver': 'drv/input-MAX31855',
            },
          ],
          'outputs': [
            {
              'name': 'Heater AC-SSR',
              'color': 'rgba(255, 153, 0, 0.7)',
              'icon': 'flame',
              'type': 'binary',
              'driver': 'drv/input-gpio',
              'conf': [
                {
                  'name': 'PinIO',
                  'val': '27',
                },
              ],
            },
            {
              'name': 'Cooler AC-SSR',
              'color': '#0000c7',
              'icon': 'snow',
              'type': 'binary',
              'driver': 'drv/output-gpio',
              'conf': [
                {
                  'name': 'PinIO',
                  'val': '23',
                },
              ],
            },
          ],
        },
        {
          'name': 'Circulator',
          'icon': 'nuclear',
          'control': {
            'name': 'OnOff',
            'icon': 'power',
            'driver': 'drv/ctrl-onoff',
            'inputs': [],
            'outputs': [
              {
                'type': 'binary',
              },
            ],
            'conf': [
              {
                'name': 'Max tRun',
                'val': '300s',
              },
            ],
          },
          'outputs': [
            {
              'name': 'SSR-Circulator',
              'color': 'purple',
              'icon': 'nuclear',
              'type': 'binary',
              'driver': 'drv/gpio-out',
              'conf': [
                {
                  'name': 'PinIO',
                  'val': '23',
                },
              ],
            },
          ],
        },
        {
          'name': 'Door',
          'icon': 'exit',
          'control': {
            'name': 'Trigger',
            'icon': 'flash',
            'driver': 'drv/ctrl-trigger',
            'inputs': [
              {
                'type': 'Interrupt',
              },
            ],
            'outputs': [{}],
            'conf': [
              {
                'name': 'Action',
                'val': 'TBD',
              },
            ],
          },
          'inputs': [
            {
              'name': 'Door-Sensor',
              'color': 'yellow',
              'icon': 'alert',
              'type': 'Interrupt',
              'driver': 'drv/gpio-in',
              'conf': [
                {
                  'name': 'PinIO',
                  'val': '21',
                },
              ],
            },
          ],
        },
        {
          'name': 'RPC - Abzug',
          'icon': 'exit',
          'control': {},
          'inputs': [],
          'outputs': [],
        },
      ],
    };
  }

}
