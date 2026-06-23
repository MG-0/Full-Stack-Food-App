export const CATEGORY_ROUTES = {
  ALL: "/categories",
  BY_ID: (id: string) => `/categories/${id}`,
  CREATE: "/categories/create",
  UPDATE: (id: string) => `/categories/update/${id}`,
  DELETE: (id: string) => `/categories/delete/${id}`,
} as const;
