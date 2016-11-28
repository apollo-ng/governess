import { Injectable } from '@angular/core';

////////////////////////////////////////////////////////////////////////////////

@Injectable (

)

/*******************************************************************************
 *
 *   WebSocketService
 *
 */

export class WebSocketService {

  // These can be altered by calling code
  public debug: boolean = false;

  // Max Time in ms to wait before attempting to reconnect (after a close)
  public reconnectMaxInterval: number = 30000;
  // Time in ms to wait for WebSocket to open (before aborting and retrying)
  public timeoutInterval: number = 1000;

  // Should only be used to read WebSocket readyState
  public readyState: number;

  // Whether WebSocket was forced to close by this client
  private forcedClose: boolean = false;
  // Whether WebSocket opening timed out
  private timedOut: boolean = false;

  // List of WebSocket sub-protocols
  // private protocols: string[] = [];

  // The underlying WebSocket
  private ws: WebSocket;
  public url: any;
  private reconnectAttempt: number;

  // Setting this to true is the equivalent of setting all instances
  // of WebSocketService.debug to true
  public static debugAll: boolean = false;

  /*****************************************************************************
   * constructor
   */

  constructor(
    // url: any,
    // url: string,
    // protocols: string[] = [],

  ) {

    // this.url = url;
    this.url = 'ws://localhost:8765';
    // this.protocols = protocols;
    this.readyState = WebSocket.CONNECTING;
    this.reconnectAttempt = 0;
    this.connect(false);

  }

  // Setup default 'noop' event handlers
  public onopen: (ev: Event) => void = function (event: Event): void { this.log(event); };
  public onclose: (ev: CloseEvent) => void = function (event: CloseEvent): void  { this.log(event); };
  public onconnecting: () => void = function (): void { this.log(event); };
  public onmessage: (ev: MessageEvent) => void = function (event: MessageEvent): void { this.log(event); };
  public onerror: (ev: ErrorEvent) => void = function (event: ErrorEvent): void { this.log(event); };

  /*****************************************************************************
   * connect - the main magic
   * @param {autoReconnect} boolean
   */

  public connect(autoReconnect: boolean): void {
    console.log('trying to connect to this.url', this.url);
    // this.ws = new WebSocket(this.url, this.protocols);
    this.ws = new WebSocket(this.url);
    this.onconnecting();
    this.log('WebSocketService', 'attempt-connect', this.url);

    let localWs: any = this.ws;
    let timeout: any = setTimeout(
      () => {
        this.log('WebSocketService', 'connection-timeout', this.url);
        this.timedOut = true;
        localWs.close();
        this.timedOut = false;
      },
      this.timeoutInterval
    );

    // onOpen Handler
    this.ws.onopen = (event: Event) => {
      clearTimeout(timeout);
      this.log('WebSocketService', 'onopen', this.url);
      this.readyState = WebSocket.OPEN;
      autoReconnect = false;
      this.reconnectAttempt = 0;
      this.onopen(event);
    };

    // onClose Handler
    this.ws.onclose = (event: CloseEvent) => {
      clearTimeout(timeout);
      this.ws = null;
      if (this.forcedClose) {
        this.readyState = WebSocket.CLOSED;
        this.onclose(event);
      } else {
        this.readyState = WebSocket.CONNECTING;
        this.onconnecting();
        if (!autoReconnect && !this.timedOut) {
          this.log('WebSocketService', 'onclose', this.url);
          this.onclose(event);
        }
        this.reconnectAttempt++;
        // let interval: number = this.exponentialBackoff(this.reconnectAttempt, 250);
        // let interval: number = this.fibonacciBackoff(this.reconnectAttempt, 250);
        let interval: number = this.getBackoffTimer('fibonacci', this.reconnectAttempt, 250);
        this.log('WebSocketService', 'recon try #', this.reconnectAttempt);
        this.log('WebSocketService', 'new interval', interval);
        setTimeout(
          () => {
            this.connect(true);
          },
          interval
        );
      }
    };

    // onMessage Handler
    this.ws.onmessage = (event) => {
      this.log('WebSocketService', 'onmessage', this.url, event.data);
      this.onmessage(event);
    };

    // onError Handler
    this.ws.onerror = (event: ErrorEvent) => {
      this.log('WebSocketService', 'onerror', this.url, event);
      this.onerror(event);
    };
  }

  /*****************************************************************************
   * Returns boolean, whether websocket was FORCEFULLY closed.
   * @param {event} task
   * @return boolean
   */

  public send(data: any): any {
    if (this.ws) {
      this.log('WebSocketService', 'send', this.url, data);
      return this.ws.send(data);
    } else {
      throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
    }
  }

  /*****************************************************************************
   * Returns boolean, whether websocket was FORCEFULLY closed.
   * @return boolean
   */

  public close(): boolean {
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
   * @return boolean
   */

  public refresh(): boolean {
    if (this.ws) {
      this.ws.close();
      return true;
    }
    return false;
  }

  /*****************************************************************************
   * log - Debug
   * @param {event} task
   */

  private log(...args: any[]): void {
    if (this.debug || WebSocketService.debugAll) {
      console.debug.apply(console, args);
    }
  }

  /*****************************************************************************
   *  getBackoffTimer - select, call and return next Backoff-Timer
   */

  private getBackoffTimer(mode: string, attempt: number, delay: number): number {

    let res: number;
    let timer: number = 15000;

    switch (mode) {

      // Fibonacci Backoff

      case 'fibonacci':

        let act: number = 1;

        if (attempt > act) {
          let prev: number = 1;
          act = 2;
          for (let i: number = 2; i < attempt; i++) {
            let next: number = prev + act;
            prev = act;
            act = next;
          }
        }

        res = Math.floor(Math.random() * act * delay);

        if (res < this.reconnectMaxInterval) {
          timer = res;
        } else {
          this.reconnectAttempt--;
          timer = Math.floor(
                  Math.random()
                * (this.reconnectMaxInterval - 1000 + 1))
                + 1000;
        }

      break;

      // Exponential Backoff

      case 'exponential':

        res = Math.floor(Math.random() * Math.pow(2, attempt) * delay);

        if (res < this.reconnectMaxInterval) {
          timer = res;
        } else {
          this.reconnectAttempt--;
          timer = this.reconnectMaxInterval;
        }

      break;
    }
    return timer;
  }

}
