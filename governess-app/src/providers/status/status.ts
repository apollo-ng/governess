import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Rx';
import { WebSocketService }       from '../websocket/websocket';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class StatusService {

  public ws: any
  public status: any;
  public online: boolean;

  //////////////////////////////////////////////////////////////////////

  constructor (

  ) {
    this.status = {};
    this.online = false;
  }

  //////////////////////////////////////////////////////////////////////

  public statusSocketRX(): Observable<any> {

    this.ws = new WebSocketService('ws://localhost:8765');

    // When a connection is made
    this.ws.onopen = function() {
      console.log('statusSocketRX: Opened connection ');
      // send data to the server
      this.ws.send(JSON.stringify({ message: 'Hello ' }));
      this.online = true;
    }

    // A connection could not be made
    this.ws.onerror = function(event) {
      //console.log(event);
      this.online = false;
    }

    // A connection was closed
    this.ws.onclose = function(code, reason) {
      //console.log(code, reason);
      this.online = false;
    }

    // Map and return socket data as Obervable
    return Observable.create( observer => {
      this.ws.onmessage = (evt) => {
        observer.next(evt);
      };
    })
    .map( res => res.data )
    .share();
  }

  public onlineCheck(): boolean {
    console.log('onlinecheck fired');
    return this.online;
  }

}
