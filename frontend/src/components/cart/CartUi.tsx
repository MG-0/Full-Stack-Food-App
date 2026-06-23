"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore, cart_actions } from "@/store/cartStore";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";

export default function CartUi() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const items = useCartStore((state) => state.items);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4">
        <span className="text-6xl">🛒</span>
        <h2 className="text-2xl font-bold text-gray-900">{t("empty")}</h2>
        <Link href="/" className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition">
          {locale === "ar" ? "اذهب للتسوق" : "Go Shopping"}
        </Link>
      </div>
    );
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b border-gray-100 pb-4">
        {t("title")}
      </h2>

      {/* Cart Items List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
        {items.map((item) => {
          const name = locale === "ar" ? item.product.nameAr : item.product.nameEn;
          const price = item.product.price;

          return (
            <div key={item.product._id} className="p-6 flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <img
                  src={item.product.image}
                  alt={name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-50 border border-gray-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{name}</h4>
                  <span className="text-sm font-semibold text-orange-600">
                    {price} {locale === "ar" ? "ج.م" : "EGP"}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-6 rtl:space-x-reverse">
                {/* Quantity Adjuster */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => cart_actions.updateQuantity(item.product._id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-bold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => cart_actions.updateQuantity(item.product._id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => cart_actions.removeItem(item.product._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold transition cursor-pointer"
                >
                  {t("remove")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <span className="text-gray-500 font-medium text-sm">{t("total")}</span>
          <h3 className="text-2xl font-extrabold text-orange-600 mt-1">
            {totalPrice} {locale === "ar" ? "ج.م" : "EGP"}
          </h3>
        </div>

        <Link href="/checkout">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            {t("checkout")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
export { CartUi };
