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
    const key = userId ? `cart_${userId}` : "cart_guest";
    const data = localStorage.getItem(key);
    useCartStore.setState({
      items: data ? JSON.parse(data) : [],
      userId,
    });
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