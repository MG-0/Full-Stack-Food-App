import api from "./api.sevice";
import { AUTH_ROUTES } from "@/constants/auth.routes";
import { USER_ROUTES } from "@/constants/user.routes";
import { ApiResponse, IUser, IRegisterInput, ILoginInput } from "@/types/index";

export const auth_service = {
  register: async (data: IRegisterInput) => {
    const response = await api.post<ApiResponse<IUser>>(AUTH_ROUTES.REGESTER, data);
    return response.data;
  },

  login: async (data: ILoginInput) => {
    const response = await api.post<ApiResponse<IUser>>(AUTH_ROUTES.LOGIN, data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post<ApiResponse>(AUTH_ROUTES.LOGOUT);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get<ApiResponse<IUser>>(USER_ROUTES.PROFILE);
    return response.data;
  },
};
