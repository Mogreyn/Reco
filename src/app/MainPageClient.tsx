"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Product } from "@/types/types";
import { fetchProducts } from "@/services/products";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import styles from "./page.module.scss";
import Forma from "@/components/Forma/Forma";

const ProductCard = dynamic(
  () => import("@/components/ProductCard3/ProductCard"),
  { ssr: false }
);

// const FeedbackSection = dynamic(
//   () => import("@/components/FeedbackSection/FeedbackSection"),
//   {
//     ssr: false,
//     loading: () => <div className={styles.loading}>Отзывы грузятся...</div>
//   }
// );

export const MainPageClient = () => {
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

  return (
    <>
      <HeroSection />
      <FeaturesSection />

      <ProductCard products={products} showButton={true} />

      <Forma />

      {/* <Suspense
        fallback={<div className={styles.loading}>Отзывы грузятся...</div>}
      >
        <FeedbackSection />
      </Suspense> */}
    </>
  );
};
