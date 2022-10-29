import { ICustomer } from "../customers/icustomer";
import { IProduct } from "../products/iproduct";

export interface IOrder {
    OrderId: number;
    OrderDate: string;
    UserId: string;
    Products: IOrderProduct[];
    PaymentType: string;
    Total:number;
    Customer?:ICustomer
  }
  export interface IOrderProduct {
    ProductId: number;
    Quantity: number;
    Product?:IProduct;
  }