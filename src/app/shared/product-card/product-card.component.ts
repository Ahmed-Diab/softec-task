import { Component } from '@angular/core';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'softec-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent extends ProductTableComponent {}
