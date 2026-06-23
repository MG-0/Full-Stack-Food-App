import { create } from "zustand";
import { auth_service } from "@/services/auth.service";
import { IUser, ILoginInput, IRegisterInput } from "@/types/index";
import { cart_actions } from "./cartStore";

interface AuthState  {
    user: IUser | null,
    loading: boolean,
    error: string | null,
    isAuthenticated: boolean,
    isInitialized: boolean
}

export const useAuthStore = create<AuthState>(() => ({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    isInitialized: false
}))

export const auth_actions = {
  login: async (credentials: ILoginInput) => {
    useAuthStore.setState({
      loading: true,
      error: null,
    });
    try {
      const response = await auth_service.login(credentials);
      if (!response.success && !response.data) {
        useAuthStore.setState({
          loading: false,
          error: response.message,
          isInitialized: true,
        });
        return;
      }
      
      const user = response.data;
      useAuthStore.setState({
        loading: false,
        user: user || null,
        isAuthenticated: !!user,
        isInitialized: true,
      });

      if (user) {
        cart_actions.loadUserCart(user._id);
      }
    } catch (error: any) {
      const messageError = error.response?.data?.message || "Failed to Login";
      useAuthStore.setState({ error: messageError, loading: false, isInitialized: true });
    }
  },

  register: async (credentials: IRegisterInput) => {
    useAuthStore.setState({
      loading: true,
      error: null,
    });
    try {
      const response = await auth_service.register(credentials);
      if (!response.success && !response.data) {
        useAuthStore.setState({ error: response.message, loading: false, isInitialized: true });
        return;
      }
      
      const user = response.data;
      useAuthStore.setState({
        user: user || null,
        isAuthenticated: !!user,
        loading: false,
        isInitialized: true,
      });

      if (user) {
        cart_actions.loadUserCart(user._id);
      }
    } catch (error: any) {
      const messageError =
        error.response?.data?.message || "Failed to Register";
      useAuthStore.setState({ error: messageError, loading: false, isInitialized: true });
    }
  },

  logout: async () => {
    useAuthStore.setState({ loading: true });
    try {
      await auth_service.logout();
    } catch (error) {
      console.error("Backend logout failed, clearing local session anyway:", error);
    } finally {
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
      // Load guest cart (empty or guest items) on logout
      cart_actions.loadUserCart(null);
    }
  },

  checkAuth: async() => {
    useAuthStore.setState({ loading: true, error: null })
    try {
        const response = await auth_service.getProfile()
        const user = response.data;
        if (!user) {
           useAuthStore.setState({
             user: null,
             isAuthenticated: false,
             loading: false,
             isInitialized: true,
           });
           cart_actions.loadUserCart(null);
           return;
         }
         
         useAuthStore.setState({ loading: false, isAuthenticated: true, user, isInitialized: true });
         cart_actions.loadUserCart(user._id);
     } catch (error) {
         useAuthStore.setState({
           user: null,
           isAuthenticated: false,
           loading: false,
           isInitialized: true,
         });
         cart_actions.loadUserCart(null);
     } 
   }
 };