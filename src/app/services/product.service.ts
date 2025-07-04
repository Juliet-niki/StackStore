import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localStorageKey = 'products';

  constructor(private http: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    const stored = localStorage.getItem(this.localStorageKey);

    if (stored) {
      return of(JSON.parse(stored));
    } else {
      return this.http
        .get<Product[]>('/assets/products.json')
        .pipe(
          tap((products) =>
            localStorage.setItem(this.localStorageKey, JSON.stringify(products))
          )
        );
    }
  }

  getProducts(): Product[] {
    const stored = localStorage.getItem(this.localStorageKey);
    return stored ? JSON.parse(stored) : [];
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((p) => p.slug === slug);
  }
}
