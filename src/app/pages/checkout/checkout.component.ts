import { Component, Input, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../../component/navigation-bar/navigation-bar.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { NgIf, NgFor, CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NavigationBarComponent, NgIf, NgFor, CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  @Input() cartItems: Product[] = [];

  displayLoadSpinner: boolean = false;
  displayPaymentBtn: boolean = true;
  succesfulPayment: boolean = false;
  summaryCart: boolean = true;
  orderId: string = '';

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

  getTotalPrice(): number {
    return this.productService.getTotalCartPrice();
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  checkOut() {
    this.orderId = String(Math.round(Math.random() * 1000000)) + 'BOT';
    this.displayLoadSpinner = true;

    setTimeout(() => {
      this.displayPaymentBtn = false;
      this.succesfulPayment = true;
      this.summaryCart = false;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartItem');
      this.productService.clearLocalStorage();
    }, 1000);
  }
}
