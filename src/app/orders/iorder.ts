import { IProduct } from "../products/iproduct";

export interface IOrder {
    OrderId: number;
    OrderDate: string;
    UserId: string;
    Products: IOrderProduct[];
    PaymentType: string;
    Total:number;
  }
  export interface IOrderProduct {
    ProductId: number;
    Quantity: number;
    Product?:IProduct;
  }