import { CategoryModel } from './../interfaces/category.interface';
import { ProductCategory } from './../enums/product-category.enum';
import { tap, catchError } from 'rxjs/operators';
import { API_SERVER } from './../../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any[];
  categories: CategoryModel [];
  selectedCategoryProducts: any [];
  currentSelectedProduct;
  cart: any[];
  cartIds;
  currentDeliveryLocation = '';
  storeDeliveryLocation = '';
  currentTotal = 0;
  subtotal = 0;
  distance = 0;
  dc = 0;
  rp_used = 0;
  price_per_km = 0;
  minimum_km_flat_price = 0;
  minimum_flat_price = 0;
  minimum_order_price = 0;
  storeLocation = '';
  storeGeoLocation = '';
  selectedProductCategory: CategoryModel;
  constructor(private http: HttpClient) { 
    this.categories = [
      {
        id: ProductCategory.LUCBAN,
        category: 'Lucban Delicacies',
        active: true,
        products: []
      },
      {
        id: ProductCategory.CEBU,
        category: 'Cebu Delicacies',
        active: false,
        products: []
      },
      {
        id: ProductCategory.VIGAN,
        category: 'Vigan Delicacies',
        active: false,
        products: []
      },
      {
        id: ProductCategory.NUEVA_ECIJA,
        category: 'Nueva Ecija Delicacies',
        active: false,
        products: []
      }
    ];
    this.selectedProductCategory = this.categories[0];
  }

  getProducts (): Observable<any[]> {
    return this.http.get<any[]>(API_SERVER + `product`)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError('getProducts', []))
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
