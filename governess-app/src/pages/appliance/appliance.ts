'use strict';

import { Component }                from '@angular/core';
import { ActionSheetController,
         ModalController,
         ViewController,
         NavController,
         NavParams,
         Platform }                 from 'ionic-angular';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Component ({
  templateUrl: 'appliance.html',
  selector: 'appliance'
})

////////////////////////////////////////////////////////////////////////
//
//

export class AppliancePage {

  public navCtrl: NavController;
  public modalCtrl: ModalController;
  public actionSheetCtrl: ActionSheetController;
  public appliance: any;

  constructor(

    navCtrl: NavController,
    modalCtrl: ModalController,
    actionSheetCtrl: ActionSheetController

  ) {

    this.navCtrl = navCtrl;
    this.actionSheetCtrl = actionSheetCtrl;
    this.modalCtrl = modalCtrl;

    this.appliance = {

      'name': 'EKA KF412',
      'desc': 'Small convection-heat lab-oven',
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

  //////////////////////////////////////////////////////////////////////

  public openHelp(): void {
    // FIXME: Add proper help
    console.log('help tapped');
  };

  public openMenu(modid: any): any {
    let actionSheet: any = this.actionSheetCtrl.create({
      title: this.appliance.modules[modid].name,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Edit Module',
          icon: 'create',
          handler: (): void => {
            console.log('Edit Module clicked');
          },
        },
        {
          text: 'Add Input-Plug',
          icon: 'add-circle',
          handler: (): void => {
            console.log('Add Input-Plug clicked');
          },
        },
        {
          text: 'Add Output-Plug',
          icon: 'add-circle',
          handler: (): void => {
            console.log('Add Output-Plug clicked');
          },
        },
        {
          text: 'Delete Module',
          icon: 'trash',
          role: 'destructive',
          handler: (): void => {
            console.log('Delete Module clicked');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: (): void => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    actionSheet.present(actionSheet);
  }

  public editInputPlug(modid: any, plugid: any): any {
    console.log('Edit Input-Plug:' + modid + plugid);
    let modal: any = this.modalCtrl.create(ModalsContentPage);
    modal.present(modal);
  }

  public editOutputPlug(modid: any, plugid: any): any {
    console.log('Edit Output-Plug:' + modid + plugid);
  }

}

@Component({
  templateUrl: 'app-sys-modal.html',
})

class ModalsContentPage {

  public platform: Platform;
  public params: NavParams;
  public viewCtrl: ViewController;

  public character: any;

  constructor(
      platform: Platform,
      params: NavParams,
      viewCtrl: ViewController
  ) {

    let characters: any = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' },
        ],
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' },
        ],
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' },
        ],
      },
    ];
    this.character = characters[1];
    this.viewCtrl = viewCtrl;
  }

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
