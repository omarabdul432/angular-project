import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ProductUpsertComponent } from './products/product-upsert/product-upsert.component';
import { UserAuthService } from './services/user-auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductUpsertComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

//  constructor(private auth:UserAuthService){
//   this.auth.autologin()
//  }


// productList:Product[]=[
//   {
//     name:'IPhone 15 ProMax',
//     price:'14500',
//     imageURL:'https://images.macrumors.com/article-new/2023/09/iphone-15-pro-gray.jpg'
//   },
//   {
//         name:'IPhone 14 ProMax',
//         price:'12500',
//         imageURL:'https://images.unsplash.com/photo-1677144646095-ecd95d06cd71?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBob25lJTIwMTQlMjBwcm98ZW58MHx8MHx8fDA%3D'
//       }
// ]
  // onProduct(product:Product){
  //   this.productList.push(product)
  // }
}
