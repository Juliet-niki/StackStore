import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product/:slug',
    component: ProductDetailsComponent,
  },
];
