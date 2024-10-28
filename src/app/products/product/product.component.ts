import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductserviceService } from '../../services/productservice.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  product: Product | undefined;
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private productservice: ProductserviceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
      // console.log(this.id)
    });

    if (this.id) {
     this.productservice.getProductDetail(this.id).subscribe((res:any)=>{
      this.product=res
     });
    }
  }
  onEdit() {
    this.router.navigate(['product-upsert', this.id]);
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onDelete(){
    this.productservice.deleteProduct(this.id).subscribe(()=>{
    this.router.navigateByUrl('/')  
    })
  }
}
