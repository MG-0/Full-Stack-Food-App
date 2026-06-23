"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useNavbar } from "./useNavbar";

export default function Navbar() {
  const t = useTranslations("nav");
  const {
    user,
    isAuthenticated,
    cartCount,
    locale,
    mounted,
    toggleLanguage,
    handleLogout,
  } = useNavbar();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-orange-600 tracking-wide cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 block">
              🍔 {locale === "ar" ? "تطبيق الطعام" : "Food App"}
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-8 rtl:space-x-reverse items-center">
            <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-95 transform block">
              {t("home")}
            </Link>
            
            {isAuthenticated && (
              <>
                <Link href="/orders" className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-95 transform block">
                  {t("orders")}
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin" className="text-red-600 hover:text-red-800 font-bold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-95 transform block">
                    ⚙️ {t("admin")}
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Cart, Language, Auth */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer block">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              {locale === "en" ? "العربية 🇪🇬" : "English 🇬🇧"}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated && mounted ? (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-gray-700 text-sm font-medium hidden sm:inline">
                  👋 {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 hover:text-red-600 text-gray-800 rounded-lg text-sm font-semibold active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="flex space-x-3 rtl:space-x-reverse">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-orange-600 hover:text-orange-700 text-sm font-semibold hover:-translate-y-0.5 active:scale-95 transition-all duration-150 cursor-pointer transform block"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-semibold hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-150 cursor-pointer transform block"
                >
                  {t("register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
