import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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

  private cartCountKey = 'cartItemCount';
  private cartItemsKey = 'cartItems';
  private cartCountSubject = new BehaviorSubject<number>(this.getCartCount());
  cartCount$ = this.cartCountSubject.asObservable();

  openItemSelector(currentCount: number = 0): number {
    const newCount = currentCount + 1;
    localStorage.setItem(this.cartCountKey, JSON.stringify(newCount));
    this.cartCountSubject.next(newCount); // if you're using BehaviorSubject
    return newCount;
  }

  setCartCount(count: number): void {
    localStorage.setItem(this.cartCountKey, JSON.stringify(count));
    this.cartCountSubject.next(count);
  }

  getCartCount(): number {
    const raw = localStorage.getItem(this.cartCountKey);
    return raw ? JSON.parse(raw) : 0;
  }

  setProductQuantity(slug: string, quantity: number): void {
    const raw = localStorage.getItem(this.cartItemsKey);
    const cart = raw ? JSON.parse(raw) : {};
    cart[slug] = quantity;
    localStorage.setItem(this.cartItemsKey, JSON.stringify(cart));
  }

  getProductQuantity(slug: string): number {
    const raw = localStorage.getItem(this.cartItemsKey);
    const cart = raw ? JSON.parse(raw) : {};
    return cart[slug] ?? 0;
  }
}
