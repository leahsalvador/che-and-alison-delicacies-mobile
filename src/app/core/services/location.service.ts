import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { API_SERVER } from './../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  cities: any[];
  brgys: any[];
  constructor(private http: HttpClient) { 
    this.cities = [];
    this.brgys = [];
  }

  getCity (): Observable<any[]> {
    return this.http.get<any[]>(API_SERVER + `city`);
  }
  getBarangay (data: any): Observable<any[]> {
    return this.http.get<any[]>(API_SERVER + `barangay`, {
      params: data
    })
      .pipe(
        tap(_ => this.log('fetched barangays')),
        catchError(this.handleError('getBarangay', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
