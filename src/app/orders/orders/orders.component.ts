import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { IProduct } from 'src/app/products/iproduct';
import { ProductService } from 'src/app/products/product.service';
import { IOrder, IOrderProduct } from '../iorder';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  //#region Declrations
  orders$: IOrder[] = [];
  products: IProduct[];
  private subscriptions: Subscription[] = [];
  isSmallScreen: boolean;
  //#endregion Declrations

  //#region Constractor
  constructor(
    private responsive: BreakpointObserver,
    private orderService: OrderService,
    private productService: ProductService,
    private router:Router
  ) {}

  //#endregion Constractor

  //#region Angular life cycle
  ngOnInit(): void {
    this.orderService.getSelecteOrder().subscribe((order) => {
      console.log(order);
    });
    
    this.subscriptions = [];
    this.getProducts();
    this.getOrders();
    // catch small screen if changed using BreakpointObserver
    let subResponsive = this.responsive
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches ? true : false;
      });
    this.subscriptions.push(subResponsive);
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
    const orders = this.orderService.getOrders().pipe(
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
    let subOrders = orders.subscribe((data) => {
      this.orders$ = data;
    });
    this.subscriptions.push(subOrders);
  }

  getOrderById(order: IOrder) {
    if (order.Products) {
      order.Products.forEach((product: IOrderProduct, index: number) => {
        order.Products[index].Product = this.products.find(
          (x) => x.ProductId == product.ProductId
        );
      });
    }
    this.orderService.setSelecteOrder(order);
  }
  //#endregion Methods
}
