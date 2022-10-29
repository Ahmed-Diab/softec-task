import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrder } from '../iorder';

@Component({
  selector: 'app-ordar-table',
  templateUrl: './ordar-table.component.html',
  styleUrls: ['./ordar-table.component.scss'],
})
export class OrdarTableComponent implements OnInit {
  //#region Declrations
  @Input() orders: IOrder[];
  @Output() OrderEvent = new EventEmitter<IOrder>();
  //#endregion Declrations
  
  constructor() {}

  ngOnInit(): void {}

  getOrder(order: IOrder) {
    this.OrderEvent.emit(order);
  }
}
