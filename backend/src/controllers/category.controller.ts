import { ICaregory } from "../models/Category";
import Category from "../models/Category";
import { Response, Request } from "express";
import { ApiResponse } from "../types/index";

// getAllCategories
export const getAllCategories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categories = await Category.find();
    if (!categories) {
      const response: ApiResponse = {
        success: false,
        message: "Categories not found!",
      };
      res.status(500).json(response);
    }
    const response: ApiResponse<ICaregory[]> = {
      success: true,
      message: "Categories fetched successfully",
      data: categories,
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

// Get Category By Id
export const getCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      const response: ApiResponse = {
        success: false,
        message: "Category not found!",
      };
      res.status(401).json(response);
      return;
    }
    const response: ApiResponse<ICaregory> = {
      success: true,
      message: "Category Get Successfully",
      data: category,
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

// Create New Category
export const createCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { nameEn, nameAr } = req.body;
    if (!nameEn || !nameAr) {
      const response: ApiResponse = {
        success: false,
        message: "Are Fields Requires!",
      };
      res.status(401).json(response);
      return;
    }
    const category = await Category.create({ nameEn, nameAr });
    const response: ApiResponse<ICaregory> = {
      success: true,
      message: "Category Created Successfully",
      data: category,
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

// Update Category
export const updateCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const { nameEn, nameAr } = req.body;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { nameEn, nameAr },
      { new: true },
    );
    if (!category) {
      const response: ApiResponse = {
        success: false,
        message: "Category not Found!",
      };
      res.status(401).json(response);
      return;
    }
    const response: ApiResponse<ICaregory> = {
      success: true,
      message: "Category Updated Successfully",
      data: category,
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

// Deleted Category
export const deleteCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      const response: ApiResponse = {
        success: false,
        message: "Category not Found!",
      };
      res.status(401).json(response);
      return;
    }
    const response: ApiResponse = {
      success: true,
      message: "Category Deleted Successfully",
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
