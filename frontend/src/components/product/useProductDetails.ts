import { useState, useEffect, useCallback } from "react";
import { product_service } from "@/services/product.service";
import { IProduct } from "@/types/index";
import { cart_actions } from "@/store/cartStore";

export const useProductDetails = (id: string) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await product_service.getById(id);
      if (response.success && response.data) {
        setProduct(response.data);
      } else {
        setError(response.message || "Product not found");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load product details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (product) {
      cart_actions.addItem(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return {
    product,
    quantity,
    loading,
    error,
    isAdded,
    handleIncrease,
    handleDecrease,
    handleAddToCart,
    refetch: fetchProduct,
  };
};
