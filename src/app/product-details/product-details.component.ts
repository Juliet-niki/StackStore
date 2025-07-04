import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgFor,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
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

  productDetails: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router
  ) {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.productDetails = this.productService.getProductBySlug(slug!);
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }
  }

  loading = false;
  buttonVisible = true;
  itemSelector = false;

  openItemSelector(): void {
    this.loading = true;

    setTimeout(() => {
      this.buttonVisible = false;
      this.itemSelector = true;
    }, 3000);
  }
}
