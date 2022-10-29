import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from './iorder';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //#region constractor
  private selectedOrder$: BehaviorSubject<IOrder | null> = new BehaviorSubject<IOrder | null>(null);
  constructor(private httpClient: HttpClient) {}
  //#endregion

  //#region Methods
  setSelecteOrder(order: IOrder):void {
    this.selectedOrder$.next(order);
  }
  getSelecteOrder():Observable<IOrder | null> {
   return this.selectedOrder$.asObservable();
  }

  getOrders(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>('orders.json');
  }
  // get order by id
  getOrder(orderId: number): Observable<IOrder> {
    return this.httpClient.get<IOrder>('getOrder', { params: { orderId } });
  }
  // create new order
  addOrder(order: IOrder):void {}
  //#endregion
}
