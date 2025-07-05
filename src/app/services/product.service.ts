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
  private cartItemsKey = 'cartItems';
  private cartItemKey = 'cartItem';
  private totalCartItemSubject = new BehaviorSubject<number>(
    this.getCartItems().length
  );

  totalCartItem$ = this.totalCartItemSubject.asObservable();
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

  openItemSelector(initialNumberOfItem: number = 0): number {
    const newNumberOfItems = initialNumberOfItem + 1;
    localStorage.setItem(this.cartItemsKey, JSON.stringify(newNumberOfItems));
    this.totalCartItemSubject.next(newNumberOfItems);
    return newNumberOfItems;
  }

  setCartItems(cartItem: Product): void {
    const items = this.getCartItems();
    items.push(cartItem);
    localStorage.setItem(this.cartItemsKey, JSON.stringify(items));
    this.totalCartItemSubject.next(items.length);
  }

  getCartItems(): Product[] {
    const cartItems = localStorage.getItem(this.cartItemsKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  setProductQuantity(slug: string, quantity: number): void {
    const cartItem = localStorage.getItem(this.cartItemKey);
    const cart = cartItem ? JSON.parse(cartItem) : {};
    cart[slug] = quantity;
    localStorage.setItem(this.cartItemKey, JSON.stringify(cart));
  }

  getProductQuantity(slug: string): number {
    const cartItem = localStorage.getItem(this.cartItemKey);
    const cart = cartItem ? JSON.parse(cartItem) : {};
    return cart[slug] ?? 0;
  }
}
