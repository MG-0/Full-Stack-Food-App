import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";

export const useHome = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts(selectedCategoryId);

  const handleSelectCategory = (id: string) => {
    setSelectedCategoryId(id);
  };

  return {
    categories,
    products,
    selectedCategoryId,
    loading: categoriesLoading || productsLoading,
    handleSelectCategory,
  };
};
