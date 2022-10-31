import { IOrder } from './iorder';
import { Injectable } from '@angular/core';
import { IProduct } from '../products/iproduct';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, mergeMap, Observable } from 'rxjs';
import { CustomerService } from '../customers/customer.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //#region constractor
  private orderProducts$ = new BehaviorSubject<IProduct[] | []>([]);
  constructor(private httpClient: HttpClient, private customerService:CustomerService) {}
  //#endregion

  //#region Methods
  setOrderProducts(products: IProduct[]): void {
    this.orderProducts$.next(products);
  }

  getOrderProducts(): Observable<IProduct[]> {
    return this.orderProducts$.asObservable();
  }

  getOrders(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>('orders.json');
  }

  // get order by id
  getOrder(orderId: number): Observable<IOrder> {
    return this.httpClient.get<IOrder[]>('orders.json').pipe(
      mergeMap((data: IOrder[]) => data),
      filter((res: IOrder) => res.OrderId === orderId)
    );
  }
  // create new order
  addOrder(order: IOrder): void {}

  // get get Order Total
  getOrderTotal(orderProducts: IProduct[], products: IProduct[]): number {
    let total = 0;
    orderProducts.forEach((product, ind) => {
      let price = products.find(
        (x) => x.ProductId == product.ProductId
      )?.ProductPrice;
      total += price != null ? price * orderProducts[ind].Quantity : 0;
    });
    return total;
  }

  getOrderProductsTotal(orderProducts: IProduct[]): number {
    let total = 0;
    orderProducts.forEach((product) => {
      total += product.ProductPrice * product.Quantity;
    });
    return total;
  }

  initOrderObject(): IOrder {
    return {
      OrderId: 0,
      OrderDate: new Date().toDateString(),
      UserId: '',
      Products: [],
      PaymentType: 'cash',
      Total: 0,
      Customer: this.customerService.initCustomerObject(),
    };
  }
  //#endregion
}
