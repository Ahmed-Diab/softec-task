import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { find, Observable } from 'rxjs';
import { IProduct } from '../iproduct';
import { ProductService } from '../product.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Hellper } from 'src/app/shared/hellper';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends Hellper implements OnInit {
  //#region Declrations
  products$: Observable<IProduct[] | null>;
  quantity: number = 0;
  product: IProduct;
  @ViewChild('availablePiecesModal', { static: false }) availablePiecesModal: ElementRef;
  //#endregion

  //#region Constractor
  constructor(
    private productService: ProductService,
    public override responsive: BreakpointObserver
  ) {
    super(responsive);
  }
  //#endregion
  //#region Angular Life cycle
  ngOnInit(): void {
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
  addProductToOrder(product: IProduct) {}
  //#endregion
}
