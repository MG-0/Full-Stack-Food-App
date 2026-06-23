export * from "./auth.routes";
export * from "./user.routes";
export * from "./category.routes";
export * from "./product.routes";
export * from "./order.routes";

export const API_BASE_URL = "http://localhost:5000";

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
