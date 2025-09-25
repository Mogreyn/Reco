"use client";

import Image from "next/image";
import styles from "./CatalogCard.module.scss";
import Link from "next/link";
import type { CatalogCardProps } from "./types/CatalogCard.types";
import { useCallback, memo } from "react";
import { useFavorites } from "@/context/FavoritesContext";

const CatalogCard = memo(({ product }: CatalogCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const getPrice = useCallback(() => {
    return product.price;
  }, [product]);

  return (
    <div>
      <Link
        href={`/${product.id}`}
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
            src={product.mainImage || "/fallback-image.jpg"}
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


        <div className={styles.badgeContainer}>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className={styles.saleBadge}>SALE</span>
          )}
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
