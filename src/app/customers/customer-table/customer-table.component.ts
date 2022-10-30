import { Component, Input, OnInit } from '@angular/core';
import { ICustomer } from '../icustomer';

@Component({
  selector: 'softec-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss'],
})
export class CustomerTableComponent implements OnInit {
  @Input() customers: ICustomer[];
  constructor() {}
  ngOnInit(): void {}
}
