import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CustomerService } from 'src/app/customers/customer.service';
import { ICustomer } from 'src/app/customers/icustomer';
import { IProduct } from 'src/app/products/iproduct';
import { ProductService } from 'src/app/products/product.service';
import { Hellper } from 'src/app/shared/hellper';
import { IOrder } from '../iorder';
import { OrderService } from '../order.service';

@Component({
  selector: 'softec-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent
  extends Hellper
  implements OnInit, OnDestroy
{
  //#region Declrations
  order: IOrder;
  orderId: number = 0;
  customers$: Observable<ICustomer[]>;
  orders$: Observable<IOrder[]>;
  products: IProduct[] = [];
  //#endregion

  //#region Constractor
  constructor(
    public override responsive: BreakpointObserver,
    private productService: ProductService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(responsive);
    this.order = this.orderService.initOrderObject();
  }
  //#endregion

  //#region Angular life Cycle
  ngOnInit(): void {
    this.catchSmallScreen();
    this.orderId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('orderId')!
    );
    if (this.orderId) {
      this.getOrderDetails(this.orderId);
    } else {
      this.customers$ = this.customerService.getCustomers();
      this.getNewOrderProducts();
      if (this.order.Products.length == 0) this.router.navigate(['/products']);    
    }
  }

  ngOnDestroy(): void {
    // unsubscribe selected order
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  //#endregion

  //#region Methods
  getOrderDetails(orderId: number):void {
    this.orderId = orderId;
    let subOrder = this.orderService.getOrder(orderId).subscribe((res) => {
      this.getOrderProductsDetails(res);
      this.getOrderCustomerDetals(res.UserId);
    });
    this.subscriptions.push(subOrder);
  }

// get order customer Details 
  getOrderCustomerDetals(userId: string):void {
    let subCustomer = this.customerService
      .getCustomerBy(userId)
      .subscribe((cust) => {
        this.order.Customer = cust;
      });
    this.subscriptions.push(subCustomer);
  }

 //get order products Details
  getOrderProductsDetails(order: IOrder):void {
    order?.Products?.forEach((product: IProduct, index: number) => {
      let getProduct = this.productService
        .getProductBy(product.ProductId)
        .subscribe((pro) => {
          order.Products[index] = pro;
          order.Products[index].Quantity = product?.Quantity;
        });
      this.subscriptions.push(getProduct);
    });
    this.order.PaymentType = order.PaymentType.toLocaleLowerCase();
    this.order = order;
  }

//get New Order Products from products page
  getNewOrderProducts():void {
    this.orderService.getOrderProducts().subscribe((res) => {
      if (res != null) this.order.Products.push(...res);
      this.order.Total = this.orderService.getOrderProductsTotal(this.order.Products);      
    });
  }

  cancelOrder() :void{
    this.order = this.orderService.initOrderObject();
    this.orderService.setOrderProducts([]);
    this.router.navigate(['/products']);
  }
  saveOrder() :void{
      window.alert('This feature will be added soon')
  }

  getProducts():void {
    let subProducts = this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.products.forEach((x) => (x.Quantity = 1));
    });
    this.subscriptions.push(subProducts);
  }
  //#endregion
}
