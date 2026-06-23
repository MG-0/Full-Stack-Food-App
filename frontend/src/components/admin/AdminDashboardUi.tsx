"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useAdminDashboard } from "./useAdminDashboard";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";
import CategoryForm from "./CategoryForm";
import ProductForm from "./ProductForm";

export default function AdminDashboardUi() {
  const t = useTranslations("admin");
  const locale = useLocale();

  const {
    activeTab,
    setActiveTab,
    categories,
    products,
    orders,
    loading,
    error,
    isInitialized,

    isCategoryModalOpen,
    setIsCategoryModalOpen,
    isProductModalOpen,
    setIsProductModalOpen,
    editingCategory,
    setEditingCategory,
    editingProduct,
    setEditingProduct,

    saveCategory,
    deleteCategory,
    saveProduct,
    deleteProduct,
    updateOrderStatus,
  } = useAdminDashboard();

  if (!isInitialized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-5 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-extrabold text-gray-900">{t("dashboard")}</h2>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 cursor-pointer
              ${activeTab === "products" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            {t("products")}
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 cursor-pointer
              ${activeTab === "categories" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            {t("categories")}
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 cursor-pointer
              ${activeTab === "orders" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            {t("orders")}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[50vh]">
        {loading && (
          <div className="py-20 flex justify-center">
            <Spinner size="lg" />
          </div>
        )}

        {!loading && (
          <>
            {/* PRODUCTS TAB */}
            {activeTab === "products" && (
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">{t("products")}</h3>
                  <Button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsProductModalOpen(true);
                    }}
                    variant="primary"
                  >
                    + {t("add_product")}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right text-sm text-gray-500">
                    <thead className="text-xs text-gray-700 bg-gray-50 uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-3">{locale === "ar" ? "الصورة" : "Image"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "الاسم" : "Name"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "القسم" : "Category"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "السعر" : "Price"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "التحكم" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((prod) => (
                        <tr key={prod._id} className="hover:bg-gray-50/50">
                          <td className="px-6 py-4">
                            <img
                              src={prod.image}
                              alt={prod.nameEn}
                              className="w-12 h-12 object-cover rounded-lg bg-gray-50 border"
                            />
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {locale === "ar" ? prod.nameAr : prod.nameEn}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-700">
                            {locale === "ar" ? prod.category?.nameAr : prod.category?.nameEn}
                          </td>
                          <td className="px-6 py-4 font-bold text-orange-600">
                            {prod.price} {locale === "ar" ? "ج.م" : "EGP"}
                          </td>
                          <td className="px-6 py-4 space-x-3 rtl:space-x-reverse">
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setIsProductModalOpen(true);
                              }}
                              className="text-orange-600 hover:text-orange-700 font-semibold cursor-pointer"
                            >
                              {t("edit")}
                            </button>
                            <button
                              onClick={() => deleteProduct(prod._id)}
                              className="text-red-600 hover:text-red-700 font-semibold cursor-pointer text-xs sm:text-sm"
                            >
                              {t("delete")}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CATEGORIES TAB */}
            {activeTab === "categories" && (
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">{t("categories")}</h3>
                  <Button
                    onClick={() => {
                      setEditingCategory(null);
                      setIsCategoryModalOpen(true);
                    }}
                    variant="primary"
                  >
                    + {t("add_category")}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right text-sm text-gray-500">
                    <thead className="text-xs text-gray-700 bg-gray-50 uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-3">{locale === "ar" ? "الاسم بالإنجليزية" : "English Name"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "الاسم بالعربية" : "Arabic Name"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "التحكم" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {categories.map((cat) => (
                        <tr key={cat._id} className="hover:bg-gray-50/50">
                          <td className="px-6 py-4 font-bold text-gray-900">{cat.nameEn}</td>
                          <td className="px-6 py-4 font-bold text-gray-900">{cat.nameAr}</td>
                          <td className="px-6 py-4 space-x-3 rtl:space-x-reverse">
                            <button
                              onClick={() => {
                                setEditingCategory(cat);
                                setIsCategoryModalOpen(true);
                              }}
                              className="text-orange-600 hover:text-orange-700 font-semibold cursor-pointer"
                            >
                              {t("edit")}
                            </button>
                            <button
                              onClick={() => deleteCategory(cat._id)}
                              className="text-red-600 hover:text-red-700 font-semibold cursor-pointer text-xs sm:text-sm"
                            >
                              {t("delete")}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="p-6 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">{t("orders")}</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right text-sm text-gray-500">
                    <thead className="text-xs text-gray-700 bg-gray-50 uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-3">{locale === "ar" ? "رقم الطلب" : "Order ID"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "المشتري" : "Customer"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "الوجبات المطلوبة" : "Ordered Items"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "السعر الإجمالي" : "Total Price"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "حالة الدفع" : "Payment"}</th>
                        <th className="px-6 py-3">{locale === "ar" ? "حالة الطلب" : "Status"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((ord) => (
                        <tr key={ord._id} className="hover:bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-500 text-xs">
                            {ord._id}
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            <div>{ord.user?.name}</div>
                            <div className="text-xs font-normal text-gray-400">{ord.user?.email}</div>
                            {ord.address && (
                              <div className="text-xs font-normal text-orange-600 mt-1 max-w-[200px] break-words">
                                📍 {ord.address}
                              </div>
                            )}
                            {ord.phone && (
                              <div className="text-xs font-normal text-gray-500 mt-0.5 max-w-[200px] break-words">
                                📞 {ord.phone}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1 max-w-[200px]">
                              {ord.items.map((item, idx) => {
                                const prodName = locale === "ar" ? item.product?.nameAr : item.product?.nameEn;
                                return (
                                  <div key={idx} className="text-xs text-gray-700 flex justify-between space-x-2 rtl:space-x-reverse">
                                    <span className="font-semibold">{prodName || (locale === "ar" ? "منتج محذوف" : "Deleted Product")}</span>
                                    <span className="text-gray-500 font-bold">x{item.quantity}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-extrabold text-orange-600">
                            {ord.totalPrice} {locale === "ar" ? "ج.م" : "EGP"}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${ord.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                              {ord.isPaid ? (locale === "ar" ? "مدفوع" : "Paid") : (locale === "ar" ? "غير مدفوع" : "Unpaid")}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord._id, e.target.value)}
                              className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm bg-white font-semibold text-gray-800 outline-none focus:border-orange-500"
                            >
                              <option value="pending">{locale === "ar" ? "قيد الانتظار" : "Pending"}</option>
                              <option value="preparing">{locale === "ar" ? "يتم التحضير" : "Preparing"}</option>
                              <option value="out_for_delivery">{locale === "ar" ? "خارج للتوصيل" : "Out for Delivery"}</option>
                              <option value="delivered">{locale === "ar" ? "تم التوصيل" : "Delivered"}</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <CategoryForm
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={saveCategory}
        initialData={editingCategory}
        loading={loading}
      />

      <ProductForm
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={saveProduct}
        initialData={editingProduct}
        categories={categories}
        loading={loading}
      />
    </div>
  );
}
export { AdminDashboardUi };
