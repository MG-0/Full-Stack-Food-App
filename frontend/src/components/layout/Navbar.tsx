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
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer transition-all duration-200"
            >
              <span className="text-3xl p-1.5 bg-orange-100 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                🍔
              </span>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent tracking-tight">
                  {locale === "ar" ? "فود داش" : "Food Dash"}
                </span>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase -mt-1">
                  {locale === "ar" ? "طعام لذيذ وسريع" : "Fast & Fresh"}
                </span>
              </div>
            </Link>
          </div>

          {/* Links (Fixed Gap for RTL & LTR) */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-slate-700 hover:text-orange-600 font-bold text-sm px-3.5 py-2 rounded-xl hover:bg-orange-50/70 transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <span>🏠</span>
              <span>{t("home")}</span>
            </Link>

            {isAuthenticated && (
              <Link
                href="/orders"
                className="text-slate-700 hover:text-orange-600 font-bold text-sm px-3.5 py-2 rounded-xl hover:bg-orange-50/70 transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <span>📦</span>
                <span>{t("orders")}</span>
              </Link>
            )}

            {isAuthenticated && user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-red-600 hover:text-red-700 font-bold text-sm px-3.5 py-2 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 border border-red-200/60"
              >
                <span>⚙️</span>
                <span>{t("admin")}</span>
              </Link>
            )}
          </div>

          {/* Cart, Language, Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Icon Button */}
            <Link
              href="/cart"
              className="relative p-2.5 bg-slate-100/80 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-2xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group shadow-xs"
              aria-label="Cart"
            >
              <span className="text-xl block group-hover:scale-110 transition-transform">
                🛒
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 rtl:-left-1.5 rtl:right-auto inline-flex items-center justify-center px-1.5 py-0.5 min-w-[20px] h-5 text-[10px] font-black text-white bg-gradient-to-r from-orange-600 to-amber-500 rounded-full shadow-md shadow-orange-500/30">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-orange-400 hover:bg-orange-50/50 rounded-2xl text-xs font-bold text-slate-700 hover:text-orange-600 active:scale-95 transition-all duration-150 cursor-pointer shadow-xs"
            >
              <span className="text-sm">🌐</span>
              <span>{locale === "en" ? "العربية" : "English"}</span>
            </button>

            {/* Auth Section */}
            {isAuthenticated && mounted ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-slate-800 text-xs font-bold truncate max-w-[100px]">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/70 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95 shadow-xs"
                >
                  <span>🚪</span>
                  <span className="hidden sm:inline">{t("logout")}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-3.5 py-2 text-slate-700 hover:text-orange-600 text-xs sm:text-sm font-bold hover:bg-orange-50 rounded-2xl active:scale-95 transition-all duration-150 cursor-pointer block"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-150 cursor-pointer block"
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
