import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { find, Observable } from 'rxjs';
import { IProduct } from '../iproduct';
import { ProductService } from '../product.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  //#region Declrations
  products$: Observable<IProduct[] | null>;
  isSmallScreen: boolean;
  quantity: number = 0;
  product: IProduct;
  @ViewChild('availablePiecesModal', { static: false })
  availablePiecesModal: ElementRef;

  //#endregion

  //#region Constractor
  constructor(
    private productService: ProductService,
    private responsive: BreakpointObserver
  ) {}
  //#endregion

  //#region Angular Life cycle
  ngOnInit(): void {
    this.products$ = this.productService.getProducts();

    // catch small screen if changed using BreakpointObserver
    this.responsive.observe([Breakpoints.XSmall]).subscribe((result) => {
      this.isSmallScreen = result.matches ? true : false;
    });

  }
  //#endregion

  //#region Methods
  // open Available Pieces Modal
  openAvailablePiecesModal(product: IProduct):void {
    this.availablePiecesModal.nativeElement.style.display = 'block';
    this.quantity = product.AvailablePieces;
    this.product = product;
  }
  // update Product Available Pieces value
  saveProductAvailablePieces():void {
    this.productService
      .editProductQuantity(this.product.ProductId, this.quantity)
      .subscribe((res) => {
        this.products$.forEach((x) => {
             x?.find((c) => {
              if (c.ProductId == res.productId) {
                c.AvailablePieces = res.quantity;
                this.product.AvailablePieces =  res.quantity;
                this.hideAvailablePiecesModal();
              }
            })
        });
      });
  }

// hide Available Pieces Modal
  hideAvailablePiecesModal():void {
    this.availablePiecesModal.nativeElement.style.display = 'none';
    this.quantity = 0;
  }
  addProductToOrder(product:IProduct){ }
  //#endregion
 
}
