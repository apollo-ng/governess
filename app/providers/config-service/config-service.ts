import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

/*

*/

let propertiesURL: string = 'https://randomuser.me/api/?results=10',
    favoritesURL: string = propertiesURL + '/favorites';

@Injectable()

export class ConfigService {

  public data: any = null;
  public http: Http;

/*
  constructor(http: Http) {
      console.log('config service init');
      this.http = http;
  }

  public load(): any {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {

      this.http.get('https://randomuser.me/api/?results=10')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.results;
          resolve(this.data);
        });
    });
  }
*/

  constructor (http: Http) {
      this.http = http;
  }

  public findAll(): any {
      return this.http.get(propertiesURL)
          .map(res => res.json())
          .catch(this.handleError);
  }

  public favorite(property: any): any {
      let body: string = JSON.stringify(property);
      let headers: any = new Headers({ 'Content-Type': 'application/json' });
      let options: any = new RequestOptions({ headers: headers });
      return this.http.post(favoritesURL, body, options)
          .map(res => res.json())
          .catch(this.handleError);
  }

  public handleError(error: any): any {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}

