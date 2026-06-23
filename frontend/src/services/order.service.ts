import api from "./api.sevice";
import { ORDER_ROUTES } from "@/constants/order.routes";
import { ApiResponse, IOrder, IOrderInput } from "@/types/index";

export const order_service = {
  create: async (data: IOrderInput) => {
    const response = await api.post<ApiResponse<IOrder>>(ORDER_ROUTES.CREATE, data);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get<ApiResponse<IOrder[]>>(ORDER_ROUTES.MY_ORDERS);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<IOrder>>(ORDER_ROUTES.BY_ID(id));
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<ApiResponse<IOrder[]>>(ORDER_ROUTES.ALL);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.put<ApiResponse<IOrder>>(ORDER_ROUTES.UPDATE_STATUS(id), { status });
    return response.data;
  },
};