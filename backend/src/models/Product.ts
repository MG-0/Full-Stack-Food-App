import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  image: string;
  category: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    nameEn: {
      type: String,
      required: true,
    },
    nameAr: {
      type: String,
      required: true,
    },
    descriptionEn: {
      type: String,
      required: true,
    },
    descriptionAr: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProduct>("Product", productSchema);
