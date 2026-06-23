import { Response } from "express";
import Order from "../models/Order";
import { IOrder } from "../models/Order";
import { AuthRequest, ApiResponse } from "../types/index";
import Product from "../models/Product";

// GREATE NEW ORDER
export const createOrder = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { items, paymentMethod, address, phone } = req.body;
    if (!address || typeof address !== "string" || !address.trim()) {
      const response: ApiResponse = {
        success: false,
        message: "Address is required",
      };
      res.status(400).json(response);
      return;
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      const response: ApiResponse = {
        success: false,
        message: "Phone number is required",
      };
      res.status(400).json(response);
      return;
    }

    let totalPrice = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        const response: ApiResponse = {
          success: false,
          message: `Product ${item.product} not found!`,
        };
        res.status(401).json(response);
        return;
      }
      totalPrice += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      user: req.user!._id,
      address,
      phone,
      items: orderItems,
      totalPrice,
      paymentMethod,
    });
    const response: ApiResponse<IOrder> = {
      success: true,
      message: "Order created successfully",
      data: order,
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

// GET MY ORDERS
export const getMyOrders = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user!._id;
    const orders = await Order.find({ user: userId }).populate(
      "items.product",
      " nameEn nameAr image price ",
    );
    const response: ApiResponse<IOrder[]> = {
      success: true,
      message: "Orders fetched successfully",
      data: orders,
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

// GET ORDER BY ID
export const getOrderById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "nameEn nameAr price image",
    );
    if (!order) {
      const response: ApiResponse = {
        success: false,
        message: "Order not found",
      };
      res.status(404).json(response);
      return;
    }
    const response: ApiResponse<IOrder> = {
      success: true,
      message: "Order fetched successfully",
      data: order,
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

// GET ALL ORDERS
export const getAllOrders = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "nameEn nameAr price");
    const response: ApiResponse<IOrder[]> = {
      success: true,
      message: "All orders fetched successfully",
      data: orders,
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

// UPDATE ORDER
export const updateOrderStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    if (!order) {
      const response: ApiResponse = {
        success: false,
        message: "Order not found",
      };
      res.status(404).json(response);
      return;
    }
    const response: ApiResponse<IOrder> = {
      success: true,
      message: "Order status updated successfully",
      data: order,
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
