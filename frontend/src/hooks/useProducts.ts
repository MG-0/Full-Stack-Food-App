import { useState, useEffect, useCallback } from "react";
import { product_service } from "@/services/product.service";
import { IProduct } from "@/types/index";

export const useProducts = (categoryId?: string) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (categoryId) {
        data = await product_service.getByCategory(categoryId);
      } else {
        data = await product_service.getAll();
      }
      
      if (data.success && data.data) {
        setProducts(data.data);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};
