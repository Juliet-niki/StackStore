import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
})
export class CatalogueComponent {
  rating = 0;
  stars = new Array(5);

  setRating(value: number) {
    this.rating = value;
  }
}
