
import { map } from 'rxjs';
import { IOrder } from '../iorder';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Hellper } from 'src/app/shared/hellper';
import { IProduct } from 'src/app/products/iproduct';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';
import { CustomerService } from 'src/app/customers/customer.service';


@Component({
  selector: 'softec-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends Hellper implements OnInit, OnDestroy {
  //#region Declrations
  orders$: IOrder[] = [];
  products: IProduct[];
  //#endregion Declrations
  //#region Constractor
  constructor(
    public override responsive: BreakpointObserver,
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router,
    private customerService: CustomerService
  ) {
    super(responsive);
  }
  //#endregion Constractor
  //#region Angular life cycle
  ngOnInit(): void {
    this.subscriptions = [];
    this.getProducts();
    this.getOrders();
    this.catchSmallScreen();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  //#endregion Angular life cycle
  //#region Methods
  getProducts(): void {
    let productsSub = this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
    this.subscriptions.push(productsSub);
  }

  getOrders() {
    const orders = this.orderService.getOrders().pipe(
      map((orders) => {
        orders.forEach((order) => {
          // I do this because not all OrderDate at json file in same length and i am lazy to update order date one by one
          order.OrderDate = order.OrderDate.slice(0, 15);
          order.Total = this.orderService.getOrderTotal(
            order.Products,
            this.products
          );
        });
        return orders;
      })
    );
    let subOrders = orders.subscribe((data) => {
      this.orders$ = data;
    });
    this.subscriptions.push(subOrders);
  }
  // get order Details and navigate to order-details component
  navigateToOrderDetails(order: IOrder): void {
    this.router.navigate(['orders/order-details', { orderId: order.OrderId }]);
  }
  //#endregion Methods
}
