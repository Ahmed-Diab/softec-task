import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/orders/order.service';

@Component({
  selector: 'softec-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  //#region Declrations
  subscriptions: Subscription[] = [];
  orderProductsLength: number;
  //#endregion

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getNewOrderProducts();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  //#region Methods
  getNewOrderProducts() {
     this.orderService
      .getOrderProducts()
      .subscribe((res) => {
        if (res != null) this.orderProductsLength = res.length;
      });
   }
  //#endregion
}
