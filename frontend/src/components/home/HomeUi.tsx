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

  // Category emoji helper
  const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("burger") || lower.includes("برجر")) return "🍔";
    if (lower.includes("pizza") || lower.includes("بيتزا")) return "🍕";
    if (lower.includes("pasta") || lower.includes("مكرونة") || lower.includes("باستا")) return "🍝";
    if (lower.includes("drink") || lower.includes("مشروب") || lower.includes("عصير")) return "🥤";
    if (lower.includes("dessert") || lower.includes("حلو") || lower.includes("كيك")) return "🍰";
    if (lower.includes("chicken") || lower.includes("دجاج")) return "🍗";
    if (lower.includes("salad") || lower.includes("سلط")) return "🥗";
    return "🍽️";
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Luxury Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-500 to-orange-500 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center shadow-lg shadow-orange-500/10">
        {/* Ambient background glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-bold text-white shadow-xs">
            <span>✨</span>
            <span>
              {locale === "ar"
                ? "أسرع توصيل طعام في مدينتك • طازج 100%"
                : "Fastest Food Delivery • 100% Fresh Ingredients"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
            {t("hero_title")}
          </h1>
          <p className="text-base sm:text-xl max-w-2xl mx-auto text-orange-50 font-medium opacity-95">
            {t("hero_subtitle")}
          </p>

          {/* Quick Perks */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-white/90">
            <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-full backdrop-blur-xs">
              ⚡ {locale === "ar" ? "توصيل خلال 30 دقيقة" : "30-Min Delivery"}
            </span>
            <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-full backdrop-blur-xs">
              🛵 {locale === "ar" ? "تتبع مباشر للطلب" : "Live Tracking"}
            </span>
            <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-full backdrop-blur-xs">
              💳 {locale === "ar" ? "دفع عند الاستلام أو أونلاين" : "COD & Online Pay"}
            </span>
          </div>
        </div>
      </div>

      {/* Filters, Search & Sort Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b border-slate-200/80 pb-6">
          {/* Category Filter Bar */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none flex-1">
            <button
              onClick={() => handleSelectCategory("")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-200 active:scale-95 shadow-xs
                ${
                  selectedCategoryId === ""
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/25 scale-105"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 hover:-translate-y-0.5"
                }`}
            >
              <span>🍽️</span>
              <span>{locale === "ar" ? "كل الوجبات" : "All Meals"}</span>
            </button>

            {categories.map((category) => {
              const name = locale === "ar" ? category.nameAr : category.nameEn;
              const isActive = selectedCategoryId === category._id;
              const icon = getCategoryIcon(name);

              return (
                <button
                  key={category._id}
                  onClick={() => handleSelectCategory(category._id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-200 active:scale-95 shadow-xs
                    ${
                      isActive
                        ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/25 scale-105"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/50 hover:-translate-y-0.5"
                    }`}
                >
                  <span>{icon}</span>
                  <span>{name}</span>
                </button>
              );
            })}
          </div>

          {/* Search and Sort controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search_placeholder")}
                className="w-full pl-11 pr-4 rtl:pr-11 rtl:pl-4 py-2.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition text-sm text-slate-900 placeholder-slate-400 shadow-xs"
              />
              <span className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-2.5 text-base text-slate-400 pointer-events-none">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 outline-none transition text-sm text-slate-800 font-bold cursor-pointer shadow-xs"
              >
                <option value="default">⚡ {t("sort_default")}</option>
                <option value="price_asc">📈 {t("sort_price_asc")}</option>
                <option value="price_desc">📉 {t("sort_price_desc")}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div>
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <Spinner size="lg" />
              <p className="text-slate-500 text-sm font-bold animate-pulse">
                {locale === "ar"
                  ? "جاري تجهيز أشهى الوجبات لك..."
                  : "Loading delicious meals for you..."}
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-24 text-center space-y-4 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs max-w-lg mx-auto">
              <div className="text-5xl">🍽️</div>
              <h3 className="text-xl font-bold text-slate-800">
                {locale === "ar"
                  ? "لا توجد وجبات متوفرة حالياً"
                  : "No meals available right now"}
              </h3>
              <p className="text-sm text-slate-500">
                {searchQuery
                  ? locale === "ar"
                    ? "جرب البحث بكلمة مختلفة أو اختر تصنيفاً آخر"
                    : "Try searching with a different term or select another category"
                  : locale === "ar"
                  ? "يرجى التحقق لاحقاً أو اختيار تصنيف آخر"
                  : "Please check back later or pick a different category"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold text-xs hover:bg-orange-100 transition cursor-pointer"
                >
                  {locale === "ar" ? "مسح البحث" : "Clear Search"}
                </button>
              )}
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
