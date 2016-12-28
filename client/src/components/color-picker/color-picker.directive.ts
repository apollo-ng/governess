import { Input,
         Output,
         OnInit,
         OnChanges,
         Directive,
         ElementRef,
         EventEmitter,
         ViewContainerRef }     from '@angular/core';
import { Compiler,
         NgModule,
         ReflectiveInjector }   from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';

import { Events,
         IonicModule }          from 'ionic-angular';

import { ColorPickerService }   from './color-picker.service';
import { ColorPickerComponent } from './color-picker.component';

////////////////////////////////////////////////////////////////////////////////

@Directive({
  selector: '[colorPicker]',
  host: {
    '(input)': 'changeInput($event.target.value)',
    '(click)': 'onClick()',
  },
})

/*******************************************************************************
 *
 *   ColorPickerDirective
 *
 */

export class ColorPickerDirective implements OnInit, OnChanges {

  @Input('colorPicker') public colorPicker: string;
  @Input('cpToggle') public cpToggle: boolean;
  @Input('cpInModal') public cpInModal: boolean = false;
  @Input('cpOutputFormat') public cpOutputFormat: string = 'rgba';
  @Input('cpPresetColors') public cpPresetColors: Array<Object>;
  @Input('cpFallbackColor') public cpFallbackColor: string = 'rgba(0,0,0,0)';
  @Input('cpIgnoredElements') public cpIgnoredElements: any = [];
  @Input('cpAlphaChannel') public cpAlphaChannel: string = 'hex6';
  @Input('cpColorChangeOnInit') public cpColorChangeOnInit: boolean = true;
  @Output('colorPickerChange') public colorPickerChange: any = new EventEmitter<string>(true);
  @Output('cpToggleChange') public cpToggleChange: any = new EventEmitter<boolean>(true);

  private dialog: any;
  private created: boolean;
  private ignoreChanges: boolean = false;

  public events: Events;

  /*****************************************************************************
   * constructor
   */

  constructor(
    events: Events,
    private compiler: Compiler,
    private vcRef: ViewContainerRef,
    private el: ElementRef,
    private service: ColorPickerService
  ) {
    this.events = events;
    this.created = false;
    this.cpPresetColors = [
      { 'color': 'rgba(199,0,0,1)',     'name': 'Red'    },
      { 'color': 'rgba(235,127,0,1)',   'name': 'Orange' },
      { 'color': 'rgba(255,230,0,1)',   'name': 'Yellow' },
      { 'color': 'rgba(192,255,0,1)',   'name': 'Lemon'  },
      { 'color': 'rgba(117,137,12,1)',  'name': 'Green'  },
      { 'color': 'rgba(69,226,165,1)',  'name': 'Mint'   },
      { 'color': 'rgba(55,192,230,1)',  'name': 'Sky'    },
      { 'color': 'rgba(24,86,204,1)',   'name': 'Blue'   },
      { 'color': 'rgba(125,53,245,1)',  'name': 'Purple' },
      { 'color': 'rgba(216,109,152,1)', 'name': 'Rose'   },
      { 'color': 'rgba(226,208,180,1)', 'name': 'Sand'   },
      { 'color': 'rgba(230,230,230,1)', 'name': 'White'  },
    ];
  }

  /*****************************************************************************
   * ngOnChanges
   */

  public ngOnChanges(changes: any): void {
    if (changes.cpToggle) {
      if (changes.cpToggle.currentValue) {
        this.openDialog();
      }
      if (!changes.cpToggle.currentValue && this.dialog) {
        this.dialog.closeColorPicker();
      }
    }
    if (changes.colorPicker) {
      if (this.dialog && !this.ignoreChanges) {
        this.dialog.setColorFromString(changes.colorPicker.currentValue, false);
      }
      this.ignoreChanges = false;
    }
  }

  /*****************************************************************************
   * ngOnInit
   */

  public ngOnInit(): void {
    let hsva: any = this.service.stringToHsva(this.colorPicker);

    if (hsva !== null) {
      hsva = this.service.stringToHsva(this.colorPicker, true);
    }

    if (hsva === null) {
      hsva = this.service.stringToHsva(this.cpFallbackColor);
    }

    this.colorPickerChange.emit(this.service.outputFormat(hsva, this.cpOutputFormat, this.cpAlphaChannel === 'hex8'));
  }

  /*****************************************************************************
   * onClick
   */

  public onClick(): void {
    if (this.cpIgnoredElements.filter(
      (item: any) => item === this.el.nativeElement).length === 0) {
        this.openDialog();
    }
  }

  /*****************************************************************************
   * openDialog
   */

