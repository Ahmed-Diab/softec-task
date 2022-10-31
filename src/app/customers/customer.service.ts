import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, mergeMap, Observable } from 'rxjs';
import { ICustomer } from './icustomer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>('users.json');
  }

  getCustomerBy(id: string): Observable<ICustomer> {
    return this.httpClient.get<ICustomer[]>('users.json').pipe(
      mergeMap((data: ICustomer[]) => data),
      filter((res: ICustomer) => res.Id === id)
    );
  }

  public initCustomerObject(): ICustomer {
    return {
      Address: '',
      Email: '',
      Id: '',
      Name: '',
      Phone: '',
      RegisterDate: '',
    };
  }
}
