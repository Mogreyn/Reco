"use client";

import Image from "next/image";
import styles from "./CatalogCard.module.scss";
import Link from "next/link";
import type { CatalogCardProps } from "./types/CatalogCard.types";
import { useState, useCallback, memo } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

const CatalogCard = memo(({ product }: CatalogCardProps) => {
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [addedImpact, setAddedImpact] = useState(false);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleBuyClick = useCallback(() => {
    addToCart(product, "");
    setAddedImpact(true);
    setTimeout(() => setAddedImpact(false), 1200);
  }, [addToCart, product]);

  const getPrice = useCallback(() => {
    if (typeof (product as any).price === "number")
      return (product as any).price as number;
    if (product.sizes?.length) {
      return product.sizes.reduce(
        (min, s) => (s.price < min ? s.price : min),
        product.sizes[0].price
      );
    }
    return null;
  }, [product]);

  return (
    <div>
      <Link
        href={`/${product._id}`}
        className={styles.card}
        data-testid="catalog-card"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={styles.imageContainer}>
          <Image
            alt={product.name}
            height={300}
            loading="lazy"
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={product.photo || "/fallback-image.jpg"}
            width={400}
          />
        </div>
        <button
          type="button"
          className={styles.infoBtn}
          aria-label="Toggle favorite"
          onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
        >
          <span className={styles.infoBtnIcon}>{isFavorite(product.id) ? "❤" : "♡"}</span>
        </button>

        {showSizeWarning && (
          <div className={styles.sizeWarning}>Please try again.</div>
        )}

        <div className={styles.badgeContainer}>
          {product.badgeInfo && (
            <span className={styles.saleBadge}>{product.badgeInfo}</span>
          )}
          {/* <span className={styles.typeBadge}>{product.type}</span> */}
        </div>
      </Link>

      <div className={styles.productDetailsContainer}>
        <header className={styles.infoContainer}>
          <h3 className={styles.productName}>{product.name}</h3>
        </header>
        {/* RATING PLACEHOLDER */}
        <div className={styles.productRating}>★★★★☆ (4.5/5)</div>
        {/* PRICE */}
        <div className={styles.productPrice}>
          {getPrice() ? `$${getPrice()}` : "Price on request"}
        </div>
      </div>
    </div>
  );
});

CatalogCard.displayName = "CatalogCard";

export default CatalogCard;
