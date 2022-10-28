import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { delay, Observable } from 'rxjs';

@Injectable()
export class FakeDataInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // handle GET requst to get all products from json file
    let peoductsPath = "/assets/data/porducts.json";
    
    if (request.url.endsWith('products.json') && request.method == "GET") {
      request = request.clone({
        url:  peoductsPath,
      });
      return next.handle(request).pipe(delay(500));
    }

    // handle GET requst to get all orders from json file
    let orderssPath = '/assets/data/orders.json';
    if (request.url.endsWith('orders.json') && request.method == 'GET') {
      request = request.clone({
        url: orderssPath,
      });
      return next.handle(request).pipe(delay(500));
    }

    return next.handle(request);
  }

  
}
