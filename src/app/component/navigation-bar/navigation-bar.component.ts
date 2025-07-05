import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent {
  totalCartItem = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.totalCartItem$.subscribe((count) => {
      this.totalCartItem = count;
    });
  }
}
