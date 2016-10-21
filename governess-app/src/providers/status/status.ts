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

  //////////////////////////////////////////////////////////////////////

  constructor (

  ) {

  }

  //////////////////////////////////////////////////////////////////////

  public statusSocketRX(): Observable<any> {

    this.ws = new WebSocketService('ws://localhost:8765');

    // When a connection is made
    this.ws.onopen = function() {
      console.log('statusSocketRX: Opened connection ');
      // send data to the server
      this.ws.send(JSON.stringify({ message: 'Hello ' }));
    }

    // A connection could not be made
    this.ws.onerror = function(event) {
      console.log(event);
    }

    // A connection was closed
    this.ws.onclose = function(code, reason) {
      console.log(code, reason);
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

}
