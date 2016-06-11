import {App, Alert, Platform, Page, ActionSheet, Modal, NavController, NavParams, ViewController} from 'ionic-angular';
import {Truncate} from '../../pipes/truncate';

/*

*/

@Page({
  templateUrl: 'build/pages/appliance/appliance.html',
  pipes: [Truncate]
})

export class AppliancePage {

  private appliance;
  testRadioOpen: boolean;
  testRadioResult;

  constructor(public nav: NavController) {

/*
    this.appliance = {
      'name': 'Digestorium',
      'desc': 'A fully featured fume hood',
      'modules': [

        // PID Temperature Governor

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
                'unit': '°C'
              }
            ],
            'outputs': [
              {
                'type': 'binary'
              },
              {
                'type': 'binary'
              }
            ],
            'conf': [
              {
                'name': 'Max tRun',
                'val': '300s'
              },
              {
                'name': 'Max °C',
                'val': '250'
              },
              {
                'name': 'Min °C',
                'val': '0'
              },
              {
                'name': 'Kp',
                'val': '30.2'
              },
              {
                'name': 'Ki',
                'val': '0.77'
              },
              {
                'name': 'Kd',
                'val': '30.2'
              }
            ]
          },
          'inputs': [
            {
              'name': 'K-Type Probe',
              'color': '#c70000',
              'icon': 'thermometer',
              'type': 'float',
              'driver': 'drv/input-MAX31855'
            }
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
                  'val': '27'
                }
              ]
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
                  'val': '23'
                }
              ]
            }
          ]
        },

        // Magnetic Stir

        {
          'name': 'Magnetic Stir',
          'icon': 'nuclear',
          'control': {
            'name': 'OnOff',
            'icon': 'power',
            'driver': 'drv/ctrl-onoff',
            'inputs': [{}],
            'outputs': [
              {
                'type': 'binary'
              }
            ],
            'conf': [
              {
                'name': 'Max tRun',
                'val': '300s'
              }
            ]
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
                  'val': '23'
                }
              ]
            }
          ]
        },

        // Door Sensor

        {
          'name': 'Door',
          'icon': 'exit',
          'control': {
            'name': 'Trigger',
            'icon': 'flash',
            'driver': 'drv/ctrl-trigger',
            'inputs': [
              {
                'type': 'Interrupt'
              }
            ],
            'outputs': [{}],
            'conf': [
              {
                'name': 'Action',
                'val': 'TBD'
              }
            ]
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
                  'val': '21'
                }
              ]
            }
          ]
        }
      ]
    }
  }
*/


    this.appliance = {

      'name': 'Reflow-Oven',
      'desc': 'A full Reflow-Oven Implementation',
      'modules': [

        // PID Temperature Governor

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
                'unit': '°C'
              }
            ],
            'outputs': [
              {
                'type': 'binary'
              },
              {
                'type': 'binary'
              }
            ],
            'conf': [
              {
                'name': 'Max tRun',
                'val': '300s'
              },
              {
                'name': 'Max °C',
                'val': '250'
              },
              {
                'name': 'Min °C',
                'val': '0'
              },
              {
                'name': 'Kp',
                'val': '30.2'
              },
              {
                'name': 'Ki',
                'val': '0.77'
              },
              {
                'name': 'Kd',
                'val': '30.2'
              }
            ]
          },
          'inputs': [
            {
              'name': 'K-Type Probe',
              'color': '#c70000',
              'icon': 'thermometer',
              'type': 'float',
              'driver': 'drv/input-MAX31855'
            }
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
                  'val': '27'
                }
              ]
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
                  'val': '23'
                }
              ]
            }
          ]
        },

        // Air Circulator

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
                'type': 'binary'
              }
            ],
            'conf': [
              {
                'name': 'Max tRun',
                'val': '300s'
              }
            ]
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
                  'val': '23'
                }
              ]
            }
          ]
        },

        // Door Sensor

        {
          'name': 'Door',
          'icon': 'exit',
          'control': {
            'name': 'Trigger',
            'icon': 'flash',
            'driver': 'drv/ctrl-trigger',
            'inputs': [
              {
                'type': 'Interrupt'
              }
            ],
            'outputs': [{}],
            'conf': [
              {
                'name': 'Action',
                'val': 'TBD'
              }
            ]
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
                  'val': '21'
                }
              ]
            }
          ]
        },
        {
          'name': 'RPC - Abzug',
          'icon': 'exit',
          'control': {},
          'inputs': [],
          'outputs': []
        }
      ]
    }
  }


  openMenu(modid) {
    let actionSheet = ActionSheet.create({
      title: this.appliance.modules[modid].name,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Edit Module',
          icon: 'create',
          handler: () => {
            console.log('Edit Module clicked');
          }
        },
        {
          text: 'Add Input-Plug',
          icon: 'add-circle',
          handler: () => {
            console.log('Add Input-Plug clicked');
          }
        },
        {
          text: 'Add Output-Plug',
          icon: 'add-circle',
          handler: () => {
            console.log('Add Output-Plug clicked');
          }
        },
        {
          text: 'Delete Module',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            console.log('Delete Module clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }

  editInputPlug(modid,plugid) {
    console.log('Edit Input-Plug:' + modid + plugid);
    let modal = Modal.create(ModalsContentPage);
    this.nav.present(modal);
  }

  createModule() {
    let prompt = Alert.create({
      title: 'Create a new Module',
      message: "Enter a name for this new Module to add it to your appliance",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name of Module'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            console.log('Create clicked');
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

doRadio() {
    let alert = Alert.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'blue',
      checked: true
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
          console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
   this.nav.present(alert).then(() => {
      this.testRadioOpen = true;
    });
  }
}

@Page({
  templateUrl: './build/pages/hw-sys/hw-sys-modal.html'
})
class ModalsContentPage {
  character;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.character = characters[1];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
