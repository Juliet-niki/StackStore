import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../component/navigation-bar/navigation-bar.component';
import { CatalogueComponent } from '../../component/catalogue/catalogue.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationBarComponent, CatalogueComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
