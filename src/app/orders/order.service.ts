import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from './iorder';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //#region constractor
  constructor(private httpClient: HttpClient) {}
  //#endregion

  //#region Methods
  getOrders(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>('orders.json');
  }
  // get order by id 
  getOrder(orderId:number) { } 
  // create new order
  addOrder(order:IOrder){ } 
  //#endregion
}
