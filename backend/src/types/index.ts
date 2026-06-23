import { Request } from "express";
import { IUser } from "../models/User";

export interface AuthRequest extends Request {
    user?: IUser;
}

export interface ApiResponse<T = unknown> {
    success: boolean,
    message: string,
    data?: T
}   

export interface JwtPayload {
    id: string,
    role: 'user' | 'admin'
}

