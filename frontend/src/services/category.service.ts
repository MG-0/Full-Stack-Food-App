import api from "./api.sevice";
import { CATEGORY_ROUTES } from "@/constants/category.routes";
import { ApiResponse, ICategory, ICategoryInput } from "@/types/index";

export const category_service = {
  getAll: async () => {
    const response = await api.get<ApiResponse<ICategory[]>>(CATEGORY_ROUTES.ALL);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<ICategory>>(CATEGORY_ROUTES.BY_ID(id));
    return response.data;
  },

  create: async (data: ICategoryInput) => {
    const response = await api.post<ApiResponse<ICategory>>(CATEGORY_ROUTES.CREATE, data);
    return response.data;
  },

  update: async (id: string, data: ICategoryInput) => {
    const response = await api.put<ApiResponse<ICategory>>(CATEGORY_ROUTES.UPDATE(id), data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse>(CATEGORY_ROUTES.DELETE(id));
    return response.data;
  },
};