import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Rx';
import { WebSocketService }       from '../websocket/websocket';

////////////////////////////////////////////////////////////////////////////////

@Injectable (

)

/*******************************************************************************
 *
 *   StatusService
 *
 */

export class StatusService {

  public ws: any;
  public status: any = {};
  public online: boolean = false;

  /*****************************************************************************
   * constructor
   */

  constructor (

  ) {
    /* */
  }

  /*****************************************************************************
   * statusSocketRX
   * @return
   */

  public statusSocketRX(): Observable<any> {
    // let url: string = 'ws://localhost:8765';
    this.ws = new WebSocketService();

    // When a connection is made
    this.ws.onopen = function(): void {
      console.log('statusSocketRX: Opened connection ');
      // send data to the server
      this.ws.send(JSON.stringify({ message: 'Hello ' }));
      this.online = true;
    };

    // A connection could not be made
    this.ws.onerror = function(event: ErrorEvent): void {
      console.log(event);
      this.online = false;
    };

    // A connection was closed
    this.ws.onclose = function(code: number, reason: any): void {
      console.log(code, reason);
      this.online = false;
    };

    // Map and return socket data as Obervable
    return Observable.create( observer => {
      this.ws.onmessage = (evt: any) => {
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
