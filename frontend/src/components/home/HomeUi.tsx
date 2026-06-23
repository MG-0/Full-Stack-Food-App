"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useHome } from "./useHome";
import ProductCard from "../product/ProductCard";
import { Spinner } from "../ui/Spinner";

export default function HomeUi() {
  const t = useTranslations("home");
  const locale = useLocale();
  const {
    categories,
    products,
    selectedCategoryId,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    loading,
    handleSelectCategory,
  } = useHome();

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-4 shadow-sm">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          {t("hero_title")}
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
          {t("hero_subtitle")}
        </p>
      </div>

      {/* Filters, Search & Sort Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-gray-100 pb-5">
          {/* Category Filter Bar */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse overflow-x-auto pb-2 scrollbar-none flex-1">
            <button
              onClick={() => handleSelectCategory("")}
              className={`px-5 py-2.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-200 active:scale-95
                ${selectedCategoryId === "" 
                  ? "bg-orange-600 text-white shadow-md scale-105" 
                  : "bg-white border border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600 hover:-translate-y-0.5"}`}
            >
              {locale === "ar" ? "الكل" : "All"}
            </button>

            {categories.map((category) => {
              const name = locale === "ar" ? category.nameAr : category.nameEn;
              const isActive = selectedCategoryId === category._id;

              return (
                <button
                  key={category._id}
                  onClick={() => handleSelectCategory(category._id)}
                  className={`px-5 py-2.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-200 active:scale-95
                    ${isActive 
                      ? "bg-orange-600 text-white shadow-md scale-105" 
                      : "bg-white border border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600 hover:-translate-y-0.5"}`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* Search and Sort controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search_placeholder")}
                className="w-full sm:w-64 pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm text-gray-900 placeholder-gray-400 bg-white"
              />
              <span className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 text-gray-400">🔍</span>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm text-gray-800 font-semibold bg-white cursor-pointer"
            >
              <option value="default">{t("sort_default")}</option>
              <option value="price_asc">{t("sort_price_asc")}</option>
              <option value="price_desc">{t("sort_price_desc")}</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          {loading ? (
            <div className="py-20 flex justify-center">
              <Spinner size="lg" />
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center text-gray-500 font-medium">
              {locale === "ar" ? "لا توجد وجبات متوفرة حالياً" : "No meals available right now."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export { HomeUi };
