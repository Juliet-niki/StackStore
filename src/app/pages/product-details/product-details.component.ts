import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NavigationBarComponent } from '../../component/navigation-bar/navigation-bar.component';
import { CatalogueComponent } from '../../component/catalogue/catalogue.component';
import { CartButtonComponent } from '../../component/cart-button/cart-button.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgFor,
    MatIconModule,
    FormsModule,
    NgIf,
    NavigationBarComponent,
    CatalogueComponent,
    CartButtonComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  updateRating(product: Product, newRating: number) {
    product.rating = newRating;

    const getProducts = localStorage.getItem('products');
    if (!getProducts) return;

    const allProducts: Product[] = JSON.parse(getProducts);

    const index = allProducts.findIndex((p: Product) => p.id === product.id);

    if (index !== -1) {
      allProducts[index].rating = newRating;
      localStorage.setItem('products', JSON.stringify(allProducts));
    }
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }
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

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.productDetails = this.productService.getProductBySlug(slug!);
  }
}
