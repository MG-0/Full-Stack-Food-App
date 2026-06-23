import { IProduct } from "./product.types";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
