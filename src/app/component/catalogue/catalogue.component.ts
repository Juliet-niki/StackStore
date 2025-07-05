import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { CartButtonComponent } from '../cart-button/cart-button.component';

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
    CartButtonComponent,
  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.loadProducts().subscribe((data) => {
      this.products = data;
    });
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
  }
}
