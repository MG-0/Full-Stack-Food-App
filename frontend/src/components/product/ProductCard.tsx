"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">{name}</h3>
          <p className="text-gray-500 text-xs line-clamp-2">{description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-lg font-extrabold text-orange-600">
            {product.price} {locale === "ar" ? "ج.م" : "EGP"}
          </span>
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="sm"
            className="cursor-pointer active:scale-95 transition-all duration-150"
          >
            {t("add_to_cart")}
          </Button>
        </div>
      </div>
    </div>
  );
}
