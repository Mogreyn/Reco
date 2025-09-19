"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/types";

type FavoritesContextValue = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string | number) => boolean;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("favorites");
    if (raw) {
      try {
        setFavorites(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const isFavorite = (productId: string | number) => favorites.some((p) => p.id === productId);

  const clearFavorites = () => setFavorites([]);

  const value = useMemo(() => ({ favorites, toggleFavorite, isFavorite, clearFavorites }), [favorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};


