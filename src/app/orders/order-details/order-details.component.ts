import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Hellper } from 'src/app/shared/hellper';
import { IOrder } from '../iorder';
import { OrderService } from '../order.service';

@Component({
  selector: 'softec-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent extends Hellper implements OnInit, OnDestroy {
  //#region Declrations
  order: IOrder | null;
   //#endregion

  //#region Constractor
  constructor(public override responsive: BreakpointObserver, private orderService: OrderService, private router: Router) {
    super(responsive)
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
    this.catchSmallScreen();
  }

  ngOnDestroy(): void {
    // unsubscribe selected order
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  //#endregion
}
