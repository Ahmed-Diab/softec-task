import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverCellDirective } from './directives/hover-cell.directive';



@NgModule({
  declarations: [
    HoverCellDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HoverCellDirective
  ]
})
export class SharedModule { }
