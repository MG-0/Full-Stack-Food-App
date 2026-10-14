export * from "./auth.routes";
export * from "./user.routes";
export * from "./category.routes";
export * from "./product.routes";
export * from "./order.routes";

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const withProtocol =
  rawApiUrl.startsWith("http://") || rawApiUrl.startsWith("https://")
    ? rawApiUrl
    : `https://${rawApiUrl}`;

export const API_BASE_URL = withProtocol.replace(/\/$/, "");

export const ORDER_STATUS = {
  PENDING: "pending",
  PREPARING: "preparing",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
} as const;

export const PAYMENT_METHODS = {
  COD: "cod",
  ONLINE: "online",
} as const;
