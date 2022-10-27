import { TestBed } from '@angular/core/testing';

import { FakeDataInterceptor } from './fake-data.interceptor';

describe('FakeDataInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FakeDataInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FakeDataInterceptor = TestBed.inject(FakeDataInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
