import { useEffect } from "react";
import { useOrders } from "@/hooks/useOrders";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "@/i18n/navigation";

export const useOrdersPage = () => {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const router = useRouter();
  const { orders, loading, error, fetchMyOrders } = useOrders();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isInitialized, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyOrders();
    }
  }, [isAuthenticated, fetchMyOrders]);

  return {
    orders,
    loading,
    error,
    isInitialized,
    refetch: fetchMyOrders,
  };
};
