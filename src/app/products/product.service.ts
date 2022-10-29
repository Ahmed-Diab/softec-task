import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, mergeMap, Observable } from 'rxjs';
import { IProduct } from './iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient
  ) { }
  
  getProducts():Observable<IProduct[]>{
     return this.http.get<IProduct[]>('products.json');
  }

  getProductBy(id:number):Observable<IProduct>{
    return this.http.get<IProduct[]>('products.json').pipe(
      mergeMap((data: IProduct[]) => data),
      filter((res: IProduct) => res.ProductId === id)
    );
 }
 
  editProductQuantity(productId:number, quantity:number):Observable<{productId:number, quantity:number}> {
    return this.http.post<{productId:number, quantity:number}>('/editProduct', {productId, quantity})
  }
}
