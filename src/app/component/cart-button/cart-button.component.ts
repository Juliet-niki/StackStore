import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css',
})
export class CartButtonComponent implements OnChanges {
  displayLoadSpinner: boolean = false;
  displayAddToCartBtn: boolean = true;
  displayIncrementDecrementBtn: boolean = false;
  displayNumberOfItemSelected: number = 0;
  @Input() productItem: Product = {
    id: 0,
    slug: '',
    name: '',
    price: 0,
    description: '',
    image: '',
    brandName: '',
    rating: 0,
  };
  constructor(private productService: ProductService) {
    if (this.productItem) {
      this.displayNumberOfItemSelected = this.productService.getProductQuantity(
        this.productItem.slug as string
      );
    }
  }

  openDisplayIncrementDecrementBtn(): void {
    this.displayLoadSpinner = true;

    setTimeout(() => {
      this.displayAddToCartBtn = false;
      this.displayIncrementDecrementBtn = true;

      if (this.displayNumberOfItemSelected === 0) {
        this.displayNumberOfItemSelected = 1;
        this.productService.setProductQuantity(
          this.productItem.slug as string,
          1
        );
        this.productService.addToCart(this.productItem);
      }
    }, 900);
  }

  add(): void {
    this.displayNumberOfItemSelected++;
    this.productService.setProductQuantity(
      this.productItem.slug as string,
      this.displayNumberOfItemSelected
    );
    this.productService.addToCart(this.productItem);
  }
  remove(): void {
    if (this.displayNumberOfItemSelected > 0) {
      this.displayNumberOfItemSelected--;
      this.productService.setProductQuantity(
        this.productItem.slug as string,
        this.displayNumberOfItemSelected
      );
      this.productService.removeFromCart(this.productItem.slug!);
    }

    if (this.displayNumberOfItemSelected === 0) {
      this.displayIncrementDecrementBtn = false;
      this.displayAddToCartBtn = true;
      this.displayLoadSpinner = false;
    }
  }

  ngOnInit(): void {
    if (this.productItem) {
      this.displayNumberOfItemSelected = this.productService.getProductQuantity(
        this.productItem.slug as string
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productItem']) {
      this.displayLoadSpinner = false;
      this.displayAddToCartBtn = true;
      this.displayIncrementDecrementBtn = false;
      this.displayNumberOfItemSelected = this.productService.getProductQuantity(
        this.productItem.slug as string
      );
    }
    if (this.displayNumberOfItemSelected > 0) {
      this.displayLoadSpinner = false;
      this.displayAddToCartBtn = false;
      this.displayIncrementDecrementBtn = true;
      this.displayNumberOfItemSelected = this.productService.getProductQuantity(
        this.productItem.slug as string
      );
    }
  }
}
