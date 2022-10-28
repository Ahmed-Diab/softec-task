import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { OrdarTableComponent } from './orders/ordar-table/ordar-table.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    OrdersComponent,
     OrdarTableComponent
   ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
