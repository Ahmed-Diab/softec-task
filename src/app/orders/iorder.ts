import { ICustomer } from "../customers/icustomer";
import { IProduct } from "../products/iproduct";

export interface IOrder {
    OrderId: number;
    OrderDate: string;
    UserId: string;
    Products: IProduct[];
    PaymentType: string;
    Total:number;
    Customer?:ICustomer
  }