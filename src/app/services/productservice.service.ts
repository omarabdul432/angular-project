import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


const baseURL = 'https://angular-37d32-default-rtdb.firebaseio.com'

@Injectable({
  providedIn: 'root',
})


export class ProductserviceService {
  constructor(private logger: LoggerService, private http: HttpClient) { }
  productsList: Product[] = []
  get() {
    return this.http.get(baseURL + '/product.json').pipe(map((res: any) => {
      const products = []
      for (let key in res) {
        if (res.hasOwnProperty(key)) {
          const product = { ...res[key], id: key }
          products.push(product)
        }
      }
      return products
    }))
  }
  add(product: Product) {

    const customProduct = {
      name: product.name,
      brand: product.brand,
      price: product.price,
      imageURL: product.imageURL,
      manufacturedYear: product.manufacturedYear

    }
    return this.http.post(baseURL + '/product.json', customProduct)
    // this.productsList.push(product)
    // this.logger.logInfo('Product Added')
  }
  getProductDetail(id: string) {
    return this.http.get(baseURL + `/product/${id}.json`).pipe(map((res) => {

      return { ...res, id }
    }))
  }

  updateProduct(product: Product) {

    const customProduct = {
      name: product.name,
      brand: product.brand,
      price: product.price,
      imageURL: product.imageURL,
      manufacturedYear: product.manufacturedYear
    }
    return this.http.put(baseURL + `/product/${product.id}.json`, customProduct)
  }

  deleteProduct(id: string) {
    return this.http.delete(baseURL + `/product/${id}.json`)
  }
}
