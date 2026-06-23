export const PRODUCT_ROUTES = {
  ALL: "/products",
  BY_ID: (id: string) => `/products/${id}`,
  BY_CATEGORY: (categoryId: string) =>
    `/products/productbycategory/${categoryId}`,
  CREATE: "/products/create",
  UPDATE: (id: string) => `/products/update/${id}`,
  DELETE: (id: string) => `/products/delete/${id}`,
} as const;
