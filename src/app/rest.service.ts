import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { RestBeerFilter } from './filter/rest.beer';
import { RestBewerFilter } from './filter/rest.bewer';
import { environment } from '../environments/environment';

const endpoint = environment.apiDomain;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'apiKey': '9q3trguby-;58w223gff!$#^*%@#!@$NVFFGIWZVJ%^*%',
    'appId': '1',
  })
};

@Injectable({
  providedIn: 'root'
})

export class RestService {

  encodeQueryData = function(data) {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }
  
  constructor(private http: HttpClient) {

  }

  private extractBeers(res: Response) {
    let body = res;
    return body || {'beers': [], 'count_all': 0, 'limit': 0, 'offset': 0};
  }
  private extractBewers(res: Response) {
    let body = res;
    return body || {'bewers': [], 'count_all': 0, 'limit': 0, 'offset': 0};
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getBeers(filter: RestBeerFilter): Observable<any> {
    let query = '?' + this.encodeQueryData({
      'bwr': filter.bwr || '',
      'name__li': filter.name__li || '',
      'price__from': 'undefined' !== typeof filter.price__from ? filter.price__from : '',
      'price__to': 'undefined' !== typeof filter.price__to ? filter.price__to : '',
      'country_code': filter.country_code || '',
      'type': filter.type || '',
      'limit': 'undefined' !== typeof filter.limit ? filter.limit : '',
      'offset': 'undefined' !== typeof filter.offset ? filter.offset : '',
    });
    console.log('query: ' + endpoint + 'beers' + query);
    
    return this.http.get(endpoint + 'beers' + query).pipe(
      map(this.extractBeers));
  }

  getBewers(filter): Observable<any> {
    let query = '?' + this.encodeQueryData({
      'limit': 'undefined' !== typeof filter.limit ? filter.limit : '',
      'offset': 'undefined' !== typeof filter.offset ? filter.offset : '',
    });
    console.log('query: ' + endpoint + 'bewers' + query);
    
    return this.http.get(endpoint + 'bewers' + query).pipe(
      map(this.extractData));
  }

  getBewersSelect(filter : RestBewerFilter): Observable<any> {
    let query = '?' + this.encodeQueryData({
      'limit': 'undefined' !== typeof filter.limit ? filter.limit : '',
      'offset': 'undefined' !== typeof filter.offset ? filter.offset : '',
    });
    console.log('query: ' + endpoint + 'bewers' + query);
    
    return this.http.get(endpoint + 'bewers' + query).pipe(
      map(this.extractData));
  }

  getBeer(id): Observable<any> {
    return this.http.get(endpoint + 'beers/' + id).pipe(
      map(this.extractData));
  }

  getBeerTypes(): Observable<any> {
    return this.http.get(endpoint + 'type').pipe(
      map(this.extractData));
  }

  getBeerTypeSelect(): Observable<any> {
    return this.http.get(endpoint + 'type').pipe(
      map(this.extractData));
  }

  getCountryCodes(): Observable<any> {
    console.log('query: ' + endpoint + 'country');
    
    return this.http.get(endpoint + 'country').pipe(
      map(this.extractData));
  }

  getCountrySelect(): Observable<any> {
    console.log('query: ' + endpoint + 'country');
    
    return this.http.get(endpoint + 'country').pipe(
      map(this.extractData));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
