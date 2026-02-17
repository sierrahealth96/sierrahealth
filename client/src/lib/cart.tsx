import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@shared/schema";

export interface CartItem extends Product {
  _id: string;          // ✅ MongoDB ID
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product & { _id: string; quantity?: number }) => void;
  removeItem: (_id: string) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  /* ---------------- SAVE CART ---------------- */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  /* ---------------- ADD ITEM ---------------- */
  const addItem = (product: Product & { _id: string; quantity?: number }) => {
    setItems((current) => {
      const existing = current.find((item) => item._id === product._id);

      if (existing) {
        return current.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + (product.quantity || 1),
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: product.quantity || 1,
        } as CartItem,
      ];
    });

    setIsOpen(true);
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const removeItem = (_id: string) => {
    setItems((current) => current.filter((item) => item._id !== _id));
  };

  /* ---------------- UPDATE QTY ---------------- */
  const updateQuantity = (_id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(_id);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item._id === _id ? { ...item, quantity } : item
      )
    );
  };

  /* ---------------- CLEAR CART ---------------- */
  const clearCart = () => setItems([]);

  /* ---------------- TOTAL ---------------- */
  const total = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}