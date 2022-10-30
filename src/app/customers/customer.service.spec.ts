import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { ICustomer } from './icustomer';
 
describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const customer: ICustomer = {
    Id: '8573-2903-2344',
    Name: 'Ahmed Hossam',
    Email: 'Ahmed.Hossam@gmail.com',
    Phone: '01025458780',
    Address: '234 Al Abageyah, Qesm Al Khalifah, Cairo Governorate',
    RegisterDate:
      'Wed Sep 18 2019 12:35:14 GMT+0200 (Eastern European Standard Time)',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(CustomerService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get all the customers', () => {
    service
      .getCustomers()
      .subscribe((result) => expect(result.length).toBeGreaterThan(0));
  });
  it('get customer by id', () => {
    service
      .getCustomerBy(customer.Id)
      .subscribe( (result) => {
        expect(result).toEqual(customer) 
       });
  });
 
});
