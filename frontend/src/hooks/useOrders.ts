import { useState, useCallback } from "react";
import { order_service } from "@/services/order.service";
import { IOrder, IOrderInput } from "@/types/index";
import { cart_actions } from "@/store/cartStore";

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await order_service.getMyOrders();
      if (data.success && data.data) {
        setOrders(data.data);
      }
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = async (orderData: IOrderInput) => {
    setLoading(true);
    setError(null);
    try {
      const data = await order_service.create(orderData);
      if (data.success) {
        cart_actions.clearCart(); // Clear cart on success
        return data.data;
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, fetchMyOrders, createOrder };
};
