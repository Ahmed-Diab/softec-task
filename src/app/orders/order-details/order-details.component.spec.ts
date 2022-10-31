import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OrderDetailsComponent } from './order-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CustomerService } from 'src/app/customers/customer.service';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let orderService: OrderService;
  let customerService: CustomerService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
    orderService = TestBed.inject(OrderService);
    customerService = TestBed.inject(CustomerService);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open window alert', () => {
    spyOn(window, 'alert');
    component.saveOrder();
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith(
      'This feature will be added soon'
    );
  });

  it('navigate to /products', () => {
    spyOn(router, 'navigate').and.stub();
    component.cancelOrder();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('get Order Details', () => {
    component.getOrderDetails(1241);
    fixture.detectChanges();
    orderService.getOrder(1241).subscribe((res) => {
      expect(component.order).toEqual(res);
    });
  });

  it('get Customer Order Details', () => {
    component.getOrderCustomerDetals('1231-1244-1233');
    fixture.detectChanges();
    customerService.getCustomerBy('1231-1244-1233').subscribe((res) => {
      expect(component.order.Customer).toEqual(res);
    });
  });

  it('get Order Products Details', () => {
    orderService.getOrder(1241).subscribe((res) => {
      component.order = res;
      fixture.detectChanges();
    });
    component.getOrderProductsDetails(component.order);
    fixture.detectChanges();
    let totalOrders = orderService.getOrderProductsTotal(component.order.Products)
    expect(totalOrders).toBeGreaterThanOrEqual(0)
  });
});
