import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { IOrder } from '../iorder';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  //#region Declrations
  order: IOrder | null;
  private subscriptions: Subscription[] = [];
  //#endregion
  //#region Constractor
  constructor(private orderService: OrderService, private router:Router) {}
  //#endregion
  
  //#region Angular life Cycle
  ngOnInit(): void {
    this.subscriptions.push(
      this.orderService.getSelecteOrder().subscribe((res) => {
          console.log("🚀 ~ file: order-details.component.ts ~ line 25 ~ OrderDetailsComponent ~ this.orderService.getSelecteOrder ~ res", res)
          res != null ? this.order = res : this.router.navigate(['orders']);
      })
    );
  }

  ngOnDestroy(): void {
    this;
  }

  //#endregion
}
