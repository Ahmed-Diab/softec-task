import { Observable } from 'rxjs';
import { IProduct } from '../iproduct';
import { Hellper } from 'src/app/shared/hellper';
import { ProductService } from '../product.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OrderService } from 'src/app/orders/order.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'softec-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends Hellper implements OnInit {
  //#region Declrations
  products$: Observable<IProduct[] | null>;
  quantity: number = 0;
  product: IProduct;
  @ViewChild('availablePiecesModal', { static: false })
  availablePiecesModal: ElementRef;
  orderProducts: IProduct[] = [];
  //#endregion

  //#region Constractor
  constructor(
    private productService: ProductService,
    public override responsive: BreakpointObserver,
    private orderService: OrderService
  ) {
    super(responsive);
  }
  //#endregion
  //#region Angular Life cycle
  ngOnInit(): void {
    this.getNewOrderProducts()
    this.catchSmallScreen();
    this.products$ = this.productService.getProducts();
  }
  //#endregion

  //#region Methods
  // open Available Pieces Modal
  openAvailablePiecesModal(product: IProduct): void {
    this.availablePiecesModal.nativeElement.style.display = 'block';
    this.quantity = product.AvailablePieces;
    this.product = product;
  }
  // update Product Available Pieces value
  saveProductAvailablePieces(): void {
    let subEditProduct = this.productService
      .editProductQuantity(this.product.ProductId, this.quantity)
      .subscribe((res) => {
        this.products$.forEach((x) => {
          x?.find((c) => {
            if (c.ProductId == res.productId) {
              c.AvailablePieces = res.quantity;
              this.product.AvailablePieces = res.quantity;
              this.hideAvailablePiecesModal();
            }
          });
        });
      });
    this.subscriptions.push(subEditProduct);
  }

  // hide Available Pieces Modal
  hideAvailablePiecesModal(): void {
    this.availablePiecesModal.nativeElement.style.display = 'none';
    this.quantity = 0;
  }
  addProductToOrder(product: IProduct) {
    let pro = this.orderProducts.find((p) => p.ProductId == product.ProductId);
    pro ? pro.Quantity++ :(product.Quantity = 1, this.orderProducts.push(product));
    this.orderService.setOrderProducts(this.orderProducts);
    window.alert(`${product.ProductName} added new order page`);
  }

  getNewOrderProducts() {
    this.orderService
     .getOrderProducts()
     .subscribe((res) => {
       if (res != null) this.orderProducts = res;
     });
  }
  //#endregion
}
