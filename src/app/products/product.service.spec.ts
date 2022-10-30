import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IProduct } from './iproduct';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let product: IProduct = {
    Quantity: 20,
    ProductId: 123,
    ProductName: 'Product 1',
    ProductPrice: 123.5,
    AvailablePieces: 25,
    ProductImg: '',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get all products', () => {
    service.getProducts().subscribe((result) => {
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  it('edit Product Quantity', () => {
    service.editProductQuantity(product.ProductId, product.Quantity).subscribe((result) => {
      expect(result).toEqual({productId:product.ProductId, quantity:product.Quantity});
    });
  });
});
