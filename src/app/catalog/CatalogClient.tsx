"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./CatalogPage.module.scss";
import type { Product } from "@/types/types";
import { fetchProducts } from "@/services/products";

const CatalogProductCard = dynamic(
  () =>
    import("@/components/CatalodProductCard/CatalogProductCard").then(
      (mod) => mod.default
    ),
  {
    ssr: false
  }
);

const CatalogCardList = dynamic(
  () =>
    import("@/components/CatalogCardList/CatalogCardList").then(
      (mod) => mod.default
    ),
  {
    loading: () => <div>Loading...</div>
  }
);

// const FilterToggle = dynamic(
//   () =>
//     import("@/components/FilterToggle/FilterToggle").then((mod) => mod.default),
//   {
//     loading: () => <div>Loading...</div>
//   }
// );

const BackgroundCircles = dynamic(
  () =>
    import("@/components/BackgroundCircles/BackgroundCircles").then(
      (mod) => mod.default
    ),
  {
    loading: () => null
  }
);

export const CatalogClient = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Структурированные данные для каталога
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.photo,
        price: Object.values(product.sizes)[0] || 0,
        priceCurrency: "UAH"
      }
    }))
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />

      <main>
        <section aria-label="Новинки" className="container">
          <div className={styles.newProducts}>
            <h1 className={styles.title}>NEW PRODUCTS</h1>
            <CatalogProductCard products={products} />
          </div>
        </section>

        <section aria-label="Все товары" className="container">
          <h2 className={styles.title}>ALL PRODUCTS</h2>
          <nav aria-label="Навигация по товарам">
            <ul className={styles.productsList}>
              <CatalogCardList perRow={4} products={products} />
            </ul>
          </nav>
        </section>

        <section
          aria-label="Рекомендации"
          className={`container ${styles.recommendationContainer}`}
        >
     
          <BackgroundCircles className={styles.backgroundCircles} />
        </section>
      </main>
    </>
  );
};
