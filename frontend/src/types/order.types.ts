import { IUser } from "./user.types";
import { IProduct } from "./product.types";

export interface IOrderItem {
  product: IProduct;
  quantity: number;
  price: number;
}

export interface IOrder {
  _id: string;
  user: IUser;
  address: string;
  phone: string;
  items: IOrderItem[];
  totalPrice: number;
  paymentMethod: "cod" | "online";
  status: "pending" | "preparing" | "out_for_delivery" | "delivered";
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderInputItem {
  product: string; // Product ID
  quantity: number;
}

export interface IOrderInput {
  items: IOrderInputItem[];
  paymentMethod: "cod" | "online";
  address: string;
  phone: string;
}

