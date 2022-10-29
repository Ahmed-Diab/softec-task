import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from './icustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getCustomers():Observable<ICustomer[]>{
    return this.httpClient.get<ICustomer[]>('users.json')
  }

}
