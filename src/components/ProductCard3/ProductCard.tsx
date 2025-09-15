import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { Product } from "@/types/types";
import { useCartContext } from "@/hooks/useCartContext";
import styles from "./ProductCard.module.scss";
import Button from "../Button/Button";
import ButtonArrow from "../ArowButton/ArowButton";
import Image from "next/image";
import Carousel from "react-spring-3d-carousel";
import { useSwipeable } from "react-swipeable";
import Link from "next/link";

export interface ProductCardProps {
  products: Product[];
  showButton?: boolean;
}

const CatalogProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [offsetRadius, setOffsetRadius] = useState(2);
  const { addToCart } = useCartContext();
  const [addedImpact, setAddedImpact] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Отображаем все товары
  const allProducts = useMemo(() => products, [products]);
  const currentProduct = allProducts[currentIndex] || {};

  useEffect(() => {
    const defaultSize = currentProduct?.sizes?.[0]?.size ?? null;
    setSelectedSize(defaultSize);
  }, [currentIndex, currentProduct]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setOffsetRadius(width >= 768 && width <= 1225 ? 4 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % allProducts.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + allProducts.length) % allProducts.length);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize || !currentProduct.sizes) {
      return alert("Будь ласка, виберіть розмір!");
    }
    if (!allProducts.length) return;

    const selectedSizeObj = currentProduct.sizes.find(
      (s) => s.size === selectedSize
    );
    if (!selectedSizeObj) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(currentProduct, selectedSize);
    }

    setAddedImpact(true);
    setTimeout(() => setAddedImpact(false), 1200);
  }, [selectedSize, currentProduct, addToCart, allProducts.length, quantity]);

  const renderDescription = () => (
    <div className={styles.descriptionContainer}>
      <p>{currentProduct.description}</p>
    </div>
  );

  const renderPrice = () => {
    const selectedSizeObj = selectedSize
      ? currentProduct.sizes.find((s) => s.size === selectedSize)
      : null;

    return (
      <p className={styles.priceContainer}>
        <strong className={styles.price}></strong>
        {selectedSizeObj ? `${selectedSizeObj.price * quantity} грн` : "Оберіть розмір"}
      </p>
    );
  };

  const slides = useMemo(
    () =>
      allProducts.map((product, index) => ({
        key: product.id,
        content:
          index === currentIndex ? (
            <Link
              key={index}
              href={`/${product._id}`}
              className={`${styles.slide} ${styles.active}`}
              style={{ textDecoration: "none", color: "inherit" }}
              tabIndex={-1}
            >
              <Image
                alt={product.name}
                className={styles.productImage}
                height={300}
                width={300}
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={product.photo}
              />

              <div className={styles.buttonPlace}>
                {isMobile ? (
                  <>
                    <div className={styles.quantityControls}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setQuantity((q) => Math.max(1, q - 1));
                        }}
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setQuantity((q) => q + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <Button
                      className={`addToCart${addedImpact ? " added" : ""}`}
                      disabled={!selectedSize || addedImpact}
                      size="m"
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart();
                      }}
                      style={
                        addedImpact
                          ? {
                              backgroundColor: "#3ecf4a",
                              color: "#fff",
                              transition: "background 0.3s, color 0.3s"
                            }
                          : {}
                      }
                    >
                      {addedImpact ? "Додано!" : "ДОДАТИ В КОШИК"}
                    </Button>
                  </>
                ) : (
                  <Link href={`/${product._id}`}>
                    <Button className={styles.moreButton} size="l" variant="secondary">
                      <span className={styles.moreButtonText}>VIEW DETAILS</span>
                    </Button>
                  </Link>
                )}
              </div>
            </Link>
          ) : (
            <div key={index} className={styles.slide}>
              <Image
                alt={product.name}
                className={styles.productImage}
                height={300}
                width={300}
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={product.photo}
              />
            </div>
          )
      })),
    [allProducts, currentIndex, selectedSize, isMobile, handleAddToCart, addedImpact, quantity]
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => isMobile && handleNext(),
    onSwipedRight: () => isMobile && handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <section className="container" {...swipeHandlers}>
      <div className={styles.card}>
        <div className={styles.carousel}>
          <Carousel
            animationConfig={{ tension: 100, friction: 20 }}
            goToSlide={currentIndex}
            offsetRadius={offsetRadius}
            showNavigation={false}
            slides={slides}
          />
          <ButtonArrow
            className={styles.arrowLeft}
            icon="left"
            onClick={handlePrev}
          />
          <ButtonArrow
            className={styles.arrowRight}
            icon="right"
            onClick={handleNext}
          />
        </div>
        <div className={styles.info}>
          <h2>{currentProduct.name}</h2>
          {isMobile ? (
            <>
              {renderPrice()}
              {renderDescription()}
            </>
          ) : (
            <>
              {renderDescription()}
              {renderPrice()}
            </>
          )}

          {!isMobile && (
            <div className={styles.actions}>
              <div className={styles.quantityControlsDesktop}>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                  +
                </button>
              </div>
              <Button
                className={`addToCart${addedImpact ? " added" : ""}`}
                disabled={!selectedSize || addedImpact}
                size="pr"
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                style={
                  addedImpact
                    ? {
                        backgroundColor: "#3ecf4a",
                        color: "#fff",
                        transition: "background 0.3s, color 0.3s"
                      }
                    : {}
                }
              >
                {addedImpact ? "ADDED" : "ADD TO CART"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogProductCard;
