import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
})
export class CatalogueComponent implements OnInit {
  loadingMap: { [slug: string]: boolean } = {};
  buttonVisibleMap: { [slug: string]: boolean } = {};
  itemSelectorMap: { [slug: string]: boolean } = {};
  numberOfItemsMap: { [slug: string]: number } = {};

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.loadProducts().subscribe((data) => {
      this.products = data;

      for (const product of this.products) {
        const slug = product.slug;

        this.loadingMap[slug] = false;
        this.buttonVisibleMap[slug] = true;
        this.itemSelectorMap[slug] = false;
        this.numberOfItemsMap[slug] =
          this.productService.getProductQuantity(slug);
      }
    });
  }

  openItemSelector(slug: string): void {
    this.loadingMap[slug] = true;

    setTimeout(() => {
      this.buttonVisibleMap[slug] = false;
      this.itemSelectorMap[slug] = true;

      if (this.numberOfItemsMap[slug] === 0) {
        this.numberOfItemsMap[slug] = 1;
        this.productService.setProductQuantity(slug, 1);

        const currentCartCount = this.productService.getCartCount();
        this.productService.setCartCount(currentCartCount + 1);
      }

      this.loadingMap[slug] = false;
    }, 1500);
  }

  add(slug: string): void {
    this.numberOfItemsMap[slug]++;
    this.productService.setProductQuantity(slug, this.numberOfItemsMap[slug]);

    const newTotal = this.productService.getCartCount() + 1;
    this.productService.setCartCount(newTotal);
  }

  remove(slug: string): void {
    if (this.numberOfItemsMap[slug] > 0) {
      this.numberOfItemsMap[slug]--;
      this.productService.setProductQuantity(slug, this.numberOfItemsMap[slug]);

      const newTotal = this.productService.getCartCount() - 1;
      this.productService.setCartCount(newTotal);
    }

    if (this.numberOfItemsMap[slug] === 0) {
      this.itemSelectorMap[slug] = false;
      this.buttonVisibleMap[slug] = true;
      this.loadingMap[slug] = false;
    }
  }

  updateRating(product: Product, newRating: number) {
    product.rating = newRating;

    const raw = localStorage.getItem('products');
    if (!raw) return;

    const allProducts: Product[] = JSON.parse(raw);

    const index = allProducts.findIndex((p: Product) => p.id === product.id);

    if (index !== -1) {
      allProducts[index].rating = newRating;
      localStorage.setItem('products', JSON.stringify(allProducts));
    }
    console.log(allProducts);
  }
}
