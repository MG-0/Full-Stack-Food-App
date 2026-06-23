import { Response } from "express";
import { AuthRequest, ApiResponse } from "../types/index";
import User from "../models/User";
import { IUser } from "../models/User";

// Get User Profile
export const getUserProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const response: ApiResponse<IUser> = {
      success: true,
      message: "Profile fetched successfully",
      data: req.user,
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

// Get All Users

export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      const response: ApiResponse = {
        success: false,
        message: "users Get Failed!",
      };
      return;
    }
    const response: ApiResponse<IUser[]> = {
      success: true,
      message: "Get Users Successfully",
      data: users,
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

// Deleted User
export const deleteUser = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: "User Not Found!",
      };
      res.status(404).json(response);
    }
    const response: ApiResponse = {
      success: true,
      message: "User deleted successfully",
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
