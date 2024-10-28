import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../services/productservice.service';
import { Product } from '../model/product';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductCardComponent } from './product-card/product-card.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = []

  constructor(private productSer: ProductserviceService) { }
  ngOnInit() {
    this.productSer.get().subscribe((res) => {
      console.log(res)
      this.products = res
    })
  }
}
