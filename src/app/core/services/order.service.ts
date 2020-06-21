import { API_SERVER } from './../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrder (data: any): Observable<any[]> {
    return this.http.get<any[]>(API_SERVER + `order`, {
      params: data
    })
      .pipe(
        tap(_ => this.log('fetched orders')),
        catchError(this.handleError('getOrder', []))
      );
  }

  getInbox (data: any): Observable<any[]> {
    return this.http.get<any[]>(API_SERVER + `order/notification`, {
      params: data
    })
      .pipe(
        tap(_ => this.log('fetched orders')),
        catchError(this.handleError('getOrder', []))
      );
  }

  getOrderProduct (data: any): Observable<any[]> {
    return this.http.get<any[]>(API_SERVER + `product/order_product`, {
      params: data
    })
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError('getproduct', []))
      );
  }

  placeOrder(data: any): Observable < any > {
    return this.http.post < any > (API_SERVER + 'order/place_order', data);
  }

  updateOrderStatus(data: any): Observable < any > {
    return this.http.post < any > (API_SERVER + 'order/update_order_status', data);
  }

  updateNote(data: any): Observable < any > {
    return this.http.post < any > (API_SERVER + 'order/update_note', data);
  }

  cancelOrderStatus(data: any): Observable < any > {
    return this.http.post < any > (API_SERVER + 'order/cancel_order_status', data);
  }
  reschedOrderStatus(data: any): Observable < any > {
    return this.http.post < any > (API_SERVER + 'order/resched_order_status', data);
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
