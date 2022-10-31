import { IProduct } from "../products/iproduct";
import { ICustomer } from "../customers/icustomer";
export interface IOrder {
    OrderId: number;
    OrderDate: string;
    UserId: string;
    Products: IProduct[];
    PaymentType: string;
    Total:number;
    Customer?:ICustomer
  }