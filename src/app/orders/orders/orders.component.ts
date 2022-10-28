import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IOrder } from '../iorder';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders$: IOrder[] = [];
  //#region Declrations

  //#endregion Declrations

  //#region Constractor
  constructor(private orderRepository: OrderService) {}
  //#endregion Constractor

  //#region Angular life cycle
  ngOnInit(): void {
    this.getOrders();
  }
  //#endregion Angular life cycle
  //#region Methods

  getOrders() {
    const orders = this.orderRepository.getOrders().pipe(
      map((orders) => {
        orders.forEach((order) => {
          // I do this because not all OrderDate at json file in same length and i am lazy to update order date one by one 
          order.OrderDate = order.OrderDate.slice(0, 15);
        });
        return orders;
      })
    );

    orders.subscribe((data) => {  this.orders$ = data; });
  }
  //#endregion Methods
}
