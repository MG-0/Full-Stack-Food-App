import { ApiResponse } from "./../types/index";
import { Request, Response } from "express";
import { IUser } from "../models/User";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcryptjs";
import { stringify } from "node:querystring";

// Cooikes
const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// User Regester
export const regester = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const response: ApiResponse = {
        success: false,
        message: "All fields are required",
      };
      res.status(400).json(response);
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        message: "Email Already Exist",
      };
      res.status(400).json(response);
      return;
    }
    const passwordHashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: passwordHashed });
    const token = generateToken({ id: user._id.toString(), role: user.role });
    res.cookie("token", token, cookiesOptions);
    const response: ApiResponse<{
      _id: string;
      name: string;
      email: string;
      role: string;
      token: string;
    }> = {
      success: true,
      message: "Account Created Suuceesfully",
      data: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Failed Created Account!",
    };
    res.status(500).json(response);
  }
};

// Login User

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        message: "All fields are required",
      };
      res.status(400).json(response);
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      const response: ApiResponse = {
        success: false,
        message: "Invalid email or password",
      };
      res.status(400).json(response);
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const response: ApiResponse = {
        success: false,
        message: "InCorrect Password",
      };
      res.status(401).json(response);
      return;
    }
    const token = generateToken({ id: user._id.toString(), role: user.role });
    res.cookie("token", token, cookiesOptions);
    const response: ApiResponse<{
      _id: string;
      name: string;
      email: string;
      role: string;
      token: string;
    }> = {
      success: true,
      message: "Login is Successfully",
      data: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Login is Failed, Try again Pls.",
    };
    res.status(500).json(response);
  }
};

// User Logout
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { maxAge, ...clearOptions } = cookiesOptions;
    res.clearCookie("token", clearOptions);
    const response: ApiResponse = {
      success: true,
      message: "Logout is Successfully",
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Logout is Failed",
    };
    res.status(401).json(response);
  }
};
