import { Response, Request } from "express";
import { IProduct } from "../models/Product";
import Product from "../models/Product";
import { ApiResponse } from "../types/index";

// GET ALL PRODUCTS
export const getALlProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await Product.find().populate("category", "nameEn nameAr");
    if (!products) {
      const response: ApiResponse = {
        success: false,
        message: "Products Fetched Failed!",
      };
      res.status(401).json(response);
      return;
    }
    const response: ApiResponse<IProduct[]> = {
      success: true,
      message: "Products Fetched Successfully",
      data: products,
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
    };
    res.status(500).json(response);
  }
};

// GET PRODUCT BY ID
export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      "category",
      "nameEn nameAr",
    );

    if (!product) {
      const response: ApiResponse = {
        success: false,
        message: "Product not Found!",
      };
      res.status(403).json(response);
      return;
    }
    const response: ApiResponse<IProduct> = {
      success: true,
      message: "Product Fetched Successfully",
      data: product,
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
    };
    res.status(500).json(response);
  }
};

// Get Product by Category
export const getProductsByCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({
      category: categoryId,
    }).populate("category", "nameEn nameAr");
    const response: ApiResponse<IProduct[]> = {
      success: true,
      message: "Products fetched successfully",
      data: products,
    };
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
    };
    res.status(500).json(response);
  }
};

// CREATE NEW PRODUCT
export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      nameEn,
      nameAr,
      descriptionEn,
      descriptionAr,
      price,
      category,
      image,
    } = req.body;
    const product = await Product.create({
      nameEn,
      nameAr,
      descriptionAr,
      descriptionEn,
      price,
      category,
      image,
    });
    await product.populate("category", "nameEn nameAr");
    const response: ApiResponse<IProduct> = {
      success: true,
      message: "Product Created Successfully",
      data: product,
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
    };
    res.status(500).json(response);
  }
};

// UpDATE PRODUCT
export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!product) {
      const response: ApiResponse = {
        success: false,
        message: "Product not found",
      };
      res.status(404).json(response);
      return;
    }
    const response: ApiResponse<IProduct> = {
      success: true,
      message: "Product updated successfully",
      data: product,
    };
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
    };
    res.status(500).json(response);
  }
};

// DELETED PRODUCT
export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      const response: ApiResponse = {
        success: false,
        message: "Product not found",
      };
      res.status(404).json(response);
      return;
    }
    const response: ApiResponse = {
      success: true,
      message: "Product deleted successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Something went wrong",
    };
    res.status(500).json(response);
  }
};
