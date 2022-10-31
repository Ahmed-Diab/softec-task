import { Component } from '@angular/core';
import { IProduct } from 'src/app/products/iproduct';
import { EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'softec-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  //#region Declrations
  @Input() products: IProduct[] | undefined;
  @Input() isOrder: boolean = false;
  @Input() isSmallScreen: boolean;
  @Output() UpdateQuntityEvent = new EventEmitter<IProduct>();
  @Output() AddToOrderEvent = new EventEmitter<IProduct>();
  //#endregion
  constructor() {}
  ngOnInit(): void {}
  //#region Methods
  openAvailablePiecesModal(product: IProduct) {
    this.UpdateQuntityEvent.emit(product);
  }
  addProductToOrder(product: IProduct) {
    this.AddToOrderEvent.emit(product);
  }
  //#endregion
}
