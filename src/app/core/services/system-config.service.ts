import { tap, catchError } from 'rxjs/operators';
import { API_SERVER } from './../../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigService {

  config: any[];
  company_profile = '';
  constructor(private http: HttpClient) { }

  getSystemConfig (): Observable<any[]> {
    return this.http.get<any[]>(API_SERVER + `system_config`)
      .pipe(
        tap(_ => this.log('fetched system_configs')),
        catchError(this.handleError('getsystem_configs', []))
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
