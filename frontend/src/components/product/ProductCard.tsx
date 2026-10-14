"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IProduct } from "@/types/index";
import { cart_actions } from "@/store/cartStore";
import { Button } from "../ui/Button";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations("product");

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const description = locale === "ar" ? product.descriptionAr : product.descriptionEn;

  const handleAddToCart = () => {
    cart_actions.addItem(product);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-300 group">
      <Link href={`/products/${product._id}`} className="block flex-grow flex flex-col">
        {/* Image Container with Floating Badges */}
        <div className="relative h-52 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-black text-slate-800 shadow-sm flex items-center gap-1">
            <span className="text-amber-500">★</span>
            <span>4.9</span>
          </div>

          {/* Quick Category Badge if available */}
          <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-xs">
            🔥 {locale === "ar" ? "وجبة مميزة" : "Special"}
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex-grow flex flex-col justify-between space-y-2">
          <div>
            <h3 className="text-lg font-black text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">
              {name}
            </h3>
            <p className="text-slate-500 text-xs line-clamp-2 mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Link>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {locale === "ar" ? "السعر" : "Price"}
          </span>
          <span className="text-xl font-black text-orange-600">
            {product.price}{" "}
            <span className="text-xs font-bold text-slate-500">
              {locale === "ar" ? "ج.م" : "EGP"}
            </span>
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          variant="primary"
          size="sm"
          className="cursor-pointer active:scale-95 transition-all duration-150 rounded-2xl shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center gap-1.5 px-4 py-2 font-bold text-xs"
        >
          <span>＋</span>
          <span>{t("add_to_cart")}</span>
        </Button>
      </div>
    </div>
  );
}
