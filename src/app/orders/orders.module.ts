import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { OrdarTableComponent } from './ordar-table/ordar-table.component';
import { SharedModule } from '../shared/shared.module';
import { OrdarCardComponent } from './ordar-card/ordar-card.component';

@NgModule({
  declarations: [
    OrdersComponent,
     OrdarTableComponent,
     OrdarCardComponent
   ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
