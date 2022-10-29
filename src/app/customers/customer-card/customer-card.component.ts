import { Component, Input, OnInit } from '@angular/core';
import { ICustomer } from '../icustomer';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent implements OnInit {

  @Input() customers:ICustomer[];
  constructor() { }
  
  ngOnInit(): void {
  }

}
