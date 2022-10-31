import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, FormsModule, ProductsRoutingModule, SharedModule],
  providers: [ProductService],
})
export class ProductsModule {}
