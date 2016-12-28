import { OnInit,
         ViewChild,
         Component,
         ElementRef }           from '@angular/core';

import { Rgba,
         Hsla,
         Hsva,
         SliderPosition,
         SliderDimension }      from './color-picker.classes';
import { ColorPickerService }   from './color-picker.service';

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'color-picker',
  templateUrl: 'color-picker.html',
})

/*******************************************************************************
 *
 *   ColorPickerComponent
 *
 */

export class ColorPickerComponent implements OnInit {

  public rgbaText: Rgba;
  public hslaText: Hsla;
  public hexText: string;
  public outputColor: string;
  public alphaSliderColor: string;
  public hueSliderColor: string;
  public slider: SliderPosition;
  public format: number;
  public show: boolean;
  public top: number;
  public left: number;
  public cpPresetColors: Array<Object>;

  private hsva: Hsva;
  private directiveInstance: any;
  private initialColor: string;
  private directiveElementRef: ElementRef;

  private sliderDimMax: SliderDimension;
  private listenerMouseDown: any;
  private listenerResize: any;

  private cpOutputFormat: string;
  private cpIgnoredElements: any;

  public cpInModal: boolean;
  public cpAlphaChannel: string = 'hex6';
  public selectedColor: string;

  @ViewChild('hueSlider') public hueSlider: any;
  @ViewChild('alphaSlider') public alphaSlider: any;
  @ViewChild('dialogPopup') public dialogElement: any;

  /*****************************************************************************
   * constructor
   */

  constructor(
    private el: ElementRef,
    private service: ColorPickerService
  ) {
    // Nothing here
  }

  /*****************************************************************************
   * setDialog
   */

  public setDialog(
    instance: any,
    elementRef: ElementRef,
    color: any,
    cpInModal: boolean,
    cpOutputFormat: string,
    cpPresetColors: Array<Object>,
    cpIgnoredElements: any,
    cpAlphaChannel: string
  ): void {
    this.directiveInstance = instance;
    this.initialColor = color;
    this.directiveElementRef = elementRef;
    this.cpInModal = cpInModal;
    this.cpOutputFormat = cpOutputFormat;
    this.cpPresetColors = cpPresetColors;
    this.cpIgnoredElements = cpIgnoredElements;
    this.cpAlphaChannel = cpAlphaChannel;
  }

  /*****************************************************************************
   * ngOnInit
   */

  public ngOnInit(): void {
    let alphaWidth: any = this.alphaSlider.nativeElement.offsetWidth;
    let hueWidth: any = this.hueSlider.nativeElement.offsetWidth;
    this.sliderDimMax = new SliderDimension(hueWidth, 230, 130, alphaWidth);
    this.slider = new SliderPosition(0, 0, 0, 0);
    if (this.cpOutputFormat === 'rgba') {
      this.format = 1;
    } else if (this.cpOutputFormat === 'hsla') {
      this.format = 2;
    } else {
      this.format = 0;
    }
    this.listenerMouseDown = (event: any) => { this.onMouseDown(event); };
    this.listenerResize = () => { this.onResize(); };
    this.openDialog(this.initialColor, false);
  }

  /*****************************************************************************
   * setInitialColor
   */

  public setInitialColor(color: any): void {
    this.initialColor = color;
  }

  /*****************************************************************************
   * openDialog
   */

  public openDialog(color: any, emit: boolean = true): void {
    this.setInitialColor(color);
    this.setColorFromString(color, emit);
    this.openColorPicker();
  }

  /*****************************************************************************
   * cancelColor
   */

  public cancelColor(): void {
    this.setColorFromString(this.initialColor, true);
    this.directiveInstance.colorChanged(this.initialColor, true);
    this.closeColorPicker();
  }

  /*****************************************************************************
   * oKColor
   */

  public oKColor(): void {
    this.closeColorPicker();
  }

  /*****************************************************************************
   * setColorFromString
   */

  public setColorFromString(value: string, emit: boolean = true): void {
    let hsva: Hsva;
    if (this.cpAlphaChannel === 'hex8') {
      hsva = this.service.stringToHsva(value, true);
      if (!hsva && !this.hsva) {
        hsva = this.service.stringToHsva(value, false);
      }
    } else {
      hsva = this.service.stringToHsva(value, false);
    }
    if (hsva) {
      this.hsva = hsva;
      this.update(emit);
    }
  }

  /*****************************************************************************
   * onMouseDown
   */

  public onMouseDown(event: any): void {

    if ( // Was it a click outside of the ColorPicker?
      !this.isDescendant(this.el.nativeElement, event.target) &&
      event.target !== this.directiveElementRef.nativeElement &&
      this.cpIgnoredElements.filter(
        (item: any) => item === event.target
      ).length === 0
    ) { // Restore initial state and close ColorPicker
      this.setColorFromString(this.initialColor, false);
      this.directiveInstance.colorChanged(this.initialColor);
      this.closeColorPicker();
    }
  }

  /*****************************************************************************
   * openColorPicker
   */

