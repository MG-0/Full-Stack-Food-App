import { useState, useEffect } from "react";
import { category_service } from "@/services/category.service";
import { ICategory } from "@/types/index";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await category_service.getAll();
        if (data.success && data.data) {
          setCategories(data.data);
        }
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
};
