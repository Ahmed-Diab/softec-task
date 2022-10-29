import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../icustomer';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Hellper } from 'src/app/shared/hellper';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent extends Hellper implements OnInit, OnDestroy {
  //#region Declrations
  customers$: Observable<ICustomer[]>;
  //#endregion
  //#region Constractor
  constructor(
    private customerService: CustomerService,
    public override responsive: BreakpointObserver
  ) {
    super(responsive);
  }

  //#endregion

  //#region Angular life cycle
  ngOnInit(): void {
    this.catchSmallScreen();
    this.getCustomers();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  //#region

  //#region Methods
  getCustomers() {
    this.customers$ = this.customerService.getCustomers();
  }
  //#region
}
