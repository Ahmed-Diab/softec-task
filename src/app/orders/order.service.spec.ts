import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IOrder } from './iorder';

describe('OrderService', () => {
  let service: OrderService;
  let order: IOrder = {
    OrderId: 0,
    OrderDate: '',
    UserId: '',
    Products: [],
    PaymentType: '',
    Total: 0,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get all orders', () => {
    service.getOrders().subscribe((result) => {
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  it('get order by id', () => {
    service.getOrder(order.OrderId).subscribe((result) => {
      expect(result).toEqual(order);
    });
  });

   
});
