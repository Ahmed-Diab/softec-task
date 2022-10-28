import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../iproduct';
 import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent  implements OnInit {
  @Input() products: IProduct[];
  @Output() UpdateQuntityEvent = new EventEmitter<IProduct>();
  @Output() AddToOrderEvent = new EventEmitter<IProduct>();

  constructor() {}

  ngOnInit(): void {}
  openAvailablePiecesModal(product: IProduct) {
    this.UpdateQuntityEvent.emit(product);
  }
  addProductToOrder(product: IProduct) {
    this.AddToOrderEvent.emit(product);
  }

}
