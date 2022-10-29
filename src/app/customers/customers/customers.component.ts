import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../icustomer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
//#region Declrations
  customers$:Observable<ICustomer[]>
  //#endregion
  //#region Constractor
  constructor(
    private customerService:CustomerService
  ) { }
  //#endregion

  //#region Angular life cycle
  ngOnInit(): void {
    this.getCustomers();
  }
//#region 

//#region Methods
  getCustomers(){
   this.customers$ = this.customerService.getCustomers();
  }
  //#region 

}
