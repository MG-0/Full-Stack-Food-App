import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useCartStore } from "@/store/cartStore";
import { useOrders } from "@/hooks/useOrders";
import { useAuthStore } from "@/store/authStore";

export const useCheckout = () => {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isInitialized, isAuthenticated, router]);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const cartItems = useCartStore((state) => state.items);
  const { createOrder, loading, error: apiError } = useOrders();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    if (!address.trim()) {
      setValidationError("address_required");
      return;
    }
    if (!phone.trim()) {
      setValidationError("phone_required");
      return;
    }
    setValidationError(null);

    const orderData = {
      items: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      paymentMethod,
      address: address.trim(),
      phone: phone.trim(),
    };

    const order = await createOrder(orderData);
    if (order) {
      router.push("/orders");
    }
  };

  return {
    cartItems,
    paymentMethod,
    setPaymentMethod,
    address,
    setAddress,
    phone,
    setPhone,
    loading,
    error: validationError || apiError,
    isInitialized,
    handlePlaceOrder,
  };
};
