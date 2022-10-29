import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverCellDirective } from './directives/hover-cell.directive';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductTableComponent } from './product-table/product-table.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductTableComponent,
    HoverCellDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HoverCellDirective,
    ProductCardComponent,
    ProductTableComponent
  ]
})
export class SharedModule { }
