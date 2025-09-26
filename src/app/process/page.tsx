"use client";
import React, { useEffect, useState } from "react";
import styles from "./Process.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";
import { fetchProducts } from "@/services/products";
import type { Product } from "@/types/types";


const ProductCard = dynamic(
  () => import("@/components/ProductCard3/ProductCard"),
  {
    ssr: false,
    loading: () => <div className={styles.loading}>Loading products...</div>
  }
);

const ProcessPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    loadProducts();
  }, []);

    return (
    <section className="container">
      <div className={styles.mainContainer}>
        <div className={styles.main}>
          {" "}
          <div className={styles.banner}>
            <Image
              src="/images/sections/process/process.png"
              alt="process"
              fill
              className={styles.image}
              priority
            />
            <div className={styles.banner_text}>
              <h2 className={styles.banner_textHeader}> OUR PROCESS</h2>
              <p className={styles.banner_textText}>
                From the first spark of an idea to the warm glow in your home,
                every candle we make carries care, quality, and a touch of
                magic{" "}
              </p>
            </div>
            ы
          </div>
        </div>
        <div className={styles.how}>
          <h2 className={styles.howTitle}>HOW WE WORK</h2>
          <div className={styles.howGrid}>
            <ol className={styles.howList}>
              <li className={styles.howItem}>
                <span className={styles.howNum}>1</span>
                <div className={styles.howItemBody}>
                  <h3 className={styles.howItemTitle}>INSPIRATION & DESIGN</h3>
                  <p className={styles.howItemText}>
                    We start with inspiration — a feeling, a season, or a memory
                    we want to capture. Each fragrance is carefully chosen to
                    create moments of comfort, relaxation, and joy.
                  </p>
                </div>
              </li>
              <li className={styles.howItem}>
                <span className={styles.howNum}>2</span>
                <div className={styles.howItemBody}>
                  <h3 className={styles.howItemTitle}>PREMIUM INGREDIENTS</h3>
                  <p className={styles.howItemText}>
                    Our candles are made with natural soy wax (eco-friendly and
                    long-burning), cotton wicks for a clean burn, and
                    thoughtfully blended fragrances that fill your space without
                    overwhelming it.
                  </p>
                </div>
              </li>
              <li className={styles.howItem}>
                <span className={styles.howNum}>3</span>
                <div className={styles.howItemBody}>
                  <h3 className={styles.howItemTitle}>
                    HAND-POURING WITH CARE
                  </h3>
                  <p className={styles.howItemText}>
                    Every candle is hand-poured in small batches. This ensures
                    consistency, quality, and the artisanal touch that makes
                    each piece unique.
                  </p>
                </div>
              </li>
              <li className={styles.howItem}>
                <span className={styles.howNum}>4</span>
                <div className={styles.howItemBody}>
                  <h3 className={styles.howItemTitle}>CURING & TESTING</h3>
                  <p className={styles.howItemText}>
                    We allow every candle to cure properly, so the fragrance
                    develops fully. Each batch is tested for burn quality and
                    scent throw, ensuring the perfect balance.
                  </p>
                </div>
              </li>
            </ol>
            <div className={styles.howImages}>
              <div className={styles.howLarge}>
                <Image
                  src="/images/sections/process/how_l.png"
                  alt="how we work large"
                  fill
                  className={styles.image}
                  priority
                />
              </div>
              <div className={styles.howRow}>
                <div className={styles.howMedium}>
                  <Image
                    src="/images/sections/process/how_m.png"
                    alt="how we work medium"
                    fill
                    className={styles.image}
                    priority
                  />
                </div>
                <div className={styles.howSmall}>
                  <Image
                    src="/images/sections/process/how_s.png"
                    alt="how we work small"
                    fill
                    className={styles.image}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductCard products={products} />
        <button
          type="button"
          aria-label="Back to top"
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className={styles.backToTopIcon}>˄</span>
        </button>
      </div>
    </section>
  );
};

export default ProcessPage;
