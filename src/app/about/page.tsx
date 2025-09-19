"use client";
import React from "react";
import styles from "./AboutPage.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";

const AboutPage = () => {
  return (
    <section className="container">
      <div className={styles.main}>
        {" "}
        <div className={styles.banner}>
          <Image
            src="/images/sections/about/banner.png"
            alt="banner"
            fill
            className={styles.image}
            priority
          />
        </div>
        <div className={styles.banner_story}>
          <Image
            src="/images/sections/about/banner_story.png"
            alt="banner"
            width={600}
            height={455}
            className={styles.image}
            priority
          />
          <div className={styles.story_textBlock}>
            <h2 className={styles.story_textHeader}> OUR STORY</h2>
            <p className={styles.story_textText}>
              Nina candles was born from the idea of making beauty natural and
              accessible. Each product combines simplicity, elegance, and care
              for the environment.
            </p>
            <p className={styles.story_textText}>
              We believe that true beauty comes from harmony between nature and
              innovation. Our journey began with a simple vision: to create
              products that not only make you feel beautiful but also connect
              you with the gentle power of natural ingredients.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.values}>
        <h2 className={styles.valuesTitle}>
          <span>OUR </span>
          <em>VALUES</em>
        </h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <Image
              src="/images/sections/about/value_care.png"
              alt="Customer Care"
              width={88}
              height={88}
              className={styles.valueIcon}
              priority
            />
            <h3 className={styles.valueTitle}>Customer Care</h3>
            <p className={styles.valueText}>
              Every interaction is guided by genuine care and attention to your
              unique needs.
            </p>
          </div>
          <div className={styles.valueCard}>
            <Image
              src="/images/sections/about/value_natural.png"
              alt="Natural Ingredients"
              width={88}
              height={88}
              className={styles.valueIcon}
              priority
            />
            <h3 className={styles.valueTitle}>Natural Ingredients</h3>
            <p className={styles.valueText}>
              We use the best natural ingredients, taking care of both your
              comfort and our planet.
            </p>
          </div>
          <div className={styles.valueCard}>
            <Image
              src="/images/sections/about/value_style.png"
              alt="Simplicity & Style"
              width={88}
              height={88}
              className={styles.valueIcon}
              priority
            />
            <h3 className={styles.valueTitle}>Simplicity & Style</h3>
            <p className={styles.valueText}>
              Clean, elegant design meets effortless functionality in every
              product.
            </p>
          </div>
          <div className={styles.valueCard}>
            <Image
              src="/images/sections/about/value_eco.png"
              alt="Eco-Conscious Production"
              width={88}
              height={88}
              className={styles.valueIcon}
              priority
            />
            <h3 className={styles.valueTitle}>Eco-Conscious Production</h3>
            <p className={styles.valueText}>
              We minimize our footprint and craft responsibly from start to
              finish.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.mission}>
        <Image
          src="/images/sections/about/mission.png"
          alt="banner"
          fill
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.cta}>
        <p className={styles.ctaText}>
          Discover the Nina Candles collection and experience the perfect <br />
          harmony of nature, elegance, and self‑care.
        </p>
        <Link href="/catalog" className={styles.ctaBtnLink}>
          <Button size="m" variant="secondary" className={styles.ctaBtn}>
            SHOP NOW
          </Button>
        </Link>
      </div>

      <button
        type="button"
        aria-label="Back to top"
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className={styles.backToTopIcon}>˄</span>
      </button>
    </section>
  );
};

export default AboutPage;
