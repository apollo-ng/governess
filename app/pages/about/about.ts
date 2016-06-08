import {Page, NavController} from 'ionic-angular';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'


@Page({
  templateUrl: 'build/pages/about/about.html',
})

export class AboutPage {

  private ws: $WebSocket;
  private subscription;
  private wsdata;

  constructor(public nav: NavController) {
    this.wsdata = [];
    this.wsdata.data = [];
    this.wsdata.data.totalcount = '';
  }

  ngOnInit() {
    this.subscribe();
  }

  subscribe() {
    console.log('Trying to subscribe to WS...');
    if (!this.subscription) {
      this.ws = new $WebSocket('ws://localhost:8082/ws_status');
      this.ws.send('Hello');
      this.subscription = this.ws.getDataStream().subscribe(
        res => { this.wsdata = JSON.parse(res.data) },
        err => console.log('Error: ', err),
        () => { console.log('Completed') }
      );
    } else {
      console.log('Already subscribed');
    }
  }

  ngOnDestroy() {
    this.subscription.complete();
    this.subscription.unsubscribe();
  }

}

