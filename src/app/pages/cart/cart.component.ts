import { Component, Input, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../../component/navigation-bar/navigation-bar.component';
import { CartButtonComponent } from '../../component/cart-button/cart-button.component';
import { NgFor, NgIf, Location, CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NavigationBarComponent,
    NgIf,
    NgFor,
    CartButtonComponent,
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  @Input() cartItems: Product[] = [];

  constructor(
    private productService: ProductService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.productService.getCartItems();
  }

  getQuantity(slug: string): number {
    return this.productService.getProductQuantity(slug);
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
