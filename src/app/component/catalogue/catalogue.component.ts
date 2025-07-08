import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { CartButtonComponent } from '../cart-button/cart-button.component';
import { NgOptimizedImage } from '@angular/common';

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
    NgOptimizedImage,
  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
})
export class CatalogueComponent implements OnInit {
  @Input() products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (this.products.length === 0) {
      this.productService.loadProducts().subscribe((data) => {
        this.products = data;
      });
    }
  }

  updateRating(product: Product, newRating: number) {
    product.rating = newRating;

    const getProducts = localStorage.getItem('products');
    if (!getProducts) return;

    const products: Product[] = JSON.parse(getProducts);

    const index = products.findIndex((p: Product) => p.id === product.id);

    if (index !== -1) {
      products[index].rating = newRating;
      localStorage.setItem('products', JSON.stringify(products));
    }
  }
}
