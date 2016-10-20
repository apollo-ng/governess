import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

////////////////////////////////////////////////////////////////////////

export interface WebSocketConfig {
  initialTimeout: number;
  maxTimeout: number;
  reconnectIfNotNormalClose: boolean;
}

////////////////////////////////////////////////////////////////////////

@Injectable (

)

////////////////////////////////////////////////////////////////////////
//
//

export class $WebSocket {

  private static Helpers = class {

    static isPresent(obj: any): boolean {
      return obj !== undefined && obj !== null;
    }

    static isString(obj: any): boolean {
      return typeof obj === 'string';
    }

    static isArray(obj: any): boolean {
      return Array.isArray(obj);
    }

    static isFunction(obj: any): boolean {
      return typeof obj === 'function';
    }

  };

  private reconnectAttempts = 0;
  private sendQueue = [];
  private onOpenCallbacks = [];
  private onMessageCallbacks = [];
  private onErrorCallbacks = [];
  private onCloseCallbacks = [];
  private normalCloseCode = 1000;
  private reconnectableStatusCodes = [4000];
  private socket: WebSocket;
  private dataStream: Subject<any>;
  private internalConnectionState: number;
  private readyStateConstants = {
    'CONNECTING': 0,
    'OPEN': 1,
    'CLOSING': 2,
    'CLOSED': 3,
    'RECONNECT_ABORTED': 4
  };
  private config: any;

  //////////////////////////////////////////////////////////////////////

  constructor(
    private url: string,
    private protocols?: Array<string>,

  ) {
    console.log('$WebSocket Init');
    let match = new RegExp('wss?:\/\/').test(url);
    if (!match) {
      throw new Error('Invalid url provided');
    }
    //this.config = config || { initialTimeout: 500, maxTimeout: 300000, reconnectIfNotNormalClose: false };
    this.config = { initialTimeout: 500, maxTimeout: 300000, reconnectIfNotNormalClose: true };
    this.dataStream = new Subject();
  }

  /*****************************************************************************
   * connect
   * @param {Object} task
   */

  connect(force = false) {
    console.log('$WebSocket connect called');
    let self = this;
    if ( force
      || !this.socket
      || this.socket.readyState !== this.readyStateConstants.OPEN
    ) {
      console.log('$WebSocket trying to open socket...');
      self.socket = this.protocols ? new WebSocket(this.url, this.protocols) : new WebSocket(this.url);

      self.socket.onopen = (ev: Event) => {
        console.log('$WebSocket onOpen: %s', ev);
        this.onOpenHandler(ev);
      };
      self.socket.onmessage = (ev: MessageEvent) => {
        console.log('$WebSocket onNext: %s', ev.data);
        self.onMessageHandler(ev);
        this.dataStream.next(ev);
      };
      this.socket.onclose = (ev: CloseEvent) => {
        console.log('$WebSocket onClose, completed');
        self.onCloseHandler(ev);
      };
      this.socket.onerror = (ev: ErrorEvent) => {
        console.log('$WebSocket onError', ev);
        self.onErrorHandler(ev);
        this.dataStream.error(ev);
      };

    }
  }

  /*****************************************************************************
   * send
   * @param {Object} task
   * @return number
   */

  send(data): Observable<any> {
    console.log('$WebSocket trying to open socket...');
    let self = this;
    if (this.getReadyState() !== this.readyStateConstants.OPEN
            && this.getReadyState() !== this.readyStateConstants.CONNECTING) {
        this.connect();
        console.log('$WebSocket connection opened');
    }
    return Observable.create((observer) => {
        if (self.socket.readyState === self.readyStateConstants.RECONNECT_ABORTED) {
            observer.next('$WebSocket connection has been closed');
        } else {
            self.sendQueue.push({ message: data });
            self.fireQueue();
        }
    });
  };

  /*****************************************************************************
   * getDataStream
   * @param {Object} task
   * @return number
   */

  getDataStream(): Subject<any> {
    return this.dataStream;
  }

  /*****************************************************************************
   * onOpenHandler
   * @param {Object} task
   */

  onOpenHandler(event: Event) {
    console.log('$WebSocket onOpenHandler', event);
    this.reconnectAttempts = 0;
    this.notifyOpenCallbacks(event);
    this.fireQueue();
  };

  /*****************************************************************************
   * notifyOpenCallbacks
   * @param {Object} task
   */

  notifyOpenCallbacks(event) {
    for (let i = 0; i < this.onOpenCallbacks.length; i++) {
        this.onOpenCallbacks[i].call(this, event);
    }
  }

  /*****************************************************************************
   * fireQueue
   * @param {Object} task
   */

