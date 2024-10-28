import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product: Product = {
    id: '',
    name: '',
    brand: '',
    price: '',
    imageURL: '',
    manufacturedYear: '',
  };

  constructor(private route: Router) {}

  onDetails() {
    this.route.navigate(['product', this.product.id]);
  }
}
