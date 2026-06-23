import jwt from "jsonwebtoken";
import { JwtPayload } from "../types";

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, process.env.JWT_KEY as string, {
        expiresIn: '7d'
    })
}