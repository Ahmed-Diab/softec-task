import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
