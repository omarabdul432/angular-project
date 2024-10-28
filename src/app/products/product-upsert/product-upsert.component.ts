import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Product } from '../../model/product';
import {
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductserviceService } from '../../services/productservice.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-upsert',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-upsert.component.html',
  styleUrl: './product-upsert.component.scss',
})
export class ProductUpsertComponent implements OnInit {
  products: Product | undefined;
  isEdit: boolean = false;
  id: string = '';

  product: Product = {
    id: '',
    name: '',
    brand: '',
    price: '',
    imageURL: '',
    manufacturedYear: '',
  };

  form!: FormGroup;
  constructor(
    private productSer: ProductserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
    });
    if (this.id) {
      this.productSer.getProductDetail(this.id).subscribe((res:any)=>{
        this.products = res

        this.isEdit = true;
        this.viewFormValue();
      });

      // console.log(this.products);
    }
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null),
      brand: new FormControl(null),
      price: new FormControl(null),
      imageURl: new FormControl(null),
      manufacturedYear: new FormControl(null),
    });
  }

  viewFormValue() {
    this.form.patchValue({
      name: this.products?.name,
      brand: this.products?.brand,
      price: this.products?.price,
      imageURl: this.products?.imageURL,
      manufacturedYear: this.products?.manufacturedYear,
    });
  }

  onSubmit() {
    this.product.name = this.form.value.name;
    this.product.brand = this.form.value.brand;
    this.product.price = this.form.value.price;
    this.product.imageURL = this.form.value.imageURl;
    this.product.manufacturedYear = this.form.value.manufacturedYear;

    if (!this.isEdit) {
      this.product.id = (Math.random() * 10).toString();
      this.productSer.add(this.product).subscribe((res:any)=>{
        // console.log(res)
        this.product=res
        this.router.navigateByUrl('/');
      });

    } else {
      this.product.id=this.id
      this.productSer.updateProduct(this.product).subscribe(()=>{

        this.router.navigateByUrl(`/product/${this.id}`);
      })
    }
    this.form.reset()
  }
  // onSubmit() {
  //   // console.log(this.product);
  //   if(!this.isEdit){
  //     this.product.id=(Math.random()*10).toString()
  //     this.productSer.add(this.product);

  //     this.product = {
  //       id: '',
  //       name: '',
  //       brand: '',
  //       price: '',
  //       imageURL: '',
  //       manufacturedYear: '',
  //     };
  //     this.router.navigateByUrl('/')
  //   }else{
  //     this.router.navigateByUrl(`/product/${this.id}`);
  //   }

  // }
  onBack() {
    if (this.isEdit) {
      this.router.navigateByUrl(`/product/${this.id}`);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
