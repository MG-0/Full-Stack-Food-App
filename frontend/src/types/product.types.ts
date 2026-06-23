import { ICategory } from "./category.types";

export interface IProduct {
  _id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  image: string;
  category: ICategory;
  createdAt: string;
  updatedAt: string;
}

export interface IProductInput {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  image: string;
  category: string; // ID of the category
}

