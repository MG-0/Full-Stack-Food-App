"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCheckout } from "./useCheckout";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";

export default function CheckoutUi() {
  const t = useTranslations("order");
  const locale = useLocale();
  const {
    cartItems,
    paymentMethod,
    setPaymentMethod,
    address,
    setAddress,
    phone,
    setPhone,
    loading,
    error,
    isInitialized,
    handlePlaceOrder,
  } = useCheckout();

  if (!isInitialized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 1. Order Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
          {locale === "ar" ? "ملخص الطلب" : "Order Summary"}
        </h3>

        <div className="divide-y divide-gray-50 max-h-[50vh] overflow-y-auto pr-2">
          {cartItems.map((item) => {
            const name = locale === "ar" ? item.product.nameAr : item.product.nameEn;
            return (
              <div key={item.product._id} className="py-3 flex justify-between text-sm">
                <div>
                  <span className="font-bold text-gray-900">{name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {item.product.price * item.quantity} {locale === "ar" ? "ج.م" : "EGP"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <span className="font-bold text-gray-700">{t("total")}</span>
          <span className="text-2xl font-extrabold text-orange-600">
            {totalPrice} {locale === "ar" ? "ج.م" : "EGP"}
          </span>
        </div>
      </div>

      {/* 2. Payment & Checkout */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
            {locale === "ar" ? "تفاصيل التوصيل والدفع" : "Delivery & Payment Details"}
          </h3>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
              {error === "address_required"
                ? t("address_required")
                : error === "phone_required"
                ? t("phone_required")
                : error}
            </div>
          )}

          {/* Delivery Address */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {t("address")} <span className="text-red-500">*</span>
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("address_placeholder")}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm text-gray-900 placeholder-gray-400 bg-white resize-none"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {t("phone")} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phone_placeholder")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition text-sm text-gray-900 placeholder-gray-400 bg-white"
            />
          </div>

          {/* Payment Method Radio Group */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              {locale === "ar" ? "طريقة الدفع" : "Payment Method"}
            </label>

            <label
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition
                ${paymentMethod === "cod" 
                  ? "border-orange-500 bg-orange-50/30" 
                  : "border-gray-200 hover:bg-gray-50"}`}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="font-semibold text-gray-900">{t("payment_cod")}</span>
              </div>
              <span className="text-2xl">💵</span>
            </label>

            <label
              onClick={() => setPaymentMethod("online")}
              className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition
                ${paymentMethod === "online" 
                  ? "border-orange-500 bg-orange-50/30" 
                  : "border-gray-200 hover:bg-gray-50"}`}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="font-semibold text-gray-900">{t("payment_online")}</span>
              </div>
              <span className="text-2xl">💳</span>
            </label>
          </div>
        </div>

        <Button
          onClick={handlePlaceOrder}
          variant="primary"
          size="lg"
          className="w-full mt-6"
          isLoading={loading}
        >
          {t("place_order")}
        </Button>
      </div>
    </div>
  );
}
export { CheckoutUi };
