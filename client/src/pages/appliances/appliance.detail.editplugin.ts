import { Component,
         ViewChild,
         AfterViewInit }            from '@angular/core';
import { NavParams,
         ViewController }           from 'ionic-angular';

import { ApplianceService }         from '../../providers/appliances/appliances';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector:                         'appliance-detail-editplugin',
  templateUrl:                      'appliance.detail.editplugin.html',
})

/*******************************************************************************
 *
 *     EditPluginModal
 *
 */

export class EditPluginModal implements AfterViewInit {

  @ViewChild('ConnectionVisualizer')
    public connectionVisualizer:   any;

  public viewCtrl:                  ViewController;
  public applianceService:          ApplianceService;
  public params:                    NavParams;
  public plugin:                    any;
  public appliance:                 any;
  public platform:                  any;
  public headers:                   Array<any>;
  public type:                      string;
  public aid:                       string;
  public hid:                       string;
  public pidx:                      number;

  // private rectW: number =          100;
  // private rectH: number =          100;
  public cv:                       CanvasRenderingContext2D;

  constructor(

    viewCtrl:                       ViewController,
    applianceService:               ApplianceService,
    params:                         NavParams

  ) {

    this.viewCtrl =                 viewCtrl;
    this.applianceService =         applianceService;
    this.type =                     params.get('type');
    this.aid =                      params.get('aid');
    this.pidx =                     params.get('pidx');

    // Find the designated appliance for this plugin
    this.appliance = this.applianceService.appliances.filter((_appliance) => {
      return (_appliance.aid.indexOf(this.aid) > -1);
    });

    // Roll it out
    this.plugin = this.appliance[0].plugins[this.type][this.pidx];
    this.hid = this.appliance[0].conf.hid;
    this.headers = this.applianceService.getHostHeaders(this.hid);

  }

  /*****************************************************************************
   * ngAfterViewInit
   */

  public ngAfterViewInit(): void {
    this.cv = this.connectionVisualizer.nativeElement.getContext('2d');
    this.drawConnectionVisualizer();
  }

  /*****************************************************************************
   * drawConnectionVisualizer
   */

  public drawConnectionVisualizer(): void {

    // Settings
    const pinrad: number      = 11;
    const pitch: number       = 24;
    const labelWidth: number  = 60;
    const colors: any = {
      '3V3' : '#cd9c12',  // Orange
      '5V'  : '#cd3b12',  // Red
      'GND' : '#3f3e3a',  // Grey
      'GPIO': '#75890c',  // Green
    };

    // Local variables
    let xOffset: number       = pitch;
    let yOffset: number       = pitch;
    let row: number         = 1;

    // Loop through all headers/pins and draw them on the canvas
    for (let header of this.headers) {
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

          // Draw white circle over background circle
          this.cv.globalCompositeOperation = 'source-over';
          this.cv.fillStyle = '#ffffff';
          this.cv.beginPath();
          this.cv.arc(row * xOffset + labelWidth - pitch, yOffset, pinrad - 3, 0, 2 * Math.PI, false);
          this.cv.fill();

          // Draw pin number
          this.cv.globalCompositeOperation = 'source-over';
          this.cv.strokeStyle = '#000000';
          this.cv.fillStyle = '#000000';
          this.cv.font = 'regular 12pt DIN';
          this.cv.textAlign = 'center';
          this.cv.fillText(pin.PIN, row * xOffset + labelWidth - pitch, yOffset + 3);
          this.cv.fillStyle = '#ffffff';

          // Draw pin txt and finally increase or reset row count
          if (row < header.rows) {
            this.cv.textAlign = 'left';
            this.cv.fillText(pin.TXT, row * xOffset - pitch + 4, yOffset + 3);
            row++;
          } else {
            this.cv.textAlign = 'right';
            this.cv.fillText(pin.TXT, row * xOffset + labelWidth + pitch + 5, yOffset + 3);
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
