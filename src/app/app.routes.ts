import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductUpsertComponent } from './products/product-upsert/product-upsert.component';
import { ProductComponent } from './products/product/product.component';
import { UserComponent } from './user/user.component';
import { authGuard } from './services/auth.guard';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'user',component:UserComponent},
    {path:'product-upsert',component:ProductUpsertComponent},
    {path:'product-upsert/:id',component:ProductUpsertComponent},
    {path:'product/:id',component:ProductComponent,canActivate:[authGuard]}
];
