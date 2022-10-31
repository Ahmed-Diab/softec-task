 import { Component } from '@angular/core';
 import { CustomerTableComponent } from '../customer-table/customer-table.component';
@Component({
  selector: 'softec-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent extends CustomerTableComponent {}
