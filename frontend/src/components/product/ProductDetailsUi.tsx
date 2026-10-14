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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors font-bold text-sm cursor-pointer group active:scale-95 duration-150 px-3 py-1.5 rounded-xl hover:bg-orange-50"
        >
          <span className="text-lg group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform">
            {locale === "ar" ? "→" : "←"}
          </span>
          <span>{locale === "ar" ? "العودة للقائمة الرئيسية" : "Back to menu"}</span>
        </button>

        {categoryName && (
          <span className="text-xs font-bold text-slate-400">
            {locale === "ar" ? "التصنيف" : "Category"}:{" "}
            <span className="text-orange-600 font-extrabold">{categoryName}</span>
          </span>
        )}
      </div>

      {/* Main Luxury Product Showcase Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-10">
        {/* Left Column: Image with floating badges */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner group">
            <img
              src={product.image}
              alt={name}
              className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-orange-600/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black text-white shadow-md flex items-center gap-1.5">
              <span>🔥</span>
              <span>{locale === "ar" ? "وجبة مميزة" : "Chef Special"}</span>
            </div>

            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-slate-800 shadow-md flex items-center gap-1">
              <span className="text-amber-500 text-sm">★</span>
              <span>4.9</span>
              <span className="text-slate-400 text-[10px]">(180+)</span>
            </div>
          </div>

          {/* Quick Stats Grid below Image */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-2xl text-center">
              <div className="text-xl">⏱️</div>
              <div className="text-[11px] font-bold text-slate-800 mt-1">20-30 {locale === "ar" ? "دقيقة" : "mins"}</div>
              <div className="text-[10px] text-slate-400">{locale === "ar" ? "وقت التحضير" : "Prep Time"}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-2xl text-center">
              <div className="text-xl">🛵</div>
              <div className="text-[11px] font-bold text-slate-800 mt-1">{locale === "ar" ? "توصيل ساخن" : "Fast Delivery"}</div>
              <div className="text-[10px] text-slate-400">{locale === "ar" ? "تغليف حراري" : "Thermal Box"}</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-2xl text-center">
              <div className="text-xl">🌿</div>
              <div className="text-[11px] font-bold text-slate-800 mt-1">{locale === "ar" ? "طازج 100%" : "Fresh Meat"}</div>
              <div className="text-[10px] text-slate-400">{locale === "ar" ? "مكونات أصلية" : "Quality Pick"}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Category Tag */}
            {categoryName && (
              <span className="inline-flex items-center gap-1 px-3.5 py-1 text-xs font-extrabold text-orange-600 bg-orange-50 rounded-full border border-orange-200/50">
                <span>🏷️</span>
                <span>{categoryName}</span>
              </span>
            )}

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {name}
            </h1>

            {/* Price section with Mockup Discount */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-orange-600">
                {product.price}{" "}
                <span className="text-base font-bold text-slate-500">
                  {locale === "ar" ? "ج.م" : "EGP"}
                </span>
              </span>
              <span className="text-base font-bold text-slate-400 line-through">
                {Math.round(product.price * 1.2)} {locale === "ar" ? "ج.م" : "EGP"}
              </span>
              <span className="px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-xs font-black rounded-lg">
                {locale === "ar" ? "خصم 20%" : "20% OFF"}
              </span>
            </div>

            <hr className="border-slate-100" />

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                {t("description")}
              </h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                {description}
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="text-green-500 text-sm">✓</span>
                <span>{locale === "ar" ? "تحضير فوري فور استلام الطلب مباشرة" : "Cooked fresh right upon order"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="text-green-500 text-sm">✓</span>
                <span>{locale === "ar" ? "مكونات وتوابل طازجة عالية الجودة" : "High quality authentic ingredients"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="text-green-500 text-sm">✓</span>
                <span>{locale === "ar" ? "تغليف محكم ومعقم للحفاظ على السخونة" : "Hygienic sealed packaging"}</span>
              </div>
            </div>
          </div>

          {/* Action Bar (Quantity + Animated Add to Cart) */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity Picker */}
              <div className="flex items-center justify-between border border-slate-200 rounded-2xl p-1 bg-slate-50 w-full sm:w-40 shadow-xs">
                <button
                  onClick={handleDecrease}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-600 hover:shadow-xs font-black text-lg transition-all cursor-pointer active:scale-90"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-black text-slate-900 text-lg">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-600 hover:shadow-xs font-black text-lg transition-all cursor-pointer active:scale-90"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button with Live Price Total */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer active:scale-98
                  ${
                    isAdded
                      ? "bg-emerald-600 text-white shadow-emerald-600/30"
                      : "bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5"
                  }`}
              >
                {isAdded ? (
                  <span className="flex items-center gap-2 animate-bounce">
                    <span className="text-xl">✓</span>
                    <span>{locale === "ar" ? "تمت الإضافة إلى السلة بنجاح!" : "Added to Cart!"}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="text-xl">🛒</span>
                    <span>
                      {t("add_to_cart")} • {product.price * quantity}{" "}
                      {locale === "ar" ? "ج.م" : "EGP"}
                    </span>
                  </span>
                )}
              </button>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="flex items-center justify-center gap-4 text-[11px] font-bold text-slate-400 pt-2">
              <span className="flex items-center gap-1">🛡️ {locale === "ar" ? "ضمان استرجاع أو استبدال" : "Quality Guarantee"}</span>
              <span>•</span>
              <span className="flex items-center gap-1">⚡ {locale === "ar" ? "دعم مباشر وسريع" : "Live Support"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { ProductDetailsUi };