  public openDialog(): void {
    if (!this.created) {
      this.created = true;
      this.compiler.compileModuleAndAllComponentsAsync(DynamicCpModule)
        .then(factory => {
          const compFactory: any = factory.componentFactories.find(x => x.componentType === ColorPickerComponent);
          const injector: any = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
          const cmpRef: any = this.vcRef.createComponent(compFactory, 0, injector, []);
          cmpRef.instance.setDialog(
            this,
            this.el,
            this.colorPicker,
            this.cpInModal,
            this.cpOutputFormat,
            this.cpPresetColors,
            this.cpIgnoredElements,
            this.cpAlphaChannel
          );
          this.dialog = cmpRef.instance;
        }
      );
    } else if (this.dialog) {
      this.dialog.openDialog(this.colorPicker);
    }
  }

  /*****************************************************************************
   * colorChanged
   */

  public colorChanged(value: string, ignore: boolean = true): void {
    this.ignoreChanges = ignore;
    this.colorPickerChange.emit(value);
    this.events.publish('colorChanged');
  }

  /*****************************************************************************
   * changeInput
   */

  public changeInput(value: string): void {
    this.dialog.setColorFromString(value, true);
  }

  /*****************************************************************************
   * toggle
   */

  public toggle(value: boolean): void {
    this.cpToggleChange.emit(value);
  }
}

////////////////////////////////////////////////////////////////////////////////

@Directive({
  selector: '[text]',
  host: {
    '(input)': 'changeInput($event.target.value)',
  },
})

/*******************************************************************************
 *
 *   TextDirective
 *
 */

export class TextDirective {

  @Input('text') public text: any;
  @Input('rg') public rg: number;
  @Output('newValue') public newValue: any = new EventEmitter<any>();

  /*****************************************************************************
   * changeInput
   */

  public changeInput(value: string): void {
    if (this.rg === undefined) {
      this.newValue.emit(value);
    } else {
      let numeric: number = parseFloat(value);
      if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
        this.newValue.emit({ v: numeric, rg: this.rg });
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////

@Directive({
  selector: '[slider]',
  host: {
    '(mousedown)': 'start($event)',
    '(touchstart)': 'start($event)',
  },
})

/*******************************************************************************
 *
 *   SliderDirective
 *
 */

export class SliderDirective {

  @Input('slider') public slider: string;
  @Input('rgX') public rgX: number;
  @Input('rgY') public rgY: number;
  @Output('newValue') public newValue: any = new EventEmitter<any>();

  private listenerMove: any;
  private listenerStop: any;

  /*****************************************************************************
   * constructor
   */

  constructor(
    private el: ElementRef
  ) {
    this.listenerMove = (event: any) => { this.move(event); };
    this.listenerStop = () => { this.stop(); };
  }

  /*****************************************************************************
   * setCursor
   */

  public setCursor(event: any): void {
    let height: number = this.el.nativeElement.offsetHeight;
    let width: number = this.el.nativeElement.offsetWidth;
    let x: number = Math.max(0, Math.min(this.getX(event), width));
    let y: number = Math.max(0, Math.min(this.getY(event), height));

    if (this.rgX !== undefined && this.rgY !== undefined) {
      this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
    } else if (this.rgX === undefined && this.rgY !== undefined) {
      // Ready to use vertical sliders
      this.newValue.emit({ v: y / height, rg: this.rgY });
    } else {
      this.newValue.emit({ v: x / width, rg: this.rgX });
    }
  }

  /*****************************************************************************
   * move
   */

  public move(event: any): void {
    event.preventDefault();
    this.setCursor(event);
  }

  /*****************************************************************************
   * start
   */

  public start(event: any): void {
    this.setCursor(event);
    document.addEventListener('mousemove', this.listenerMove);
    document.addEventListener('touchmove', this.listenerMove);
    document.addEventListener('mouseup', this.listenerStop);
    document.addEventListener('touchend', this.listenerStop);
  }

  /*****************************************************************************
   * stop
   */

  public stop(): void {
    document.removeEventListener('mousemove', this.listenerMove);
    document.removeEventListener('touchmove', this.listenerMove);
    document.removeEventListener('mouseup', this.listenerStop);
    document.removeEventListener('touchend', this.listenerStop);
  }

  /*****************************************************************************
   * getX/Y
   */

  public getX(event: any): number {
    return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX)
    - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
  }

  public getY(event: any): number {
    return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY)
    - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
  }

}

////////////////////////////////////////////////////////////////////////////////

/*******************************************************************************
 *
 *   NgModule
 *
 */

@NgModule({
  imports: [
    BrowserModule,
    IonicModule,
  ],
  declarations: [
    ColorPickerComponent,
    TextDirective,
    SliderDirective,
  ],
})

export class DynamicCpModule { };
