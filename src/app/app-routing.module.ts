import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path:'customers', 
    loadChildren:()=> 
       import('./customers/customers.module').then((m)=>m.CustomersModule)
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
