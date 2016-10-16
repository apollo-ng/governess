import { Injectable }             from '@angular/core';
import { Observable, Subject }    from 'rxjs/Rx';
import { $WebSocket }             from '../websocket/websocket';

////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class StatusService {

  private ws: any;

/*  private readyStates: any = {
          'CONNECTING': 0,
          'OPEN': 1,
          'CLOSING': 2,
          'CLOSED': 3,
          'RECONNECT_ABORTED': 4,
  };
*/
  //////////////////////////////////////////////////////////////////////

  constructor (

  ) {
    this.connect();
  }

  //////////////////////////////////////////////////////////////////////

  public connect(): void {
      this.ws = new $WebSocket('ws://localhost:8765');
      this.ws.connect();
      this.ws.send('Hello World');
/*
      this.ws.onopen = (evt) => {
        this.ws.send('Hello World');
        console.log('StatusService Connection Opened');
      };
      this.ws.onclose = () => {
        console.log('StatusService Connection Closed');
      };
      this.ws.onerror = (evt) => {
        console.log('StatusService Connection Error: ' + evt);
      };
    } else {
      console.log('StatusService WS already open');
    }
*/
  }

  public sendMessage(text: string): void {
    this.ws.send(text);
  }

  public socketData(): Observable<any> {
    return Observable.fromEvent(this.ws.getDataStream(), 'message')
      .map( res => res )
      .share();
  }

  public disconnect(): void {
    console.log('Closing Websocket...');
    this.ws.close();
  }

}
