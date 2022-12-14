import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FakeDataInterceptor } from './interceptors/fake-data.interceptor';
 

@NgModule({
  declarations: [
    NavBarComponent
   ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavBarComponent
   ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FakeDataInterceptor, multi: true },
   ],
})
export class CoreModule { }
