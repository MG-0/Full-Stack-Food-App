import { create } from "zustand";
import { ICartItem, IProduct } from "@/types/index";

interface CartState {
  items: ICartItem[];
  userId: string | null;
}

export const useCartStore = create<CartState>(() => ({
  items: [],
  userId: null,
}));

// Private helper to save to local storage scoped by userId
const saveCart = (items: ICartItem[]) => {
  if (typeof window === "undefined") return;
  const { userId } = useCartStore.getState();
  const key = userId ? `cart_${userId}` : "cart_guest";
  localStorage.setItem(key, JSON.stringify(items));
};

export const cart_actions = {
  loadUserCart: (userId: string | null) => {
    if (typeof window === "undefined") return;

    if (userId) {
      // User is logging in
      const guestData = localStorage.getItem("cart_guest");
      const userData = localStorage.getItem(`cart_${userId}`);
      
      let guestItems: ICartItem[] = guestData ? JSON.parse(guestData) : [];
      let userItems: ICartItem[] = userData ? JSON.parse(userData) : [];

      if (guestItems.length > 0) {
        // Merge guest items into user items
        const mergedItems = [...userItems];
        guestItems.forEach((guestItem) => {
          const existing = mergedItems.find((item) => item.product._id === guestItem.product._id);
          if (existing) {
            existing.quantity += guestItem.quantity;
          } else {
            mergedItems.push(guestItem);
          }
        });

        // Save merged to user cart and clear guest cart
        localStorage.setItem(`cart_${userId}`, JSON.stringify(mergedItems));
        localStorage.removeItem("cart_guest");

        useCartStore.setState({
          items: mergedItems,
          userId,
        });
      } else {
        // No guest items, just load user cart
        useCartStore.setState({
          items: userItems,
          userId,
        });
      }
    } else {
      // Guest loading or user logging out
      const data = localStorage.getItem("cart_guest");
      useCartStore.setState({
        items: data ? JSON.parse(data) : [],
        userId: null,
      });
    }
  },

  addItem: (product: IProduct, quantity: number = 1) => {
    const { items } = useCartStore.getState();
    const existingItem = items.find((item) => item.product._id === product._id);
    let updatedItems;

    if (existingItem) {
      updatedItems = items.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [...items, { product, quantity }];
    }

    useCartStore.setState({ items: updatedItems });
    saveCart(updatedItems);
  },

  removeItem: (productId: string) => {
    const { items } = useCartStore.getState();
    const updatedItems = items.filter((item) => item.product._id !== productId);
    useCartStore.setState({ items: updatedItems });
    saveCart(updatedItems);
  },

  updateQuantity: (productId: string, quantity: number) => {
    const { items } = useCartStore.getState();
    if (quantity <= 0) {
      cart_actions.removeItem(productId);
      return;
    }
    const updatedItems = items.map((item) =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    useCartStore.setState({ items: updatedItems });
    saveCart(updatedItems);
  },

  clearCart: () => {
    useCartStore.setState({ items: [] });
    saveCart([]);
  },
};