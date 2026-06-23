"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useOrdersPage } from "./useOrdersPage";
import { Spinner } from "../ui/Spinner";

export default function OrdersUi() {
  const t = useTranslations("order");
  const locale = useLocale();
  const { orders, loading, error, isInitialized } = useOrdersPage();

  if (!isInitialized || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4">
        <span className="text-6xl">📦</span>
        <h2 className="text-2xl font-bold text-gray-900">
          {locale === "ar" ? "لا توجد لديك طلبات سابقة" : "You have no previous orders"}
        </h2>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 text-xs font-bold rounded-full ";
    switch (status) {
      case "pending":
        return base + "bg-yellow-100 text-yellow-800";
      case "preparing":
        return base + "bg-blue-100 text-blue-800";
      case "out_for_delivery":
        return base + "bg-purple-100 text-purple-800";
      case "delivered":
        return base + "bg-green-100 text-green-800";
      default:
        return base + "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return t("status_pending");
      case "preparing":
        return t("status_preparing");
      case "out_for_delivery":
        return t("status_out_for_delivery");
      case "delivered":
        return t("status_delivered");
      default:
        return status;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-900 border-b border-gray-100 pb-4">
        {t("title")}
      </h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => {
          const dateStr = new Date(order.createdAt).toLocaleDateString(
            locale === "ar" ? "ar-EG" : "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          );

          return (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4 hover:shadow-md transition duration-300"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-50 pb-3 space-y-2 sm:space-y-0">
                <div>
                  <span className="text-xs text-gray-400 font-medium">
                    {locale === "ar" ? "رقم الطلب" : "Order ID"}: {order._id}
                  </span>
                  <p className="text-sm font-semibold text-gray-600 mt-1">{dateStr}</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <span className={getStatusBadge(order.status)}>
                    {getStatusText(order.status)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {order.paymentMethod === "cod" ? t("payment_cod") : t("payment_online")}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item, idx) => {
                  const name = locale === "ar" ? item.product?.nameAr : item.product?.nameEn;
                  return (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="font-bold text-gray-800">{name || (locale === "ar" ? "منتج محذوف" : "Deleted Product")}</span>
                        <span className="text-gray-400">x{item.quantity}</span>
                      </div>
                      <span className="font-semibold text-gray-700">
                        {item.price * item.quantity} {locale === "ar" ? "ج.م" : "EGP"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Order Address & Phone */}
              {(order.address || order.phone) && (
                <div className="text-xs text-gray-600 bg-gray-50/50 p-3 rounded-xl border border-gray-100/80 space-y-2">
                  {order.address && (
                    <div className="flex items-start space-x-2.5 rtl:space-x-reverse">
                      <span className="text-base leading-none">📍</span>
                      <div>
                        <span className="font-bold text-gray-800 text-[10px] block mb-0.5 uppercase tracking-wider">
                          {locale === "ar" ? "عنوان التوصيل:" : "Delivery Address:"}
                        </span>
                        <span className="text-gray-600 font-medium">{order.address}</span>
                      </div>
                    </div>
                  )}
                  {order.phone && (
                    <div className="flex items-start space-x-2.5 rtl:space-x-reverse">
                      <span className="text-base leading-none">📞</span>
                      <div>
                        <span className="font-bold text-gray-800 text-[10px] block mb-0.5 uppercase tracking-wider">
                          {locale === "ar" ? "رقم الهاتف:" : "Phone Number:"}
                        </span>
                        <span className="text-gray-600 font-medium">{order.phone}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Order Footer */}
              <div className="border-t border-gray-50 pt-3 flex justify-between items-center">
                <span className="font-bold text-gray-700">{t("total")}</span>
                <span className="text-lg font-extrabold text-orange-600">
                  {order.totalPrice} {locale === "ar" ? "ج.م" : "EGP"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export { OrdersUi };
