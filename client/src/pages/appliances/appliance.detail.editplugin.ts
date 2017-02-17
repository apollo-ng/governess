
import { Component,
         ViewChild }                from '@angular/core';
import { NavParams,
         ViewController }           from 'ionic-angular';

import { ApplianceService }         from '../../providers/appliances';
import { PlatformService }          from '../../providers/platforms';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector:                         'appliance-detail-editplugin',
  templateUrl:                      'appliance.detail.editplugin.html',
})

/*******************************************************************************
 *
 *   EditPluginModal
 *
 */

export class EditPluginModal {

  @ViewChild('ConnectionVisualizer') public connectionVisualizer: any;

  public viewCtrl:                  ViewController;
  public applianceService:          ApplianceService;
  public platformService:           PlatformService;
  public params:                    NavParams;
  public plugin:                    any;
  public appliance:                 any;
  public platform:                  any;
  public hostGPIOs:                 any;
  public hostHeaders:               Array<any>;
  public viewPort:                  string;
  public type:                      string;
  public aid:                       string;
  public hid:                       string;
  public pidx:                      number;
  public cv:                        CanvasRenderingContext2D;
  public cpVisible:                 boolean;
  public cpPresetColors:            Array<string>;
  public showInfoPanel:             boolean;

  constructor(

    viewCtrl:                       ViewController,
    applianceService:               ApplianceService,
    platformService:                PlatformService,
    params:                         NavParams

  ) {

    this.viewCtrl =                 viewCtrl;
    this.applianceService =         applianceService;
    this.platformService =          platformService;

    this.type =                     params.get('type');
    this.aid =                      params.get('aid');
    this.pidx =                     params.get('pidx');

    // Set settings viewPort as default
    this.viewPort =                 'settings';
    this.cpVisible =                false;
    this.showInfoPanel =            false;

    // Find the designated appliance for this plugin
    let appliance: any = this.applianceService.appliances.filter((_appliance) => {
      return (_appliance.aid.indexOf(this.aid) > -1);
    });

    // Roll it out
    this.appliance = appliance[0];
    this.plugin = this.appliance.plugins[this.type][this.pidx];
    this.hid = this.appliance.conf.hid;
    this.hostHeaders = this.platformService.getHostHeaders(this.hid);
    this.hostGPIOs = this.platformService.getHostGPIOs(this.hid);

  }

  /*****************************************************************************
   * setWiringViewPort
   */

  public setSchemaViewPort(): void {

    this.viewPort = 'schema';
    setTimeout(
      () => {
        this.cv = this.connectionVisualizer.nativeElement.getContext('2d');
        this.drawConnectionVisualizer();
      },
      150
    );

  }

  /*****************************************************************************
   * drawConnectionVisualizer
   */

  public drawConnectionVisualizer(): void {

    // Settings
    const pinrad:     number = 12;
    const pitch:      number = 25;
    const labelWidth: number = 60;

    // PIN group color definitions
    const colors:     any = {
      '3V3' : '#cd9c12', // Orange
      '5V'  : '#cd3b12', // Red
      'GND' : '#3f3e3a', // Grey
      'GPIO': '#75890c', // Green
    };

    // Local variables
    let xOffset:      number = pitch;
    let yOffset:      number = pitch;
    let row:          number = 1;

    // Loop through all headers/pins and draw them on the canvas
    for (let header of this.hostHeaders) {
      if (header.pins.length > 0) {
        for (let pin of header.pins) {

          // Set color by group
          this.cv.fillStyle = colors[pin.GRP];

          // Draw left/right rect label depending on rows
          if (row < header.rows) {
            this.cv.fillRect(0, yOffset - pinrad, labelWidth, pinrad * 2);
          } else {
            this.cv.fillRect(xOffset + labelWidth, yOffset - pinrad, labelWidth, pinrad * 2);
          }

          // Draw group colored background circle over rect label
          this.cv.beginPath();
          this.cv.arc(row * xOffset + labelWidth - pitch, yOffset, pinrad, 0, 2 * Math.PI, false);
          this.cv.fill();

          // Draw #d8d3c5 circle over background circle
          this.cv.globalCompositeOperation = 'source-over';
          this.cv.fillStyle = '#d8d3c5';
          this.cv.beginPath();
          this.cv.arc(row * xOffset + labelWidth - pitch, yOffset, pinrad - 3, 0, 2 * Math.PI, false);
          this.cv.fill();

          // Draw #0f0e0a pin number
          this.cv.globalCompositeOperation = 'source-over';
          this.cv.strokeStyle = '#0f0e0a';
          this.cv.fillStyle = '#0f0e0a';
          this.cv.font = 'normal 10pt DIN';
          this.cv.textAlign = 'center';
          this.cv.fillText(pin.PIN, row * xOffset + labelWidth - pitch, yOffset + 5);

          // Draw pin txt and finally increase or reset row count
          this.cv.fillStyle = '#d8d3c5';
          this.cv.font = 'bold 10pt DIN';

          if (row < header.rows) {
            this.cv.textAlign = 'left';
            this.cv.fillText(pin.TXT, row * xOffset - pitch + 4, yOffset + 5);
            row++;
          } else {
            this.cv.textAlign = 'right';
            this.cv.fillText(pin.TXT, row * xOffset + labelWidth + pitch + 6, yOffset + 5);
            row = 1;
            // Finished row, jump down one pitch step
            yOffset = yOffset + pitch;
          }

          // End of pin loop
        }
        // End of pins.length check
      }
      // End of header loop
    }

  }

  /*****************************************************************************
   * drawConnectionVisualizer
   */

  public removePlugin(aid: string, type: string, pidx: any): void {
    this.applianceService.removePlugin(aid, type, pidx);
    this.dismissModal();
  }

  /*****************************************************************************
   * drawConnectionVisualizer
   */

  public dismissModal(): void {
    this.viewCtrl.dismiss();
  }

}
