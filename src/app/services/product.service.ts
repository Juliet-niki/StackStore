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
    this.getCartItems().reduce((sum, item) => sum + (item.quantity || 1), 0)
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

  addToCart(cartItem: Product): void {
    const items = this.getCartItems();
    const existingItem = items.find((item) => item.slug === cartItem.slug);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cartItem.quantity = 1;
      items.push(cartItem);
    }

    this.setCartItems(items);
  }

  removeFromCart(slug: string): void {
    const items = this.getCartItems();
    const updatedItems = items
      .map((item) => {
        if (item.slug === slug) {
          const updatedQty = (item.quantity || 1) - 1;
          return updatedQty > 0 ? { ...item, quantity: updatedQty } : null;
        }
        return item;
      })
      .filter((item) => item !== null) as Product[];

    this.setCartItems(updatedItems);
  }

  setCartItems(items: Product[]): void {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(items));
    const totalQuantity = items.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    this.totalCartItemSubject.next(totalQuantity);
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

  getTotalCartPrice(): number {
    const items = this.getCartItems();
    const totalPrice = items.reduce((sum, item) => {
      const itemTotal = (item.price || 0) * (item.quantity || 1);
      return sum + itemTotal;
    }, 0);
    return totalPrice;
  }
}
