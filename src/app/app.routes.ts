import { Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    component: CatalogueComponent,
  },
  {
    path: 'product/:slug',
    component: ProductDetailsComponent,
  },
];
