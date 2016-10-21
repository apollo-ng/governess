import { Injectable } from '@angular/core';

/******************************************************************************/

/******************************************************************************/

@Injectable (

)

/*******************************************************************************
 *
 *     WebSocketService
 */

export class WebSocketService {

  // These can be altered by calling code
  public debug: boolean = false;

  // Time in ms to wait before attempting to reconnect (after a close)
  public reconnectInterval: number = 1000;
  // Time in ms to wait for WebSocket to open (before aborting and retrying)
  public timeoutInterval: number = 2000;

  // Should only be used to read WebSocket readyState
  public readyState: number;

  // Whether WebSocket was forced to close by this client
  private forcedClose: boolean = false;
  // Whether WebSocket opening timed out
  private timedOut: boolean = false;

  // List of WebSocket sub-protocols
  private protocols: string[] = [];

  // The underlying WebSocket
  private ws: WebSocket;
  private url: string;

  // Setting this to true is the equivalent of setting all instances
  // of WebSocketService.debug to true
  public static debugAll = true;

  // Set up the default 'noop' event handlers
  public onopen:(ev:Event) => void = function (event:Event) {};
  public onclose:(ev:CloseEvent) => void = function (event:CloseEvent) {};
  public onconnecting:() => void = function () {};
  public onmessage:(ev:MessageEvent) => void = function (event:MessageEvent) {};
  public onerror:(ev:ErrorEvent) => void = function (event:ErrorEvent) {};

  constructor(

    url: string,
    protocols: string[] = []

  ) {

    this.url = url;
    this.protocols = protocols;
    this.readyState = WebSocket.CONNECTING;
    this.connect(false);

  }

  /*****************************************************************************
  * connect - the main magic
  *
  * @param {reconnectAttempt} boolean
  */

  public connect(reconnectAttempt: boolean) {
    this.ws = new WebSocket(this.url, this.protocols);

    this.onconnecting();
    this.log('WebSocketService', 'attempt-connect', this.url);

    let localWs = this.ws;
    let timeout = setTimeout(() => {
      this.log('WebSocketService', 'connection-timeout', this.url);
      this.timedOut = true;
      localWs.close();
      this.timedOut = false;
    }, this.timeoutInterval);

    // onOpen Handler
    this.ws.onopen = (event:Event) => {
      clearTimeout(timeout);
      this.log('WebSocketService', 'onopen', this.url);
      this.readyState = WebSocket.OPEN;
      reconnectAttempt = false;
      this.onopen(event);
    };

    // onClose Handler
    this.ws.onclose = (event:CloseEvent) => {
      clearTimeout(timeout);
      this.ws = null;
      if (this.forcedClose) {
        this.readyState = WebSocket.CLOSED;
        this.onclose(event);
      } else {
        this.readyState = WebSocket.CONNECTING;
        this.onconnecting();
        if (!reconnectAttempt && !this.timedOut) {
          this.log('WebSocketService', 'onclose', this.url);
          this.onclose(event);
        }
        setTimeout(() => {
          this.connect(true);
        }, this.reconnectInterval);
      }
    };

    // onMessage Handler
    this.ws.onmessage = (event) => {
      this.log('WebSocketService', 'onmessage', this.url, event.data);
      this.onmessage(event);
    };

    // onError Handler
    this.ws.onerror = (event:ErrorEvent) => {
      this.log('WebSocketService', 'onerror', this.url, event);
      this.onerror(event);
    };
  }

  /*****************************************************************************
  * Returns boolean, whether websocket was FORCEFULLY closed.
  *
  * @param {event} task
  * @return boolean
  */

  public send(data:any) {
    if (this.ws) {
      this.log('WebSocketService', 'send', this.url, data);
      return this.ws.send(data);
    } else {
      throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
    }
  }

  /*****************************************************************************
  * Returns boolean, whether websocket was FORCEFULLY closed.
  *
  * @return boolean
  */

  public close():boolean {
    if (this.ws) {
      this.forcedClose = true;
      this.ws.close();
      return true;
    }
    return false;
  }

  /*****************************************************************************
  * Additional public API method to refresh the connection if still open (close,
  * re-open). For example, if the app suspects bad data / missed heart beats,
  * it can try to refresh. Returns boolean, whether websocket was closed.
  *
  * @return boolean
  */

  public refresh():boolean {
    if (this.ws) {
      this.ws.close();
      return true;
    }
    return false;
  }

  /*****************************************************************************
  * log - Debug
  *
  * @param {event} task
  */

  private log(...args: any[]) {
    if (this.debug || WebSocketService.debugAll) {
      console.debug.apply(console, args);
    }
  }
}
