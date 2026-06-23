import { useState, useEffect, useCallback } from "react";
import { product_service } from "@/services/product.service";
import { category_service } from "@/services/category.service";
import { order_service } from "@/services/order.service";
import { ICategory, IProduct, IOrder } from "@/types/index";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "@/i18n/navigation";

export const useAdminDashboard = () => {
  const { user, isAuthenticated, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized) {
      if (!isAuthenticated || !user || user.role !== "admin") {
        router.push("/");
      }
    }
  }, [isInitialized, isAuthenticated, user, router]);

  const [activeTab, setActiveTab] = useState<"categories" | "products" | "orders">("products");

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await category_service.getAll();
      if (data.success && data.data) setCategories(data.data);
    } catch (_) {
      setError("Failed to fetch categories");
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await product_service.getAll();
      if (data.success && data.data) setProducts(data.data);
    } catch (_) {
      setError("Failed to fetch products");
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await order_service.getAll();
      if (data.success && data.data) setOrders(data.data);
    } catch (_) {
      setError("Failed to fetch orders");
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchCategories(), fetchProducts(), fetchOrders()]);
    setLoading(false);
  }, [fetchCategories, fetchProducts, fetchOrders]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // CATEGORY CRUD
  const saveCategory = async (nameEn: string, nameAr: string) => {
    setLoading(true);
    try {
      if (editingCategory) {
        await category_service.update(editingCategory._id, { nameEn, nameAr });
      } else {
        await category_service.create({ nameEn, nameAr });
      }
      await fetchCategories();
      setIsCategoryModalOpen(false);
      setEditingCategory(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await category_service.delete(id);
      await fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  // PRODUCT CRUD
  const saveProduct = async (productData: any) => {
    setLoading(true);
    try {
      if (editingProduct) {
        await product_service.update(editingProduct._id, productData);
      } else {
        await product_service.create(productData);
      }
      await fetchProducts();
      setIsProductModalOpen(false);
      setEditingProduct(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await product_service.delete(id);
      await fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  // ORDER CRUD
  const updateOrderStatus = async (id: string, status: string) => {
    setLoading(true);
    try {
      await order_service.updateStatus(id, status);
      await fetchOrders();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    categories,
    products,
    orders,
    loading,
    error,
    isInitialized,

    isCategoryModalOpen,
    setIsCategoryModalOpen,
    isProductModalOpen,
    setIsProductModalOpen,
    editingCategory,
    setEditingCategory,
    editingProduct,
    setEditingProduct,

    saveCategory,
    deleteCategory,
    saveProduct,
    deleteProduct,
    updateOrderStatus,
  };
};
