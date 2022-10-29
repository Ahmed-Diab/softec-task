import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../icustomer';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
//#region Declrations
  customers$:Observable<ICustomer[]>
  private subscriptions: Subscription[] = [];
  isSmallScreen: boolean;
  //#endregion
  //#region Constractor
  constructor(
    private customerService:CustomerService,
    private responsive: BreakpointObserver,
  ) { }
 
  //#endregion

  //#region Angular life cycle
  ngOnInit(): void {
    let subResponsive = this.responsive
    .observe([Breakpoints.XSmall])
    .subscribe((result) => {
      this.isSmallScreen = result.matches ? true : false;
    });
  this.subscriptions.push(subResponsive);
    this.getCustomers();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe())
  }
//#region 

//#region Methods
  getCustomers(){
   this.customers$ = this.customerService.getCustomers();
  }
  //#region 

}
