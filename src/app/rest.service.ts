import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://lbeer.pl/rest/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'apiKey': '9q3trguby-;58w223gff!$#^*%@#!@$NVFFGIWZVJ%^*%',
    'appId': '1',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})


export class RestService {

  constructor(private http: HttpClient) {

  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getBeers(): Observable<any> {
    return this.http.get(endpoint + 'beers').pipe(
      map(this.extractData));
  }

  getBewers(): Observable<any> {
    return this.http.get(endpoint + 'bewers').pipe(
      map(this.extractData));
  }

  getBeer(id): Observable<any> {
    return this.http.get(endpoint + 'beers/' + id).pipe(
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
