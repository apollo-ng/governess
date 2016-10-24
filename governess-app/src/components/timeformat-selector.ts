import { Component, Injectable } from '@angular/core';
import { ViewController }    from 'ionic-angular';

@Injectable (

)

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="toppings">
      <ion-list-header>
        <h3>
          <ion-icon name="watch"></ion-icon>
          Timescale Format
        </h3>
      </ion-list-header>
      <ion-item>
        <ion-label>Auto</ion-label>
        <ion-radio value="auto" checked></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Seconds</ion-label>
        <ion-radio value="ss" (click)="dismissPopover()"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Minutes</ion-label>
        <ion-radio value="mm:ss" (click)="dismissPopover()"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Hours</ion-label>
        <ion-radio value="hh:mm" (click)="dismissPopover()"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Days</ion-label>
        <ion-radio value="d:hh:mm" (click)="dismissPopover()"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Custom</ion-label>
        <ion-radio value="custom"></ion-radio>
      </ion-item>
      <ion-item *ngIf="toppings === 'custom'">
        <ion-label>Custom</ion-label>
        <ion-input placeholder="M:d:hh:mm:ss" [(ngModel)]="toppings"></ion-input>
      </ion-item>
    </ion-list>
  `
})

export class TimeformatSelector {

  public toppings: any;

  constructor(
    public viewCtrl: ViewController
  ) {
    this.toppings = "";
  }

  dismissPopover() {
    this.viewCtrl.dismiss();
  }

}
