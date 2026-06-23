export const ORDER_ROUTES = {
  CREATE: "/orders/create",
  MY_ORDERS: "/orders/my-orders",
  BY_ID: (id: string) => `/orders/${id}`,
  ALL: "/orders",
  UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
} as const;
