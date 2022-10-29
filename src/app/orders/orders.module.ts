import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { OrdarTableComponent } from './ordar-table/ordar-table.component';
import { SharedModule } from '../shared/shared.module';
import { OrdarCardComponent } from './ordar-card/ordar-card.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    OrdersComponent,
     OrdarTableComponent,
     OrdarCardComponent,
     OrderDetailsComponent
   ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
