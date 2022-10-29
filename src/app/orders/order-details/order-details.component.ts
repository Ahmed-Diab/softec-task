import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
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
  private subscriptions: Subscription[];
  //#endregion

  //#region Constractor
  constructor(private orderService: OrderService, private router: Router) {
    this.subscriptions = [];
  }
  //#endregion

  //#region Angular life Cycle
  ngOnInit(): void {
    let subOrder = this.orderService
      .getSelecteOrder()
      .pipe(take(1))
      .subscribe((res) => {
        // check if res is not null to navegate to orders page if null
        res != null ? (this.order = res) : this.router.navigate(['orders']);
      });
    this.subscriptions.push(subOrder);
  }

  ngOnDestroy(): void {
    // unsubscribe selected order
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  //#endregion
}
