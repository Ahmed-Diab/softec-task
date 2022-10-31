import { Observable } from 'rxjs';
import { ICustomer } from '../icustomer';
import { Hellper } from 'src/app/shared/hellper';
import { CustomerService } from '../customer.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'softec-customers',
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
  //#endregion

  //#region Methods
  getCustomers() {
    this.customers$ = this.customerService.getCustomers();
  }
  //#endregion
}
