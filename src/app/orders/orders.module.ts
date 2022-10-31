import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrdersComponent } from './orders/orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdarCardComponent } from './ordar-card/ordar-card.component';
import { OrdarTableComponent } from './ordar-table/ordar-table.component';
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
    SharedModule,
    FormsModule
  ]
})
export class OrdersModule { }
