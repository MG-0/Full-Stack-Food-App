import api from "./api.sevice";
import { PRODUCT_ROUTES } from "@/constants/product.routes";
import { ApiResponse, IProduct, IProductInput } from "@/types/index";

export const product_service = {
  getAll: async () => {
    const response = await api.get<ApiResponse<IProduct[]>>(PRODUCT_ROUTES.ALL);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<IProduct>>(PRODUCT_ROUTES.BY_ID(id));
    return response.data;
  },

  getByCategory: async (categoryId: string) => {
    const response = await api.get<ApiResponse<IProduct[]>>(PRODUCT_ROUTES.BY_CATEGORY(categoryId));
    return response.data;
  },

  create: async (data: IProductInput) => {
    const response = await api.post<ApiResponse<IProduct>>(PRODUCT_ROUTES.CREATE, data);
    return response.data;
  },

  update: async (id: string, data: Partial<IProductInput>) => {
    const response = await api.put<ApiResponse<IProduct>>(PRODUCT_ROUTES.UPDATE(id), data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse>(PRODUCT_ROUTES.DELETE(id));
    return response.data;
  },
};
