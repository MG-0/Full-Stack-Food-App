"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useProductDetails } from "./useProductDetails";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";

interface ProductDetailsUiProps {
  id: string;
}

export default function ProductDetailsUi({ id }: ProductDetailsUiProps) {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  const {
    product,
    quantity,
    loading,
    error,
    isAdded,
    handleIncrease,
    handleDecrease,
    handleAddToCart,
  } = useProductDetails(id);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4">
        <span className="text-6xl">⚠️</span>
        <h2 className="text-2xl font-bold text-gray-900">
          {error || (locale === "ar" ? "الوجبة غير متوفرة" : "Meal not found")}
        </h2>
        <Button onClick={() => router.back()} variant="primary">
          {tCommon("back")}
        </Button>
      </div>
    );
  }

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const description = locale === "ar" ? product.descriptionAr : product.descriptionEn;
  const categoryName = locale === "ar" ? product.category?.nameAr : product.category?.nameEn;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500 hover:text-orange-600 transition font-semibold text-sm cursor-pointer group active:scale-95 duration-150"
      >
        <span className="text-lg group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform">
          {locale === "ar" ? "←" : "←"}
        </span>
        <span>{tCommon("back")}</span>
      </button>

      {/* Main Card Grid */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
        {/* Left Column: Premium Zoom Image */}
        <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center group">
          <img
            src={product.image}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Right Column: Detailed Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category Tag */}
            {categoryName && (
              <span className="inline-block px-3.5 py-1 text-xs font-bold text-orange-600 bg-orange-50 rounded-full">
                {categoryName}
              </span>
            )}

            {/* Product Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {name}
            </h1>

            {/* Price badge */}
            <div className="text-2xl font-black text-orange-600">
              {product.price} {locale === "ar" ? "ج.م" : "EGP"}
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                {t("description")}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-gray-50">
            {/* Quantity Selector & Action bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity Picker */}
              <div className="flex items-center justify-between border border-gray-200 rounded-xl p-1 bg-gray-50/50 w-full sm:w-36">
                <button
                  onClick={handleDecrease}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 hover:text-orange-600 hover:shadow-sm font-bold transition cursor-pointer active:scale-90"
                >
                  -
                </button>
                <span className="font-extrabold text-gray-900 text-base">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 hover:text-orange-600 hover:shadow-sm font-bold transition cursor-pointer active:scale-90"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-1 active:scale-98 transition duration-200"
              >
                {isAdded ? (
                  <span className="flex items-center justify-center space-x-1.5 rtl:space-x-reverse font-bold text-white">
                    <span>✓</span>
                    <span>{locale === "ar" ? "تمت الإضافة!" : "Added!"}</span>
                  </span>
                ) : (
                  <span>{t("add_to_cart")}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { ProductDetailsUi };
