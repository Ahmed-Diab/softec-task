import { IProduct } from './iproduct';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient
  ) { }
  // get all products
  getProducts():Observable<IProduct[]>{
     return this.http.get<IProduct[]>('products.json');
  }
  // get all product by id
  getProductBy(id:number):Observable<IProduct>{
    return this.http.get<IProduct[]>('products.json').pipe(
      mergeMap((data: IProduct[]) => data),
      filter((res: IProduct) => res.ProductId === id)
    );
 }
   // edit product quantity
  editProductQuantity(productId:number, quantity:number):Observable<{productId:number, quantity:number}> {
    return this.http.post<{productId:number, quantity:number}>('/editProduct', {productId, quantity})
  }
}
