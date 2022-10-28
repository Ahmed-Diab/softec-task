import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../iproduct';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
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
