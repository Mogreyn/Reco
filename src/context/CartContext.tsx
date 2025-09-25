"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { CartItem, Product } from "@/types/types";

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string | number, size?: string) => void;
  updateCartItemQuantity: (
    productId: string | number,
    quantity: number,
    size?: string
  ) => void;
  cartTotal: number;
  cartCount: number;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  }
  return [];
};

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartItems = loadCartFromLocalStorage();
      if (savedCartItems.length > 0) {
        setCartItems(savedCartItems);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (cartItems.length > 0) {
        saveCartToLocalStorage(cartItems);
      } else {
        localStorage.removeItem("cartItems");
      }
    }
  }, [cartItems]);

  const addToCart = (product: Product, size: string = "") => {
    setCartItems((prevCart) => {
      const existingCartItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingCartItemIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingCartItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1, size }];
      }
    });
  };

  const removeFromCart = (productId: string | number, size: string = "") => {
    setCartItems((prevCart) =>
      prevCart.filter(
        (item) => item.product.id !== productId || item.size !== size
      )
    );
  };

  const updateCartItemQuantity = (
    productId: string | number,
    quantity: number,
    size: string = ""
  ) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((total, item) => {
    const price = item.product.price ?? 0; 
    return total + price * item.quantity;
  }, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        cartTotal: total,
        cartCount,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
