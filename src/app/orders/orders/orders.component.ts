import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { CustomerService } from 'src/app/customers/customer.service';
import { IProduct } from 'src/app/products/iproduct';
import { ProductService } from 'src/app/products/product.service';
import { Hellper } from 'src/app/shared/hellper';
import { IOrder } from '../iorder';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
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
  // get get Order Total
  getOrderTotal(orderProducts: IProduct[]): number {
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
    let subOrders = orders.subscribe((data) => {
      this.orders$ = data;
    });
    this.subscriptions.push(subOrders);
  }

  // get order Details and navigate to order-details component
  getOrderById(order: IOrder) :void{
    // get order products Details using for each
    order?.Products?.forEach((product: IProduct, index: number) => {
      order.Products[index] = this.products?.find( (o) => o.ProductId == product.ProductId)!;
      order.Products[index].Quantity =  product?.Quantity!;
    });
    // get order customer Details and change SelecteOrder value
    let subCustomer = this.customerService
      .getCustomerBy(order.UserId)
      .subscribe((res) => {
        order.Customer = res;
        this.orderService.setSelecteOrder(order);
        this.router.navigate(['orders/order-details']);
      });
    this.subscriptions.push(subCustomer);
  }
  //#endregion Methods
}
