import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomerTableComponent,
    CustomerCardComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
