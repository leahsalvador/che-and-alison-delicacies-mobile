import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SERVER, API_SERVER } from './../../../environments/environment';
import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable,
  of
} from 'rxjs';
import {
  catchError,
  tap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  total_rp = 0;
  redirectUrl: string;
  userData;

  constructor(private http: HttpClient, private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('user_data').then(data => {
      // Parameters obj-
      this.userData = data;
      this.total_rp = this.userData.customer.total_reward_point;
    }, (error) => {
      console.log(error);
    });
  }

  getTotalRP (data: any): Observable<any[]> {
    return this.http.get<any[]>(API_SERVER + `customer/total_rp`, {
      params: data
    })
      .pipe(
        tap(_ => this.log('fetched customer/total_rp')),
        catchError(this.handleError('getTotalRP', []))
      );
  }

  login(data: any): Observable < any > {
    return this.http.post < any > (API_SERVER + 'login', data)
      .pipe(
        tap(_ => this.isLoggedIn = true),
        catchError(this.handleError('login', []))
      );
  }

  logout(data: any): Observable < any > {
    return this.http.post < any > (API_SERVER + 'logout', data)
      .pipe(
        tap(_ => this.isLoggedIn = true),
        catchError(this.handleError('logout', []))
      );
  }

  register(data: any): Observable < any > {
    return this.http.post < any > (API_SERVER + 'register', data);
  }

  private handleError < T > (operation = 'operation', result ?: T) {
    return (error: any): Observable < T > => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}