import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrder } from '../../iorder';

@Component({
  selector: 'app-ordar-table',
  templateUrl: './ordar-table.component.html',
  styleUrls: [],
  
})
export class OrdarTableComponent implements OnInit {
  @Input() orders:IOrder[];
  @Output() OrderEvent = new EventEmitter<IOrder>();;
  constructor() { }

  ngOnInit(): void {
  }

  getOrder(order:IOrder){
    this.OrderEvent.emit(order);
  }

}
