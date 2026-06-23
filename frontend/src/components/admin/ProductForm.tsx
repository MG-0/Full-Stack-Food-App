"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IProduct, ICategory, IProductInput } from "@/types/index";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IProductInput) => Promise<void>;
  initialData: IProduct | null;
  categories: ICategory[];
  loading: boolean;
}

export default function ProductForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  categories,
  loading,
}: ProductFormProps) {
  const t = useTranslations("admin");

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
 
  useEffect(() => {
    if (initialData) {
      setNameEn(initialData.nameEn);
      setNameAr(initialData.nameAr);
      setDescriptionEn(initialData.descriptionEn);
      setDescriptionAr(initialData.descriptionAr);
      setPrice(initialData.price.toString());
      setImage(initialData.image);
      setCategory(initialData.category._id || "");
    } else {
      setNameEn("");
      setNameAr("");
      setDescriptionEn("");
      setDescriptionAr("");
      setPrice("");
      setImage("");
      setCategory(categories[0]?._id || "");
    }
  }, [initialData, isOpen, categories]);
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn || !nameAr || !descriptionEn || !descriptionAr || !price || !image || !category) {
      return;
    }
    onSave({
      nameEn,
      nameAr,
      descriptionEn,
      descriptionAr,
      price: parseFloat(price),
      image,
      category,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? t("edit") : t("add_product")}
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <Input
          id="nameEn"
          type="text"
          label="Name (English)"
          placeholder="e.g. Cheese Pizza"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          required
        />

        <Input
          id="nameAr"
          type="text"
          label="الاسم (عربي)"
          placeholder="مثال: بيتزا جبن"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          required
        />

        <div className="flex flex-col space-y-1">
          <label htmlFor="descriptionEn" className="text-sm font-semibold text-gray-700">
            Description (English)
          </label>
          <textarea
            id="descriptionEn"
            rows={3}
            placeholder="Description in English"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-900 transition outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="descriptionAr" className="text-sm font-semibold text-gray-700">
            الوصف (عربي)
          </label>
          <textarea
            id="descriptionAr"
            rows={3}
            placeholder="الوصف باللغة العربية"
            value={descriptionAr}
            onChange={(e) => setDescriptionAr(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-900 transition outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          />
        </div>

        <Input
          id="price"
          type="number"
          step="0.01"
          label="Price"
          placeholder="e.g. 150"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <Input
          id="image"
          type="url"
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <div className="flex flex-col space-y-1">
          <label htmlFor="category" className="text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            required
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nameEn} / {cat.nameAr}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={loading}>
            {t("save")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export { ProductForm };
