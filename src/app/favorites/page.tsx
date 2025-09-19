"use client";
import React from "react";
import { useFavorites } from "@/context/FavoritesContext";
import Link from "next/link";
import CatalogCard from "@/components/CatalogCard/CatalogCard";

const FavoritesPage = () => {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <section className="container">
      <h1 style={{ margin: "24px 0" }}>Favorites</h1>
      {favorites.length === 0 ? (
        <p>
          Nothing here yet. <Link href="/catalog">Go to catalog</Link>
        </p>
      ) : (
        <>
          <button onClick={clearFavorites} style={{ marginBottom: 16 }}>Clear all</button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(292px, 1fr))", gap: 24 }}>
            {favorites.map((product) => (
              <CatalogCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default FavoritesPage;


