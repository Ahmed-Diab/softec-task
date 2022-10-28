import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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
  availablePieces: number = 0;
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
    this.products$ = this.productService.getProducts(); //.subscribe((dd) => console.log(dd));
    this.responsive.observe([Breakpoints.XSmall]).subscribe((result) => {
      this.isSmallScreen = result.matches ? true : false;
    });
  }
  //#endregion

  //#region Methods

  openAvailablePiecesModal(product: IProduct) {
    this.availablePiecesModal.nativeElement.style.display = 'block';
    this.availablePieces = product.AvailablePieces;
    this.product = product;
  }

  saveProductAvailablePieces() {
    this.product.AvailablePieces = this.availablePieces;
  }

  hideAvailablePiecesModal() {
    this.availablePiecesModal.nativeElement.style.display = 'none';
    this.availablePieces = 0;
  }
  //#endregion
}
