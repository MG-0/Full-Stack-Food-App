import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  address: string;
  phone: string;
  items: IOrderItem[];
  totalPrice: number;
  paymentMethod: "cod" | "online";
  status: "pending" | "preparing" | "out_for_delivery" | "delivered";
  isPaid: boolean;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "out_for_delivery", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IOrder>('Order', orderSchema)