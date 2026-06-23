import { useState, useMemo } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";

export const useHome = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");

  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts(selectedCategoryId);

  const handleSelectCategory = (id: string) => {
    setSelectedCategoryId(id);
  };

  // Filter and Sort products client-side for dynamic instant response
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Query Filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.nameEn.toLowerCase().includes(query) ||
          product.nameAr.includes(query) ||
          (product.descriptionEn && product.descriptionEn.toLowerCase().includes(query)) ||
          (product.descriptionAr && product.descriptionAr.includes(query))
      );
    }

    // 2. Sorting by Price
    if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, sortBy]);

  return {
    categories,
    products: processedProducts,
    selectedCategoryId,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    loading: categoriesLoading || productsLoading,
    handleSelectCategory,
  };
};
