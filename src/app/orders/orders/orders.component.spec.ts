import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OrdersComponent } from './orders.component';
import { IProduct } from 'src/app/products/iproduct';
import { OrderService } from '../order.service';
import { IOrder } from '../iorder';
import { CustomerService } from 'src/app/customers/customer.service';
import { ProductService } from 'src/app/products/product.service';

describe('OrdersComponent', () => {
  //#region Declrations
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let orderService: OrderService;
  let customerService: CustomerService;
  let productService: ProductService;
  let order: IOrder = {
    OrderId: 1233,
    OrderDate:
      'Wed Sep 18 2019 12:45:37 GMT+0200(Eastern European Standard Time)',
    UserId: '8573-2903-2344',
    Products: [
      {
        Quantity: 20,
        ProductId: 123,
        ProductName: 'Product 1',
        ProductPrice: 123.5,
        AvailablePieces: 25,
        ProductImg:
          'https://www.decolore.net/wp-content/uploads/2017/04/product-mock-up-set-2.jpg',
      },
    ],
    PaymentType: 'online',
    Total: 0,
    Customer: {
      Id: '8573-2903-2344',
      Name: 'Ahmed Hossam',
      Email: 'Ahmed.Hossam@gmail.com',
      Phone: '01025458780',
      Address: '234 Al Abageyah, Qesm Al Khalifah, Cairo Governorate',
      RegisterDate:
        'Wed Sep 18 2019 12:35:14 GMT+0200 (Eastern European Standard Time)',
    },
  };
  let products: IProduct[] = [
    {
      Quantity: 1,
      ProductId: 123,
      ProductName: 'Product 1',
      ProductPrice: 123.5,
      AvailablePieces: 25,
      ProductImg:
        'https://www.decolore.net/wp-content/uploads/2017/04/product-mock-up-set-2.jpg',
    },
  ];
  //#endregion Declration
  //#region 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      imports: [HttpClientTestingModule],
      providers: [OrderService, CustomerService, ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    orderService = TestBed.inject(OrderService);
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change orders$', () => {
    component.getOrders();
    orderService.getOrders().subscribe((res) => {
      expect(res).toBeGreaterThan(0);
    });
    fixture.detectChanges();
    expect(component.orders$).toBeGreaterThanOrEqual(0);
  });

  // it('get Order By Id', () => {
  //   component.getOrderById(order);
  //   customerService.getCustomerBy(order.UserId).subscribe((res) => {
  //     expect(res).toEqual({
  //       Id: '8573-2903-2344',
  //       Name: 'Ahmed Hossam',
  //       Email: 'Ahmed.Hossam@gmail.com',
  //       Phone: '01025458780',
  //       Address: '234 Al Abageyah, Qesm Al Khalifah, Cairo Governorate',
  //       RegisterDate:
  //         'Wed Sep 18 2019 12:35:14 GMT+0200 (Eastern European Standard Time)',
  //     });
  //   });
  //   fixture.detectChanges();
  //   expect(component.orders$).toBeGreaterThanOrEqual(0);
  // });
});