  public openColorPicker(): void {
    if (!this.show) {
      this.setColorPickerPos();
      this.show = true;
      this.directiveInstance.toggle(true);
      document.addEventListener('mousedown', this.listenerMouseDown);
      window.addEventListener('resize', this.listenerResize);
    }
  }

  /*****************************************************************************
   * closeColorPicker
   */

  public closeColorPicker(): void {
    if (this.show) {
      this.show = false;
      this.directiveInstance.toggle(false);
      document.removeEventListener('mousedown', this.listenerMouseDown);
      window.removeEventListener('resize', this.listenerResize);
    }
  }

  /*****************************************************************************
   * onResize
   */

  public onResize(): void {
    this.setColorPickerPos();
  }

  /*****************************************************************************
   * setColorPickerPos
   */

  public setColorPickerPos(): void {

    // FIXME: Nasty hack to accomodate injection and calling from within modal
    //        Without this the injected component will be trapped within the
    //        calling element, no matter what z-index (how is this even possible).
    if (this.cpInModal) {
      this.top = this.el.nativeElement.offsetParent.scrollHeight / 2 - 165;
      this.left = this.el.nativeElement.offsetParent.scrollWidth / 2 - 150;
    } else {
      this.top = window.innerHeight / 2 - 210;
      this.left = window.innerWidth / 2 - 150;
    }

  }

  /*****************************************************************************
   * setSaturation
   */

  public setSaturation(val: { v: number, rg: number }): void {
    let hsla: any = this.service.hsva2hsla(this.hsva);
    hsla.s = val.v / val.rg;
    this.hsva = this.service.hsla2hsva(hsla);
    this.update();
  }

  /*****************************************************************************
   * setLightness
   */

  public setLightness(val: { v: number, rg: number }): void {
    let hsla: any = this.service.hsva2hsla(this.hsva);
    hsla.l = val.v / val.rg;
    this.hsva = this.service.hsla2hsva(hsla);
    this.update();
  }

  /*****************************************************************************
   * setHue
   */

  public setHue(val: { v: number, rg: number }): void {
    this.hsva.h = val.v / val.rg;
    this.update();
  }

  /*****************************************************************************
   * setAlpha
   */

  public setAlpha(val: { v: number, rg: number }): void {
    this.hsva.a = val.v / val.rg;
    this.update();
  }

  /*****************************************************************************
   * setR
   */

  public setR(val: { v: number, rg: number }): void {
    let rgba: any = this.service.hsvaToRgba(this.hsva);
    rgba.r = val.v / val.rg;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();
  }

  /*****************************************************************************
   * setG
   */

  public setG(val: { v: number, rg: number }): void {
    let rgba: any = this.service.hsvaToRgba(this.hsva);
    rgba.g = val.v / val.rg;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();
  }

  /*****************************************************************************
   * setB
   */

  public setB(val: { v: number, rg: number }): void {
    let rgba: any = this.service.hsvaToRgba(this.hsva);
    rgba.b = val.v / val.rg;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();
  }

  /*****************************************************************************
   * setSaturationAndBrightness
   */

  public setSaturationAndBrightness(val: { s: number, v: number, rgX: number, rgY: number }): void {
    this.hsva.s = val.s / val.rgX;
    this.hsva.v = val.v / val.rgY;
    this.update();
  }

  /*****************************************************************************
   * formatPolicy
   */

  public formatPolicy(): number {
    this.format = (this.format + 1) % 3;
    if (this.format === 0 && this.hsva.a < 1 && this.cpAlphaChannel === 'hex6') {
      this.format++;
    }
    return this.format;
  }

  /*****************************************************************************
   * update
   */

  public update(emit: boolean = true): void {
    let hsla: any = this.service.hsva2hsla(this.hsva);
    let rgba: any = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
    let hueRgba: any = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));

    this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
    this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
    this.hexText = this.service.hexText(rgba, this.cpAlphaChannel === 'hex8');

    this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
    this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';

    if (
      this.format === 0 &&
      this.hsva.a < 1 &&
      this.cpAlphaChannel === 'hex6'
    ) {
      this.format++;
    }

    let lastOutput: any = this.outputColor;
    this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat, this.cpAlphaChannel === 'hex8');
    this.selectedColor = this.service.outputFormat(this.hsva, 'rgba', false);

    this.slider = new SliderPosition(
      (this.hsva.h) * this.sliderDimMax.h - 8,
      this.hsva.s * this.sliderDimMax.s - 8,
      (1 - this.hsva.v) * this.sliderDimMax.v - 8,
      this.hsva.a * this.sliderDimMax.a - 8
    );

    if (emit && lastOutput !== this.outputColor) {
      this.directiveInstance.colorChanged(this.outputColor);
    }

  }

  /*****************************************************************************
   * isDescendant
   */

  public isDescendant(parent: any, child: any): boolean {
    let node: any = child.parentNode;
    while (node !== null) {
      if (node === parent) {
          return true;
      }
      node = node.parentNode;
    }
    return false;
  }

}
