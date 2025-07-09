import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },

  {
    path: 'product/:slug',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },

  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Checkout ',
  },
];