  fireQueue() {
    while (this.sendQueue.length && this.socket.readyState === this.readyStateConstants.OPEN) {
      let data = this.sendQueue.shift();

      this.socket.send(
        $WebSocket.Helpers.isString(data.message) ? data.message : JSON.stringify(data.message)
      );
      // data.deferred.resolve();
    }
  }

  /*****************************************************************************
   * notifyCloseCallbacks
   * @param {Object} task
   */

  notifyCloseCallbacks(event) {
    for (let i = 0; i < this.onCloseCallbacks.length; i++) {
      this.onCloseCallbacks[i].call(this, event);
    }
  }

  /*****************************************************************************
   * notifyErrorCallbacks
   * @param {Object} task
   */

  notifyErrorCallbacks(event) {
    for (let i = 0; i < this.onErrorCallbacks.length; i++) {
      this.onErrorCallbacks[i].call(this, event);
    }
  }

  /*****************************************************************************
   * onOpen
   * @param {Object} task
   * @return number
   */

  onOpen(cb) {
    console.log('$WebSocket onOpen', cb);
    this.onOpenCallbacks.push(cb);
    return this;
  };

  /*****************************************************************************
   * onClose
   * @param {Object} task
   * @return number
   */

  onClose(cb) {
    console.log('$WebSocket onClose', cb);
    this.onCloseCallbacks.push(cb);
    return this;
  }

  /*****************************************************************************
   * onError
   * @param {Object} task
   * @return number
   */

  onError(cb) {
    console.log('$WebSocket onError', cb);
    this.onErrorCallbacks.push(cb);
    return this;
  };

  /*****************************************************************************
   * onMessage
   * @param {Object} task
   * @return number
   */

  onMessage(callback, options) {
    if (!$WebSocket.Helpers.isFunction(callback)) {
      throw new Error('Callback must be a function');
    }

    console.log('$WebSocket onMessage', callback, options);

    this.onMessageCallbacks.push({
      fn: callback,
      pattern: options ? options.filter : undefined,
      autoApply: options ? options.autoApply : true
    });
    return this;
  }

  /*****************************************************************************
   * onMessageHandler
   * @param {Object} task
   */

  onMessageHandler(message: MessageEvent) {
    console.log('$WebSocket onMessageHandler', message);
    let self = this;
    let currentCallback;
    for (let i = 0; i < self.onMessageCallbacks.length; i++) {
      currentCallback = self.onMessageCallbacks[i];
      currentCallback.fn.apply(self, [message]);
    }
  };

  /*****************************************************************************
   * onCloseHandler
   * @param {Object} task
   */

  onCloseHandler(event: CloseEvent) {
    console.log('$WebSocket onCloseHandler', event);
    this.notifyCloseCallbacks(event);
    if ((this.config.reconnectIfNotNormalClose && event.code !== this.normalCloseCode)
       || this.reconnectableStatusCodes.indexOf(event.code) > -1) {
        this.reconnect();
    } else {
      this.dataStream.complete();
    }
  };

  /*****************************************************************************
   * onErrorHandler
   * @param {Object} task
   */

  onErrorHandler(event) {
    console.log('$WebSocket onErrorHandler', event);
    this.notifyErrorCallbacks(event);
  };

  /*****************************************************************************
   * reconnect
   * @param {Object} task
   * @return number
   */

  reconnect() {
    this.close(true);
    let backoffDelay = this.getBackoffDelay(++this.reconnectAttempts);
    console.log('Reconnecting in ' + backoffDelay/1000 + ' seconds');
    setTimeout(this.connect(), backoffDelay);
    return this;
  }

  /*****************************************************************************
   * CLOSE
   * @param {Object} task
   * @return number
   */

  close(force: boolean) {
    if (force || !this.socket.bufferedAmount) {
      this.socket.close();
    }
    return this;
  };

  /*****************************************************************************
   * Exponential Reconnect Backoff - Formula by Prof. Douglas Thain
   * http://dthain.blogspot.co.uk/2009/02/exponential-backoff-in-distributed.html
   * @param {Object} task
   * @return number
   */

  getBackoffDelay(attempt) {
    let R = Math.random() + 1;
    let T = this.config.initialTimeout;
    let F = 2;
    let N = attempt;
    let M = this.config.maxTimeout;
    return Math.floor(Math.min(R * T * Math.pow(F, N), M));
  };

  /*****************************************************************************
   * setInternalState -
   * @param {Object} task
   */

  setInternalState(state) {
    if (Math.floor(state) !== state || state < 0 || state > 4) {
      throw new Error('state must be an integer between 0 and 4, got: ' + state);
    }
    this.internalConnectionState = state;
  }

  /**
   * Could be -1 if not initzialized yet
   * @returns {number}
   */

  getReadyState() {
    if (this.socket == null) {
      return -1;
    }
    return this.internalConnectionState || this.socket.readyState;
  }
}
