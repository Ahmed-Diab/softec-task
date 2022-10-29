import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, filter, flatMap, map, mergeMap, Subscription } from 'rxjs';
import { CustomerService } from 'src/app/customers/customer.service';
import { ICustomer } from 'src/app/customers/icustomer';
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
    private customerService: CustomerService
  ) {}

  //#endregion Constractor

  //#region Angular life cycle
  ngOnInit(): void {
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
  // get get Order Total
  getOrderTotal(orderProducts: IOrderProduct[]): number {
    let total = 0;
    orderProducts.forEach((product, ind) => {
      let price = this.products.find(
        (x) => x.ProductId == product.ProductId
      )?.ProductPrice;
      total += price != null ? price * orderProducts[ind].Quantity : 0;
    });
    return total;
  }

  getOrders() {
    const orders = this.orderService.getOrders().pipe(
      map((orders) => {
        orders.forEach((order) => {
          // I do this because not all OrderDate at json file in same length and i am lazy to update order date one by one
          order.OrderDate = order.OrderDate.slice(0, 15);
          order.Total = this.getOrderTotal(order.Products);
        });
        return orders;
      })
    );
    this.subscriptions.push(
      orders.subscribe((data) => {
        this.orders$ = data;
      })
    );
  }

  // get order Details
  getOrderById(order: IOrder) {
    if (order.Products) {
      // get order products Details using for each
      order.Products.forEach((product: IOrderProduct, index: number) => {
        this.productService.getProductBy(product.ProductId).subscribe((pro) => {
          order.Products[index].Product = pro;
        });
      });
    }
    // get order customer Details and change SelecteOrder value
    this.customerService.getCustomerBy(order.UserId).subscribe((res) => {
      order.Customer = res;
      this.orderService.setSelecteOrder(order);
    });
  }

  //#endregion Methods
}
