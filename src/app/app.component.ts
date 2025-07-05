import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-app';

  cartCount = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }
}
