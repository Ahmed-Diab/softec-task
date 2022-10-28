import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from '../iorder';
 
@Component({
  selector: 'app-ordar-card',
  templateUrl: './ordar-card.component.html',
  styleUrls: ['./ordar-card.component.scss']
})
export class OrdarCardComponent implements OnInit {
 @Input() orders:IOrder[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  getOrder(order:IOrder){

  }
}
