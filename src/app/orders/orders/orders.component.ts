import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { IProduct } from 'src/app/products/iproduct';
import { ProductService } from 'src/app/products/product.service';
import { IOrder } from '../iorder';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit , OnDestroy{
  //#region Declrations
  orders$: IOrder[] = [];
  products:IProduct[];
  private subscriptions: Subscription[] = [];
  //#endregion Declrations

  //#region Constractor
  constructor(private orderRepository: OrderService, private productService:ProductService) {}
  
  //#endregion Constractor

  //#region Angular life cycle
  ngOnInit(): void {
    this.getProducts();
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
   //#endregion Angular life cycle
  //#region Methods
  getProducts() {
    let productsSubscription = this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
    this.subscriptions.push(productsSubscription);
  }
  getOrders() {
    const orders = this.orderRepository.getOrders().pipe(
      map((orders) => {
        orders.forEach((order) => {
          // I do this because not all OrderDate at json file in same length and i am lazy to update order date one by one
          order.OrderDate = order.OrderDate.slice(0, 15);
          if (order.Products) {
            let total = 0;
            order.Products.forEach((product, ind) => {
              let price = this.products.find(
                (x) => x.ProductId == product.ProductId
              )?.ProductPrice;
              total += price != null ? price * order.Products[ind].Quantity : 0;
            });
            order.Total = total;
          }
        });
        return orders;
      })
    );
    orders.subscribe((data) => {
      this.orders$ = data;
    });
  }
  //#endregion Methods
}
