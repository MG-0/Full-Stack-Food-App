import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useAuthStore, auth_actions } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export const useNavbar = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // Get data from stores
  const { user, isAuthenticated } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);

  // For hydration mismatch prevention
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check user auth session on load
    auth_actions.checkAuth();
  }, []);

  // Calculate total quantity of items in the cart
  const cartCount = mounted
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  // Toggle locale between en and ar
  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  // Logout handler
  const handleLogout = async () => {
    await auth_actions.logout();
  };

  return {
    user,
    isAuthenticated,
    cartCount,
    locale,
    mounted,
    toggleLanguage,
    handleLogout,
  };
};
