import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, FormsModule, ProductsRoutingModule],
  providers: [ProductService],
})
export class ProductsModule {}
