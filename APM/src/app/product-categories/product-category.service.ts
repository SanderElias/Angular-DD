import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ProductCategory } from './product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private productsUrl = 'api/productCategories';

  // All product categories
  productCategories$: Observable<ProductCategory[]>;

  constructor(private http: HttpClient) { }

  // Refresh the data.
  refreshData(): void {
    this.start();
  }

  start() {
    this.productCategories$ = this.getCategories();
  }

  private getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.productsUrl)
      .pipe(
        tap(data => console.log('getCategories', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
