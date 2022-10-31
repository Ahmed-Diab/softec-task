import { IOrder } from './iorder';
import { Injectable } from '@angular/core';
import { IProduct } from '../products/iproduct';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../customers/customer.service';
import { BehaviorSubject, filter, mergeMap, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //#region constractor
  private orderProducts$ = new BehaviorSubject<IProduct[] | []>([]);
  constructor(
    private httpClient: HttpClient,
    private customerService: CustomerService
  ) {}
  //#endregion

  //#region Methods
  //  set orderProducts$ value
  setOrderProducts(products: IProduct[]): void {
    this.orderProducts$.next(products);
  }

  //  get orderProducts$ value as Observable
  getOrderProducts(): Observable<IProduct[]> {
    return this.orderProducts$.asObservable();
  }
  // get all orders
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
  // get Order Products Total for new order
  getOrderProductsTotal(orderProducts: IProduct[]): number {
    let total = 0;
    orderProducts.forEach((product) => {
      total += product.ProductPrice * product.Quantity;
    });
    return total;
  }
  // init Order Object
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
