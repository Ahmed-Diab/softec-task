import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
 } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
 
@Injectable()
export class FakeDataInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // handle GET requst to get all products from json file
    let peoductsPath = '/assets/data/porducts.json';
    if (request.url.endsWith('products.json') && request.method == 'GET') {
      request = request.clone({
        url: peoductsPath,
      });
      return next.handle(request).pipe(delay(500));
    }

    //  Handle Edit Product requst
    if (request.url == '/editProduct' && request.method == 'POST') {
      request = request.clone({
        body: request.body,
      });
      return of(new HttpResponse({ status: 200, body: request.body })).pipe(
        delay(500)
      );
    }

    // handle GET requst to get all orders from json file
    let ordersPath = '/assets/data/orders.json';
    if (request.url.endsWith('orders.json') && request.method == 'GET') {
      request = request.clone({
        url: ordersPath,
      });
      return next.handle(request).pipe(delay(500));
    }

    // handle GET Order By Id from json file
    // if (request.url.includes('getOrder') && request.method == 'GET') {
    //   let orderId = request.params.get('orderId')
    //   request = request.clone({
    //     url: ordersPath,
    //   }); 
    //  }
    return next.handle(request);
  }
}
